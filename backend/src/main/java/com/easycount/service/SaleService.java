
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
import com.easycount.entity.SaleItem;
import com.easycount.entity.Ledger;
import com.easycount.entity.Sale;
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

        List<Sale> sales = (ledgerId == null)
                ? saleRepo.findAllByOrderByIdDesc()
                : saleRepo.findByLedgerIdOrderByIdDesc(ledgerId);

        return sales.stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SaleResponse findById(Long id) {
        return toResponse(getSale(id));
    }

    @Transactional
    public SaleResponse create(SaleRequest r) {

        Ledger ledger = ledgerRepo.findById(r.ledgerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ledger not found"));

        Sale sale = new Sale();

        sale.setLedger(ledger);
        sale.setInvoiceDate(
                r.invoiceDate() != null
                        ? r.invoiceDate()
                        : LocalDate.now());

        sale.setNotes(r.notes());

        BigDecimal total = BigDecimal.ZERO;

        for (SaleRequest.Line line : r.items()) {

            Item item = resolveItem(line);

            BigDecimal qty = line.qty();

            if (item.getStockQty().compareTo(qty) < 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Insufficient stock for item: " + item.getName());
            }

            BigDecimal price = line.price() != null
                    ? line.price()
                    : item.getSalePrice();

            BigDecimal lineTotal = qty.multiply(price)
                    .setScale(2, RoundingMode.HALF_UP);

            SaleItem saleItem = new SaleItem();

            saleItem.setItem(item);
            saleItem.setBatchNo(line.batchNo());
            saleItem.setQty(qty);
            saleItem.setPrice(price);

            sale.addItem(saleItem);

            item.setStockQty(item.getStockQty().subtract(qty));

            total = total.add(lineTotal);
        }

        sale.setTotal(total);

        Sale savedSale = saleRepo.save(sale);

        return toResponse(savedSale);
    }

    @Transactional
public void delete(Long id) {

    Sale sale = getSale(id);

    // Restore stock for every item in this sale
    for (SaleItem saleItem : sale.getItems()) {

        Long itemId = saleItem.getItem().getId();

        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found: id " + itemId));

        item.setStockQty(
                item.getStockQty().add(saleItem.getQty()));
    }

    // Delete sale and its associated sale items
    saleRepo.delete(sale);
}

    private Sale getSale(Long id) {

        return saleRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sale not found"));
    }

    private Item resolveItem(SaleRequest.Line line) {

        Long itemId = line.itemId();

        return itemRepo.findById(itemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found: id " + itemId));
    }

    private SaleResponse toResponse(Sale s) {

        List<SaleResponse.Line> lines = s.getItems().stream()
                .map(si -> new SaleResponse.Line(
                        si.getItem().getId(),
                        si.getItem().getName(),
                        si.getBatchNo(),
                        si.getQty(),
                        si.getPrice(),
                        si.getQty()
                                .multiply(si.getPrice())
                                .setScale(2, RoundingMode.HALF_UP)))
                .toList();

        return new SaleResponse(
                s.getId(),
                s.getLedger().getId(),
                s.getLedger().getName(),
                s.getInvoiceDate(),
                s.getTotal(),
                s.getNotes(),
                lines);
    }
}