import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { TourCard } from "@/components/cards/TourCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug } from "@/lib/slug";

// Always render fresh data from the DB — admin CRUD should appear immediately
// without needing a rebuild/redeploy (otherwise the page is statically prerendered).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kashmir & Vaishno Devi Tour Packages",
  description:
    "Handcrafted Kashmir tour packages from Delhi, Katra & Jammu — Srinagar, Gulmarg, Pahalgam itineraries with hotels, transfers and sightseeing. Vaishno Devi yatra packages with helicopter option.",
  alternates: { canonical: "/tours" },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80";

export default async function ToursPage() {
  const { data: allPackages } = await supabase
    .from("tour_packages")
    .select("*")
    .order("createdAt", { ascending: false });

  const packages = (allPackages || []).map((pkg) => ({
    title: pkg.title,
    slug: pkg.slug,
    destination: pkg.destination,
    duration: pkg.duration,
    price: pkg.price,
    discountPrice: pkg.discountPrice,
    image: pkg.gallery?.[0] || DEFAULT_IMAGE,
    rating: pkg.rating,
    reviewCount: pkg.reviewCount,
    featured: pkg.featured,
    difficulty: pkg.difficulty,
  }));

  const destinations = [...new Set((allPackages || []).map((pkg) => pkg.destination).filter(Boolean))];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Tour Packages",
          numberOfItems: packages.length,
          itemListElement: packages.map((pkg, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/tours/${pkg.slug}`,
            name: pkg.title,
          })),
        }}
      />
      <PageHero
        eyebrow="Tour Packages"
        title="Handcrafted journeys across Kashmir"
        subtitle="From spiritual pilgrimages to adrenaline-pumping adventures — a package for every kind of traveler."
      />

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom py-4">
          <FilterBar
            destinations={["All", "Kashmir", "Gulmarg", "Pahalgam", "Sonmarg", "Leh Ladakh", "Katra"]}
            priceRanges={["All", "Under ₹15,000", "₹15,000 - ₹25,000", "₹25,000 - ₹40,000", "Above ₹40,000"]}
            difficulties={["All", "Easy", "Moderate", "Challenging"]}
          />
        </div>
      </section>

      {/* Listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <TourCard key={pkg.slug} {...pkg} />
            ))}
          </div>

          {/* Programmatic destination hubs */}
          {destinations.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--color-ink-faint)] mb-3">Browse by destination</p>
              <div className="flex flex-wrap justify-center gap-2">
                {destinations.map((d) => (
                  <Link
                    key={d}
                    href={`/tours/destination/${toSlug(d)}`}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
                  >
                    {d} Tours
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comparisons hub */}
          <div className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Not sure which option fits your group?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Read our side-by-side guides with sourced 2026 prices before you book:
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/compare/irctc-vaishno-devi-package-vs-private-tour-operator"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
              >
                IRCTC vs private operator
              </Link>
              <Link
                href="/compare/kashmir-group-tour-vs-private-cab"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
              >
                Group tour vs private cab
              </Link>
              <Link
                href="/compare"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
              >
                All comparisons
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
