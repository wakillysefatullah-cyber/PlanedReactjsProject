import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getSales } from "../api/saleApi.js";
import {
    getSalesReturns,
    createSalesReturn,
    updateSalesReturn,
    deleteSalesReturn,
} from "../api/salesReturnApi.js";

export default function SalesReturn() {
    const [sales, setSales] = useState([]);
    const [returns, setReturns] = useState([]);

    const [saleId, setSaleId] = useState("");
    const [saleItemId, setSaleItemId] = useState("");
    const [qty, setQty] = useState("");

    const [editingReturn, setEditingReturn] = useState(null);
    const [editingSaleItemId, setEditingSaleItemId] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const selectedSale = useMemo(
        () => sales.find((sale) => String(sale.id) === String(saleId)),
        [sales, saleId]
    );

    const selectedSaleItem = useMemo(
        () =>
            selectedSale?.items?.find(
                (item) => String(item.saleItemId) === String(saleItemId)
            ),
        [selectedSale, saleItemId]
    );

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const [salesData, returnsData] = await Promise.all([
                getSales(),
                getSalesReturns(),
            ]);

            setSales(salesData || []);
            setReturns(returnsData || []);
        } catch (err) {
            setError(err.message || "Failed to load sales return data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const returnedQuantity = (originalSaleItemId) => {
        return returns.reduce((total, returnRecord) => {
            if (Number(returnRecord.saleId) !== Number(saleId)) {
                return total;
            }

            const lineQuantity = (returnRecord.items || [])
                .filter(
                    (line) =>
                        Number(line.saleItemId) === Number(originalSaleItemId)
                )
                .reduce((sum, line) => sum + Number(line.qty || 0), 0);

            return total + lineQuantity;
        }, 0);
    };

    const currentEditedQuantity = () => {
        if (!editingReturn || editingSaleItemId === null) {
            return 0;
        }

        const line = editingReturn.items?.find(
            (item) =>
                Number(item.saleItemId) === Number(editingSaleItemId)
        );

        return Number(line?.qty || 0);
    };

    const availableQuantity = selectedSaleItem
        ? Number(selectedSaleItem.qty || 0) -
          returnedQuantity(selectedSaleItem.saleItemId) +
          (Number(selectedSaleItem.saleItemId) === Number(editingSaleItemId)
              ? currentEditedQuantity()
              : 0)
        : 0;

    function resetForm() {
        setSaleId("");
        setSaleItemId("");
        setQty("");
        setEditingReturn(null);
        setEditingSaleItemId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!saleId || !saleItemId || !qty) {
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
                    saleItemId: line.saleItemId,
                    qty:
                        Number(line.saleItemId) === Number(editingSaleItemId)
                            ? quantity
                            : Number(line.qty),
                }));

                await updateSalesReturn(editingReturn.id, {
                    saleId: editingReturn.saleId,
                    returnDate: editingReturn.returnDate,
                    notes: editingReturn.notes,
                    items: updatedItems,
                });

                setSuccess("Sales return updated successfully.");
            } else {
                await createSalesReturn({
                    saleId: Number(saleId),
                    items: [
                        {
                            saleItemId: Number(saleItemId),
                            qty: quantity,
                        },
                    ],
                });

                setSuccess("Sales return added successfully.");
            }

            resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || "Unable to save sales return.");
        } finally {
            setSaving(false);
        }
    }

    function handleEdit(returnRecord, line) {
        setError("");
        setSuccess("");

        setEditingReturn(returnRecord);
        setEditingSaleItemId(line.saleItemId);
        setSaleId(String(returnRecord.saleId));
        setSaleItemId(String(line.saleItemId));
        setQty(String(line.qty));
    }

    async function handleDelete(returnId) {
        const confirmed = window.confirm(
            "This will delete the entire return record, including all its product lines. The original sale invoice will remain unchanged. Continue?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteSalesReturn(returnId);

            if (editingReturn?.id === returnId) {
                resetForm();
            }

            setSuccess("Sales return deleted successfully.");
            await loadData();
        } catch (err) {
            setError(err.message || "Unable to delete sales return.");
        }
    }

    const rows = returns.flatMap((returnRecord) =>
        (returnRecord.items || []).map((line) => ({
            key: `${returnRecord.id}-${line.saleItemId}`,
            returnId: returnRecord.id,
            saleId: returnRecord.saleId,
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
            String(row.saleId || "").includes(text) ||
            String(row.returnId || "").includes(text)
        );
    });

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Sales Return</h1>
                    <p>Manage your Sales Return professionally</p>
                </div>

                <Link to="/" className="border rounded-md px-4 py-2">
                    Back
                </Link>
            </div>

            <div className="my-5">
                <input
                    type="text"
                    placeholder="Search sales returns..."
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
                    <label>Sale Invoice</label>
                    <select
                        value={saleId}
                        onChange={(e) => {
                            setSaleId(e.target.value);
                            setSaleItemId("");
                        }}
                        disabled={Boolean(editingReturn)}
                        className="w-52 py-2 rounded-md pl-2 border"
                    >
                        <option value="">Select invoice</option>
                        {sales.map((sale) => (
                            <option key={sale.id} value={sale.id}>
                                Invoice #{sale.id} - {sale.invoiceDate}
                                {sale.ledgerName ? ` - ${sale.ledgerName}` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Product</label>
                    <select
                        value={saleItemId}
                        onChange={(e) => setSaleItemId(e.target.value)}
                        disabled={!selectedSale || Boolean(editingReturn)}
                        className="w-52 py-2 rounded-md pl-2 border"
                    >
                        <option value="">Select product</option>
                        {(selectedSale?.items || []).map((item) => (
                            <option
                                key={item.saleItemId}
                                value={item.saleItemId}
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
                    {selectedSaleItem && (
                        <span className="text-sm text-gray-600">
                            Available to return: {availableQuantity}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label>Original Price</label>
                    <input
                        type="text"
                        value={selectedSaleItem?.price ?? ""}
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
                            <th className="p-3">Sale Invoice</th>
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
                                    Loading sales returns...
                                </td>
                            </tr>
                        ) : filteredRows.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-5">
                                    No sales returns found.
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
                                        {row.saleId}
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