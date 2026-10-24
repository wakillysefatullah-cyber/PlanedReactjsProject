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




import { Link } from "react-router-dom";
import PrintPage from "./PrintPage";
import { useState } from "react";

export default function Sales() {

    const [productName, setproductName] = useState("");
    const [BatchNo, setBatchNo] = useState("");
    const [Qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");

    const [edit, setEdit] = useState("");
    const [saveAll, setSaveAll] = useState([]);

    // Controls whether PrintPage is displayed
    const [showPrintPage, setShowPrintPage] = useState(false);


    // Add sale item
    const AddSaleItem = (e) => {

        e.preventDefault();

        if (
            productName === "" ||
            BatchNo === "" ||
            Qty === "" ||
            price === "" ||
            company === ""
        ) {
            alert("Please fill out all fields");
            return;
        }

        const newCustomer = {
            id: Date.now(),
            name: productName,
            batch: BatchNo,
            Qty: Qty,
            price: price,
            company: company,
        };

        setSaveAll((saveAll) => [...saveAll, newCustomer]);

        // Clear inputs
        setproductName("");
        setBatchNo("");
        setQty("");
        setPrice("");
        setCompany("");
    };


    // Edit sale item
    const EditingFunction = (item) => {

        setEdit(item.id);

        setproductName(item.name);
        setBatchNo(item.batch);
        setQty(item.Qty);
        setPrice(item.price);
        setCompany(item.company);
    };


    // Delete sale item
    const handleDelete = (id) => {

        setSaveAll(
            (saveAll) => saveAll.filter((item) => item.id !== id)
        );
    };


    return (
        <section>

            {/* Header */}
            <div>

                <div className="border-b mx-4 flex justify-between m-4">

                    <div>

                        <h1 className="text-2xl font-bold font-serif">
                            Sales
                        </h1>

                        <p className="text-md font-semibold ml-3">
                            Sales Management
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
                            className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 rounded-md"
                            to="/"
                        >
                            {"<< Back"}
                        </Link>

                    </div>

                </div>

            </div>


            {/* Sale Entry */}
            <div className="mx-4">

                <div className="flex gap-2">

                    <form
                        className="flex gap-4"
                        onSubmit={AddSaleItem}
                    >

                        <input
                            type="text"
                            placeholder="Product Name"
                            className="border p-1 pl-3 rounded-md w-60 h-12"
                            value={productName}
                            onChange={(e) =>
                                setproductName(e.target.value)
                            }
                        />


                        <input
                            type="text"
                            placeholder="Batch No"
                            className="border p-1 pl-3 rounded-md w-60 h-12"
                            value={BatchNo}
                            onChange={(e) =>
                                setBatchNo(e.target.value)
                            }
                        />


                        <input
                            type="number"
                            placeholder="Qty"
                            className="border p-1 pl-3 rounded-md w-60 h-12"
                            value={Qty}
                            onChange={(e) =>
                                setQty(e.target.value)
                            }
                        />


                        <input
                            type="number"
                            placeholder="Price"
                            className="border p-1 pl-3 rounded-md w-60 h-12"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />


                        <input
                            type="text"
                            placeholder="Company"
                            className="border p-1 pl-3 rounded-md w-60 h-12"
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                        />


                        {/* Add */}
                        <button
                            type="submit"
                            className="bg-black px-8 text-lg py-1 rounded-lg text-white font-bold font-serif"
                        >
                            Add
                        </button>

                    </form>


                    {/* PRINT BUTTON */}
                    <button
                        type="button"
                        onClick={() => setShowPrintPage(true)}
                        className="bg-black px-2 text-lg py-1 rounded-lg text-white font-bold font-serif"
                    >
                        Print/PDF
                    </button>

                </div>

            </div>


            {/* Sales Table */}
            <div>

                <table className="w-full mt-5">

                    <thead>

                        <tr className="bg-olive-400 mx-4">

                            <th className="py-2">SN</th>
                            <th className="py-2">Product Name</th>
                            <th className="py-2">BatchNo</th>
                            <th className="py-2">Qty</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Company</th>
                            <th className="py-2">Total</th>
                            <th className="py-2">Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {saveAll.map((item, index) => {

                            const AllTotal =
                                Number(item.Qty) *
                                Number(item.price);

                            return (

                                <tr
                                    className="px-5 text-center border-b"
                                    key={item.id}
                                >

                                    <td className="py-1">
                                        {index + 1}
                                    </td>

                                    <td className="py-1">
                                        {item.name}
                                    </td>

                                    <td className="py-1">
                                        {item.batch}
                                    </td>

                                    <td className="py-1">
                                        {item.Qty}
                                    </td>

                                    <td className="py-1">
                                        {item.price}
                                    </td>

                                    <td className="py-1">
                                        {item.company}
                                    </td>

                                    <td className="py-1">
                                        {AllTotal}
                                    </td>


                                    <td className="py-1">

                                        <button
                                            type="button"
                                            className="bg-black text-white mr-2 px-4 py-1 rounded-md"
                                            onClick={() => EditingFunction(item)}
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="bg-black text-white px-2 py-1 rounded-md"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

            </div>


            {/* PRINT PAGE */}

            {showPrintPage && (
                <PrintPage
                    sales={saveAll}
                    onClose={() =>
                        setShowPrintPage(false)
                    }
                />
            )}

        </section>
    );
}

