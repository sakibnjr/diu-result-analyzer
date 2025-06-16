export function ActiveFiltersSummary({
  hasActiveFilters,
  filters,
  showCoursesDirectly,
}) {
  if (!hasActiveFilters) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="text-sm font-medium text-blue-900 mb-2">
        Active Filters:
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {filters.selectedSemesters.length > 0 && (
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
            Semesters: {filters.selectedSemesters.length}
          </span>
        )}
        {showCoursesDirectly && filters.selectedCredits.length > 0 && (
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
            Credits: {filters.selectedCredits.join(", ")}
          </span>
        )}
        {!showCoursesDirectly &&
          ((filters.minCredits && filters.minCredits.trim() !== "") ||
            (filters.maxCredits && filters.maxCredits.trim() !== "")) && (
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
              Credits: {filters.minCredits || "0"}-{filters.maxCredits || "∞"}
            </span>
          )}
        {filters.selectedGrades.length > 0 && (
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
            Grades: {filters.selectedGrades.join(", ")}
          </span>
        )}
        {filters.courseName && filters.courseName.trim() !== "" && (
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
            Course: "{filters.courseName}"
          </span>
        )}
      </div>
    </div>
  );
}
