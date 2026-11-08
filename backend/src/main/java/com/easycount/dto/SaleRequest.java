package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record SaleRequest(

    @NotNull @Positive
    Long ledgerId,

    LocalDate invoiceDate,      // optional, defaults to today

    @PositiveOrZero
    BigDecimal paid,            // optional, defaults to 0

    String notes,

    @NotEmpty
    List<@NotNull @Valid Line> items

) {
    public record Line(

        @NotNull @Positive
        Long itemId,

        String batchNo,

        // BigDecimal: the DB column is NUMERIC(14,3), so kg/litre quantities work
        @NotNull @Positive
        BigDecimal qty,

        @NotNull @PositiveOrZero
        BigDecimal price

    ) {}
}