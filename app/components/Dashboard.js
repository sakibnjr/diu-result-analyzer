import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeroStatistics } from "./HeroStatistics";
import { StudentInfoCard } from "./StudentInfoCard";
import { PerformanceChart } from "./PerformanceChart";
import { SemesterResults } from "./SemesterResults";
import { generatePDFTranscript } from "../utils/pdfGenerator";
import {
  calculateCGPA,
  getAllCourses,
  getTotalCredits,
  getTotalCourses,
  getStudentInfo,
} from "../utils/helpers";

export function Dashboard({
  results,
  loading,
  expandedSemester,
  setExpandedSemester,
}) {
  const router = useRouter();

  // Calculate summary values (use original results for main dashboard)
  const allCourses = getAllCourses(results);
  const overallCGPA = calculateCGPA(allCourses);
  const totalSemesters = results.filter(
    (r) =>
      r.data &&
      r.data.status &&
      Array.isArray(r.data.data) &&
      r.data.data.length > 0
  ).length;
  const totalCredits = getTotalCredits(allCourses);
  const totalCourses = getTotalCourses(allCourses);
  const studentInfo = getStudentInfo(results);

  // Handle PDF download
  const handleDownloadPDF = () => {
    try {
      generatePDFTranscript(results);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Statistics */}
      <HeroStatistics
        overallCGPA={overallCGPA}
        totalSemesters={totalSemesters}
        totalCredits={totalCredits}
        totalCourses={totalCourses}
        loading={loading}
      />

      {/* Profile + Chart Row */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Student Info Card */}
        <div className="md:col-span-1">
          <StudentInfoCard studentInfo={studentInfo} loading={loading} />
        </div>

        {/* SGPA Chart */}
        <div className="md:col-span-2">
          <PerformanceChart results={results} loading={loading} />
        </div>
      </div>

      {/* Semester Results */}
      <SemesterResults
        results={results}
        loading={loading}
        expandedSemester={expandedSemester}
        setExpandedSemester={setExpandedSemester}
        getTotalCredits={getTotalCredits}
        getTotalCourses={getTotalCourses}
      />

      {/* PDF Download Action */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadPDF}
          disabled={loading || !results.length}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Transcript
          <span className="text-xs opacity-75">PDF Format</span>
        </button>
      </div>
    </div>
  );
}
