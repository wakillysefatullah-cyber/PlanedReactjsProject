
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "./api/expenseApi";

const initialForm = {
    title: "",
    amount: "",
    expenseDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash"
};

export default function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadExpenses();
    }, []);

    async function loadExpenses() {
        try {
            setLoading(true);
            setError("");

            const data = await getExpenses();
            setExpenses(data);

        } catch (err) {
            setError(err.message || "Failed to load expenses");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));
    }

    function openAddForm() {
        setEditingId(null);
        setForm({
            ...initialForm,
            expenseDate: new Date().toISOString().split("T")[0]
        });
        setShowForm(true);
        setError("");
    }

    function openEditForm(expense) {
        setEditingId(expense.id);

        setForm({
            title: expense.title || "",
            amount: expense.amount?.toString() || "",
            expenseDate: expense.expenseDate || "",
            paymentMethod: expense.paymentMethod || "Cash"
        });

        setShowForm(true);
        setError("");
    }

    function closeForm() {
        setShowForm(false);
        setEditingId(null);
        setForm(initialForm);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.title.trim() || !form.amount || Number(form.amount) <= 0) {
            setError("Please enter a title and a valid amount.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const expenseData = {
                title: form.title.trim(),
                amount: form.amount,
                expenseDate: form.expenseDate,
                paymentMethod: form.paymentMethod
            };

            if (editingId !== null) {
                await updateExpense(editingId, expenseData);
            } else {
                await createExpense(expenseData);
            }

            closeForm();
            await loadExpenses();

        } catch (err) {
            setError(err.message || "Failed to save expense");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteExpense(id);

            setExpenses(previous =>
                previous.filter(expense => expense.id !== id)
            );

        } catch (err) {
            setError(err.message || "Failed to delete expense");
        }
    }

    return (
        <section>

            {/* Page Header */}
            <div className="m-5 flex justify-between items-center">

                <h1 className="text-4xl font-bold font-serif text-center border-b-2">
                    Manage your
                    <span className="text-5xl px-3 py-1 rounded-md font-bold text-cyan-400">
                        Expenses
                    </span>
                    professionally
                </h1>

                <Link
                    to="/"
                    className="bg-black text-white text-lg font-bold font-serif rounded-md px-6 py-3"
                >
                    {"<<Back"}
                </Link>

            </div>

            {/* Add Expense Button */}
            <div className="mx-5 my-6">
                <button
                    onClick={openAddForm}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-md"
                >
                    + Add Expense
                </button>
            </div>

            {/* Add / Edit Form */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="m-5 p-5 border rounded-lg shadow-md bg-white"
                >

                    <h2 className="text-2xl font-bold mb-5">
                        {editingId !== null ? "Edit Expense" : "Add New Expense"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block font-semibold mb-2">
                                Receipted by
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                maxLength="150"
                                required
                                className="border rounded-md p-3 w-full"
                                placeholder="Enter expense title"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                required
                                className="border rounded-md p-3 w-full"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Date
                            </label>

                            <input
                                type="date"
                                name="expenseDate"
                                value={form.expenseDate}
                                onChange={handleChange}
                                required
                                className="border rounded-md p-3 w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Through
                            </label>

                            <select
                                name="paymentMethod"
                                value={form.paymentMethod}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full"
                            >
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                                <option value="Mobile Money">Mobile Money</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex gap-3 mt-6">

                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : editingId !== null
                                    ? "Update Expense"
                                    : "Save Expense"}
                        </button>

                        <button
                            type="button"
                            onClick={closeForm}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-bold"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            {/* Error Message */}
            {error && (
                <div className="mx-5 my-3 text-red-600 font-semibold">
                    {error}
                </div>
            )}

            {/* Expenses Table */}
            <table className="w-full mt-5">

                <thead className="bg-olive-500">
                    <tr>
                        <th className="py-2 text-xl">Sn</th>
                        <th className="py-2 text-xl">Receipted by</th>
                        <th className="py-2 text-xl">Date</th>
                        <th className="py-2 text-xl">Through</th>
                        <th className="py-2 text-xl">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {loading && (
                        <tr>
                            <td colSpan="5" className="text-center py-5">
                                Loading expenses...
                            </td>
                        </tr>
                    )}

                    {!loading && expenses.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-5">
                                No expenses found.
                            </td>
                        </tr>
                    )}

                    {!loading && expenses.map((expense, index) => (
                        <tr
                            key={expense.id}
                            className="border-b text-center"
                        >

                            <td className="py-3">{index + 1}</td>

                            <td className="py-3">{expense.title}</td>

                            <td className="py-3">{expense.expenseDate}</td>

                            <td className="py-3">{expense.paymentMethod}</td>

                            <td className="py-3">
                                <div className="flex justify-center gap-2">

                                    <button
                                        onClick={() => openEditForm(expense)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </section>
    );
}