import { useState, useEffect, forwardRef } from "react";
import toast from "react-hot-toast";
import {
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdSecurity,
} from "react-icons/md";

export const LoginForm = forwardRef(function LoginForm(
  { username, setUsername, password, setPassword, handleLogin, loading, error },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  // Show error toast when error changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "white",
          color: "#ef4444",
          border: "1px solid #fecaca",
        },
        icon: "❌",
      });
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto" ref={ref}>
      {/* Main form container */}
      <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 border border-blue-200">
            <MdLock className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Access your academic dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username field */}
          <div className="relative">
            <label
              htmlFor="username"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                isFocused.username || username
                  ? "-top-3.5 text-xs bg-white px-2 text-blue-600"
                  : "top-3.5 text-gray-500"
              }`}
            >
              Student ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, username: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, username: false }))
                }
                placeholder={
                  isFocused.username || username ? "" : "Enter your student ID"
                }
                required
                className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 transition-all duration-300 hover:border-gray-400"
              />

              {/* Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <MdPerson className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Password field */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                isFocused.password || password
                  ? "-top-3.5 text-xs bg-white px-2 text-purple-600"
                  : "top-3.5 text-gray-500"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, password: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, password: false }))
                }
                placeholder={
                  isFocused.password || password ? "" : "Enter your password"
                }
                required
                className="w-full px-4 py-4 pr-12 bg-white border-2 border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:border-purple-500 focus:bg-purple-50/50 transition-all duration-300 hover:border-gray-400"
              />

              {/* Toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-purple-600 transition-colors duration-300"
              >
                {showPassword ? (
                  <MdVisibilityOff className="w-5 h-5" />
                ) : (
                  <MdVisibility className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Launch Dashboard</span>
                  <MdArrowForward className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="mt-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center border border-green-200">
                <MdSecurity className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-700 text-sm mb-1 flex items-center gap-2">
                  <span>Secure Authentication</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  End-to-end encryption with official DIU portal authentication.
                  Zero data retention policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
