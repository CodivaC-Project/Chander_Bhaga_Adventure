"use client";

import Image from "next/image";
import { Car, Users, Fuel, Check, ArrowRight } from "lucide-react";

interface TaxiCardProps {
  vehicleName: string;
  type: string;
  capacity: number;
  pricePerKm: number;
  pricePerDay: number;
  features: string[];
  image: string;
  available: boolean;
  slug: string;
}

const typeLabels: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  tempo: "Tempo Traveller",
  bus: "Bus",
};

export function TaxiCard({
  vehicleName,
  type,
  capacity,
  pricePerKm,
  pricePerDay,
  features,
  image,
  available,
}: TaxiCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden card-hover h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[var(--color-paper)]">
        <Image
          src={image}
          alt={vehicleName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
        {!available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">
              Not Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)] text-xs font-semibold rounded-md capitalize">
            {typeLabels[type] || type}
          </span>
          <div className="flex items-center gap-1 text-sm text-[var(--color-ink-soft)]">
            <Users className="w-4 h-4" />
            {capacity} Seats
          </div>
        </div>

        <h3 className="text-lg font-bold text-[var(--color-ink)] mt-2 !font-sans tracking-normal">{vehicleName}</h3>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-md p-3 text-center">
            <span className="text-xs text-[var(--color-ink-faint)] block">Per KM</span>
            <span className="text-lg font-bold text-[var(--color-pine)]">
              ₹{pricePerKm}
            </span>
          </div>
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-md p-3 text-center">
            <span className="text-xs text-[var(--color-ink-faint)] block">Per Day</span>
            <span className="text-lg font-bold text-[var(--color-pine)]">
              ₹{pricePerDay.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]"
            >
              <Check className="w-4 h-4 text-[var(--color-pine)] flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <button
            className="btn-primary w-full group"
            disabled={!available}
          >
            Book Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
