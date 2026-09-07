import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/breadcrumb";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { toSlug, fromSlug } from "@/lib/slug";

export const revalidate = 60;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80";

export async function generateStaticParams() {
  const { data } = await supabase.from("blogs").select("category").eq("published", true);
  const categories = [...new Set((data || []).map((b: { category: string }) => b.category).filter(Boolean))];
  return categories.map((category) => ({ category: toSlug(category) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = fromSlug(category);
  return {
    title: `${label} — Kashmir Travel Blog`,
    description: `${label} guides and stories from our Katra travel team — Vaishno Devi yatra tips, Kashmir itineraries and first-hand advice.`,
    alternates: { canonical: `/blog/category/${category}` },
    openGraph: {
      title: `${label} — Kashmir Travel Blog`,
      description: `${label} guides from our Katra travel team.`,
      url: `${siteConfig.url}/blog/category/${category}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = fromSlug(category);

  const { data: raw } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("createdAt", { ascending: false });

  const posts = (raw || [])
    .filter((post) => post.category && toSlug(post.category) === category)
    .map((blog) => ({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage || DEFAULT_IMAGE,
      author: blog.author,
      category: blog.category,
      publishedAt: blog.publishedAt || blog.createdAt,
      readTime: Math.ceil((blog.content?.length || 500) / 1000),
    }));

  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Blog", "/blog", label, `/blog/category/${category}`),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${label} Articles`,
            numberOfItems: posts.length,
            itemListElement: posts.map((post, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/blog/${post.slug}`,
              name: post.title,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Journal"
        title={`${label} guides`}
        subtitle={`${label} stories and expert advice from our Katra-based travel team.`}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
