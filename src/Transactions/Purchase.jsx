
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useInventory } from "../context/InventoryContext.jsx";

// export default function Purchase() {
//     const { addStock } = useInventory();
//     const [suplierName, setSuplierName] = useState('');
//     const [productName, setProductName] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [price, setPrice] = useState("");
//     const [company, setCompany] = useState("");
//     const [paid, setPaid] = useState(0);
//     const [borrow, setBorrow] = useState(0);
//     const [edit, setEdit] = useState(null);

//     const [purchases, setPurchases] = useState(() => {
//         try {
//             const saved = localStorage.getItem("easycount-purchases");
//             return saved ? JSON.parse(saved) : [];
//         } catch {
//             return [];
//         }
//     });

//     // Save purchase history, including draft/posted status.
//     useEffect(() => {
//         localStorage.setItem("easycount-purchases", JSON.stringify(purchases));
//     }, [purchases]);

//     function clearForm() {
//         setSuplierName("");
//         setProductName("");
//         setQuantity("");
//         setPrice("");
//         setCompany("");
//         setPaid("");
//         setBorrow("");
//         setEdit(null);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();

//         if (
//             !productName.trim() ||
//             quantity === "" ||
//             price === "" ||
//             suplierName === "" ||
//             !company.trim()
//         ) {
//             alert("Please fill out all fields.");
//             return;
//         }

//         const amount = Number(quantity);
//         const purchasePrice = Number(price);
//         const paid = Number(paid);
//         const borrow = Number(borrow);

//         if (!Number.isInteger(amount) || amount <= 0) {
//             alert("Quantity must be a positive whole number.");
//             return;
//         }

//         if (!Number.isFinite(purchasePrice) || purchasePrice < 0) {
//             alert("Purchase price cannot be negative.");
//             return;
//         }

//         if (edit !== null) {
//             setPurchases((current) =>
//                 current.map((item) =>
//                     item.id === edit
//                         ? {
//                               ...item,
//                               suplierName: suplierName.trim(),
//                               name: productName.trim(),
//                               quantity: amount,
//                               price: purchasePrice,
//                               company: company.trim(),
//                               paid: paid,
//                               borrow: borrow
//                           }
//                         : item
//                 )
//             );

//             clearForm();
//             return;
//         }

//         const newPurchase = {
//             id: Date.now(),
//             suplierName:suplierName.trim(),
//             name: productName.trim(),
//             quantity: amount,
//             price: purchasePrice,
//             company: company.trim(),
//             paid: paid,
//             borrow: (amount * purchasePrice) - paid,
//             posted: false,
//         };

//         setPurchases((current) => [...current, newPurchase]);
//         clearForm();
//     }

//     function handleEdit(item) {
//         if (item.posted) {
//             alert("This purchase is already posted and cannot be edited.");
//             return;
//         }

//         setEdit(item.id);
//         setSuplierName(item.suplierName);
//         setProductName(item.name);
//         setQuantity(String(item.quantity));
//         setPrice(String(item.price));
//         setCompany(item.company);
//         setPaid(item.paid);
//         setBorrow(item.borrow);
//     }

//     function handleDelete(id) {
//         const item = purchases.find((purchase) => purchase.id === id);

//         if (!item || item.posted) {
//             alert("Only draft purchases can be deleted.");
//             return;
//         }

//         setPurchases((current) =>
//             current.filter((purchase) => purchase.id !== id)
//         );

//         if (edit === id) {
//             clearForm();
//         }
//     }

//     function handlePostPurchase() {
//         const drafts = purchases.filter((item) => !item.posted);

//         if (drafts.length === 0) {
//             alert("There are no draft purchases to post.");
//             return;
//         }

//         // Add each draft to the shared inventory.
//         for (const purchase of drafts) {
//             const added = addStock(
//                 purchase.suplierName,
//                 purchase.name,
//                 purchase.quantity,
//                 purchase.price,
//                 purchase.company,
//                 purchase.paid,
//                 purchase.borrow
//             );

//             if (!added) {
//                 alert(`Could not add ${purchase.name} to stock.`);
//                 return;
//             }
//         }

//         // Mark purchases as posted so they cannot be added twice.
//         const draftIds = new Set(drafts.map((item) => item.id));

//         setPurchases((current) =>
//             current.map((item) =>
//                 draftIds.has(item.id) ? { ...item, posted: true } : item
//             )
//         );

