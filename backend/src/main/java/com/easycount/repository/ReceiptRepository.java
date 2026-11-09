
package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.Receipt;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

    List<Receipt> findAllByOrderByIdDesc();

    List<Receipt> findByLedger_IdOrderByIdDesc(Long ledgerId);
}