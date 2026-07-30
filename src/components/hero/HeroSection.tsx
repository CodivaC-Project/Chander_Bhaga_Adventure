"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { TextReveal, LineReveal, WordReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import gsap from "gsap";
import {
  Mountain,
  ArrowRight,
  Play,
  Star,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const discountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge entrance
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
      );

      // Stats stagger
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 1.5, ease: "power3.out" }
      );

      // CTA buttons
      gsap.fromTo(ctaRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, delay: 1.8, ease: "back.out(1.7)" }
      );

      // Feature card
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 100, rotateY: -15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, delay: 0.8, ease: "power3.out" }
      );

      // Discount badge bounce
      gsap.fromTo(discountRef.current,
        { opacity: 0, scale: 0, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, delay: 1.5, ease: "elastic.out(1, 0.3)" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden hero-bg"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Mountain silhouettes */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 400"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400V200L200 300L400 150L600 280L800 100L1000 250L1200 80L1440 200V400H0Z"
            fill="rgba(255,255,255,0.05)"
          />
          <path
            d="M0 400V250L300 350L600 180L900 320L1200 150L1440 250V400H0Z"
            fill="rgba(255,255,255,0.08)"
          />
          <path
            d="M0 400V300L200 380L400 280L600 360L800 220L1000 340L1200 200L1440 300V400H0Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-white/30 rounded-full animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-60 left-[30%] w-1.5 h-1.5 bg-white/25 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 right-[25%] w-2.5 h-2.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="flex items-center gap-1 text-[var(--color-accent)]">
                <Star className="w-4 h-4 fill-[var(--color-accent)]" />
                <Star className="w-4 h-4 fill-[var(--color-accent)]" />
                <Star className="w-4 h-4 fill-[var(--color-accent)]" />
                <Star className="w-4 h-4 fill-[var(--color-accent)]" />
                <Star className="w-4 h-4 fill-[var(--color-accent)]" />
              </span>
              <span className="text-sm font-medium">4.9 Rated Tourism Company</span>
            </div>

            {/* Heading with text reveal */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <TextReveal text="Discover the" delay={0.5} className="block" />
                <TextReveal text="Magic of Kashmir" delay={0.8} className="block text-[var(--color-accent)]" />
              </h1>
              <LineReveal delay={1.2}>
                <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                  Experience breathtaking valleys, thrilling adventures, and warm
                  hospitality with India&apos;s most trusted Kashmir tour operators.
                </p>
              </LineReveal>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">15,000+</div>
                  <div className="text-sm text-white/60">Happy Travelers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-white/60">Destinations</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">8+</div>
                  <div className="text-sm text-white/60">Years Experience</div>
                </div>
              </div>
            </div>

            {/* CTAs with magnetic effect */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <MagneticButton strength={0.4}>
                <Link
                  href="/tours"
                  className="btn-secondary text-lg !px-8 !py-4 group"
                >
                  <Mountain className="w-5 h-5" />
                  Explore Packages
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <Link
                  href="/adventures"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <Play className="w-5 h-5" />
                  Adventure Awaits
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right - Feature card */}
          <div className="hidden lg:block">
            <div ref={cardRef} className="relative">
              <div className="glass rounded-3xl p-8 space-y-6">
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                  <Mountain className="w-20 h-20 text-white/80" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="accent">Featured</Badge>
                    <Badge variant="primary">Best Seller</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                    Kashmir Explorer
                  </h3>
                  <p className="text-gray-600 mt-2">
                    6 Days / 5 Nights of pure magic through Gulmarg, Pahalgam &amp; Srinagar
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">
                        ₹24,999
                      </div>
                    </div>
                    <Link
                      href="/tours/kashmir-explorer"
                      className="btn-primary !rounded-xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating discount badge */}
              <div ref={discountRef} className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--color-accent)] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg animate-float">
                <span className="text-xs font-medium">Up to</span>
                <span className="text-xl font-bold">30%</span>
                <span className="text-[10px]">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) {
  const variants: Record<string, string> = {
    accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)]",
    primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant] || variants.primary}`}
    >
      {children}
    </span>
  );
}
