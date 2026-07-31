import { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin, Wifi, Car, UtensilsCrossed, Waves, Dumbbell, Check } from "lucide-react";
import { DetailHero } from "@/components/ui/DetailHero";
import { ImageGallery } from "@/components/ui/ImageReveal";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Restaurant: <UtensilsCrossed className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  "Room Service": <UtensilsCrossed className="w-5 h-5" />,
  Spa: <Waves className="w-5 h-5" />,
  Pool: <Waves className="w-5 h-5" />,
  Gym: <Dumbbell className="w-5 h-5" />,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: hotel } = await supabase.from("hotels").select("*").eq("slug", slug).single();
  if (!hotel) return { title: "Hotel Not Found" };
  return { title: hotel.name, description: hotel.description };
}

export default async function HotelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: hotel } = await supabase.from("hotels").select("*").eq("slug", slug).single();

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <Link href="/hotels" className="btn-primary mt-4">Browse Hotels</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DetailHero
        image={hotel.gallery[0]}
        title={hotel.name}
        backHref="/hotels"
        backLabel="Back to Hotels"
        badges={
          <div className="flex items-center gap-1">
            {Array.from({ length: hotel.stars }, (_, i) => (
              <Star key={i} className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            ))}
          </div>
        }
        meta={
          <>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{hotel.location}</span>
            <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />{hotel.rating} ({hotel.reviewCount} reviews)</span>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {hotel.name}</h2>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-[var(--color-primary)]">{amenityIcons[amenity] || <Check className="w-5 h-5" />}</span>
                      <span className="font-medium text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Types</h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room: any) => (
                    <div key={room.type} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{room.type}</h3>
                        <p className="text-sm text-gray-500 mt-1">👤 Up to {room.capacity} guests • {room.available > 0 ? `✅ ${room.available} rooms available` : "❌ Sold out"}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[var(--color-primary)]">₹{room.price.toLocaleString("en-IN")}</span>
                          <span className="text-sm text-gray-500 block">/night</span>
                        </div>
                        <button className="btn-primary !rounded-xl" disabled={room.available === 0}>Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <ImageGallery
                  images={hotel.gallery.map((img: string, i: number) => ({ src: img, alt: `${hotel.name} ${i + 1}` }))}
                  animation="fade"
                  columns={2}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-medium)] p-6">
                <div className="text-center mb-6">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">₹{hotel.pricePerNight.toLocaleString("en-IN")}</div>
                  <span className="text-sm text-gray-500">/night</span>
                </div>
                <a href={`tel:${siteConfig.phone}`} className="btn-primary w-full !rounded-xl mb-3">Book via Call</a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full !rounded-xl">Book via WhatsApp</a>
                <p className="text-center text-sm text-gray-500 mt-4">📞 {siteConfig.phone.replace("91", "+91 ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
