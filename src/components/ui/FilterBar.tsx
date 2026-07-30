"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface FilterBarProps {
  destinations: string[];
  priceRanges: string[];
  difficulties: string[];
}

export function FilterBar({
  destinations,
  priceRanges,
  difficulties,
}: FilterBarProps) {
  const [activeDestination, setActiveDestination] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const hasFilters =
    activeDestination !== "All" ||
    activePriceRange !== "All" ||
    activeDifficulty !== "All";

  const clearFilters = () => {
    setActiveDestination("All");
    setActivePriceRange("All");
    setActiveDifficulty("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />

        {/* Destination filter */}
        <div className="flex flex-wrap gap-1.5">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setActiveDestination(dest)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeDestination === dest
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block" />

        {/* Difficulty filter */}
        <div className="flex flex-wrap gap-1.5">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeDifficulty === diff
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
