import { SectionHeader } from "./SectionHeader";
import { BlogCard } from "@/components/cards/BlogCard";

const latestBlogs = [
  {
    title: "Best Time to Visit Kashmir: A Complete Seasonal Guide",
    slug: "best-time-to-visit-kashmir",
    excerpt:
      "Planning a trip to Kashmir? Here's everything you need to know about the best time to visit, from spring blossoms to winter snow.",
    coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Travel Guide",
    publishedAt: "2024-01-15",
    readTime: 8,
  },
  {
    title: "Top 10 Adventure Activities You Can't Miss in Kashmir",
    slug: "top-10-adventure-activities-kashmir",
    excerpt:
      "From trekking in pristine valleys to white water rafting, discover the most thrilling adventures Kashmir has to offer.",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Adventure",
    publishedAt: "2024-01-10",
    readTime: 6,
  },
  {
    title: "Vaishno Devi Yatra: Complete Guide for First-Time Visitors",
    slug: "vaishno-devi-yatra-guide",
    excerpt:
      "Everything you need to know about the sacred Vaishno Devi pilgrimage — from booking to what to pack and the best route.",
    coverImage: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Pilgrimage",
    publishedAt: "2024-01-05",
    readTime: 10,
  },
];

export function LatestBlogs() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          title="Travel Stories & Tips"
          subtitle="Get inspired with our latest travel guides, tips, and stories from Kashmir."
          ctaLabel="Visit Our Blog"
          ctaHref="/blog"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
