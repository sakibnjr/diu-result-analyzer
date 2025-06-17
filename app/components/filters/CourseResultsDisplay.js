export function CourseResultsDisplay({ filteredCourses, hasActiveFilters }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-3 sm:space-y-4 max-h-96 sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-100 p-4 sm:p-6 hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-[1.01] shadow-sm"
          >
            {/* Course Title */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight mb-1">
                {course.courseTitle}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {course.customCourseId || course.courseCode}
              </p>
            </div>

            {/* Course Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Semester
                </div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {course.semester}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Credits
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 bg-gray-50 px-2 py-1 rounded tabular-nums">
                  {course.totalCredit}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Grade
                </div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {course.gradeLetter}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Point
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 bg-gray-50 px-2 py-1 rounded tabular-nums">
                  {course.pointEquivalent}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
