import { SectionHeader } from "./SectionHeader";
import { AdventureCard } from "@/components/cards/AdventureCard";

const featuredAdventures = [
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
    title: "Chenab River Rafting",
    slug: "chenab-river-rafting",
    category: "rafting",
    location: "Chenab Valley",
    price: 4200,
    duration: "6 Hours",
    difficulty: "challenging",
    image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=800&q=80",
    rating: 4.7,
    reviewCount: 92,
    featured: true,
  },
];

export function FeaturedAdventures() {
  return (
    <section className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-custom">
        <SectionHeader
          title="Thrilling Adventures"
          subtitle="Push your limits with our exciting adventure activities led by certified professionals."
          ctaLabel="Explore All Adventures"
          ctaHref="/adventures"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAdventures.map((adv) => (
            <AdventureCard key={adv.slug} {...adv} />
          ))}
        </div>
      </div>
    </section>
  );
}
