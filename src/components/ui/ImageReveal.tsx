"use client";

import { useEffect, useRef, ImgHTMLAttributes } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps extends ImgHTMLAttributes<HTMLImageElement> {
  animation?: "clip-path" | "scale" | "fade" | "slide-up" | "slide-left" | "zoom";
  delay?: number;
  duration?: number;
  className?: string;
}

export function ImageReveal({
  animation = "clip-path",
  delay = 0,
  duration = 1,
  className = "",
  ...imgProps
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
      };

      switch (animation) {
        case "clip-path":
          gsap.set(container, { clipPath: "inset(0 100% 0 0)" });
          gsap.to(container, {
            clipPath: "inset(0 0% 0 0)",
            duration,
            delay,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.fromTo(img,
            { scale: 1.3, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: duration * 1.2,
              delay: delay + 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;

        case "scale":
          gsap.fromTo(container,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration,
              delay,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;

        case "fade":
          gsap.fromTo(container,
            { opacity: 0 },
            {
              opacity: 1,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;

        case "slide-up":
          gsap.fromTo(container,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;

        case "slide-left":
          gsap.fromTo(container,
            { opacity: 0, x: 80 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;

        case "zoom":
          gsap.fromTo(img,
            { scale: 1.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: duration * 1.3,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [animation, delay, duration]);

  return (
    <div ref={containerRef} className={`overflow-hidden rounded-lg relative ${className}`}>
      <Image
        ref={imgRef}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        {...(imgProps as any)}
      />
    </div>
  );
}

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  animation?: "clip-path" | "scale" | "fade" | "slide-up" | "slide-left" | "zoom";
  className?: string;
  columns?: 2 | 3 | 4;
}

export function ImageGallery({
  images,
  animation = "clip-path",
  className = "",
  columns = 2,
}: ImageGalleryProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {images.map((image, i) => (
        <ImageReveal
          key={i}
          src={image.src}
          alt={image.alt}
          animation={animation}
          delay={i * 0.15}
          duration={0.8}
          className="h-64"
        />
      ))}
    </div>
  );
}
