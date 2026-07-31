import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "About Us", href: "/about" },
    { label: "Tour Packages", href: "/tours" },
    { label: "Adventure Activities", href: "/adventures" },
    { label: "Hotels", href: "/hotels" },
    { label: "Taxi Service", href: "/taxi" },
    { label: "Gallery", href: "/gallery" },
  ],
  "Adventures": [
    { label: "Trekking", href: "/adventures?category=trekking" },
    { label: "River Rafting", href: "/adventures?category=rafting" },
    { label: "Camping", href: "/adventures?category=camping" },
    { label: "Skiing", href: "/adventures?category=skiing" },
    { label: "Paragliding", href: "/adventures?category=paragliding" },
    { label: "Rock Climbing", href: "/adventures?category=rock-climbing" },
  ],
  "Support": [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Blog", href: "/blog" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Get Travel Updates</h3>
              <p className="text-white/60 mt-1">
                Subscribe for exclusive deals, travel tips, and adventure updates.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)]"
              />
              <button
                type="submit"
                className="btn-secondary !rounded-xl flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/logo.jpeg"
                  alt="Shri Mata Vaishno Devi Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-white block">
                  Shri Mata Vaishno Devi
                </span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              Your gateway to Kashmir&apos;s untouched beauty. We offer premium
              tourism, adventure, hotel, taxi, and consultation services for an
              unforgettable experience.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-[var(--color-accent)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 {siteConfig.phone.replace("91", "")}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-[var(--color-accent)] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>
              <span className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                {siteConfig.address}
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[var(--color-accent)] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Shri Mata Vaishno Devi. All rights reserved.
            License: {siteConfig.license}
          </p>
          <p className="text-white/40 text-sm">
            Built with ❤️ for adventure seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
