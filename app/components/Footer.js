export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 bg-white/80 backdrop-blur-md border-t-2 border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-700 font-medium">
            &copy; {currentYear} AcademicX Version 2.0
          </p>
          <p className="text-xs text-gray-600">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for
            DIU students by{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SakibNjr
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
