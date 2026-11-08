package com.easycount.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.PurchaseReturnItem;

public interface PurchaseReturnItemRepository extends JpaRepository<PurchaseReturnItem, Long> {

    List<PurchaseReturnItem> findByPurchaseReturn_Id(Long purchaseReturnId);

    @Query("""
        SELECT SUM(item.qty)
        FROM PurchaseReturnItem item
        WHERE item.purchaseItem.id = :purchaseItemId
        """)
    BigDecimal sumReturnedQtyByPurchaseItemId(
            @Param("purchaseItemId") Long purchaseItemId);
}