package com.easycount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycount.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long>  {
    
    List<Item> findByNameContainingIgnoreCase(String name);

    Boolean existsByNameIgnoreCase(String name);

    Boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
