import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPurchases } from "../api/purchaseApi.js";
import {
    getPurchaseReturns,
    createPurchaseReturn,
    updatePurchaseReturn,
    deletePurchaseReturn,
} from "../api/purchaseReturnApi.js";

export default function PurReturn() {
    const [purchases, setPurchases] = useState([]);
    const [returns, setReturns] = useState([]);

    const [purchaseId, setPurchaseId] = useState("");
    const [purchaseItemId, setPurchaseItemId] = useState("");
    const [qty, setQty] = useState("");

    const [editingReturn, setEditingReturn] = useState(null);
    const [editingPurchaseItemId, setEditingPurchaseItemId] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const selectedPurchase = useMemo(
        () =>
            purchases.find(
                (purchase) => String(purchase.id) === String(purchaseId)
            ),
        [purchases, purchaseId]
    );

    const selectedPurchaseItem = useMemo(
        () =>
            selectedPurchase?.items?.find(
                (item) =>
                    String(item.purchaseItemId) === String(purchaseItemId)
            ),
        [selectedPurchase, purchaseItemId]
    );

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const [purchasesData, returnsData] = await Promise.all([
                getPurchases(),
                getPurchaseReturns(),
            ]);

            setPurchases(purchasesData || []);
            setReturns(returnsData || []);
        } catch (err) {
            setError(err.message || "Failed to load purchase return data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const returnedQuantity = (originalPurchaseItemId) => {
        return returns.reduce((total, returnRecord) => {
            if (Number(returnRecord.purchaseId) !== Number(purchaseId)) {
                return total;
            }

            const lineQuantity = (returnRecord.items || [])
                .filter(
                    (line) =>
                        Number(line.purchaseItemId) ===
                        Number(originalPurchaseItemId)
                )
                .reduce((sum, line) => sum + Number(line.qty || 0), 0);

            return total + lineQuantity;
        }, 0);
    };

    const currentEditedQuantity = () => {
        if (!editingReturn || editingPurchaseItemId === null) {
            return 0;
        }

        const line = editingReturn.items?.find(
            (item) =>
                Number(item.purchaseItemId) ===
                Number(editingPurchaseItemId)
        );

        return Number(line?.qty || 0);
    };

    const availableQuantity = selectedPurchaseItem
        ? Number(selectedPurchaseItem.qty || 0) -
          returnedQuantity(selectedPurchaseItem.purchaseItemId) +
          (Number(selectedPurchaseItem.purchaseItemId) ===
          Number(editingPurchaseItemId)
              ? currentEditedQuantity()
              : 0)
        : 0;

    function resetForm() {
        setPurchaseId("");
        setPurchaseItemId("");
        setQty("");
        setEditingReturn(null);
        setEditingPurchaseItemId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!purchaseId || !purchaseItemId || !qty) {
            setError("Please select an invoice, product, and quantity.");
            return;
        }

        const quantity = Number(qty);

        if (!Number.isFinite(quantity) || quantity <= 0) {
            setError("Return quantity must be greater than zero.");
            return;
        }

        if (quantity > availableQuantity) {
            setError(
                `You can return a maximum of ${availableQuantity} for this product.`
            );
            return;
        }

        try {
            setSaving(true);

            if (editingReturn) {
                // Preserve every other product line in this return.
                const updatedItems = editingReturn.items.map((line) => ({
                    purchaseItemId: line.purchaseItemId,
                    qty:
                        Number(line.purchaseItemId) ===
                        Number(editingPurchaseItemId)
                            ? quantity
                            : Number(line.qty),
                }));

                await updatePurchaseReturn(editingReturn.id, {
                    purchaseId: editingReturn.purchaseId,
                    returnDate: editingReturn.returnDate,
                    notes: editingReturn.notes,
                    items: updatedItems,
                });

                setSuccess("Purchase return updated successfully.");
            } else {
                await createPurchaseReturn({
                    purchaseId: Number(purchaseId),
                    items: [
                        {
                            purchaseItemId: Number(purchaseItemId),
                            qty: quantity,
                        },
                    ],
                });

                setSuccess("Purchase return added successfully.");
            }

            resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || "Unable to save purchase return.");
        } finally {
            setSaving(false);
        }
    }

    function handleEdit(returnRecord, line) {
        setError("");
        setSuccess("");

        setEditingReturn(returnRecord);
        setEditingPurchaseItemId(line.purchaseItemId);
        setPurchaseId(String(returnRecord.purchaseId));
        setPurchaseItemId(String(line.purchaseItemId));
        setQty(String(line.qty));
    }

    async function handleDelete(returnId) {
        const confirmed = window.confirm(
            "This will delete the entire return record, including all its product lines. The original purchase invoice will remain unchanged. Continue?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deletePurchaseReturn(returnId);

            if (editingReturn?.id === returnId) {
                resetForm();
            }

            setSuccess("Purchase return deleted successfully.");
            await loadData();
        } catch (err) {
            setError(err.message || "Unable to delete purchase return.");
        }
    }

    const rows = returns.flatMap((returnRecord) =>
        (returnRecord.items || []).map((line) => ({
            key: `${returnRecord.id}-${line.purchaseItemId}`,
            returnId: returnRecord.id,
            purchaseId: returnRecord.purchaseId,
            returnDate: returnRecord.returnDate,
            name: line.itemName,
            qty: line.qty,
            price: line.price,
            total: line.lineTotal,
            line,
            returnRecord,
        }))
    );

    const filteredRows = rows.filter((row) => {
        const text = search.toLowerCase();

        return (
            String(row.name || "").toLowerCase().includes(text) ||
            String(row.purchaseId || "").includes(text) ||
            String(row.returnId || "").includes(text)
        );
    });

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Purchases Return</h1>
                    <p>Manage your Purchases Return professionally</p>
                </div>

                <Link to="/" className="border rounded-md px-4 py-2">
                    Back
                </Link>
            </div>

            <div className="my-5">
                <input
                    type="text"
                    placeholder="Search purchase returns..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
                />
            </div>

            {error && (
                <p className="text-red-600 my-3">{error}</p>
            )}

            {success && (
                <p className="text-green-700 my-3">{success}</p>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap items-end gap-5 my-5"
            >
                <div className="flex flex-col gap-1">
                    <label>Purchase Invoice</label>
                    <select
                        value={purchaseId}
                        onChange={(e) => {
                            setPurchaseId(e.target.value);
                            setPurchaseItemId("");
                        }}
                        disabled={Boolean(editingReturn)}
                        className="w-52 py-2 rounded-md pl-2 border"
                    >
                        <option value="">Select invoice</option>
                        {purchases.map((purchase) => (
                            <option key={purchase.id} value={purchase.id}>
                                Invoice #{purchase.id} - {purchase.invoiceDate}
                                {purchase.ledgerName
                                    ? ` - ${purchase.ledgerName}`
                                    : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Product</label>
                    <select
                        value={purchaseItemId}
                        onChange={(e) => setPurchaseItemId(e.target.value)}
                        disabled={!selectedPurchase || Boolean(editingReturn)}
                        className="w-52 py-2 rounded-md pl-2 border"
                    >
                        <option value="">Select product</option>
                        {(selectedPurchase?.items || []).map((item) => (
                            <option
                                key={item.purchaseItemId}
                                value={item.purchaseItemId}
                            >
                                {item.itemName} - Batch: {item.batchNo || "-"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Return Qty</label>
                    <input
                        type="number"
                        min="0.01"
                        step="any"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        placeholder="Quantity"
                        className="w-52 py-2 rounded-md pl-2 border"
                    />
                    {selectedPurchaseItem && (
                        <span className="text-sm text-gray-600">
                            Available to return: {availableQuantity}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label>Original Price</label>
                    <input
                        type="text"
                        value={selectedPurchaseItem?.price ?? ""}
                        readOnly
                        placeholder="Auto-filled"
                        className="w-52 py-2 rounded-md pl-2 border bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving || loading}
                    className="hover:text-white hover:bg-black px-5 py-2 rounded-md border disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : editingReturn
                          ? "Update Return"
                          : "Add"}
                </button>

                {editingReturn && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-5 py-2 rounded-md border"
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-olive-500">
                        <tr>
                            <th className="p-3">Sn</th>
                            <th className="p-3">Return ID</th>
                            <th className="p-3">Purchase Invoice</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center p-5">
                                    Loading purchase returns...
                                </td>
                            </tr>
                        ) : filteredRows.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-5">
                                    No purchase returns found.
                                </td>
                            </tr>
                        ) : (
                            filteredRows.map((row, index) => (
                                <tr
                                    key={row.key}
                                    className="border-b hover:bg-olive-300 hover:scale-101 duration-200"
                                >
                                    <td className="p-3 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.returnId}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.purchaseId}
                                    </td>
                                    <td className="p-3">{row.name}</td>
                                    <td className="p-3 text-center">
                                        {row.qty}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.price}
                                    </td>
                                    <td className="p-3 text-center">
                                        {row.total}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    row.returnRecord,
                                                    row.line
                                                )
                                            }
                                            className="border rounded px-3 py-1 mx-1 hover:bg-black hover:text-white"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(row.returnId)
                                            }
                                            className="border rounded px-3 py-1 mx-1 hover:bg-red-600 hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}