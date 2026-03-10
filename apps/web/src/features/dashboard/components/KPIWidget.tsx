import React from "react";
import { Card, Loader } from "components/ui";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface KPIWidgetProps {
  title: string;                       // KPI title
  value: number | string;              // KPI value
  trend?: number;                       // Trend percentage
  trendType?: "increase" | "decrease"; // Trend direction
  loading?: boolean;                    // Loading state
  icon?: React.ReactNode;               // Optional icon
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  trend,
  trendType,
  loading = false,
  icon,
}) => {
  // Determine color for trend
  const trendColor =
    trendType === "increase"
      ? "text-green-500"
      : trendType === "decrease"
      ? "text-red-500"
      : "";

  const trendIcon =
    trendType === "increase" ? (
      <ArrowUp className={`w-4 h-4 ${trendColor}`} />
    ) : trendType === "decrease" ? (
      <ArrowDown className={`w-4 h-4 ${trendColor}`} />
    ) : null;

  return (
    <Card className="p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {title}
        </h3>
        {icon && <div className="text-gray-400 dark:text-gray-400">{icon}</div>}
      </div>

      {/* Value and trend */}
      <div className="flex items-center justify-between">
        {loading ? (
          <Loader size={24} message="Loading..." />
        ) : (
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </span>
        )}

        {trend !== undefined && trendIcon && (
          <span className="flex items-center space-x-1 text-sm font-medium">
            {trendIcon}
            <span className={`${trendColor}`}>{Math.abs(trend)}%</span>
          </span>
        )}
      </div>
    </Card>
  );
};