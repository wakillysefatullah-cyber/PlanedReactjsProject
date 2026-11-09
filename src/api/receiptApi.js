
const API_URL = "http://localhost:8080/api/receipts";

// Get all receipts
export async function getReceipts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load receipts");
    }

    return response.json();
}

// Get receipt by ID
export async function getReceiptById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to load receipt");
    }

    return response.json();
}

// Get receipts by ledger
export async function getReceiptsByLedger(ledgerId) {
    const response = await fetch(`${API_URL}/ledger/${ledgerId}`);

    if (!response.ok) {
        throw new Error("Failed to load ledger receipts");
    }

    return response.json();
}

// Create receipt
export async function createReceipt(receipt) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create receipt");
    }

    return response.json();
}

// Update receipt
export async function updateReceipt(id, receipt) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update receipt");
    }

    return response.json();
}

// Delete receipt
export async function deleteReceipt(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to delete receipt");
    }
}