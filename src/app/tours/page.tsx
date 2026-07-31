import { Metadata } from "next";
import { SectionHeader } from "@/components/sections/SectionHeader";
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
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tour Packages
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover handcrafted tour packages for every type of traveler.
            From spiritual pilgrimages to adrenaline-pumping adventures.
          </p>
        </div>
      </section>

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
