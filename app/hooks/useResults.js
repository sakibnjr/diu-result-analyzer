import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);

  // Load results from localStorage on component mount
  useEffect(() => {
    const loadFromLocalStorage = async () => {
      // Reduced delay for faster initial load
      const minDelay = new Promise((resolve) => setTimeout(resolve, 200));

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

      // Wait for minimum delay before hiding loading animation
      await minDelay;

      setLoading(false);
      setHasCheckedLocalStorage(true);
    };

    loadFromLocalStorage();
  }, []);

  const fetchResults = async (token) => {
    setError("");
    setLoading(true);
    setResults([]);

    // Show loading toast
    const toastId = toast.loading("Fetching academic data...");

    // Reduced delay for faster API fetching
    const minDelay = new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const [response] = await Promise.all([
        fetch(`/api/results?accessToken=${token}`),
        minDelay,
      ]);

      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();

      // Save to localStorage (client-side only)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("diu_results", JSON.stringify(data));
      }

      setResults(data);
      toast.success("Academic data loaded!", { id: toastId });
    } catch (err) {
      setError("Failed to fetch results");
      toast.error("Failed to fetch academic data.", { id: toastId });
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
    setLoading(false);
  };

  return {
    results,
    loading,
    error,
    hasCheckedLocalStorage,
    fetchResults,
    clearResults,
  };
}
