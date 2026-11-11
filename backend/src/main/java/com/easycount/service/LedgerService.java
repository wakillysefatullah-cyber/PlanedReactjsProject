
package com.easycount.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.easycount.dto.LedgerRequest;
import com.easycount.entity.Ledger;
import com.easycount.repository.LedgerRepository;

@Service
public class LedgerService {

    private static final Set<String> VALID_PREFIXES = Set.of("07");

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
        validatePhone(r.phone());

        Ledger l = new Ledger();
        apply(l, r);
        return repo.save(l);
    }

    public Ledger update(Long id, LedgerRequest r) {
        Ledger l = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ledger not found"));

        validatePhone(r.phone());

        apply(l, r);
        return repo.save(l);
    }

    public void delete(Long id) {

        if (!repo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Ledger not found");
        }

        if (repo.hasTransactionsForLedger(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete this ledger because it has existing sales, purchases, receipts, or payments.");
        }

        repo.deleteById(id);
    }

    private void validatePhone(String phone) {
        boolean valid = phone != null
                && phone.matches("\\d{10}")
                && VALID_PREFIXES.stream()
                        .anyMatch(phone::startsWith);

        if (!valid) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid phone number. It must contain exactly 10 digits and start with 07.");
        }
    }

    private void apply(Ledger l, LedgerRequest r) {
        l.setName(r.name());
        l.setPhone(r.phone());
        l.setArea(r.area());
        l.setAddress(r.address());
    }
}