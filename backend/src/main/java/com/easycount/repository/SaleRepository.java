package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    List<Sale> findAllByOrderByIdDesc();

    List<Sale> findByLedgerIdOrderByIdDesc(Long ledgerId);
}
