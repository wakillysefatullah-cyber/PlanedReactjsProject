package com.easycount.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.SaleItem;

import jakarta.persistence.LockModeType;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT si FROM SaleItem si WHERE si.id = :id")
    Optional<SaleItem> findByIdForUpdate(@Param("id") Long id);
}