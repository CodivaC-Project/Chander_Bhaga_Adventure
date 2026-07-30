import { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { XCircle, Clock, AlertTriangle, CreditCard, RefreshCcw, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancellation and refund policy for tours, adventures, and services booked with Chander Bhaga Adventure.",
};

const cancellationTiers = [
  {
    timeframe: "30+ Days Before Trip",
    refund: "90% Refund",
    color: "green",
    details:
      "If you cancel more than 30 days before the trip start date, you will receive a 90% refund of the total booking amount. A 10% administrative fee is retained to cover processing costs.",
    icon: "✅",
  },
  {
    timeframe: "15–30 Days Before Trip",
    refund: "70% Refund",
    color: "blue",
    details:
      "Cancellations made 15 to 30 days before the trip start date will receive a 70% refund. The remaining 30% covers pre-committed costs with hotels, transport, and activity providers.",
    icon: "📋",
  },
  {
    timeframe: "7–14 Days Before Trip",
    refund: "50% Refund",
    color: "yellow",
    details:
      "Cancellations made 7 to 14 days before the trip start date will receive a 50% refund. At this stage, significant non-recoverable costs have been incurred for reservations and arrangements.",
    icon: "⚠️",
  },
  {
    timeframe: "3–6 Days Before Trip",
    refund: "25% Refund",
    color: "orange",
    details:
      "Cancellations made 3 to 6 days before the trip start date will receive a 25% refund. Most costs become non-recoverable at this point.",
    icon: "🔶",
  },
  {
    timeframe: "Less Than 72 Hours / No-Show",
    refund: "No Refund",
    color: "red",
    details:
      "Cancellations made less than 72 hours before the trip start date, or no-shows, are non-refundable. The full booking amount is forfeited.",
    icon: "❌",
  },
];

const specialCases = [
  {
    title: "Weather-Related Cancellations",
    description:
      "If trips are cancelled due to extreme weather conditions, natural disasters, or government-imposed restrictions (road closures, curfews, alerts), we offer a full rescheduling at no additional cost or a 95% refund. A 5% processing fee may apply for refund processing.",
  },
  {
    title: "Medical Emergencies",
    description:
      "In case of a medical emergency preventing travel, we offer flexible rescheduling or a credit voucher valid for 12 months. A medical certificate may be required for refunds beyond our standard policy. We strongly recommend purchasing travel insurance for such situations.",
  },
  {
    title: "Group Bookings (5+ Travelers)",
    description:
      "For group bookings of 5 or more travelers, individual cancellations follow the above tiers. Full group cancellations receive a refund based on the earliest cancellation date. Custom terms may apply for large group bookings — please confirm at the time of booking.",
  },
  {
    title: "Government-Imposed Restrictions",
    description:
      "If travel is restricted due to government orders, security situations, or pandemic-related measures, we offer free rescheduling for up to 12 months or a 95% refund. We will communicate any government advisories promptly.",
  },
];

const colorMap: Record<string, string> = {
  green: "border-green-200 bg-green-50",
  blue: "border-blue-200 bg-blue-50",
  yellow: "border-yellow-200 bg-yellow-50",
  orange: "border-orange-200 bg-orange-50",
  red: "border-red-200 bg-red-50",
};

const textColorMap: Record<string, string> = {
  green: "text-green-700",
  blue: "text-blue-700",
  yellow: "text-yellow-700",
  orange: "text-orange-700",
  red: "text-red-700",
};

export default function CancellationPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cancellation Policy
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Flexible cancellation options for your peace of mind.
          </p>
          <p className="text-sm text-white/50 mt-4">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          {/* Introduction */}
          <div className="mb-12 max-w-4xl">
            <p className="text-gray-600 leading-relaxed text-lg">
              At Chander Bhaga Adventure, we understand that plans can change.
              Our cancellation policy is designed to be fair while accounting for
              the non-recoverable costs we incur when reservations are made on
              your behalf. We strongly recommend purchasing comprehensive travel
              insurance to cover unexpected situations.
            </p>
          </div>

          {/* Refund Timeline */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Cancellation Timeline &amp; Refund Rates
              </h2>
            </div>

            <div className="space-y-4">
              {cancellationTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border-2 p-6 ${colorMap[tier.color]} transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{tier.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {tier.timeframe}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {tier.details}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap ${textColorMap[tier.color]} bg-white border ${colorMap[tier.color]}`}
                    >
                      {tier.refund}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Cancel */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Phone className="w-6 h-6 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Cancel or Reschedule
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)] border border-gray-50">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                      1
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
                  <p className="text-gray-500 text-sm">
                    Call us at <strong>+91 6006465184</strong>, message on
                    WhatsApp, or email{" "}
                    <strong>info@chanderbhaga.com</strong> with your booking ID.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                      2
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Confirm Details
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Our team will confirm the cancellation, applicable refund
                    amount, and processing timeline within 24 hours.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                      3
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Receive Refund
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Refunds are processed within <strong>5–7 business days</strong> to
                    the original payment method.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Cases */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-6 h-6 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Special Circumstances
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {specialCases.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)] border border-gray-50"
                >
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Processing */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Refund Processing
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)] border border-gray-50 space-y-4">
              <div className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">
                    Method:
                  </span>{" "}
                  <span className="text-gray-600">
                    Refunds are processed to the original payment method used at
                    the time of booking. UPI and card refunds typically reflect
                    within 5–7 business days.
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">
                    Bank Transfers:
                  </span>{" "}
                  <span className="text-gray-600">
                    Refunds for bank transfer payments are processed via NEFT/IMPS
                    to the account used for the original payment within 7–10
                    business days.
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">
                    Cash Payments:
                  </span>{" "}
                  <span className="text-gray-600">
                    Refunds for cash payments are made via bank transfer or
                    UPI to the account details provided by the traveler.
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <RefreshCcw className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">
                    Credit Vouchers:
                  </span>{" "}
                  <span className="text-gray-600">
                    In some cases, we may offer a credit voucher valid for 12
                    months as an alternative to a cash refund. This can be used
                    for any of our services.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-[var(--color-accent)]/5 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[var(--color-accent)]" />
              Important Note
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We strongly recommend purchasing comprehensive <strong>travel
              insurance</strong> at the time of booking to protect against
              unforeseen circumstances including medical emergencies, trip
              interruption, lost luggage, and other travel-related risks. We are
              not liable for costs that could have been covered by travel
              insurance. For any questions about our cancellation policy, please
              contact us at{" "}
              <a
                href="mailto:info@chanderbhaga.com"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                info@chanderbhaga.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+916006465184"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                +91 6006465184
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
