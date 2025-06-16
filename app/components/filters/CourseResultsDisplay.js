export function CourseResultsDisplay({ filteredCourses, hasActiveFilters }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Matching Courses ({filteredCourses.length})
          </h3>
          {filteredCourses.length > 0 && (
            <div className="text-sm text-gray-600">
              {hasActiveFilters ? "Filtered results" : "All courses"}
            </div>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 0a4 4 0 118 0m-6 0H4.5a1.5 1.5 0 000 3h.75M16.5 12H20a1.5 1.5 0 013 0v0a1.5 1.5 0 01-3 0v0h-3.5"
              />
            </svg>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No Courses Found
            </h4>
            <p className="text-gray-600">
              No courses match your current filter criteria. Try adjusting your
              filters.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="block lg:hidden space-y-3">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 space-y-3"
                >
                  <div className="font-medium text-gray-900">
                    {course.courseTitle}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {course.semester}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Credits:</span>
                      <div className="font-mono font-semibold">
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
                      <span className="text-gray-500">Points:</span>
                      <div className="font-mono font-semibold">
                        {course.pointEquivalent}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {course.courseTitle}
                        </div>
                        {course.customCourseId && (
                          <div className="text-sm text-gray-500">
                            {course.customCourseId}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-medium">
                        {course.semester}
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-mono">
                        {course.totalCredit}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            course.gradeLetter === "A+"
                              ? "bg-green-100 text-green-800"
                              : course.gradeLetter === "A"
                              ? "bg-green-100 text-green-800"
                              : course.gradeLetter === "A-"
                              ? "bg-blue-100 text-blue-800"
                              : course.gradeLetter === "B+"
                              ? "bg-blue-100 text-blue-800"
                              : course.gradeLetter === "B"
                              ? "bg-yellow-100 text-yellow-800"
                              : course.gradeLetter === "F"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.gradeLetter}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-mono">
                        {course.pointEquivalent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
