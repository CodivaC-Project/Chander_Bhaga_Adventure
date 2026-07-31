import { SectionHeader } from "./SectionHeader";
import { BlogCard } from "@/components/cards/BlogCard";
import { supabase } from "@/lib/supabase";

export async function LatestBlogs() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("createdAt", { ascending: false })
    .limit(3);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-custom">
        <SectionHeader
          title="Latest Travel Stories"
          subtitle="Tips, guides, and stories from our adventures in the mountains."
          ctaLabel="Read All Posts"
          ctaHref="/blog"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              title={blog.title}
              slug={blog.slug}
              excerpt={blog.excerpt}
              coverImage={blog.coverImage || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"}
              author={blog.author}
              category={blog.category}
              publishedAt={blog.publishedAt || blog.createdAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
