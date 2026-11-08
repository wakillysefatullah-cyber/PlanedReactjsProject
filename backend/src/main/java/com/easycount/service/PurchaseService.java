
package com.easycount.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

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

        Purchase purchase = purchaseRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase not found"
                ));

        return toResponse(purchase);
    }

    @Transactional
    public PurchaseResponse create(PurchaseRequest request) {

        Ledger ledger = ledgerRepo.findById(request.ledgerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Supplier not found"
                ));

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

            // Find an existing item or create a new one.
            Item item = resolveItem(line);

            // Increase stock and update the purchase price.
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

        if (paid.compareTo(total) > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Paid amount cannot exceed purchase total"
            );
        }

        purchase.setTotal(total);
        purchase.setPaid(paid);

        Purchase saved = purchaseRepo.save(purchase);

        return toResponse(saved);
    }

    private Item resolveItem(PurchaseRequest.Line line) {

        // If an item ID was supplied, use that existing item.
        if (line.itemId() != null) {

            return itemRepo.findById(line.itemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Item not found: " + line.itemId()
                    ));
        }

        // Otherwise, use the item name entered by the user.
        String name = line.itemName() == null
                ? ""
                : line.itemName().trim();

        if (name.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please enter an item name"
            );
        }

        // Search for an existing item, ignoring letter case.
        return itemRepo.findByNameIgnoreCase(name)
                .orElseGet(() -> {

                    // Create a new item if it does not exist.
                    Item newItem = new Item();

                    newItem.setName(name);
                    newItem.setUnit("piece");
                    newItem.setPurchasePrice(line.price());
                    newItem.setSalePrice(BigDecimal.ZERO);
                    newItem.setStockQty(BigDecimal.ZERO);

                    return itemRepo.save(newItem);
                });
    }

    @Transactional
    public void delete(Long id) {

        Purchase purchase = purchaseRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Purchase not found"
                ));

        for (PurchaseItem item : purchase.getItems()) {

            int updated = itemRepo.decreaseStock(
                    item.getItem().getId(),
                    item.getQty()
            );

            if (updated == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Cannot delete purchase: some stock has already been sold"
                );
            }
        }

        purchaseRepo.delete(purchase);
    }

    private BigDecimal calculateLineTotal(
            BigDecimal quantity,
            BigDecimal price) {

        return quantity.multiply(price)
                .setScale(2, RoundingMode.HALF_UP);
    }

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
