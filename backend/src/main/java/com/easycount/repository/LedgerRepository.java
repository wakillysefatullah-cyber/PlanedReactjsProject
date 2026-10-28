package com.easycount.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.easycount.entity.Ledger;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findByNameContainingIgnoreCase(String name);
}
