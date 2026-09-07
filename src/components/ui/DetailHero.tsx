"use client";

import { useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";

interface DetailHeroProps {
  image: string;
  title: string;
  backHref: string;
  backLabel: string;
  badges?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}

export function DetailHero({
  image,
  title,
  backHref,
  backLabel,
  badges,
  meta,
  children,
}: DetailHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once on mount
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Back link
      gsap.fromTo(
        backRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );

      // Badges
      if (badgesRef.current) {
        gsap.fromTo(
          badgesRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.35,
            ease: "power2.out",
          }
        );
      }

      // Title - character reveal
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.className = "char";
          titleRef.current!.appendChild(span);
        });

        gsap.fromTo(
          titleRef.current.querySelectorAll(".char"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            delay: 0.5,
            ease: "power2.out",
          }
        );
      }

      // Meta info
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current.children,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            delay: 1.0,
            ease: "power2.out",
          }
        );
      }

      // Children (price widget, etc.)
      if (childrenRef.current) {
        gsap.fromTo(
          childrenRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: "power2.out" }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[50vh] min-h-[400px]">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 container-custom flex flex-col justify-end pb-12">
        {/* Back link */}
        <Link
          ref={backRef}
          href={backHref}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 w-fit transition-colors opacity-0"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>

        {/* Badges */}
        {badges && (
          <div ref={badgesRef} className="flex flex-wrap items-center gap-3 mb-4">
            {badges}
          </div>
        )}

        {/* Title with char reveal */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ perspective: "1000px" }}
        >
          {title}
        </h1>

        {/* Meta info */}
        {meta && (
          <div ref={metaRef} className="flex flex-wrap items-center gap-6 text-white/70">
            {meta}
          </div>
        )}

        {/* Children (price widget, etc.) */}
        {children && (
          <div ref={childrenRef} className="mt-4 opacity-0">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
