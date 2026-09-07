import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FileText, CreditCard, MapPin, AlertTriangle, Scale, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for booking tours, adventures, and services with Shri Mata Vaishno Devi in Kashmir.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    icon: FileText,
    title: "General Terms",
    content: [
      "By booking any tour, adventure activity, hotel, taxi service, or consultation with Shri Mata Vaishno Devi, you agree to be bound by these Terms and Conditions.",
      "**Eligibility:** You must be at least 18 years old to make a booking. Participants under 18 must be accompanied by a parent or legal guardian who accepts these terms on their behalf.",
      "**Accuracy of Information:** You are responsible for providing accurate and complete information during booking. We are not liable for issues arising from incorrect or incomplete information.",
      "**Authority:** The person making the booking confirms they have the authority to accept these terms on behalf of all travelers in the group.",
      "**Governing Law:** These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Katra, Jammu & Kashmir.",
    ],
  },
  {
    icon: CreditCard,
    title: "Booking & Payment",
    content: [
      "**Advance Payment:** A minimum advance of **30%** of the total booking amount is required to confirm your reservation. The remaining 70% must be paid at least **7 days** before the trip start date.",
      "**Payment Methods:** We accept UPI, Credit/Debit Cards, Net Banking (via Razorpay), bank transfers, and cash payments. All online payments are processed through Razorpay's secure payment gateway.",
      "**EMI Options:** EMI is available for bookings above ₹10,000 through Razorpay. EMI terms are subject to your bank's policies.",
      "**Price Changes:** Published prices are subject to change without prior notice until a booking is confirmed with advance payment. Confirmed bookings will not be subject to price increases.",
      "**Currency:** All prices are quoted in Indian Rupees (INR) unless otherwise specified.",
      "**Taxes:** Prices include applicable GST and government taxes unless explicitly stated otherwise.",
    ],
  },
  {
    icon: MapPin,
    title: "Tour & Activity Terms",
    content: [
      "**Itinerary Changes:** While we make every effort to follow published itineraries, we reserve the right to modify tours due to weather, road conditions, natural disasters, government regulations, safety concerns, or unforeseen circumstances. Alternative arrangements will be provided where possible.",
      "**Accommodation:** Hotel/check-in/check-out times follow standard industry practices (typically 12:00 PM / 11:00 AM). Room categories are indicative and may vary based on availability.",
      "**Transport:** Vehicle type (sedan, SUV, tempo traveller, bus) is assigned based on group size and road conditions. AC may not function in hilly areas.",
      "**Meals:** Meals are provided as per the package inclusions. Specific menu items may change based on availability and season.",
      "**Adventure Activities:** All adventure activities are conducted under professional supervision with appropriate safety equipment. Participants must follow all safety instructions and guidelines provided by our guides.",
      "**Permits:** Certain areas in Kashmir require inner-line permits. We arrange these as part of the tour package, but the process is subject to government approval timelines.",
    ],
  },
  {
    icon: Users,
    title: "Traveler Responsibilities",
    content: [
      "**Health & Fitness:** Travelers are responsible for assessing their own fitness for adventure activities. Inform us of any medical conditions, allergies, or physical limitations at the time of booking.",
      "**Documents:** Carry a valid government-issued photo ID (Aadhaar, Passport, Voter ID, or Driving License) at all times. Foreign nationals must carry their passport and any required permits.",
      "**Conduct:** Travelers must respect local customs, cultures, and environment. We reserve the right to remove any traveler whose behavior is disruptive, dangerous, or violates local laws.",
      "**Belongings:** We are not responsible for loss, theft, or damage to personal belongings. Travel insurance is strongly recommended.",
      "**Laws & Regulations:** Travelers must comply with all local laws, regulations, and guidelines during the trip, including COVID-19 protocols if applicable.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: [
      "**Force Majeure:** We are not liable for delays, cancellations, or changes caused by events beyond our control, including but not limited to natural disasters, weather conditions, political unrest, pandemics, government actions, or strikes.",
      "**Third-Party Services:** While we carefully select our partners (hotels, transporters, activity providers), we act as an intermediary. We are not liable for the acts, errors, or omissions of these third-party service providers.",
      "**Personal Risk:** Adventure activities carry inherent risks. While we take every precaution to ensure safety, Shri Mata Vaishno Devi is not liable for injuries resulting from failure to follow safety instructions, pre-existing medical conditions, or circumstances beyond our control.",
      "**Maximum Liability:** Our total liability shall not exceed the total amount paid by the traveler for the specific booking in question.",
      "**Insurance:** We strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellation, and personal belongings. We are not a substitute for travel insurance.",
    ],
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    content: [
      "**Complaints:** Any complaints must be reported to our trip coordinator immediately during the trip so we can attempt to resolve them on the spot. Post-trip complaints must be raised within **7 days** of trip completion.",
      "**Resolution Process:** We first attempt to resolve disputes through direct communication. If unresolved, disputes shall be submitted to mediation in Katra, Jammu & Kashmir.",
      "**Jurisdiction:** Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Katra, Jammu & Kashmir, India.",
      "**Amendments:** These terms may be updated from time to time. The latest version published on our website supersedes all previous versions. Continued use of our services constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        subtitle="Please read these terms carefully before booking with us."
        meta="Last updated: January 2026"
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-600 leading-relaxed text-lg">
              Welcome to Shri Mata Vaishno Devi. These Terms and Conditions
              (&quot;Terms&quot;) govern your use of our website, services, and
              booking of tour packages, adventure activities, hotel accommodations,
              taxi services, and consultation services. By engaging with our
              services, you acknowledge that you have read, understood, and agree
              to be bound by these Terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)] border border-gray-50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {index + 1}. {section.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => {
                    const parts = paragraph.split("**").filter(Boolean);
                    if (parts.length > 1) {
                      return (
                        <div key={pIndex} className="flex gap-2">
                          <span className="font-semibold text-gray-900 flex-shrink-0">
                            {parts[0]}:
                          </span>
                          <span className="text-gray-600 leading-relaxed">
                            {parts[1]}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <p key={pIndex} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance */}
          <div className="mt-12 bg-[var(--color-accent)]/5 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Acceptance of Terms
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              By proceeding with a booking, you confirm that you are at least 18
              years of age and accept these Terms and Conditions in full. If you
              do not agree with any part of these terms, please do not use our
              services. For any questions, contact us at{" "}
              <a href="mailto:contact@shrimatavaishnodevi.com" className="text-[var(--color-primary)] font-medium hover:underline">
                contact@shrimatavaishnodevi.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
