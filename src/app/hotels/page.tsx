import { Metadata } from "next";
import { HotelCard } from "@/components/cards/HotelCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Hotels in Kashmir",
  description:
    "Book the best hotels in Kashmir — from luxury resorts to cozy guesthouses. Comfortable stays with stunning mountain views.",
};

const hotels = [
  {
    name: "The Highland Resort",
    slug: "highland-resort",
    location: "Gulmarg",
    stars: 5,
    pricePerNight: 12999,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Spa", "Parking", "Room Service"],
    rating: 4.9,
    reviewCount: 156,
    featured: true,
  },
  {
    name: "Dal Lake Heritage Houseboat",
    slug: "dal-lake-houseboat",
    location: "Srinagar",
    stars: 4,
    pricePerNight: 8999,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Shikara", "Room Service"],
    rating: 4.8,
    reviewCount: 203,
    featured: true,
  },
  {
    name: "Pahalgam Valley Inn",
    slug: "pahalgam-valley-inn",
    location: "Pahalgam",
    stars: 4,
    pricePerNight: 6999,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Parking", "Garden"],
    rating: 4.6,
    reviewCount: 89,
    featured: false,
  },
  {
    name: "Kashmir Palace Hotel",
    slug: "kashmir-palace",
    location: "Srinagar",
    stars: 5,
    pricePerNight: 15999,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Spa", "Pool", "Gym", "Room Service"],
    rating: 4.9,
    reviewCount: 278,
    featured: true,
  },
  {
    name: "Sonmarg Mountain Lodge",
    slug: "sonmarg-lodge",
    location: "Sonmarg",
    stars: 3,
    pricePerNight: 4999,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Parking"],
    rating: 4.5,
    reviewCount: 67,
    featured: false,
  },
  {
    name: "Gulmarg Ski Resort",
    slug: "gulmarg-ski-resort",
    location: "Gulmarg",
    stars: 4,
    pricePerNight: 9999,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    amenities: ["WiFi", "Restaurant", "Ski Storage", "Equipment Rental"],
    rating: 4.7,
    reviewCount: 134,
    featured: false,
  },
];

export default function HotelsPage() {
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
