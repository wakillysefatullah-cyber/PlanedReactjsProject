

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard.jsx";
import PlanedProjecrMainNavbar from "./Dashboard/PlanedProjecrMainNavbar.jsx";
import NewCustomerEntry from "./Masters/NewCustomerEntry.jsx";
import Sales from "./Transactions/Sales.jsx";
import Purchase from "./Transactions/Purchase.jsx";
import PrintPage from "./Transactions/PrintPage.jsx";
import Stock from "./Transactions/Stock.jsx";
import Receipt from "./Transactions/Receipt.jsx";
import Payment from "./Transactions/Payment.jsx";
import Repor from "./RportPages/Repor.jsx";
import SalesReturn from "./Transactions/SalesReturn.jsx";
import PurReturn from "./Transactions/PurReturn.jsx";
import AllLedgers from "./Masters/AllLedgers.jsx";
import Expenses from "./Expenses.jsx";
import LedgerAccount from "./Masters/LedgerAccount.jsx";
import ShowEachSaleReport from "./RportPages/ShowEachSaleReport.jsx";
import About from './About.jsx'


import { InventoryProvider } from "./context/InventoryContext.jsx";
import { useState , useEffect} from "react";

export default function App() {
    // const [allCustomerInfo, setAllCustomerInfo] = useState([]);
    const [allCustomerInfo, setAllCustomerInfo] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("easycount-customers")
            ) || [];
        } catch {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem(
            "easycount-customers",
            JSON.stringify(allCustomerInfo)
        );
    }, [allCustomerInfo]);

    const [productName, setProductName] = useState([]);

    const [sales, setSales] = useState([]);
    return (
        <InventoryProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route
                        path="/PlanedProjecrMainNavbar"
                        element={<PlanedProjecrMainNavbar />}
                    />

                    <Route
                        path="/NewCustomerEntry"
                        element={<NewCustomerEntry allCustomerInfo={allCustomerInfo}
                        setAllCustomerInfo={setAllCustomerInfo}/>}
                    />

                    <Route path="/Ledger/:id" element={<LedgerAccount/>}/>
                    <Route path="/Sales" element={<Sales sales={sales} setSales={setSales} allCustomerInfo={allCustomerInfo}/>} />

                    <Route path="/Purchases" element={<Purchase />} />

                    <Route path="/PrintPage" element={<PrintPage />} />

                    <Route path="/Stock" element={<Stock />} />

                    <Route path="/Receipt" element={<Receipt />} />

                    <Route path="/Payment" element={<Payment />} />

                    <Route path="/Repor" element={<Repor />} />

                    <Route path="/SalesReturn" element={<SalesReturn productName={productName} setProductName={setProductName}/>} />

                    <Route path="/PurReturn" element={<PurReturn />} />

                    <Route path="/AllLedgers" element={<AllLedgers allCustomerInfo={allCustomerInfo} />} />

                    <Route path="/Expenses" element={<Expenses />} />
                    <Route path="/ShowEachSaleReport" element={<ShowEachSaleReport sales={sales}/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route
                        path="*"
                        element={
                            <div className="p-8 text-xl font-bold text-center">
                                404: Page Not Found
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </InventoryProvider>
    );
}
