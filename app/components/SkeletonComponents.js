// Enhanced skeleton components with better animations
function Skeleton({ className = "", variant = "rectangular" }) {
  const baseClasses =
    "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";
  const variantClasses = variant === "circular" ? "rounded-full" : "rounded-lg";
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}></div>
  );
}

export function StudentInfoSkeleton() {
  return (
    <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4 sm:gap-5">
        <Skeleton className="h-12 w-12 sm:h-16 sm:w-16" variant="circular" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-24 sm:h-6 sm:w-32" />
          <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <Skeleton className="h-3 w-12 sm:h-4 sm:w-16 mb-2" />
          <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 mb-2" />
          <Skeleton className="h-4 w-24 sm:h-5 sm:w-32" />
        </div>
      </div>
    </div>
  );
}

export function SemesterCardSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-5 w-32 sm:h-6 sm:w-40" />
        <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-6 md:gap-8">
          <div className="text-center sm:text-left">
            <Skeleton className="h-3 w-8 sm:h-4 sm:w-12 mb-1 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-12 sm:h-6 sm:w-16 mx-auto sm:mx-0" />
          </div>
          <div className="text-center sm:text-left">
            <Skeleton className="h-3 w-12 sm:h-4 sm:w-16 mb-1 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-8 sm:h-6 sm:w-12 mx-auto sm:mx-0" />
          </div>
          <div className="text-center sm:text-left">
            <Skeleton className="h-3 w-10 sm:h-4 sm:w-14 mb-1 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-12 sm:h-6 sm:w-16 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroStatisticsSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-6 sm:p-8 md:p-10">
      <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-3 w-20 sm:h-4 sm:w-24 mb-2 bg-gray-200" />
          <Skeleton className="h-12 w-24 sm:h-16 sm:w-32 bg-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-6 sm:gap-8 md:gap-12 md:flex md:flex-row">
          <div className="text-center md:text-left">
            <Skeleton className="h-2 w-16 sm:h-3 sm:w-20 mb-1 bg-gray-200 mx-auto md:mx-0" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-12 bg-gray-200 mx-auto md:mx-0" />
          </div>
          <div className="text-center md:text-left">
            <Skeleton className="h-2 w-12 sm:h-3 sm:w-16 mb-1 bg-gray-200 mx-auto md:mx-0" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-12 bg-gray-200 mx-auto md:mx-0" />
          </div>
          <div className="text-center md:text-left">
            <Skeleton className="h-2 w-14 sm:h-3 sm:w-18 mb-1 bg-gray-200 mx-auto md:mx-0" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-12 bg-gray-200 mx-auto md:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-5 w-24 sm:h-6 sm:w-32 mb-4 sm:mb-6" />
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-end h-32 sm:h-48">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1 sm:gap-2">
              <Skeleton
                className="w-4 sm:w-8 bg-blue-200"
                style={{ height: `${Math.random() * 80 + 40}px` }}
              />
              <Skeleton className="h-2 w-8 sm:h-3 sm:w-12" />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-2 w-6 sm:h-3 sm:w-8" />
          <Skeleton className="h-2 w-6 sm:h-3 sm:w-8" />
          <Skeleton className="h-2 w-6 sm:h-3 sm:w-8" />
          <Skeleton className="h-2 w-6 sm:h-3 sm:w-8" />
        </div>
      </div>
    </div>
  );
}
