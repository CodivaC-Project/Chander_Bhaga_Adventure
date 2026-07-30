"use client";

import Link from "next/link";
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
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
                ⭐ Featured
              </span>
            )}
            {difficulty && (
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                  difficulty === "easy"
                    ? "bg-green-500/90 text-white"
                    : difficulty === "moderate"
                    ? "bg-yellow-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                {difficulty}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 text-right">
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
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
            {title}
          </h3>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              {destination}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[var(--color-primary)]" />
              {duration}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-primary)]">
              View Details
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
