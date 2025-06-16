// Helper to remove duplicate courses and keep the one with highest pointEquivalent
export function getUniqueCoursesWithHighestGrades(courses) {
  const courseMap = new Map();

  for (const course of courses) {
    const courseTitle = course.courseTitle;
    if (!courseTitle) continue;

    if (!courseMap.has(courseTitle)) {
      courseMap.set(courseTitle, course);
    } else {
      const existingCourse = courseMap.get(courseTitle);
      const existingPoint = existingCourse.pointEquivalent || 0;
      const currentPoint = course.pointEquivalent || 0;

      // Keep the course with higher point, if same point keep the latest one
      if (currentPoint > existingPoint) {
        courseMap.set(courseTitle, course);
      }
    }
  }

  return Array.from(courseMap.values());
}

// Helper to calculate CGPA from a list of courses (now handles duplicates)
export function calculateCGPA(courses) {
  const uniqueCourses = getUniqueCoursesWithHighestGrades(courses);

  let totalPoints = 0;
  let totalCredits = 0;
  for (const course of uniqueCourses) {
    totalPoints += (course.pointEquivalent || 0) * (course.totalCredit || 0);
    totalCredits += course.totalCredit || 0;
  }
  if (totalCredits === 0) return 0;
  return totalPoints / totalCredits;
}

// Helper to flatten all courses from all semesters for overall CGPA
export function getAllCourses(results) {
  return results
    .filter(
      (r) =>
        r.data &&
        r.data.status &&
        Array.isArray(r.data.data) &&
        r.data.data.length > 0
    )
    .flatMap((r) => r.data.data);
}

// Helper to get total credits from a list of courses (now handles duplicates)
export function getTotalCredits(courses) {
  const uniqueCourses = getUniqueCoursesWithHighestGrades(courses);
  return uniqueCourses.reduce((sum, c) => sum + (c.totalCredit || 0), 0);
}

// Helper to get total courses from a list of courses (now handles duplicates)
export function getTotalCourses(courses) {
  const uniqueCourses = getUniqueCoursesWithHighestGrades(courses);
  return uniqueCourses.length;
}

// Extract student info from the first available course
export function getStudentInfo(results) {
  for (const result of results) {
    if (
      result.data &&
      result.data.status &&
      Array.isArray(result.data.data) &&
      result.data.data.length > 0
    ) {
      const course = result.data.data[0];
      return {
        name: course.studentName,
        id: course.studentId,
        batch: course.batch,
        program: course.program,
      };
    }
  }
  return null;
}
