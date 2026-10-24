import SalesOverview from './SalesOverview.jsx'
import PlanedProjecrMainBody from './PlanedProjectManinBody';

export default function PlanedProjecrMainNavbar(){

    return(
        <section className="w-full ">
           <div className="flex justify-between w-full border-b pb-2">
                <div className="flex relative items-center">
                    <span className="absolute ml-5">
                        <img src="public/search.svg"  alt="can not " />
                    </span>
                    <input type="search" className="w-[700px] border h-12 mx-4 rounded-full p-1 pl-8"
                    placeholder="Search..." />
                </div>
                <div className="flex gap-3 ">
                    <img src="public/r.jpg" className="size-12 rounded-full" alt="" />
                    <div>
                        <select className="font-bold font-serif items-center">
                            <option value="set">Sefatullah</option>
                            <option value="set">Ahmadullah</option>
                            <option value="set">Saleh</option>
                            <option value="set">Shams</option>
                        </select>
                    </div>
                </div>
             </div>
             <div className="w-full"> 
                <PlanedProjecrMainBody/>
                <div className="mt-2">
                    <SalesOverview />
                </div>
             </div>
        </section>
    );
}

