import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Scale } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { comparisons, getComparison } from "@/lib/comparisons";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) notFound();
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}/compare/${slug}`,
      type: "article",
      modifiedTime: page.updatedAt,
    },
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) notFound();

  const related = page.related
    .map((s) => getComparison(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const wordCount = page.body.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Compare", "/compare", page.h1, `/compare/${page.slug}`),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.h1,
            description: page.description,
            datePublished: page.updatedAt,
            dateModified: page.updatedAt,
            author: { "@type": "Organization", name: siteConfig.name, "@id": `${siteConfig.url}/#organization` },
            publisher: {
              "@type": "Organization",
              "@id": `${siteConfig.url}/#organization`,
              name: siteConfig.name,
              logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.jpeg` },
            },
            mainEntityOfPage: `${siteConfig.url}/compare/${page.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Comparison"
        title={page.h1}
        subtitle={page.description}
      />

      {/* Meta row: updated date, read time, back link */}
      <section className="border-b border-[var(--color-line)] bg-white">
        <div className="container-custom py-4 flex flex-wrap items-center gap-6 text-sm text-[var(--color-ink-faint)]">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All comparisons
          </Link>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Updated {page.updatedAt}
          </span>
          <span className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            {readTime} min read
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {page.disclosure && (
              <div className="mb-8 p-4 rounded-lg bg-[var(--color-paper)] border border-[var(--color-line)] text-sm text-[var(--color-ink-soft)]">
                {page.disclosure}
              </div>
            )}

            <article className="prose prose-lg max-w-none">
              <MarkdownContent content={page.body} />
            </article>

            {/* FAQ */}
            <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {page.faq.map((f) => (
                  <div key={f.q} className="p-5 rounded-lg bg-[var(--color-paper)] border border-[var(--color-line)]">
                    <h3 className="font-semibold text-[var(--color-ink)] mb-2">{f.q}</h3>
                    <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related comparisons */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Related comparisons</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/compare/${r.slug}`}
                      className="group p-5 rounded-lg border border-[var(--color-line)] bg-white hover:border-[var(--color-pine)] transition-colors"
                    >
                      <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-pine)] transition-colors">
                        {r.h1}
                      </span>
                      <span className="block text-xs text-[var(--color-ink-faint)] mt-1">Updated {r.updatedAt}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
