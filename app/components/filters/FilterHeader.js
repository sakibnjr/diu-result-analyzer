export function FilterHeader({
  showCoursesDirectly,
  hasActiveFilters,
  onClearAllFilters,
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 tracking-tight">
          {showCoursesDirectly ? "Course Filter" : "Filters"}
        </h3>

        {hasActiveFilters && (
          <button
            onClick={onClearAllFilters}
            className="group inline-flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-lg sm:rounded-xl transition-all duration-200 ease-out"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
