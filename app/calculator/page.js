"use client";
import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ManualCGPACalculator } from "../components/ManualCGPACalculator";
import { useAuth } from "../hooks/useAuth";
import { useResults } from "../hooks/useResults";
import {
  getAllCourses,
  calculateCGPA,
  getTotalCredits,
} from "../utils/helpers";
import { Toaster } from "react-hot-toast";

export default function CalculatorPage() {
  // Custom hooks for auth and results
  const auth = useAuth();
  const resultsData = useResults();

  // Handle logout
  const handleLogout = () => {
    auth.handleLogout();
    resultsData.clearResults();
  };

  // Automatic data fetch when authenticated but no results
  useEffect(() => {
    if (
      auth.accessToken &&
      !auth.loading &&
      resultsData.hasCheckedLocalStorage &&
      resultsData.results.length === 0 &&
      !resultsData.loading &&
      !resultsData.error
    ) {
      resultsData.fetchResults(auth.accessToken);
    }
  }, [
    auth.accessToken,
    auth.loading,
    resultsData.hasCheckedLocalStorage,
    resultsData.results.length,
    resultsData.loading,
    resultsData.error,
  ]);

  // Calculate overall CGPA and completed credits from results using helper functions
  const calculateAcademicData = () => {
    if (!resultsData.results || resultsData.results.length === 0) {
      return { overallCGPA: null, completedCredits: null };
    }

    // Get all courses from all semesters
    const allCourses = getAllCourses(resultsData.results);

    if (allCourses.length === 0) {
      return { overallCGPA: null, completedCredits: null };
    }

    // Calculate CGPA using the helper function (handles duplicates and retakes)
    const overallCGPA = calculateCGPA(allCourses);

    // Calculate total credits using the helper function (handles duplicates)
    const completedCredits = getTotalCredits(allCourses);

    return {
      overallCGPA: overallCGPA.toFixed(2),
      completedCredits: completedCredits,
    };
  };

  const { overallCGPA, completedCredits } = calculateAcademicData();

  return (
    <>
      <Toaster position="top-center" />

      {/* SEO Content - Hidden but crawlable */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <h1>Manual CGPA Calculator - DIU Semester Grade Calculator</h1>
        <p>
          Calculate semester CGPA manually by adding courses with credits and
          grades. Combine with overall CGPA to see updated total CGPA.
        </p>
        <p>
          Keywords: Manual CGPA calculator, semester grade calculator, DIU CGPA,
          course grade calculator
        </p>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 flex flex-col">
        {/* Navigation */}
        <Navigation
          isAuthenticated={!!auth.accessToken}
          handleLogout={handleLogout}
          loading={auth.loading || resultsData.loading}
        />

        {/* Main Content */}
        <div className="flex-1 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-2 md:px-0">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Manual CGPA Calculator
              </h1>
              <p className="text-gray-600">
                Calculate your semester CGPA by adding courses manually
                {auth.accessToken && overallCGPA
                  ? ", then see how it affects your overall academic standing."
                  : ", then combine with your overall CGPA to see the updated total."}
              </p>

              {/* Academic Status Indicator */}
              {auth.accessToken && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {overallCGPA && parseFloat(overallCGPA) > 0
                    ? `Using your academic data (CGPA: ${overallCGPA})`
                    : "Loading academic data..."}
                </div>
              )}
            </div>

            {/* Calculator Component */}
            <ManualCGPACalculator
              overallCGPA={
                overallCGPA && parseFloat(overallCGPA) > 0 ? overallCGPA : null
              }
              completedCredits={
                completedCredits && completedCredits > 0
                  ? completedCredits
                  : null
              }
              showOverallInputs={
                !auth.accessToken ||
                !overallCGPA ||
                parseFloat(overallCGPA) === 0
              }
            />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
