import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Gulmarg",
    slug: "gulmarg",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    description: "Meadow of Flowers & Skiing Paradise",
    tours: 12,
  },
  {
    name: "Pahalgam",
    slug: "pahalgam",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Valley of Shepherds",
    tours: 8,
  },
  {
    name: "Srinagar",
    slug: "srinagar",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    description: "Paradise on Earth",
    tours: 15,
  },
  {
    name: "Sonmarg",
    slug: "sonmarg",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    description: "Meadow of Gold",
    tours: 6,
  },
  {
    name: "Leh Ladakh",
    slug: "leh-ladakh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Roof of the World",
    tours: 10,
  },
  {
    name: "Vaishno Devi",
    slug: "vaishno-devi",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    description: "Sacred Pilgrimage",
    tours: 5,
  },
];

export function FeaturedDestinations() {
  return (
    <section className="section-padding section-bg-pine grain relative">
      <div className="container-custom">
        <SectionHeader
          title="Explore Destinations"
          subtitle="From snow-capped peaks to serene valleys, discover the most beautiful corners of Kashmir."
          ctaLabel="All Destinations"
          ctaHref="/destinations"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/tours?destination=${dest.slug}`}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${i === 0 ? "h-80 md:h-full" : "h-64"}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {dest.description}
                </div>
                <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-white/60">
                    {dest.tours} tour packages
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--color-accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
