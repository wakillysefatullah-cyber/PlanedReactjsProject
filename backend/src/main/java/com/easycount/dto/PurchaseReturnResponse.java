package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PurchaseReturnResponse(

    Long id,

    Long purchaseId,

    LocalDate returnDate,

    BigDecimal total,

    String notes,

    List<Line> items

) {

    public record Line(

        Long purchaseItemId,

        Long itemId,

        String itemName,

        String company,

        String batchNo,

        BigDecimal qty,

        BigDecimal price,

        BigDecimal lineTotal

    ) {}
}