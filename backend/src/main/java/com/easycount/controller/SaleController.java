
package com.easycount.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.easycount.dto.DailySalesResponse;
import com.easycount.dto.SaleRequest;
import com.easycount.dto.SaleResponse;
import com.easycount.service.SaleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SaleController {

    private final SaleService service;

    public SaleController(SaleService saleService) {
        this.service = saleService;
    }

    @GetMapping
    public List<SaleResponse> all(
            @RequestParam(required = false) Long ledgerId) {
        return service.findAll(ledgerId);
    }

    @GetMapping("/{id}")
    public SaleResponse one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SaleResponse create(@Valid @RequestBody SaleRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public SaleResponse update(
            @PathVariable Long id,
            @Valid @RequestBody SaleRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/daily-overview")
    public List<DailySalesResponse> dailySalesOverview(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {

        LocalDate today = LocalDate.now();

        int selectedYear = year != null ? year : today.getYear();
        int selectedMonth = month != null ? month : today.getMonthValue();

        return service.getDailySalesOverview(
                selectedYear, selectedMonth);
    }
}