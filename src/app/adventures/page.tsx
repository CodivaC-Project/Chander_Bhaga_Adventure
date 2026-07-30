import { Metadata } from "next";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterBar } from "@/components/ui/FilterBar";

export const metadata: Metadata = {
  title: "Adventure Activities",
  description:
    "Experience thrilling adventures in Kashmir — trekking, rafting, skiing, camping, paragliding and more with certified guides.",
};

const allAdventures = [
  {
    title: "Dal Lake Kayaking",
    slug: "dal-lake-kayaking",
    category: "rafting",
    location: "Srinagar",
    price: 2500,
    duration: "3 Hours",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    rating: 4.8,
    reviewCount: 89,
    featured: true,
  },
  {
    title: "Aru Valley Trek",
    slug: "aru-valley-trek",
    category: "trekking",
    location: "Pahalgam",
    price: 5999,
    duration: "2 Days",
    difficulty: "moderate",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    rating: 4.9,
    reviewCount: 67,
    featured: true,
  },
  {
    title: "Gulmarg Gondola Ride",
    slug: "gulmarg-gondola",
    category: "skiing",
    location: "Gulmarg",
    price: 1800,
    duration: "2 Hours",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    rating: 4.7,
    reviewCount: 124,
    featured: false,
  },
  {
    title: "Lidder River Rafting",
    slug: "lidder-river-rafting",
    category: "rafting",
    location: "Pahalgam",
    price: 3500,
    duration: "4 Hours",
    difficulty: "moderate",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 4.6,
    reviewCount: 78,
    featured: false,
  },
  {
    title: "Doodhpathri Camping",
    slug: "doodhpathri-camping",
    category: "camping",
    location: "Doodhpathri",
    price: 4500,
    duration: "2 Days / 1 Night",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    rating: 4.5,
    reviewCount: 56,
    featured: false,
  },
  {
    title: "Tarsar Marsar Trek",
    slug: "tarsar-marsar-trek",
    category: "trekking",
    location: "Anantnag",
    price: 8999,
    duration: "5 Days / 4 Nights",
    difficulty: "challenging",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 4.9,
    reviewCount: 45,
    featured: true,
  },
];

export default function AdventuresPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Adventure Activities
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Push your limits with thrilling adventures in the stunning
            landscapes of Kashmir. Led by certified professionals.
          </p>
        </div>
      </section>

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
