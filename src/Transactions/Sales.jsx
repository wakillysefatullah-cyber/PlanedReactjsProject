// import { Link } from "react-router-dom";
// import PrintPage from "./PrintPage";
// import { useState } from "react";
// export default function Sales(){
//         const [productName, setproductName] = useState("");
//         const [BatchNo, setBatchNo] = useState('');
//         const [Qty, setQty] = useState('');
//         const [price, setPrice] = useState("");
//         const [company, setCompany] = useState("");
//         const [edit, setEdit] = useState('');
//         const [saveAll, setSaveAll] = useState([]);

//         const [showPrintPage, setShowPrintPage] = useState(false);
        
//         const AddSaleItem = (e)=>{
//             e.preventDefault();
//             if(
//                 productName === "" || BatchNo === "" || Qty ==="" || price === "" || company === ""
//             ){
//                 alert('Please fill out all fields');
//                 return;
//             }
//             const newCustomer = {
//                 id:Date.now(),
//                 name:productName,
//                 batch:BatchNo,
//                 Qty:Qty,
//                 price:price,
//                 company:company,
//             }
//             setSaveAll(saveAll => [...saveAll, newCustomer]);
//             setproductName("");
//             setBatchNo("")
//             setQty("");
//             setPrice("");
//             setCompany("");
//         }
    
//         //  function for editing 
//         const EditingFunction = (item)=>{
//             setEdit(item.id),
//             setproductName(item.name);
//             setBatchNo(item.batch);
//             setQty(item.Qty),
//             setPrice(item.price);
//             setCompany(item.company)
//         }
    
//          const handleDelete= (id)=>{
//             setSaveAll(saveAll => saveAll.filter(item => item.id !==id));
//         }

//     return(
//         <section>
//             <div>
//                 <div className="border-b mx-4 flex justify-between m-4">
//                     <div>
//                         <h1 className="text-2xl font-bold font-serif">Sales</h1>
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
//                 <div className="flex gap-2">
//                     <form className="flex gap-4" onSubmit={AddSaleItem}>
//                         <input type="text" placeholder="Product Name" 
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={productName}
//                         onChange={(e)=> setproductName(e.target.value)} />

//                         <input type="text" placeholder="Batch No" 
//                         className="border p-1 pl-3 rounded-md w-60 h-12"
//                         value={BatchNo}
//                         onChange={(e) => setBatchNo(e.target.value)}/>

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
//                         <button onClick={handlePrint}
//                         className="bg-black px-2 text-lg py-1 rounded-lg text-white font-bold font-serif"
//                         >Print/PDF</button>
//                 </div>
//             </div>
//             {/* table of the above contents  */}

//             <div>
//                 <table className="w-full mt-5">
//                     <thead>
//                         <tr className="bg-olive-400  mx-4">
//                             <th className="py-2">Sn</th>
//                             <th className="py-2">Product Name</th>
//                             <th className="py-2">BatchNo</th>
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
//                                     <td className="py-1 ">{item.batch}</td>
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
//             </div>

//             {showPrintPage && (
//                 <PrintPage
//                 sales={saveAll}
//                 onClose={() => setShowPrintPage(false)
                    
//         }
//     />
// )}
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


                            // second practice 


// import { Link } from "react-router-dom";
// import PrintPage from "./PrintPage";
// import { useState } from "react";

// export default function Sales() {

//     const [productName, setproductName] = useState("");
//     const [BatchNo, setBatchNo] = useState("");
//     const [Qty, setQty] = useState("");
//     const [price, setPrice] = useState("");
//     const [company, setCompany] = useState("");

//     const [edit, setEdit] = useState("");
//     const [saveAll, setSaveAll] = useState([]);

//     // Controls whether PrintPage is displayed
//     const [showPrintPage, setShowPrintPage] = useState(false);


//     // Add sale item
//     const AddSaleItem = (e) => {

//         e.preventDefault();

//         if (
//             productName === "" ||
//             BatchNo === "" ||
//             Qty === "" ||
//             price === "" ||
//             company === ""
//         ) {
//             alert("Please fill out all fields");
//             return;
//         }

//         const newCustomer = {
//             id: Date.now(),
//             name: productName,
//             batch: BatchNo,
//             Qty: Qty,
//             price: price,
//             company: company,
//         };

//         setSaveAll((saveAll) => [...saveAll, newCustomer]);

