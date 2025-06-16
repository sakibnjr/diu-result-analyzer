import {
  FilterHeader,
  SemesterFilter,
  CreditFilter,
  GradeFilter,
  CourseSearchFilter,
  ActiveFiltersSummary,
  WhatIfCalculator,
  CourseResultsDisplay,
  useFilterLogic,
} from "./filters";

export function ResultFilter({
  results,
  onFilterChange,
  getTotalCredits: propGetTotalCredits,
  getTotalCourses: propGetTotalCourses,
  showCoursesDirectly = false,
  standalone = false,
}) {
  const {
    filters,
    filteredCourses,
    availableSemesters,
    availableGrades,
    availableCredits,
    hasActiveFilters,
    whatIfAnalysis,
    whatIfGradePoint,
    setWhatIfGradePoint,
    handleFilterChange,
    handleSemesterToggle,
    handleGradeToggle,
    handleCreditToggle,
    clearAllFilters,
  } = useFilterLogic(
    results,
    onFilterChange,
    propGetTotalCredits,
    propGetTotalCourses,
    showCoursesDirectly
  );

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 space-y-6">
        {/* Header */}
        <FilterHeader
          showCoursesDirectly={showCoursesDirectly}
          hasActiveFilters={hasActiveFilters}
          onClearAllFilters={clearAllFilters}
        />

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Semester Filter */}
          <SemesterFilter
            availableSemesters={availableSemesters}
            selectedSemesters={filters.selectedSemesters}
            onSemesterToggle={handleSemesterToggle}
          />

          {/* Credits Filter */}
          <CreditFilter
            showCoursesDirectly={showCoursesDirectly}
            availableCredits={availableCredits}
            selectedCredits={filters.selectedCredits}
            minCredits={filters.minCredits}
            maxCredits={filters.maxCredits}
            onCreditToggle={handleCreditToggle}
            onFilterChange={handleFilterChange}
          />

          {/* Grade Letters Filter */}
          <GradeFilter
            availableGrades={availableGrades}
            selectedGrades={filters.selectedGrades}
            onGradeToggle={handleGradeToggle}
          />

          {/* Course Name Filter */}
          <CourseSearchFilter
            courseName={filters.courseName}
            onFilterChange={handleFilterChange}
          />

          {/* Active Filters Summary */}
          <div className="md:col-span-2 lg:col-span-3">
            <ActiveFiltersSummary
              hasActiveFilters={hasActiveFilters}
              filters={filters}
              showCoursesDirectly={showCoursesDirectly}
            />
          </div>
        </div>
      </div>

      {/* Results Display for Standalone Mode */}
      {showCoursesDirectly && (
        <>
          {/* What-if CGPA Calculator */}
          <WhatIfCalculator
            whatIfAnalysis={whatIfAnalysis}
            whatIfGradePoint={whatIfGradePoint}
            setWhatIfGradePoint={setWhatIfGradePoint}
          />

          {/* Course Results */}
          <CourseResultsDisplay
            filteredCourses={filteredCourses}
            hasActiveFilters={hasActiveFilters}
          />
        </>
      )}
    </div>
  );
}
