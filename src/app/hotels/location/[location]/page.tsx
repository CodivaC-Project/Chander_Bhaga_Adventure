import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { HotelCard } from "@/components/cards/HotelCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug, fromSlug } from "@/lib/slug";

export const revalidate = 60;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

export async function generateStaticParams() {
  const { data } = await supabase.from("hotels").select("location");
  const locations = [...new Set((data || []).map((h: { location: string }) => h.location).filter(Boolean))];
  return locations.map((location) => ({ location: toSlug(location) }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const label = fromSlug(location);
  return {
    title: `Hotels in ${label}`,
    description: `Best hotels in ${label} — budget stays, family hotels and premium resorts with real reviews, prices per night and easy booking through our Katra team.`,
    alternates: { canonical: `/hotels/location/${location}` },
    openGraph: {
      title: `Hotels in ${label}`,
      description: `Handpicked ${label} stays — budget to premium, bookable through our Katra team.`,
      url: `${siteConfig.url}/hotels/location/${location}`,
    },
  };
}

export default async function HotelLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const label = fromSlug(location);

  const { data: raw } = await supabase
    .from("hotels")
    .select("*")
    .order("createdAt", { ascending: false });

  const hotels = (raw || [])
    .filter((hotel) => hotel.location && toSlug(hotel.location) === location)
    .map((hotel) => ({
      name: hotel.name,
      slug: hotel.slug,
      location: hotel.location,
      stars: hotel.stars,
      pricePerNight: hotel.pricePerNight,
      image: hotel.gallery?.[0] || DEFAULT_IMAGE,
      amenities: hotel.amenities || [],
      rating: hotel.rating,
      reviewCount: hotel.reviewCount,
      featured: hotel.featured,
    }));

  if (hotels.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Hotels", "/hotels", `Hotels in ${label}`, `/hotels/location/${location}`),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Hotels in ${label}`,
            numberOfItems: hotels.length,
            itemListElement: hotels.map((hotel, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/hotels/${hotel.slug}`,
              name: hotel.name,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Stay"
        title={`Hotels in ${label}`}
        subtitle={`Handpicked ${label} stays — from budget rooms to premium resorts, all bookable through our Katra team.`}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.slug} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
