"use client";

import Link from "next/link";
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
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime} min read
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{excerpt}</p>

          {/* Date & CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {new Date(publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
              Read More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
