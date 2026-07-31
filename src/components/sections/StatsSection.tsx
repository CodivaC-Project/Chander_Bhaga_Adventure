"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, MapPin, Award, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Users,
    value: "15,000+",
    label: "Happy Travelers",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Destinations",
  },
  {
    icon: Award,
    value: "8+",
    label: "Years Experience",
  },
  {
    icon: Heart,
    value: "4.9",
    label: "Average Rating",
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".stat-item");

      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-[var(--color-line)]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-[var(--color-line)]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item px-4 md:px-8 py-6 md:py-0 text-center ${
                i >= 2 ? "border-t md:border-t-0 border-[var(--color-line)]" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[var(--color-accent-deep)]" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
