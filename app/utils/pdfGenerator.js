import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  calculateCGPA,
  getAllCourses,
  getTotalCredits,
  getTotalCourses,
  getStudentInfo,
} from "./helpers";

export function generatePDFTranscript(results) {
  // Initialize PDF
  const doc = new jsPDF();

  // Get data
  const allCourses = getAllCourses(results);
  const studentInfo = getStudentInfo(results);
  const overallCGPA = calculateCGPA(allCourses);
  const totalCredits = getTotalCredits(allCourses);
  const totalCourses = getTotalCourses(allCourses);

  // Set fonts and colors
  const primaryColor = [37, 99, 235]; // blue-600
  const secondaryColor = [75, 85, 99]; // gray-600
  const lightGray = [243, 244, 246]; // gray-100

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ACADEMIC TRANSCRIPT", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Daffodil International University", 105, 22, { align: "center" });

  // Student Information Section
  let currentY = 45;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("STUDENT INFORMATION", 20, currentY);

  currentY += 10;
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  if (studentInfo) {
    doc.text(`Name: ${studentInfo.name || "N/A"}`, 20, currentY);
    doc.text(`Student ID: ${studentInfo.id || "N/A"}`, 120, currentY);
    currentY += 7;
    doc.text(`Program: ${studentInfo.program || "N/A"}`, 20, currentY);
    doc.text(`Batch: ${studentInfo.batch || "N/A"}`, 120, currentY);
  }

  // Academic Summary Section
  currentY += 20;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("ACADEMIC SUMMARY", 20, currentY);

  currentY += 10;
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(`Overall CGPA: ${overallCGPA.toFixed(2)}`, 20, currentY);
  doc.text(`Total Credits: ${totalCredits}`, 80, currentY);
  doc.text(`Total Courses: ${totalCourses}`, 140, currentY);

  // Course Details Section
  currentY += 20;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("COURSE DETAILS", 20, currentY);

  // Group courses by semester
  const semesterGroups = {};
  results.forEach((result) => {
    if (
      result.data &&
      result.data.status &&
      Array.isArray(result.data.data) &&
      result.data.data.length > 0
    ) {
      const semesterName = result.semester || "Unknown Semester";
      semesterGroups[semesterName] = result.data.data;
    }
  });

  currentY += 15;

  // Generate table for each semester
  Object.entries(semesterGroups).forEach(([semester, courses]) => {
    // Check if we need a new page
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    // Semester header
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(semester.toUpperCase(), 20, currentY);

    // Calculate semester CGPA
    const semesterCGPA = calculateCGPA(courses);
    const semesterCredits = courses.reduce(
      (sum, c) => sum + (c.totalCredit || 0),
      0
    );

    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Semester SGPA: ${semesterCGPA.toFixed(2)} | Credits: ${semesterCredits}`,
      20,
      currentY + 7
    );

    currentY += 15;

    // Prepare table data
    const tableData = courses.map((course) => [
      course.customCourseId || "N/A",
      course.courseTitle || "N/A",
      course.totalCredit || 0,
      course.gradeLetter || "N/A",
      (course.pointEquivalent || 0).toFixed(2),
    ]);

    // Generate table using autoTable
    autoTable(doc, {
      startY: currentY,
      head: [["Course Code", "Course Title", "Credits", "Grade", "Points"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
        textColor: secondaryColor,
      },
      alternateRowStyles: {
        fillColor: lightGray,
      },
      margin: { left: 20, right: 20 },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 80 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
      },
    });

    currentY = doc.lastAutoTable.finalY + 15;
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    // Date generated
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 20, 285);

    // Page number
    doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: "right" });

    // Disclaimer
    doc.text(
      "This is a computer-generated transcript from DIU Result Analyzer",
      105,
      290,
      { align: "center" }
    );
  }

  // Download the PDF
  const fileName = `${
    studentInfo?.name?.replace(/\s+/g, "_") || "Student"
  }_Transcript.pdf`;
  doc.save(fileName);
}

// Utility function to get letter grade from points
export function getGradeFromPoints(points) {
  if (points >= 4.0) return "A+";
  if (points >= 3.75) return "A";
  if (points >= 3.5) return "A-";
  if (points >= 3.25) return "B+";
  if (points >= 3.0) return "B";
  if (points >= 2.75) return "B-";
  if (points >= 2.5) return "C+";
  if (points >= 2.25) return "C";
  if (points >= 2.0) return "D";
  return "F";
}
