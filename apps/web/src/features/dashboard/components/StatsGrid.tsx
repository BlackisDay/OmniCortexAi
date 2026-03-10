import React from "react";
import { KPIWidget } from "./KPIWidget";
import { DollarSign, Users, ShoppingCart } from "lucide-react";

// Sample KPIs (can be replaced dynamically from API later)
const kpis = [
  { key: 1, title: "Revenue", value: "$5,000", trend: 12, trendType: "increase", icon: <DollarSign className="w-5 h-5" /> },
  { key: 2, title: "Users", value: 1200, trend: -5, trendType: "decrease", icon: <Users className="w-5 h-5" /> },
  { key: 3, title: "Orders", value: 320, trend: 0, trendType: "increase", icon: <ShoppingCart className="w-5 h-5" /> },
];

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {kpis.map((item) => (
        <KPIWidget
          key={item.key}
          title={item.title}
          value={item.value}
          trend={item.trend}
          trendType={item.trendType as "increase" | "decrease"}
          icon={item.icon}
        />
      ))}
    </div>
  );
};