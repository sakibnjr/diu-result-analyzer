export function SemesterFilter({
  availableSemesters,
  selectedSemesters,
  onSemesterToggle,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Semesters ({availableSemesters.length} available)
      </label>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {availableSemesters.map((semester) => (
          <label
            key={semester}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              checked={selectedSemesters.includes(semester)}
              onChange={() => onSemesterToggle(semester)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{semester}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
