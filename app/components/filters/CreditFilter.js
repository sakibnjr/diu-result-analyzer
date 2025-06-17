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
    <div className="space-y-3 sm:space-y-5">
      <label className="text-xs sm:text-sm font-semibold text-gray-900 tracking-tight uppercase">
        {showCoursesDirectly ? "Credits" : "Credit Range"}
      </label>

      {showCoursesDirectly ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          {availableCredits.map((credit) => {
            const isSelected = selectedCredits.includes(credit);
            return (
              <button
                key={credit}
                onClick={() => onCreditToggle(credit)}
                className={`group relative p-2 sm:p-3 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-200 ease-out ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="relative">{credit}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs text-gray-600 font-medium uppercase tracking-wide">
              Min
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={minCredits}
              onChange={(e) => onFilterChange("minCredits", e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs text-gray-600 font-medium uppercase tracking-wide">
              Max
            </label>
            <input
              type="number"
              min="0"
              placeholder="∞"
              value={maxCredits}
              onChange={(e) => onFilterChange("maxCredits", e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
