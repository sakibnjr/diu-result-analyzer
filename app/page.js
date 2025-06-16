"use client";
import { useState, useEffect } from "react";
import { WelcomeAnimation } from "./components/WelcomeAnimation";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import { useResults } from "./hooks/useResults";

export default function AcademicDashboard() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [expandedSemester, setExpandedSemester] = useState(null);

  // Custom hooks for auth and results
  const auth = useAuth();
  const resultsData = useResults();

  // Show welcome animation when logged in
  useEffect(() => {
    if (auth.accessToken && !resultsData.loading) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.accessToken, resultsData.loading]);

  // Handle login and fetch results
  const handleLogin = async (e) => {
    try {
      const token = await auth.handleLogin(e);
      await resultsData.fetchResults(token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    auth.handleLogout();
    resultsData.clearResults();
    setExpandedSemester(null);
  };

  return (
    <>
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

        <WelcomeAnimation showWelcome={showWelcome} />

        <div className="flex-1 flex flex-col py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-12">
            {!auth.accessToken ? (
              <>
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
                  {/* Hero Content */}
                  <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight">
                        DIU Result Analyzer
                      </h1>
                    </div>

                    <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 px-4 sm:px-0">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed hidden sm:block">
                        Analyze your academic performance with advanced
                        filtering, accurate CGPA calculations, and professional
                        reporting tools.
                      </p>
                    </div>
                  </div>

                  {/* Login Form */}
                  <div className="w-full max-w-sm sm:max-w-md lg:max-w-sm xl:max-w-md mx-auto lg:mx-0 px-4 sm:px-0 lg:px-0 flex-shrink-0">
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

                {/* Features Section */}
                <div className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      Powerful Features
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
                      Everything you need to analyze your academic performance
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                        CGPA Calculator
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                        Accurate calculation with retake handling
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
                      <h4 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                        Advanced Filters
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                        Filter by semester, grade, credits & more
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
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
                      <h4 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                        PDF Generation
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                        Professional downloadable transcripts
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Dashboard
                results={resultsData.results}
                loading={resultsData.loading}
                expandedSemester={expandedSemester}
                setExpandedSemester={setExpandedSemester}
              />
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
