import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

      {/* Intent-matched guide copy — strengthens ranking for "hotels in <city>" queries. */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
            Staying in {label} — what to know
          </h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
            {label} has options from budget guesthouses to premium heritage resorts. For Vaishno Devi
            pilgrims, the closest hotels to Banganga let you start the trek before dawn; for Kashmir
            trips, lakeside and gondola-side stays are the most sought-after. Most rooms are priced per
            night and include breakfast — book early for Navratri, summer weekends and the December–
            January snow season, when the town sells out.
          </p>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
            We book {label} stays daily and can bundle your hotel with taxi transfers and a tour
            package so arrival and check-in are handled end-to-end.
          </p>

          <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">Explore more</h3>
          <ul className="space-y-2 text-[var(--color-ink-soft)]">
            <li>
              <Link href="/hotels" className="text-[var(--color-pine)] hover:underline font-medium">
                All hotels &amp; houseboats
              </Link>
            </li>
            <li>
              <Link href="/tours" className="text-[var(--color-pine)] hover:underline font-medium">
                Tour packages that include {label} stays
              </Link>
            </li>
            <li>
              <Link href="/taxi" className="text-[var(--color-pine)] hover:underline font-medium">
                Taxi &amp; transfers to {label}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-[var(--color-pine)] hover:underline font-medium">
                FAQs — best areas, prices &amp; booking
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
