
package com.easycount.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.LedgerRequest;
import com.easycount.entity.Ledger;
import com.easycount.repository.LedgerRepository;

@Service
public class LedgerService {

    private final LedgerRepository repo;

    public LedgerService(LedgerRepository repo) {
        this.repo = repo;
    }

    public List<Ledger> findAll(String search) {
        return (search == null || search.isBlank())
                ? repo.findAll()
                : repo.findByNameContainingIgnoreCase(search);
    }

    public Ledger create(LedgerRequest r) {
        Ledger l = new Ledger();
        apply(l, r);
        return repo.save(l);
    }

    public Ledger update(Long id, LedgerRequest r) {
        Ledger l = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ledger not found"));

        apply(l, r);
        return repo.save(l);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Ledger not found");
        }

        repo.deleteById(id);
    }

    private void apply(Ledger l, LedgerRequest r) {
        l.setName(r.name());
        l.setPhone(r.phone());
        l.setArea(r.area());
        l.setAddress(r.address());
    }
}
