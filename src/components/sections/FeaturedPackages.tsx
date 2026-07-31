import { SectionHeader } from "./SectionHeader";
import { TourCard } from "@/components/cards/TourCard";
import { supabase } from "@/lib/supabase";

export async function FeaturedPackages() {
  const { data: packages } = await supabase
    .from("tour_packages")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(4);

  if (!packages || packages.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
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
          {packages.map((pkg) => (
            <TourCard
              key={pkg.slug}
              title={pkg.title}
              slug={pkg.slug}
              destination={pkg.destination}
              duration={pkg.duration}
              price={pkg.price}
              discountPrice={pkg.discountPrice}
              image={pkg.gallery?.[0] || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"}
              rating={pkg.rating}
              reviewCount={pkg.reviewCount}
              featured={pkg.featured}
              difficulty={pkg.difficulty}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
