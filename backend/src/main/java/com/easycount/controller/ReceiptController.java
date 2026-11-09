
package com.easycount.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.easycount.dto.ReceiptRequest;
import com.easycount.dto.ReceiptResponse;
import com.easycount.service.ReceiptService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:5173")
public class ReceiptController {

    private final ReceiptService service;

    public ReceiptController(ReceiptService service) {
        this.service = service;
    }

    // Get all receipts
    @GetMapping
    public List<ReceiptResponse> all() {
        return service.findAll();
    }

    // Get receipt by ID
    @GetMapping("/{id}")
    public ReceiptResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }

    // Get receipts belonging to a ledger
    @GetMapping("/ledger/{ledgerId}")
    public List<ReceiptResponse> getByLedger(
            @PathVariable Long ledgerId) {
        return service.findByLedger(ledgerId);
    }

    // Create receipt
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReceiptResponse create(
            @Valid @RequestBody ReceiptRequest request) {
        return service.create(request);
    }

    // Update receipt
    @PutMapping("/{id}")
    public ReceiptResponse update(
            @PathVariable Long id,
            @Valid @RequestBody ReceiptRequest request) {
        return service.update(id, request);
    }

    // Delete receipt
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
