import { useState } from "react";
import { Link } from "react-router-dom";

export default function SalesReturn({productName, setProductName}){
    const [name, setName] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [company, setCompany] = useState('');
    const [edit, setEdit] = useState('');
    // const [all, setAll] = useState([]);

    const SalesReturnFunction = (e)=> {
        e.preventDefault();
        // checking values
        if( name === '' ||
            qty === '' ||
            price === '' ||
            company === ''
        ){
            alert('Please, fill out all fields');
            return;
        }
        // handleProduct 
        const productName = productName.find(
            (item)=> item.id === Number(productName)
        )
        if(!productName || qty <= 0 || Number.isInteger(Number(qty))){
            alert('please, enter a valid number!');
            return;
        }
        if(Number(qty) > productName.qty){
            alert('Not, enough quantity');
            return;
        }
        setProductName((prevProduct)=>
        prevProduct.map((item)=>
        item.name === Number(name) ? {...item, qty : item.qty - Number(qty)}:item))
        alert('sale completed!');
        return;

         <select
        value={name}
        onChange={(e) => setProductName(e.target.value)}
      >
        {productName.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} — Stock: {item.qty}
          </option>
        ))}
      </select>

        // creating new object
        const newReturn = {
            id:Date.now(),
            name:name,
            qty:qty,
            price:price,
            company:company
        }

        // save states
        setProductName((productName)=>[...productName, newReturn]);
        setName('');
        setQty('');
        setPrice('');
        setCompany('');

    }
    // edit function 
    const EditingFunction =(item)=>{
        setEdit(item.id);
        setName(item.name);
        setQty(item.qty);
        setPrice(item.price);
        setCompany(item.company);
    }
// handle delete function 
const handleDelete = (id)=>{
    setProductName(
        (productName)=> productName.filter((item)=> item.id !==id)
    )
}
    return(
        <section>
            <div>
                {/* Header */}
                <div>

                    <div className="border-b mx-4 flex justify-between m-4">

                        <div>

                            <h1 className="text-2xl font-bold font-serif">
                                Sales Return
                            </h1>

                            <p className="text-md font-semibold ml-3">
                                Manage your Sales Return professionally
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
                {/* body  */}
                <div className="my-5 mx-5">
                    <form className="flex gap-5" onSubmit={SalesReturnFunction}>
                        <input type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)} 
                        className="w-52 py-2 rounded-md pl-2 border "
                        placeholder="Name..."/>

                        <input type="number"
                        value={qty}
                        onChange={(e)=> setQty(e.target.value)} 
                        className="w-52 py-2 rounded-md pl-2 border "
                        placeholder="Qty"/>

                        <input type="number"
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)} 
                        className="w-52 py-2 rounded-md pl-2 border "
                        placeholder="Price"/>

                        <input type="text"
                        value={company}
                        onChange={(e)=> setCompany(e.target.value)} 
                        className="w-52 py-2 rounded-md pl-2 border "
                        placeholder="Company"/>

                        <button type="submit"
                        className="hover:text-white hover:bg-black px-5 py-2 rounded-md border"
                        >Add</button>
                    </form>
                </div>
                <div>
                    <table className="w-full text-center">
                        <thead className="bg-olive-500 mt-5">
                            <tr>
                                <th className="py-2 text-lg">Sn</th>
                                <th className="py-2 text-lg">Product Name</th>
                                <th className="py-2 text-lg">Qty</th>
                                <th className="py-2 text-lg">Price</th>
                                <th className="py-2 text-lg">Company</th>
                                <th className="py-2 text-lg">Total</th>
                                <th className="py-2 text-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                               {
                                   setProductName.map((returnItem, index)=>{
                                    const tl = Number(returnItem.qty) * Number(returnItem.price);
                                   return <tr key={index.id} className="border-b hover:bg-olive-300 hover:scale-101
                                   duration-200">
                                            <td className="py-1 text-lg">{index + 1}</td>
                                            <td className="py-1 text-lg">{returnItem.name}</td>
                                            <td className="py-1 text-lg">{returnItem.qty}</td>
                                            <td className="py-1 text-lg">{returnItem.price}</td>
                                            <td className="py-1 text-lg">{returnItem.company}</td>
                                            <tr className="py-1 text-lg">{tl}</tr>
                                            <td className="py-1 text-lg">
                                                <button
                                                    type="button"
                                                    className="bg-black text-white mr-2 px-4 py-1 rounded-md"
                                                    onClick={() => EditingFunction()}
                                                >
                                                    Edit
                                                </button>
                                                <button type="button"
                                                onClick={()=> handleDelete(item.id)} 
                                                className="px-3 py-1 rounded-md bg-black text-white">Delete</button>
                                            </td>
                                    </tr>
                                    })
                               } 
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}




