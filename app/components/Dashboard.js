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
  accessToken,
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
    <div className="space-y-6 sm:space-y-8 relative max-w-7xl mx-auto px-2 md:px-0">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/20 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-float-fast"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-orange-400/20 rounded-full animate-float-slow"></div>
      </div>

      {/* Hero Statistics */}
      <div className="transition-all duration-700 ease-out">
        <HeroStatistics
          overallCGPA={overallCGPA}
          totalSemesters={totalSemesters}
          totalCredits={totalCredits}
          totalCourses={totalCourses}
          loading={loading}
        />
      </div>

      {/* Profile + Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-700 ease-out">
        {/* Student Info Card */}
        <div className="lg:col-span-1 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1">
          <div className="h-full min-h-[300px] sm:min-h-[350px]">
            <StudentInfoCard studentInfo={studentInfo} loading={loading} />
          </div>
        </div>

        {/* SGPA Chart */}
        <div className="lg:col-span-2 transition-all duration-500 ease-out hover:scale-[1.01]">
          <div className="h-full min-h-[300px] sm:min-h-[350px]">
            <PerformanceChart results={results} loading={loading} />
          </div>
        </div>
      </div>

      {/* Semester Results */}
      <div className="transition-all duration-700 ease-out">
        <SemesterResults
          results={results}
          loading={loading}
          expandedSemester={expandedSemester}
          setExpandedSemester={setExpandedSemester}
          getTotalCredits={getTotalCredits}
          getTotalCourses={getTotalCourses}
        />
      </div>

      {/* PDF Download Action */}
      <div className="flex justify-center transition-all duration-700 ease-out pb-6 sm:pb-8">
        <button
          onClick={handleDownloadPDF}
          disabled={loading || !results.length}
          className="group relative overflow-hidden inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 rounded-xl w-full sm:w-auto max-w-sm text-center"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

          {/* Icon with rotation animation */}
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 flex-shrink-0"
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

          <span className="relative font-medium">Download Transcript</span>

          <span className="relative text-xs opacity-75 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline">
            PDF Format
          </span>
        </button>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceInUp {
          0% {
            transform: translateY(40px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-25px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(25px, -25px) rotate(180deg);
          }
          75% {
            transform: translate(20px, 25px) rotate(270deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          20% {
            transform: translate(15px, -15px) rotate(72deg);
          }
          40% {
            transform: translate(-10px, -20px) rotate(144deg);
          }
          60% {
            transform: translate(-20px, 10px) rotate(216deg);
          }
          80% {
            transform: translate(10px, 20px) rotate(288deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
