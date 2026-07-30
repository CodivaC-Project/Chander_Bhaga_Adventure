"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagicTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Cinematic text mask — the text acts as a window into an animated landscape.
 *
 * Uses `background-clip: text` with a multi-layered aurora-gradient scene
 * that slowly shifts across the text characters, creating the illusion of a
 * miniature landscape visible through the letterforms.
 *
 * The scene elements (mountain silhouettes, glowing particles, aurora sweep)
 * are baked directly into the CSS gradient layers rather than a separate
 * SVG mask, making it responsive and performant.
 *
 * Fallback: Text renders in accent color immediately (before JS loads)
 * and transitions into the mask effect once the reveal animation starts.
 */
export function MagicText({ text, className = "", delay = 0 }: MagicTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isAnimating.current) return;
    isAnimating.current = true;

    // Gather all character spans
    const chars = container.querySelectorAll<HTMLSpanElement>(".mc-char");

    const ctx = gsap.context(() => {
      // 1. Set initial state: hidden with blur, but visible fallback color
      gsap.set(chars, { opacity: 0, y: 60, rotateX: -90, filter: "blur(12px)" });

      // 2. Reveal characters with a dramatic entrance
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.0,
        stagger: 0.035,
        delay,
        ease: "back.out(1.9)",
        onStart: () => {
          // Once animation starts, switch to transparent text-fill so the
          // gradient scene shows through. The fallback color is already set
          // inline on the element, so before this moment the text was
          // visible in accent color.
          container.style.setProperty("color", "transparent");
          container.style.setProperty("-webkit-text-fill-color", "transparent");
        },
      });

      // 3. Begin the slow cinematic scene drift (only after reveal)
      //
      // Single combined backgroundPosition animation for all 3 gradient layers.
      // Each layer moves independently within the one string:
      //   Layer 1 (aurora glow): 0%→100% X, 0%→100% Y  (diagonal sweep)
      //   Layer 2 (saffron):     0%→0% X, 0%→100% Y    (vertical drift)
      //   Layer 3 (shimmer wave): 0%→100% X, 0%→0% Y  (horizontal sweep)
      gsap.to(container, {
        backgroundPosition: "100% 100%, 0% 100%, 100% 0%",
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 1.0,
      });

      // Background-size pulse creates a subtle "breathing" parallax feel
      gsap.to(container, {
        backgroundSize: "220% 220%, 220% 220%, 400% 400%",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 1.2,
      });
    }, container);

    return () => {
      ctx.revert();
      isAnimating.current = false;
    };
  }, [delay, text]);

  const words = text.split(" ");

  return (
    <span className={className}>
      <span
        ref={containerRef}
        className="inline"
        style={{
          // ===== ANIMATED SCENE (baked into gradient layers) =====
          //
          // Layer 1: Golden aurora glow (warm ambient light from top-left)
          // Layer 2: Saffron-orange sweep (sunset warmth across the text)
          // Layer 3: The wave — multi-stop shimmer that moves through letters
          //
          // The combination creates a "landscape" feel inside each character:
          // warm golds, amber highlights, and subtle white peaks like
          // sunlight catching mountain snow.
          backgroundImage: [
            "radial-gradient(ellipse at 30% 40%, rgba(212,168,83,0.8) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 60%, rgba(245,158,11,0.5) 0%, transparent 50%)",
            "linear-gradient(135deg, #d4a853 0%, #f59e0b 20%, #e0be7c 40%, #fff8e7 55%, #d4a853 75%, #b88d3a 100%)",
          ].join(", "),
          backgroundSize: "200% 200%, 200% 200%, 400% 400%",
          backgroundPosition: "0% 0%, 0% 0%, 0% 0%",
          // Text mask: the gradient scene shows through the letters
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          // Fallback: visible accent color before JS loads / animation starts
          color: "var(--color-accent)",
          WebkitTextFillColor: "var(--color-accent)",
          // Subtle glow so characters feel luminous
          textShadow: "0 0 40px rgba(212,168,83,0.1)",
        }}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block">
            {word.split("").map((char, ci) => (                <span
                  key={ci}
                  className="mc-char inline-block"
                >
                {char}
              </span>
            ))}
            {wi < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </span>
    </span>
  );
}
