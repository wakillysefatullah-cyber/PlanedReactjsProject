
package com.easycount.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByNameContainingIgnoreCase(String name);

    Optional<Item> findByNameIgnoreCase(String name);

    Boolean existsByNameIgnoreCase(String name);

    Boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);

    @Modifying(flushAutomatically = true)
    @Query("update Item i set i.stockQty = i.stockQty - :q where i.id = :id and i.stockQty >= :q")
    int decreaseStock(@Param("id") Long id, @Param("q") BigDecimal q);

    @Modifying(flushAutomatically = true)
    @Query("update Item i set i.stockQty = i.stockQty + :q where i.id = :id")
    int increaseStock(@Param("id") Long id, @Param("q") BigDecimal q);

    @Modifying(flushAutomatically = true)
    @Query("update Item i set i.stockQty = i.stockQty + :q, i.purchasePrice = :p where i.id = :id")
    int receiveStock(@Param("id") Long id, @Param("q") BigDecimal q, @Param("p") BigDecimal p);
}
