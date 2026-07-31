import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { HotelCard } from "@/components/cards/HotelCard";
import { CTASection } from "@/components/sections/CTASection";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Hotels in Kashmir",
  description:
    "Book the best hotels in Kashmir — from luxury resorts to cozy guesthouses. Comfortable stays with stunning mountain views.",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

export default async function HotelsPage() {
  const { data: rawHotels } = await supabase
    .from("hotels")
    .select("*")
    .order("createdAt", { ascending: false });

  const hotels = (rawHotels || []).map((hotel) => ({
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    pricePerNight: hotel.pricePerNight,
    image: hotel.gallery?.[0] || DEFAULT_IMAGE,
    amenities: hotel.amenities || [],
    rating: hotel.rating,
    reviewCount: hotel.reviewCount,
    featured: hotel.featured,
  }));
  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Hotels across Kashmir"
        subtitle="From luxurious resorts to charming houseboats — find your perfect stay in paradise."
      />

      {/* Listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.slug} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
