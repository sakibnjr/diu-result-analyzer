export function SemesterFilter({
  availableSemesters,
  selectedSemesters,
  onSemesterToggle,
}) {
  return (
    <div className="space-y-3 sm:space-y-5">
      <label className="text-xs sm:text-sm font-semibold text-gray-900 tracking-tight uppercase">
        Semesters
      </label>

      <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-48 overflow-y-auto">
        {availableSemesters.map((semester) => (
          <label
            key={semester}
            className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 ease-out"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedSemesters.includes(semester)}
                onChange={() => onSemesterToggle(semester)}
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 rounded-md transition-colors"
              />

              {/* Custom checkbox indicator */}
              {selectedSemesters.includes(semester) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
              {semester}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
