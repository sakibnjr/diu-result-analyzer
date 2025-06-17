export function WhatIfCalculator({
  whatIfAnalysis,
  whatIfGradePoint,
  setWhatIfGradePoint,
}) {
  if (!whatIfAnalysis) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Input Section */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight mb-2 sm:mb-3 block">
                Select Grade Point
              </label>

              <div className="relative">
                <select
                  value={whatIfGradePoint}
                  onChange={(e) => setWhatIfGradePoint(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white border-2 border-green-200 rounded-lg sm:rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none cursor-pointer transition-all duration-200 shadow-sm"
                >
                  <option value="4.0">A+ (4.0)</option>
                  <option value="3.75">A (3.75)</option>
                  <option value="3.5">A- (3.5)</option>
                  <option value="3.25">B+ (3.25)</option>
                  <option value="3.0">B (3.0)</option>
                  <option value="2.75">B- (2.75)</option>
                  <option value="2.5">C+ (2.5)</option>
                  <option value="2.25">C (2.25)</option>
                  <option value="2.0">D (2.0)</option>
                  <option value="0.0">F (0.0)</option>
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Analysis - Focused on percentage change */}
          <div className="space-y-3 sm:space-y-4">
            <label className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight block">
              📊 CGPA Impact
            </label>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100 shadow-sm">
              <div className="text-center py-2 sm:py-3">
                <div className="text-xs font-medium text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">
                  Expected Change
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`text-xl sm:text-2xl font-bold tabular-nums ${
                      whatIfAnalysis.cgpaPercentageChange >= 0
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {whatIfAnalysis.cgpaPercentageChange >= 0 ? "+" : ""}
                    {whatIfAnalysis.cgpaPercentageChange.toFixed(2)}%
                  </span>
                  {whatIfAnalysis.cgpaPercentageChange >= 0 ? (
                    <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-full">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="p-1 sm:p-1.5 bg-red-100 rounded-full">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586l5.293-5.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
