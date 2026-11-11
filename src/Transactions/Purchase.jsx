
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLedgers } from "../api/ledgerApi";
import {
    getPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
} from "../api/purchaseApi";

export default function Purchase() {
    const [ledgers, setLedgers] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const [supplierId, setSupplierId] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [paid, setPaid] = useState("");

    const [editId, setEditId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadData() {
        try {
            setError("");

            const [ledgerData, purchaseData] = await Promise.all([
                getLedgers(),
                getPurchases(),
            ]);

            setLedgers(ledgerData);
            setPurchases(purchaseData);
        } catch (err) {
            setError(err.message || "Failed to load purchase data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const total = Number(quantity || 0) * Number(price || 0);
    const borrowed = total - Number(paid || 0);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function clearForm() {
        setSupplierId("");
        setItemName("");
        setQuantity("");
        setPrice("");
        setPaid("");
        setEditId(null);
    }

    function formatMoney(value) {
        return Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function getPurchaseLines(purchase) {
        return purchase.lines || purchase.items || [];
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !supplierId ||
            !itemName.trim() ||
            quantity === "" ||
            price === "" ||
            paid === ""
        ) {
            alert("Please fill out all required fields.");
            return;
        }

        const amount = Number(quantity);
        const purchasePrice = Number(price);
        const paidAmount = Number(paid);

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Quantity must be greater than zero.");
            return;
        }

        if (!Number.isFinite(purchasePrice) || purchasePrice < 0) {
            alert("Enter a valid purchase price.");
            return;
        }

        if (!Number.isFinite(paidAmount) || paidAmount < 0) {
            alert("Enter a valid paid amount.");
            return;
        }

        const purchaseTotal = amount * purchasePrice;

        if (paidAmount > purchaseTotal) {
            alert("Paid amount cannot exceed purchase total.");
            return;
        }

        const purchaseRequest = {
            ledgerId: Number(supplierId),
            invoiceDate: getTodayDate(),
            paid: paidAmount,
            notes: null,
            items: [
                {
                    itemName: itemName.trim(),
                    batchNo: null,
                    qty: amount,
                    price: purchasePrice,
                },
            ],
        };

        try {
            setSaving(true);
            setError("");

            if (editId !== null) {
                await updatePurchase(editId, purchaseRequest);
                alert("Purchase updated successfully!");
            } else {
                await createPurchase(purchaseRequest);
                alert("Purchase saved successfully!");
            }

            await loadData();
            clearForm();
        } catch (err) {
            alert(err.message || "Failed to save purchase.");
        } finally {
            setSaving(false);
        }
    }

    function handleEdit(purchase) {
        const lines = getPurchaseLines(purchase);

        if (lines.length !== 1) {
            alert(
                "This form currently edits purchases containing exactly one item."
            );
            return;
        }

        const line = lines[0];

        setEditId(purchase.id);
        setSupplierId(String(purchase.ledgerId));
        setItemName(line.itemName || "");
        setQuantity(String(line.qty));
        setPrice(String(line.price));
        setPaid(String(purchase.paid ?? 0));

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleDelete(id) {
        console.log("DELETE CLICKED - Purchase ID:", id);

        const confirmed = window.confirm(
            "Are you sure you want to delete this purchase? Its purchased quantity will be removed from stock."
        );

        if (!confirmed) {
            console.log("Purchase deletion cancelled.");
            return;
        }

        try {
            setDeletingId(id);
            setError("");

            console.log("Sending DELETE request for purchase:", id);

            await deletePurchase(id);

            if (editId === id) {
                clearForm();
            }

            await loadData();

            alert("Purchase deleted successfully!");
            console.log("Purchase deleted successfully:", id);
        } catch (err) {
            console.error("Purchase deletion failed:", err);
            alert(err.message || "Could not delete purchase.");
        } finally {
            setDeletingId(null);
        }
    }

    const totalPurchaseAmount = purchases.reduce(
        (sum, purchase) => sum + Number(purchase.total || 0),
        0
    );

    const totalPaid = purchases.reduce(
        (sum, purchase) => sum + Number(purchase.paid || 0),
        0
    );

    const totalBorrowed = purchases.reduce(
        (sum, purchase) =>
            sum +
            Number(
                purchase.borrow ??
                (Number(purchase.total || 0) -
                    Number(purchase.paid || 0))
            ),
        0
    );

    if (loading) {
        return (
            <section className="p-6">
                <h1 className="text-3xl font-bold">Purchase</h1>
                <p className="mt-4 text-gray-500">
                    Loading purchase data...
                </p>
            </section>
        );
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Purchase</h1>
                    <p className="text-gray-500">
                        Record purchased items and increase stock.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-5">
                    {error}
                    <button
                        type="button"
                        onClick={loadData}
                        className="ml-3 underline font-semibold"
                    >
                        Retry
                    </button>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-4 mb-6"
            >
                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                >
                    <option value="">Select supplier</option>

                    {ledgers.map((ledger) => (
                        <option key={ledger.id} value={ledger.id}>
                            {ledger.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                />

                <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                />

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Purchase price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                />

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Paid amount"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : editId !== null
                            ? "Update Purchase"
                            : "Save Purchase"}
                </button>

                {editId !== null && (
                    <button
                        type="button"
                        onClick={clearForm}
                        className="bg-gray-500 text-white px-5 py-3 rounded-md"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <p>
                    <strong>Purchase total:</strong>{" "}
                    {formatMoney(total)} AF
                </p>

                <p>
                    <strong>Borrowed:</strong>{" "}
                    {formatMoney(borrowed)} AF
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100 border-b-2">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Supplier</th>
                            <th className="p-3">Item</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Paid</th>
                            <th className="p-3">Borrowed</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchases.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="p-6 text-gray-500"
                                >
                                    No purchases recorded yet.
                                </td>
                            </tr>
                        ) : (
                            purchases.flatMap(
                                (purchase, purchaseIndex) =>
                                    getPurchaseLines(purchase).map(
                                        (line, lineIndex) => (
                                            <tr
                                                key={`${purchase.id}-${lineIndex}`}
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    {purchaseIndex + 1}
                                                </td>

                                                <td className="p-3">
                                                    {purchase.invoiceDate}
                                                </td>

                                                <td className="p-3">
                                                    {purchase.ledgerName}
                                                </td>

                                                <td className="p-3">
                                                    {line.itemName}
                                                </td>

                                                <td className="p-3">
                                                    {line.qty}
                                                </td>

                                                <td className="p-3">
                                                    {formatMoney(line.price)} AF
                                                </td>

                                                <td className="p-3 text-green-600">
                                                    {formatMoney(purchase.paid)} AF
                                                </td>

                                                <td className="p-3 text-red-600">
                                                    {formatMoney(
                                                        purchase.borrow ??
                                                        (Number(purchase.total) -
                                                            Number(purchase.paid))
                                                    )} AF
                                                </td>

                                                <td className="p-3 font-semibold">
                                                    {formatMoney(purchase.total)} AF
                                                </td>

                                                <td className="p-3 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(purchase)
                                                        }
                                                        className="bg-black text-white px-3 py-1 rounded mr-2"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={deletingId === purchase.id}
                                                        onClick={() => {
                                                            console.log(
                                                                "DELETE BUTTON CLICKED:",
                                                                purchase.id
                                                            );
                                                            handleDelete(purchase.id);
                                                        }}
                                                        className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {deletingId === purchase.id
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600">Total Purchase</p>
                    <h2 className="text-xl font-bold">
                        {formatMoney(totalPurchaseAmount)} AF
                    </h2>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600">Total Paid</p>
                    <h2 className="text-xl font-bold text-green-700">
                        {formatMoney(totalPaid)} AF
                    </h2>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-gray-600">Total Borrowed</p>
                    <h2 className="text-xl font-bold text-red-700">
                        {formatMoney(totalBorrowed)} AF
                    </h2>
                </div>
            </div>
        </section>
    );
}