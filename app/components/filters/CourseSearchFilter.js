export function CourseSearchFilter({ courseName, onFilterChange }) {
  return (
    <div className="space-y-5">
      <label className="text-sm font-semibold text-gray-900 tracking-tight uppercase">
        Search
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder="Course name or code..."
          value={courseName}
          onChange={(e) => onFilterChange("courseName", e.target.value)}
          className="w-full px-4 py-4 pl-12 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
