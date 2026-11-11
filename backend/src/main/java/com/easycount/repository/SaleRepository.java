package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    List<Sale> findAllByOrderByIdDesc();

    List<Sale> findByLedgerIdOrderByIdDesc(Long ledgerId);

    @Query(value = """
        SELECT
            days.day_number AS day,
            COALESCE(SUM(s.total), 0) AS sales
        FROM generate_series(1, CAST(
            EXTRACT(DAY FROM (
                CAST(:year AS INTEGER) || '-' ||
                CAST(:month AS INTEGER) || '-01'
            )::DATE + INTERVAL '1 month - 1 day'
            ) AS INTEGER
        )) AS days(day_number)
        LEFT JOIN sales s
            ON EXTRACT(DAY FROM s.invoice_date) = days.day_number
            AND EXTRACT(MONTH FROM s.invoice_date) = :month
            AND EXTRACT(YEAR FROM s.invoice_date) = :year
        GROUP BY days.day_number
        ORDER BY days.day_number
        """, nativeQuery = true)
List<Object[]> findDailySalesByMonth(
        @Param("year") int year,
        @Param("month") int month
);
}
