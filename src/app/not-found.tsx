import Link from "next/link";
import { Mountain, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-surface-alt)]">
      <div className="text-center px-4">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[10rem] md:text-[14rem] font-bold text-gray-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Mountain className="w-20 h-20 text-[var(--color-primary)]/30" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you&apos;ve wandered off the trail. The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary group">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/tours"
            className="btn-outline group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Explore Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
