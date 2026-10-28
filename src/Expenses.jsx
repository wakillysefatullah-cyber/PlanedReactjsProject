import { Link } from "react-router-dom";

export default function Expenses(){
    return(
        <section>
            <div className="m-5 flex justify-between">
                <h1 className="text-4xl font-bold font-serif text-center border-b-2 inline">
                    Manage your<span 
                    className="text-5xl px-3 py-1 rounded-md font-bold text-cyan-400">
                        Expenses</span>professionally</h1>
                <Link to={'/'} className="bg-black text-white text-lg font-bold font-serif rounded-md px-6 py-3">{'<<Back'}</Link>
            </div>
            <table className="w-full mt-5">
                <thead className="bg-olive-500 ">
                    <tr>
                        <th className="py-2 text-xl">Sn</th>
                        <th className="py-2 text-xl">Receipted by</th>
                        <th className="py-2 text-xl">Date</th>
                        <th className="py-2 text-xl">Through</th>
                    </tr>
                </thead>
            </table>
        </section>
    );

}