//         // Clear inputs
//         setproductName("");
//         setBatchNo("");
//         setQty("");
//         setPrice("");
//         setCompany("");
//     };


//     // Edit sale item
//     const EditingFunction = (item) => {

//         setEdit(item.id);

//         setproductName(item.name);
//         setBatchNo(item.batch);
//         setQty(item.Qty);
//         setPrice(item.price);
//         setCompany(item.company);
//     };


//     // Delete sale item
//     const handleDelete = (id) => {

//         setSaveAll(
//             (saveAll) => saveAll.filter((item) => item.id !== id)
//         );
//     };


//     return (
//         <section>

//             {/* Header */}
//             <div>

//                 <div className="border-b mx-4 flex justify-between m-4">

//                     <div>

//                         <h1 className="text-2xl font-bold font-serif">
//                             Sales
//                         </h1>

//                         <p className="text-md font-semibold ml-3">
//                             Sales Management
//                         </p>

//                     </div>


//                     <div className="flex relative items-center">

//                         <span className="absolute ml-5">
//                             <img
//                                 src="/search.svg"
//                                 alt="search"
//                             />
//                         </span>

//                         <input
//                             type="search"
//                             className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
//                             placeholder="Search customer name"
//                         />

//                         <Link
//                             className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 rounded-md"
//                             to="/"
//                         >
//                             {"<< Back"}
//                         </Link>

//                     </div>

//                 </div>

//             </div>


//             {/* Sale Entry */}
//             <div className="mx-4">

//                 <div className="flex gap-2">

//                     <form
//                         className="flex gap-4"
//                         onSubmit={AddSaleItem}
//                     >

//                         <input
//                             type="text"
//                             placeholder="Product Name"
//                             className="border p-1 pl-3 rounded-md w-60 h-12"
//                             value={productName}
//                             onChange={(e) =>
//                                 setproductName(e.target.value)
//                             }
//                         />


//                         <input
//                             type="text"
//                             placeholder="Batch No"
//                             className="border p-1 pl-3 rounded-md w-60 h-12"
//                             value={BatchNo}
//                             onChange={(e) =>
//                                 setBatchNo(e.target.value)
//                             }
//                         />


//                         <input
//                             type="number"
//                             placeholder="Qty"
//                             className="border p-1 pl-3 rounded-md w-60 h-12"
//                             value={Qty}
//                             onChange={(e) =>
//                                 setQty(e.target.value)
//                             }
//                         />


//                         <input
//                             type="number"
//                             placeholder="Price"
//                             className="border p-1 pl-3 rounded-md w-60 h-12"
//                             value={price}
//                             onChange={(e) =>
//                                 setPrice(e.target.value)
//                             }
//                         />


//                         <input
//                             type="text"
//                             placeholder="Company"
//                             className="border p-1 pl-3 rounded-md w-60 h-12"
//                             value={company}
//                             onChange={(e) =>
//                                 setCompany(e.target.value)
//                             }
//                         />


//                         {/* Add */}
//                         <button
//                             type="submit"
//                             className="bg-black px-8 text-lg py-1 rounded-lg text-white font-bold font-serif"
//                         >
//                             Add
//                         </button>

//                     </form>


//                     {/* PRINT BUTTON */}
//                     <button
//                         type="button"
//                         onClick={() => setShowPrintPage(true)}
//                         className="bg-black px-2 text-lg py-1 rounded-lg text-white font-bold font-serif"
//                     >
//                         Print/PDF
//                     </button>

//                 </div>

//             </div>


//             {/* Sales Table */}
//             <div>

//                 <table className="w-full mt-5">

//                     <thead>

//                         <tr className="bg-olive-400 mx-4">

//                             <th className="py-2">SN</th>
//                             <th className="py-2">Product Name</th>
//                             <th className="py-2">BatchNo</th>
//                             <th className="py-2">Qty</th>
//                             <th className="py-2">Price</th>
//                             <th className="py-2">Company</th>
//                             <th className="py-2">Total</th>
//                             <th className="py-2">Actions</th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {saveAll.map((item, index) => {

//                             const AllTotal =
//                                 Number(item.Qty) *
//                                 Number(item.price);

//                             return (

//                                 <tr
//                                     className="px-5 text-center border-b"
//                                     key={item.id}
//                                 >

//                                     <td className="py-1">
//                                         {index + 1}
//                                     </td>

//                                     <td className="py-1">
//                                         {item.name}
//                                     </td>

//                                     <td className="py-1">
//                                         {item.batch}
//                                     </td>

