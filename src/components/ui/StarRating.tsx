"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          >
            <Star
              className={`${sizeMap[size]} ${
                filled || halfFilled
                  ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function RatingDisplay({
  rating,
  count,
}: {
  rating: number;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <StarRating rating={rating} size="sm" />
      <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-500">({count} reviews)</span>
      )}
    </div>
  );
}

export { StarRating, RatingDisplay };
