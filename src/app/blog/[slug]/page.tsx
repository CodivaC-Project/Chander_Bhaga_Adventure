import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Share2, Tag } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase.from("blogs").select("*").eq("slug", slug).single();
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160) || "",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await supabase.from("blogs").select("*").eq("slug", slug).single();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="btn-primary mt-4">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // readTime isn't a column — derive it from content length (200 wpm)
  const readTime = Math.max(1, Math.ceil((post.content || "").trim().split(/\s+/).length / 200));

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
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
              {(post.content || "").split("\n").map((line: string, i: number) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-bold text-[var(--color-ink)] mt-10 mb-4"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("**Best for:**")) {
                  return (
                    <p key={i} className="text-[var(--color-ink-soft)] mb-2">
                      <strong>{line.split("**")[1]}</strong>
                      {line.split("**")[2]}
                    </p>
                  );
                }
                if (line.startsWith("**Temperature:**")) {
                  return (
                    <p key={i} className="text-[var(--color-ink-soft)] mb-4">
                      <strong>{line.split("**")[1]}</strong>
                      {line.split("**")[2]}
                    </p>
                  );
                }
                if (line.startsWith("## ")) {
                  return null;
                }
                if (line.trim() === "") return <br key={i} />;
                return (
                  <p key={i} className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                    {line}
                  </p>
                );
              })}
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
