
package com.easycount.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
    public SaleResponse findById(Long id) {
        return toResponse(getSale(id));
    }

    @Transactional
    public SaleResponse create(SaleRequest request) {

        Ledger ledger = ledgerRepo.findById(request.ledgerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ledger not found"));

        Sale sale = new Sale();
        sale.setLedger(ledger);
        sale.setInvoiceDate(request.invoiceDate() != null
                ? request.invoiceDate()
                : LocalDate.now());
        sale.setNotes(request.notes());

        BigDecimal total = BigDecimal.ZERO;

        for (SaleRequest.Line line : request.items()) {

            Item item = itemRepo.findById(line.itemId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Item not found: id " + line.itemId()));

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

        if (paid.compareTo(total) > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Paid amount cannot exceed the sale total");
        }

        sale.setTotal(total);
        sale.setPaid(paid);

        Sale savedSale = saleRepo.save(sale);
        return toResponse(savedSale);
    }

    @Transactional
    public void delete(Long id) {

        Sale sale = getSale(id);

        for (SaleItem saleItem : sale.getItems()) {
            Item item = itemRepo.findById(saleItem.getItem().getId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Item not found"));

            item.setStockQty(item.getStockQty().add(saleItem.getQty()));
        }

        saleRepo.delete(sale);
    }

    private Sale getSale(Long id) {
        return saleRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Sale not found"));
    }

    private BigDecimal lineTotal(BigDecimal qty, BigDecimal price) {
        return qty.multiply(price).setScale(2, RoundingMode.HALF_UP);
    }

    private SaleResponse toResponse(Sale sale) {

        List<SaleResponse.Line> lines = sale.getItems()
                .stream()
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