//                                     <td className="py-1">
//                                         {item.Qty}
//                                     </td>

//                                     <td className="py-1">
//                                         {item.price}
//                                     </td>

//                                     <td className="py-1">
//                                         {item.company}
//                                     </td>

//                                     <td className="py-1">
//                                         {AllTotal}
//                                     </td>


//                                     <td className="py-1">

//                                         <button
//                                             type="button"
//                                             className="bg-black text-white mr-2 px-4 py-1 rounded-md"
//                                             onClick={() => EditingFunction(item)}
//                                         >
//                                             Edit
//                                         </button>


//                                         <button
//                                             type="button"
//                                             className="bg-black text-white px-2 py-1 rounded-md"
//                                             onClick={() =>
//                                                 handleDelete(item.id)
//                                             }
//                                         >
//                                             Delete
//                                         </button>

//                                     </td>

//                                 </tr>

//                             );
//                         })}

//                     </tbody>

//                 </table>

//             </div>


//             {/* PRINT PAGE */}

//             {showPrintPage && (
//                 <PrintPage
//                     sales={saveAll}
//                     onClose={() =>
//                         setShowPrintPage(false)
//                     }
//                 />
//             )}

//         </section>
//     );
// }





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

export default function Sales() {
    const { stock, removeStock } = useInventory();

    const [customer, setCustomer] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [sales, setSales] = useState(() => {
        try {
            const savedSales = localStorage.getItem("easycount-sales");
            return savedSales ? JSON.parse(savedSales) : [];
        } catch {
            return [];
        }
    });

    // Save sales records after they change.
    useEffect(() => {
        localStorage.setItem("easycount-sales", JSON.stringify(sales));
    }, [sales]);

    // Find the currently selected product.
    const selectedProduct = stock.find(
        (item) => item.productName === productName
    );

    function handleSale(e) {
        e.preventDefault();

        const saleQuantity = Number(quantity);
        const salePrice = Number(price);
        const customerName = customer.trim();

        if (!customerName || !productName || quantity === "" || price === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (!Number.isInteger(saleQuantity) || saleQuantity <= 0) {
            alert("Quantity must be a positive whole number.");
            return;
        }

        if (!Number.isFinite(salePrice) || salePrice < 0) {
            alert("Please enter a valid sale price.");
            return;
        }

        if (!selectedProduct) {
            alert("Please select a product.");
            return;
        }

        if (saleQuantity > selectedProduct.quantity) {
            alert(`Only ${selectedProduct.quantity} units are available.`);
            return;
        }

        // Reduce stock first. Record the sale only if stock was updated.
        const result = removeStock(productName, saleQuantity);

        if (!result.success) {
            alert(result.message);
            return;
        }

        const newSale = {
            id: Date.now(),
            customer: customerName,
            productName,
            quantity: saleQuantity,
            price: salePrice,
            total: saleQuantity * salePrice,
            date: new Date().toLocaleDateString(),
        };

        setSales((currentSales) => [newSale, ...currentSales]);

        alert("Sale completed. Stock has been reduced.");

        setCustomer("");
        setProductName("");
        setQuantity("");
        setPrice("");
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Sales</h1>
                   
                    <p className="text-gray-500">
                        Record sales and update medicine stock.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            <form
                onSubmit={handleSale}
                className="flex flex-wrap gap-4 mb-8"
            >
                <input
                    type="text"
                    placeholder="Customer name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-3 rounded-md"
                >
                    <option value="">Select medicine</option>

                    {stock.map((item) => (
                        <option
                            key={item.id}
                            value={item.productName}
                            disabled={item.quantity <= 0}
                        >
                            {item.productName} — Stock: {item.quantity}
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
                />

                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Sale price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-md"
                >
                    Complete Sale
                </button>
            </form>

            {selectedProduct && (
                <p className="mb-4 text-emerald-700">
                    Available quantity: {selectedProduct.quantity}
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100 border-b-2">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sales.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-gray-500">
                                    No sales recorded yet.
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale, index) => (
                                <tr key={sale.id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{sale.date}</td>
                                    <td className="p-3">{sale.customer}</td>
                                    <td className="p-3">{sale.productName}</td>
                                    <td className="p-3">{sale.quantity}</td>
                                    <td className="p-3">
                                        {sale.price.toLocaleString()} AF
                                    </td>
                                    <td className="p-3">
                                        {sale.total.toLocaleString()} AF
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
