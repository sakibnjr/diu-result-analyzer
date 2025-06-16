export function GradeFilter({
  availableGrades,
  selectedGrades,
  onGradeToggle,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Grade Letters
      </label>
      <div className="flex flex-wrap gap-2">
        {availableGrades.map((grade) => (
          <button
            key={grade}
            onClick={() => onGradeToggle(grade)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedGrades.includes(grade)
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {grade}
          </button>
        ))}
      </div>
    </div>
  );
}
