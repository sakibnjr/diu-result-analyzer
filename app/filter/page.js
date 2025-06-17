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

      <div className="flex-1 flex flex-col p-2">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Welcome Message */}
          <div className="text-center mb-6 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Filter Your Results
            </h1>
            <p className="text-gray-600">
              Use the filters below to find specific courses and monitor your
              academic history.
            </p>
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
