import { Metadata } from "next";
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
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hotels in Kashmir
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From luxurious resorts to charming houseboats — find your perfect
            stay in paradise.
          </p>
        </div>
      </section>

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
