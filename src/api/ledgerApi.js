
const API_URL = "http://localhost:8080/api/ledgers";

// Get all ledgers from Spring Boot
export async function getLedgers(search = "") {
    const url = new URL(API_URL);

    if (search.trim()) {
        url.searchParams.set("search", search);
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to load ledgers");
    }

    return response.json();
}

// Create a new ledger
export async function createLedger(ledger) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ledger),
    });

    if (!response.ok) {
        throw new Error("Failed to create ledger");
    }

    return response.json();
}

// Update an existing ledger
export async function updateLedger(id, ledger) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ledger),
    });

    if (!response.ok) {
        throw new Error("Failed to update ledger");
    }

    return response.json();
}

// Delete a ledger
export async function deleteLedger(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete ledger");
    }
}