//         alert("Purchase posted successfully. Stock has increased.");
//     }

//     // const totalPurchaseAmount = purchases.reduce(
//     //     (total, item) => total + item.quantity * item.price,
//     //     0
//     // );

//     const totalPurchaseAmount = purchases.reduce(
//     (total, item) =>
//         total +
//         Number(item.quantity ?? item.Qty ?? 0) *
//         Number(item.price ?? item.Price ?? 0),
//     0
// );
//     return (
//         <section className="p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-3xl font-bold">Purchase</h1>
//                     <p className="text-gray-500">
//                         Record purchases and add medicines to stock.
//                     </p>
//                 </div>

//                 <Link
//                     to="/"
//                     className="bg-black text-white px-5 py-2 rounded-md"
//                 >
//                     &lt;&lt; Back
//                 </Link>
//             </div>

//             <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-wrap gap-4 mb-6"
//             >
//                 <input
//                     type="text"
//                     placeholder="Suplier name"
//                     value={suplierName}
//                     onChange={(e) => setSuplierName(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Product name"
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />

//                 <input
//                     type="number"
//                     min="1"
//                     step="1"
//                     placeholder="Quantity"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />

//                 <input
//                     type="number"
//                     min="0"
//                     step="any"
//                     placeholder="Purchase price per unit"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />

//                 <input
//                     type="text"
//                     placeholder="Paid"
//                     value={paid}
//                     onChange={(e) => setPaid(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Company"
//                     value={company}
//                     onChange={(e) => setCompany(e.target.value)}
//                     className="border p-3 rounded-md"
//                 />

//                 <button
//                     type="submit"
//                     className="bg-black text-white px-6 py-3 rounded-md"
//                 >
//                     {edit !== null ? "Update Draft" : "Add Draft"}
//                 </button>

//                 {edit !== null && (
//                     <button
//                         type="button"
//                         onClick={clearForm}
//                         className="bg-gray-500 text-white px-5 py-3 rounded-md"
//                     >
//                         Cancel
//                     </button>
//                 )}
//             </form>

//             <div className="overflow-x-auto">
//                 <table className="w-full text-center border-collapse">
//                     <thead className="bg-gray-100 border-b-2">
//                         <tr>
//                             <th className="p-3">#</th>
//                             <th className="p-3">Suplier</th>
//                             <th className="p-3">Product</th>
//                             <th className="p-3">Quantity</th>
//                             <th className="p-3">Unit Price</th>
//                             <th className="p-3">Company</th>
//                             <th className="p-3">Paid</th>
//                             <th className="p-3">Borrowed</th>
//                             <th className="p-3">Total</th>
//                             <th className="p-3">Status</th>
//                             <th className="p-3">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {purchases.length === 0 ? (
//                             <tr>
//                                 <td colSpan="8" className="p-6 text-gray-500">
//                                     No purchases added yet.
//                                 </td>
//                             </tr>
//                         ) : (
//                             purchases.map((item, index) => (
//                                 <tr key={item.id} className="border-b">
//                                     <td className="p-3">{index + 1}</td>
//                                     <td className="p-3">{item.suplierName}</td>
//                                     <td className="p-3">{item.name}</td>
//                                     <td className="p-3">{item.quantity}</td>
//                                     <td className="p-3">
//                                         {item.price.toLocaleString()} AF
//                                     </td>
//                                     <td className="p-3">{item.company}</td>
//                                     <td className="p-3">{item.paid}</td>
//                                     <td className="p-3">{item.borrow}</td>
//                                     <td className="p-3">
//                                         {(item.quantity * item.price).toLocaleString()} AF
//                                     </td>
//                                     <td className="p-3">
//                                         {item.posted ? "Posted" : "Draft"}
//                                     </td>
//                                     <td className="p-3">
//                                         <button
//                                             type="button"
//                                             onClick={() => handleEdit(item)}
//                                             disabled={item.posted}
//                                             className="bg-black text-white px-3 py-1 rounded mr-2 disabled:bg-gray-400"
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             type="button"
//                                             onClick={() => handleDelete(item.id)}
//                                             disabled={item.posted}
//                                             className="bg-red-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
//                 <p className="text-lg font-bold">
//                     Total Purchase: {totalPurchaseAmount.toLocaleString()} AF
//                 </p>

