
package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        String title,
        BigDecimal amount,
        LocalDate expenseDate,
        String paymentMethod
) {
}