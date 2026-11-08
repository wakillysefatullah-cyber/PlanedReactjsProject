const API_URL = "http://localhost:8080/api/sales";

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

export async function getSales(ledgerId = null) {
    const url = new URL(API_URL);

    if (ledgerId !== null) {
        url.searchParams.set("ledgerId", ledgerId);
    }

    const response = await fetch(url);

    return handleResponse(response, "Failed to load sales");
}

export async function getSaleById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    return handleResponse(response, "Failed to load sale");
}

export async function createSale(sale) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sale),
    });

    return handleResponse(response, "Failed to create sale");
}

export async function deleteSale(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response, "Failed to delete sale");
}