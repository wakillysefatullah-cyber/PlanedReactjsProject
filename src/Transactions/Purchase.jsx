// import { Link } from "react-router-dom";
// import { useInventory } from "../context/InventoryContext";
// import { useState } from "react";
// export default function Purchase(){
//         const { addStock } = useInventory();
//         const [productName, setproductName] = useState("");
//         const [Qty, setQty] = useState('');
//         const [price, setPrice] = useState("");
//         const [company, setCompany] = useState("");
//         const [edit, setEdit] = useState('')
//         const [saveAll, setSaveAll] = useState([]);
        
//         const AddSaleItem = (e)=>{
//             e.preventDefault();
//             if(
//                 productName === "" || Qty ==="" || price === "" || company === ""
//             ){
//                 alert('Please fill out all fields');
//                 return;
//             }
//             const newCustomer = {
//                 id:Date.now(),
//                 name:productName,
//                 Qty:Qty,
//                 price:price,
//                 company:company,
//             }
//             setSaveAll(saveAll => [...saveAll, newCustomer]);
//             setproductName("");
//             setQty("");
//             setPrice("");
//             setCompany("");
//         }
    
//         //  function for editing 
//         const EditingFunction = (item)=>{
//             setEdit(item.id),
//             setproductName(item.name);
//             setQty(item.Qty),
//             setPrice(item.price);
//             setCompany(item.company)
//         }
    
//          const handleDelete= (id)=>{
//             setSaveAll(saveAll => saveAll.filter(item => item.id !==id));
//         }
//         function handlePostPurchase() {

//             purchases.forEach((purchase) => {

//                 addStock(
//                     purchase.productName,
//                     Number(purchase.qty),
//                     Number(purchase.price),
//                     purchase.company
//                 );

//             });

//         }
//     return(
//         <section>
//             <div>
//                 <div className="border-b mx-4 flex justify-between m-4">
//                     <div>
//                         <h1 className="text-2xl font-bold font-serif">Purchase</h1>
//                         <p className="texl-md font-semibold ml-3">repudiandae assumenda itaque nihil ex nisi ducimus obcaecati!</p>
//                     </div>
//                     <div className="flex relative items-center">
//                         <span className="absolute ml-5">
//                             <img src="/search.svg"  alt="can not " />
//                         </span>
//                         <input type="search" className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
//                         placeholder="Search customer name" />
//                         <Link className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 sticky rounded-md" 
//                         to={'/'}>{`<< Back`}</Link>
//                     </div>
//                 </div>
//             </div>
//             {/* Entries and contents of sales  */}

//             <div className="mx-4">
//                 <div>
//                     <form className="flex gap-4" onSubmit={AddSaleItem}>
//                         <input type="text" placeholder="Product Name" 
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={productName}
//                         onChange={(e)=> setproductName(e.target.value)} />

//                         <input type="number" placeholder="Qty" 
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={Qty}
//                         onChange={(e)=> setQty(e.target.value)}/>

//                         <input type="number" placeholder="Price"  
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={price}
//                         onChange={(e)=>setPrice(e.target.value)}/>

//                         <input type="text" placeholder="Company"  
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={company}
//                         onChange={(e)=> setCompany(e.target.value)}/>

//                         {/* total  */}
//                         <button
//                         className="bg-black px-8 text-lg py-1 rounded-lg text-white font-bold font-serif"
//                         >Add</button>
//                     </form>
//                 </div>
//             </div>
//             {/* table of the above contents  */}

//             <div>
//                 <table className="w-full mt-5">
//                     <thead>
//                         <tr className="bg-olive-400  mx-4">
//                             <th className="py-2">Sn</th>
//                             <th className="py-2">Product Name</th>
//                             <th className="py-2">Qty</th>
//                             <th className="py-2">Price</th>
//                             <th className="py-2">Company</th>
//                             <th className="py-2">Total</th>
//                             <th className="py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             saveAll.map((item, index)=>{
//                                 const AllTotal = Number(item.Qty) * Number(item.price);
//                                 return(
//                                     <tr className="px-5 text-center border-b" key={item.id}>
                                    
