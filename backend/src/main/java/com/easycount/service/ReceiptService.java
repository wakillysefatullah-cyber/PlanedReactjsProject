
package com.easycount.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.ReceiptRequest;
import com.easycount.dto.ReceiptResponse;
import com.easycount.entity.Ledger;
import com.easycount.entity.Receipt;
import com.easycount.repository.LedgerRepository;
import com.easycount.repository.ReceiptRepository;

@Service
@Transactional
public class ReceiptService {

    private final ReceiptRepository receiptRepo;
    private final LedgerRepository ledgerRepo;

    public ReceiptService(
            ReceiptRepository receiptRepo,
            LedgerRepository ledgerRepo) {
        this.receiptRepo = receiptRepo;
        this.ledgerRepo = ledgerRepo;
    }

    @Transactional(readOnly = true)
    public List<ReceiptResponse> findAll() {
        return receiptRepo.findAllByOrderByIdDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReceiptResponse> findByLedger(Long ledgerId) {

        if (!ledgerRepo.existsById(ledgerId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Ledger not found");
        }

        return receiptRepo.findByLedger_IdOrderByIdDesc(ledgerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReceiptResponse findById(Long id) {
        Receipt receipt = receiptRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Receipt not found"));

        return toResponse(receipt);
    }

    public ReceiptResponse create(ReceiptRequest request) {

        Ledger ledger = findLedger(request.ledgerId());

        Receipt receipt = new Receipt();
        apply(receipt, request, ledger);

        Receipt saved = receiptRepo.save(receipt);

        return toResponse(saved);
    }

    public ReceiptResponse update(Long id, ReceiptRequest request) {

        Receipt receipt = receiptRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Receipt not found"));

        Ledger ledger = findLedger(request.ledgerId());

        apply(receipt, request, ledger);

        Receipt updated = receiptRepo.save(receipt);

        return toResponse(updated);
    }

    public void delete(Long id) {

        Receipt receipt = receiptRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Receipt not found"));

        receiptRepo.delete(receipt);
    }

    private Ledger findLedger(Long ledgerId) {
        return ledgerRepo.findById(ledgerId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ledger not found"));
    }

    private void apply(
            Receipt receipt,
            ReceiptRequest request,
            Ledger ledger) {

        receipt.setLedger(ledger);
        receipt.setAmount(request.amount());
        receipt.setReceiptDate(request.receiptDate());
        receipt.setNotes(request.notes());
    }

    private ReceiptResponse toResponse(Receipt receipt) {

        return new ReceiptResponse(
                receipt.getId(),
                receipt.getLedger().getId(),
                receipt.getLedger().getName(),
                receipt.getAmount(),
                receipt.getReceiptDate(),
                receipt.getNotes(),
                receipt.getCreatedAt()
        );
    }
}