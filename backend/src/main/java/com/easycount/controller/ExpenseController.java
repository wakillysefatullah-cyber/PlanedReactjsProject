
package com.easycount.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.easycount.dto.ExpenseRequest;
import com.easycount.dto.ExpenseResponse;
import com.easycount.service.ExpenseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses() {
        return ResponseEntity.ok(
                expenseService.getAllExpenses()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponse> getExpenseById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                expenseService.getExpenseById(id)
        );
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(
            @RequestBody ExpenseRequest request) {

        ExpenseResponse response =
                expenseService.createExpense(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request) {
        return ResponseEntity.ok(
                expenseService.updateExpense(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}