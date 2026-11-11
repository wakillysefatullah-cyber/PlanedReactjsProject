package com.easycount.dto;

import java.math.BigDecimal;

public record DailySalesResponse(
        int day,
        BigDecimal sales
) {
}