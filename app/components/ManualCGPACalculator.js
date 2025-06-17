"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

const GRADE_POINTS = {
  "A+": 4.0,
  A: 3.75,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.25,
  D: 2.0,
  F: 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

export function ManualCGPACalculator({
  overallCGPA = null,
  completedCredits = null,
  showOverallInputs = true,
}) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    credits: "",
    grade: "A+",
  });
  // Only use local state if props are not provided and manual inputs are allowed
  const [manualOverallCGPA, setManualOverallCGPA] = useState("");
  const [manualCompletedCredits, setManualCompletedCredits] = useState("");

  // Use props if available, otherwise use manual state
  const currentOverallCGPA =
    overallCGPA !== null ? overallCGPA : manualOverallCGPA;
  const currentCompletedCredits =
    completedCredits !== null ? completedCredits : manualCompletedCredits;

  // Add a new course
  const addCourse = () => {
    if (
      !newCourse.name.trim() ||
      !newCourse.credits ||
      parseFloat(newCourse.credits) <= 0
    ) {
      toast.error("Please enter valid course name and credits");
      return;
    }

    const course = {
      id: Date.now(),
      name: newCourse.name.trim(),
      credits: parseFloat(newCourse.credits),
      grade: newCourse.grade,
      gradePoint: GRADE_POINTS[newCourse.grade],
    };

    setCourses([...courses, course]);
    setNewCourse({ name: "", credits: "", grade: "A+" });
    toast.success("Course added successfully!");
  };

  // Remove a course
  const removeCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.success("Course removed");
  };

  // Calculate semester CGPA
  const calculateSemesterCGPA = () => {
    if (courses.length === 0) return 0;

    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const totalGradePoints = courses.reduce(
      (sum, course) => sum + course.credits * course.gradePoint,
      0
    );

    return totalGradePoints / totalCredits;
  };

  // Calculate combined CGPA
  const calculateCombinedCGPA = () => {
    if (!currentOverallCGPA || !currentCompletedCredits) return null;

    const semesterCGPA = calculateSemesterCGPA();
    const semesterCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    if (semesterCredits === 0) return parseFloat(currentOverallCGPA);

    const totalCredits = parseFloat(currentCompletedCredits) + semesterCredits;
    const totalGradePoints =
      parseFloat(currentOverallCGPA) * parseFloat(currentCompletedCredits) +
      semesterCGPA * semesterCredits;

    return totalGradePoints / totalCredits;
  };

  const semesterCGPA = calculateSemesterCGPA();
  const combinedCGPA = calculateCombinedCGPA();
  const totalSemesterCredits = courses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  return (
    <div className="space-y-8">
      {/* Course Input Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Add Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              placeholder="e.g., Calculus I, Physics II"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credits
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="6"
              value={newCourse.credits}
              onChange={(e) =>
                setNewCourse({ ...newCourse, credits: e.target.value })
              }
              placeholder="3.0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              value={newCourse.grade}
              onChange={(e) =>
                setNewCourse({ ...newCourse, grade: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {GRADE_OPTIONS.map((grade) => (
                <option key={grade} value={grade}>
                  {grade} ({GRADE_POINTS[grade]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addCourse}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Course
        </button>
      </div>

      {/* Courses List */}
      {courses.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Added Courses
          </h3>

          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{course.name}</h4>
                  <p className="text-sm text-gray-600">
                    {course.credits} credits • Grade: {course.grade} (
                    {course.gradePoint})
                  </p>
                </div>
                <button
                  onClick={() => removeCourse(course.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Semester CGPA */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Current Semester
          </h3>

          <div className="space-y-4">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-sm font-medium text-blue-600 mb-1">
                Semester CGPA
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {courses.length > 0 ? semesterCGPA.toFixed(2) : "0.00"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-600">Total Courses</div>
                <div className="text-lg font-semibold text-gray-900">
                  {courses.length}
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-600">Total Credits</div>
                <div className="text-lg font-semibold text-gray-900">
                  {totalSemesterCredits}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined CGPA */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Overall CGPA
          </h3>

          <div className="space-y-4">
            {/* Show current values from props or display inputs */}
            {overallCGPA !== null && completedCredits !== null ? (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-blue-600 font-medium">
                      Overall CGPA
                    </div>
                    <div className="text-lg font-bold text-blue-800">
                      {parseFloat(overallCGPA).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-medium">
                      Completed Credits
                    </div>
                    <div className="text-lg font-bold text-blue-800">
                      {completedCredits}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              showOverallInputs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Overall CGPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={manualOverallCGPA}
                      onChange={(e) => setManualOverallCGPA(e.target.value)}
                      placeholder="3.50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completed Credits
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={manualCompletedCredits}
                      onChange={(e) =>
                        setManualCompletedCredits(e.target.value)
                      }
                      placeholder="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
              )
            )}

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-sm font-medium text-green-600 mb-1">
                Updated Overall CGPA
              </div>
              <div className="text-3xl font-bold text-green-700">
                {combinedCGPA !== null ? combinedCGPA.toFixed(2) : "0.00"}
              </div>
            </div>

            {combinedCGPA !== null && currentOverallCGPA && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600">
                  CGPA Change
                </div>
                <div
                  className={`text-lg font-semibold ${
                    combinedCGPA - parseFloat(currentOverallCGPA) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {combinedCGPA - parseFloat(currentOverallCGPA) >= 0
                    ? "+"
                    : ""}
                  {(combinedCGPA - parseFloat(currentOverallCGPA)).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            1. <strong>Add Courses:</strong> Enter course name, credits, and
            expected/achieved grade
          </p>
          <p>
            2. <strong>View Semester CGPA:</strong> See your calculated CGPA for
            the current semester
          </p>
          {overallCGPA !== null && completedCredits !== null ? (
            <p>
              3. <strong>Updated Overall CGPA:</strong> Your current academic
              data is automatically used to calculate the updated CGPA
            </p>
          ) : (
            <>
              <p>
                3. <strong>Calculate Overall CGPA:</strong> Enter your current
                overall CGPA and completed credits
              </p>
              <p>
                4. <strong>See Updated CGPA:</strong> View how your overall CGPA
                will change after this semester
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
