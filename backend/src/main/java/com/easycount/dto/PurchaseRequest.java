
package com.easycount.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record PurchaseRequest(

    @NotNull
    @Positive
    Long ledgerId,

    LocalDate invoiceDate,

    String notes,

    @PositiveOrZero
    BigDecimal paid,

    @NotEmpty
    List<@NotNull @Valid Line> items

) {

    public record Line(

        // Optional: used when selecting an existing item by ID.
        @Positive
        Long itemId,

        // Used when the user types an item name.
        String itemName,

        String batchNo,

        @NotNull
        @Positive
        BigDecimal qty,

        @NotNull
        @PositiveOrZero
        BigDecimal price

    ) {}
}
