
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLedgers } from "../api/ledgerApi";
import { itemApi } from "../api/itemApi";
import { createSale, getSales } from "../api/saleApi";

export default function Sales() {
    const [customers, setCustomers] = useState([]);
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
    const [success, setSuccess] = useState("");

    const selectedProduct = items.find(
        (item) => String(item.id) === String(itemId)
    );

    const saleQuantity = Number(quantity) || 0;
    const salePrice = Number(price) || 0;
    const paidAmount = Number(paid) || 0;

    const total = saleQuantity * salePrice;
    const borrowed = Math.max(total - paidAmount, 0);

    const availableQuantity = Number(selectedProduct?.stockQty ?? 0);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const getSaleItems = (sale) => {
        return sale.items || sale.lines || [];
    };

    const loadData = async () => {
        try {
            setError("");

            const [customerData, itemData, salesData] = await Promise.all([
                getLedgers(),
                itemApi.getAll(),
                getSales(),
            ]);

            setCustomers(customerData || []);
            setItems(itemData || []);
            setSales(salesData || []);
        } catch (err) {
            console.error("Failed to load sales data:", err);
            setError(
                err.message || "Failed to load customers, products, or sales."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const clearForm = () => {
        setCustomerId("");
        setItemId("");
        setQuantity("");
        setPrice("");
        setPaid("");
    };

    const handleProductChange = (value) => {
        setItemId(value);

        const product = items.find(
            (item) => String(item.id) === String(value)
        );

        setPrice(
            product?.sellingPrice != null
                ? String(product.sellingPrice)
                : ""
        );
    };

    const handleSale = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!customerId || !itemId || !quantity || !price || paid === "") {
            setError("Please fill in all required fields.");
            return;
        }

        if (!Number.isFinite(saleQuantity) || saleQuantity <= 0) {
            setError("Quantity must be greater than zero.");
            return;
        }

        if (!Number.isFinite(salePrice) || salePrice <= 0) {
            setError("Selling price must be greater than zero.");
            return;
        }

        if (!Number.isFinite(paidAmount) || paidAmount < 0) {
            setError("Paid amount cannot be negative.");
            return;
        }

        if (paidAmount > total) {
            setError("Paid amount cannot be greater than the total.");
            return;
        }

        if (!selectedProduct) {
            setError("Please select a valid product.");
            return;
        }

        if (saleQuantity > availableQuantity) {
            setError(
                `Insufficient stock. Available quantity: ${availableQuantity}`
            );
            return;
        }

        const saleRequest = {
            ledgerId: Number(customerId),
            invoiceDate: getTodayDate(),
            paid: paidAmount,
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

            await createSale(saleRequest);

            clearForm();

            // Reload the latest backend data, including updated stock.
            await loadData();

            setSuccess("Sale created successfully.");
        } catch (err) {
            console.error("Failed to create sale:", err);
            setError(err.message || "Failed to create sale.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <section className="p-6">
                <h1 className="text-3xl font-bold">Sales</h1>
                <p className="mt-4 text-gray-500">
                    Loading customers, products, and sales...
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sales
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Create sales and manage customer transactions.
                    </p>
                </div>

                <Link
                    to="/"
                    className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-500"
                >
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <form
                    onSubmit={handleSale}
                    className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                        New Sale
                    </h2>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Customer
                        </label>

                        <select
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-400"
                            required
                        >
                            <option value="">Select customer</option>

                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Product
                        </label>

                        <select
                            value={itemId}
                            onChange={(e) => handleProductChange(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-400"
                            required
                        >
                            <option value="">Select product</option>

                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {selectedProduct && (
                            <p className="mt-1 text-xs text-gray-500">
                                Available stock: {availableQuantity}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="0.001"
                            step="0.001"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter quantity"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Selling Price
                        </label>

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter selling price"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Paid Amount
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={paid}
                            onChange={(e) => setPaid(e.target.value)}
                            placeholder="Enter paid amount"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-400"
                            required
                        />
                    </div>

                    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total</span>
                            <span className="font-semibold">
                                {formatMoney(total)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Paid</span>
                            <span className="font-semibold text-green-700">
                                {formatMoney(paidAmount)}
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 pt-2 text-sm">
                            <span className="font-medium text-gray-700">
                                Remaining
                            </span>
                            <span className="font-bold text-red-600">
                                {formatMoney(borrowed)}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Creating Sale..." : "Create Sale"}
                    </button>
                </form>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Sales History
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Recent sales recorded in the system.
                        </p>
                    </div>

                    {sales.length === 0 ? (
                        <p className="p-6 text-center text-gray-500">
                            No sales found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Qty</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Paid</th>
                                        <th className="px-4 py-3">Due</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {sales.map((sale) => {
                                        const saleItems = getSaleItems(sale);

                                        const saleTotal = Number(
                                            sale.total ??
                                            saleItems.reduce(
                                                (sum, line) =>
                                                    sum +
                                                    Number(line.qty || 0) *
                                                    Number(line.price || 0),
                                                0
                                            )
                                        );

                                        const salePaid = Number(sale.paid || 0);

                                        return saleItems.map((line, index) => (
                                            <tr key={`${sale.id}-${index}`}>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    {sale.invoiceDate || "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {sale.ledgerName ||
                                                        sale.customerName ||
                                                        sale.ledger?.name ||
                                                        "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {line.itemName ||
                                                        line.name ||
                                                        "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {line.qty ?? "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {formatMoney(
                                                        saleItems.length === 1
                                                            ? saleTotal
                                                            : Number(line.qty || 0) *
                                                              Number(line.price || 0)
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 text-green-700">
                                                    {formatMoney(salePaid)}
                                                </td>

                                                <td className="px-4 py-3 text-red-600">
                                                    {formatMoney(
                                                        Math.max(
                                                            saleTotal - salePaid,
                                                            0
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
