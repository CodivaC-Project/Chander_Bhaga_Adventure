import { Shield, Clock, Headphones, CreditCard, MapPin, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "Your safety is our top priority. All activities are conducted with certified guides and equipment.",
  },
  {
    icon: Award,
    title: "Licensed & Certified",
    description:
      "Government licensed tour operator (JKAT00003494) with years of experience in Kashmir tourism.",
  },
  {
    icon: Clock,
    title: "Flexible Itineraries",
    description:
      "Customizable packages to suit your travel dates, group size, and personal preferences.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Dedicated travel support team available around the clock before and during your trip.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description:
      "Secure online payments via Razorpay with flexible booking and cancellation policies.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Our local guides know every hidden gem and secret spot in Kashmir for an authentic experience.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding section-bg-pine">
      <div className="container-custom">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">The difference</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mt-3">
            Why travel with us
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
            We don&apos;t just plan trips — we craft quiet, well-run experiences
            in the heart of Kashmir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white hairline rounded-lg p-6 transition-all duration-300 hover:shadow-[var(--shadow-soft)] group"
            >
              <div className="w-12 h-12 rounded-md border border-[var(--color-line)] flex items-center justify-center mb-5 bg-[var(--color-paper)] group-hover:border-[var(--color-accent)] transition-colors">
                <feature.icon className="w-5 h-5 text-[var(--color-accent-deep)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2 !font-sans tracking-normal">
                {feature.title}
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
