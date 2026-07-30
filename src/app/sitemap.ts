import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/tours",
    "/adventures",
    "/hotels",
    "/taxi",
    "/blog",
    "/gallery",
    "/contact",
    "/about",
    "/faq",
    "/consultation",
  ];

  // Static tour pages
  const tourSlugs = [
    "kashmir-explorer",
    "vaishno-devi-yatra",
    "gulmarg-skiing",
    "pahalgam-trek",
  ];

  // Static adventure pages
  const adventureSlugs = [
    "dal-lake-kayaking",
    "aru-valley-trek",
    "gulmarg-gondola",
    "lidder-river-rafting",
  ];

  // Static hotel pages
  const hotelSlugs = ["highland-resort", "dal-lake-houseboat"];

  // Static blog pages
  const blogSlugs = [
    "best-time-to-visit-kashmir",
    "top-10-adventure-activities-kashmir",
    "vaishno-devi-yatra-guide",
  ];

  const staticSitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const tourSitemap = tourSlugs.map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const adventureSitemap = adventureSlugs.map((slug) => ({
    url: `${baseUrl}/adventures/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const hotelSitemap = hotelSlugs.map((slug) => ({
    url: `${baseUrl}/hotels/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogSitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticSitemap,
    ...tourSitemap,
    ...adventureSitemap,
    ...hotelSitemap,
    ...blogSitemap,
  ];
}
