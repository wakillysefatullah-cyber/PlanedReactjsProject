export default function MetricCards() {
  const metrics = [
    { title: "Total Sales", value: "120,000", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: "📊" },
    { title: "Total Purchases", value: "1,200", color: "text-blue-600", bgColor: "bg-blue-50", icon: "🛒" },
    { title: "Total Expenses", value: "1,100", color: "text-red-600", bgColor: "bg-red-50", icon: "📦" },
    { title: "Cash Balance", value: "9,000", color: "text-purple-600", bgColor: "bg-purple-50", icon: "💼" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {metrics.map((card, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          {/* Left Side: Title and Value */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-2xl font-bold tracking-tight ${card.color}`}>
                {card.value}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase">AFN</span>
            </div>
          </div>

          {/* Right Side: Circular Icon Badge */}
          <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center text-xl`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
