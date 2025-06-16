import { StudentInfoSkeleton } from "./SkeletonComponents";

export function StudentInfoCard({ studentInfo, loading }) {
  if (loading) {
    return <StudentInfoSkeleton />;
  }

  if (!studentInfo) {
    return null;
  }

  return (
    <div className="h-full flex flex-col justify-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl">
      <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center text-lg sm:text-2xl font-bold text-white shadow-lg">
          {studentInfo.name?.split(" ")[0]?.[0] || "S"}
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {studentInfo.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 font-mono mt-1">
            ID: {studentInfo.id}
          </div>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-5">
        <div>
          <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
            Batch
          </div>
          <div className="font-mono text-gray-900 text-base sm:text-lg">
            {studentInfo.batch}
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
            Program
          </div>
          <div className="font-mono text-gray-900 text-base sm:text-lg">
            {studentInfo.program}
          </div>
        </div>
      </div>
    </div>
  );
}
