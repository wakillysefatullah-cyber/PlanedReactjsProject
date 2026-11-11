
package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

public record ExpenseResponse(
        Long id,
        String title,
        BigDecimal amount,
        LocalDate expenseDate,
        String paymentMethod,
        OffsetDateTime createdAt
) {
}