//                                     <td className="py-1">{index + 1}</td>
//                                     <td className="py-1 ">{item.name}</td>
//                                     <td className="py-1">{item.Qty}</td>
//                                     <td className="py-1 ">{item.price}</td>
//                                     <td className="py-1 ">{item.company}</td>
//                                     <td className="py-1 ">{AllTotal}</td>
//                                     <td className=" py-1 ">
//                                         <button 
//                                         className="bg-black text-white mr-2 px-4 py-1 rounded-md"
//                                         onClick={()=> EditingFunction(item)}>
//                                             Edit
//                                         </button>
//                                         <button 
//                                         className="bg-black text-white px-2 py-1 rounded-md"
//                                         onClick={()=> handleDelete(item.id)}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//                 <button
//                     onClick={handlePostPurchase}
//                     className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
//                 >
//                     Post Purchase
//                 </button>
//             </div>
//         </section>
//     );
// }



// // import { Link } from "react-router-dom";

// // export default function Sales({ allCustomerInfo }) {

// //     return (
// //         <section>

// //             <div className="border-b mx-4 flex justify-between m-4">

// //                 <div>
// //                     <h1 className="text-2xl font-bold font-serif">
// //                         Sales
// //                     </h1>

// //                     <p className="text-md font-semibold ml-3">
// //                         Sales Management
// //                     </p>
// //                 </div>

// //                 <div className="flex relative items-center">

// //                     <span className="absolute ml-5">
// //                         <img
// //                             src="/search.svg"
// //                             alt="search"
// //                         />
// //                     </span>

// //                     <input
// //                         type="search"
// //                         className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
// //                         placeholder="Search..."
// //                     />

// //                     <Link
// //                         className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 rounded-md"
// //                         to="/"
// //                     >
// //                         {"<< Back"}
// //                     </Link>

// //                 </div>
// //             </div>


// //             {/* CUSTOMER TABLE */}

// //             <div className="p-4">

// //                 <table className="w-full">

// //                     <thead className="bg-gray-200">

// //                         <tr>
// //                             <th className="py-3">SN</th>
// //                             <th>Customer Name</th>
// //                             <th>Phone</th>
// //                             <th>Area</th>
// //                             <th>Address</th>
// //                         </tr>

// //                     </thead>

// //                     <tbody>

// //                         {allCustomerInfo.map((item, index) => (

// //                             <tr
// //                                 key={item.id}
// //                                 className="text-center border-b"
// //                             >

// //                                 <td className="py-3">
// //                                     {index + 1}
// //                                 </td>

// //                                 <td>
// //                                     {item.name}
// //                                 </td>

// //                                 <td>
// //                                     {item.phone}
// //                                 </td>

// //                                 <td>
// //                                     {item.area}
// //                                 </td>

// //                                 <td>
// //                                     {item.address}
// //                                 </td>

// //                             </tr>

// //                         ))}

// //                     </tbody>

// //                 </table>

// //             </div>

// //         </section>
// //     );
// // }





import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useEffect, useState } from "react";

