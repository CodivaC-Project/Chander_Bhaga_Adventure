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
  alternates: { canonical: "/" },
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
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.9859,
    longitude: 74.9461,
  },
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
