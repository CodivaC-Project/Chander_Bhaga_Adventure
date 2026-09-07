import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { HotelCard } from "@/components/cards/HotelCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug } from "@/lib/slug";

// Always render fresh data from the DB — admin CRUD should appear immediately
// without needing a rebuild/redeploy (otherwise the page is statically prerendered).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hotels in Katra & Kashmir",
  description:
    "Best hotels in Katra for Vaishno Devi yatra and across Kashmir — budget stays near Banganga, family hotels near the yatra parchi counter, premium Srinagar resorts and houseboats.",
  alternates: { canonical: "/hotels" },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

export default async function HotelsPage() {
  const { data: rawHotels } = await supabase
    .from("hotels")
    .select("*")
    .order("createdAt", { ascending: false });

  const hotels = (rawHotels || []).map((hotel) => ({
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

  const locations = [...new Set((rawHotels || []).map((h) => h.location).filter(Boolean))];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Hotels in Kashmir",
          numberOfItems: hotels.length,
          itemListElement: hotels.map((hotel, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/hotels/${hotel.slug}`,
            name: hotel.name,
          })),
        }}
      />
      <PageHero
        eyebrow="Stay"
        title="Hotels across Kashmir"
        subtitle="From luxurious resorts to charming houseboats — find your perfect stay in paradise."
      />

      {/* Listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.slug} {...hotel} />
            ))}
          </div>

          {/* Programmatic location hubs */}
          {locations.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--color-ink-faint)] mb-3">Browse by location</p>
              <div className="flex flex-wrap justify-center gap-2">
                {locations.map((loc) => (
                  <Link
                    key={loc}
                    href={`/hotels/location/${toSlug(loc)}`}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
                  >
                    Hotels in {loc}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
