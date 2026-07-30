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
    <section className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-gradient">Chander Bhaga</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            We don&apos;t just plan trips — we craft unforgettable experiences in
            the heart of Kashmir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
