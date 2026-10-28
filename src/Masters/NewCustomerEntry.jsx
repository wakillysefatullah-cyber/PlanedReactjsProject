
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getLedgers,
    createLedger,
    updateLedger,
    deleteLedger
} from "./api/ledgerApi";

export default function NewCustomerEntry() {
    const [CustomerName, setCustomerName] = useState("");
    const [CustomerPhonne, setCustomerPhone] = useState("");
    const [CustomerArea, setCustomerArea] = useState("");
    const [CustomerAddress, setCustomerAddress] = useState("");
    const [AllCusomerInfo, setAllCustomerInfo] = useState([]);

    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load ledgers from Spring Boot
    async function loadLedgers(searchText = "") {
        setLoading(true);
        setError("");

        try {
            const data = await getLedgers(searchText);
            setAllCustomerInfo(data);
        } catch (err) {
            setError(err.message || "Could not load ledgers.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLedgers();
    }, []);

    // Add a new ledger or update an existing one
    async function AddCustomer(e) {
        e.preventDefault();

        if (
            !CustomerName.trim() ||
            !CustomerPhonne.trim() ||
            !CustomerArea.trim() ||
            !CustomerAddress.trim()
        ) {
            alert("Please fill out all fields");
            return;
        }

        const ledger = {
            name: CustomerName.trim(),
            phone: CustomerPhonne.trim(),
            area: CustomerArea.trim(),
            address: CustomerAddress.trim()
        };

        try {
            setError("");

            if (editingId !== null) {
                await updateLedger(editingId, ledger);
                alert("Ledger updated successfully!");
            } else {
                await createLedger(ledger);
                alert("Ledger created successfully!");
            }

            setCustomerName("");
            setCustomerPhone("");
            setCustomerArea("");
            setCustomerAddress("");
            setEditingId(null);

            await loadLedgers(search);
        } catch (err) {
            setError(
                err.message ||
                "Could not save the ledger. Please check your backend."
            );
        }
    }

    // Fill the form when Edit is clicked
    function EditingFunction(item) {
        setCustomerName(item.name ?? "");
        setCustomerPhone(item.phone ?? "");
        setCustomerArea(item.area ?? "");
        setCustomerAddress(item.address ?? "");
        setEditingId(item.id);
    }

    // Delete a ledger from PostgreSQL through Spring Boot
    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this ledger?")) {
            return;
        }

        try {
            setError("");
            await deleteLedger(id);
            await loadLedgers(search);
        } catch (err) {
            setError(
                err.message ||
                "Could not delete the ledger."
            );
        }
    }

    // Search ledgers
    async function handleSearch(e) {
        const value = e.target.value;
        setSearch(value);
        await loadLedgers(value);
    }

    return (
        <section>
            <div className="border-b mx-4 flex justify-between m-4">
                <div>
                    <h1 className="text-2xl font-bold font-serif">
                        New Ledger
                    </h1>
                    <p className="text-md font-semibold ml-3">
                        Manage your customer ledgers
                    </p>
                </div>

                <div className="flex relative items-center">
                    <span className="absolute ml-5">
                        <img src="/search.svg" alt="Search" />
                    </span>

                    <input
                        type="search"
                        value={search}
                        onChange={handleSearch}
                        className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
                        placeholder="Search..."
                    />

                    <Link
                        className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 sticky rounded-md"
                        to="/"
                    >
                        {"<< Back"}
                    </Link>
                </div>
            </div>

            <div>
                <form
                    onSubmit={AddCustomer}
                    className="flex gap-2 items-end border-olive-500 border-b-4 pb-3"
                >
                    <div>
                        <label className="text-lg ml-4 font-bold font-serif">
                            Name
                        </label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="/user.svg" alt="" />
                            </span>
                            <input
                                type="text"
                                value={CustomerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                                placeholder="Name"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-lg ml-4 font-bold font-serif">
                            Phone
                        </label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="/phone.svg" alt="" />
                            </span>
                            <input
                                type="tel"
                                value={CustomerPhonne}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                                placeholder="Phone"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-lg ml-4 font-bold font-serif">
                            Area
                        </label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="/house.svg" alt="" />
                            </span>
                            <input
                                type="text"
                                value={CustomerArea}
                                onChange={(e) => setCustomerArea(e.target.value)}
                                className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                                placeholder="Area"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-lg ml-4 font-bold font-serif">
                            Address
                        </label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="/house.svg" alt="" />
                            </span>
                            <input
                                type="text"
                                value={CustomerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                                className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                                placeholder="Address"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="text-lx h-12 font-bold font-serif px-10 rounded-lg bg-black text-white"
                    >
                        {editingId !== null ? "Update" : "Add"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setCustomerName("");
                                setCustomerPhone("");
                                setCustomerArea("");
                                setCustomerAddress("");
                            }}
                            className="h-12 px-4 rounded-lg border"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {error && (
                <p className="text-red-600 m-4" role="alert">
                    {error}
                </p>
            )}

            {loading && (
                <p className="m-4">Loading ledgers...</p>
            )}

            <table className="w-full">
                <thead className="bg-olive-400 px-5">
                    <tr className="py-2">
                        <th className="py-2">Sn</th>
                        <th className="py-2">Ledger Name</th>
                        <th className="py-2">Ledger Phone</th>
                        <th className="py-2">Ledger Area</th>
                        <th className="py-2">Ledger Address</th>
                        <th className="py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {!loading && AllCusomerInfo.map((item, index) => (
                        <tr key={item.id} className="px-5 text-center border-b">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.phone}</td>
                            <td className="py-2">{item.area}</td>
                            <td className="py-2">{item.address}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => EditingFunction(item)}
                                    className="px-4 py-1 rounded-md m-2 text-white bg-olive-800"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="px-4 py-1 rounded-md text-white bg-olive-800"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {!loading && AllCusomerInfo.length === 0 && !error && (
                        <tr>
                            <td colSpan="6" className="py-4 text-center">
                                No ledgers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}



// export default function NewCustomerEntry({
//     allCustomerInfo,
//     setAllCustomerInfo
// }) {

//     const [customerName, setCustomerName] = useState("");
//     const [customerPhone, setCustomerPhone] = useState("");
//     const [customerArea, setCustomerArea] = useState("");
//     const [customerAddress, setCustomerAddress] = useState("");

//     const AddCustomer = (e) => {
//         e.preventDefault();

//         if (
//             customerName === "" ||
//             customerPhone === "" ||
//             customerArea === "" ||
//             customerAddress === ""
//         ) {
//             alert("Please fill out all fields");
//             return;
//         }

//         const newCustomer = {
//             id: Date.now(),
//             name: customerName,
//             phone: customerPhone,
//             area: customerArea,
//             address: customerAddress
//         };

//         setAllCustomerInfo([
//             ...allCustomerInfo,
//             newCustomer
//         ]);

//         setCustomerName("");
//         setCustomerPhone("");
//         setCustomerArea("");
//         setCustomerAddress("");
//     };

//     const handleDelete = (id) => {
//         setAllCustomerInfo(
//             allCustomerInfo.filter(
//                 item => item.id !== id
//             )
//         );
//     };

//     return (
//         <>
//             {/* Your form */}

//             <table className="w-full">
//                 <thead>
//                     <tr>
//                         <th>Sn</th>
//                         <th>Ledger Name</th>
//                         <th>Ledger Phone</th>
//                         <th>Ledger Area</th>
//                         <th>Ledger Address</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {allCustomerInfo.map((item, index) => (
//                         <tr key={item.id}>
//                             <td>{index + 1}</td>
//                             <td>{item.name}</td>
//                             <td>{item.phone}</td>
//                             <td>{item.area}</td>
//                             <td>{item.address}</td>

//                             <td>
//                                 <button
//                                     onClick={() => handleDelete(item.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// }