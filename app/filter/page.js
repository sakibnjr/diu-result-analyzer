"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ResultFilter } from "../components/ResultFilter";
import { useAuth } from "../hooks/useAuth";
import { useResults } from "../hooks/useResults";

export default function FilterPage() {
  const router = useRouter();
  const auth = useAuth();
  const resultsData = useResults();

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.accessToken && !auth.loading) {
      router.push("/");
    }
  }, [auth.accessToken, auth.loading, router]);

  // Fetch results if authenticated but no data
  useEffect(() => {
    if (
      auth.accessToken &&
      !resultsData.results.length &&
      !resultsData.loading
    ) {
      resultsData.fetchResults(auth.accessToken);
    }
  }, [auth.accessToken, resultsData]);

  const handleLogout = () => {
    auth.handleLogout();
    resultsData.clearResults();
    router.push("/");
  };

  if (auth.loading || resultsData.loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your academic data...</p>
        </div>
      </main>
    );
  }

  if (!auth.accessToken) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 flex flex-col">
      {/* Navigation */}
      <Navigation
        isAuthenticated={!!auth.accessToken}
        handleLogout={handleLogout}
        loading={false}
      />

      <div className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Advanced Result Filter
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Filter and search through your academic results with advanced
              criteria. Find specific courses, grades, and semesters that match
              your requirements.
            </p>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Filter Component */}
          <ResultFilter
            results={resultsData.results}
            showCoursesDirectly={true}
            standalone={true}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
