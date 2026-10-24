
export default function PlanedProjecrMainBody(){

    return(
        <section className="flex gap-5 w-full m-5">
            {/* total sales  */}
            <div className="flex gap-3 w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl  outline-4 outline-olive-100" >
                <div>
                    <img src="/totalSales.png"
                     className="mr-10" alt="can not load image" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-serif">Total Sales</h1>
                    <p className="font-bold text-2xl text-emerald-500"><q>120000</q></p>
                    <p className=" font-serif text-end">AF</p>
                </div>
            </div>
             {/* total purchases  */}
            <div className="flex gap-3  w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl  outline-4 outline-olive-100" >
                <div>
                    <img src="/totalPurchases.png"
                     className="mr-10" alt="can not load image" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-serif">Total Purchases</h1>
                    <p className="font-bold text-2xl text-emerald-500"><q>1200</q></p>
                    <p className=" font-serif text-end">AF</p>
                </div>
            </div>
             {/* total Expenses  */}
            <div className="flex gap-3  w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl  outline-4 outline-olive-100" >
                <div>
                    <img src="/totalExpenses.png"
                     className="mr-10" alt="can not load image" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-serif">Total Expenses</h1>
                    <p className="font-bold text-2xl text-emerald-500"><q>1100</q></p>
                    <p className=" font-serif text-end">AF</p>
                </div>
            </div>
             {/* Cash balnace  */}
            <div className="flex gap-3  w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl  outline-4 outline-olive-100" >
                <div>
                    <img src="/totalCash.png"
                     className="mr-10" alt="can not load image" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-serif">Cash Balnace</h1>
                    <p className="font-bold text-2xl text-emerald-500"><q>9000</q></p>
                    <p className=" font-serif text-end">AF</p>
                </div>
            </div>
            
        </section>
    );
}