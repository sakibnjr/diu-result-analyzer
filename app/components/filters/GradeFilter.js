export function GradeFilter({
  availableGrades,
  selectedGrades,
  onGradeToggle,
}) {
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-700 bg-green-100 border-green-200";
      case "A-":
      case "B+":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "B":
      case "B-":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "F":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-900 tracking-tight">
        🎯 Grade
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-1.5 sm:gap-2">
        {availableGrades.map((grade) => {
          const isSelected = selectedGrades.includes(grade);
          return (
            <button
              key={grade}
              onClick={() => onGradeToggle(grade)}
              className={`px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs font-semibold rounded-md sm:rounded-lg border transition-all duration-200 ${
                isSelected
                  ? getGradeColor(grade)
                  : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {grade}
            </button>
          );
        })}
      </div>
    </div>
  );
}
