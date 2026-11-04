package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record SaleResponse(
        Long id,
        Long ledgerId,
        String ledgerName,
        LocalDate invoiceDate,
        BigDecimal total,
        String notes,
        List<Line> items) {

    public record Line(
            Long itemId,
            String itemName,
            String batchNo,
            BigDecimal qty,
            BigDecimal price,
            BigDecimal lineTotal) {
    }
}