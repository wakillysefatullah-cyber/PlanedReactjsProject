package com.easycount.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.ItemRequest;
import com.easycount.entity.Item;
import com.easycount.repository.ItemRepository;

@Service
public class ItemService {

    private final ItemRepository repo;

    public ItemService(ItemRepository repo) {
        this.repo = repo;
    }

    public List<Item> findAll(String search) {
        return (search == null || search.isBlank())
                ? repo.findAll()
                : repo.findByNameContainingIgnoreCase(search);
    }

    public Item findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Item not found"));
    }

    public Item create(ItemRequest r) {
        if (repo.existsByNameIgnoreCase(r.name().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Item already exists");
        }
        Item item = new Item();
        apply(item, r);
        return repo.save(item);
    }

    public Item update(Long id, ItemRequest r) {
        Item item = findById(id);

        if (repo.existsByNameIgnoreCaseAndIdNot(r.name().trim(), id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Another item has this name");
        }

        apply(item, r);
        return repo.save(item);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Item not found");
        }

        repo.deleteById(id);
    }

    private void apply(Item item, ItemRequest r) {
        item.setName(r.name().trim());
        item.setUnit(r.unit().trim());
        item.setPurchasePrice(r.purchasePrice());
        item.setSalePrice(r.salePrice());
    }
}