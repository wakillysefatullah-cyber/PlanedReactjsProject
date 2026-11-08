package com.easycount.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "purchase_items")
@Getter
@Setter
@NoArgsConstructor
public class PurchaseItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "batch_no")
    private String batchNo;

    @Column(name = "qty", nullable = false)
    private BigDecimal qty;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "line_total", insertable = false, updatable = false)
    private BigDecimal lineTotal;

    public PurchaseItem(Purchase purchase, Item item, String batchNo, BigDecimal qty, BigDecimal price) {
        this.purchase = purchase;
        this.item = item;
        this.batchNo = batchNo;
        this.qty = qty;
        this.price = price;
    }
}