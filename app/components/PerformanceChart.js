import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartSkeleton } from "./SkeletonComponents";

export function PerformanceChart({ results, loading }) {
  if (loading) {
    return <ChartSkeleton />;
  }

  const chartData = results
    .filter(
      (result) =>
        result.data &&
        result.data.status &&
        Array.isArray(result.data.data) &&
        result.data.data.length > 0
    )
    .map((result) => ({
      semester: result.semester,
      sgpa: result.sgpa,
    }));

  return (
    <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl p-4 sm:p-6 lg:p-8">
      <div className="font-bold text-lg sm:text-xl text-gray-900 mb-4 sm:mb-6">
        SGPA Trend
      </div>
      <div className="h-48 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="semester"
              tick={{ fontSize: 10, fill: "#4B5563" }}
              angle={-45}
              textAnchor="end"
              height={50}
              interval={0}
              axisLine={false}
              tickLine={false}
              className="text-xs sm:text-sm"
            />
            <YAxis
              domain={[0, 4]}
              tickCount={5}
              tick={{ fontSize: 10, fill: "#4B5563" }}
              axisLine={false}
              tickLine={false}
              width={25}
              className="text-xs sm:text-sm"
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
                padding: "8px",
              }}
              formatter={(value) => [
                value?.toFixed ? value.toFixed(2) : value,
                "SGPA",
              ]}
              labelStyle={{
                fontSize: "11px",
                fontWeight: "600",
              }}
            />
            <Line
              type="monotone"
              dataKey="sgpa"
              name="SGPA"
              stroke="url(#gradientStroke)"
              strokeWidth={2}
              dot={{ r: 3, fill: "#4F46E5" }}
              activeDot={{ r: 5, fill: "#4338CA" }}
              className="sm:stroke-[3px] sm:[&>circle]:r-4 sm:[&>.recharts-active-dot]:r-6"
            />
            <defs>
              <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
