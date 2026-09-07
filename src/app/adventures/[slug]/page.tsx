import { Metadata } from "next";
import { Clock, MapPin, Users, Star, Check, Shield, Calendar } from "lucide-react";
import { DetailHero } from "@/components/ui/DetailHero";
import { ImageGallery } from "@/components/ui/ImageReveal";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { notFound } from "next/navigation";
import { cache } from "react";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const difficultyColors: Record<string, string> = {
  easy: "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
  moderate: "bg-[var(--color-brass)]/10 text-[var(--color-brass)]",
  challenging: "bg-red-50 text-red-700",
  extreme: "bg-red-50 text-red-700",
};

// Shared by generateMetadata + page so a request hits Supabase once
const getAdventure = cache(async (slug: string) => {
  const { data } = await supabase.from("adventures").select("*").eq("slug", slug).single();
  return data;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const adventure = await getAdventure(slug);
  if (!adventure) notFound();
  return {
    title: adventure.title,
    description: adventure.description,
    alternates: { canonical: `/adventures/${slug}` },
    openGraph: {
      title: adventure.title,
      description: adventure.description,
      url: `${siteConfig.url}/adventures/${slug}`,
      images: (adventure.gallery || [])[0] ? [{ url: (adventure.gallery || [])[0] }] : undefined,
    },
  };
}

export default async function AdventureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adventure = await getAdventure(slug);

  if (!adventure) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Adventures", "/adventures", adventure.title, `/adventures/${adventure.slug}`),
          {
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: adventure.title,
          description: adventure.description,
          url: `${siteConfig.url}/adventures/${adventure.slug}`,
          image: (adventure.gallery || [])[0],
          address: {
            "@type": "PostalAddress",
            addressLocality: adventure.location,
            addressRegion: "Jammu & Kashmir",
            addressCountry: "IN",
          },
          isAccessibleForFree: false,
          publicAccess: true,
          offers: {
            "@type": "Offer",
            price: adventure.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
          },
        ]}
      />
      <DetailHero
        image={(adventure.gallery || [])[0]}
        title={adventure.title}
        backHref="/adventures"
        backLabel="Back to Adventures"
        badges={
          <>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[adventure.difficulty]}`}>{adventure.difficulty}</span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full capitalize">{(adventure.category || "").replace("-", " ")}</span>
          </>
        }
        meta={
          <>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{adventure.location}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{adventure.duration}</span>
            <span className="flex items-center gap-2"><Users className="w-5 h-5" />Max {adventure.maxGroupSize} people</span>
            <span className="flex items-center gap-2"><Calendar className="w-5 h-5" />Min age: {adventure.minAge}</span>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">About This Activity</h2>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{adventure.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">What&apos;s Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(adventure.includes || []).map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-[var(--color-pine)]/10 rounded-lg">
                      <Check className="w-5 h-5 text-[var(--color-pine)] flex-shrink-0" />
                      <span className="text-[var(--color-ink)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Safety Measures</h2>
                <div className="space-y-3">
                  {(adventure.safetyMeasures || []).map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-[var(--color-brass)]/10 rounded-lg">
                      <Shield className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0" />
                      <span className="text-[var(--color-ink)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Gallery</h2>
                <ImageGallery
                  images={(adventure.gallery || []).map((img: string, i: number) => ({ src: img, alt: `${adventure.title} ${i + 1}` }))}
                  animation="scale"
                  columns={2}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <BookingWidget serviceType="adventure" serviceId={adventure.slug} price={adventure.price} duration={adventure.duration} maxGroupSize={adventure.maxGroupSize} />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
