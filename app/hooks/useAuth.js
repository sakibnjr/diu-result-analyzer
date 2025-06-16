import { useState } from "react";

export function useAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
