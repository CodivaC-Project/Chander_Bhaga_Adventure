"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Tag } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime?: number;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  author,
  category,
  publishedAt,
  readTime = 5,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-md">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-[var(--color-ink-faint)] mb-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime} min read
            </span>
          </div>

          <h3 className="text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-pine)] transition-colors line-clamp-2 !font-sans tracking-normal">
            {title}
          </h3>

          <p className="text-sm text-[var(--color-ink-soft)] mt-2 line-clamp-2">{excerpt}</p>

          {/* Date & CTA */}
          <div className="mt-auto pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
            <span className="text-xs text-[var(--color-ink-faint)]">
              {new Date(publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-pine)]">
              Read More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
