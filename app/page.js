"use client";
import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import { useResults } from "./hooks/useResults";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AcademicDashboard() {
  const [expandedSemester, setExpandedSemester] = useState(null);
  const router = useRouter();

  // Custom hooks for auth and results
  const auth = useAuth();
  const resultsData = useResults();

  // Handle login and fetch results
  const handleLogin = async (e) => {
    try {
      const token = await auth.handleLogin(e);
      await resultsData.fetchResults(token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
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

  // Handle logout
  const handleLogout = () => {
    auth.handleLogout();
    resultsData.clearResults();
    setExpandedSemester(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      {/* SEO Content - Hidden but crawlable */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <h1>
          DIU CGPA Calculator - Daffodil International University Result
          Analyzer
        </h1>
        <p>
          Calculate DIU CGPA, SGPA, analyze academic performance with retake
          handling for Daffodil International University students.
        </p>
        <p>
          Keywords: DIU CGPA, DIU SGPA, Daffodil University result, DIU grade
          calculator
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
        <div className="flex-1 flex flex-col">
          {!auth.accessToken ? (
            /* Landing Page Layout */
            <div className="flex-1 flex flex-col">
              {/* Hero Section */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-20 items-center">
                    {/* Left Column - Hero Content */}
                    <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
                      {/* Main Heading */}
                      <div className="space-y-3 sm:space-y-4">
                        {/* Badge - Hidden on mobile for cleaner look */}
                        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-blue-100/80 text-blue-700 text-xs sm:text-sm font-medium rounded-full mb-4">
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
                          Academic Performance Analyzer
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                          DIU Result Analyzer
                        </h1>

                        {/* Description - Simplified on mobile */}
                        <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                          <span className="sm:hidden">
                            Calculate CGPA and analyze your DIU academic
                            performance.
                          </span>
                          <span className="hidden sm:block">
                            Transform your academic data into actionable
                            insights with our comprehensive CGPA calculator and
                            performance analyzer.
                          </span>
                        </p>
                      </div>

                      {/* Feature Highlights - Simplified on mobile */}
                      <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span>
                            <span className="hidden sm:inline">
                              Accurate CGPA
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                              />
                            </svg>
                          </div>
                          <span>
                            <span className="hidden sm:inline">
                              Smart Filters
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600"
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
                          </div>
                          <span>
                            <span className="hidden sm:inline">
                              PDF Reports
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Login Form */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-full max-w-sm sm:max-w-md">
                        <LoginForm
                          username={auth.username}
                          setUsername={auth.setUsername}
                          password={auth.password}
                          setPassword={auth.setPassword}
                          handleLogin={handleLogin}
                          loading={auth.loading}
                          error={auth.error}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Layout */
            <div className="flex-1">
              <Dashboard
                results={resultsData.results}
                loading={resultsData.loading}
                expandedSemester={expandedSemester}
                setExpandedSemester={setExpandedSemester}
                accessToken={auth.accessToken}
              />
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}
