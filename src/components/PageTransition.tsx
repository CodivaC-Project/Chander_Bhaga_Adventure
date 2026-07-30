"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Skip animation on first render — page loads naturally
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Subtle entrance animation for first page
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      return;
    }

    // If currently animating, force complete the current animation first
    if (isAnimating.current) {
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 1, y: 0 });
      isAnimating.current = false;
    }

    isAnimating.current = true;

    // Animate page out
    gsap.to(el, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Animate page in
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });

    // Cleanup: kill tweens on unmount
    return () => {
      gsap.killTweensOf(el);
      isAnimating.current = false;
    };
  }, [pathname]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
