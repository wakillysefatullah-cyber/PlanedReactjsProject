import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 60000 },
  { month: "Feb", sales: 80000 },
  { month: "Mar", sales: 75000 },
  { month: "Apr", sales: 100000 },
  { month: "May", sales: 120000 },
  { month: "Jun", sales: 105000 },
];

export default function SalesOverview() {
  return (
    <div className="w-full rounded-2xl bg-white shadow-md">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Sales Overview
        </h2>

        <p className="text-sm text-gray-500">
          Monthly sales performance
        </p>
      </div>

      {/* Chart */}
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
              dataKey="month"
              tick={{ fontSize: 14 }}
            />

            <YAxis
              tick={{ fontSize: 14 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()} AF`,
                "Sales",
              ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}