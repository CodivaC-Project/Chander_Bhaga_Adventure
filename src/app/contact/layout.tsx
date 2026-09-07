import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shri Mata Vaishno Devi Travels in Katra, Jammu & Kashmir. Call, WhatsApp, or send us a message to plan your Kashmir trip.",
  alternates: { canonical: "/contact" },
};

// ContactPage is a client component, so the page-level schema lives here.
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Katra",
      addressRegion: "Jammu & Kashmir",
      addressCountry: "IN",
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={contactSchema} />
      {children}
    </>
  );
}
