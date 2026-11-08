const API_URL = "http://localhost:8080/api/sales-returns";

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

export async function getSalesReturns(saleId = null) {
    const url = new URL(API_URL);

    if (saleId !== null) {
        url.searchParams.set("saleId", saleId);
    }

    const response = await fetch(url);
    return handleResponse(response, "Failed to load sales returns");
}

export async function getSalesReturnById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response, "Failed to load sales return");
}

export async function createSalesReturn(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to create sales return");
}

export async function updateSalesReturn(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to update sales return");
}

export async function deleteSalesReturn(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response, "Failed to delete sales return");
}

export async function getSaleById(id) {
    const response = await fetch(`http://localhost:8080/api/sales/${id}`);
    return handleResponse(response, "Failed to load sale");
}