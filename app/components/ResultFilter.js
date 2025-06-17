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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
        <FilterHeader
          showCoursesDirectly={showCoursesDirectly}
          hasActiveFilters={hasActiveFilters}
          onClearAllFilters={clearAllFilters}
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Semester Filter */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <SemesterFilter
            availableSemesters={availableSemesters}
            selectedSemesters={filters.selectedSemesters}
            onSemesterToggle={handleSemesterToggle}
          />
        </div>

        {/* Credits Filter */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <CreditFilter
            showCoursesDirectly={showCoursesDirectly}
            availableCredits={availableCredits}
            selectedCredits={filters.selectedCredits}
            minCredits={filters.minCredits}
            maxCredits={filters.maxCredits}
            onCreditToggle={handleCreditToggle}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Grade Letters Filter */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <GradeFilter
            availableGrades={availableGrades}
            selectedGrades={filters.selectedGrades}
            onGradeToggle={handleGradeToggle}
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
          <ActiveFiltersSummary
            hasActiveFilters={hasActiveFilters}
            filters={filters}
            showCoursesDirectly={showCoursesDirectly}
          />
        </div>
      )}

      {/* Results Display for Standalone Mode - Course Results and What-If Calculator */}
      {showCoursesDirectly && (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Course Results Display with Search - Only show when there are courses */}
          {filteredCourses.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 tracking-tight mb-2">
                      Filtered Courses
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                      {filteredCourses.length} course
                      {filteredCourses.length !== 1 ? "s" : ""} matching your
                      filters
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Filter integrated with Results */}
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
                <CourseSearchFilter
                  courseName={filters.courseName}
                  onFilterChange={handleFilterChange}
                />
              </div>

              <CourseResultsDisplay
                filteredCourses={filteredCourses}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          )}

          {/* What-If Calculator */}
          {whatIfAnalysis && filteredCourses.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 tracking-tight mb-2">
                      What-If Analysis
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                      See how improving these courses would affect your CGPA
                    </p>
                  </div>

                  <div className="flex gap-3 justify-between text-sm">
                    <div className="text-center sm:text-left">
                      <div className="text-gray-500 uppercase tracking-wide font-medium text-xs">
                        Current CGPA
                      </div>
                      <div className="text-xl sm:text-2xl font-light text-gray-900">
                        {whatIfAnalysis.currentOverallCGPA.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-gray-300 hidden sm:block">→</div>
                    <div className="text-center sm:text-left">
                      <div className="text-gray-500 uppercase tracking-wide font-medium text-xs">
                        Improved CGPA
                      </div>
                      <div className="text-xl sm:text-2xl font-semibold text-green-600">
                        {whatIfAnalysis.whatIfOverallCGPA.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <WhatIfCalculator
                whatIfAnalysis={whatIfAnalysis}
                whatIfGradePoint={whatIfGradePoint}
                setWhatIfGradePoint={setWhatIfGradePoint}
              />
            </div>
          )}

          {/* Empty State when no courses match - Without search filter */}
          {filteredCourses.length === 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] p-4 sm:p-8">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 0a4 4 0 118 0m-6 0H4.5a1.5 1.5 0 000 3h.75M16.5 12H20a1.5 1.5 0 013 0v0a1.5 1.5 0 01-3 0v0h-3.5"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                      No Courses Matched!
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-md mx-auto leading-relaxed px-4">
                      Adjust the filters above to find courses.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 sm:px-4 py-2 rounded-full">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Try adjusting your filter criteria above
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