//                 <button
//                     type="button"
//                     onClick={handlePostPurchase}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-bold"
//                 >
//                     Post Purchase
//                 </button>
//             </div>
//         </section>
//     );
// }





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

export default function Purchase() {
    const { addStock } = useInventory();

    // Form states
    const [suplierName, setSuplierName] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [paid, setPaid] = useState("");
    const [edit, setEdit] = useState(null);

    // Load purchase history
    const [purchases, setPurchases] = useState(() => {
        try {
            const saved = localStorage.getItem("easycount-purchases");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Save purchase history
    useEffect(() => {
        localStorage.setItem(
            "easycount-purchases",
            JSON.stringify(purchases)
        );
    }, [purchases]);

    // Clear form
    function clearForm() {
        setSuplierName("");
        setProductName("");
        setQuantity("");
        setPrice("");
        setCompany("");
        setPaid("");
        setEdit(null);
    }

    // Add or update purchase
    function handleSubmit(e) {
        e.preventDefault();

        // Required field validation
        if (
            !suplierName.trim() ||
            !productName.trim() ||
            quantity === "" ||
            price === "" ||
            !company.trim() ||
            paid === ""
        ) {
            alert("Please fill out all fields.");
            return;
        }

        const amount = Number(quantity);
        const purchasePrice = Number(price);
        const paidAmount = Number(paid);

        // Quantity validation
        if (!Number.isInteger(amount) || amount <= 0) {
            alert("Quantity must be a positive whole number.");
            return;
        }

        // Price validation
        if (!Number.isFinite(purchasePrice) || purchasePrice < 0) {
            alert("Purchase price cannot be negative.");
            return;
        }

        // Calculate total
        const total = amount * purchasePrice;

        // Paid validation
        if (
            !Number.isFinite(paidAmount) ||
            paidAmount < 0 ||
            paidAmount > total
        ) {
            alert("Paid amount must be between zero and the purchase total.");
            return;
        }

        // Calculate remaining debt
        const borrowedAmount = total - paidAmount;

        // Common purchase data
        const purchaseData = {
            suplierName: suplierName.trim(),
            name: productName.trim(),
            quantity: amount,
            price: purchasePrice,
            company: company.trim(),
            paid: paidAmount,
            borrow: borrowedAmount,
        };

        // Update existing draft
        if (edit !== null) {
            setPurchases((current) =>
                current.map((item) =>
                    item.id === edit
                        ? { ...item, ...purchaseData }
                        : item
                )
            );

            clearForm();
            return;
        }

        // Create new draft
        const newPurchase = {
            id: Date.now(),
            ...purchaseData,
            posted: false,
        };

        setPurchases((current) => [...current, newPurchase]);

        clearForm();
    }

    // Edit draft purchase
    function handleEdit(item) {
        if (item.posted) {
            alert("This purchase is already posted and cannot be edited.");
            return;
        }

        setEdit(item.id);
        setSuplierName(item.suplierName);
        setProductName(item.name);
        setQuantity(String(item.quantity));
        setPrice(String(item.price));
        setCompany(item.company);
        setPaid(String(item.paid ?? 0));
    }

    // Delete draft purchase
    function handleDelete(id) {
        const item = purchases.find(
            (purchase) => purchase.id === id
        );

        if (!item || item.posted) {
            alert("Only draft purchases can be deleted.");
            return;
        }

        setPurchases((current) =>
            current.filter((purchase) => purchase.id !== id)
        );

        if (edit === id) {
            clearForm();
        }
    }

    // Post draft purchases
    function handlePostPurchase() {
        const drafts = purchases.filter(
            (item) => !item.posted
        );

        if (drafts.length === 0) {
            alert("There are no draft purchases to post.");
            return;
        }

        // Validate all drafts before updating inventory
        for (const purchase of drafts) {
            const total =
                Number(purchase.quantity) * Number(purchase.price);

            if (
                !purchase.name ||
                !Number.isInteger(Number(purchase.quantity)) ||
                Number(purchase.quantity) <= 0 ||
                !Number.isFinite(Number(purchase.price)) ||
                Number(purchase.price) < 0 ||
                !Number.isFinite(Number(purchase.paid)) ||
                Number(purchase.paid) < 0 ||
                Number(purchase.paid) > total
            ) {
                alert(`Invalid purchase information: ${purchase.name}`);
                return;
            }
        }

        // Update stock for every draft
        for (const purchase of drafts) {
            const added = addStock(
                purchase.name,
                purchase.quantity,
                purchase.price,
                purchase.company
            );

            if (added !== true) {
                alert(
                    `Could not add ${purchase.name} to stock.`
                );
                return;
            }
        }

        // Mark successfully posted drafts
        const draftIds = new Set(
            drafts.map((item) => item.id)
        );

        setPurchases((current) =>
            current.map((item) =>
                draftIds.has(item.id)
                    ? { ...item, posted: true }
                    : item
            )
        );

        alert("Purchase posted successfully. Stock has increased.");
    }

    // Calculate total purchase amount
    const totalPurchaseAmount = purchases.reduce(
        (total, item) =>
            total +
            Number(item.quantity ?? item.Qty ?? 0) *
            Number(item.price ?? item.Price ?? 0),
        0
    );

    // Calculate total paid amount
    const totalPaid = purchases.reduce(
        (total, item) => total + Number(item.paid ?? 0),
        0
    );

    // Calculate total borrowed amount
    const totalBorrowed = purchases.reduce(
        (total, item) => total + Number(item.borrow ?? 0),
        0
    );

    return (
        <section className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Purchase
                    </h1>

                    <p className="text-gray-500">
                        Record purchases and add medicines to stock.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            {/* Purchase Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-4 mb-6"
            >
                <input
                    type="text"
                    placeholder="Supplier name"
                    value={suplierName}
                    onChange={(e) => setSuplierName(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="text"
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Purchase price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Paid amount"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-md"
                >
                    {edit !== null ? "Update Draft" : "Add Draft"}
                </button>

                {edit !== null && (
                    <button
                        type="button"
                        onClick={clearForm}
                        className="bg-gray-500 text-white px-5 py-3 rounded-md"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Purchase History */}
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">

                    <thead className="bg-gray-100 border-b-2">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Supplier</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Paid</th>
                            <th className="p-3">Borrowed</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchases.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="11"
                                    className="p-6 text-gray-500"
                                >
                                    No purchases added yet.
                                </td>
                            </tr>
                        ) : (
                            purchases.map((item, index) => {
                                const total =
                                    Number(item.quantity) *
                                    Number(item.price);

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >
                                        <td className="p-3">
                                            {index + 1}
                                        </td>

                                        <td className="p-3">
                                            {item.suplierName}
                                        </td>

                                        <td className="p-3">
                                            {item.name}
                                        </td>

                                        <td className="p-3">
                                            {item.quantity}
                                        </td>

                                        <td className="p-3">
                                            {Number(item.price).toLocaleString()} AF
                                        </td>

                                        <td className="p-3">
                                            {item.company}
                                        </td>

                                        <td className="p-3 text-green-600">
                                            {Number(item.paid ?? 0).toLocaleString()} AF
                                        </td>

                                        <td className="p-3 text-red-600">
                                            {Number(item.borrow ?? 0).toLocaleString()} AF
                                        </td>

                                        <td className="p-3 font-semibold">
                                            {total.toLocaleString()} AF
                                        </td>

                                        <td className="p-3">
                                            {item.posted ? (
                                                <span className="text-green-600 font-semibold">
                                                    Posted
                                                </span>
                                            ) : (
                                                <span className="text-yellow-600 font-semibold">
                                                    Draft
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(item)}
                                                disabled={item.posted}
                                                className="bg-black text-white px-3 py-1 rounded mr-2 disabled:bg-gray-400"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.id)}
                                                disabled={item.posted}
                                                className="bg-red-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Purchase Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                        Total Purchase
                    </p>
                    <h2 className="text-xl font-bold">
                        {totalPurchaseAmount.toLocaleString()} AF
                    </h2>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                        Total Paid
                    </p>
                    <h2 className="text-xl font-bold text-green-700">
                        {totalPaid.toLocaleString()} AF
                    </h2>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                        Total Borrowed
                    </p>
                    <h2 className="text-xl font-bold text-red-700">
                        {totalBorrowed.toLocaleString()} AF
                    </h2>
                </div>

            </div>

            {/* Post Purchase */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handlePostPurchase}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-bold"
                >
                    Post Purchase
                </button>
            </div>

        </section>
    );
}
