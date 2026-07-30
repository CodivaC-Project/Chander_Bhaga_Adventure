"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 1,
  y = 60,
  x = 0,
  scale = 1,
  opacity = 0,
  stagger = 0,
  direction,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = {
        opacity,
        duration,
        delay,
        ease: "power3.out",
      };

      // Direction overrides
      if (direction === "up") {
        fromVars.y = y;
      } else if (direction === "down") {
        fromVars.y = -y;
      } else if (direction === "left") {
        fromVars.x = x || 60;
      } else if (direction === "right") {
        fromVars.x = x || -60;
      } else {
        fromVars.y = y;
        fromVars.x = x;
      }

      if (scale !== 1) {
        fromVars.scale = scale;
      }

      const targets = stagger > 0 ? el.children : el;

      gsap.from(targets, {
        ...fromVars,
        stagger: stagger || 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, x, scale, opacity, stagger, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
