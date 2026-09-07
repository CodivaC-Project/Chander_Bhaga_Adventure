import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Check,
  X,
} from "lucide-react";
import { DetailHero } from "@/components/ui/DetailHero";
import { ImageGallery } from "@/components/ui/ImageReveal";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";

export const revalidate = 60;

const difficultyColors: Record<string, string> = {
  easy: "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
  moderate: "bg-[var(--color-brass)]/10 text-[var(--color-brass)]",
  challenging: "bg-red-50 text-red-700",
};

// Shared by generateMetadata + page so a request hits Supabase once
const getTour = cache(async (slug: string) => {
  const { data } = await supabase.from("tour_packages").select("*").eq("slug", slug).single();
  return data;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();
  return {
    title: tour.title,
    description: tour.description,
    alternates: { canonical: `/tours/${slug}` },
    openGraph: {
      title: tour.title,
      description: tour.description,
      url: `${siteConfig.url}/tours/${slug}`,
      type: "article",
      images: (tour.gallery || [])[0] ? [{ url: (tour.gallery || [])[0] }] : undefined,
    },
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();

  // Itinerary lives in its own table keyed by tourPackageId
  const { data: itinerary } = await supabase
    .from("itineraries")
    .select("day, title, description, accommodation, meals")
    .eq("tourPackageId", tour.id)
    .order("day", { ascending: true });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Tours", "/tours", tour.title, `/tours/${tour.slug}`),
          {
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.title,
          description: tour.description,
          url: `${siteConfig.url}/tours/${tour.slug}`,
          image: (tour.gallery || [])[0],
          touristType: tour.difficulty,
          itinerary: {
            "@type": "ItemList",
            numberOfItems: (itinerary || []).length,
            itemListElement: (itinerary || []).map((day: any, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "TouristAttraction", name: day.title, description: day.description },
            })),
          },
          offers: {
            "@type": "Offer",
            price: tour.discountPrice || tour.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
          aggregateRating:
            tour.reviewCount > 0
              ? {
                  "@type": "AggregateRating",
                  ratingValue: tour.rating,
                  reviewCount: tour.reviewCount,
                }
              : undefined,
          provider: {
            "@type": "TravelAgency",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            telephone: `+${siteConfig.phone}`,
            address: siteConfig.address,
          },
          },
        ]}
      />
      <DetailHero
        image={(tour.gallery || [])[0]}
        title={tour.title}
        backHref="/tours"
        backLabel="Back to Tours"
        badges={
          <>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[tour.difficulty]}`}>
              {tour.difficulty}
            </span>
            {tour.featured && (
              <span className="px-3 py-1 bg-[var(--color-brass)] text-white text-xs font-bold rounded-full">⭐ Featured</span>
            )}
          </>
        }
        meta={
          <>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{tour.destination}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{tour.duration}</span>
            <span className="flex items-center gap-2"><Users className="w-5 h-5" />Max {tour.maxGroupSize} people</span>
            <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-[var(--color-brass)] text-[var(--color-brass)]" />{tour.rating} ({tour.reviewCount} reviews)</span>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">About This Tour</h2>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{tour.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(tour.highlights || []).map((h: string) => (
                    <div key={h} className="flex items-center gap-3 p-3 bg-[var(--color-pine)]/10 rounded-lg">
                      <Check className="w-5 h-5 text-[var(--color-pine)] flex-shrink-0" />
                      <span className="text-[var(--color-ink)]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-4">
                  {(itinerary || []).map((day: any) => (
                    <div key={day.day} className="bg-white rounded-lg p-6 border border-[var(--color-line)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[var(--color-pine)] text-white rounded-lg flex items-center justify-center font-bold">{day.day}</div>
                        <h3 className="text-lg font-bold text-[var(--color-ink)]">{day.title}</h3>
                      </div>
                      <p className="text-[var(--color-ink-soft)] ml-13">{day.description}</p>
                      {(day.accommodation || day.meals) && (
                        <div className="flex flex-wrap gap-4 mt-3 ml-13 text-sm text-[var(--color-ink-faint)]">
                          {day.accommodation && <span>🏨 {day.accommodation}</span>}
                          {day.meals && <span>🍽️ {day.meals}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Gallery</h2>
                <ImageGallery
                  images={(tour.gallery || []).map((img: string, i: number) => ({ src: img, alt: `${tour.title} ${i + 1}` }))}
                  animation="clip-path"
                  columns={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {(tour.includes || []).map((item: string) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[var(--color-pine)] flex-shrink-0" />
                        <span className="text-[var(--color-ink-soft)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">What&apos;s Excluded</h3>
                  <ul className="space-y-3">
                    {(tour.excludes || []).map((item: string) => (
                      <li key={item} className="flex items-center gap-3">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-[var(--color-ink-soft)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <BookingWidget serviceType="tour" serviceId={tour.slug} price={tour.discountPrice || tour.price} originalPrice={tour.discountPrice ? tour.price : undefined} duration={tour.duration} maxGroupSize={tour.maxGroupSize} />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
