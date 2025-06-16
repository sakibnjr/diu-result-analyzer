"use client";
import { useState, useEffect } from "react";
import { WelcomeAnimation } from "./components/WelcomeAnimation";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
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
      // Error is already handled in useAuth hook
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
          DIU CGPA Calculator - Free Academic Result Analyzer for Daffodil
          International University
        </h1>
        <h2>Calculate DIU SGPA and CGPA Online</h2>
        <p>
          Free online DIU CGPA calculator and academic result analyzer for
          Daffodil International University students. Calculate your semester
          GPA (SGPA), cumulative GPA (CGPA), analyze academic performance, and
          download professional transcripts. Compatible with DIU student portal
          results.
        </p>
        <h3>Features:</h3>
        <ul>
          <li>DIU CGPA Calculator with retake handling</li>
          <li>DIU SGPA Calculator for each semester</li>
          <li>Academic performance visualization</li>
          <li>PDF transcript generation</li>
          <li>Daffodil International University result analysis</li>
          <li>Free DIU grade calculator</li>
        </ul>
        <h4>
          Keywords: DIU CGPA, DIU SGPA, Daffodil University result, DIU grade
          calculator, Bangladesh university CGPA
        </h4>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 flex flex-col">
        <WelcomeAnimation showWelcome={showWelcome} />

        <div className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center space-y-8">
            {/* Header Component */}
            <Header
              isAuthenticated={!!auth.accessToken}
              handleLogout={handleLogout}
              loading={auth.loading || resultsData.loading}
            />

            {!auth.accessToken ? (
              <LoginForm
                username={auth.username}
                setUsername={auth.setUsername}
                password={auth.password}
                setPassword={auth.setPassword}
                handleLogin={handleLogin}
                loading={auth.loading}
                error={auth.error}
              />
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

        {/* Footer Component */}
        <Footer />
      </main>
    </>
  );
}
