import { SemesterCardSkeleton } from "./Skeletons";
import { useState, useEffect } from "react";

export function SemesterResults({
  results,
  loading,
  expandedSemester,
  setExpandedSemester,
  getTotalCredits,
  getTotalCourses,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    // Set visibility and animations immediately based on loading state
    if (loading) {
      setIsVisible(false);
      setAnimatedCards([]);
      return;
    }

    // Start immediately when loading completes
    if (!loading) {
      setIsVisible(true);

      // Get all filtered results and animate them immediately
      const filteredResults = results.filter(
        (result) =>
          result.data &&
          result.data.status &&
          Array.isArray(result.data.data) &&
          result.data.data.length > 0
      );

      // Set all cards as animated immediately with a tiny delay for DOM readiness
      setTimeout(() => {
        const allCardIndexes = filteredResults.map((_, index) => index);
        setAnimatedCards(allCardIndexes);
      }, 50);
    }
  }, [loading, results]);

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SemesterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const filteredResults = results.filter(
    (result) =>
      result.data &&
      result.data.status &&
      Array.isArray(result.data.data) &&
      result.data.data.length > 0
  );

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-100/10 to-purple-100/10 rounded-full blur-3xl animate-float-gentle"></div>
      <div className="absolute top-1/2 -left-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-100/10 to-teal-100/10 rounded-full blur-2xl animate-float-gentle-reverse"></div>

      {/* Header Section */}
      <div
        className={`text-center transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-3 mb-3 animate-fade-in-up">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent flex-1 max-w-12 sm:max-w-16 animate-expand-horizontal"></div>
          <span className="text-xs sm:text-sm font-medium text-neutral-600 tracking-[0.2em] uppercase">
            Academic Records
          </span>
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent flex-1 max-w-12 sm:max-w-16 animate-expand-horizontal-reverse"></div>
        </div>
        <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-wide mb-2 animate-fade-in-up">
          Semester Performance
        </h3>
        <p className="text-sm text-neutral-500 font-light animate-fade-in-up px-4 sm:px-0">
          Select any semester to explore detailed course information
        </p>
      </div>

      {/* Semester Cards */}
      <div className="space-y-3 sm:space-y-4">
        {filteredResults.map((result, idx) => {
          const courses = result.data.data;
          const semesterCredits = getTotalCredits(courses);
          const semesterCourses = getTotalCourses(courses);
          const isExpanded = expandedSemester === result.semesterId;
          const isAnimated = animatedCards.includes(idx);

          return (
            <div
              key={result.semesterId}
              className={`group relative overflow-hidden bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl transition-all duration-500 ease-out cursor-pointer transform ${
                isExpanded
                  ? "bg-white/60 scale-[1.01]"
                  : "hover:bg-white/50 hover:scale-[1.005]"
              } ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              onClick={() =>
                setExpandedSemester(isExpanded ? null : result.semesterId)
              }
              style={{
                animation: isAnimated
                  ? "slideInFromBottom 0.6s ease-out both"
                  : "none",
              }}
            >
              {/* Animated hover gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-purple-50/0 opacity-0 transition-all duration-500 rounded-xl sm:rounded-2xl ${
                  isExpanded ? "opacity-100" : "group-hover:opacity-100"
                }`}
              ></div>

              {/* Animated border indicators */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-500/80 to-blue-400/0 transition-all duration-500 rounded-t-xl sm:rounded-t-2xl ${
                  isExpanded
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-60"
                }`}
              ></div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                {/* Main Content */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                  {/* Semester Title */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-lg sm:text-xl lg:text-2xl font-light text-neutral-900 tracking-wide group-hover:text-neutral-800 transition-colors duration-300">
                      {result.semester}
                    </div>
                    <div
                      className={`transition-all duration-500 ease-out ${
                        isExpanded
                          ? "rotate-90 text-blue-600"
                          : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Statistics with responsive grid */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
                    <div className="text-center lg:text-left group/stat">
                      <div className="text-xs font-medium text-neutral-500 tracking-[0.1em] uppercase mb-1 group-hover/stat:text-neutral-600 transition-colors duration-200">
                        SGPA Score
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-light text-neutral-900 tabular-nums group-hover/stat:text-blue-600 transition-all duration-300 transform group-hover/stat:scale-105">
                        {result.sgpa ? result.sgpa.toFixed(2) : "—"}
                      </div>
                    </div>

                    <div className="text-center lg:text-left group/stat">
                      <div className="text-xs font-medium text-neutral-500 tracking-[0.1em] uppercase mb-1 group-hover/stat:text-neutral-600 transition-colors duration-200">
                        Course Count
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-light text-neutral-900 tabular-nums group-hover/stat:text-emerald-600 transition-all duration-300 transform group-hover/stat:scale-105">
                        {semesterCourses}
                      </div>
                    </div>

                    <div className="text-center lg:text-left group/stat">
                      <div className="text-xs font-medium text-neutral-500 tracking-[0.1em] uppercase mb-1 group-hover/stat:text-neutral-600 transition-colors duration-200">
                        Credit Hours
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-light text-neutral-900 tabular-nums group-hover/stat:text-purple-600 transition-all duration-300 transform group-hover/stat:scale-105">
                        {semesterCredits}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Course Details with smooth animation */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-out ${
                  isExpanded
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="relative border-t border-neutral-200/50 bg-white/20 backdrop-blur-sm">
                  {/* Mobile: Card Layout */}
                  <div className="block lg:hidden p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {courses.map((course, i) => (
                      <div
                        key={i}
                        className="p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-[1.01] animate-slide-in-stagger"
                      >
                        <div className="font-medium text-sm sm:text-base text-neutral-900 mb-3 leading-relaxed group-hover:text-neutral-800 transition-colors duration-200">
                          {course.courseTitle}
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                          <div className="group/info">
                            <div className="text-xs font-medium text-neutral-500 tracking-wide uppercase mb-1 group-hover/info:text-neutral-600 transition-colors duration-200">
                              Credit
                            </div>
                            <div className="text-base sm:text-lg font-light text-neutral-900 tabular-nums">
                              {course.totalCredit}
                            </div>
                          </div>
                          <div className="group/info">
                            <div className="text-xs font-medium text-neutral-500 tracking-wide uppercase mb-1 group-hover/info:text-neutral-600 transition-colors duration-200">
                              Grade
                            </div>
                            <div className="text-base sm:text-lg font-medium text-blue-600 group-hover/info:text-blue-700 transition-colors duration-200">
                              {course.gradeLetter}
                            </div>
                          </div>
                          <div className="group/info">
                            <div className="text-xs font-medium text-neutral-500 tracking-wide uppercase mb-1 group-hover/info:text-neutral-600 transition-colors duration-200">
                              Point
                            </div>
                            <div className="text-base sm:text-lg font-light text-neutral-900 tabular-nums">
                              {course.pointEquivalent}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: Table Layout */}
                  <div className="hidden lg:block p-4 sm:p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-neutral-200/50">
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-[0.1em] animate-fade-in">
                              Course Title
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-neutral-500 uppercase tracking-[0.1em] animate-fade-in">
                              Credit Hours
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-neutral-500 uppercase tracking-[0.1em] animate-fade-in">
                              Grade
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-neutral-500 uppercase tracking-[0.1em] animate-fade-in">
                              Grade Point
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200/30">
                          {courses.map((course, i) => (
                            <tr
                              key={i}
                              className="group/row hover:bg-white/40 transition-all duration-300 animate-slide-in-stagger"
                            >
                              <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-neutral-900 group-hover/row:text-neutral-800 transition-colors duration-200">
                                {course.courseTitle}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center font-light text-neutral-900 tabular-nums">
                                {course.totalCredit}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center">
                                <span className="font-medium text-blue-600 group-hover/row:text-blue-700 transition-colors duration-200">
                                  {course.gradeLetter}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-center font-light text-neutral-900 tabular-nums">
                                {course.pointEquivalent}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Bottom Accent Line */}
              <div
                className={`h-px bg-gradient-to-r transition-all duration-500 ${
                  isExpanded
                    ? "from-blue-200/50 via-purple-200/50 to-blue-200/50 opacity-100"
                    : "from-transparent via-neutral-200/30 to-transparent opacity-60 group-hover:opacity-100 group-hover:from-blue-200/30 group-hover:via-neutral-200/50 group-hover:to-purple-200/30"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
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

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-stagger {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-gentle {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(8px, -8px) rotate(0.5deg);
          }
          66% {
            transform: translate(-6px, 6px) rotate(-0.3deg);
          }
        }

        @keyframes float-gentle-reverse {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-6px, 6px) rotate(-0.4deg);
          }
          66% {
            transform: translate(4px, -4px) rotate(0.2deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-expand-horizontal {
          animation: expand-horizontal 0.8s ease-out both;
        }

        .animate-expand-horizontal-reverse {
          animation: expand-horizontal-reverse 0.8s ease-out both;
          transform-origin: right;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out both;
        }

        .animate-slide-in-stagger {
          animation: slide-in-stagger 0.4s ease-out both;
        }

        .animate-float-gentle {
          animation: float-gentle 8s ease-in-out infinite;
        }

        .animate-float-gentle-reverse {
          animation: float-gentle-reverse 7s ease-in-out infinite;
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
