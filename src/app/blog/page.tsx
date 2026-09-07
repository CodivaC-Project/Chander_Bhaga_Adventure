import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug } from "@/lib/slug";

// Always render fresh data from the DB — admin CRUD should appear immediately
// without needing a rebuild/redeploy (otherwise the page is statically prerendered).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kashmir & Vaishno Devi Travel Blog",
  description:
    "Kashmir trip guides and Vaishno Devi yatra tips — itineraries, best time to visit, costs, helicopter booking, and first-timer advice from a Katra-based travel team.",
  alternates: { canonical: "/blog" },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80";

export default async function BlogPage() {
  const { data: rawBlogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("createdAt", { ascending: false });

  const blogs = (rawBlogs || []).map((blog) => ({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage || DEFAULT_IMAGE,
    author: blog.author,
    category: blog.category,
    publishedAt: blog.publishedAt || blog.createdAt,
    readTime: Math.ceil((blog.content?.length || 500) / 1000),
  }));

  const categories = ["All", ...new Set(blogs.map((b) => b.category).filter(Boolean))];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "The Kashmir Travel Blog",
          numberOfItems: blogs.length,
          itemListElement: blogs.map((blog, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/blog/${blog.slug}`,
            name: blog.title,
          })),
        }}
      />
      <PageHero
        eyebrow="Journal"
        title="The Kashmir travel blog"
        subtitle="Expert guides, tips, and stories to help you plan the perfect Kashmir adventure."
      />

      {/* Categories */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) =>
              cat === "All" ? (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-white transition-all"
                >
                  {cat}
                </button>
              ) : (
                <Link
                  key={cat}
                  href={`/blog/category/${toSlug(cat)}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                >
                  {cat}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Blog listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
