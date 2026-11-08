
import { useEffect, useState } from "react";

import { getSales } from "../api/saleApi.js";
import { getPurchases } from "../api/purchaseApi.js";
import { getSalesReturns } from "../api/salesReturnApi.js";
import { getPurchaseReturns } from "../api/purchaseReturnApi.js";

export default function PlanedProjecrMainBody() {

    const [totalSales, setTotalSales] = useState(0);
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadDashboardTotals() {

            try {
                setLoading(true);
                setError("");

                const [
                    sales,
                    purchases,
                    salesReturns,
                    purchaseReturns
                ] = await Promise.all([
                    getSales(),
                    getPurchases(),
                    getSalesReturns(),
                    getPurchaseReturns()
                ]);

                const salesAmount = sales.reduce(
                    (sum, sale) => sum + Number(sale.total || 0),
                    0
                );

                const salesReturnAmount = salesReturns.reduce(
                    (sum, item) => sum + Number(item.total || 0),
                    0
                );

                const purchaseAmount = purchases.reduce(
                    (sum, purchase) => sum + Number(purchase.total || 0),
                    0
                );

                const purchaseReturnAmount = purchaseReturns.reduce(
                    (sum, item) => sum + Number(item.total || 0),
                    0
                );

                setTotalSales(salesAmount - salesReturnAmount);

                setTotalPurchases(
                    purchaseAmount - purchaseReturnAmount
                );

            } catch (err) {
                console.error("Dashboard totals error:", err);
                setError(err.message || "Failed to load dashboard totals");

            } finally {
                setLoading(false);
            }
        }

        loadDashboardTotals();

    }, []);

    const formatAmount = (amount) => {
        return Number(amount).toLocaleString("en-US", {
            maximumFractionDigits: 2
        });
    };

    return (
        <section className="flex gap-5 w-full m-5">

            {/* total sales */}
            <div className="flex gap-3 w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl outline-4 outline-olive-100">
                <div>
                    <img
                        src="/totalSales.png"
                        className="mr-10"
                        alt="can not load image"
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold font-serif">
                        Total Sales
                    </h1>

                    <p className="font-bold text-2xl text-emerald-500">
                        {loading ? "Loading..." : error ? "Unavailable" : formatAmount(totalSales)}
                    </p>

                    <p className="font-serif text-end">AF</p>
                </div>
            </div>

            {/* total purchases */}
            <div className="flex gap-3 w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl outline-4 outline-olive-100">
                <div>
                    <img
                        src="/totalPurchases.png"
                        className="mr-10"
                        alt="can not load image"
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold font-serif">
                        Total Purchases
                    </h1>

                    <p className="font-bold text-2xl text-emerald-500">
                        {loading ? "Loading..." : error ? "Unavailable" : formatAmount(totalPurchases)}
                    </p>

                    <p className="font-serif text-end">AF</p>
                </div>
            </div>

            {/* total Expenses */}
            <div className="flex gap-3 w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl outline-4 outline-olive-100">
                <div>
                    <img
                        src="/totalExpenses.png"
                        className="mr-10"
                        alt="can not load image"
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold font-serif">
                        Total Expenses
                    </h1>

                    <p className="font-bold text-2xl text-emerald-500">
                        <q>1100</q>
                    </p>

                    <p className="font-serif text-end">AF</p>
                </div>
            </div>

            {/* Cash balance */}
            <div className="flex gap-3 w-[300px] h-auto p-5 rounded-md bg-olive-50 shadow-2xl outline-4 outline-olive-100">
                <div>
                    <img
                        src="/totalCash.png"
                        className="mr-10"
                        alt="can not load image"
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold font-serif">
                        Cash Balance
                    </h1>

                    <p className="font-bold text-2xl text-emerald-500">
                        <q>9000</q>
                    </p>

                    <p className="font-serif text-end">AF</p>
                </div>
            </div>

            {error && (
                <p className="text-red-600 text-sm">
                    {error}
                </p>
            )}

        </section>
    );
}