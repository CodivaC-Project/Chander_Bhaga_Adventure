import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { TourCard } from "@/components/cards/TourCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug, fromSlug } from "@/lib/slug";

export const revalidate = 60;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80";

export async function generateStaticParams() {
  const { data } = await supabase.from("tour_packages").select("destination");
  const destinations = [...new Set((data || []).map((t: { destination: string }) => t.destination).filter(Boolean))];
  return destinations.map((destination) => ({ destination: toSlug(destination) }));
}

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }): Promise<Metadata> {
  const { destination } = await params;
  const label = fromSlug(destination);
  return {
    title: `${label} Tour Packages`,
    description: `Handcrafted ${label} tour packages from Katra & Delhi — itineraries, hotels, transfers and sightseeing with licensed local operators. Compare prices and durations.`,
    alternates: { canonical: `/tours/destination/${destination}` },
    openGraph: {
      title: `${label} Tour Packages`,
      description: `Handcrafted ${label} itineraries with hotels, transfers and guided sightseeing.`,
      url: `${siteConfig.url}/tours/destination/${destination}`,
    },
  };
}

export default async function TourDestinationPage({ params }: { params: Promise<{ destination: string }> }) {
  const { destination } = await params;
  const label = fromSlug(destination);

  const { data: raw } = await supabase
    .from("tour_packages")
    .select("*")
    .order("createdAt", { ascending: false });

  const packages = (raw || [])
    .filter((pkg) => pkg.destination && toSlug(pkg.destination) === destination)
    .map((pkg) => ({
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

  if (packages.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Tours", "/tours", `${label} Tours`, `/tours/destination/${destination}`),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${label} Tour Packages`,
            numberOfItems: packages.length,
            itemListElement: packages.map((pkg, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/tours/${pkg.slug}`,
              name: pkg.title,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Tour Packages"
        title={`${label} tour packages`}
        subtitle={`Handcrafted ${label} journeys with hotels, transfers and guided sightseeing — run by licensed local operators.`}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <TourCard key={pkg.slug} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Intent-matched guide copy — gives search engines real, query-relevant
          text instead of a thin hero + card grid alone. */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
            Planning a {label} trip from Katra or Delhi
          </h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
            Most travellers book a {label} tour as part of a wider Jammu &amp; Kashmir itinerary.
            The most common plan is 5 nights / 6 days covering Srinagar, Gulmarg and Pahalgam,
            with an optional houseboat night on Dal Lake. Budget packages start around
            ₹12,500 per person, standard 5N/6D packages run ₹16,000–29,000, and luxury trips
            with premium hotels go ₹38,000+. Flights Delhi–Srinagar are typically ₹3,500–9,000
            one way.
          </p>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
            The best time to visit depends on what you want: March–May for tulip gardens and
            spring, June–August for green meadows and trekking, September–November for autumn
            colours and fewer crowds, and December–February for snow and Gulmarg skiing.
          </p>

          <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">Related trips &amp; stays</h3>
          <ul className="space-y-2 text-[var(--color-ink-soft)]">
            <li>
              <Link href="/tours" className="text-[var(--color-pine)] hover:underline font-medium">
                All Kashmir &amp; Vaishno Devi tour packages
              </Link>
            </li>
            <li>
              <Link href="/hotels" className="text-[var(--color-pine)] hover:underline font-medium">
                Hotels &amp; houseboats in Srinagar, Gulmarg and Katra
              </Link>
            </li>
            <li>
              <Link href="/taxi" className="text-[var(--color-pine)] hover:underline font-medium">
                Taxi &amp; cab service from Jammu, Srinagar and Katra
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-[var(--color-pine)] hover:underline font-medium">
                FAQs — helicopter booking, registration &amp; best time to visit
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
