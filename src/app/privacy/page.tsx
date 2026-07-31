import { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Shield, Lock, Eye, Database, Mail, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Shri Mata Vaishno Devi — Learn how we collect, use, and protect your personal information.",
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "When you use our services, book tours, or contact us, we may collect the following types of information:",
      "**Personal Information:** Name, email address, phone number, postal address, date of birth, and government-issued ID details required for bookings and permits.",
      "**Payment Information:** Transaction details processed securely through our payment partner Razorpay. We do not store your credit/debit card numbers or CVV codes on our servers.",
      "**Travel Preferences:** Destination preferences, dietary requirements, medical conditions relevant to adventure activities, and special accommodation requests.",
      "**Technical Data:** IP address, browser type, device information, pages visited, and time spent on our website — collected through cookies and analytics tools.",
      "**Communications:** Messages, emails, and chat conversations you have with our team, including feedback and reviews.",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "We use the collected information for the following purposes:",
      "**Service Delivery:** To process your bookings, arrange accommodations, transportation, adventure activities, and provide the travel services you've requested.",
      "**Communication:** To send booking confirmations, trip updates, pre-departure information, and respond to your inquiries and support requests.",
      "**Safety & Security:** To ensure your safety during adventure activities, verify identities for permit requirements, and manage emergency situations effectively.",
      "**Payment Processing:** To process payments securely, generate invoices, and manage refunds in accordance with our cancellation policy.",
      "**Improvement:** To analyze usage patterns, improve our website functionality, enhance our tour packages, and personalize your experience.",
      "**Legal Compliance:** To comply with applicable Indian laws, tourism regulations, and government reporting requirements in Jammu & Kashmir.",
      "**Marketing:** To send promotional offers, newsletters, and travel inspiration — only with your explicit consent. You can unsubscribe at any time.",
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Information",
    content: [
      "We take the security of your personal data seriously and implement multiple layers of protection:",
      "**Encryption:** All data transmitted between your browser and our servers is encrypted using SSL/TLS technology. Payment processing is PCI DSS compliant.",
      "**Access Control:** Only authorized team members who need the information to perform their duties have access to personal data. All access is logged and monitored.",
      "**Secure Storage:** Personal data is stored on secure servers with firewalls, intrusion detection systems, and regular security audits.",
      "**Third-Party Vendors:** We partner only with vetted service providers (Razorpay for payments, Cloudinary for images) who maintain their own robust security practices.",
      "**Data Retention:** We retain your booking and personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Typically, booking records are retained for 7 years as per Indian tax regulations.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "As a user, you have the following rights regarding your personal data:",
      "**Access:** You can request a copy of all personal data we hold about you at any time.",
      "**Correction:** You can request correction of any inaccurate or incomplete personal information.",
      "**Deletion:** You can request deletion of your personal data, subject to our legal retention obligations.",
      "**Opt-Out:** You can opt out of marketing communications by clicking the unsubscribe link in any email or contacting us directly.",
      "**Data Portability:** You can request your data in a commonly used, machine-readable format.",
      "To exercise any of these rights, please contact us at **info@chanderbhaga.com** or call **+91 6006465184**.",
    ],
  },
  {
    icon: Mail,
    title: "Third-Party Sharing",
    content: [
      "We do **not** sell, rent, or trade your personal information. We may share your data with the following only as necessary to fulfill our services:",
      "**Service Providers:** Hotels, transport operators, adventure activity providers, and guides who need your booking details to deliver the services you've booked.",
      "**Payment Gateway:** Razorpay processes your payment data securely. Their privacy policy governs the handling of payment information.",
      "**Government Authorities:** When required by law, permit requirements, or for safety reporting in compliance with J&K tourism regulations.",
      "**Analytics:** We use privacy-respecting analytics to understand website usage. These tools collect anonymized data that cannot be traced back to you personally.",
    ],
  },
  {
    icon: Shield,
    title: "Cookies & Tracking",
    content: [
      "Our website uses cookies to enhance your browsing experience:",
      "**Essential Cookies:** Required for the website to function properly — session management, shopping cart, and authentication.",
      "**Performance Cookies:** Help us understand how visitors interact with our website by collecting anonymous usage data.",
      "**Marketing Cookies:** Used to deliver relevant advertisements and track campaign effectiveness. These are only set with your consent.",
      "You can manage your cookie preferences through your browser settings. Disabling essential cookies may affect website functionality.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we protect your data.
          </p>
          <p className="text-sm text-white/50 mt-4">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-600 leading-relaxed text-lg">
              Shri Mata Vaishno Devi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website
              (chanderbhaga.com) and use our tourism, adventure, and travel
              services. Registered under Jammu &amp; Kashmir tourism license
              <strong> JKAT00003494</strong>.
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
                    const isBoldStart = paragraph.startsWith("**");
                    if (isBoldStart) {
                      const parts = paragraph.split("**").filter(Boolean);
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

          {/* Contact */}
          <div className="mt-12 bg-[var(--color-primary)]/5 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Questions About This Policy?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@chanderbhaga.com"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                info@chanderbhaga.com
              </a>
              <a href="tel:+916006465184" className="btn-secondary inline-flex items-center gap-2">
                +91 6006465184
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
