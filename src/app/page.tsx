import { HeroSection } from "@/components/hero/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { FeaturedAdventures } from "@/components/sections/FeaturedAdventures";
import { FeaturedDestinations } from "@/components/sections/FeaturedDestinations";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollReveal direction="up" y={40} duration={0.8}>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <FeaturedPackages />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <FeaturedAdventures />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <FeaturedDestinations />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <WhyChooseUs />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal direction="up" y={50} duration={0.9}>
        <LatestBlogs />
      </ScrollReveal>
      <ScrollReveal direction="up" y={30} duration={0.8}>
        <CTASection />
      </ScrollReveal>
    </>
  );
}
