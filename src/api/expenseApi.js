
const API_URL = "http://localhost:8080/api/expenses";

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

export async function getExpenses() {
    const response = await fetch(API_URL);

    return handleResponse(response, "Failed to load expenses");
}

export async function getExpenseById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    return handleResponse(response, "Failed to load expense");
}

export async function createExpense(expense) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    return handleResponse(response, "Failed to create expense");
}

export async function updateExpense(id, expense) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    return handleResponse(response, "Failed to update expense");
}

export async function deleteExpense(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response, "Failed to delete expense");
}