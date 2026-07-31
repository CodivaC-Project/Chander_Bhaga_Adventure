"use client";

import { useState } from "react";
import { Calendar, Users, ArrowRight, Shield, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface BookingWidgetProps {
  serviceType: string;
  serviceId: string;
  price: number;
  originalPrice?: number;
  duration: string;
  maxGroupSize: number;
}

export function BookingWidget({
  serviceType,
  serviceId,
  price,
  originalPrice,
  duration,
  maxGroupSize,
}: BookingWidgetProps) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  const total = price * guests;

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-lg hairline shadow-[var(--shadow-soft)] overflow-hidden">
        {/* Price header */}
        <div className="p-6 bg-[var(--color-pine)] text-white">
          <div className="flex items-baseline gap-2">
            {originalPrice && (
              <span className="text-lg text-white/50 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-3xl font-bold">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-white/70">/person</span>
          </div>
          {originalPrice && (
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-md">
              Save ₹{(originalPrice - price).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-faint)]" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-11 pr-4 py-3 border border-[var(--color-line)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]/15 focus:border-[var(--color-pine)]"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Number of Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 border border-[var(--color-line)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]/15 focus:border-[var(--color-pine)] appearance-none"
              >
                {Array.from({ length: Math.min(maxGroupSize, 20) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-md p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                ₹{price.toLocaleString("en-IN")} × {guests} guests
              </span>
              <span className="font-medium">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[var(--color-primary)]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Book button */}
          <button className="btn-secondary w-full py-4 text-lg group">
            Book Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4 text-green-500" />
            Free cancellation up to 48 hours
          </div>

          {/* Contact */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <p className="text-center text-sm text-gray-500">Need help?</p>
            <div className="flex gap-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[var(--color-line)] rounded-md text-sm font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[var(--color-pine)] bg-[var(--color-pine)]/5 rounded-md text-sm font-medium text-[var(--color-pine)] hover:bg-[var(--color-pine)] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
