import SalesOverview from './SalesOverview.jsx'
import PlanedProjecrMainBody from './PlanedProjectManinBody';
import {User} from 'lucide-react'

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
                    <User size={30} className='outline outline-offset-4 rounded-full'/>
                    <div>
                        <p className='font-bold font-serif text-lg'>Admin</p>
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

