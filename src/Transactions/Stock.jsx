// import { useInventory } from "../context/InventoryContext";

// export default function Stock() {

//   const { stock } = useInventory();

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">
//         Stock
//       </h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Quantity</th>
//             <th>Purchase Price</th>
//           </tr>
//         </thead>

//         <tbody>
//           {stock.map(item => (
//             <tr key={item.productId}>
//               <td>{item.productName}</td>
//               <td>{item.quantity}</td>
//               <td>{item.purchasePrice} AF</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


                            // second pracri 

// import { useMemo, useState } from "react";
// import { useInventory } from "../context/InventoryContext";
// import { Link } from "react-router-dom";

// export default function Stock({productName}) {

//     const { stock } = useInventory();

//     const [search, setSearch] = useState("");

//     // Search products
//     const filteredStock = useMemo(() => {
//         return stock.filter((item) =>
//             item.productName.toLowerCase().includes(search.toLowerCase())
//         );
//     }, [stock, search]);

//     // Total quantity
//     const totalQuantity = stock.reduce(
//         (total, item) => total + item.quantity,
//         0
//     );

//     // Total inventory value
//     const totalStockValue = stock.reduce(
//         (total, item) =>
//             total + item.quantity * item.purchasePrice,
//         0
//     );

//     return (
//         <section className="w-full p-6">

//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">

//                 <div>
//                     <h1 className="text-3xl font-bold">
//                         Stock
//                     </h1>

//                     <p className="text-gray-500">
//                         Manage your available inventory
//                     </p>
//                 </div>
//                 <li  className="bg-black text-white text-lg font-bold font-serif px-8 py-2 rounded-md">
//                 <Link to={'/'}>
//                 {`<< Back`}
//                 </Link>
//                 </li>
//             </div>
            
//             {/* Summary cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

//                 {/* Products */}
//                 <div className="bg-white p-5 rounded-xl shadow">
//                     <p className="text-gray-500">
//                         Products
//                     </p>

//                     <h2 className="text-2xl font-bold mt-2">
//                         {stock.length}
//                     </h2>
//                 </div>


//                 {/* Quantity */}
//                 <div className="bg-white p-5 rounded-xl shadow">
//                     <p className="text-gray-500">
//                         Total Quantity
//                     </p>

//                     <h2 className="text-2xl font-bold mt-2">
//                         {totalQuantity}
//                     </h2>
//                 </div>


//                 {/* Value */}
//                 <div className="bg-white p-5 rounded-xl shadow">
//                     <p className="text-gray-500">
//                         Stock Value
//                     </p>

//                     <h2 className="text-2xl font-bold mt-2">
//                         {totalStockValue.toLocaleString()} AF
//                     </h2>
//                 </div>

//             </div>


//             {/* Search */}
//             <div className="bg-white p-5 rounded-xl shadow">

//                 <div className="mb-5">

//                     <input
//                         type="text"
//                         placeholder="Search product..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full md:w-[400px] border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
//                     />

//                 </div>


//                 {/* Table */}
//                 <div className="overflow-x-auto">

//                     <table className="w-full border-collapse">

//                         <thead>

//                             <tr className="bg-gray-100 text-left">

//                                 <th className="p-4 border-b">
//                                     #
//                                 </th>

//                                 <th className="p-4 border-b">
//                                     Product
//                                 </th>

//                                 <th className="p-4 border-b">
//                                     Quantity
//                                 </th>

//                                 <th className="p-4 border-b">
//                                     Purchase Price
//                                 </th>

//                                 <th className="p-4 border-b">
//                                     Stock Value
//                                 </th>

//                                 <th className="p-4 border-b">
//                                     Status
//                                 </th>

//                             </tr>

//                         </thead>


//                         <tbody>

//                             {filteredStock.length > 0 ? (

//                                 filteredStock.map((item, index) => {

//                                     const stockValue =
//                                         item.quantity *
//                                         item.purchasePrice;

//                                     return (
//                                         <tr
//                                             key={item.productId}
//                                             className="hover:bg-gray-50"
//                                         >

//                                             <td className="p-4 border-b">
//                                                 {index + 1}
//                                             </td>

//                                             <td className="p-4 border-b font-medium">
//                                                 {item.productName}
//                                             </td>

//                                             <td className="p-4 border-b">
//                                                 {item.quantity}
//                                             </td>

//                                             <td className="p-4 border-b">
//                                                 {item.purchasePrice.toLocaleString()} AF
//                                             </td>

//                                             <td className="p-4 border-b">
//                                                 {stockValue.toLocaleString()} AF
//                                             </td>

//                                             <td className="p-4 border-b">

//                                                 {item.quantity <= 10 ? (

//                                                     <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
//                                                         Low Stock
//                                                     </span>

//                                                 ) : (

//                                                     <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
//                                                         In Stock
//                                                     </span>

//                                                 )}

//                                             </td>

//                                         </tr>
//                                     );

//                                 })

//                             ) : (

//                                 <tr>

//                                     <td
//                                         colSpan="6"
//                                         className="p-10 text-center text-gray-500"
//                                     >
//                                         {search
//                                             ? "No products found."
//                                             : "No stock available yet."
//                                         }
//                                     </td>

//                                 </tr>

//                             )}

//                         </tbody>

//                     </table>

//                 </div>

//             </div>

//         </section>
//     );
// }






import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

export default function Stock() {
    const { stock } = useInventory();
    const [search, setSearch] = useState("");

    // Filter stock by medicine name.
    const filteredStock = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return stock.filter((item) =>
            item.productName.toLowerCase().includes(searchText)
        );
    }, [stock, search]);

    // Calculate total units in inventory.
    const totalQuantity = stock.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    // Calculate the inventory value at purchase cost.
    const totalStockValue = stock.reduce(
        (total, item) =>
            total + Number(item.quantity) * Number(item.purchasePrice),
        0
    );

    return (
        <section className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Stock</h1>
                    <p className="text-gray-500">
                        Manage your available inventory.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            {/* Inventory summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Products</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {stock.length}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Total Quantity</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {totalQuantity}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Stock Value</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {totalStockValue.toLocaleString()} AF
                    </h2>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-5 rounded-xl shadow">
                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-[400px] border border-gray-300 rounded-lg px-4 py-3 mb-5"
                />

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4 border-b">#</th>
                                <th className="p-4 border-b">Product</th>
                                <th className="p-4 border-b">Quantity</th>
                                <th className="p-4 border-b">Purchase Price</th>
                                <th className="p-4 border-b">Stock Value</th>
                                <th className="p-4 border-b">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStock.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-10 text-center text-gray-500"
                                    >
                                        {search
                                            ? "No products found."
                                            : "No stock available yet."}
                                    </td>
                                </tr>
                            ) : (
                                filteredStock.map((item, index) => {
                                    const quantity = Number(item.quantity);
                                    const purchasePrice = Number(
                                        item.purchasePrice
                                    );
                                    const stockValue = quantity * purchasePrice;

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 border-b">
                                                {index + 1}
                                            </td>

                                            <td className="p-4 border-b font-medium">
                                                {item.productName}
                                            </td>

                                            <td className="p-4 border-b">
                                                {quantity}
                                            </td>

                                            <td className="p-4 border-b">
                                                {purchasePrice.toLocaleString()} AF
                                            </td>

                                            <td className="p-4 border-b">
                                                {stockValue.toLocaleString()} AF
                                            </td>

                                            <td className="p-4 border-b">
                                                {quantity === 0 ? (
                                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                        Out of Stock
                                                    </span>
                                                ) : quantity <= 10 ? (
                                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                                        Low Stock
                                                    </span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                                        In Stock
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
