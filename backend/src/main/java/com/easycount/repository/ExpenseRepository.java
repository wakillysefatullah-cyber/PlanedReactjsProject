
package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByOrderByExpenseDateDescIdDesc();

}