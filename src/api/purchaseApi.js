
const API_URL = "http://localhost:8080/api/purchases";

async function handleResponse(response, defaultMessage) {
    if (!response.ok) {
        let message = defaultMessage;

        try {
            const error = await response.json();
            message =
                error.detail ||
                error.message ||
                error.title ||
                message;
        } catch {
            // Response did not contain JSON.
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function getPurchases(ledgerId = null) {
    const url = new URL(API_URL);

    if (ledgerId !== null) {
        url.searchParams.set("ledgerId", ledgerId);
    }

    const response = await fetch(url);

    return handleResponse(
        response,
        "Failed to load purchases"
    );
}

export async function getPurchaseById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    return handleResponse(
        response,
        "Failed to load purchase"
    );
}

export async function createPurchase(purchase) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
    });

    return handleResponse(
        response,
        "Failed to create purchase"
    );
}

export async function updatePurchase(id, purchase) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
    });

    return handleResponse(
        response,
        "Failed to update purchase"
    );
}

export async function deletePurchase(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(
        response,
        "Failed to delete purchase"
    );
}
