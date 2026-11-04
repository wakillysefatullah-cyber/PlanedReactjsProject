package com.easycount.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ItemRequest(
    @NotBlank String name,
    @NotBlank String unit,
    @NotNull @PositiveOrZero BigDecimal purchasePrice,
    @NotNull @PositiveOrZero BigDecimal salePrice
) {}