export default function Purchase() {

    const { addStock } = useInventory();

    // -----------------------------
    // Purchase form states
    // -----------------------------
    const [productName, setProductName] = useState("");
    const [Qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");

    // ID of the item currently being edited
    const [edit, setEdit] = useState(null);

    // Purchase items
    const [saveAll, setSaveAll] = useState(() => {

        const savedPurchases = localStorage.getItem("easycount-purchases");
        return savedPurchases ? JSON.parse(savedPurchases): [];
    });

    // --------------------------------
    // Save purchases to localStorage
    // --------------------------------
    useEffect(() => {
        localStorage.setItem("easycount-purchases",JSON.stringify(saveAll));
    }, [saveAll]);

    // --------------------------------
    // Add / Update Purchase Item
    // --------------------------------
    const AddSaleItem = (e) => {
        e.preventDefault();
        // Validation
        if (
            productName.trim() === "" ||
            Qty === "" ||
            price === "" ||
            company.trim() === ""
        ) {

            alert("Please fill out all fields");
            return;
        }


        // Validate numbers
        if (Number(Qty) <= 0 || Number(price) < 0) {
            alert("Quantity must be greater than 0 and price cannot be negative.");
            return;
        }
        // --------------------------------
        // EDIT EXISTING ITEM
        // --------------------------------
        if (edit !== null) {
            setSaveAll((currentItems) =>
                currentItems.map((item) => {
                    if (item.id === edit) {
                        return {
                            ...item, name: productName.trim(), Qty: Number(Qty),
                            price: Number(price), company: company.trim(),

                            // Keep posted status
                            posted: item.posted
                        };
                    }
                    return item;
                })
            );

            // Exit edit mode
            setEdit(null);

        }

        // --------------------------------
        // ADD NEW ITEM
        // --------------------------------
        else {
            const newPurchase = {
                id: Date.now(),
                name: productName.trim(),
                Qty: Number(Qty),
                price: Number(price),
                company: company.trim(),
                // New purchases are drafts
                posted: false
            };


            setSaveAll((currentItems) => [...currentItems, newPurchase]);
        }
        // Clear form
        setProductName("");
        setQty("");
        setPrice("");
        setCompany("");
    };


    // --------------------------------
    // Edit Purchase
    // --------------------------------
    const EditingFunction = (item) => {
        // Don't allow editing posted purchase
        if (item.posted) {
            alert(
                "This purchase has already been posted and added to stock."
            );
            return;
        }

        setEdit(item.id);
        setProductName(item.name);
        setQty(item.Qty);
        setPrice(item.price);
        setCompany(item.company);
    };

    // --------------------------------
    // Delete Purchase
    // --------------------------------
    const handleDelete = (id) => {
        const item = saveAll.find((purchase) => purchase.id === id );
        if (!item) {
            return;
        }

        // Don't delete posted purchase
        if (item.posted) {
            alert(
                "Posted purchases cannot be deleted."
            );
            return;
        }
        setSaveAll((currentItems) =>
            currentItems.filter(
                (item) => item.id !== id
            )
        );
    };

    // --------------------------------
    // Post Purchase
    // --------------------------------
    const handlePostPurchase = () => {

        // Find only draft purchases
        const draftPurchases = saveAll.filter(
            (purchase) => !purchase.posted
        );

        // Nothing to post
        if (draftPurchases.length === 0) {
            alert("There are no draft purchases to post.");
            return;
        }

        // Add every draft purchase to stock
        draftPurchases.forEach((purchase) => {
            addStock(
                purchase.name,
                Number(purchase.Qty),
                Number(purchase.price),
                purchase.company
            );
        });

        // Mark them as posted
        setSaveAll((currentItems) =>

            currentItems.map((item) => {

                if (!item.posted) {

                    return {
                        ...item, posted: true
                    };
                }

                return item;
            })
        );
        alert("Purchase posted successfully. Stock updated.");
    };

    // --------------------------------
    // Cancel editing
    // --------------------------------
    const cancelEdit = () => {
        setEdit(null);
        setProductName("");
        setQty("");
        setPrice("");
        setCompany("");
    };

    // --------------------------------
    // Total Purchase Amount
    // --------------------------------
    const totalPurchaseAmount = saveAll.reduce(
        (total, item) =>total + Number(item.Qty) * Number(item.price),0
    );

    return (
        <section>
            {/* =========================
                HEADER
            ========================== */}
            <div>
                <div className="border-b mx-4 flex justify-between m-4">
                    <div>
                        <h1 className="text-2xl font-bold font-serif">
                            Purchase
                        </h1>
                        <p className="text-md font-semibold ml-3">
                            Manage your purchases
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

            </div>

            {/* =========================
                PURCHASE FORM
            ========================== */}
            <div className="mx-4">
                <form
                    className="flex gap-4"
                    onSubmit={AddSaleItem}
                >
                    {/* Product */}
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-1 pl-3 rounded-md w-60 h-12"
                        value={productName}
                        onChange={(e) =>
                            setProductName(e.target.value)
                        }
                    />

                    {/* Quantity */}
                    <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        className="border p-1 pl-3 rounded-md w-60 h-12"
                        value={Qty}
                        onChange={(e) =>
                            setQty(e.target.value)
                        }
                    />

                    {/* Price */}
                    <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        className="border p-1 pl-3 rounded-md w-60 h-12"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                    />

                    {/* Company */}
                    <input
                        type="text"
                        placeholder="Company"
                        className="border p-1 pl-3 rounded-md w-60 h-12"
                        value={company}
                        onChange={(e) =>
                            setCompany(e.target.value)
                        }
                    />

                    {/* Add / Update */}
                    <button
                        type="submit"
                        className="bg-black px-8 text-lg py-1 rounded-lg text-white font-bold font-serif"
                    >
                        {edit !== null
                            ? "Update"
                            : "Add"
                        }
                    </button>

                    {/* Cancel Edit */}
                    {edit !== null && (

                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="bg-gray-500 px-6 text-lg py-1 rounded-lg text-white font-bold"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* =========================
                PURCHASE TABLE
            ========================== */}
            <div className="mt-5">
                <table className="w-full">
                    <thead>
                        <tr className="bg-olive-400">
                            <th className="py-2">
                                Sn
                            </th>
                            <th className="py-2">
                                Product Name
                            </th>
                            <th className="py-2">
                                Qty
                            </th>
                            <th className="py-2">
                                Price
                            </th>
                            <th className="py-2">
                                Company
                            </th>
                            <th className="py-2">
                                Total
                            </th>
                            <th className="py-2">
                                Status
                            </th>
                            <th className="py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {saveAll.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No purchases added yet.
                                </td>
                            </tr>
                        ) : (
                            saveAll.map((item, index) => {
                                const AllTotal =
                                    Number(item.Qty) *
                                    Number(item.price);
                                return (
                                    <tr
                                        className="text-center border-b"
                                        key={item.id}
                                    >
                                        {/* SN */}
                                        <td className="py-2">
                                            {index + 1}
                                        </td>

                                        {/* Product */}
                                        <td className="py-2">
                                            {item.name}
                                        </td>

                                        {/* Quantity */}
                                        <td className="py-2">
                                            {item.Qty}
                                        </td>

                                        {/* Price */}
                                        <td className="py-2">
                                            {Number(item.price).toLocaleString()} AF
                                        </td>

                                        {/* Company */}
                                        <td className="py-2">
                                            {item.company}
                                        </td>

                                        {/* Total */}
                                        <td className="py-2 font-semibold">
                                            {AllTotal.toLocaleString()} AF
                                        </td>

                                        {/* Status */}
                                        <td className="py-2">
                                            {item.posted ? (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Posted
                                                </span>
                                            ) : (
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Draft
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-2">
                                            <button
                                                className={`text-white mr-2 px-4 py-1 rounded-md ${
                                                    item.posted
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-black"
                                                }`}
                                                onClick={() =>
                                                    EditingFunction(item)
                                                }
                                                disabled={item.posted}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className={`text-white px-2 py-1 rounded-md ${
                                                    item.posted
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-600"
                                                }`}
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                disabled={item.posted}
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

            {/* =========================
                PURCHASE FOOTER
            ========================== */}
            <div className="flex justify-between items-center p-5">
                <div>
                    <p className="text-lg font-bold">
                        Total Purchase:
                        <span className="text-emerald-600 ml-2">
                            {totalPurchaseAmount.toLocaleString()} AF
                        </span>
                    </p>
                </div>

                <button
                    onClick={handlePostPurchase}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold"
                >
                    Post Purchase
                </button>
            </div>
        </section>
    );
}