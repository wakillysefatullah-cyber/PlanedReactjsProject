import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import NewCustomerEntry from "../NewCustomerEntry";
// import {newContext} from '../NewCustomerEntry'

export default function AllLedgers({ allCustomerInfo }){
    // const myCon = useContext(newContext);
    // const [name, setName] = useState('');
    return(
        <section>
            <div className="flex justify-between m-5 border-b pb-2">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold font-serif">All Ledgers</h1>
                        <p>Manage your all ledgers professionally</p>
                    </div>
                </div>
                    <Link to={'/'} className="bg-black text-white px-6 py-1 text-center text-xl
                    font-bold font-serif rounded-md">{`<<Back`}</Link>
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
                
                {/* <tbody >
                    {
                        myCon.map((item, index)=>(
                                <tr key={item.id} className="px-5 text-center border-b">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{item.name}</td>
                                    <td className="py-2">{item.phone}</td>
                                    <td className="py-2">{item.area}</td>
                                    <td className="py-2">{item.address}</td>
                                    <td >
                                        <button onClick={()=>EditingFunction(item)} 
                                        className="px-4 py-1 rounded-md m-2 text-white bg-olive-800">Edit</button>
                                        <button onClick={()=>handleDelete(item.id)}
                                        className="px-4 py-1 rounded-md text-white bg-olive-800">Delete</button>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody> */}

                <tbody>
                    {
                    allCustomerInfo.map((item, index) => (
                        <tr key={item.id} className="text-center border-b">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.phone}</td>
                            <td className="py-2">{item.area}</td>
                            <td className="py-2">{item.address}</td>
                            <td className="py-2">Customer</td>
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