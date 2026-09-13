"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LineReveal } from "@/components/ui/TextReveal";
import gsap from "gsap";
import { ArrowRight, Star, MapPin, CalendarDays, Users } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-stat",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.9, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative bg-[var(--color-paper)]">
      {/* Editorial split-screen */}
      <div className="container-custom py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — editorial copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="eyebrow">Vaishno Devi · Katra, Jammu &amp; Kashmir</div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-ink)] leading-[1.05]">
              Your Vaishno Devi
              <br />
              <span className="text-[var(--color-accent)] italic">Yatra</span>, planned in Katra.
            </h1>

            <LineReveal delay={0.3}>
              <p className="text-lg text-[var(--color-ink-soft)] max-w-xl leading-relaxed">
                A licensed Katra agency for the Vaishno Devi yatra — registration, helicopter
                booking, Katra hotels and Jammu taxi handled end-to-end. We also run Kashmir tour
                packages to Srinagar, Gulmarg and Pahalgam, so your pilgrimage and your valley trip
                share one trusted local team.
              </p>
            </LineReveal>

            {/* CTAs — one solid (pilgrim primary), one quiet (Kashmir secondary) */}
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/vaishno-devi" className="btn-primary text-base px-7 py-3.5 group">
                Plan Your Yatra
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 text-[var(--color-pine)] font-semibold text-sm tracking-wide hover:text-[var(--color-accent-deep)] transition-colors border-b border-[var(--color-line-strong)] pb-1"
              >
                Kashmir Tour Packages
              </Link>
            </div>

            {/* Stats — hairline separated */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-line)] max-w-xl">
              <div className="hero-stat">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-ink)]">15,000+</div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-ink-faint)] mt-1">Travelers</div>
              </div>
              <div className="hero-stat border-l border-[var(--color-line)] pl-6">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-ink)]">50+</div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-ink-faint)] mt-1">Destinations</div>
              </div>
              <div className="hero-stat border-l border-[var(--color-line)] pl-6">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-ink)]">8+</div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-ink-faint)] mt-1">Years</div>
              </div>
            </div>
          </div>

          {/* Right — framed image, editorial caption */}
          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="hairline overflow-hidden rounded-lg bg-white relative h-[420px] lg:h-[520px]">
                <Image
                  src={HERO_IMAGE}
                  alt="Vaishno Devi yatra and Kashmir valley — Katra pilgrimage and Srinagar, Gulmarg, Pahalgam tours"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-4 py-3 bg-white hairline rounded-lg mt-3">
                <div className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                  <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                  Vaishno Devi Yatra
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-[var(--color-ink)]">
                  <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  4.9
                </div>
              </figcaption>
              <div className="absolute -bottom-4 left-6 flex items-center gap-3 bg-[var(--color-pine)] text-white text-xs px-4 py-2 rounded-md">
                <CalendarDays className="w-3.5 h-3.5 text-[var(--color-accent-light)]" />
                3 Days · 2 Nights
                <Users className="w-3.5 h-3.5 text-[var(--color-accent-light)] ml-2" />
                Group of 20
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
