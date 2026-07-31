import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TourCard } from "@/components/cards/TourCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { CTASection } from "@/components/sections/CTASection";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Explore our handcrafted tour packages for Kashmir, Vaishno Devi, Leh Ladakh and more. Best prices with comfortable stays.",
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

  return (
    <>
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
        </div>
      </section>

      <CTASection />
    </>
  );
}
