import { HeroStatisticsSkeleton } from "./SkeletonComponents";

export function HeroStatistics({
  overallCGPA,
  totalSemesters,
  totalCredits,
  totalCourses,
  loading,
}) {
  if (loading) {
    return <HeroStatisticsSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 p-6 sm:p-8 md:p-10">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
        <div>
          <div className="text-blue-100 font-medium mb-2 tracking-wide uppercase text-xs sm:text-sm">
            Overall CGPA
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            {overallCGPA ? overallCGPA.toFixed(2) : "N/A"}
          </div>
        </div>
        <div className="flex flex-row gap-8 sm:gap-12">
          <div>
            <div className="text-blue-100 uppercase text-xs sm:text-sm tracking-wider font-medium mb-1">
              Semesters
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-white font-bold">
              {totalSemesters}
            </div>
          </div>
          <div>
            <div className="text-blue-100 uppercase text-xs sm:text-sm tracking-wider font-medium mb-1">
              Credits
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-white font-bold">
              {totalCredits}
            </div>
          </div>
          <div>
            <div className="text-blue-100 uppercase text-xs sm:text-sm tracking-wider font-medium mb-1">
              Courses
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-white font-bold">
              {totalCourses}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
