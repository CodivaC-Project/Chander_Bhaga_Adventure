import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Share2, Tag } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

const blogPosts: Record<string, any> = {
  "best-time-to-visit-kashmir": {
    title: "Best Time to Visit Kashmir: A Complete Seasonal Guide",
    slug: "best-time-to-visit-kashmir",
    content: `
Kashmir, often called "Paradise on Earth," is a year-round destination with each season offering a unique experience. Whether you're chasing spring blossoms, summer meadows, autumn colors, or winter snow, here's your complete guide.

## Spring (March to May)
Spring is when Kashmir awakens from its winter slumber. The gardens of Srinagar bloom with tulips and roses, and the valleys turn vibrant green. This is the best time for sightseeing and photography.

**Best for:** Garden tours, Shikara rides, Sightseeing
**Temperature:** 10°C to 20°C

## Summer (June to August)
Summer is peak tourist season. The weather is pleasant, making it ideal for trekking, camping, and adventure activities. Gulmarg and Pahalgam are particularly beautiful during this time.

**Best for:** Trekking, Camping, Adventure Activities
**Temperature:** 15°C to 30°C

## Autumn (September to November)
Autumn paints Kashmir in golden and amber hues. The chinar trees turn brilliant shades of red and orange. This is arguably the most photogenic season in Kashmir.

**Best for:** Photography, Nature Walks, Peaceful Retreats
**Temperature:** 5°C to 20°C

## Winter (December to February)
Winter transforms Kashmir into a snow-covered wonderland. Gulmarg becomes a world-class skiing destination, and the frozen Dal Lake is a sight to behold.

**Best for:** Skiing, Snow Activities, Honeymoon
**Temperature:** -5°C to 10°C

## Our Recommendation
For first-time visitors, **March to May** or **September to November** offer the best balance of pleasant weather, fewer crowds, and stunning natural beauty.
    `,
    author: "Sidhant Sharma",
    category: "Travel Guide",
    publishedAt: "2024-01-15",
    readTime: 8,
    coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
    tags: ["Kashmir", "Travel Guide", "Best Time to Visit", "Seasonal"],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

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
          <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-fit mb-4">
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
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
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
              {post.content.split("\n").map((line: string, i: number) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-bold text-gray-900 mt-10 mb-4"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("**Best for:**")) {
                  return (
                    <p key={i} className="text-gray-600 mb-2">
                      <strong>{line.split("**")[1]}</strong>
                      {line.split("**")[2]}
                    </p>
                  );
                }
                if (line.startsWith("**Temperature:**")) {
                  return (
                    <p key={i} className="text-gray-600 mb-4">
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
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">
                    {line}
                  </p>
                );
              })}
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl flex items-center justify-between">
              <span className="font-medium text-gray-700">Share this article</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
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
