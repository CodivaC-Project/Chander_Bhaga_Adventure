"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";

interface TourCardProps {
  title: string;
  slug: string;
  destination: string;
  duration: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  difficulty?: string;
}

export function TourCard({
  title,
  slug,
  destination,
  duration,
  price,
  discountPrice,
  image,
  rating,
  reviewCount,
  featured,
  difficulty,
}: TourCardProps) {
  return (
    <Link href={`/tours/${slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-md">
                Featured
              </span>
            )}
            {difficulty && (
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-md capitalize ${
                  difficulty === "easy"
                    ? "bg-[var(--color-pine)]/85 text-white"
                    : difficulty === "moderate"
                    ? "bg-[var(--color-accent)]/90 text-white"
                    : "bg-[var(--color-danger)]/90 text-white"
                }`}
              >
                {difficulty}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white hairline rounded-md px-4 py-2 text-right">
              {discountPrice && (
                <span className="text-xs text-gray-400 line-through block">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-xl font-bold text-[var(--color-primary)]">
                ₹{(discountPrice || price).toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500 block">/person</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-pine)] transition-colors line-clamp-1 !font-sans tracking-normal">
            {title}
          </h3>

          <div className="flex items-center gap-4 mt-3 text-sm text-[var(--color-ink-soft)]">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[var(--color-accent-deep)]" />
              {destination}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[var(--color-pine)]" />
              {duration}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-ink)]">{rating.toFixed(1)}</span>
            <span className="text-sm text-[var(--color-ink-faint)]">({reviewCount} reviews)</span>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-pine)]">
              View Details
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-pine)] transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
