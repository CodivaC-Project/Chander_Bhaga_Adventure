import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80";

// Categories nav links to; anything else in the DB still works via direct URL.
export const CATEGORY_LABELS: Record<string, string> = {
  trekking: "Trekking",
  rafting: "Rafting",
  camping: "Camping",
  skiing: "Skiing",
  paragliding: "Paragliding",
  "rock-climbing": "Rock Climbing",
};

function label(slug: string) {
  return CATEGORY_LABELS[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Only real categories get prerendered; an unknown category 404s
export async function generateStaticParams() {
  const { data } = await supabase.from("adventures").select("category");
  const categories = [...new Set((data || []).map((a: { category: string }) => a.category).filter(Boolean))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const l = label(category);
  return {
    title: `${l} Adventures in Kashmir`,
    description: `Book ${l.toLowerCase()} adventures in Kashmir with certified guides — compare routes, prices, difficulty, and durations.`,
    alternates: { canonical: `/adventures/category/${category}` },
    openGraph: {
      title: `${l} Adventures in Kashmir`,
      description: `Certified-guided ${l.toLowerCase()} trips across Kashmir — routes, prices, and durations.`,
      url: `${siteConfig.url}/adventures/category/${category}`,
    },
  };
}

export default async function AdventureCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const l = label(category);

  const { data: raw } = await supabase
    .from("adventures")
    .select("*")
    .eq("category", category)
    .order("createdAt", { ascending: false });

  const adventures = (raw || []).map((adv) => ({
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

  if (adventures.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Adventures", "/adventures", l, `/adventures/category/${category}`),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${l} Adventures in Kashmir`,
            numberOfItems: adventures.length,
            itemListElement: adventures.map((adv, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/adventures/${adv.slug}`,
              name: adv.title,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Adventures"
        title={`${l} in Kashmir`}
        subtitle={`Certified-guided ${l.toLowerCase()} trips across Kashmir's most stunning landscapes — compare routes, prices, and difficulty.`}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventures.map((adv) => (
              <AdventureCard key={adv.slug} {...adv} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
