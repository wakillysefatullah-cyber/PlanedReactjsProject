package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.SalesReturn;

public interface SalesReturnRepository extends JpaRepository<SalesReturn, Long> {

    List<SalesReturn> findBySale_IdOrderByReturnDateDesc(Long saleId);
}