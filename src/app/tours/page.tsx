import { Metadata } from "next";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TourCard } from "@/components/cards/TourCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Explore our handcrafted tour packages for Kashmir, Vaishno Devi, Leh Ladakh and more. Best prices with comfortable stays.",
};

const allPackages = [
  {
    title: "Kashmir Explorer",
    slug: "kashmir-explorer",
    destination: "Kashmir",
    duration: "6 Days / 5 Nights",
    price: 24999,
    discountPrice: 19999,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    rating: 4.9,
    reviewCount: 234,
    featured: true,
    difficulty: "easy" as const,
  },
  {
    title: "Vaishno Devi Yatra",
    slug: "vaishno-devi-yatra",
    destination: "Katra",
    duration: "3 Days / 2 Nights",
    price: 12999,
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    rating: 4.8,
    reviewCount: 189,
    featured: true,
    difficulty: "moderate" as const,
  },
  {
    title: "Gulmarg Skiing Adventure",
    slug: "gulmarg-skiing",
    destination: "Gulmarg",
    duration: "5 Days / 4 Nights",
    price: 34999,
    discountPrice: 29999,
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    difficulty: "challenging" as const,
  },
  {
    title: "Pahalgam Valley Trek",
    slug: "pahalgam-trek",
    destination: "Pahalgam",
    duration: "4 Days / 3 Nights",
    price: 18999,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 4.8,
    reviewCount: 142,
    featured: false,
    difficulty: "moderate" as const,
  },
  {
    title: "Sonmarg Expedition",
    slug: "sonmarg-expedition",
    destination: "Sonmarg",
    duration: "4 Days / 3 Nights",
    price: 22999,
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    difficulty: "easy" as const,
  },
  {
    title: "Leh Ladakh Road Trip",
    slug: "leh-ladakh-roadtrip",
    destination: "Leh Ladakh",
    duration: "8 Days / 7 Nights",
    price: 45999,
    discountPrice: 39999,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 4.9,
    reviewCount: 312,
    featured: true,
    difficulty: "challenging" as const,
  },
];

export default function ToursPage() {
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
            {allPackages.map((pkg) => (
              <TourCard key={pkg.slug} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
