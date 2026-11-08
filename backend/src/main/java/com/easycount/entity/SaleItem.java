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

    @Column(name = "batch_no")
    private String batchNo;

    @Column(name = "qty", nullable = false)
    private BigDecimal qty;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    // GENERATED ALWAYS AS (...) STORED in PostgreSQL: Hibernate must not write it.
    @Column(name = "line_total", insertable = false, updatable = false)
    private BigDecimal lineTotal;

    public SaleItem(Sale sale, Item item, String batchNo, BigDecimal qty, BigDecimal price) {
        this.sale = sale;
        this.item = item;
        this.batchNo = batchNo;
        this.qty = qty;
        this.price = price;
    }
}