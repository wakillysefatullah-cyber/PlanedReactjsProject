
export default function Nav(){

    return(
        <section>
            <div className="py-3 max-w-full max-h-20 sm:bg-olive-200 shadow md:bg-olive-100 border-2
             lg:bg-emerald-200 md:flex justify-between md:px-4 px-2 gap-3">
                <h1 className="bg-emerald-500 px-4 py-1 rounded-md text-2xl font-bold font-serif">ComputerScience</h1>
                <nav className="flex gap-5">
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Home</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Services</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">About</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">One</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Two</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Three</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Four</a>
                    <a href="#" className="text-xl hover:bg-emerald-400 px-3 rounded-md place-content-center font-serif font-bold ">Seven</a>
                </nav>
                <div className="flex gap-3">
                    <button className="bg-black text-white text-xl font-bold font-serif px-4 py-2 rounded-md">Login</button>
                    <button className="hover:bg-black hover:text-white text-black text-xl font-bold font-serif px-4 py-2 rounded-md">LogOut</button>
                </div>
            </div>
        </section>
    )
}