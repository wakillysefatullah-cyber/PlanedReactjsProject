
package com.easycount.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sales")
@Getter
@Setter
@NoArgsConstructor
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ledger_id", nullable = false)
    private Ledger ledger;

    @Column(name = "invoice_date", nullable = false)
    private LocalDate invoiceDate;

    @Column(name = "total", precision = 14, scale = 2, nullable = false)
    private BigDecimal total = BigDecimal.ZERO;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @OneToMany(
        mappedBy = "sale",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<SaleItem> items = new ArrayList<>();

    public void addItem(SaleItem item) {
    items.add(item);
    item.setSale(this);
}

}