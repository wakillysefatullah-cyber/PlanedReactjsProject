
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
// import Dashboard from "./Dashboard.jsx"
// import PlanedProjecrMainNavbar from './Dashboard/PlanedProjecrMainNavbar.jsx'
// import NewCustomerEntry from './NewCustomerEntry.jsx'
// import AddCustomer from './NewCustomerEntry.jsx'
// import Sales from './Transactions/Sales.jsx'
// import Purchase from "./Transactions/Purchase.jsx"
// import PrintPage from "./Transactions/PrintPage.jsx"
// import Stock from "./Transactions/Stock.jsx"
// import Receipt from "./Transactions/Receipt.jsx"
// export default function App(){
//     return(

//         <Router>
//             <Routes>
//                 <Route path="/" element={<Dashboard/>}/>
//                 <Route path="/PlanedProjecrMainNavbar" element={<PlanedProjecrMainNavbar/>}/>
//                 <Route path="/NewCustomerEntry" element={<NewCustomerEntry/>}/>
//                 {/* <Route path="/AllLedgers" element={<AllLedgers/>}/> */}
//                 <Route path="/Sales" element={<Sales/>}/>
//                 <Route path="/purchase" element={<Purchase/>}/>
//                 <Route path="/PrintPage" element={<PrintPage/>}/>
//                 <Route path="/Stock" element={<Stock/>}/>
//                 <Route path="/Receipt" element={<Receipt/>}/> 
//             </Routes>
//         </Router>
//     )
// }




// // import {BrowserRouter as Router , Route, Routes } from "react-router-dom";
// // import { useState } from "react";

// // import NewCustomerEntry from "./NewCustomerEntry.jsx";
// // import Sales from "./Transactions/Sales.jsx";

// // export default function App() {

// //     const [allCustomerInfo, setAllCustomerInfo] = useState([]);

// //     return (
// //       <Router>
// //         <Routes>
// //             {/* new-customer  */}
// //             <Route
// //                 path="newCustomarEntry" element={<NewCustomerEntry allCustomerInfo={allCustomerInfo} setAllCustomerInfo={setAllCustomerInfo}
// //                     />
// //                 }
// //             />

// //             <Route path="sales" element={ <Sales allCustomerInfo={allCustomerInfo}/>
// //                 }
// //             />

// //         </Routes>
// //         </Router>
// //     );
// // }



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import PlanedProjecrMainNavbar from './Dashboard/PlanedProjecrMainNavbar.jsx';
import NewCustomerEntry from './Masters/NewCustomerEntry.jsx';
import Sales from './Transactions/Sales.jsx';
import Purchase from "./Transactions/Purchase.jsx";
import PrintPage from "./Transactions/PrintPage.jsx";
import Stock from "./Transactions/Stock.jsx";
import Receipt from "./Transactions/Receipt.jsx";
import MetricCards from "./Transactions/MetricCards.jsx";
import Payment from './Transactions/Payment.jsx'
import Repor from './RportPages/Repor.jsx';
import SalesReturn from './Transactions/SalesReturn.jsx'
import PurReturn from "./Transactions/PurReturn.jsx";
import AllLedgers from './Masters/AllLedgers.jsx'
import Expenses from './Expenses.jsx'
import Nav from './Transactions/Nav.jsx'

// import NewCustomerEntry from "./Masters/NewCustomerEntry.jsx";
// import AllLedgers from "./Masters/AllLedgers.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/PlanedProjecrMainNavbar" element={<PlanedProjecrMainNavbar />} />
                <Route path="/NewCustomerEntry" element={<NewCustomerEntry />} />
                <Route path="/Sales" element={<Sales />} />
                
                {/*  FIXED: Changed from "/purchase" to "/Purchases" to match your link location */}
                <Route path="/Purchases" element={<Purchase />} />
                
                <Route path="/PrintPage" element={<PrintPage />} />
                <Route path="/Stock" element={<Stock />} />
                <Route path="/Receipt" element={<Receipt />} /> 
                <Route path="/Payment" element={<Payment/>}/>
                <Route path="/Repor" element={<Repor/>}/>
                <Route path="/SalesReturn" element={<SalesReturn/>}/>
                <Route path="/PurReturn" element={<PurReturn/>}/>
                <Route path="/AllLedgers" element={<AllLedgers/>}/>
                <Route path="/Expenses" element={<Expenses/>}/>
                <Route path="/Nav" element={<Nav/>}/>

                
                {/* 🔍 Optional Catch-All: Displays if any other route is missing */}
                <Route path="*" element={<div className="p-8 text-xl font-bold text-center">404: Page Not Found</div>} />
                
            </Routes>
        </Router>
    );
}
