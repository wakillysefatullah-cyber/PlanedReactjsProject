
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

import com.easycount.dto.SalesReturnRequest;
import com.easycount.dto.SalesReturnResponse;
import com.easycount.entity.Sale;
import com.easycount.entity.SaleItem;
import com.easycount.entity.SalesReturn;
import com.easycount.entity.SalesReturnItem;
import com.easycount.repository.ItemRepository;
import com.easycount.repository.SaleItemRepository;
import com.easycount.repository.SaleRepository;
import com.easycount.repository.SalesReturnItemRepository;
import com.easycount.repository.SalesReturnRepository;

@Service
public class SalesReturnService {

    private final SalesReturnRepository salesReturnRepo;
    private final SalesReturnItemRepository salesReturnItemRepo;
    private final SaleRepository saleRepo;
    private final SaleItemRepository saleItemRepo;
    private final ItemRepository itemRepo;

    public SalesReturnService(
            SalesReturnRepository salesReturnRepo,
            SalesReturnItemRepository salesReturnItemRepo,
            SaleRepository saleRepo,
            SaleItemRepository saleItemRepo,
            ItemRepository itemRepo) {

        this.salesReturnRepo = salesReturnRepo;
        this.salesReturnItemRepo = salesReturnItemRepo;
        this.saleRepo = saleRepo;
        this.saleItemRepo = saleItemRepo;
        this.itemRepo = itemRepo;
    }

    // CREATE SALES RETURN
    @Transactional
    public SalesReturnResponse create(SalesReturnRequest request) {

        Sale sale = saleRepo.findById(request.saleId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sale not found with ID: " + request.saleId()
                ));

        SalesReturn salesReturn = new SalesReturn();
        salesReturn.setSale(sale);

        salesReturn.setReturnDate(
                request.returnDate() != null
                        ? request.returnDate()
                        : LocalDate.now()
        );

        salesReturn.setNotes(request.notes());

        BigDecimal returnTotal = BigDecimal.ZERO;
        Set<Long> processedSaleItemIds = new HashSet<>();

        for (SalesReturnRequest.Line line : request.items()) {

            if (!processedSaleItemIds.add(line.saleItemId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Duplicate sale item ID: " + line.saleItemId()
                );
            }

            SaleItem saleItem = saleItemRepo
                    .findByIdForUpdate(line.saleItemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Sale item not found with ID: " + line.saleItemId()
                    ));

