import { SectionHeader } from "./SectionHeader";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { supabase } from "@/lib/supabase";

export async function FeaturedAdventures() {
  const { data: adventures } = await supabase
    .from("adventures")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(4);

  if (!adventures || adventures.length === 0) return null;

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
          {adventures.map((adv) => (
            <AdventureCard
              key={adv.slug}
              title={adv.title}
              slug={adv.slug}
              category={adv.category}
              location={adv.location}
              price={adv.price}
              duration={adv.duration}
              difficulty={adv.difficulty}
              image={adv.gallery?.[0] || "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"}
              rating={adv.rating}
              reviewCount={adv.reviewCount}
              featured={adv.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
