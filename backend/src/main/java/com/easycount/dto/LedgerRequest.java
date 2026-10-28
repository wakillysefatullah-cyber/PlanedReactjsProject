package com.easycount.dto;

import jakarta.validation.constraints.NotBlank;

public record LedgerRequest(
        @NotBlank String name,
        @NotBlank String phone,
        @NotBlank String area,
        @NotBlank String address) {
}