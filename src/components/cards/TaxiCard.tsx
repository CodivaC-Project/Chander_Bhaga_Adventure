"use client";

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
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] card-hover h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={vehicleName}
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
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
          <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold rounded-full capitalize">
            {typeLabels[type] || type}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            {capacity} Seats
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-2">{vehicleName}</h3>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <span className="text-xs text-gray-500 block">Per KM</span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              ₹{pricePerKm}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <span className="text-xs text-gray-500 block">Per Day</span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              ₹{pricePerDay.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <button
            className="btn-primary w-full !rounded-xl group"
            disabled={!available}
          >
            Book Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
