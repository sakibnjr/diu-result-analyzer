import { InfoCardSkeleton } from "./Skeletons";
import { useState, useEffect } from "react";

export function StudentInfoCard({ studentInfo, loading }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility immediately based on loading state and data availability
    setIsVisible(!loading && !!studentInfo);
  }, [loading, studentInfo]);

  if (loading) {
    return <InfoCardSkeleton />;
  }

  if (!studentInfo) {
    return null;
  }

  return (
    <div className="h-full p-4 sm:p-6 lg:p-8 bg-white/40 backdrop-blur-sm relative overflow-hidden group cursor-default">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-float-soft"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-float-soft-reverse"></div>

      {/* Header Section */}
      <div
        className={`flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8 transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="relative animate-slide-in-scale">
          {/* Avatar with hover effects */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-light text-neutral-700 relative overflow-hidden group/avatar transition-all duration-500 hover:scale-110 cursor-pointer rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 transition-opacity duration-300 group-hover/avatar:opacity-100"></div>

            {/* Animated ring on hover */}
            <div className="absolute inset-0 border-2 border-blue-400/0 group-hover/avatar:border-blue-400/40 transition-all duration-300 scale-110 rounded-xl"></div>

            <span className="relative transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:text-neutral-800">
              {studentInfo.name?.split(" ")[0]?.[0] || "S"}
            </span>

            {/* Pulse effect */}
            <div className="absolute inset-0 bg-blue-400/20 scale-0 group-hover/avatar:scale-110 opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 blur-sm rounded-xl"></div>
          </div>

          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse-gentle"></div>
        </div>

        <div className="flex-1 min-w-0 animate-slide-in-right">
          <div className="text-lg sm:text-xl lg:text-xl font-light text-neutral-900 mb-1 group-hover:text-neutral-800 transition-colors duration-300 animate-fade-in-up leading-tight">
            {studentInfo.name}
          </div>
          <div className="text-xs sm:text-sm text-neutral-500 font-mono tracking-wide animate-fade-in-up">
            {studentInfo.id}
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="space-y-4 sm:space-y-6">
        <div className="group/info animate-slide-in-up">
          <div className="text-xs font-medium text-neutral-500 tracking-[0.1em] uppercase mb-2 group-hover/info:text-neutral-600 transition-colors duration-200">
            Academic Batch
          </div>
          <div className="text-base sm:text-lg font-light text-neutral-900 tracking-wide group-hover/info:text-neutral-800 transition-all duration-200 transform group-hover/info:translate-x-1">
            {studentInfo.batch}
          </div>
          <div className="h-px bg-neutral-200/50 mt-3 transition-all duration-300 group-hover/info:bg-blue-300/60 group-hover/info:scale-x-105 origin-left"></div>
        </div>

        <div className="group/info animate-slide-in-up">
          <div className="text-xs font-medium text-neutral-500 tracking-[0.1em] uppercase mb-2 group-hover/info:text-neutral-600 transition-colors duration-200">
            Study Program
          </div>
          <div className="text-base sm:text-lg font-light text-neutral-900 tracking-wide group-hover/info:text-neutral-800 transition-all duration-200 transform group-hover/info:translate-x-1">
            {studentInfo.program}
          </div>
          <div className="h-px bg-neutral-200/50 mt-3 transition-all duration-300 group-hover/info:bg-purple-300/60 group-hover/info:scale-x-105 origin-left"></div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 animate-fade-in">
        <div className="h-px bg-gradient-to-r from-blue-200/30 via-neutral-200/50 to-purple-200/30 transition-all duration-500 group-hover:from-blue-400/50 group-hover:via-neutral-300/70 group-hover:to-purple-400/50"></div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700 pointer-events-none"></div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes slide-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }

        @keyframes float-soft {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(5px, -5px) rotate(0.5deg);
          }
          66% {
            transform: translate(-3px, 3px) rotate(-0.3deg);
          }
        }

        @keyframes float-soft-reverse {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-4px, 4px) rotate(-0.4deg);
          }
          66% {
            transform: translate(3px, -3px) rotate(0.2deg);
          }
        }

        .animate-slide-in-scale {
          animation: slide-in-scale 0.6s ease-out both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out both;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .animate-float-soft {
          animation: float-soft 4s ease-in-out infinite;
        }

        .animate-float-soft-reverse {
          animation: float-soft-reverse 3.5s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .animate-float-soft,
          .animate-float-soft-reverse {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
