import { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Users, Star, Check, Shield, Calendar } from "lucide-react";
import { DetailHero } from "@/components/ui/DetailHero";
import { ImageGallery } from "@/components/ui/ImageReveal";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

const adventures: Record<string, any> = {
  "aru-valley-trek": {
    title: "Aru Valley Trek",
    slug: "aru-valley-trek",
    description: "Trek through the breathtaking Aru Valley in Pahalgam, one of Kashmir's most pristine destinations.",
    category: "trekking",
    location: "Pahalgam, Kashmir",
    price: 5999,
    duration: "2 Days",
    difficulty: "moderate",
    minAge: 14,
    maxGroupSize: 15,
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    includes: ["Professional Trek Guide", "Camping Equipment", "Meals", "Transport from Pahalgam", "First Aid Kit", "Permits"],
    safetyMeasures: ["Certified and experienced guides", "First aid kit and emergency communication", "Weather monitoring before departure", "Safety briefing before trek starts", "Emergency evacuation plan"],
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
  },
};

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  challenging: "bg-orange-100 text-orange-700",
  extreme: "bg-red-100 text-red-700",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const adventure = adventures[slug];
  if (!adventure) return { title: "Adventure Not Found" };
  return { title: adventure.title, description: adventure.description };
}

export default async function AdventureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adventure = adventures[slug];

  if (!adventure) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Adventure Not Found</h1>
          <p className="text-gray-500 mb-8">The adventure you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/adventures" className="btn-primary">Browse Adventures</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DetailHero
        image={adventure.gallery[0]}
        title={adventure.title}
        backHref="/adventures"
        backLabel="Back to Adventures"
        badges={
          <>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[adventure.difficulty]}`}>{adventure.difficulty}</span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full capitalize">{adventure.category.replace("-", " ")}</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Activity</h2>
                <p className="text-gray-600 leading-relaxed">{adventure.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {adventure.includes.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Measures</h2>
                <div className="space-y-3">
                  {adventure.safetyMeasures.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <ImageGallery
                  images={adventure.gallery.map((img: string, i: number) => ({ src: img, alt: `${adventure.title} ${i + 1}` }))}
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
