
package com.easycount.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.PurchaseReturnRequest;
import com.easycount.dto.PurchaseReturnResponse;
import com.easycount.entity.Purchase;
import com.easycount.entity.PurchaseItem;
import com.easycount.entity.PurchaseReturn;
import com.easycount.entity.PurchaseReturnItem;
import com.easycount.repository.ItemRepository;
import com.easycount.repository.PurchaseItemRepository;
import com.easycount.repository.PurchaseRepository;
import com.easycount.repository.PurchaseReturnItemRepository;
import com.easycount.repository.PurchaseReturnRepository;

@Service
public class PurchaseReturnService {

    private final PurchaseReturnRepository purchaseReturnRepo;
    private final PurchaseReturnItemRepository purchaseReturnItemRepo;
    private final PurchaseRepository purchaseRepo;
    private final PurchaseItemRepository purchaseItemRepo;
    private final ItemRepository itemRepo;

    public PurchaseReturnService(
            PurchaseReturnRepository purchaseReturnRepo,
            PurchaseReturnItemRepository purchaseReturnItemRepo,
            PurchaseRepository purchaseRepo,
            PurchaseItemRepository purchaseItemRepo,
            ItemRepository itemRepo) {

        this.purchaseReturnRepo = purchaseReturnRepo;
        this.purchaseReturnItemRepo = purchaseReturnItemRepo;
        this.purchaseRepo = purchaseRepo;
        this.purchaseItemRepo = purchaseItemRepo;
        this.itemRepo = itemRepo;
    }

    // CREATE PURCHASE RETURN
    @Transactional
    public PurchaseReturnResponse create(PurchaseReturnRequest request) {

        // Find the original purchase.
        Purchase purchase = purchaseRepo.findById(request.purchaseId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase not found with ID: " + request.purchaseId()
                ));

        PurchaseReturn purchaseReturn = new PurchaseReturn();
        purchaseReturn.setPurchase(purchase);

        purchaseReturn.setReturnDate(
                request.returnDate() != null
                        ? request.returnDate()
                        : LocalDate.now()
        );

        purchaseReturn.setNotes(request.notes());

        BigDecimal returnTotal = BigDecimal.ZERO;
        Set<Long> processedPurchaseItemIds = new HashSet<>();

        for (PurchaseReturnRequest.Line line : request.items()) {

            // Prevent duplicate purchase lines in one request.
            if (!processedPurchaseItemIds.add(line.purchaseItemId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Duplicate purchase item ID: " + line.purchaseItemId()
                );
            }

            // Lock the original purchase line.
            PurchaseItem purchaseItem = purchaseItemRepo
                    .findByIdForUpdate(line.purchaseItemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Purchase item not found with ID: " + line.purchaseItemId()
                    ));

            // Verify that this line belongs to the selected purchase.
            if (!purchaseItem.getPurchase().getId().equals(purchase.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Purchase item " + line.purchaseItemId()
                                + " does not belong to purchase " + purchase.getId()
                );
            }

            BigDecimal returnQty = line.qty();

