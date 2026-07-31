"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function WhatsAppButton() {
  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I'm interested in booking an adventure with Shri Mata Vaishno Devi. Can you help me?"
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Button */}
        <div className="w-14 h-14 bg-[var(--color-pine)] rounded-full flex items-center justify-center border border-white/20 shadow-[var(--shadow-soft)] hover:bg-[var(--color-pine-light)] transition-colors">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[var(--color-pine-deep)] text-white text-xs px-3 py-2 rounded-md whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      </div>
    </a>
  );
}
