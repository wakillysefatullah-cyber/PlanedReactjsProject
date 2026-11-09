
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLedgers } from "../api/ledgerApi.js";

import {
    getReceipts,
    createReceipt,
    updateReceipt,
    deleteReceipt
} from "../api/receiptApi.js";

export default function Receipt() {

    const [ledgers, setLedgers] = useState([]);
    const [saveData, setSaveData] = useState([]);

    const [ledgerId, setLedgerId] = useState("");
    const [receipt, setReceipt] = useState("");
    const [note, setNote] = useState("");

    const [receiptDate, setReceiptDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    // Load ledgers and receipts
    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);
                setError("");

                const [ledgerData, receiptData] = await Promise.all([
                    getLedgers(),
                    getReceipts()
                ]);

                setLedgers(ledgerData);
                setSaveData(receiptData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    // Clear form
    const clearForm = () => {
        setLedgerId("");
        setReceipt("");
        setNote("");
        setReceiptDate(new Date().toLocaleDateString("en-CA"));
        setEditingId(null);
    };

    // Save or update receipt
    const saveReceiption = async (e) => {

        e.preventDefault();

        if (
            ledgerId === "" ||
            receipt.trim() === "" ||
            note.trim() === "" ||
            receiptDate === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        if (Number(receipt) <= 0) {
            alert("Receipt amount must be greater than zero");
            return;
        }

        const receiptData = {
            ledgerId: Number(ledgerId),
            amount: receipt,
            receiptDate: receiptDate,
            notes: note
        };

        try {

            setSaving(true);
            setError("");

            if (editingId !== null) {

                // Update existing receipt
                const updatedReceipt = await updateReceipt(
                    editingId,
                    receiptData
                );

                setSaveData((previousData) =>
                    previousData.map((item) =>
                        item.id === editingId ? updatedReceipt : item
                    )
                );

                alert("Receipt updated successfully!");

            } else {

                // Create new receipt
                const savedReceipt = await createReceipt(receiptData);

                setSaveData((previousData) => [
                    savedReceipt,
                    ...previousData
                ]);

                alert("Receipt saved successfully!");
            }

            clearForm();

        } catch (err) {
            setError(err.message);
            alert("Operation failed: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // Edit receipt
    const handleEdit = (item) => {

        setEditingId(item.id);

        setLedgerId(String(item.ledgerId));
        setReceipt(String(item.amount));
        setNote(item.notes || "");
        setReceiptDate(item.receiptDate);

        setError("");

        // Scroll to form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete receipt
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this receipt?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeletingId(id);
            setError("");

            await deleteReceipt(id);

            setSaveData((previousData) =>
                previousData.filter((item) => item.id !== id)
            );

            // If the deleted receipt was being edited, clear the form
            if (editingId === id) {
                clearForm();
            }

            alert("Receipt deleted successfully!");

        } catch (err) {
            setError(err.message);
            alert("Failed to delete receipt: " + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    // Search receipts by customer name
    const filteredReceipts = saveData.filter((item) =>
        (item.ledgerName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <section>
            <div>

                <div className="border-b mx-4 flex justify-between m-4">

                    <div>
                        <h1 className="text-2xl font-bold font-serif">
                            Receiption
                        </h1>

                        <p className="text-md font-semibold ml-3">
                            Manage your Receipts
                        </p>
                    </div>

                    <div className="flex relative items-center">

                        <span className="absolute ml-5">
                            <img
                                src="/search.svg"
                                alt="search"
                            />
                        </span>

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
                            placeholder="Search customer name"
                        />

                        <Link
                            className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 sticky rounded-md"
                            to="/"
                        >
                            {"<< Back"}
                        </Link>

                    </div>

                </div>

                {/* Error message */}
                {error && (
                    <p className="mx-8 my-3 text-red-600 font-semibold">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form
                    className="mx-8 flex gap-5"
                    onSubmit={saveReceiption}
                >

                    {/* Select customer */}
                    <select
                        value={ledgerId}
                        onChange={(e) => setLedgerId(e.target.value)}
                        className="w-56 h-12 border rounded-md pl-3"
                        required
                    >
                        <option value="">Select Customer</option>

                        {ledgers.map((ledger) => (
                            <option
                                key={ledger.id}
                                value={ledger.id}
                            >
                                {ledger.name}
                            </option>
                        ))}
                    </select>

                    {/* Receipt amount */}
                    <input
                        type="number"
                        placeholder="Receipt"
                        value={receipt}
                        min="0.01"
                        step="0.01"
                        className="w-56 h-12 border rounded-md pl-3"
                        onChange={(e) => setReceipt(e.target.value)}
                        required
                    />

                    {/* Receipt date */}
                    <input
                        type="date"
                        value={receiptDate}
                        className="w-56 h-12 border rounded-md pl-3"
                        onChange={(e) => setReceiptDate(e.target.value)}
                        required
                    />

                    {/* Note */}
                    <textarea
                        className="border p-3 w-100 h-12 rounded-md pl-3"
                        placeholder="Note...."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                    />

                    {/* Save / Update button */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-black px-8 py-2 rounded-md text-white font-bold font-serif disabled:opacity-50"
                    >
                        {saving
                            ? "Processing..."
                            : editingId !== null
                                ? "Update"
                                : "Save"
                        }
                    </button>

                    {/* Cancel edit button */}
                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={clearForm}
                            className="bg-gray-500 px-6 py-2 rounded-md text-white font-bold font-serif"
                        >
                            Cancel
                        </button>
                    )}

                </form>

                {/* Table */}
                <div>

                    <table className="w-full mt-8">

                        <thead className="bg-olive-500">
                            <tr>
                                <th className="py-2 text-lg">Sn</th>
                                <th className="py-2 text-lg">Name</th>
                                <th className="py-2 text-lg">Receipt</th>
                                <th className="py-2 text-lg">Date</th>
                                <th className="py-2 text-lg">Note</th>
                                <th className="py-2 text-lg">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-center border-b">

                            {loading ? (

                                <tr>
                                    <td colSpan="6" className="py-5">
                                        Loading receipts...
                                    </td>
                                </tr>

                            ) : filteredReceipts.length === 0 ? (

                                <tr>
                                    <td colSpan="6" className="py-5">
                                        No receipts found.
                                    </td>
                                </tr>

                            ) : (

                                filteredReceipts.map((myitem, index) => (

                                    <tr
                                        key={myitem.id}
                                        className="hover:bg-black hover:text-white overflow-hidden hover:scale-105 duration-500 text-center border-b h-10"
                                    >
                                        <td>{index + 1}</td>

                                        <td>{myitem.ledgerName}</td>

                                        <td>{myitem.amount}</td>

                                        <td>{myitem.receiptDate}</td>

                                        <td>{myitem.notes}</td>

                                        {/* Actions */}
                                        <td className="py-2">

                                            <button
                                                type="button"
                                                disabled={saving || deletingId !== null}
                                                onClick={() => handleEdit(myitem)}
                                                className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-md mx-1 disabled:opacity-50"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                disabled={saving || deletingId !== null}
                                                onClick={() => handleDelete(myitem.id)}
                                                className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-md mx-1 disabled:opacity-50"
                                            >
                                                {deletingId === myitem.id
                                                    ? "Deleting..."
                                                    : "Delete"
                                                }
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </section>
    );
}