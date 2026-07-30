import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start"} mb-12`}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl leading-relaxed ${
            light ? "text-white/70" : "text-gray-500"
          } ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-light)] transition-colors group"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
