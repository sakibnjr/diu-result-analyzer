export function WelcomeAnimation({ showWelcome }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-500 ${
        showWelcome ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-500 ${
          showWelcome ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h3>
          <p className="text-gray-600">Loading your academic dashboard...</p>
        </div>
      </div>
    </div>
  );
}
