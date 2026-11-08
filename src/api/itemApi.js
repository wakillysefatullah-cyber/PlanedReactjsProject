const API_URL = "http://localhost:8080/api/items";

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

const jsonRequest = (method, data) => ({
    method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

export const itemApi = {
    getAll: async (search = "") => {
        const url = new URL(API_URL);

        if (search.trim()) {
            url.searchParams.set("search", search);
        }

        return handleResponse(
            await fetch(url),
            "Failed to load items"
        );
    },

    getById: async (id) =>
        handleResponse(
            await fetch(`${API_URL}/${id}`),
            "Failed to load item"
        ),

    create: async (data) =>
        handleResponse(
            await fetch(API_URL, jsonRequest("POST", data)),
            "Failed to create item"
        ),

    update: async (id, data) =>
        handleResponse(
            await fetch(`${API_URL}/${id}`, jsonRequest("PUT", data)),
            "Failed to update item"
        ),

    remove: async (id) =>
        handleResponse(
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            }),
            "Failed to delete item"
        ),
};