import { useState, useEffect } from "react";

export function useResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load results from localStorage on component mount
  useEffect(() => {
    try {
      // Check if localStorage is available (client-side)
      if (typeof window !== "undefined" && window.localStorage) {
        const savedResults = localStorage.getItem("diu_results");
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults);
          setResults(parsedResults);
        }
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
    }
  }, []);

  const fetchResults = async (token) => {
    setResults([]);
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/results?accessToken=${token}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();

      // Save to localStorage (client-side only)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("diu_results", JSON.stringify(data));
      }

      setResults(data);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    // Clear localStorage (client-side only)
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("diu_results");
    }

    setResults([]);
    setError("");
  };

  return {
    results,
    loading,
    error,
    fetchResults,
    clearResults,
  };
}
