package com.easycount.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.SalesReturnItem;

public interface SalesReturnItemRepository
        extends JpaRepository<SalesReturnItem, Long> {

    List<SalesReturnItem> findBySalesReturn_Id(Long salesReturnId);

    @Query("""
        SELECT SUM(item.qty)
        FROM SalesReturnItem item
        WHERE item.saleItem.id = :saleItemId
        """)
    BigDecimal sumReturnedQtyBySaleItemId(
            @Param("saleItemId") Long saleItemId);
}