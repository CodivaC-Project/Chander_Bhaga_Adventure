import { siteConfig } from "@/lib/config";

/** BreadcrumbList JSON-LD for a simple Home > Section > Page trail. */
export function breadcrumbSchema(sectionLabel: string, sectionPath: string, pageTitle?: string, itemPath?: string) {
  const items = [
    { name: "Home", url: siteConfig.url },
    { name: sectionLabel, url: `${siteConfig.url}${sectionPath}` },
  ];
  if (pageTitle) items.push({ name: pageTitle, url: `${siteConfig.url}${itemPath}` });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
