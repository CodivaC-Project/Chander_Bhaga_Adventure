"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  package: string;
  avatar: string;
}

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding section-bg-pine">
      <div className="container-custom">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Travelers&apos; notes</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mt-3">
            What Our Travelers Say
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
            Don&apos;t just take our word for it — hear from travelers who explored
            Kashmir with us.
          </p>
        </div>

        <div className="relative max-w-4xl">
          {/* Testimonial card */}
          <div className="bg-white hairline rounded-lg p-8 md:p-12 shadow-[var(--shadow-soft)]">
            <Quote className="w-8 h-8 text-[var(--color-accent)] mb-6" />

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }, (_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-[var(--color-ink-soft)] leading-relaxed mb-8 font-[var(--font-playfair)] italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-[var(--color-pine)] flex items-center justify-center text-white font-bold text-base">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-[var(--color-ink-faint)]">
                    {testimonials[current].location}
                  </div>
                  <div className="text-xs text-[var(--color-accent-deep)] mt-0.5 font-medium">
                    {testimonials[current].package}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-md border border-[var(--color-line-strong)] flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-white hover:text-[var(--color-pine)] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-md border border-[var(--color-line-strong)] flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-white hover:text-[var(--color-pine)] transition-colors"
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
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-[var(--color-accent)] w-8 h-1.5"
                    : "bg-[var(--color-line-strong)] hover:bg-[var(--color-ink-faint)] w-1.5 h-1.5"
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
