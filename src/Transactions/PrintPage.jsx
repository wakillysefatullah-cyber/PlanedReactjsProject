// import { useState } from "react";
// import Sales from "./Sales";
// export default function PrintPage(){
//     const [open, setOpen] = useState(false);
//     const OpenFunction = (e)=>{
//         e.preventDefault();

//         setOpen(true);
//     }

//     return(
//         <section>
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
//         </section>
//     );
// }



// export default function PrintPage() {
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       {/* Print Button - hidden when printing */}
//       <button
//         onClick={handlePrint}
//         className="mb-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 print:hidden"
//       >
//         Print
//       </button>

//       {/* Printable Area */}
//       <div className="mx-auto max-w-3xl bg-white p-8 shadow-lg print:max-w-none print:p-0 print:shadow-none">

//         <h1 className="mb-2 text-3xl font-bold">
//           Invoice
//         </h1>

//         <p className="mb-6 text-gray-600">
//           Invoice #INV-001
//         </p>

//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-3 text-left">
//                 Product
//               </th>
//               <th className="border border-gray-300 p-3">
//                 Quantity
//               </th>
//               <th className="border border-gray-300 p-3">
//                 Price
//               </th>
//               <th className="border border-gray-300 p-3">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td className="border border-gray-300 p-3">
//                 Paracetamol
//               </td>
//               <td className="border border-gray-300 p-3 text-center">
//                 10
//               </td>
//               <td className="border border-gray-300 p-3 text-right">
//                 50 AFN
//               </td>
//               <td className="border border-gray-300 p-3 text-right">
//                 500 AFN
//               </td>
//             </tr>

//             <tr>
//               <td className="border border-gray-300 p-3">
//                 Amoxicillin
//               </td>
//               <td className="border border-gray-300 p-3 text-center">
//                 5
//               </td>
//               <td className="border border-gray-300 p-3 text-right">
//                 100 AFN
//               </td>
//               <td className="border border-gray-300 p-3 text-right">
//                 500 AFN
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="mt-6 flex justify-end">
//           <div className="text-right">
//             <p className="text-lg font-bold">
//               Total: 1,000 AFN
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );




export default function PrintPage({ sales, onClose }) {

    const handlePrint = () => {
        window.print();
    };

    // Calculate grand total
    const grandTotal = sales.reduce(
        (total, item) =>
            total + Number(item.Qty) * Number(item.price),
        0
    );
    // id auto icrease 
    // const myIdObj = {
    //     id:id
    // }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-200 p-8">

            {/* Buttons - hidden when printing */}
            <div className="mb-6 flex gap-3 print:hidden">

                <button
                    onClick={handlePrint}
                    className="rounded-lg bg-black px-5 py-2 text-white"
                >
                    Print
                </button>

                <button
                    onClick={onClose}
                    className="rounded-lg bg-gray-500 px-5 py-2 text-white"
                >
                    Back
                </button>

            </div>

            {/* Printable Invoice */}
            <div className="mx-auto max-w-3xl bg-white p-8 shadow-lg print:max-w-none print:p-0 print:shadow-none">

                {/* Header */}
                <div className="flex justify-between">
                    <img src="/totalCash.png" alt="can't load img, URL is incorrect" 
                    className="size-20 rounded-full"/>
                    <div className="mb-8 border-b pb-4 text-center">

                        <h1 className="text-3xl print:text-6xl font-bold font-serif">
                            عمده فروشی ادویه ذبیح الله صفی
                        </h1>

                        <p className="mt-1 print:text-2xl">
                            آدرس: مزارشریف، مزارهوتل، از طرف چوک کوچه اول، نمبر دوکان 233
                        </p>
                        <p className="mt-1 print:text-2xl">
                            شماره های تماس: 0784620462، 0770015510، 0774750695
                        </p>

                    </div>
                    <img src="/totalCash.png" alt="can't load img, URL is incorrect" 
                    className="size-20 rounded-full"/>
                </div>

                {/* Invoice Information */}
                <div className="mb-3 flex justify-between">

                    <div>
                        <p>
                            <strong>Invoice:</strong> INV-{Date.now()}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="text-right">
                        <p>
                            <strong>Total Items:</strong>{" "}
                            {sales.length}
                        </p>
                    </div>

                </div>

                {/* Products */}
                <table className="w-full border-collapse border border-gray-300">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border border-gray-300 ">
                                #
                            </th>

                            <th className="border border-gray-300 py-2 text-left">
                                Product
                            </th>

                            <th className="border border-gray-300 py-2">
                                Batch
                            </th>

                            <th className="border border-gray-300 py-2">
                                Qty
                            </th>

                            <th className="border border-gray-300 py-2">
                                Price
                            </th>

                            <th className="border border-gray-300 py-2">
                                Total
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sales.map((item, index) => {

                            const itemTotal =
                                Number(item.Qty) *
                                Number(item.price);

                            return (

                                <tr key={item.id}>

                                    <td className="border border-gray-300 p-2 text-center">
                                        {index + 1}
                                    </td>

                                    <td className="border border-gray-300 p-2">
                                        {item.name}
                                    </td>

                                    <td className="border border-gray-300 p-2 text-center">
                                        {item.batch}
                                    </td>

                                    <td className="border border-gray-300 p-2 text-center">
                                        {item.Qty}
                                    </td>

                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.price} AFN
                                    </td>

                                    <td className="border border-gray-300 p-2 text-right">
                                        {itemTotal} AFN
                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

                {/* Grand Total */}
                <div className="mt-6 flex justify-end">

                    <div className="text-right">

                        <p className="text-xl font-bold">
                            Grand Total: {grandTotal} AFN
                        </p>

                    </div>

                </div>

                {/* Footer */}
                <div className="mt-12 border-t pt-4 text-center text-sm text-gray-500">

                    <p>
                        Thank you for your purchase!
                    </p>

                </div>

            </div>

        </div>
    );
}

