import { SemesterCardSkeleton } from "./SkeletonComponents";

export function SemesterResults({
  results,
  loading,
  expandedSemester,
  setExpandedSemester,
  getTotalCredits,
  getTotalCourses,
}) {
  if (loading) {
    return (
      <div className="space-y-4">
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Semester Details
        </h3>
        <div className="text-xs sm:text-sm text-gray-500">
          Tap on any semester to view detailed courses
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {filteredResults.map((result, idx) => {
          const courses = result.data.data;
          const semesterCredits = getTotalCredits(courses);
          const semesterCourses = getTotalCourses(courses);
          const isExpanded = expandedSemester === result.semesterId;

          return (
            <div
              key={result.semesterId}
              className={`bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] ${
                isExpanded
                  ? "border-blue-200 ring-1 ring-blue-500/20"
                  : "border-gray-100"
              }`}
              onClick={() =>
                setExpandedSemester(isExpanded ? null : result.semesterId)
              }
            >
              <div className="p-4 sm:p-6 cursor-pointer">
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="font-bold text-lg sm:text-xl text-gray-900">
                    {result.semester}
                  </div>
                  <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-6 md:gap-8">
                    <div className="text-center sm:text-left">
                      <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                        SGPA
                      </span>
                      <div className="font-mono text-base sm:text-lg font-bold text-blue-600">
                        {result.sgpa ? result.sgpa.toFixed(2) : "N/A"}
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                        Courses
                      </span>
                      <div className="font-mono text-base sm:text-lg font-bold text-blue-600">
                        {semesterCourses}
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                        Credits
                      </span>
                      <div className="font-mono text-base sm:text-lg font-bold text-blue-600">
                        {semesterCredits}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Indicator */}
                <div className="flex justify-center mt-3 sm:mt-4">
                  <div
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
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

              {/* Expanded Course Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-4 sm:px-6 pb-4 sm:pb-6 pt-4">
                  {/* Mobile: Card Layout */}
                  <div className="block sm:hidden space-y-3">
                    {courses.map((course, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-3 space-y-2"
                      >
                        <div className="font-medium text-sm text-gray-900 leading-tight">
                          {course.courseTitle}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Credit:</span>
                            <div className="font-mono font-semibold text-gray-900">
                              {course.totalCredit}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Grade:</span>
                            <div className="font-semibold text-blue-600">
                              {course.gradeLetter}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Point:</span>
                            <div className="font-mono font-semibold text-gray-900">
                              {course.pointEquivalent}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: Table Layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Title
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Credit
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade Point
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course, i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900">
                              {course.courseTitle}
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm text-center font-mono text-gray-900">
                              {course.totalCredit}
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm text-center font-semibold text-blue-600">
                              {course.gradeLetter}
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm text-center font-mono text-gray-900">
                              {course.pointEquivalent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
