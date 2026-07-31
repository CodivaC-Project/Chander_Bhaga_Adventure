import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterBar } from "@/components/ui/FilterBar";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Adventure Activities",
  description:
    "Experience thrilling adventures in Kashmir — trekking, rafting, skiing, camping, paragliding and more with certified guides.",
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

      <CTASection />
    </>
  );
}
