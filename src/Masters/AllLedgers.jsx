
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getLedgers,
    updateLedger,
    deleteLedger
} from "../api/ledgerApi";

export default function AllLedgers() {
    const navigate = useNavigate();

    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // State for editing a ledger
    const [editingLedger, setEditingLedger] = useState(null);

    // Load ledgers from PostgreSQL through Spring Boot
    async function loadLedgers(searchText = "") {
        try {
            setLoading(true);
            setError("");

            const data = await getLedgers(searchText);
            setLedgers(data);
        } catch (err) {
            setError(err.message || "Could not load ledgers.");
        } finally {
            setLoading(false);
        }
    }

    // Load records when this page opens
    useEffect(() => {
        loadLedgers();
    }, []);

    // Search ledgers
    async function handleSearch(e) {
        const value = e.target.value;

        setSearch(value);
        await loadLedgers(value);
    }

    // Open the edit form
    function handleEdit(item) {
        setEditingLedger({
            id: item.id,
            name: item.name ?? "",
            phone: item.phone ?? "",
            area: item.area ?? "",
            address: item.address ?? ""
        });

        setError("");
    }

    // Update ledger in PostgreSQL
    async function handleUpdate(e) {
        e.preventDefault();

        if (
            !editingLedger.name.trim() ||
            !editingLedger.phone.trim() ||
            !editingLedger.area.trim() ||
            !editingLedger.address.trim()
        ) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            setError("");

            const updatedLedger = {
                name: editingLedger.name.trim(),
                phone: editingLedger.phone.trim(),
                area: editingLedger.area.trim(),
                address: editingLedger.address.trim()
            };

            await updateLedger(editingLedger.id, updatedLedger);

            setEditingLedger(null);

            await loadLedgers(search);
        } catch (err) {
            setError(err.message || "Could not update ledger.");
        }
    }

    // Delete ledger from PostgreSQL
    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this ledger?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteLedger(id);

            await loadLedgers(search);
        } catch (err) {
            setError(err.message || "Could not delete ledger.");
        }
    }

    return (
        <section className="p-4">

            {/* Page heading */}
            <div className="border-b mx-4 flex justify-between items-center mb-6 pb-4">
                <div>
                    <h1 className="text-2xl font-bold font-serif">
                        All Ledgers
                    </h1>

                    <p className="text-md font-semibold ml-3">
                        Manage all customer ledgers
                    </p>
                </div>

                <Link
                    to="/"
                    className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-6 py-2 rounded-md"
                >
                    Back
                </Link>
            </div>

            {/* Search */}
            <div className="mx-4 mb-5">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search customer by name..."
                    className="w-full md:w-[500px] border h-11 rounded-full px-4"
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="mx-4 mb-4 bg-red-100 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}

            {/* Edit form */}
            {editingLedger && (
                <form
                    onSubmit={handleUpdate}
                    className="mx-4 mb-6 p-5 border rounded-lg bg-gray-50"
                >
                    <h2 className="text-xl font-bold mb-4">
                        Edit Ledger #{editingLedger.id}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            value={editingLedger.name}
                            onChange={(e) =>
                                setEditingLedger({
                                    ...editingLedger,
                                    name: e.target.value
                                })
                            }
                            placeholder="Customer Name"
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            value={editingLedger.phone}
                            onChange={(e) =>
                                setEditingLedger({
                                    ...editingLedger,
                                    phone: e.target.value
                                })
                            }
                            placeholder="Phone"
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            value={editingLedger.area}
                            onChange={(e) =>
                                setEditingLedger({
                                    ...editingLedger,
                                    area: e.target.value
                                })
                            }
                            placeholder="Area"
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            value={editingLedger.address}
                            onChange={(e) =>
                                setEditingLedger({
                                    ...editingLedger,
                                    address: e.target.value
                                })
                            }
                            placeholder="Address"
                            className="border p-3 rounded"
                        />

                    </div>

                    <div className="flex gap-3 mt-4">

                        <button
                            type="submit"
                            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                        >
                            Update Ledger
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditingLedger(null)}
                            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            )}

            {/* Loading */}
            {loading ? (
                <p className="text-center text-lg font-semibold mt-10">
                    Loading ledgers...
                </p>
            ) : (

                <div className="overflow-x-auto mx-4">
                    <table className="w-full ">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Ledger ID</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Area</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Created At</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ledgers.length > 0 ? (
                                ledgers.map((item, index) => (
                                    <tr 
                                        key={item.id}
                                        onClick={() =>
                                            navigate(`/Ledger/${item.id}`, {
                                                state: { ledger: item }
                                            })
                                        }
                                        className="hover:bg-gray-100 cursor-pointer text-center"
                                    >

                                        <td className="border-b p-3">
                                            {item.id}
                                        </td>

                                        <td className="border-b p-3">
                                            {item.name}
                                        </td>

                                        <td className="border-b p-3">
                                            {item.phone}
                                        </td>

                                        <td className="border-b p-3">
                                            {item.area}
                                        </td>

                                        <td className="border-b p-3">
                                            {item.address}
                                        </td>

                                        <td className="border-b p-3">
                                            {item.createdAt
                                                ? new Date(item.createdAt).toLocaleString()
                                                : "—"}
                                        </td>

                                        <td className="border-b p-3">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(item);
                                                    }}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(item.id);
                                                    }}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="border-b p-5 text-center text-gray-500"
                                    >
                                        No ledgers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            )}

            <p className="mx-4 mt-4 font-semibold">
                Total Ledgers: {ledgers.length}
            </p>

        </section>
    );
}