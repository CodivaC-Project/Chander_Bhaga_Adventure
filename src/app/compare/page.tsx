import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { comparisons } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Comparisons & Alternatives — Vaishno Devi & Kashmir 2026",
  description:
    "Side-by-side comparisons for Kashmir and Vaishno Devi travel in 2026: helicopter vs trek vs ropeway, IRCTC vs private operator, group tour vs private cab, Vaishno Devi vs Amarnath, and the best licensed Katra agencies.",
  alternates: { canonical: "/compare" },
};

export default function CompareIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Compare", "/compare"),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Comparisons & Alternatives",
            description: metadata.description,
            url: `${siteConfig.url}/compare`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: comparisons.length,
              itemListElement: comparisons.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${siteConfig.url}/compare/${c.slug}`,
                name: c.h1,
              })),
            },
          },
        ]}
      />
      <PageHero
        eyebrow="Compare before you book"
        title="Honest comparisons for your Kashmir & Vaishno Devi trip"
        subtitle="Side-by-side guides with sourced prices and clear verdicts — helicopter vs trek, IRCTC vs private operator, group tour vs private cab, and more."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group bg-white rounded-2xl border border-[var(--color-line)] p-6 hover:border-[var(--color-pine)] hover:shadow-[var(--shadow-soft)] transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 text-[var(--color-accent)] mb-3">
                  <Scale className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Comparison · updated {c.updatedAt}</span>
                </div>
                <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-pine)] transition-colors">
                  {c.h1}
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed flex-1">{c.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-[var(--color-pine)]">
                  Read the comparison
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--color-ink-faint)] mt-10 max-w-2xl mx-auto">
            Every price on these pages is tagged with the date we checked it and a public source.
            Where a page lists our own agency, the affiliation is disclosed on the page itself.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
