
package com.easycount.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.ExpenseRequest;
import com.easycount.dto.ExpenseResponse;
import com.easycount.entity.Expense;
import com.easycount.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseService {

    // Inject ExpenseRepository through Lombok's generated constructor
    private final ExpenseRepository expenseRepository;

    // Get all expenses
    @Transactional(readOnly = true)
    public List<ExpenseResponse> getAllExpenses() {

        return expenseRepository.findAllByOrderByExpenseDateDescIdDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get expense by ID
    @Transactional(readOnly = true)
    public ExpenseResponse getExpenseById(Long id) {

        Expense expense = findExpense(id);

        return mapToResponse(expense);
    }

    // Create expense
    public ExpenseResponse createExpense(ExpenseRequest request) {

        validateRequest(request);

        Expense expense = new Expense();

        expense.setTitle(request.title().trim());
        expense.setAmount(request.amount());

        expense.setExpenseDate(
                request.expenseDate() != null
                        ? request.expenseDate()
                        : LocalDate.now()
        );

        expense.setPaymentMethod(
                request.paymentMethod() != null
                        && !request.paymentMethod().isBlank()
                        ? request.paymentMethod().trim()
                        : "Cash"
        );

        Expense savedExpense = expenseRepository.save(expense);

        return mapToResponse(savedExpense);
    }

    // Update expense
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {

        validateRequest(request);

        Expense expense = findExpense(id);

        expense.setTitle(request.title().trim());
        expense.setAmount(request.amount());

        if (request.expenseDate() != null) {
            expense.setExpenseDate(request.expenseDate());
        }

        expense.setPaymentMethod(
                request.paymentMethod() != null
                        && !request.paymentMethod().isBlank()
                        ? request.paymentMethod().trim()
                        : "Cash"
        );

        Expense updatedExpense = expenseRepository.save(expense);

        return mapToResponse(updatedExpense);
    }

    // Delete expense
    public void deleteExpense(Long id) {

        Expense expense = findExpense(id);

        expenseRepository.delete(expense);
    }

    // Find expense or throw 404
    private Expense findExpense(Long id) {

        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Expense not found with ID: " + id
                ));
    }

    // Validate expense request
    private void validateRequest(ExpenseRequest request) {

        if (request == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Expense data is required"
            );
        }

        if (request.title() == null || request.title().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Expense title is required"
            );
        }

        if (request.title().trim().length() > 150) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Expense title cannot exceed 150 characters"
            );
        }

        if (request.amount() == null ||
                request.amount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Expense amount must be greater than zero"
            );
        }

        if (request.paymentMethod() != null &&
                request.paymentMethod().trim().length() > 50) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Payment method cannot exceed 50 characters"
            );
        }
    }

    // Convert Expense entity to ExpenseResponse DTO
    private ExpenseResponse mapToResponse(Expense expense) {

        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                expense.getExpenseDate(),
                expense.getPaymentMethod(),
                expense.getCreatedAt()
        );
    }
}