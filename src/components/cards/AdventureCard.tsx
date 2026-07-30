"use client";

import Link from "next/link";
import {
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Mountain,
  Waves,
  Tent,
  Snowflake,
  Wind,
  Anchor,
  TreePine,
  MountainSnow,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  trekking: <Mountain className="w-5 h-5" />,
  rafting: <Waves className="w-5 h-5" />,
  camping: <Tent className="w-5 h-5" />,
  skiing: <Snowflake className="w-5 h-5" />,
  paragliding: <Wind className="w-5 h-5" />,
  bungee: <Anchor className="w-5 h-5" />,
  "zip-lining": <TreePine className="w-5 h-5" />,
  "rock-climbing": <MountainSnow className="w-5 h-5" />,
};

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  challenging: "bg-orange-100 text-orange-700",
  extreme: "bg-red-100 text-red-700",
};

interface AdventureCardProps {
  title: string;
  slug: string;
  category: string;
  location: string;
  price: number;
  duration: string;
  difficulty: string;
  image: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export function AdventureCard({
  title,
  slug,
  category,
  location,
  price,
  duration,
  difficulty,
  image,
  rating,
  reviewCount,
  featured,
}: AdventureCardProps) {
  return (
    <Link href={`/adventures/${slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category icon */}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-[var(--color-primary)]">
            {categoryIcons[category] || <Mountain className="w-5 h-5" />}
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
                ⭐ Featured
              </span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2">
            <span className="text-xl font-bold text-[var(--color-primary)]">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-gray-500 block">/person</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${difficultyColors[difficulty] || difficultyColors.moderate}`}
            >
              {difficulty}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
              {category.replace("-", " ")}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
            {title}
          </h3>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              {location}
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
            <span className="text-sm text-gray-400">({reviewCount})</span>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-primary)]">
              Book Now
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
