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
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

// Featured sections read from Supabase — ISR keeps the homepage fresh
// (admin content shows up within 60s) while staying CDN-cacheable.
export const revalidate = 60;

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.jpeg`,
  image: `${siteConfig.url}/og-image.jpg`,
  telephone: `+${siteConfig.phone}`,
  email: siteConfig.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Katra",
    addressRegion: "Jammu & Kashmir",
    postalCode: (siteConfig as any).postalCode || "182301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: (siteConfig as any).geo?.latitude ?? 32.98590,
    longitude: (siteConfig as any).geo?.longitude ?? 74.94610,
  },
  areaServed: ((siteConfig as any).areaServed || []).map((a: string) => ({ "@type": "City", name: a })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: (siteConfig as any).openingHours?.days || ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: (siteConfig as any).openingHours?.opens || "09:00",
      closes: (siteConfig as any).openingHours?.closes || "20:00",
    },
  ],
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.youtube],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[travelAgencySchema, websiteSchema]} />
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
