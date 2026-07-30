"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    text: "Absolutely incredible experience! The Kashmir Explorer package exceeded all our expectations. The team was professional, and every detail was taken care of.",
    package: "Kashmir Explorer",
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    location: "Mumbai",
    rating: 5,
    text: "Best adventure trip ever! The trekking experience in Pahalgam was breathtaking. Our guide was knowledgeable and made the journey unforgettable.",
    package: "Pahalgam Trek",
    avatar: "PP",
  },
  {
    name: "Amit Kumar",
    location: "Bangalore",
    rating: 5,
    text: "We booked a family trip to Vaishno Devi. The arrangements were perfect — from hotel to transport. Highly recommended for families!",
    package: "Vaishno Devi Yatra",
    avatar: "AK",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "The hotel they booked for us in Gulmarg was stunning with mountain views. The skiing lessons were a bonus! Will definitely come back.",
    package: "Gulmarg Adventure",
    avatar: "SR",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    text: "Professional service from start to finish. The WhatsApp updates and dedicated support made us feel secure throughout the trip.",
    package: "Kashmir Explorer",
    avatar: "VS",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding section-bg-pine relative overflow-hidden grain">
      {/* Decorative mountain silhouette */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
          <path d="M0 200V120L240 180L480 80L720 160L960 60L1200 140L1440 80V200H0Z" fill="var(--color-primary)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from thousands of happy
            travelers who explored Kashmir with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[var(--shadow-medium)] border border-gray-100/60">
            <Quote className="w-10 h-10 text-[var(--color-accent)]/40 mb-6" />

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }, (_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-[var(--font-playfair)] italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-pine)] flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[current].location}
                  </div>
                  <div className="text-xs text-[var(--color-accent)] mt-0.5 font-medium">
                    {testimonials[current].package}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-[var(--color-accent)] w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
