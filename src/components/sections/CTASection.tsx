import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="bg-[var(--color-pine-deep)] hairline border-white/10 rounded-lg px-8 py-14 md:px-16 md:py-20 relative overflow-hidden">
          {/* Quiet topographic detail, no glow */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
              <path d="M0 200V120L240 180L480 80L720 160L960 60L1200 140L1440 80V200H0Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="eyebrow text-[var(--color-accent-light)]">Plan your journey</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Ready for Your Kashmir Journey?
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Let our travel experts craft the right itinerary for you — a free
              consultation and a personalized quote, no obligation.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/consultation"
                className="btn-secondary text-base px-7 py-3.5 group"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Consultation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 font-semibold text-white border-b border-white/30 pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call +91 {siteConfig.phone.replace("91", "")}
              </a>
            </div>

            <p className="mt-8 text-sm text-white/40">
              Or WhatsApp us at{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-light)] hover:underline"
              >
                +91 {siteConfig.phone.replace("91", "")}
              </a>{" "}
              for instant responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
