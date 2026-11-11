
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

export default function Repor() {
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadReports();
    }, []);

    async function fetchData(endpoint) {
        const response = await fetch(`${API_URL}/${endpoint}`);

        if (!response.ok) {
            throw new Error(`Failed to load ${endpoint}`);
        }

        return response.json();
    }

    async function loadReports() {
        try {
            setLoading(true);
            setError("");

            const [salesData, purchaseData, expenseData] =
                await Promise.all([
                    fetchData("sales"),
                    fetchData("purchases"),
                    fetchData("expenses")
                ]);

            setSales(salesData);
            setPurchases(purchaseData);
            setExpenses(expenseData);

        } catch (err) {
            setError(err.message || "Failed to load reports.");
        } finally {
            setLoading(false);
        }
    }

    // Calculate total sales.
    const totalSales = sales.reduce(
        (total, sale) => total + Number(sale.total || 0),
        0
    );

    // Calculate total purchases.
    const totalPurchases = purchases.reduce(
        (total, purchase) => total + Number(purchase.total || 0),
        0
    );

    // Calculate total expenses.
    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount || 0),
        0
    );

    // Calculate money received from sales.
    const totalSalesReceived = sales.reduce(
        (total, sale) => total + Number(sale.paid || 0),
        0
    );

    // Calculate money paid for purchases.
    const totalPurchasesPaid = purchases.reduce(
        (total, purchase) => total + Number(purchase.paid || 0),
        0
    );

    /*
     * FIFO COST CALCULATION
     *
     * The oldest purchased stock is considered sold first.
     *
     * Example:
     * Purchase 5 mice at 100 Af each.
     * Sell 1 mouse at 120 Af.
     * Cost = 100 Af.
     * Profit = 20 Af.
     */

    function calculateFIFO() {
        const events = [];

        // Add all purchase items.
        purchases.forEach((purchase) => {
            (purchase.items || []).forEach((item) => {
                events.push({
                    type: "PURCHASE",
                    date: purchase.invoiceDate,
                    id: purchase.id,
                    itemId: item.itemId,
                    qty: Number(item.qty || 0),
                    cost: Number(item.price || 0)
                });
            });
        });

        // Add all sales items.
        sales.forEach((sale) => {
            (sale.items || []).forEach((item) => {
                events.push({
                    type: "SALE",
                    date: sale.invoiceDate,
                    id: sale.id,
                    itemId: item.itemId,
                    qty: Number(item.qty || 0),
                    sellingPrice: Number(item.price || 0)
                });
            });
        });

        /*
         * Process transactions chronologically.
         * Purchases on the same date are processed before sales.
         */
        events.sort((a, b) => {
            const dateDifference =
                new Date(a.date) - new Date(b.date);

            if (dateDifference !== 0) {
                return dateDifference;
            }

            if (a.type !== b.type) {
                return a.type === "PURCHASE" ? -1 : 1;
            }

            return a.id - b.id;
        });

        // Store available purchase batches for each item.
        const inventory = new Map();

        let totalCostOfGoodsSold = 0;
        let totalSalesFromItems = 0;
        let uncostedQuantity = 0;

        events.forEach((event) => {
            if (!event.itemId || event.qty <= 0) {
                if (event.type === "SALE") {
                    uncostedQuantity += event.qty;
                }
                return;
            }

            if (event.type === "PURCHASE") {
                if (!inventory.has(event.itemId)) {
                    inventory.set(event.itemId, []);
                }

                inventory.get(event.itemId).push({
                    qty: event.qty,
                    cost: event.cost
                });

                return;
            }

            // Process sale using the oldest available batches.
            let remainingQty = event.qty;

            totalSalesFromItems +=
                event.qty * event.sellingPrice;

            const batches = inventory.get(event.itemId) || [];

            while (remainingQty > 0 && batches.length > 0) {
                const oldestBatch = batches[0];

                const soldQty = Math.min(
                    remainingQty,
                    oldestBatch.qty
                );

                totalCostOfGoodsSold +=
                    soldQty * oldestBatch.cost;

                oldestBatch.qty -= soldQty;
                remainingQty -= soldQty;

                if (oldestBatch.qty <= 0) {
                    batches.shift();
                }
            }

            // Track sales for which purchase cost is unavailable.
            if (remainingQty > 0) {
                uncostedQuantity += remainingQty;
            }
        });

        return {
            totalCostOfGoodsSold,
            totalSalesFromItems,
            uncostedQuantity
        };
    }

    const fifoResult = calculateFIFO();

    const fifoComplete = fifoResult.uncostedQuantity === 0;

    // Gross profit = Sales - Cost of Goods Sold.
    const grossProfit = fifoComplete
        ? fifoResult.totalSalesFromItems -
          fifoResult.totalCostOfGoodsSold
        : null;

    // Net profit = Gross Profit - Expenses.
    const netProfit = grossProfit === null
        ? null
        : grossProfit - totalExpenses;

    /*
     * Estimated cash movement:
     * Sales received - Purchases paid - Expenses.
     *
     * This is not a complete account balance because
     * separate receipts, payments, and opening balance
     * are not included here.
     */
    const cashMovement =
        totalSalesReceived -
        totalPurchasesPaid -
        totalExpenses;

    function formatAmount(amount) {
        if (amount === null || amount === undefined) {
            return "Not available";
        }

        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount) + " Af";
    }

    const reports = [
        {
            title: "Sales",
            amount: totalSales,
            color: "bg-green-500",
            link: "/ShowEachSaleReport"
        },
        {
            title: "Purchases",
            amount: totalPurchases,
            color: "bg-blue-500"
        },
        {
            title: "Expenses",
            amount: totalExpenses,
            color: "bg-red-500"
        },
        {
            title: "Cash Movement",
            amount: cashMovement,
            color: "bg-amber-500"
        },
        {
            title: "Profit / Loss",
            amount: netProfit,
            color: netProfit === null
                ? "bg-gray-500"
                : netProfit >= 0
                    ? "bg-green-600"
                    : "bg-red-600"
        }
    ];

    return (
        <section>

            {/* Page Heading */}
            <div className="flex justify-between mx-5">
                <h1 className="text-center text-4xl my-8 px-4 font-bold font-serif">
                    Manage your
                    <span className="text-amber-500 text-4xl">
                        {" "}Reports 
                    </span> 
                    {" "}professionally
                </h1>

                <div className="mt-8">
                    <Link
                        to="/"
                        className="hover:bg-black hover:text-white px-7 py-2 font-bold outline rounded-md"
                    >
                        {"<< Back"}
                    </Link>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-600 text-center font-bold">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="text-center text-xl py-10">
                    Loading reports...
                </p>
            ) : (
                <>
                    {/* Report Cards */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

                        {reports.map((report) => (
                            <div
                                key={report.title}
                                className="flex flex-col gap-5"
                            >
                                <div className="flex flex-col min-h-36 gap-5 hover:outline p-2 rounded-md shadow-2xl">

                                    <h1 className="text-2xl font-serif font-bold py-2">
                                        {report.title}
                                    </h1>

                                    <p className={`${report.color} text-center py-3 rounded-md font-bold text-xl text-white`}>
                                        {formatAmount(report.amount)}
                                    </p>

                                </div>

                                {report.link ? (
                                    <Link
                                        to={report.link}
                                        className="text-center font-bold font-serif bg-black rounded-md px-5 py-2 text-white"
                                    >
                                        Report
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="font-bold font-serif bg-gray-400 rounded-md px-5 py-2 text-white cursor-not-allowed"
                                    >
                                        Report
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>

                    {/* Profit and FIFO Details */}
                    <div className="mx-5 mt-8 p-5 rounded-lg shadow-xl">

                        <h2 className="text-2xl font-bold font-serif mb-5">
                            Profit / Loss Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="bg-gray-100 p-4 rounded-md">
                                <p className="font-bold">
                                    Cost of Goods Sold (FIFO)
                                </p>
                                <p className="text-xl mt-2">
                                    {formatAmount(
                                        fifoResult.totalCostOfGoodsSold
                                    )}
                                </p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md">
                                <p className="font-bold">
                                    Gross Profit
                                </p>
                                <p className="text-xl mt-2">
                                    {formatAmount(grossProfit)}
                                </p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md">
                                <p className="font-bold">
                                    Total Expenses
                                </p>
                                <p className="text-xl mt-2">
                                    {formatAmount(totalExpenses)}
                                </p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md">
                                <p className="font-bold">
                                    Net Profit / Loss
                                </p>
                                <p className={`text-xl mt-2 font-bold ${
                                    netProfit === null
                                        ? "text-gray-600"
                                        : netProfit >= 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                }`}>
                                    {formatAmount(netProfit)}
                                </p>
                            </div>

                        </div>

                        {!fifoComplete && (
                            <p className="text-red-600 font-bold mt-5">
                                Warning: {fifoResult.uncostedQuantity}
                                {" "}sold item quantity could not be matched
                                with available purchase batches. Profit/Loss
                                cannot be calculated accurately.
                            </p>
                        )}

                    </div>
                </>
            )}

            {/* Footer */}
            <div className="place-items-center place-content-center mt-10">
                <img
                    src="/square-pen.svg"
                    className="size-10 m-4"
                    alt="Reports"
                />

                <h1 className="text-lg font-serif bg-olive-200 p-3 rounded-full px-20">
                    Which section do you want to report?
                </h1>
            </div>

        </section>
    );
}