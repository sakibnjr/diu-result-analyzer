"use client";
import { useState, useEffect, useRef } from "react";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import { useResults } from "./hooks/useResults";
import { Toaster } from "react-hot-toast";
import {
  MdAnalytics,
  MdFilterList,
  MdPictureAsPdf,
  MdVerified,
} from "react-icons/md";

export default function AcademicDashboard() {
  const [expandedSemester, setExpandedSemester] = useState(null);
  const loginFormRef = useRef(null);

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

  // Handle login button click from navigation
  const handleLoginClick = () => {
    if (loginFormRef.current) {
      loginFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // Focus the username input after a short delay to allow scrolling
      setTimeout(() => {
        const usernameInput = document.getElementById("username");
        if (usernameInput) {
          usernameInput.focus();
        }
      }, 500);
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

      <main className="min-h-screen relative flex flex-col">
        {/* Simplified Background */}
        <div className="absolute inset-0 bg-gray-50">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Navigation */}
        <Navigation
          isAuthenticated={!!auth.accessToken}
          handleLogout={handleLogout}
          loading={auth.loading || resultsData.loading}
          onLoginClick={handleLoginClick}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {!auth.accessToken ? (
            /* Modern Landing Page Layout */
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  {/* Left Column - Clean Hero Content */}
                  <div className="text-center lg:text-left space-y-8">
                    {/* Simple badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-gray-700 text-sm font-medium rounded-full shadow-sm">
                      <MdVerified className="w-4 h-4 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        Next-Gen Academic Insights
                      </span>
                    </div>

                    {/* Clean heading */}
                    <div className="space-y-6">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                        DIU Result
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Analyzer
                        </span>
                      </h1>

                      <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                        Complete DIU academic analytics in one place. View
                        <span className="text-blue-600 font-semibold">
                          {" "}
                          CGPA, semester details
                        </span>
                        , filter courses, and export
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                          {" "}
                          professional PDFs
                        </span>
                        .
                      </p>
                    </div>

                    {/* Simplified feature highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                      {[
                        {
                          icon: (
                            <MdAnalytics className="w-8 h-8 text-blue-600" />
                          ),
                          title: "Analytics",
                          desc: "CGPA & academic insights",
                          gradient:
                            "from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
                        },
                        {
                          icon: (
                            <MdFilterList className="w-8 h-8 text-purple-600" />
                          ),
                          title: "Filtering",
                          desc: "Search & filter courses",
                          gradient:
                            "from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200",
                        },
                        {
                          icon: (
                            <MdPictureAsPdf className="w-8 h-8 text-pink-600" />
                          ),
                          title: "PDF Export",
                          desc: "Download reports",
                          gradient:
                            "from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200",
                        },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className={`p-4 bg-gradient-to-br ${feature.gradient} border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer`}
                        >
                          <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
                            {feature.icon}
                          </div>
                          <h3 className="text-gray-900 font-semibold text-base mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {feature.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Login Form */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="w-full max-w-md">
                      <LoginForm
                        username={auth.username}
                        setUsername={auth.setUsername}
                        password={auth.password}
                        setPassword={auth.setPassword}
                        handleLogin={handleLogin}
                        loading={auth.loading}
                        error={auth.error}
                        ref={loginFormRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Layout */
            <div className="flex-1 relative z-20">
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
