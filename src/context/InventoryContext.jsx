
import { createContext, useContext, useEffect, useState } from "react";
import { itemApi } from "../api/itemApi.js";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function refreshStock() {
        try {
            setError("");
            const items = await itemApi.getAll();

            setStock(
                items.map((item) => ({
                    id: item.id,
                    productName: item.name,
                    unit: item.unit,
                    company: item.company,
                    quantity: Number(item.stockQty),
                    purchasePrice: Number(item.purchasePrice),
                    salePrice: Number(item.salePrice),
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load stock.");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshStock().catch(() => {});
    }, []);

    return (
        <InventoryContext.Provider
            value={{
                stock,
                loading,
                error,
                refreshStock,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);

    if (!context) {
        throw new Error(
            "useInventory must be used inside InventoryProvider."
        );
    }

    return context;
}