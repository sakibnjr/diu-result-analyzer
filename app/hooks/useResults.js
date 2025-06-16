import { useState } from "react";

export function useResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResults = async (token) => {
    setResults([]);
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/results?accessToken=${token}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
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
