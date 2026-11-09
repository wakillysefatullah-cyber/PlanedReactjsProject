
package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

public record ReceiptResponse(

        Long id,
        Long ledgerId,
        String ledgerName,
        BigDecimal amount,
        LocalDate receiptDate,
        String notes,
        OffsetDateTime createdAt

) {}