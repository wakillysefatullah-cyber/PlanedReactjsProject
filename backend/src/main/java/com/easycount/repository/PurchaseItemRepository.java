package com.easycount.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.PurchaseItem;

import jakarta.persistence.LockModeType;

public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT pi FROM PurchaseItem pi WHERE pi.id = :id")
    Optional<PurchaseItem> findByIdForUpdate(@Param("id") Long id);
}