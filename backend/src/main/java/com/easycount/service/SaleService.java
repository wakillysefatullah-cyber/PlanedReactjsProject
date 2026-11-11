
package com.easycount.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.DailySalesResponse;
import com.easycount.dto.SaleRequest;
import com.easycount.dto.SaleResponse;
import com.easycount.entity.Item;
import com.easycount.entity.Ledger;
import com.easycount.entity.Sale;
import com.easycount.entity.SaleItem;
import com.easycount.repository.ItemRepository;
import com.easycount.repository.LedgerRepository;
import com.easycount.repository.SaleRepository;

@Service
public class SaleService {

    private final SaleRepository saleRepo;
    private final LedgerRepository ledgerRepo;
    private final ItemRepository itemRepo;

    public SaleService(
            SaleRepository saleRepo,
            LedgerRepository ledgerRepo,
            ItemRepository itemRepo) {
        this.saleRepo = saleRepo;
        this.ledgerRepo = ledgerRepo;
        this.itemRepo = itemRepo;
    }

    @Transactional(readOnly = true)
    public List<SaleResponse> findAll(Long ledgerId) {
        List<Sale> sales = ledgerId == null
                ? saleRepo.findAllByOrderByIdDesc()
                : saleRepo.findByLedgerIdOrderByIdDesc(ledgerId);

        return sales.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<DailySalesResponse> getDailySalesOverview(int year, int month) {
        if (year < 1 || month < 1 || month > 12) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid year or month");
        }

        List<Object[]> results = saleRepo.findDailySalesByMonth(year, month);

        return results.stream()
                .map(row -> new DailySalesResponse(
                        ((Number) row[0]).intValue(),
                        new BigDecimal(row[1].toString())))
                .toList();
    }

    @Transactional(readOnly = true)
    public SaleResponse findById(Long id) {
        return toResponse(getSale(id));
    }

    @Transactional
    public SaleResponse create(SaleRequest request) {
        Ledger ledger = getLedger(request.ledgerId());

        Sale sale = new Sale();
        sale.setLedger(ledger);
        sale.setInvoiceDate(
                request.invoiceDate() != null
                        ? request.invoiceDate()
                        : LocalDate.now());
        sale.setNotes(request.notes());

        BigDecimal total = BigDecimal.ZERO;

        for (SaleRequest.Line line : request.items()) {
            Item item = getItem(line.itemId());

            BigDecimal qty = line.qty();
            BigDecimal price = line.price();

            if (item.getStockQty().compareTo(qty) < 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Insufficient stock for item: " + item.getName());
            }

            SaleItem saleItem = new SaleItem(
                    sale, item, line.batchNo(), qty, price);

            sale.getItems().add(saleItem);

            item.setStockQty(item.getStockQty().subtract(qty));

            total = total.add(lineTotal(qty, price));
        }

        BigDecimal paid = request.paid() == null
                ? BigDecimal.ZERO
                : request.paid();

        validatePaid(paid, total);

        sale.setTotal(total);
        sale.setPaid(paid);

        Sale savedSale = saleRepo.save(sale);

        return toResponse(savedSale);
    }

    @Transactional
    public SaleResponse update(Long id, SaleRequest request) {

        // 1. Find the existing sale.
        Sale sale = getSale(id);

        // 2. Restore the quantities from the old sale.
        for (SaleItem oldLine : sale.getItems()) {
            Item oldItem = getItem(oldLine.getItem().getId());

            oldItem.setStockQty(
                    oldItem.getStockQty().add(oldLine.getQty()));
        }

        // 3. Find the updated ledger.
        Ledger ledger = getLedger(request.ledgerId());

        // 4. Remove old sale items.
        // orphanRemoval = true automatically deletes their database rows.
        sale.getItems().clear();

        // 5. Create the updated sale items and deduct their stock.
        BigDecimal total = BigDecimal.ZERO;

        for (SaleRequest.Line line : request.items()) {
            Item item = getItem(line.itemId());

            BigDecimal qty = line.qty();
            BigDecimal price = line.price();

            if (item.getStockQty().compareTo(qty) < 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Insufficient stock for item: " + item.getName());
            }

            SaleItem newLine = new SaleItem(
                    sale, item, line.batchNo(), qty, price);

            sale.getItems().add(newLine);

            item.setStockQty(item.getStockQty().subtract(qty));

            total = total.add(lineTotal(qty, price));
        }

        // 6. Validate the paid amount.
        BigDecimal paid = request.paid() == null
                ? BigDecimal.ZERO
                : request.paid();

        validatePaid(paid, total);

        // 7. Update sale information.
        sale.setLedger(ledger);

        if (request.invoiceDate() != null) {
            sale.setInvoiceDate(request.invoiceDate());
        }

        sale.setNotes(request.notes());
        sale.setTotal(total);
        sale.setPaid(paid);

        // The transaction saves all managed changes automatically.
        return toResponse(sale);
    }

    @Transactional
    public void delete(Long id) {
        Sale sale = getSale(id);

        // Restore stock before deleting the sale.
        for (SaleItem saleItem : sale.getItems()) {
            Item item = getItem(saleItem.getItem().getId());

            item.setStockQty(
                    item.getStockQty().add(saleItem.getQty()));
        }

        saleRepo.delete(sale);
    }

    private Sale getSale(Long id) {
        return saleRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Sale not found"));
    }

    private Ledger getLedger(Long id) {
        return ledgerRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ledger not found"));
    }

    private Item getItem(Long id) {
        return itemRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Item not found: id " + id));
    }

    private void validatePaid(BigDecimal paid, BigDecimal total) {
        if (paid.compareTo(total) > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Paid amount cannot exceed the sale total");
        }
    }

    private BigDecimal lineTotal(BigDecimal qty, BigDecimal price) {
        return qty.multiply(price).setScale(2, RoundingMode.HALF_UP);
    }

    private SaleResponse toResponse(Sale sale) {
        List<SaleResponse.Line> lines = sale.getItems().stream()
                .map(saleItem -> new SaleResponse.Line(
                        saleItem.getId(),
                        saleItem.getItem().getId(),
                        saleItem.getItem().getName(),
                        saleItem.getBatchNo(),
                        saleItem.getQty(),
                        saleItem.getPrice(),
                        lineTotal(saleItem.getQty(), saleItem.getPrice())))
                .toList();

        return new SaleResponse(
                sale.getId(),
                sale.getLedger().getId(),
                sale.getLedger().getName(),
                sale.getInvoiceDate(),
                sale.getTotal(),
                sale.getPaid(),
                sale.getBorrow(),
                sale.getNotes(),
                lines);
    }
}