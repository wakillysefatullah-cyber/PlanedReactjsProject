import { useContext } from "react";
import NewCustomerEntry from "../NewCustomerEntry";
import {newContext} from '../NewCustomerEntry'

export default function AllLedgers(){
    const myCon = useContext(newContext);
    return(
        
        <section>
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
                </tbody>
            </table>
        </section>
    );
}