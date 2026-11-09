
package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ReceiptRequest(

        @NotNull(message = "Ledger ID is required")
        Long ledgerId,

        @NotNull(message = "Receipt amount is required")
        @Positive(message = "Receipt amount must be greater than zero")
        BigDecimal amount,

        @NotNull(message = "Receipt date is required")
        LocalDate receiptDate,

        @Size(max = 2000, message = "Notes cannot exceed 2000 characters")
        String notes

) {}
