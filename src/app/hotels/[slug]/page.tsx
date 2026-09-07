import { Metadata } from "next";
import { Star, MapPin, Wifi, Car, UtensilsCrossed, Waves, Dumbbell, Check } from "lucide-react";
import { DetailHero } from "@/components/ui/DetailHero";
import { ImageGallery } from "@/components/ui/ImageReveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { notFound } from "next/navigation";
import { cache } from "react";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Restaurant: <UtensilsCrossed className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  "Room Service": <UtensilsCrossed className="w-5 h-5" />,
  Spa: <Waves className="w-5 h-5" />,
  Pool: <Waves className="w-5 h-5" />,
  Gym: <Dumbbell className="w-5 h-5" />,
};

// Shared by generateMetadata + page so a request hits Supabase once
const getHotel = cache(async (slug: string) => {
  const { data } = await supabase.from("hotels").select("*").eq("slug", slug).single();
  return data;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotel(slug);
  if (!hotel) notFound();
  return {
    title: hotel.name,
    description: hotel.description,
    alternates: { canonical: `/hotels/${slug}` },
    openGraph: {
      title: hotel.name,
      description: hotel.description,
      url: `${siteConfig.url}/hotels/${slug}`,
      images: (hotel.gallery || [])[0] ? [{ url: (hotel.gallery || [])[0] }] : undefined,
    },
  };
}

export default async function HotelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = await getHotel(slug);

  if (!hotel) notFound();

  // Room types live in their own table keyed by hotelId
  const { data: roomTypes } = await supabase
    .from("room_types")
    .select("type, price, capacity, available")
    .eq("hotelId", hotel.id)
    .order("price", { ascending: true });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Hotels", "/hotels", hotel.name, `/hotels/${hotel.slug}`),
          {
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: hotel.name,
          description: hotel.description,
          url: `${siteConfig.url}/hotels/${hotel.slug}`,
          image: (hotel.gallery || [])[0],
          starRating: hotel.stars ? { "@type": "Rating", ratingValue: hotel.stars } : undefined,
          address: {
            "@type": "PostalAddress",
            addressLocality: hotel.location,
            addressRegion: "Jammu & Kashmir",
            addressCountry: "IN",
          },
          aggregateRating:
            hotel.reviewCount > 0
              ? { "@type": "AggregateRating", ratingValue: hotel.rating, reviewCount: hotel.reviewCount }
              : undefined,
          },
        ]}
      />
      <DetailHero
        image={(hotel.gallery || [])[0]}
        title={hotel.name}
        backHref="/hotels"
        backLabel="Back to Hotels"
        badges={
          <div className="flex items-center gap-1">
            {Array.from({ length: hotel.stars }, (_, i) => (
              <Star key={i} className="w-5 h-5 fill-[var(--color-brass)] text-[var(--color-brass)]" />
            ))}
          </div>
        }
        meta={
          <>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{hotel.location}</span>
            <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-[var(--color-brass)] text-[var(--color-brass)]" />{hotel.rating} ({hotel.reviewCount} reviews)</span>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">About {hotel.name}</h2>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{hotel.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(hotel.amenities || []).map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-[var(--color-paper)] rounded-lg">
                      <span className="text-[var(--color-pine)]">{amenityIcons[amenity] || <Check className="w-5 h-5" />}</span>
                      <span className="font-medium text-[var(--color-ink)]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Room Types</h2>
                <div className="space-y-4">
                  {(roomTypes || []).map((room: any) => (
                    <div key={room.type} className="bg-white rounded-lg border border-[var(--color-line)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--color-ink)]">{room.type}</h3>
                        <p className="text-sm text-[var(--color-ink-faint)] mt-1">👤 Up to {room.capacity} guests • {room.available > 0 ? `✅ ${room.available} rooms available` : "❌ Sold out"}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[var(--color-pine)]">₹{room.price.toLocaleString("en-IN")}</span>
                          <span className="text-sm text-[var(--color-ink-soft)] block">/night</span>
                        </div>
                        <button className="btn-primary !rounded-lg" disabled={room.available === 0}>Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Gallery</h2>
                <ImageGallery
                  images={(hotel.gallery || []).map((img: string, i: number) => ({ src: img, alt: `${hotel.name} ${i + 1}` }))}
                  animation="fade"
                  columns={2}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-lg border border-[var(--color-line)] p-6">
                <div className="text-center mb-6">
                  <span className="text-sm text-[var(--color-ink-soft)]">Starting from</span>
                  <div className="text-3xl font-bold text-[var(--color-pine)]">₹{hotel.pricePerNight.toLocaleString("en-IN")}</div>
                  <span className="text-sm text-[var(--color-ink-soft)]">/night</span>
                </div>
                <a href={`tel:${siteConfig.phone}`} className="btn-primary w-full !rounded-lg mb-3">Book via Call</a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full !rounded-lg">Book via WhatsApp</a>
                <p className="text-center text-sm text-[var(--color-ink-soft)] mt-4">📞 {siteConfig.phone.replace("91", "+91 ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
