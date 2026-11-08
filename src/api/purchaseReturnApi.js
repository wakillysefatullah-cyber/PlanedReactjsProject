const API_URL = "http://localhost:8080/api/purchase-returns";

async function handleResponse(response, defaultMessage) {
    if (!response.ok) {
        let message = defaultMessage;

        try {
            const error = await response.json();
            message = error.detail || error.message || error.title || message;
        } catch {
            // Response was not JSON.
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function getPurchaseReturns(purchaseId = null) {
    const url = new URL(API_URL);

    if (purchaseId !== null) {
        url.searchParams.set("purchaseId", purchaseId);
    }

    const response = await fetch(url);
    return handleResponse(response, "Failed to load purchase returns");
}

export async function getPurchaseReturnById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response, "Failed to load purchase return");
}

export async function createPurchaseReturn(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to create purchase return");
}

export async function updatePurchaseReturn(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to update purchase return");
}

export async function deletePurchaseReturn(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response, "Failed to delete purchase return");
}