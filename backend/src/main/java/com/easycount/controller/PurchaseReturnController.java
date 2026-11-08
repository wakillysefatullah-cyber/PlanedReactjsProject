package com.easycount.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.easycount.dto.PurchaseReturnRequest;
import com.easycount.dto.PurchaseReturnResponse;
import com.easycount.service.PurchaseReturnService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/purchase-returns")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5179"})
public class PurchaseReturnController {

    private final PurchaseReturnService service;

    public PurchaseReturnController(PurchaseReturnService service) {
        this.service = service;
    }

    @GetMapping
    public List<PurchaseReturnResponse> all(
            @RequestParam(required = false) Long purchaseId) {

        if (purchaseId != null) {
            return service.findByPurchaseId(purchaseId);
        }

        return service.findAll();
    }

    @GetMapping("/{id}")
    public PurchaseReturnResponse one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseReturnResponse create(
            @Valid @RequestBody PurchaseReturnRequest request) {

        return service.create(request);
    }

    @PutMapping("/{id}")
    public PurchaseReturnResponse update(
            @PathVariable Long id,
            @Valid @RequestBody PurchaseReturnRequest request) {

        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}