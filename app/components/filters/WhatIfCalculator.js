export function WhatIfCalculator({
  whatIfAnalysis,
  whatIfGradePoint,
  setWhatIfGradePoint,
}) {
  if (!whatIfAnalysis) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        What-if CGPA Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-100 mb-2">
              Hypothetical Grade Point for Selected Courses
            </label>
            <select
              value={whatIfGradePoint}
              onChange={(e) => setWhatIfGradePoint(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
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
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-purple-100">Current Overall CGPA:</span>
              <span className="text-xl font-bold">
                {whatIfAnalysis.currentOverallCGPA.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-purple-100">Projected Overall CGPA:</span>
              <span className="text-xl font-bold text-yellow-300">
                {whatIfAnalysis.whatIfOverallCGPA.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-purple-400 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-100">CGPA Change (%):</span>
                <span
                  className={`text-lg font-bold ${
                    whatIfAnalysis.cgpaPercentageChange >= 0
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {whatIfAnalysis.cgpaPercentageChange >= 0 ? "+" : ""}
                  {whatIfAnalysis.cgpaPercentageChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-purple-100 bg-white/10 rounded-lg p-3">
        💡 <strong>Tip:</strong> This shows how your overall CGPA would change
        if you improved the selected courses to the chosen grade point. Great
        for setting study goals and understanding the impact of retaking
        courses!
      </div>
    </div>
  );
}
