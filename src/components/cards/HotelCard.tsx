"use client";

import Link from "next/link";
import { MapPin, Star, Wifi, Car, UtensilsCrossed, ArrowRight } from "lucide-react";

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  restaurant: <UtensilsCrossed className="w-4 h-4" />,
};

interface HotelCardProps {
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export function HotelCard({
  name,
  slug,
  location,
  stars,
  pricePerNight,
  image,
  amenities,
  rating,
  reviewCount,
  featured,
}: HotelCardProps) {
  return (
    <Link href={`/hotels/${slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Stars */}
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            {Array.from({ length: stars }, (_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]"
              />
            ))}
          </div>

          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
                ⭐ Featured
              </span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 text-right">
            <span className="text-xl font-bold text-[var(--color-primary)]">
              ₹{pricePerNight.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-gray-500 block">/night</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
            {location}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-3 mt-3">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg"
              >
                {amenityIcons[amenity.toLowerCase()] || <span className="w-4 h-4" />}
                {amenity}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-primary)]">
              View Rooms
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
