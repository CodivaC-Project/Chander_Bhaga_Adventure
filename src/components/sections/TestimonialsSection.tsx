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
    <section className="section-padding bg-[var(--color-primary)] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="20" cy="20" r="40" fill="white" />
          <circle cx="80" cy="80" r="30" fill="white" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Travelers Say
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from thousands of happy
            travelers who explored Kashmir with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <Quote className="w-12 h-12 text-[var(--color-accent)] mb-6" />

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }, (_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonials[current].location}
                  </div>
                  <div className="text-xs text-[var(--color-accent)] mt-0.5">
                    {testimonials[current].package}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-[var(--color-accent)] w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
