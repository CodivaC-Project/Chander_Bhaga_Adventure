import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, Clock, User, Calendar, Share2, Tag } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

// Lightweight markdown renderer for admin-authored content: headings, lists,
// tables, blockquotes, bold, links, and inline code. No dependencies.
function renderContent(content: string) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];
  let table: string[][] = [];

  const inline = (text: string): React.ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link)
        return link[2].startsWith("/") ? (
          <Link key={i} href={link[2]} className="text-[var(--color-pine)] font-medium hover:underline">
            {link[1]}
          </Link>
        ) : (
          <a key={i} href={link[2]} className="text-[var(--color-pine)] font-medium hover:underline" target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>
        );
      if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="px-1.5 py-0.5 bg-[var(--color-paper)] rounded text-sm">{part.slice(1, -1)}</code>;
      return part;
    });

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc pl-6 mb-4 space-y-1.5 text-[var(--color-ink-soft)] leading-relaxed">
          {list}
        </ul>
      );
      list = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      const [head, ...rows] = table;
      blocks.push(
        <div key={`tbl-${blocks.length}`} className="overflow-x-auto mb-4 rounded-lg border border-[var(--color-line)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-paper)]">
                {head.map((cell, i) => (
                  <th key={i} className="text-left px-4 py-2.5 font-semibold text-[var(--color-ink)]">{inline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-[var(--color-line)]">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2.5 text-[var(--color-ink-soft)]">{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      table = [];
    }
  };

  lines.forEach((line, idx) => {
    const t = line.trim();
    if (t.startsWith("| ") && t.endsWith("|")) {
      const cells = t.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) return; // separator row
      table.push(cells);
      return;
    }
    flushTable();

    if (t.startsWith("- ") || t.startsWith("* ")) {
      list.push(<li key={idx}>{inline(t.slice(2))}</li>);
      return;
    }
    flushList();

    if (t.startsWith("### ")) {
      blocks.push(<h3 key={idx} className="text-xl font-bold text-[var(--color-ink)] mt-8 mb-3">{inline(t.slice(4))}</h3>);
    } else if (t.startsWith("## ")) {
      blocks.push(<h2 key={idx} className="text-2xl font-bold text-[var(--color-ink)] mt-10 mb-4">{inline(t.slice(3))}</h2>);
    } else if (t.startsWith("> ")) {
      blocks.push(<blockquote key={idx} className="border-l-4 border-[var(--color-accent)] pl-4 py-1 mb-4 text-[var(--color-ink-soft)] italic">{inline(t.slice(2))}</blockquote>);
    } else if (t === "") {
      // paragraph spacing handled by margins
    } else {
      blocks.push(<p key={idx} className="text-[var(--color-ink-soft)] leading-relaxed mb-4">{inline(t)}</p>);
    }
  });
  flushList();
  flushTable();

  return blocks;
}

// Shared by generateMetadata + page so a request hits Supabase once.
// Published filter keeps drafts out of metadata even if a stale link is crawled.
const getPost = cache(async (slug: string) => {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const description = post.excerpt || post.content?.substring(0, 160) || "";
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `${siteConfig.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // readTime isn't a column — derive it from content length (200 wpm)
  const readTime = Math.max(1, Math.ceil((post.content || "").trim().split(/\s+/).length / 200));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Blog", "/blog", post.title, `/blog/${post.slug}`),
          {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt || post.content?.substring(0, 160) || "",
          image: post.coverImage,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.publishedAt || post.createdAt,
          author: { "@type": "Person", name: post.author || siteConfig.name },
          publisher: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.jpeg` },
          },
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
          },
        ]}
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 container-custom flex flex-col justify-end pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <span className="px-3 py-1 bg-[var(--color-brass)] text-white text-xs font-bold rounded-full w-fit mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt || post.createdAt || new Date()).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Article content */}
            <article className="prose prose-lg max-w-none">
              {renderContent(post.content || "")}
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-[var(--color-ink-faint)]" />
                {(post.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--color-paper)] text-[var(--color-ink-soft)] text-sm rounded-full border border-[var(--color-line)] hover:bg-[var(--color-pine)]/10 hover:text-[var(--color-pine)] transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 p-6 bg-[var(--color-paper)] rounded-lg border border-[var(--color-line)] flex items-center justify-between">
              <span className="font-medium text-[var(--color-ink)]">Share this article</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-line)] rounded-lg text-sm font-medium hover:bg-[var(--color-paper)] transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
