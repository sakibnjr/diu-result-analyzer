export function CreditFilter({
  showCoursesDirectly,
  availableCredits,
  selectedCredits,
  minCredits,
  maxCredits,
  onCreditToggle,
  onFilterChange,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {showCoursesDirectly
          ? "Course Credits"
          : "Credits Range (Semester Total)"}
      </label>
      {showCoursesDirectly ? (
        <div className="flex flex-wrap gap-2">
          {availableCredits.map((credit) => (
            <button
              key={credit}
              onClick={() => onCreditToggle(credit)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                selectedCredits.includes(credit)
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {credit}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minCredits}
              onChange={(e) => onFilterChange("minCredits", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxCredits}
              onChange={(e) => onFilterChange("maxCredits", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
