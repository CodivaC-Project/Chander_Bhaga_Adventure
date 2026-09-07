import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTASection } from "@/components/sections/CTASection";
import {
  Mountain,
  Users,
  Award,
  Heart,
  Shield,
  MapPin,
  Target,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Shri Mata Vaishno Devi — Kashmir's trusted tourism partner with 8+ years of experience in creating unforgettable travel experiences.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Sidhant Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Passionate about Kashmir tourism with 8+ years of experience in the travel industry.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 2016 · Katra"
        title="About Shri Mata Vaishno Devi"
        subtitle="Your gateway to Kashmir's untouched beauty."
      />

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2016, Shri Mata Vaishno Devi began with a simple
                  mission — to share the breathtaking beauty of Kashmir with the
                  world. What started as a small family-run tour operation has
                  grown into one of Kashmir&apos;s most trusted tourism companies.
                </p>
                <p>
                  Based in Katra, Vaishno Devi, Jammu & Kashmir, we specialize
                  in crafting personalized travel experiences that showcase the
                  best of our homeland. From the serene Dal Lake to the
                  snow-capped peaks of Gulmarg, we know every hidden gem and
                  secret spot.
                </p>
                <p>
                  With over 15,000 happy travelers and a 4.9-star rating, we
                  take pride in our attention to detail, safety standards, and
                  the warm hospitality that Kashmir is known for.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--color-primary)]/5 rounded-2xl p-6 text-center">
                <Users className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm text-gray-500">Happy Travelers</div>
              </div>
              <div className="bg-[var(--color-accent)]/5 rounded-2xl p-6 text-center">
                <Award className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">8+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="bg-[var(--color-accent)]/5 rounded-2xl p-6 text-center">
                <MapPin className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Destinations</div>
              </div>
              <div className="bg-[var(--color-primary)]/5 rounded-2xl p-6 text-center">
                <Heart className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)]">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide safe, affordable, and unforgettable travel
                experiences that showcase the true beauty of Kashmir while
                supporting local communities and preserving our natural heritage.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)]">
              <div className="w-14 h-14 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and recommended tourism company in
                Kashmir, known for our commitment to safety, sustainability, and
                creating life-changing travel experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "Every activity is conducted with certified guides, proper equipment, and comprehensive safety protocols.",
              },
              {
                icon: Heart,
                title: "Authentic Experiences",
                description:
                  "We showcase the real Kashmir — not just tourist spots, but hidden gems and local culture.",
              },
              {
                icon: Users,
                title: "Customer-Centric",
                description:
                  "Your satisfaction is our success. We go above and beyond to exceed your expectations.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
    </>
  );
}
