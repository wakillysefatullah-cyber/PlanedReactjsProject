package com.easycount.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sale_items")
@Getter
@Setter
@NoArgsConstructor
public class SaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "batch_no", length = 50)
    private String batchNo;

    @Column(name = "qty", precision = 14, scale = 3, nullable = false)
    private BigDecimal qty;

    @Column(name = "price", precision = 14, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(
        name = "line_total",
        precision = 14,
        scale = 2,
        insertable = false,
        updatable = false
    )
    private BigDecimal lineTotal;
}