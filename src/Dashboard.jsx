import { Link } from "react-router-dom";
import PlanedProjecrMainNavbar from "./Dashboard/PlanedProjecrMainNavbar";
import EasyCountMainFace from './EasyCountMainFace.jsx'
export default function Dashboard(){

    return(

        <section className="flex ">
            <aside className="w-[230px] bg-slate-800 h-screen px-3 ">
                <h1 className="text-left text-2xl my-5 font-serif font-bold 
                border-b text-white">EasyCount</h1>
                <ul className="gap-y-4 flex flex-col">
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="group relative hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        All Ledgers
                        <ul className="absolute top-full scale-y-0 origin-top group-hover:scale-y-100
                        duration-300 bg-slate-950 line-clamp-5 right-0 p-4 gap-y-2 flex flex-col z-50">
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to={'/AllLedgers'}>All Ledgers</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to="/NewCustomerEntry">New Ledger</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link>ModifyLedger</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link>Delete Ledger</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="group relative hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        Transactions 
                        <ul className="absolute top-full scale-y-0 origin-top group-hover:scale-y-100
                        duration-300 bg-slate-950 line-clamp-5 left-0 p-4 gap-y-2 flex flex-col">
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to={'/Sales'}>Sales</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to={'/Purchases'}>Purchase</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to={'/SalesReturn'}>SalesReturn</Link>
                            </li>
                            <li className="hover:bg-slate-700 px-1 py-1 rounded-md text-md">
                                <Link to={'/PurReturn'}>PurReturn</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Receipt">Receipt</Link>
                    </li>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Payment">Payment</Link>
                    </li>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Expenses">Expenses</Link>
                    </li>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Stock">Stock</Link>
                    </li>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Repor">Reports</Link>
                    </li>
                    
                </ul>
                <div className="mt-36">
                    <h1 className="text-xl font-bold font-serif text-white border-b ">Admin</h1>
                    <li className="hover:bg-slate-900 px-4 text-lg py-1 block rounded-md 
                    duration-300 text-white font-bold font-serif">
                        <Link to="/Settings">Settings</Link>
                    </li>
                </div>
                
            </aside>
            <div className="w-full m-5">
                {/* start from here to create main section EasyCout  */}
                <PlanedProjecrMainNavbar/>
                {/* <EasyCountMainFace/> */}
            </div>
        </section>

    );
}