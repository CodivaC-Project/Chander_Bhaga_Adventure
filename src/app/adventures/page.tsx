import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterBar } from "@/components/ui/FilterBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

// Always render fresh data from the DB — admin CRUD should appear immediately
// without needing a rebuild/redeploy (otherwise the page is statically prerendered).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kashmir Adventure Activities",
  description:
    "Adventure activities in Kashmir with certified guides — Gulmarg skiing and snowboarding, Kashmir trekking routes, river rafting, camping and paragliding across Srinagar, Gulmarg and Pahalgam.",
  alternates: { canonical: "/adventures" },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80";

export default async function AdventuresPage() {
  const { data: rawAdventures } = await supabase
    .from("adventures")
    .select("*")
    .order("createdAt", { ascending: false });

  const allAdventures = (rawAdventures || []).map((adv) => ({
    title: adv.title,
    slug: adv.slug,
    category: adv.category,
    location: adv.location,
    price: adv.price,
    duration: adv.duration,
    difficulty: adv.difficulty,
    image: adv.gallery?.[0] || DEFAULT_IMAGE,
    rating: adv.rating,
    reviewCount: adv.reviewCount,
    featured: adv.featured,
  }));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Adventure Activities",
          numberOfItems: allAdventures.length,
          itemListElement: allAdventures.map((adv, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/adventures/${adv.slug}`,
            name: adv.title,
          })),
        }}
      />
      <PageHero
        eyebrow="Adventures"
        title="Thrills in the high country"
        subtitle="Push your limits with certified-led adventures across Kashmir's most stunning landscapes."
      />

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom py-4">
          <FilterBar
            destinations={[
              "All",
              "Trekking",
              "Rafting",
              "Camping",
              "Skiing",
              "Paragliding",
              "Rock Climbing",
            ]}
            priceRanges={[
              "All",
              "Under ₹3,000",
              "₹3,000 - ₹6,000",
              "₹6,000 - ₹10,000",
              "Above ₹10,000",
            ]}
            difficulties={["All", "Easy", "Moderate", "Challenging", "Extreme"]}
          />
        </div>
      </section>

      {/* Listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAdventures.map((adv) => (
              <AdventureCard key={adv.slug} {...adv} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparisons hub */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Planning the full trip, not just one activity?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Compare group tours vs private cabs and yatra options with sourced 2026 prices:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/compare/kashmir-group-tour-vs-private-cab"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
              >
                Group tour vs private cab
              </Link>
              <Link
                href="/compare/vaishno-devi-vs-amarnath-yatra"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-pine)] hover:text-[var(--color-pine)] transition-colors"
              >
                Vaishno Devi vs Amarnath
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
