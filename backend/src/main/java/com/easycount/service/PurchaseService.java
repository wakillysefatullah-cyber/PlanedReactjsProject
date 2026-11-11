
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

import com.easycount.dto.PurchaseRequest;
import com.easycount.dto.PurchaseResponse;
import com.easycount.entity.Item;
import com.easycount.entity.Ledger;
import com.easycount.entity.Purchase;
import com.easycount.entity.PurchaseItem;
import com.easycount.repository.ItemRepository;
import com.easycount.repository.LedgerRepository;
import com.easycount.repository.PurchaseRepository;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepo;
    private final LedgerRepository ledgerRepo;
    private final ItemRepository itemRepo;

    public PurchaseService(
            PurchaseRepository purchaseRepo,
            LedgerRepository ledgerRepo,
            ItemRepository itemRepo) {

        this.purchaseRepo = purchaseRepo;
        this.ledgerRepo = ledgerRepo;
        this.itemRepo = itemRepo;
    }

    @Transactional(readOnly = true)
    public List<PurchaseResponse> findAll(Long ledgerId) {

        List<Purchase> purchases = (ledgerId == null)
                ? purchaseRepo.findAllByOrderByIdDesc()
                : purchaseRepo.findByLedgerIdOrderByIdDesc(ledgerId);

        return purchases.stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PurchaseResponse findById(Long id) {

        Purchase purchase = findPurchase(id);

        return toResponse(purchase);
    }

    // CREATE PURCHASE
    @Transactional
    public PurchaseResponse create(PurchaseRequest request) {

        Ledger ledger = findLedger(request.ledgerId());

        Purchase purchase = new Purchase();

        purchase.setLedger(ledger);

        purchase.setInvoiceDate(
                request.invoiceDate() != null
                        ? request.invoiceDate()
                        : LocalDate.now()
        );

        purchase.setNotes(request.notes());

        BigDecimal total = BigDecimal.ZERO;

        for (PurchaseRequest.Line line : request.items()) {

            Item item = resolveItem(line);

            int updated = itemRepo.receiveStock(
                    item.getId(),
                    line.qty(),
                    line.price()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Could not update item stock"
                );
            }

            PurchaseItem purchaseItem = new PurchaseItem(
                    purchase,
                    item,
                    line.batchNo(),
                    line.qty(),
                    line.price()
            );

            purchase.getItems().add(purchaseItem);

            total = total.add(
                    calculateLineTotal(line.qty(), line.price())
            );
        }

        BigDecimal paid = request.paid() == null
                ? BigDecimal.ZERO
                : request.paid();

        validatePaid(paid, total);

        purchase.setTotal(total);
        purchase.setPaid(paid);

        Purchase saved = purchaseRepo.save(purchase);

        return toResponse(saved);
    }

    // UPDATE PURCHASE
    @Transactional
    public PurchaseResponse update(Long id, PurchaseRequest request) {

        Purchase purchase = findPurchase(id);

        Ledger ledger = findLedger(request.ledgerId());

        /*
         * First, collect the quantities from the old purchase.
         * This tells us how much stock this purchase previously added.
         */
        Map<Long, BigDecimal> oldQuantities = new HashMap<>();

        for (PurchaseItem oldItem : purchase.getItems()) {

            Long itemId = oldItem.getItem().getId();

            oldQuantities.merge(
                    itemId,
                    oldItem.getQty(),
                    BigDecimal::add
            );
        }

        /*
         * Resolve the new purchase items and calculate their quantities.
         */
        Map<Long, BigDecimal> newQuantities = new HashMap<>();
        Map<Long, BigDecimal> newPrices = new HashMap<>();

        List<PurchaseItem> newPurchaseItems = new ArrayList<>();

        BigDecimal newTotal = BigDecimal.ZERO;

        for (PurchaseRequest.Line line : request.items()) {

            Item item = resolveItem(line);

            Long itemId = item.getId();

            newQuantities.merge(
                    itemId,
                    line.qty(),
                    BigDecimal::add
            );

            newPrices.put(itemId, line.price());

            PurchaseItem purchaseItem = new PurchaseItem(
                    purchase,
                    item,
                    line.batchNo(),
                    line.qty(),
                    line.price()
            );

            newPurchaseItems.add(purchaseItem);

            newTotal = newTotal.add(
                    calculateLineTotal(line.qty(), line.price())
            );
        }

        BigDecimal paid = request.paid() == null
                ? BigDecimal.ZERO
                : request.paid();

        validatePaid(paid, newTotal);

        /*
         * Compare old and new quantities.
         *
         * Example:
         * Old purchase = 5 mice.
         * New purchase = 8 mice.
         * Stock increase = 3 mice.
         *
         * Example:
         * Old purchase = 8 mice.
         * New purchase = 5 mice.
         * Stock decrease = 3 mice.
         */
        Set<Long> affectedItemIds = new HashSet<>();

        affectedItemIds.addAll(oldQuantities.keySet());
        affectedItemIds.addAll(newQuantities.keySet());

        for (Long itemId : affectedItemIds) {

            BigDecimal oldQty = oldQuantities.getOrDefault(
                    itemId,
                    BigDecimal.ZERO
            );

            BigDecimal newQty = newQuantities.getOrDefault(
                    itemId,
                    BigDecimal.ZERO
            );

            BigDecimal difference = newQty.subtract(oldQty);

            if (difference.compareTo(BigDecimal.ZERO) > 0) {

                // More quantity was added to this purchase.
                BigDecimal price = newPrices.get(itemId);

                int updated = itemRepo.receiveStock(
                        itemId,
                        difference,
                        price
                );

                if (updated == 0) {
                    throw new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Could not increase stock for item ID: " + itemId
                    );
                }

            } else if (difference.compareTo(BigDecimal.ZERO) < 0) {

                // Quantity was reduced or item was removed.
                BigDecimal quantityToRemove = difference.abs();

                int updated = itemRepo.decreaseStock(
                        itemId,
                        quantityToRemove
                );

                if (updated == 0) {
                    throw new ResponseStatusException(
                            HttpStatus.CONFLICT,
                            "Cannot update purchase: insufficient stock for item ID: "
                                    + itemId
                                    + ". Some quantity may already have been sold."
                    );
                }

                // Keep the item's current purchase price in sync.
                if (newPrices.containsKey(itemId)) {
                    itemRepo.updatePurchasePrice(
                            itemId,
                            newPrices.get(itemId)
                    );
                }

            } else if (newPrices.containsKey(itemId)) {

                // Quantity is unchanged, but the purchase price may have changed.
                itemRepo.updatePurchasePrice(
                        itemId,
                        newPrices.get(itemId)
                );
            }
        }

        /*
         * Update purchase information.
         */
        purchase.setLedger(ledger);

        if (request.invoiceDate() != null) {
            purchase.setInvoiceDate(request.invoiceDate());
        }

        purchase.setNotes(request.notes());
        purchase.setTotal(newTotal);
        purchase.setPaid(paid);

        /*
         * Remove old purchase items.
         * orphanRemoval = true deletes old rows automatically.
         */
        purchase.getItems().clear();

        // Add the new purchase items.
        purchase.getItems().addAll(newPurchaseItems);

        Purchase saved = purchaseRepo.save(purchase);

        return toResponse(saved);
    }

    // DELETE PURCHASE
    @Transactional
    public void delete(Long id) {

        Purchase purchase = findPurchase(id);

        /*
         * Remove the stock originally added by this purchase.
         * If that quantity has already been sold, deletion is rejected.
         */
        for (PurchaseItem purchaseItem : purchase.getItems()) {

            int updated = itemRepo.decreaseStock(
                    purchaseItem.getItem().getId(),
                    purchaseItem.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Cannot delete purchase: some stock has already been sold."
                );
            }
        }

        /*
         * Purchase.java has:
         * cascade = CascadeType.ALL
         * orphanRemoval = true
         *
         * Therefore, its purchase_items rows are deleted automatically.
         */
        purchaseRepo.delete(purchase);
    }

    // FIND PURCHASE
    private Purchase findPurchase(Long id) {

        return purchaseRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase not found"
                ));
    }

    // FIND SUPPLIER
    private Ledger findLedger(Long ledgerId) {

        return ledgerRepo.findById(ledgerId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Supplier not found"
                ));
    }

    // FIND OR CREATE ITEM
    private Item resolveItem(PurchaseRequest.Line line) {

        if (line.itemId() != null) {

            return itemRepo.findById(line.itemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Item not found: " + line.itemId()
                    ));
        }

        String name = line.itemName() == null
                ? ""
                : line.itemName().trim();

        if (name.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please enter an item name"
            );
        }

        return itemRepo.findByNameIgnoreCase(name)
                .orElseGet(() -> {

                    Item newItem = new Item();

                    newItem.setName(name);
                    newItem.setUnit("piece");
                    newItem.setPurchasePrice(line.price());
                    newItem.setSalePrice(BigDecimal.ZERO);
                    newItem.setStockQty(BigDecimal.ZERO);

                    return itemRepo.save(newItem);
                });
    }

    // VALIDATE PAYMENT
    private void validatePaid(BigDecimal paid, BigDecimal total) {

        if (paid.compareTo(BigDecimal.ZERO) < 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Paid amount cannot be negative"
            );
        }

        if (paid.compareTo(total) > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Paid amount cannot exceed purchase total"
            );
        }
    }

    // CALCULATE LINE TOTAL
    private BigDecimal calculateLineTotal(
            BigDecimal quantity,
            BigDecimal price) {

        return quantity.multiply(price)
                .setScale(2, RoundingMode.HALF_UP);
    }

    // CONVERT ENTITY TO RESPONSE
    private PurchaseResponse toResponse(Purchase purchase) {

        List<PurchaseResponse.Line> lines =
                purchase.getItems().stream()
                        .map(item -> new PurchaseResponse.Line(
                                item.getId(),
                                item.getItem().getId(),
                                item.getItem().getName(),
                                item.getBatchNo(),
                                item.getQty(),
                                item.getPrice(),
                                calculateLineTotal(
                                        item.getQty(),
                                        item.getPrice()
                                )
                        ))
                        .toList();

        BigDecimal borrow = purchase.getTotal()
                .subtract(purchase.getPaid());

        return new PurchaseResponse(
                purchase.getId(),
                purchase.getLedger().getId(),
                purchase.getLedger().getName(),
                purchase.getInvoiceDate(),
                purchase.getTotal(),
                purchase.getPaid(),
                borrow,
                purchase.getNotes(),
                lines
        );
    }
}