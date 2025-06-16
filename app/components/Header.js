export function Header({ isAuthenticated, handleLogout, loading }) {
  return (
    <div className="md:w-4/5 md:mx-auto text-center space-y-6">
      {/* Header Layout */}
      <div className="relative">
        {/* Mobile Layout - Logo and Logout side by side when authenticated */}
        {isAuthenticated && (
          <div className="sm:hidden flex items-center justify-between">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="DIU Academic Dashboard Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm rounded-lg shadow hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-150 disabled:opacity-50"
              aria-label="Logout from DIU Result Analyzer"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}

        {/* Mobile Layout - Logo and Title when not authenticated */}
        {!isAuthenticated && (
          <div className="sm:hidden flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="DIU CGPA Calculator Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              DIU CGPA Calculator
            </h1>
          </div>
        )}

        {/* Desktop Layout - Centered Logo and Title */}
        <div className="hidden sm:flex items-center justify-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Daffodil International University Result Analyzer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          {isAuthenticated ? (
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Academic Dashboard
            </h1>
          ) : (
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              DIU Result Analyzer
            </h1>
          )}
        </div>

        {/* Desktop logout button - top-right */}
        {isAuthenticated && (
          <div className="hidden sm:block absolute top-2 right-0">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm rounded-lg shadow hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-150 disabled:opacity-50"
              aria-label="Logout from DIU Result Analyzer Dashboard"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* SEO-optimized description - Only show when not authenticated */}
      {!isAuthenticated && (
        <>
          <div className="text-center space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Free SGPA & CGPA Calculator for Daffodil International University
              Students
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Calculate your DIU CGPA, SGPA, analyze academic performance, and
              download professional transcripts. Compatible with all DIU
              undergraduate programs.
            </p>
          </div>

          {/* Friendly and reassuring message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Security Shield Icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-green-800 mb-1">
                  🔐 Safe & Secure DIU Portal Login
                </h3>
                <p className="text-xs text-green-700 leading-relaxed">
                  Your DIU credentials are encrypted and secure. We use the same
                  authentication system as your official DIU student portal. No
                  academic data is stored on our servers - complete privacy
                  guaranteed.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
