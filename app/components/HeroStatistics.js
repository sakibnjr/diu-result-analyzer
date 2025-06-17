import { StatisticsSkeleton } from "./Skeletons";
import { useState, useEffect } from "react";

export function HeroStatistics({
  overallCGPA,
  totalSemesters,
  totalCredits,
  totalCourses,
  loading,
}) {
  const [animatedCGPA, setAnimatedCGPA] = useState(0);
  const [animatedSemesters, setAnimatedSemesters] = useState(0);
  const [animatedCredits, setAnimatedCredits] = useState(0);
  const [animatedCourses, setAnimatedCourses] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Number animation function
  const animateNumber = (targetValue, setter, duration = 1500, delay = 0) => {
    if (!targetValue || targetValue === 0) return;

    setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue =
          startValue + (targetValue - startValue) * easeOutCubic;

        setter(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setter(targetValue);
        }
      };

      requestAnimationFrame(animate);
    }, delay);
  };

  // Trigger animations when component becomes visible
  useEffect(() => {
    // Set visibility and start animations immediately based on loading state
    if (loading) {
      setAnimatedCGPA(0);
      setAnimatedSemesters(0);
      setAnimatedCredits(0);
      setAnimatedCourses(0);
      setIsVisible(false);
      return;
    }

    // Start immediately when loading completes and we have data
    if (!loading && overallCGPA) {
      setIsVisible(true);
      // Start all number animations immediately
      setTimeout(() => {
        animateNumber(overallCGPA, setAnimatedCGPA, 2000, 0);
        animateNumber(totalSemesters, setAnimatedSemesters, 1200, 0);
        animateNumber(totalCredits, setAnimatedCredits, 1500, 0);
        animateNumber(totalCourses, setAnimatedCourses, 1300, 0);
      }, 50); // Tiny delay to ensure DOM is ready
    }
  }, [loading, overallCGPA, totalSemesters, totalCredits, totalCourses]);

  if (loading) {
    return <StatisticsSkeleton />;
  }

  return (
    <div className="relative p-8 sm:p-12 md:p-16 bg-neutral-50/40 border-t border-neutral-200/50 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.neutral.300)_1px,transparent_0)] [background-size:20px_20px] opacity-20 animate-pulse-slow"></div>

      {/* Floating elements */}
      <div className="absolute top-10 right-16 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl animate-float-gentle"></div>
      <div className="absolute bottom-10 left-16 w-24 h-24 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-2xl animate-float-gentle-reverse"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main CGPA Section */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-4 animate-fade-in-up">
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent flex-1 animate-expand-horizontal"></div>
            <span className="text-sm font-medium text-neutral-600 tracking-[0.2em] uppercase animate-fade-in">
              Academic Performance
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent flex-1 animate-expand-horizontal-reverse"></div>
          </div>

          <div className="space-y-2">
            <div className="text-neutral-600 text-sm font-medium tracking-wide animate-fade-in-up">
              Overall CGPA
            </div>
            <div className="text-6xl sm:text-7xl md:text-8xl font-light text-neutral-900 tracking-tight tabular-nums relative group cursor-default">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span className="relative animate-number-reveal">
                {animatedCGPA ? animatedCGPA.toFixed(2) : "—"}
              </span>

              {/* Pulse indicator for good grades */}
              {overallCGPA >= 3.5 && (
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center group transform transition-all duration-700 ease-out animate-slide-in-from-left">
            <div className="relative p-6 sm:p-8 bg-white/60 hover:bg-white/80 transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 h-px top-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900 tabular-nums mb-2 animate-number-count">
                  {Math.round(animatedSemesters)}
                </div>
                <div className="text-sm font-medium text-neutral-600 tracking-wide">
                  Semesters Completed
                </div>
              </div>
            </div>
          </div>

          <div className="text-center group transform transition-all duration-700 ease-out animate-slide-in-from-bottom">
            <div className="relative p-6 sm:p-8 bg-white/60 hover:bg-white/80 transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0 h-px top-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900 tabular-nums mb-2 animate-number-count">
                  {Math.round(animatedCredits)}
                </div>
                <div className="text-sm font-medium text-neutral-600 tracking-wide">
                  Credit Hours Earned
                </div>
              </div>
            </div>
          </div>

          <div className="text-center group transform transition-all duration-700 ease-out animate-slide-in-from-right">
            <div className="relative p-6 sm:p-8 bg-white/60 hover:bg-white/80 transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/40 to-purple-400/0 h-px top-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900 tabular-nums mb-2 animate-number-count">
                  {Math.round(animatedCourses)}
                </div>
                <div className="text-sm font-medium text-neutral-600 tracking-wide">
                  Courses Taken
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.1;
          }
        }

        @keyframes float-gentle {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(10px, -10px) rotate(1deg);
          }
          66% {
            transform: translate(-5px, 5px) rotate(-0.5deg);
          }
        }

        @keyframes float-gentle-reverse {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-8px, 8px) rotate(-1deg);
          }
          66% {
            transform: translate(6px, -6px) rotate(0.5deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        @keyframes expand-horizontal {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes expand-horizontal-reverse {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes number-reveal {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-from-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-from-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .animate-float-gentle-reverse {
          animation: float-gentle-reverse 5s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-expand-horizontal {
          animation: expand-horizontal 1s ease-out both;
        }

        .animate-expand-horizontal-reverse {
          animation: expand-horizontal-reverse 1s ease-out both;
          transform-origin: right;
        }

        .animate-number-reveal {
          animation: number-reveal 1s ease-out both;
        }

        .animate-slide-in-from-left {
          animation: slide-in-from-left 0.8s ease-out both;
        }

        .animate-slide-in-from-right {
          animation: slide-in-from-right 0.8s ease-out both;
        }

        .animate-slide-in-from-bottom {
          animation: slide-in-from-bottom 0.8s ease-out both;
        }

        @media (max-width: 640px) {
          .animate-float-gentle,
          .animate-float-gentle-reverse {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
