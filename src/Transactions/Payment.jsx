import { useState } from "react";
import { Link } from "react-router-dom";
export default function Payment(){

    const [name, setName] = useState('');
    const [pay, setPay] = useState(0);
    const [suplier, setSuplier] = useState('');
    const [edit, setEdit] = useState(null);
    const [allData, setAllData] = useState([]);

    const SavePayment = (e)=>{
        e.preventDefault();

        if(
            name === "" ||
            pay === "" ||
            suplier === "" 
        ){
            alert('Please, fill out all fields first then try again');
            return;
        }
        const NewPay = {
            id:Date.now(),
            name:name,
            pay:pay,
            suplier:suplier
        }
        setAllData(()=> ([...allData, NewPay]));
        setName('');
        setPay('');
        setSuplier('');

    }
    const EditFucntion = (myItem)=>{
        setEdit(myItem.id);
        setName(myItem.name);
        setPay(myItem.pay);
        setSuplier(myItem.suplier);
    }
    return(
        <section>
            <div className="border-b mx-4 flex justify-between m-4">
                <div>
                    <h1 className="text-2xl font-bold font-serif">
                        Payment
                    </h1>
                    <p className="text-md font-semibold ml-3">
                        Manage your Receipts
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
            <div>
                <form className="p-4 flex gap-4" 
                onSubmit={SavePayment}>
                    <input type="text" placeholder="Name"
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}
                    className="border w-64 h-12 rounded-md p-2 pl-3"/>

                    <input type="number" placeholder="Payment"
                    value={pay} 
                    onChange={(e)=> setPay(e.target.value)}
                    className="border w-64 h-12 rounded-md p-2 pl-3"/>

                    <textarea 
                    value={suplier}
                    onChange={(e)=> setSuplier(e.target.value)}
                    className="border w-90 h-12 rounded-md p-2 pl-3"
                    placeholder="through...">

                    </textarea>
                    <button 
                    className="bg-black text-white font-serif font-bold px-8 py-2 rounded-md"
                    >Submit</button>
                </form>
            </div>
            <div className="flex flex-col">
                <table className="w-full">
                    <thead className="bg-olive-400 ">
                        <tr>
                            <th className="py-2 text-lg">Sn</th>
                            <th className="py-2 text-lg">Name</th>
                            <th className="py-2 text-lg">Paid</th>
                            <th className="py-2 text-lg">Through</th>
                            <th className="py-2 text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                            {allData.map((item, index)=>(
                                    <tr key={item.id}
                                    className="py-2 text-center hover:bg-olive-300
                                     border-b">
                                        <td className="py-2">{index + 1}</td>
                                        <td className="py-2">{item.name}</td>
                                        <td className="py-2">{item.pay}</td>
                                        <td className="py-2">{item.suplier}</td>
                                        <td>
                                            <button onClick={()=> EditFucntion(item.myItem)} 
                                            className="bg-olive-600 px-3 mr-2 py-1 rounded-md hover:bg-olive-400 text-white">Edit</button>
                                            <button 
                                            className="bg-olive-600 px-3 py-1 rounded-md hover:bg-olive-400 text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
        </section>
    );
}