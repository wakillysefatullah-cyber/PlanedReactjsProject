




import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    LayoutDashboard,
    Users,
    ArrowDownUp,
    Receipt,
    CreditCard,
    Wallet,
    Package,
    FileText,
    Settings,
    ChevronDown,
} from "lucide-react";

import PlanedProjecrMainNavbar from "./Dashboard/PlanedProjecrMainNavbar";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState("");

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? "" : name);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenDropdown("");
    };

    const linkClass =
        "flex items-center gap-4 px-4 py-2 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition duration-400";

    const dropdownClass =
        "ml-9 mt-1 flex flex-col gap-1 border-l border-slate-600 pl-3";

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Mobile Navbar */}
            <header className="lg:hidden flex items-center justify-between
                bg-slate-900 text-white px-5 py-4 sticky top-0 z-40">

                <h1 className="text-2xl font-bold font-serif">
                    EasyCount
                </h1>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-slate-700"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </header>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-[260px]
                bg-slate-900 text-white px-4 py-5 overflow-y-auto
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
            >

                {/* Logo */}
                <div className="flex justify-between items-center
                    border-b border-slate-700 pb-5 mb-5">

                    <h1 className="text-2xl font-bold font-serif">
                        EasyCount
                    </h1>

                    <button
                        onClick={closeMenu}
                        className="lg:hidden p-2 hover:bg-slate-700 rounded-lg"
                        aria-label="Close sidebar"
                    >
                        <X size={23} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className={linkClass}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    {/* All Ledgers */}
                    <div>
                        <button
                            onClick={() => toggleDropdown("ledgers")}
                            className={`${linkClass} w-full justify-between`}
                            aria-expanded={openDropdown === "ledgers"}
                        >
                            <span className="flex items-center gap-3">
                                <Users size={20} />
                                All Ledgers
                            </span>

                            <ChevronDown
                                size={18}
                                className={`transition-transform ${
                                    openDropdown === "ledgers" ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {openDropdown === "ledgers" && (
                            <div className={dropdownClass}>
                                <Link to="/AllLedgers" onClick={closeMenu}
                                    className={linkClass}>
                                    All Ledgers
                                </Link>

                                <Link to="/NewCustomerEntry" onClick={closeMenu}
                                    className={linkClass}>
                                    New Ledger
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Transactions */}
                    <div>
                        <button
                            onClick={() => toggleDropdown("transactions")}
                            className={`${linkClass} w-full justify-between`}
                            aria-expanded={openDropdown === "transactions"}
                        >
                            <span className="flex items-center gap-3">
                                <ArrowDownUp size={20} />
                                Transactions
                            </span>

                            <ChevronDown
                                size={18}
                                className={`transition-transform ${
                                    openDropdown === "transactions" ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {openDropdown === "transactions" && (
                            <div className={dropdownClass}>
                                <Link to="/Sales" onClick={closeMenu}
                                    className={linkClass}>
                                    Sales
                                </Link>

                                <Link to="/Purchases" onClick={closeMenu}
                                    className={linkClass}>
                                    Purchases
                                </Link>

                                <Link to="/SalesReturn" onClick={closeMenu}
                                    className={linkClass}>
                                    Sales Return
                                </Link>

                                <Link to="/PurReturn" onClick={closeMenu}
                                    className={linkClass}>
                                    Purchase Return
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/Receipt" onClick={closeMenu} className={linkClass}>
                        <Receipt size={20} />
                        Receipt
                    </Link>

                    <Link to="/Payment" onClick={closeMenu} className={linkClass}>
                        <CreditCard size={20} />
                        Payment
                    </Link>

                    <Link to="/Expenses" onClick={closeMenu} className={linkClass}>
                        <Wallet size={20} />
                        Expenses
                    </Link>

                    <Link to="/Stock" onClick={closeMenu} className={linkClass}>
                        <Package size={20} />
                        Stock
                    </Link>

                    <Link to="/Repor" onClick={closeMenu} className={linkClass}>
                        <FileText size={20} />
                        Reports
                    </Link>
                    <Link to="/About" onClick={closeMenu} className={linkClass}>
                        <FileText size={20} />
                        About
                    </Link>

                </nav>

                {/* Admin Section */}
                <div className="mt-10 pt-5 border-t border-slate-700">
                    <p className="text-sm text-slate-400 font-semibold mb-3 px-4">
                        ADMINISTRATION
                    </p>

                    <Link
                        to="/Settings"
                        onClick={closeMenu}
                        className={linkClass}
                    >
                        <Settings size={20} />
                        Settings
                    </Link>
                </div>

            </aside>

            {/* Main Content */}
            <main className="min-h-screen lg:ml-[260px] p-4 md:p-6">

                <PlanedProjecrMainNavbar />

                {/* Your Dashboard Content */}
                {/* <EasyCountMainFace /> */}

            </main>

        </div>
    );
}