            if (returnQty == null ||
                    returnQty.compareTo(BigDecimal.ZERO) <= 0) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity must be greater than zero."
                );
            }

            // Calculate the quantity already returned.
            BigDecimal previouslyReturned =
                    purchaseReturnItemRepo.sumReturnedQtyByPurchaseItemId(
                            purchaseItem.getId()
                    );

            if (previouslyReturned == null) {
                previouslyReturned = BigDecimal.ZERO;
            }

            BigDecimal remainingQty =
                    purchaseItem.getQty().subtract(previouslyReturned);

            if (returnQty.compareTo(remainingQty) > 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity exceeds the remaining returnable quantity "
                                + "for purchase item " + purchaseItem.getId()
                                + ". Remaining quantity: " + remainingQty
                );
            }

            // Remove returned goods from current stock.
            int updatedRows = itemRepo.decreaseStock(
                    purchaseItem.getItem().getId(),
                    returnQty
            );

            if (updatedRows == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Insufficient stock to return item: "
                                + purchaseItem.getItem().getName()
                );
            }

            // Always use the original purchase price.
            BigDecimal originalPrice = purchaseItem.getPrice();

            BigDecimal lineTotal = returnQty
                    .multiply(originalPrice)
                    .setScale(2, RoundingMode.HALF_UP);

            PurchaseReturnItem returnItem = new PurchaseReturnItem(
                    purchaseReturn,
                    purchaseItem,
                    returnQty,
                    originalPrice
            );

            purchaseReturn.getItems().add(returnItem);

            returnTotal = returnTotal.add(lineTotal);
        }

        purchaseReturn.setTotal(
                returnTotal.setScale(2, RoundingMode.HALF_UP)
        );

        PurchaseReturn savedReturn = purchaseReturnRepo.save(purchaseReturn);

        return toResponse(savedReturn);
    }

    // UPDATE PURCHASE RETURN
    @Transactional
    public PurchaseReturnResponse update(
            Long id,
            PurchaseReturnRequest request) {

        PurchaseReturn purchaseReturn = purchaseReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase return not found with ID: " + id
                ));

        // Keep the return connected to its original purchase.
        if (!purchaseReturn.getPurchase().getId().equals(request.purchaseId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A purchase return cannot be moved to another purchase."
            );
        }

        // Remember old quantities before replacing the return lines.
        Map<Long, BigDecimal> oldQuantities = new HashMap<>();

        // Reverse the previous stock decreases.
        for (PurchaseReturnItem oldItem : purchaseReturn.getItems()) {

            oldQuantities.merge(
                    oldItem.getPurchaseItem().getId(),
                    oldItem.getQty(),
                    BigDecimal::add
            );

            int updated = itemRepo.increaseStock(
                    oldItem.getItem().getId(),
                    oldItem.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Could not restore stock for item: "
                                + oldItem.getItem().getName()
                );
            }
        }

        Set<Long> processedIds = new HashSet<>();
        BigDecimal newTotal = BigDecimal.ZERO;

        // Prepare the replacement return items.
        List<PurchaseReturnItem> newItems = new ArrayList<>();

        for (PurchaseReturnRequest.Line line : request.items()) {

            if (!processedIds.add(line.purchaseItemId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Duplicate purchase item ID: " + line.purchaseItemId()
                );
            }

            PurchaseItem purchaseItem = purchaseItemRepo
                    .findByIdForUpdate(line.purchaseItemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Purchase item not found: " + line.purchaseItemId()
                    ));

            if (!purchaseItem.getPurchase().getId()
                    .equals(purchaseReturn.getPurchase().getId())) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Selected purchase item does not belong to this purchase."
                );
            }

            BigDecimal qty = line.qty();

            if (qty == null ||
                    qty.compareTo(BigDecimal.ZERO) <= 0) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity must be greater than zero."
                );
            }

            BigDecimal alreadyReturned =
                    purchaseReturnItemRepo.sumReturnedQtyByPurchaseItemId(
                            purchaseItem.getId()
                    );

            if (alreadyReturned == null) {
                alreadyReturned = BigDecimal.ZERO;
            }

            // Exclude this return's old quantity when calculating availability.
            BigDecimal previousQtyForThisLine = oldQuantities.getOrDefault(
                    purchaseItem.getId(),
                    BigDecimal.ZERO
            );

            BigDecimal remaining = purchaseItem.getQty()
                    .subtract(alreadyReturned)
                    .add(previousQtyForThisLine);

            if (qty.compareTo(remaining) > 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity exceeds the remaining quantity. "
                                + "Available: " + remaining
                );
            }

            // Apply the new stock decrease.
            int updated = itemRepo.decreaseStock(
                    purchaseItem.getItem().getId(),
                    qty
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Insufficient stock to return item: "
                                + purchaseItem.getItem().getName()
                );
            }

            BigDecimal originalPrice = purchaseItem.getPrice();

            PurchaseReturnItem newItem = new PurchaseReturnItem(
                    purchaseReturn,
                    purchaseItem,
                    qty,
                    originalPrice
            );

            newItems.add(newItem);

            newTotal = newTotal.add(
                    qty.multiply(originalPrice)
                            .setScale(2, RoundingMode.HALF_UP)
            );
        }

        // IMPORTANT: Replace old return items with new items.
        // Do this once, after the loop.
        purchaseReturn.getItems().clear();
        purchaseReturn.getItems().addAll(newItems);

        purchaseReturn.setReturnDate(
                request.returnDate() != null
                        ? request.returnDate()
                        : LocalDate.now()
        );

        purchaseReturn.setNotes(request.notes());

        purchaseReturn.setTotal(
                newTotal.setScale(2, RoundingMode.HALF_UP)
        );

        return toResponse(purchaseReturnRepo.save(purchaseReturn));
    }

    // DELETE PURCHASE RETURN
    @Transactional
    public void delete(Long id) {

        PurchaseReturn purchaseReturn = purchaseReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase return not found with ID: " + id
                ));

        // Restore the quantity previously removed from stock.
        for (PurchaseReturnItem returnItem : purchaseReturn.getItems()) {

            int updated = itemRepo.increaseStock(
                    returnItem.getItem().getId(),
                    returnItem.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Could not restore stock for item: "
                                + returnItem.getItem().getName()
                );
            }
        }

        // Delete only the return, not the original purchase.
        purchaseReturnRepo.delete(purchaseReturn);
    }

    // GET ALL PURCHASE RETURNS
    @Transactional(readOnly = true)
    public List<PurchaseReturnResponse> findAll() {

        return purchaseReturnRepo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // GET PURCHASE RETURNS BY PURCHASE ID
    @Transactional(readOnly = true)
    public List<PurchaseReturnResponse> findByPurchaseId(Long purchaseId) {

        if (!purchaseRepo.existsById(purchaseId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Purchase not found with ID: " + purchaseId
            );
        }

        return purchaseReturnRepo
                .findByPurchase_IdOrderByReturnDateDesc(purchaseId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // GET ONE PURCHASE RETURN
    @Transactional(readOnly = true)
    public PurchaseReturnResponse findById(Long id) {

        PurchaseReturn purchaseReturn = purchaseReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase return not found with ID: " + id
                ));

        return toResponse(purchaseReturn);
    }

    // MAP ENTITY TO RESPONSE DTO
    private PurchaseReturnResponse toResponse(PurchaseReturn purchaseReturn) {

        List<PurchaseReturnResponse.Line> lines = new ArrayList<>();

        for (PurchaseReturnItem returnItem : purchaseReturn.getItems()) {

            PurchaseItem purchaseItem = returnItem.getPurchaseItem();

            BigDecimal lineTotal = returnItem.getQty()
                    .multiply(returnItem.getPrice())
                    .setScale(2, RoundingMode.HALF_UP);

            lines.add(new PurchaseReturnResponse.Line(
                    purchaseItem.getId(),
                    returnItem.getItem().getId(),
                    returnItem.getItem().getName(),
                    returnItem.getItem().getCompany(),
                    purchaseItem.getBatchNo(),
                    returnItem.getQty(),
                    returnItem.getPrice(),
                    lineTotal
            ));
        }

        return new PurchaseReturnResponse(
                purchaseReturn.getId(),
                purchaseReturn.getPurchase().getId(),
                purchaseReturn.getReturnDate(),
                purchaseReturn.getTotal(),
                purchaseReturn.getNotes(),
                lines
        );
    }
}