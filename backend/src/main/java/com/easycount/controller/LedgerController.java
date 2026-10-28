package com.easycount.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.easycount.dto.LedgerRequest;
import com.easycount.entity.Ledger;
import com.easycount.service.LedgerService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ledgers")
@CrossOrigin(origins = "http://localhost:5173")
public class LedgerController {

    private final LedgerService service;

    public LedgerController(LedgerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Ledger> all(@RequestParam(required = false) String search) {
        return service.findAll(search);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ledger create(@Valid @RequestBody LedgerRequest r) {
        return service.create(r);
    }

    @PutMapping("/{id}")
    public Ledger update(@PathVariable Long id, @Valid @RequestBody LedgerRequest r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}