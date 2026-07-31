import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  challenging: "bg-orange-100 text-orange-700",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: tour } = await supabase.from("tour_packages").select("*").eq("slug", slug).single();
  if (!tour) return { title: "Tour Not Found" };
  return { title: tour.title, description: tour.description };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: tour } = await supabase.from("tour_packages").select("*").eq("slug", slug).single();
  if (!tour) notFound();

  return (
    <>
      <DetailHero
        image={tour.gallery[0]}
        title={tour.title}
        backHref="/tours"
        backLabel="Back to Tours"
        badges={
          <>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[tour.difficulty]}`}>
              {tour.difficulty}
            </span>
            {tour.featured && (
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">⭐ Featured</span>
            )}
          </>
        }
        meta={
          <>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{tour.destination}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{tour.duration}</span>
            <span className="flex items-center gap-2"><Users className="w-5 h-5" />Max {tour.maxGroupSize} people</span>
            <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />{tour.rating} ({tour.reviewCount} reviews)</span>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
                <p className="text-gray-600 leading-relaxed">{tour.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h: string) => (
                    <div key={h} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day: any) => (
                    <div key={day.day} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center font-bold">{day.day}</div>
                        <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                      </div>
                      <p className="text-gray-600 ml-13">{day.description}</p>
                      {(day.accommodation || day.meals) && (
                        <div className="flex flex-wrap gap-4 mt-3 ml-13 text-sm text-gray-500">
                          {day.accommodation && <span>🏨 {day.accommodation}</span>}
                          {day.meals && <span>🍽️ {day.meals}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <ImageGallery
                  images={tour.gallery.map((img: string, i: number) => ({ src: img, alt: `${tour.title} ${i + 1}` }))}
                  animation="clip-path"
                  columns={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {tour.includes.map((item: string) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Excluded</h3>
                  <ul className="space-y-3">
                    {tour.excludes.map((item: string) => (
                      <li key={item} className="flex items-center gap-3">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
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
