package com.easycount.entity;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "company")
    private String company;

    @Column(name = "purchase_price", nullable = false)
    private BigDecimal purchasePrice = BigDecimal.ZERO;

    @Column(name = "sale_price", nullable = false)
    private BigDecimal salePrice = BigDecimal.ZERO;

    // Never set from a request: only purchases/sales/returns change stock.
    @Column(name = "stock_qty", nullable = false)
    private BigDecimal stockQty = BigDecimal.ZERO;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;
}