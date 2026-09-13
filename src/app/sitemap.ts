import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

// Static pages always present in the sitemap
const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "daily" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/vaishno-devi", priority: 0.9, changeFrequency: "weekly" },
  { path: "/tours", priority: 0.9, changeFrequency: "weekly" },
  { path: "/adventures", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hotels", priority: 0.8, changeFrequency: "weekly" },
  { path: "/taxi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/consultation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cancellation", priority: 0.3, changeFrequency: "yearly" },
];

type SlugRow = { slug: string; updatedAt?: string; createdAt?: string; publishedAt?: string };

async function fetchSlugs(table: string, publishedFilter?: boolean): Promise<SlugRow[]> {
  try {
    // `published`/`publishedAt` only exist on blogs; other tables just have slugs + timestamps
    const columns =
      publishedFilter !== undefined
        ? "slug,updatedAt,createdAt,publishedAt"
        : "slug,updatedAt,createdAt";
    let query = supabase.from(table).select(columns);
    if (publishedFilter !== undefined) query = query.eq("published", publishedFilter);
    const { data } = await query;
    return (data as unknown as SlugRow[]) || [];
  } catch {
    // Never break the sitemap if the DB is unreachable — static pages still ship
    return [];
  }
}

// Category landing pages — only categories that actually have adventures
async function fetchCategories(): Promise<string[]> {
  try {
    const { data } = await supabase.from("adventures").select("category");
    return [...new Set((data || []).map((a: { category: string }) => a.category).filter(Boolean))];
  } catch {
    return [];
  }
}

// Distinct values for programmatic pages, slugified the same way the pages do
async function fetchDistinct(table: string, column: string, publishedFilter?: boolean): Promise<string[]> {
  try {
    let query = supabase.from(table).select(column);
    if (publishedFilter !== undefined) query = query.eq("published", publishedFilter);
    const { data } = await query;
    const rows = (data || []) as unknown as Record<string, string>[];
    const values = rows.map((row) => row[column]).filter(Boolean);
    return [...new Set<string>(values)].map((v) => v.trim().toLowerCase().replace(/\s+/g, "-"));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const now = new Date();

  // No lastModified on static pages — a date that always equals "today" is a spam signal.
  const staticSitemap = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));

  const [tours, adventures, hotels, blogs, categories, tourDestinations, hotelLocations, blogCategories] =
    await Promise.all([
      fetchSlugs("tour_packages"),
      fetchSlugs("adventures"),
      fetchSlugs("hotels"),
      fetchSlugs("blogs", true),
      fetchCategories(),
      fetchDistinct("tour_packages", "destination"),
      fetchDistinct("hotels", "location"),
      fetchDistinct("blogs", "category", true),
    ]);

  const detailEntries = (rows: SlugRow[], prefix: string, priority: number) =>
    rows
      .filter((row) => row.slug)
      .map((row) => ({
        url: `${baseUrl}${prefix}/${row.slug}`,
        lastModified: new Date(row.updatedAt || row.publishedAt || row.createdAt || now),
        changeFrequency: "monthly" as const,
        priority,
      }));

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/adventures/category/${category}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const programmaticEntries = [
    ...tourDestinations.map((d) => ({ url: `${baseUrl}/tours/destination/${d}`, priority: 0.8 })),
    ...hotelLocations.map((l) => ({ url: `${baseUrl}/hotels/location/${l}`, priority: 0.8 })),
    ...blogCategories.map((c) => ({ url: `${baseUrl}/blog/category/${c}`, priority: 0.6 })),
  ].map((e) => ({ ...e, changeFrequency: "weekly" as const }));

  return [
    ...staticSitemap,
    ...categoryEntries,
    ...programmaticEntries,
    ...detailEntries(tours, "/tours", 0.9),
    ...detailEntries(adventures, "/adventures", 0.8),
    ...detailEntries(hotels, "/hotels", 0.8),
    ...detailEntries(blogs, "/blog", 0.7),
  ];
}
