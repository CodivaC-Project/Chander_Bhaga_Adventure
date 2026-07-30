import { Metadata } from "next";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Read travel guides, tips, and stories about Kashmir. Expert advice for planning your perfect trip.",
};

const blogs = [
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
  {
    title: "Gulmarg in Winter: A Snow Lover's Paradise",
    slug: "gulmarg-winter-guide",
    excerpt:
      "Experience the magic of Gulmarg when it transforms into a winter wonderland. Skiing, Gondola rides, and more.",
    coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Seasonal",
    publishedAt: "2023-12-20",
    readTime: 7,
  },
  {
    title: "Kashmiri Cuisine: Must-Try Dishes on Your Trip",
    slug: "kashmiri-cuisine-guide",
    excerpt:
      "From Rogan Josh to Kahwa, discover the rich flavors of Kashmiri cuisine and where to find the best local food.",
    coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Food & Culture",
    publishedAt: "2023-12-15",
    readTime: 5,
  },
  {
    title: "Packing List for Kashmir: What to Bring in Every Season",
    slug: "kashmir-packing-list",
    excerpt:
      "Don't know what to pack for Kashmir? Our comprehensive seasonal packing list covers everything you need.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    author: "Sidhant Sharma",
    category: "Tips",
    publishedAt: "2023-12-10",
    readTime: 4,
  },
];

const categories = ["All", "Travel Guide", "Adventure", "Pilgrimage", "Seasonal", "Food & Culture", "Tips"];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Expert travel guides, tips, and stories to help you plan the
            perfect Kashmir adventure.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
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
