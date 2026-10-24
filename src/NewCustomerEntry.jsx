import {useState } from "react";
import { Link } from "react-router-dom";

export default function NewCustomerEntry({children}){

    const [CustomerName, setCustomerName] = useState();
    const [CustomerPhonne, setCustomerPhone] = useState();
    const [CustomerArea, setCustomerArea] = useState();
    const [CustomerAddress, setCustomerAddress] = useState();
    const [AllCusomerInfo, setAllCustomerInfo] = useState([]);
    
    const AddCustomer = (e)=>{
        e.preventDefault();
        if(
            CustomerName === "" || CustomerPhonne === "" || CustomerArea ==="" || CustomerAddress === ""
        ){
            alert('Please fill out all fields');
            return;
        }
        const newCustomer = {
            id:Date.now(),
            name:CustomerName,
            phone:CustomerPhonne,
            area:CustomerArea,
            address:CustomerAddress
        }
        setAllCustomerInfo([...AllCusomerInfo, newCustomer]);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerArea("");
        setCustomerAddress("");
    }

    //  function for editing 
    const EditingFunction = (item)=>{
        setCustomerName(item.name);
        setCustomerPhone(item.phone);
        setCustomerArea(item.area);
        setCustomerAddress(item.address)
    }

     const handleDelete= (id)=>{
        setAllCustomerInfo(AllCusomerInfo => AllCusomerInfo.filter(item => item.id !==id));
    }

    
    return(
        <section >
            <div className="border-b mx-4 flex justify-between m-4">
                <div>
                    <h1 className="text-2xl font-bold font-serif">New Ledger</h1>
                    <p className="texl-md font-semibold ml-3">repudiandae assumenda itaque nihil ex nisi ducimus obcaecati!</p>
                </div>
                <div className="flex relative items-center">
                    <span className="absolute ml-5">
                        <img src="public/search.svg"  alt="can not " />
                    </span>
                    <input type="search" className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
                    placeholder="Search..." />
                    <Link className="outline outline-black hover:bg-black hover:text-white text-lg font-serif font-bold px-8 py-2 sticky rounded-md" 
                    to={'/'}>{`<< Back`}</Link>
                </div>
            </div>
            <div>
                <form onSubmit={AddCustomer} className="flex gap-2 items-end border-olive-500 border-b-4 pb-3">
                    <div>
                        <label className="text-lg ml-4 font-bold font-serif"> Name</label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5 ">
                                <img src="public/user.svg" alt="can not " />
                            </span>
                            <input type="text" value={CustomerName} onChange={(e)=> setCustomerName(e.target.value)}
                            className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                            placeholder=" Name" />
                        </div>
                    </div>
                    <div>
                        <label className="text-lg ml-4 font-bold font-serif"> Phone</label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="public/phone.svg"  alt="can not " />
                            </span>
                            <input type="number" value={CustomerPhonne} onChange={(e)=>setCustomerPhone(e.target.value)}
                            className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                            placeholder=" phone" />
                        </div>
                    </div>
                    <div>
                        <label className="text-lg ml-4 font-bold font-serif"> Area</label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="public/house.svg"  alt="can not " />
                            </span>
                            <input type="text" value={CustomerArea} onChange={(e)=>setCustomerArea(e.target.value)}
                            className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                            placeholder=" Area" />
                        </div>
                    </div>
                    <div>
                        <label className="text-lg ml-4 font-bold font-serif"> Address</label>
                        <div className="flex relative items-center">
                            <span className="absolute ml-5">
                                <img src="public/house.svg"  alt="can not " />
                            </span>
                            <input type="text" value={CustomerAddress} onChange={(e)=>setCustomerAddress(e.target.value)}
                            className="w-[300px] border h-12 mx-4 rounded-lg p-1 pl-10"
                            placeholder=" Address" />
                        </div>
                    </div>
                    <button className="text-lx h-12 font-bold font-serif px-10 rounded-lg bg-black text-white">Add</button>
                </form>
            </div>
            <table className="w-full ">
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
                <tbody >
                    {
                        AllCusomerInfo.map((item, index)=>(
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