export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-blue-50 border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} DIU Result Analyzer
          </p>
          <p className="text-xs text-gray-500">
            Made with ❤️ for DIU students by{" "}
            <span className="font-medium">SakibNjr</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
