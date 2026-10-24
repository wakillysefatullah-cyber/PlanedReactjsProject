import { Link } from "react-router-dom";
export default function Repor(){

    return(
        <section>
            <div className="flex justify-between mx-5">
                <h1 className="text-center text-4xl my-8 px-4 
                font-bold font-serif">Manage your 
                <span className="text-amber-500 text-4xl"> Reports</span> professionally</h1>
                <div className="mt-8">
                <Link to='/'
                    className="hover:bg-black hover:text-white px-7 py-2 font-bold outline rounded-md 
                    ">{`<< Back`}
                </Link>
                </div>
            </div>
            <div className="p-5 flex gap-5 place-items-center place-content-center">
                {/* sales  */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-70 h-36 gap-5 hover:outline p-2
                    rounded-md shadow-2xl ">
                        <h1 className="text-2xl font-serif font-bold py-2 ">Sales</h1>
                        <p className="bg-green-500 text-center py-3 rounded-md font-bold text-xl">
                            14000 Af
                        </p>
                    </div>
                    <button className="font-bold font-serif bg-black rounded-md px-5 py-2
                    text-white">Report</button>
                </div>
                {/* purchase  */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-70 h-36 gap-5 hover:outline p-2
                    rounded-md shadow-2xl ">
                        <h1 className="text-2xl font-serif font-bold py-2 ">Purchases</h1>
                        <p className="bg-green-500 text-center py-3 rounded-md font-bold text-xl">
                            14000 Af
                        </p>
                    </div>
                    <button className="font-bold font-serif bg-black rounded-md px-5 py-2
                    text-white">Report</button>
                </div>
                {/* Expenses  */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-70 h-36 gap-5 hover:outline p-2
                    rounded-md shadow-2xl ">
                        <h1 className="text-2xl font-serif font-bold py-2 ">Expenses</h1>
                        <p className="bg-green-500 text-center py-3 rounded-md font-bold text-xl">
                            14000 Af
                        </p>
                    </div>
                    <button className="font-bold font-serif bg-black rounded-md px-5 py-2
                    text-white">Report</button>
                </div>
                {/* total balnace  */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-70 h-36 gap-5 hover:outline p-2
                    rounded-md shadow-2xl ">
                        <h1 className="text-2xl font-serif font-bold py-2 ">Total Balance</h1>
                        <p className="bg-green-500 text-center py-3 rounded-md font-bold text-xl">
                            14000 Af
                        </p>
                    </div>
                    <button className="font-bold font-serif bg-black rounded-md px-5 py-2
                    text-white">Report</button>
                </div>
                {/* total profit/loss  */}
               <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-70 h-36 gap-5 hover:outline p-2
                    rounded-md shadow-2xl ">
                        <h1 className="text-2xl font-serif font-bold py-2 ">Profit/Loss</h1>
                        <p className="bg-green-500 text-center py-3 rounded-md font-bold text-xl">
                            14000 Af
                        </p>
                    </div>
                    <button className="font-bold font-serif bg-black rounded-md px-5 py-2
                    text-white">Report</button>
                </div>
            </div>
            {/* body ? */}

            <div className="place-items-center place-content-center mt-10">
                <img src="public/square-pen.svg"
                className="size-10 m-4" alt="" />
                <h1 className="text-lg font-serif
                 bg-olive-200 p-3 rounded-full px-20"
                >Which section do you want to report?</h1>
            </div>
        </section>
    );
}