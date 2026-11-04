import { api } from "./api";

export const itemApi = {
    getAll: (search = "") => api.get(`/items?search=${encodeURIComponent(search)}`),
    getById: (id) => api.get(`/items/${id}`),
    create: (data) => api.post("/items", data),
    update: (id, data) => api.put(`/items/${id}`, data),
    remove: (id) => api.del(`/items/${id}`),
};