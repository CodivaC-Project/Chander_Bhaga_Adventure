import { SectionHeader } from "./SectionHeader";
import { TourCard } from "@/components/cards/TourCard";

const featuredPackages = [
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
];

export function FeaturedPackages() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[var(--color-accent)]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-[var(--color-primary)]/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeader
          title="Popular Tour Packages"
          subtitle="Explore our handcrafted tour packages designed to give you the best of Kashmir and beyond."
          ctaLabel="View All Packages"
          ctaHref="/tours"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <TourCard key={pkg.slug} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
