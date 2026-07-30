import { Mountain } from "lucide-react";

function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div
          className={`${sizeMap[size]} border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin`}
        />
        {size !== "sm" && (
          <Mountain className="absolute inset-0 m-auto w-3 h-3 text-[var(--color-primary)]" />
        )}
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export { LoadingSpinner, PageLoader };
