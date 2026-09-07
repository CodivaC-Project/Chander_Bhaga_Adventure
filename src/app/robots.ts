import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/notes/", "/login", "/register", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
