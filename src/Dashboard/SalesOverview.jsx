
import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:8080/api/sales/daily-overview";

export default function SalesOverview() {

    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState(
        `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, "0")}`
    );

    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchDailySales() {

            try {
                setLoading(true);
                setError("");

                const [year, month] = selectedMonth.split("-");

                const response = await fetch(
                    `${API_URL}?year=${year}&month=${Number(month)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to load daily sales.");
                }

                const data = await response.json();

                setSalesData(
                    data.map(item => ({
                        day: item.day,
                        sales: Number(item.sales)
                    }))
                );

            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchDailySales();

    }, [selectedMonth]);

    return (
        <div className="w-full rounded-2xl bg-white shadow-md">

            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Daily Sales Overview
                    </h2>

                    <p className="text-sm text-gray-500">
                        Daily sales performance
                    </p>
                </div>

                {/* Month Selector */}
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                />

            </div>

            {/* Loading */}
            {loading && (
                <div className="flex h-[350px] items-center justify-center">
                    <p className="text-gray-500">
                        Loading daily sales...
                    </p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="flex h-[350px] items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Chart */}
            {!loading && !error && (
                <div className="h-[350px] w-full">

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart
                            data={salesData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 10,
                                bottom: 10,
                            }}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 14 }}
                                label={{
                                    value: "Day of Month",
                                    position: "insideBottom",
                                    offset: -5,
                                }}
                            />

                            <YAxis
                                tick={{ fontSize: 14 }}
                                tickFormatter={(value) =>
                                    `${value / 1000}k`
                                }
                            />

                            <Tooltip
                                labelFormatter={(day) => `Day ${day}`}
                                formatter={(value) => [
                                    `${Number(value).toLocaleString()} AF`,
                                    "Sales",
                                ]}
                            />

                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#16a34a"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 7 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>
            )}

        </div>
    );
}