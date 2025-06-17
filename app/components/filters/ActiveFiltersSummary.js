export function ActiveFiltersSummary({
  hasActiveFilters,
  filters,
  showCoursesDirectly,
}) {
  if (!hasActiveFilters) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-3 sm:space-y-4">
        <span className="text-xs sm:text-sm font-semibold text-gray-900 tracking-tight uppercase">
          Active Filters
        </span>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {filters.selectedSemesters.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-lg">
              <span>Semesters: {filters.selectedSemesters.length}</span>
            </div>
          )}

          {showCoursesDirectly && filters.selectedCredits.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium rounded-lg">
              <span>Credits: {filters.selectedCredits.join(", ")}</span>
            </div>
          )}

          {!showCoursesDirectly &&
            ((filters.minCredits && filters.minCredits.trim() !== "") ||
              (filters.maxCredits && filters.maxCredits.trim() !== "")) && (
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium rounded-lg">
                <span>
                  Credits: {filters.minCredits || "0"}-
                  {filters.maxCredits || "∞"}
                </span>
              </div>
            )}

          {filters.selectedGrades.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-50 text-purple-700 text-xs sm:text-sm font-medium rounded-lg">
              <span>Grades: {filters.selectedGrades.join(", ")}</span>
            </div>
          )}

          {filters.courseName && filters.courseName.trim() !== "" && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-medium rounded-lg">
              <span>Search: "{filters.courseName}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
