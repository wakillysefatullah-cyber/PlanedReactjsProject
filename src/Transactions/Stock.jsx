
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

export default function Stock() {
    const { stock, loading, error, refreshStock } = useInventory();
    const [search, setSearch] = useState("");

    // Filter stock by medicine name.
    const filteredStock = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return stock.filter((item) =>
            item.productName.toLowerCase().includes(searchText)
        );
    }, [stock, search]);

    // Calculate total units in inventory.
    const totalQuantity = stock.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    // Calculate inventory value at purchase cost.
    const totalStockValue = stock.reduce(
        (total, item) =>
            total + Number(item.quantity) * Number(item.purchasePrice),
        0
    );

    return (
        <section className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Stock</h1>
                    <p className="text-gray-500">
                        Manage your available inventory.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            {/* Inventory summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Products</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {stock.length}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Total Quantity</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {totalQuantity}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Stock Value</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {totalStockValue.toLocaleString()} AF
                    </h2>
                </div>
            </div>

            {/* Search and table */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                    <input
                        type="text"
                        placeholder="Search medicine..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-[400px] border border-gray-300 rounded-lg px-4 py-3"
                    />

                    <button
                        type="button"
                        onClick={() => refreshStock().catch(() => {})}
                        disabled={loading}
                        className="bg-emerald-600 text-white px-5 py-3 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Refresh Stock"}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
                        {error}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4 border-b">#</th>
                                <th className="p-4 border-b">Product</th>
                                <th className="p-4 border-b">Quantity</th>
                                <th className="p-4 border-b">Purchase Price</th>
                                <th className="p-4 border-b">Stock Value</th>
                                <th className="p-4 border-b">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-10 text-center text-gray-500">
                                        Loading stock...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="6" className="p-10 text-center text-red-500">
                                        Could not load stock.
                                    </td>
                                </tr>
                            ) : filteredStock.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-10 text-center text-gray-500"
                                    >
                                        {search
                                            ? "No products found."
                                            : "No stock available yet."}
                                    </td>
                                </tr>
                            ) : (
                                filteredStock.map((item, index) => {
                                    const quantity = Number(item.quantity);
                                    const purchasePrice = Number(item.purchasePrice);
                                    const stockValue = quantity * purchasePrice;

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 border-b">
                                                {index + 1}
                                            </td>

                                            <td className="p-4 border-b font-medium">
                                                {item.productName}
                                            </td>

                                            <td className="p-4 border-b">
                                                {quantity} {item.unit}
                                            </td>

                                            <td className="p-4 border-b">
                                                {purchasePrice.toLocaleString()} AF
                                            </td>

                                            <td className="p-4 border-b">
                                                {stockValue.toLocaleString()} AF
                                            </td>

                                            <td className="p-4 border-b">
                                                {quantity === 0 ? (
                                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                        Out of Stock
                                                    </span>
                                                ) : quantity <= 10 ? (
                                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                                        Low Stock
                                                    </span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                                        In Stock
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}