import { useState, useEffect } from "react";

export function useAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading true to check localStorage

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    try {
      // Check if localStorage is available (client-side)
      if (typeof window !== "undefined" && window.localStorage) {
        const savedToken = localStorage.getItem("diu_access_token");
        const savedUsername = localStorage.getItem("diu_username");

        if (savedToken) {
          setAccessToken(savedToken);
        }
        if (savedUsername) {
          setUsername(savedUsername);
        }
      }
    } catch (error) {
      console.error("Error loading auth state from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Authentication failed");
      const data = await res.json();

      // Save to localStorage (client-side only)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("diu_access_token", data.accessToken);
        localStorage.setItem("diu_username", username);
      }

      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage (client-side only)
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("diu_access_token");
      localStorage.removeItem("diu_username");
      localStorage.removeItem("diu_results");
    }

    setAccessToken(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    accessToken,
    error,
    loading,
    handleLogin,
    handleLogout,
  };
}
