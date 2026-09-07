import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export async function FeaturedDestinations() {
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(4);

  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Explore Destinations"
          subtitle="Discover the most stunning locations in Kashmir and beyond."
          ctaLabel="View All Destinations"
          ctaHref="/destinations"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {destinations.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className={`relative group rounded-2xl overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={dest.image || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {dest.shortDescription}
                </div>
                <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-white/60">
                    {dest.attractions?.length || 0} attractions
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
