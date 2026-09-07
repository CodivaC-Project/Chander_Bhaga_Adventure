"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="bg-white rounded-lg overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Stars */}
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white hairline px-3 py-1.5 rounded-md">
            {Array.from({ length: stars }, (_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]"
              />
            ))}
          </div>

          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-md">
                Featured
              </span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white hairline rounded-md px-4 py-2 text-right">
            <span className="text-xl font-bold text-[var(--color-primary)]">
              ₹{pricePerNight.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-gray-500 block">/night</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-pine)] transition-colors line-clamp-1 !font-sans tracking-normal">
            {name}
          </h3>

          <div className="flex items-center gap-1 mt-2 text-sm text-[var(--color-ink-soft)]">
            <MapPin className="w-4 h-4 text-[var(--color-accent-deep)]" />
            {location}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-ink)]">{rating.toFixed(1)}</span>
            <span className="text-sm text-[var(--color-ink-faint)]">({reviewCount} reviews)</span>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-3 mt-3">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 text-xs text-[var(--color-ink-soft)] bg-[var(--color-paper)] px-2 py-1 rounded-md border border-[var(--color-line)]"
              >
                {amenityIcons[amenity.toLowerCase()] || <span className="w-4 h-4" />}
                {amenity}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-pine)]">
              View Rooms
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-pine)] transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
