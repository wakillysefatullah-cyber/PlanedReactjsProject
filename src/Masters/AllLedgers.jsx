import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllLedgers({ allCustomerInfo }){
    const navigate = useNavigate();
    return(
        <section>
            <div className="flex justify-between m-5 border-b pb-2">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold font-serif">All Ledgers</h1>
                        <p>Manage your all ledgers professionally</p>
                    </div>
                </div>
                    <Link to="/"
                        className="bg-black text-white px-8 py-1 text-center text-lg
                         font-bold font-serif rounded-md flex justify-center items-center"
                    >
                        {`<<Back`}
                    </Link>
            </div>
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
                    {
                    allCustomerInfo.map((item, index) => (
                        <tr key={item.id}
                        onClick={()=> navigate(`/ledger/${item.id}`, {state: {ledger:item}})}
                         className="text-center border-b cursor-pointer">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.phone}</td>
                            <td className="py-2">{item.area}</td>
                            <td className="py-2">{item.address}</td>
                            <td className="py-2 ">
                                <button onClick={(event) => event.stopPropagation()} 
                                className=" font-bold font-serif bg-olive-800
                                px-3 py-1 rounded-md text-white">Edit</button>

                                <button onClick={(event) => event.stopPropagation()}
                                className=" font-bold font-serif bg-olive-800
                                px-3 py-1 rounded-md text-white ml-2">Delete</button>
                            </td>
                        </tr>
                    ))
                    };
            </tbody>
                
            </table>
        </section>
    );
}













// import { useState } from "react";

// export default function NewLedger() {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("Customer");
//   const [phone, setPhone] = useState("");
//   const [openingBalance, setOpeningBalance] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     const ledger = {
//       name,
//       type,
//       phone,
//       openingBalance: Number(openingBalance),
//     };

//     console.log(ledger);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <select
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//       >
//         <option value="Customer">Customer</option>
//         <option value="Supplier">Supplier</option>
//       </select>

//       <input
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Opening balance"
//         value={openingBalance}
//         onChange={(e) => setOpeningBalance(e.target.value)}
//       />

//       <button type="submit">Save Ledger</button>
//     </form>
//   );
// }