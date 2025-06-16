import { useState, useEffect } from "react";
import {
  calculateCGPA,
  getTotalCredits,
  getTotalCourses,
  getUniqueCoursesWithHighestGrades,
  getAllCourses,
} from "../../utils/helpers";

export function useFilterLogic(
  results,
  onFilterChange,
  propGetTotalCredits,
  propGetTotalCourses,
  showCoursesDirectly = false
) {
  const [filters, setFilters] = useState({
    selectedSemesters: [],
    minCredits: "",
    maxCredits: "",
    selectedCredits: [],
    selectedGrades: [],
    courseName: "",
  });

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState(results);
  const [whatIfGradePoint, setWhatIfGradePoint] = useState("4.0");

  // Use provided functions or fallback to imported ones
  const getCredits = propGetTotalCredits || getTotalCredits;
  const getCourses = propGetTotalCourses || getTotalCourses;

  // Extract unique data for filter options
  const availableSemesters = results
    .filter(
      (result) =>
        result.data &&
        result.data.status &&
        Array.isArray(result.data.data) &&
        result.data.data.length > 0
    )
    .map((result) => result.semester);

  const availableGrades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "D",
    "F",
  ];

  const availableCredits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Apply filters
  useEffect(() => {
    if (showCoursesDirectly) {
      // For standalone mode - filter individual courses
      const allCourses = [];

      // First, collect all courses from all semesters
      results.forEach((result) => {
        if (
          !result.data ||
          !result.data.status ||
          !Array.isArray(result.data.data) ||
          result.data.data.length === 0
        ) {
          return;
        }

        const courses = result.data.data;

        // Apply semester filter first (this is fine to do before deduplication)
        if (
          filters.selectedSemesters.length > 0 &&
          !filters.selectedSemesters.includes(result.semester)
        ) {
          return;
        }

        // Add all courses from this semester to the collection
        courses.forEach((course) => {
          allCourses.push({
            ...course,
            semester: result.semester,
            semesterId: result.semesterId,
            sgpa: result.sgpa,
          });
        });
      });

      // Remove duplicate courses FIRST, keeping only the ones with highest grades
      const uniqueCourses = getUniqueCoursesWithHighestGrades(allCourses);

      // Now apply individual course filters on the unique courses
      const filteredCourses = uniqueCourses.filter((course) => {
        let courseMatches = true;

        // Individual course credit filter (for standalone mode)
        if (filters.selectedCredits.length > 0) {
          if (!filters.selectedCredits.includes(course.totalCredit)) {
            courseMatches = false;
          }
        }

        // Grade letter filter
        if (filters.selectedGrades.length > 0) {
          if (!filters.selectedGrades.includes(course.gradeLetter)) {
            courseMatches = false;
          }
        }

        // Course name filter
        if (filters.courseName && filters.courseName.trim() !== "") {
          const courseTitle = course.courseTitle || "";
          const courseCode = course.customCourseId || course.courseCode || "";
          const searchTerm = filters.courseName.toLowerCase().trim();

          if (
            !courseTitle.toLowerCase().includes(searchTerm) &&
            !courseCode.toLowerCase().includes(searchTerm)
          ) {
            courseMatches = false;
          }
        }

        return courseMatches;
      });

      setFilteredCourses(filteredCourses);
    } else {
      // Original semester-level filtering (dashboard mode)
      const filteredResults = results.filter((result) => {
        if (
          !result.data ||
          !result.data.status ||
          !Array.isArray(result.data.data) ||
          result.data.data.length === 0
        ) {
          return false;
        }

        const courses = result.data.data;
        const semesterCredits = getCredits(courses);

        // Semester filter - if no semesters selected, show all
        if (
          filters.selectedSemesters.length > 0 &&
          !filters.selectedSemesters.includes(result.semester)
        ) {
          return false;
        }

        // Credits filter - only apply if values are set (semester total for dashboard mode)
        if (filters.minCredits && filters.minCredits.trim() !== "") {
          const minCredits = parseInt(filters.minCredits);
          if (isNaN(minCredits) || semesterCredits < minCredits) {
            return false;
          }
        }
        if (filters.maxCredits && filters.maxCredits.trim() !== "") {
          const maxCredits = parseInt(filters.maxCredits);
          if (isNaN(maxCredits) || semesterCredits > maxCredits) {
            return false;
          }
        }

        // Course-level filters - apply if any course-level filter is set
        const hasCourseFilters =
          filters.selectedGrades.length > 0 ||
          (filters.courseName && filters.courseName.trim() !== "");

        if (hasCourseFilters) {
          const hasMatchingCourse = courses.some((course) => {
            // Grade letter filter
            if (filters.selectedGrades.length > 0) {
              if (!filters.selectedGrades.includes(course.gradeLetter)) {
                return false;
              }
            }

            // Course name filter
            if (filters.courseName && filters.courseName.trim() !== "") {
              const courseTitle = course.courseTitle || "";
              const courseCode =
                course.customCourseId || course.courseCode || "";
              const searchTerm = filters.courseName.toLowerCase().trim();

              if (
                !courseTitle.toLowerCase().includes(searchTerm) &&
                !courseCode.toLowerCase().includes(searchTerm)
              ) {
                return false;
              }
            }

            return true;
          });

          if (!hasMatchingCourse) {
            return false;
          }
        }

        return true;
      });

      setFilteredSemesters(filteredResults);
      if (onFilterChange) {
        onFilterChange(filteredResults);
      }
    }
  }, [filters, results, getCredits, onFilterChange, showCoursesDirectly]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSemesterToggle = (semester) => {
    setFilters((prev) => ({
      ...prev,
      selectedSemesters: prev.selectedSemesters.includes(semester)
        ? prev.selectedSemesters.filter((s) => s !== semester)
        : [...prev.selectedSemesters, semester],
    }));
  };

  const handleGradeToggle = (grade) => {
    setFilters((prev) => ({
      ...prev,
      selectedGrades: prev.selectedGrades.includes(grade)
        ? prev.selectedGrades.filter((g) => g !== grade)
        : [...prev.selectedGrades, grade],
    }));
  };

  const handleCreditToggle = (credit) => {
    setFilters((prev) => ({
      ...prev,
      selectedCredits: prev.selectedCredits.includes(credit)
        ? prev.selectedCredits.filter((c) => c !== credit)
        : [...prev.selectedCredits, credit],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      selectedSemesters: [],
      minCredits: "",
      maxCredits: "",
      selectedCredits: [],
      selectedGrades: [],
      courseName: "",
    });
  };

  const hasActiveFilters =
    filters.selectedSemesters.length > 0 ||
    (filters.minCredits && filters.minCredits.trim() !== "") ||
    (filters.maxCredits && filters.maxCredits.trim() !== "") ||
    filters.selectedCredits.length > 0 ||
    filters.selectedGrades.length > 0 ||
    (filters.courseName && filters.courseName.trim() !== "");

  // Calculate What-if CGPA
  const whatIfAnalysis =
    showCoursesDirectly && filteredCourses.length > 0
      ? (() => {
          // Get all courses from all semesters
          const allCourses = getAllCourses(results);
          const allUniqueOriginalCourses =
            getUniqueCoursesWithHighestGrades(allCourses);

          // Create a map of course titles for quick lookup
          const filteredCourseTitles = new Set(
            filteredCourses.map((course) => course.courseTitle)
          );

          // Create modified course list with what-if grades
          const whatIfGradePointNum = parseFloat(whatIfGradePoint) || 0;
          const modifiedCourses = allUniqueOriginalCourses.map((course) => {
            if (filteredCourseTitles.has(course.courseTitle)) {
              return {
                ...course,
                pointEquivalent: whatIfGradePointNum,
              };
            }
            return course;
          });

          const currentOverallCGPA = calculateCGPA(allUniqueOriginalCourses);
          const whatIfOverallCGPA = calculateCGPA(modifiedCourses);
          const currentFilteredCGPA = calculateCGPA(filteredCourses);

          // Calculate percentage change
          const cgpaPercentageChange =
            currentOverallCGPA > 0
              ? ((whatIfOverallCGPA - currentOverallCGPA) /
                  currentOverallCGPA) *
                100
              : 0;

          return {
            currentOverallCGPA,
            whatIfOverallCGPA,
            currentFilteredCGPA,
            cgpaPercentageChange,
            filteredCoursesCount: filteredCourses.length,
            filteredCredits: filteredCourses.reduce(
              (sum, course) => sum + (course.totalCredit || 0),
              0
            ),
          };
        })()
      : null;

  return {
    filters,
    filteredCourses,
    filteredSemesters,
    whatIfGradePoint,
    setWhatIfGradePoint,
    availableSemesters,
    availableGrades,
    availableCredits,
    hasActiveFilters,
    whatIfAnalysis,
    handleFilterChange,
    handleSemesterToggle,
    handleGradeToggle,
    handleCreditToggle,
    clearAllFilters,
  };
}
