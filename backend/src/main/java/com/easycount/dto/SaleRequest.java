
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

    @NotNull
    @Positive
    Long ledgerId,

    LocalDate invoiceDate,

    String notes,

    @NotEmpty
    List<@NotNull @Valid Line> items

) {
    public record Line(

        @NotNull
        @Positive
        Long itemId,

        String batchNo,

        @NotNull
        @Positive
        Integer qty,

        @NotNull
        @PositiveOrZero
        BigDecimal price

    ) {}
}