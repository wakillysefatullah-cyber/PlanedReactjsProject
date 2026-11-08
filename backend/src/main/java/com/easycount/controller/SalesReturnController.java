package com.easycount.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.easycount.dto.SalesReturnRequest;
import com.easycount.dto.SalesReturnResponse;
import com.easycount.service.SalesReturnService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sales-returns")
@CrossOrigin(origins = "http://localhost:5173")
public class SalesReturnController {

    private final SalesReturnService service;

    public SalesReturnController(SalesReturnService service) {
        this.service = service;
    }

    @GetMapping
    public List<SalesReturnResponse> all(
            @RequestParam(required = false) Long saleId) {

        if (saleId != null) {
            return service.findBySaleId(saleId);
        }

        return service.findAll();
    }

    @GetMapping("/{id}")
    public SalesReturnResponse one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SalesReturnResponse create(
            @Valid @RequestBody SalesReturnRequest request) {

        return service.create(request);
    }

    @PutMapping("/{id}")
    public SalesReturnResponse update(
            @PathVariable Long id,
            @Valid @RequestBody SalesReturnRequest request) {

        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}