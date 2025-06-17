import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ChartSkeleton } from "./Skeletons";
export function PerformanceChart({ results, loading }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState([]);
  const [isChartReady, setIsChartReady] = useState(false);

  // Memoize chartData to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    return results
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
  }, [results]);

  // Reset animation states when data changes
  useEffect(() => {
    // Reset animation states when loading starts
    if (loading) {
      setIsVisible(false);
      setAnimatedData([]);
      setIsChartReady(false);
      return;
    }

    // Start animations immediately when loading completes and we have data
    if (!loading && chartData.length > 0) {
      setIsVisible(true);
      setAnimatedData([]);
      setIsChartReady(false);

      // Start chart animation immediately
      setTimeout(() => {
        animateChartData();
      }, 50); // Tiny delay to ensure DOM is ready
    }
  }, [loading, chartData]);

  // Animate chart data points
  const animateChartData = useCallback(() => {
    if (chartData.length === 0) return;

    // Start with empty data
    setAnimatedData([]);

    // Gradually add data points with staggered animation
    chartData.forEach((point, index) => {
      setTimeout(() => {
        setAnimatedData((prev) => [...prev, { ...point, sgpa: 0 }]);
      }, index * 200);

      setTimeout(() => {
        setAnimatedData((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, sgpa: point.sgpa } : item
          )
        );
      }, index * 200 + 100);
    });

    // Mark chart as ready after all animations
    setTimeout(() => {
      setIsChartReady(true);
    }, chartData.length * 200 + 500);
  }, [chartData]);

  if (loading) {
    return (
      <div className="h-full bg-white/40 backdrop-blur-sm p-8 relative overflow-hidden">
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="h-full bg-white/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 relative overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-xl animate-float-slow"></div>

      {/* Header */}
      <div
        className={`mb-6 sm:mb-8 transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-light text-neutral-900 tracking-wide animate-slide-in-left">
          SGPA Progression
        </h3>
      </div>

      {/* Chart Container */}
      <div
        className={`h-48 sm:h-56 md:h-64 lg:h-80 relative transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/20 to-transparent"></div>

        {/* Chart loading indicator */}
        {!isChartReady && chartData.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {chartData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-neutral-400 text-sm">
                No performance data available
              </div>
              <div className="text-neutral-300 text-xs">
                Complete some semesters to see your progress
              </div>
            </div>
          </div>
        )}

        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={animatedData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: window?.innerWidth < 640 ? 50 : 40,
              }}
            >
              <defs>
                <linearGradient id="sgpaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="semester"
                tick={{ fontSize: 10, fill: "#6B7280", fontWeight: 400 }}
                angle={-35}
                textAnchor="end"
                height={window?.innerWidth < 640 ? 70 : 60}
                interval={0}
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <YAxis
                domain={[0, 4]}
                tickCount={5}
                tick={{ fontSize: 10, fill: "#6B7280", fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                width={window?.innerWidth < 640 ? 25 : 35}
                className="text-xs"
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                  fontSize: "12px",
                  padding: "12px 16px",
                  backdropFilter: "blur(10px)",
                  animation: "tooltipFadeIn 0.2s ease-out",
                }}
                formatter={(value) => [
                  value?.toFixed ? value.toFixed(2) : value,
                  "SGPA",
                ]}
                labelStyle={{
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "4px",
                }}
                cursor={{
                  stroke: "#E5E7EB",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />

              <Area
                type="monotone"
                dataKey="sgpa"
                stroke="url(#lineGradient)"
                strokeWidth={window?.innerWidth < 640 ? 2 : 3}
                fill="url(#sgpaGradient)"
                dot={{
                  r: window?.innerWidth < 640 ? 3 : 5,
                  fill: "#3B82F6",
                  strokeWidth: 0,
                  className: "animate-pulse-dot",
                }}
                activeDot={{
                  r: window?.innerWidth < 640 ? 5 : 7,
                  fill: "#1D4ED8",
                  strokeWidth: 2,
                  stroke: "rgba(59, 130, 246, 0.3)",
                  style: {
                    filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))",
                    animation: "activeDotPulse 2s ease-in-out infinite",
                  },
                }}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-width {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5px, -5px);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulse-dot {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes activeDotPulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4));
          }
          50% {
            transform: scale(1.2);
            filter: drop-shadow(0 6px 12px rgba(59, 130, 246, 0.6));
          }
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animate-expand-width {
          animation: expand-width 0.8s ease-out both;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .animate-float-slow {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
