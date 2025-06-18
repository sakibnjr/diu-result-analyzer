import React from "react";

// Enhanced Shimmer animation component with better gradient
const Shimmer = ({ className }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-[length:200%_100%] animate-shimmer ${className}`}
  />
);

// Floating element component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <div
    className="animate-float"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

export function StatisticsSkeleton() {
  return (
    <div className="relative p-8 sm:p-12 md:p-16 bg-neutral-50/40 border-t border-neutral-200/50 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.neutral.300)_1px,transparent_0)] [background-size:20px_20px] opacity-10 animate-grid-drift"></div>

      <FloatingElement delay={0} duration={4}>
        <div className="absolute top-10 right-16 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl"></div>
      </FloatingElement>

      <FloatingElement delay={2} duration={5}>
        <div className="absolute bottom-10 left-16 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-2xl"></div>
      </FloatingElement>

      <FloatingElement delay={1} duration={6}>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-xl"></div>
      </FloatingElement>

      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-3 mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Shimmer className="h-px flex-1 rounded-full" />
            <Shimmer className="h-4 w-40 rounded-full" />
            <Shimmer className="h-px flex-1 rounded-full" />
          </div>
          <div
            className="space-y-3 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Shimmer className="h-4 w-28 rounded-full mx-auto" />
            <div className="relative mx-auto w-56 sm:w-64 md:w-72">
              <Shimmer className="h-20 sm:h-24 md:h-28 w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sweep rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${0.6 + i * 0.2}s` }}
            >
              <div className="relative p-6 sm:p-8 bg-white/60 rounded-xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1">
                {/* Enhanced animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/50 to-blue-100/0 rounded-xl opacity-0 animate-border-glow"></div>

                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-blue-300/60 rounded-full animate-particle-1"></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-300/60 rounded-full animate-particle-2"></div>

                <div className="relative space-y-3">
                  <div className="relative">
                    <Shimmer className="h-10 sm:h-12 w-24 sm:w-28 rounded-lg mx-auto" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep-slow rounded-lg"></div>
                  </div>
                  <Shimmer className="h-4 w-32 sm:w-36 rounded-full mx-auto" />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(10px, -10px) rotate(1deg);
          }
          66% {
            transform: translate(-5px, 5px) rotate(-1deg);
          }
        }

        @keyframes grid-drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(2px, 2px);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes sweep-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes border-glow {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes particle-1 {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes particle-2 {
          0%,
          100% {
            transform: translateX(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateX(8px) scale(1.1);
            opacity: 0.8;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-grid-drift {
          animation: grid-drift 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-sweep {
          animation: sweep 3s ease-in-out infinite;
        }

        .animate-sweep-slow {
          animation: sweep-slow 4s ease-in-out infinite;
        }

        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }

        .animate-particle-1 {
          animation: particle-1 2s ease-in-out infinite;
        }

        .animate-particle-2 {
          animation: particle-2 2.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}

export function InfoCardSkeleton() {
  return (
    <div className="h-full p-8 bg-white/40 backdrop-blur-sm relative overflow-hidden rounded-xl border border-white/20 group hover:bg-white/50 transition-all duration-500">
      {/* Enhanced background elements */}
      <FloatingElement delay={0} duration={4}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-2xl"></div>
      </FloatingElement>

      <FloatingElement delay={2} duration={5}>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-xl"></div>
      </FloatingElement>

      {/* Animated particles */}
      <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400/60 rounded-full animate-particle-float-1"></div>
      <div className="absolute bottom-8 right-12 w-1 h-1 bg-purple-400/60 rounded-full animate-particle-float-2"></div>
      <div className="absolute top-12 left-8 w-1 h-1 bg-green-400/60 rounded-full animate-particle-float-3"></div>

      {/* Enhanced Header Section */}
      <div className="flex items-start gap-6 mb-8 animate-fade-in-left">
        <div className="relative">
          <div className="relative">
            <Shimmer className="h-16 w-16 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sweep-circle rounded-full"></div>
          </div>
          {/* Enhanced status indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-300 rounded-full border-2 border-white animate-pulse-glow"></div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="relative">
            <Shimmer className="h-6 w-36 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep rounded-full"></div>
          </div>
          <Shimmer className="h-4 w-28 rounded-full" />
        </div>
      </div>

      {/* Enhanced Information Grid */}
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="space-y-3 animate-fade-in-up"
            style={{ animationDelay: `${0.3 + i * 0.2}s` }}
          >
            <Shimmer className="h-3 w-24 rounded-full" />
            <div className="relative">
              <Shimmer className="h-5 w-32 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sweep-delayed rounded-full"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-neutral-200/0 via-neutral-200/50 to-neutral-200/0 rounded-full animate-line-grow"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Bottom Accent */}
      <div className="mt-8 pt-6">
        <div className="h-px bg-gradient-to-r from-neutral-200/0 via-neutral-300/60 to-neutral-200/0 rounded-full animate-glow-line"></div>
      </div>

      {/* Advanced Animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes sweep-circle {
          0% {
            transform: rotate(0deg);
            background-position: -200% 0;
          }
          100% {
            transform: rotate(360deg);
            background-position: 200% 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
            transform: scale(1.05);
          }
        }

        @keyframes sweep-delayed {
          0%,
          20% {
            transform: translateX(-100%);
          }
          80%,
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes line-grow {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes glow-line {
          0%,
          100% {
            opacity: 0.3;
            filter: blur(0px);
          }
          50% {
            opacity: 0.8;
            filter: blur(1px);
          }
        }

        @keyframes particle-float-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(5px, -5px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-3px, -8px) scale(0.8);
            opacity: 0.6;
          }
          75% {
            transform: translate(3px, -3px) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes particle-float-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(-4px, 6px) scale(1.3);
            opacity: 0.9;
          }
          66% {
            transform: translate(6px, -4px) scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes particle-float-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(8px, 8px) scale(1.4);
            opacity: 1;
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-sweep-circle {
          animation: sweep-circle 3s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-sweep-delayed {
          animation: sweep-delayed 4s ease-in-out infinite;
        }

        .animate-line-grow {
          animation: line-grow 1.5s ease-out;
        }

        .animate-glow-line {
          animation: glow-line 2s ease-in-out infinite;
        }

        .animate-particle-float-1 {
          animation: particle-float-1 3s ease-in-out infinite;
        }

        .animate-particle-float-2 {
          animation: particle-float-2 4s ease-in-out infinite 1s;
        }

        .animate-particle-float-3 {
          animation: particle-float-3 2.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="h-full bg-white/40 backdrop-blur-sm p-8 relative overflow-hidden group hover:bg-white/50 transition-all duration-700">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-60 animate-gradient-shift"></div>

      <FloatingElement delay={0} duration={5}>
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-xl"></div>
      </FloatingElement>

      <FloatingElement delay={2} duration={4}>
        <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-lg"></div>
      </FloatingElement>

      {/* Animated particles */}
      <div className="absolute top-8 left-12 w-1 h-1 bg-blue-400/70 rounded-full animate-chart-particle-1"></div>
      <div className="absolute top-16 right-20 w-1 h-1 bg-purple-400/70 rounded-full animate-chart-particle-2"></div>
      <div className="absolute bottom-20 left-16 w-1 h-1 bg-green-400/70 rounded-full animate-chart-particle-3"></div>

      {/* Enhanced Header */}
      <div className="mb-8 transform transition-all duration-700 ease-out animate-fade-in-up">
        <div className="relative">
          <Shimmer className="h-6 w-40 rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sweep rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Chart Container */}
      <div
        className="h-64 lg:h-80 relative transform transition-all duration-700 ease-out animate-scale-in"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/30 to-transparent rounded-lg"></div>

        {/* Enhanced chart loading indicator */}
        <div
          className="absolute inset-0 flex items-center justify-center animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-bounce-enhanced"></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full animate-bounce-enhanced"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-bounce-enhanced"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Enhanced simulated chart area */}
        <div
          className="relative h-full opacity-40 animate-chart-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          {/* Enhanced Y-axis simulation */}
          <div className="absolute left-0 top-5 bottom-10 w-9 flex flex-col justify-between">
            {[4, 3, 2, 1, 0].map((i) => (
              <div key={i} className="relative">
                <Shimmer className="h-3 w-6 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep-delayed rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Enhanced Chart area simulation */}
          <div className="absolute left-9 right-5 top-5 bottom-10 flex items-end justify-between gap-3">
            <div className="relative w-full h-full">
              {/* Enhanced area fill with animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-200/40 via-indigo-100/30 to-blue-50/20 rounded-t-lg animate-area-fill"></div>

              {/* Enhanced data points with staggered animation */}
              <div className="absolute inset-0 flex items-end justify-between px-4">
                {[65, 75, 60, 85, 70, 80].map((height, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg animate-data-point"
                      style={{
                        marginBottom: `${height}%`,
                        animationDelay: `${0.9 + i * 0.1}s`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Enhanced animated line stroke */}
              <svg
                className="absolute inset-0 w-full h-full animate-line-draw"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ animationDelay: "1.2s" }}
              >
                <path
                  d="M10,35 Q25,25 35,40 Q50,15 60,30 Q75,20 85,25"
                  stroke="url(#enhancedLineGradient)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.8"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="animate-stroke-draw"
                />
                <defs>
                  <linearGradient
                    id="enhancedLineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="25%" stopColor="#3B82F6" />
                    <stop offset="75%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Enhanced X-axis labels with staggered animation */}
          <div className="absolute left-9 right-5 bottom-0 h-10 flex justify-between items-start">
            {[
              "Fall 2021",
              "Spring 2022",
              "Fall 2022",
              "Spring 2023",
              "Fall 2023",
              "Spring 2024",
            ].map((semester, i) => (
              <div
                key={i}
                className="transform -rotate-35 origin-top-left animate-fade-in-up"
                style={{ animationDelay: `${1.5 + i * 0.1}s` }}
              >
                <Shimmer className="h-3 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-enhanced {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0) scale(1);
          }
          40% {
            transform: translateY(-12px) scale(1.1);
          }
          70% {
            transform: translateY(-6px) scale(1.05);
          }
        }

        @keyframes chart-fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
        }

        @keyframes area-fill {
          0% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }

        @keyframes data-point {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes line-draw {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes stroke-draw {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes chart-particle-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(8px, -12px) scale(1.4);
            opacity: 0.9;
          }
          50% {
            transform: translate(-6px, -20px) scale(0.8);
            opacity: 0.5;
          }
          75% {
            transform: translate(12px, -8px) scale(1.2);
            opacity: 0.7;
          }
        }

        @keyframes chart-particle-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          33% {
            transform: translate(-10px, 15px) scale(1.3);
            opacity: 1;
          }
          66% {
            transform: translate(8px, -10px) scale(0.9);
            opacity: 0.6;
          }
        }

        @keyframes chart-particle-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(15px, -15px) scale(1.5);
            opacity: 1;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 6s ease-in-out infinite;
          background-size: 200% 200%;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-enhanced {
          animation: bounce-enhanced 1.5s ease-in-out infinite;
        }

        .animate-chart-fade-in {
          animation: chart-fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animate-area-fill {
          animation: area-fill 2s ease-out forwards;
        }

        .animate-data-point {
          animation: data-point 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-line-draw {
          animation: line-draw 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-stroke-draw {
          animation: stroke-draw 2s ease-out forwards;
        }

        .animate-chart-particle-1 {
          animation: chart-particle-1 4s ease-in-out infinite;
        }

        .animate-chart-particle-2 {
          animation: chart-particle-2 3.5s ease-in-out infinite 1s;
        }

        .animate-chart-particle-3 {
          animation: chart-particle-3 3s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}

export function SemesterCardSkeleton() {
  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/20 relative overflow-hidden group hover:bg-white/50 hover:shadow-lg transition-all duration-500">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/0 via-neutral-50/40 to-neutral-50/0 opacity-60 animate-background-sweep"></div>

      {/* Floating elements */}
      <FloatingElement delay={0} duration={4}>
        <div className="absolute top-2 right-4 w-8 h-8 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-sm"></div>
      </FloatingElement>

      <FloatingElement delay={1.5} duration={5}>
        <div className="absolute bottom-3 left-6 w-6 h-6 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-sm"></div>
      </FloatingElement>

      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100/20 to-transparent animate-corner-glow"></div>

      {/* Content */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Enhanced Semester Title */}
          <div className="flex items-center gap-4 animate-fade-in-right">
            <div className="relative">
              <Shimmer className="h-7 w-40 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sweep rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full animate-status-pulse"></div>
          </div>

          {/* Enhanced Statistics Grid */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="text-center lg:text-left space-y-2 animate-fade-in-up group/stat"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="relative">
                  <Shimmer className="h-3 w-16 rounded-full mx-auto lg:mx-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sweep-delayed rounded-full"></div>
                </div>
                <div className="relative transform group-hover/stat:scale-105 transition-transform duration-300">
                  <Shimmer className="h-8 w-12 rounded-lg mx-auto lg:mx-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep-slow rounded-lg"></div>
                  {/* Micro interaction sparkle */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300/60 rounded-full animate-sparkle opacity-0 group-hover/stat:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent animate-accent-line"></div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes background-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes corner-glow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(-15px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes status-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes accent-line {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
            transform: scaleX(1);
          }
        }

        .animate-background-sweep {
          animation: background-sweep 4s ease-in-out infinite;
        }

        .animate-corner-glow {
          animation: corner-glow 3s ease-in-out infinite;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-status-pulse {
          animation: status-pulse 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 0.6s ease-out;
        }

        .animate-accent-line {
          animation: accent-line 2s ease-out;
        }
      `}</style>
    </div>
  );
}
