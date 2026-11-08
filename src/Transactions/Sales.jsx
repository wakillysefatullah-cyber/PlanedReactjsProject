
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLedgers } from "../api/ledgerApi";
import { itemApi } from "../api/itemApi";
import { createSale, getSales } from "../api/saleApi";

export default function Sales() {
    const [ledgers, setLedgers] = useState([]);
    const [items, setItems] = useState([]);
    const [sales, setSales] = useState([]);

    const [customerId, setCustomerId] = useState("");
    const [itemId, setItemId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [paid, setPaid] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadData() {
        try {
            setError("");

            const [ledgerData, itemData, saleData] = await Promise.all([
                getLedgers(),
                itemApi.getAll(),
                getSales(),
            ]);

            setLedgers(ledgerData);
            setItems(itemData);
            setSales(saleData);
        } catch (err) {
            setError(err.message || "Failed to load sales data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const selectedProduct = items.find(
        (item) => item.id === Number(itemId)
    );

    const availableQuantity = selectedProduct
        ? Number(selectedProduct.stockQty)
        : 0;

    const total = Number(quantity || 0) * Number(price || 0);
    const borrowed = total - Number(paid || 0);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    async function handleSale(e) {
        e.preventDefault();

        if (!customerId || !itemId || quantity === "" || price === "") {
            alert("Please fill out all required fields.");
            return;
        }

        const saleQuantity = Number(quantity);
        const salePrice = Number(price);
        const salePaid = Number(paid || 0);

        if (!Number.isInteger(saleQuantity) || saleQuantity <= 0) {
            alert("Quantity must be a positive whole number.");
            return;
        }

        if (!Number.isFinite(salePrice) || salePrice < 0) {
            alert("Please enter a valid sale price.");
            return;
        }

        if (!Number.isFinite(salePaid) || salePaid < 0) {
            alert("Please enter a valid paid amount.");
            return;
        }

        if (!selectedProduct) {
            alert("Please select a valid item.");
            return;
        }

        if (saleQuantity > availableQuantity) {
            alert(`Only ${availableQuantity} units are available.`);
            return;
        }

        const saleTotal = saleQuantity * salePrice;

        if (salePaid > saleTotal) {
            alert("Paid amount cannot be greater than the total.");
            return;
        }

        const saleRequest = {
            ledgerId: Number(customerId),
            invoiceDate: getTodayDate(),
            paid: salePaid,
            notes: null,
            items: [
                {
                    itemId: Number(itemId),
                    batchNo: null,
                    qty: saleQuantity,
                    price: salePrice,
                },
            ],
        };

        try {
            setSaving(true);
            setError("");

            await createSale(saleRequest);
            await loadData();

            setCustomerId("");
            setItemId("");
            setQuantity("");
            setPrice("");
            setPaid("");

            alert("Sale saved successfully!");
        } catch (err) {
            alert(err.message || "Failed to save sale.");
        } finally {
            setSaving(false);
        }
    }

    function formatMoney(value) {
        return Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function getSaleItems(sale) {
        return sale.items || sale.lines || [];
    }

    if (loading) {
        return (
            <section className="p-6">
                <h1 className="text-3xl font-bold">Sales</h1>
                <p className="mt-4 text-gray-500">
                    Loading customers, items and sales...
                </p>
            </section>
        );
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Sales</h1>
                    <p className="text-gray-500">
                        Record sales and update item stock.
                    </p>
                </div>

                <Link to="/" className="bg-black text-white px-5 py-2 rounded-md">
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

            <form onSubmit={handleSale} className="flex flex-wrap gap-4 mb-8">
                <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                >
                    <option value="">Select customer</option>
                    {ledgers.map((ledger) => (
                        <option key={ledger.id} value={ledger.id}>
                            {ledger.name}
                        </option>
                    ))}
                </select>

                <select
                    value={itemId}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        setItemId(selectedId);

                        const product = items.find(
                            (item) => item.id === Number(selectedId)
                        );

                        setPrice(
                            product ? String(product.salePrice ?? "") : ""
                        );
                    }}
                    className="border p-3 rounded-md"
                    required
                >
                    <option value="">Select item</option>
                    {items.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                            disabled={Number(item.stockQty) <= 0}
                        >
                            {item.name} — Stock: {item.stockQty}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    step="1"
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
                    placeholder="Sale price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-md"
                    required
                />

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Paid"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Complete Sale"}
                </button>
            </form>

            {selectedProduct && (
                <div className="mb-4 text-emerald-700">
                    <p>Available quantity: {availableQuantity}</p>
                    <p>Total: {formatMoney(total)} AF</p>
                    <p>Borrowed: {formatMoney(borrowed)} AF</p>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100 border-b-2">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Item</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Paid</th>
                            <th className="p-3">Borrowed</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sales.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="p-6 text-gray-500">
                                    No sales recorded yet.
                                </td>
                            </tr>
                        ) : (
                            sales.flatMap((sale, saleIndex) =>
                                getSaleItems(sale).map((line, lineIndex) => (
                                    <tr
                                        key={`${sale.id}-${lineIndex}`}
                                        className="border-b"
                                    >
                                        <td className="p-3">{saleIndex + 1}</td>
                                        <td className="p-3">{sale.invoiceDate}</td>
                                        <td className="p-3">{sale.ledgerName}</td>
                                        <td className="p-3">{line.itemName}</td>
                                        <td className="p-3">{line.qty}</td>
                                        <td className="p-3">
                                            {formatMoney(line.price)} AF
                                        </td>
                                        <td className="p-3">
                                            {formatMoney(sale.paid)} AF
                                        </td>
                                        <td className="p-3">
                                            {formatMoney(sale.borrow)} AF
                                        </td>
                                        <td className="p-3">
                                            {formatMoney(sale.total)} AF
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}