import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";

// ISR: keep hub fresh alongside admin content.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Vaishno Devi Yatra Packages from Katra — 2026 Guide & Booking",
  description:
    "Vaishno Devi yatra packages from a licensed Katra agency — yatra registration, helicopter booking, Katra hotels, Jammu taxi and guided treks. First-timer guide, costs and best time inside.",
  alternates: { canonical: "/vaishno-devi" },
  openGraph: {
    title: "Vaishno Devi Yatra Packages from Katra — 2026 Guide & Booking",
    description:
      "Licensed Katra agency for Vaishno Devi yatra — registration, helicopter, hotels, taxi and guided treks.",
    url: `${siteConfig.url}/vaishno-devi`,
    type: "website",
  },
};

export default function VaishnoDeviPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Vaishno Devi Yatra", "/vaishno-devi"),
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Vaishno Devi Yatra",
            description:
              "Pilgrimage to the Vaishno Devi shrine at Katra, Jammu & Kashmir — 14 km trek from Banganga to the Bhawan cave at 1,584 m.",
            url: `${siteConfig.url}/vaishno-devi`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Katra",
              addressRegion: "Jammu & Kashmir",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 33.0279,
              longitude: 74.95,
            },
            provider: {
              "@type": "TravelAgency",
              "@id": `${siteConfig.url}/#organization`,
              name: siteConfig.name,
              telephone: `+${siteConfig.phone}`,
            },
          },
        ]}
      />

      <PageHero
        eyebrow="Pilgrimage from Katra"
        title="Vaishno Devi Yatra — planned by a local Katra team"
        subtitle="Registration, helicopter slots, Katra hotels and Jammu taxi handled end-to-end. Everything a first-timer needs, in the order you'll actually experience it."
      />

      {/* Core offer cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Yatra registration & RFID",
                body: "Free Shrine Board registration plus assistance with your yatra parchi and RFID card at Banganga.",
                href: "/blog/vaishno-devi-yatra-first-timer-guide",
                cta: "Read the first-timer guide",
              },
              {
                title: "Helicopter booking",
                body: "Katra–Sanjichhat helicopter seats booked as part of your package — the 8-minute flight cuts the trek to an easy walk.",
                href: "/tours/vaishno-devi-yatra",
                cta: "See the yatra package",
              },
              {
                title: "Katra hotels",
                body: "Stays near Banganga for an early trek start, from Shrine Board guest houses to premium hotels with shuttle.",
                href: "/hotels/location/katra",
                cta: "Browse Katra hotels",
              },
              {
                title: "Jammu to Katra taxi",
                body: "Fixed-fare sedans, Innovas and Tempo Travellers with meet-and-greet at any train or flight hour — no surge in Navratri.",
                href: "/taxi",
                cta: "View taxi fares",
              },
              {
                title: "Bhawan room booking",
                body: "Shrine Board guest houses (₹150 dorms to ₹1,500 rooms) vs private Katra hotels — and which area to pick.",
                href: "/blog/vaishno-devi-bhawan-room-booking",
                cta: "Where to stay guide",
              },
              {
                title: "Best time to travel",
                body: "March–June peak, Navratri most auspicious, December–February serene. Plan the yatra around the season.",
                href: "/blog/vaishno-devi-yatra-first-timer-guide",
                cta: "Best-time tips",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-[var(--color-line)] p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">{card.title}</h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed flex-1">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-4 text-[var(--color-pine)] font-medium hover:underline"
                >
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide copy */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
            The yatra in five steps
          </h2>
          <ol className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed list-decimal pl-6">
            <li>
              <strong className="text-[var(--color-ink)]">Register</strong> — free online via the
              Shrine Board (maavaishnodevi.org) or at the Katra counter; convert your parchi to an
              RFID wristband at Banganga.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Reach Katra</strong> — by train to Katra
              station (2 km from Banganga) or a Jammu–Katra taxi (~50 km, 1.5 hrs).
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Trek 14 km</strong> — paved, lit all
              night, 6–9 hours on foot; pony, palki or battery car available; helicopter to
              Sanjichhat for the short option.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Darshan at Bhawan</strong> — continuous
              queues; special aarti tickets shorten the wait. Complete the yatra at Bhairon Temple,
              2.5 km above.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Return</strong> — descend, collect your
              RFID deposit, and head to your Katra hotel or onward taxi to Srinagar/Patnitop.
            </li>
          </ol>

          <h3 className="text-xl font-bold text-[var(--color-ink)] mt-8 mb-3">
            Why book with a Katra agency
          </h3>
          <p className="text-[var(--color-ink-soft)] leading-relaxed">
            We&apos;re licensed (JKAT00003494) and based in Katra — we handle registration help,
            helicopter slots, hotels near Banganga and Jammu pickups in one booking, so you climb
            light and worry-free. Browse our{" "}
            <Link href="/tours/vaishno-devi-yatra" className="text-[var(--color-pine)] hover:underline font-medium">
              Vaishno Devi yatra package
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-[var(--color-pine)] hover:underline font-medium">
              talk to our team
            </Link>{" "}
            for a custom plan.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
