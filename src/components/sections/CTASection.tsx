import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Kashmir Adventure?
          </h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            Let our travel experts craft the perfect itinerary for you. Get a
            free consultation and personalized quote today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/consultation"
              className="btn-secondary text-lg !px-8 !py-4 group"
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now: +91 {siteConfig.phone.replace("91", "")}
            </a>
          </div>

          <p className="mt-8 text-sm text-white/50">
            📱 WhatsApp us at{" "}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              +91 {siteConfig.phone.replace("91", "")}
            </a>{" "}
            for instant responses
          </p>
        </div>
      </div>
    </section>
  );
}
