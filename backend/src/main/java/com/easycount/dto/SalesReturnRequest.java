package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SalesReturnRequest(

    @NotNull
    @Positive
    Long saleId,

    // Optional: defaults to today in the service.
    LocalDate returnDate,

    String notes,

    @NotEmpty
    List<@NotNull @Valid Line> items

) {

    public record Line(

        // Identifies the exact original sale line and batch.
        @NotNull
        @Positive
        Long saleItemId,

        @NotNull
        @Positive
        BigDecimal qty

    ) {}
}