            if (!saleItem.getSale().getId().equals(sale.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Sale item " + line.saleItemId()
                                + " does not belong to sale " + sale.getId()
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

            BigDecimal previouslyReturned =
                    salesReturnItemRepo.sumReturnedQtyBySaleItemId(
                            saleItem.getId()
                    );

            if (previouslyReturned == null) {
                previouslyReturned = BigDecimal.ZERO;
            }

            BigDecimal remainingQty =
                    saleItem.getQty().subtract(previouslyReturned);

            if (returnQty.compareTo(remainingQty) > 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity exceeds the remaining returnable quantity "
                                + "for sale item " + saleItem.getId()
                                + ". Remaining quantity: " + remainingQty
                );
            }

            // Restore returned quantity to stock.
            int updatedRows = itemRepo.increaseStock(
                    saleItem.getItem().getId(),
                    returnQty
            );

            if (updatedRows == 0) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found with ID: " + saleItem.getItem().getId()
                );
            }

            BigDecimal originalPrice = saleItem.getPrice();

            BigDecimal lineTotal = returnQty
                    .multiply(originalPrice)
                    .setScale(2, RoundingMode.HALF_UP);

            SalesReturnItem returnItem = new SalesReturnItem(
                    salesReturn,
                    saleItem,
                    returnQty,
                    originalPrice
            );

            salesReturn.getItems().add(returnItem);

            returnTotal = returnTotal.add(lineTotal);
        }

        salesReturn.setTotal(
                returnTotal.setScale(2, RoundingMode.HALF_UP)
        );

        SalesReturn savedReturn = salesReturnRepo.save(salesReturn);

        return toResponse(savedReturn);
    }

    // UPDATE SALES RETURN
    @Transactional
    public SalesReturnResponse update(Long id, SalesReturnRequest request) {

        SalesReturn salesReturn = salesReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sales return not found with ID: " + id
                ));

        // A return must remain connected to its original sale.
        if (!salesReturn.getSale().getId().equals(request.saleId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A sales return cannot be moved to another sale."
            );
        }

        // Remember the old quantities before replacing the return lines.
        Map<Long, BigDecimal> oldQuantities = new HashMap<>();

        for (SalesReturnItem oldItem : salesReturn.getItems()) {

            oldQuantities.merge(
                    oldItem.getSaleItem().getId(),
                    oldItem.getQty(),
                    BigDecimal::add
            );

            // Reverse the previous stock increase.
            int updated = itemRepo.decreaseStock(
                    oldItem.getItem().getId(),
                    oldItem.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Cannot edit this return because some returned stock "
                                + "has already been sold or removed."
                );
            }
        }

        Set<Long> processedIds = new HashSet<>();
        BigDecimal newTotal = BigDecimal.ZERO;

        // Prepare the replacement return items.
        List<SalesReturnItem> newItems = new ArrayList<>();

        for (SalesReturnRequest.Line line : request.items()) {

            if (!processedIds.add(line.saleItemId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Duplicate sale item ID: " + line.saleItemId()
                );
            }

            SaleItem saleItem = saleItemRepo
                    .findByIdForUpdate(line.saleItemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Sale item not found: " + line.saleItemId()
                    ));

            if (!saleItem.getSale().getId()
                    .equals(salesReturn.getSale().getId())) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Selected sale item does not belong to this sale."
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
                    salesReturnItemRepo.sumReturnedQtyBySaleItemId(
                            saleItem.getId()
                    );

            if (alreadyReturned == null) {
                alreadyReturned = BigDecimal.ZERO;
            }

            // Exclude this return's old quantity when calculating availability.
            BigDecimal previousQtyForThisLine = oldQuantities.getOrDefault(
                    saleItem.getId(),
                    BigDecimal.ZERO
            );

            BigDecimal remaining = saleItem.getQty()
                    .subtract(alreadyReturned)
                    .add(previousQtyForThisLine);

            if (qty.compareTo(remaining) > 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Return quantity exceeds the remaining quantity. "
                                + "Available: " + remaining
                );
            }

            // Apply the new stock increase.
            int updated = itemRepo.increaseStock(
                    saleItem.getItem().getId(),
                    qty
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found: " + saleItem.getItem().getId()
                );
            }

            BigDecimal originalPrice = saleItem.getPrice();

            SalesReturnItem newItem = new SalesReturnItem(
                    salesReturn,
                    saleItem,
                    qty,
                    originalPrice
            );

            newItems.add(newItem);

            newTotal = newTotal.add(
                    qty.multiply(originalPrice)
                            .setScale(2, RoundingMode.HALF_UP)
            );
        }

        // IMPORTANT: Replace old return items with the new items.
        // Do this once, after the loop.
        salesReturn.getItems().clear();
        salesReturn.getItems().addAll(newItems);

        salesReturn.setReturnDate(
                request.returnDate() != null
                        ? request.returnDate()
                        : LocalDate.now()
        );

        salesReturn.setNotes(request.notes());

        salesReturn.setTotal(
                newTotal.setScale(2, RoundingMode.HALF_UP)
        );

        return toResponse(salesReturnRepo.save(salesReturn));
    }

    // DELETE SALES RETURN
    @Transactional
    public void delete(Long id) {

        SalesReturn salesReturn = salesReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sales return not found with ID: " + id
                ));

        // Reverse the stock increase caused by this return.
        for (SalesReturnItem returnItem : salesReturn.getItems()) {

            int updated = itemRepo.decreaseStock(
                    returnItem.getItem().getId(),
                    returnItem.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Cannot delete this return because some returned stock "
                                + "has already been sold or removed."
                );
            }
        }

        // Delete only this return and its return lines.
        // The original sale and sale items remain untouched.
        salesReturnRepo.delete(salesReturn);
    }

    // GET ALL SALES RETURNS
    @Transactional(readOnly = true)
    public List<SalesReturnResponse> findAll() {

        return salesReturnRepo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // GET SALES RETURNS BY SALE ID
    @Transactional(readOnly = true)
    public List<SalesReturnResponse> findBySaleId(Long saleId) {

        if (!saleRepo.existsById(saleId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Sale not found with ID: " + saleId
            );
        }

        return salesReturnRepo.findBySale_IdOrderByReturnDateDesc(saleId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // GET ONE SALES RETURN
    @Transactional(readOnly = true)
    public SalesReturnResponse findById(Long id) {

        SalesReturn salesReturn = salesReturnRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sales return not found with ID: " + id
                ));

        return toResponse(salesReturn);
    }

    // MAP ENTITY TO RESPONSE DTO
    private SalesReturnResponse toResponse(SalesReturn salesReturn) {

        List<SalesReturnResponse.Line> lines = new ArrayList<>();

        for (SalesReturnItem returnItem : salesReturn.getItems()) {

            SaleItem saleItem = returnItem.getSaleItem();

            BigDecimal lineTotal = returnItem.getQty()
                    .multiply(returnItem.getPrice())
                    .setScale(2, RoundingMode.HALF_UP);

            lines.add(new SalesReturnResponse.Line(
                    saleItem.getId(),
                    returnItem.getItem().getId(),
                    returnItem.getItem().getName(),
                    returnItem.getItem().getCompany(),
                    saleItem.getBatchNo(),
                    returnItem.getQty(),
                    returnItem.getPrice(),
                    lineTotal
            ));
        }

        return new SalesReturnResponse(
                salesReturn.getId(),
                salesReturn.getSale().getId(),
                salesReturn.getReturnDate(),
                salesReturn.getTotal(),
                salesReturn.getNotes(),
                lines
        );
    }
}