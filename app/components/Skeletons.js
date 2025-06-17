import React from "react";

// Shimmer animation component
const Shimmer = ({ className }) => (
  <div
    className={`bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] animate-shimmer ${className}`}
  />
);

export function StatisticsSkeleton() {
  return (
    <div className="relative p-8 sm:p-12 md:p-16 bg-neutral-50/40 border-t border-neutral-200/50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.neutral.300)_1px,transparent_0)] [background-size:20px_20px] opacity-10"></div>
      <div className="absolute top-10 right-16 w-32 h-32 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-16 w-24 h-24 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 rounded-full blur-2xl"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shimmer className="h-px flex-1 rounded-full" />
            <Shimmer className="h-4 w-40 rounded-full" />
            <Shimmer className="h-px flex-1 rounded-full" />
          </div>
          <div className="space-y-3">
            <Shimmer className="h-4 w-28 rounded-full mx-auto" />
            <Shimmer className="h-20 sm:h-24 md:h-28 w-56 sm:w-64 md:w-72 rounded-2xl mx-auto" />
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center group">
              <div className="relative p-6 sm:p-8 bg-white/60 rounded-xl shadow-sm border border-white/20">
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/30 to-blue-100/0 rounded-xl opacity-50"></div>

                <div className="relative space-y-3">
                  <Shimmer className="h-10 sm:h-12 w-24 sm:w-28 rounded-lg mx-auto" />
                  <Shimmer className="h-4 w-32 sm:w-36 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export function InfoCardSkeleton() {
  return (
    <div className="h-full p-8 bg-white/40 backdrop-blur-sm relative overflow-hidden rounded-xl border border-white/20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 rounded-full blur-xl"></div>

      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative">
          <Shimmer className="h-16 w-16 rounded-full" />
          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neutral-200 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <Shimmer className="h-6 w-36 rounded-full" />
          <Shimmer className="h-4 w-28 rounded-full" />
        </div>
      </div>

      {/* Information Grid */}
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <Shimmer className="h-3 w-24 rounded-full" />
            <Shimmer className="h-5 w-32 rounded-full" />
            <div className="h-px bg-neutral-200/50 mt-3 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Bottom Accent */}
      <div className="mt-8 pt-6">
        <div className="h-px bg-gradient-to-r from-neutral-200/30 via-neutral-200/50 to-neutral-200/30 rounded-full"></div>
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="h-full bg-white/40 backdrop-blur-sm p-8 relative overflow-hidden group">
      {/* Animated background elements - matching PerformanceChart */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-50"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-xl animate-float-slow"></div>

      {/* Header - matching PerformanceChart structure */}
      <div className="mb-8 transform transition-all duration-700 ease-out">
        <Shimmer className="h-6 w-40 rounded-full" />
      </div>

      {/* Chart Container - matching PerformanceChart dimensions */}
      <div className="h-64 lg:h-80 relative transform transition-all duration-700 ease-out">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/20 to-transparent"></div>

        {/* Chart loading indicator - matching PerformanceChart style */}
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

        {/* Simulated chart area with AreaChart structure */}
        <div className="relative h-full opacity-30">
          {/* Y-axis simulation - matching YAxis width={35} */}
          <div className="absolute left-0 top-5 bottom-10 w-9 flex flex-col justify-between">
            {[4, 3, 2, 1, 0].map((i) => (
              <Shimmer key={i} className="h-3 w-6 rounded-full" />
            ))}
          </div>

          {/* Chart area simulation - matching margins */}
          <div className="absolute left-9 right-5 top-5 bottom-10 flex items-end justify-between gap-3">
            {/* Simulated area chart with gradient */}
            <div className="relative w-full h-full">
              {/* Simulated area fill */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-blue-50/10 rounded-t-lg"></div>

              {/* Simulated data points */}
              <div className="absolute inset-0 flex items-end justify-between px-4">
                {[65, 75, 60, 85, 70, 80].map((height, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      style={{ marginBottom: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Simulated line stroke */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M10,35 Q25,25 35,40 Q50,15 60,30 Q75,20 85,25"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* X-axis labels simulation - matching bottom margin and angle */}
          <div className="absolute left-9 right-5 bottom-0 h-10 flex justify-between items-start">
            {[
              "Fall 2021",
              "Spring 2022",
              "Fall 2022",
              "Spring 2023",
              "Fall 2023",
              "Spring 2024",
            ].map((semester, i) => (
              <div key={i} className="transform -rotate-35 origin-top-left">
                <Shimmer className="h-3 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations matching PerformanceChart */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export function SemesterCardSkeleton() {
  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/0 via-neutral-50/30 to-neutral-50/0 opacity-50"></div>

      {/* Content */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Semester Title */}
          <div className="flex items-center gap-4">
            <Shimmer className="h-7 w-40 rounded-full" />
            <div className="w-4 h-4 bg-neutral-200 rounded-full"></div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center lg:text-left space-y-2">
                <Shimmer className="h-3 w-16 rounded-full mx-auto lg:mx-0" />
                <Shimmer className="h-8 w-12 rounded-lg mx-auto lg:mx-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200/30 to-transparent"></div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
