import { useState } from "react";
import { Link } from "react-router-dom";
export default function Receipt(){
    const [name, setName] = useState("");
    const [receipt, setReceipt] = useState("");
    const [note, setNote] = useState("");
    const [saveData, setSaveData] = useState([]);

    const saveReceiption = (e)=>{
        e.preventDefault();

        if(
            name === "" ||
            receipt === "" ||
            note === ""
        ){
            let con = confirm('Did you fill all feilds?');
            return;
        }

        const item = {
            id:Date.now(),
            name:name,
            receipt:receipt,
            note:note
        }

        setSaveData(()=>[...saveData, item]);
        setName('');
        setReceipt('');
        setNote('');
    }

    return(
        <section>
               <div>
                <div className="border-b mx-4 flex justify-between m-4">
                    <div>
                        <h1 className="text-2xl font-bold font-serif">
                            Receiption
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
                {/* form  */}
                <form className="mx-8 flex gap-5" onSubmit={saveReceiption}>
                    <input type="text" placeholder="Name"
                    value={name}
                    className="w-56 h-12 border rounded-md pl-3" 
                    onChange={(e)=> setName(e.target.value)}/>

                    <input type="number" placeholder="Receipt"
                    value={receipt}
                    className="w-56 h-12 border rounded-md pl-3" 
                    onChange={(e)=> setReceipt(e.target.value)}/>

                    <textarea className="border p-3 w-100 h-12 rounded-md pl-3"
                     placeholder="Note...."
                     value={note}
                     onChange={(e)=>setNote(e.target.value)}>

                    </textarea>
                    <button 
                    className="bg-black px-8 py-2 rounded-md text-white font-bold font-serif"
                    >Save</button>
                </form>

                {/* table of content  */}
                <div>
                    <table className="w-full mt-8">
                        <thead className="bg-olive-500 ">
                            <tr>
                                <th className="py-2 text-lg">Sn</th>
                                <th className="py-2 text-lg">Name</th>
                                <th className="py-2 text-lg">Receipt</th>
                                <th className="py-2 text-lg">Note</th>
                            </tr>
                        </thead>
                        <tbody className="text-center border-b ">
                            {
                                saveData.map((myitem, index)=>(
                                    <tr key={index.id} className="hover:bg-black hover:text-white
                                    overflow-hidden hover:scale-105 duration-500 text-center border-b h-10">
                                        <td>{index + 1}</td>
                                        <td>{myitem.name}</td>
                                        <td>{myitem.receipt}</td>
                                        <td>{myitem.note}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );  
};