
export default function EasyCountMainFace(){

    return(
        <section>
            <div>
                <img src="public/main.png" 
                className="w-[700px] h-[300px] rounded-lg border-black m-auto" alt="" />
            </div>
            <div>
                <h1 className="text-center text-2xl font-bold font-serif">
                    Improve your business with <br />
                     <span className="text-3xl text-blue-700 animate-pulse"> EasyCount</span>
                     <br /> managment system
                     </h1>
            </div>
            <div className="flex gap-8 justify-center mt-50 pt-2 border-t">
                <button className="text-lg font-serif font-bold px-10 py-2 rounded-lg
                 bg-black text-white hover:bg-olive-800 hover:-translate-y-1.5
                 duration-300">
                    Sales
                </button>
                <button className="text-lg font-serif font-bold px-10 py-2 rounded-lg
                 bg-black text-white hover:bg-olive-800 hover:-translate-y-1.5
                 duration-300">
                    Purchases
                </button>
                <button className="text-lg font-serif font-bold px-10 py-2 rounded-lg
                 bg-black text-white hover:bg-olive-800 hover:-translate-y-1.5
                 duration-300">
                    New
                </button>
            </div>
        </section>
    );
}