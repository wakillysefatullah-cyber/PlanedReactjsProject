package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycount.entity.Ledger;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {

    List<Ledger> findByNameContainingIgnoreCase(String name);

    @Query(value = """
            SELECT EXISTS (
                SELECT 1 FROM sales WHERE ledger_id = :ledgerId
                UNION ALL
                SELECT 1 FROM purchases WHERE ledger_id = :ledgerId
                UNION ALL
                SELECT 1 FROM receipts WHERE ledger_id = :ledgerId
                UNION ALL
                SELECT 1 FROM payments WHERE ledger_id = :ledgerId
            )
            """, nativeQuery = true)
    boolean hasTransactionsForLedger(@Param("ledgerId") Long ledgerId);
}