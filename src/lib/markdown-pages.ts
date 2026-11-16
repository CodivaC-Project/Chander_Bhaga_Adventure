// Markdown versions of key pages, served by src/app/md/[...path]/route.ts and
// selected by src/proxy.ts when the client sends `Accept: text/markdown` or
// requests the `.md` sibling URL. Keep content equivalent to the HTML page.

import { siteConfig } from "@/lib/config";
import { comparisons } from "@/lib/comparisons";

const base = siteConfig.url.replace(/\/$/, "");

const pages: Record<string, string> = {
  "/": `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

- [Tour Packages](${base}/tours)
- [Adventure Activities](${base}/adventures)
- [Hotels](${base}/hotels)
- [Taxi Service](${base}/taxi)
- [Gallery](${base}/gallery)
- [Blog](${base}/blog)
- [About Us](${base}/about)
- [Contact](${base}/contact)
- [Book a Consultation](${base}/consultation)
- [FAQs](${base}/faq)

Contact: +91 ${siteConfig.phone.replace("91", "")}, ${siteConfig.email}, ${siteConfig.address}. Hours: ${siteConfig.workingHours}.`,

  "/about": `# About ${siteConfig.name}

${siteConfig.description}

We are a Katra-based travel agency (license ${siteConfig.license}) offering Vaishno Devi yatra packages, Kashmir tour packages from Delhi, hotels in Katra, taxi service and guided adventures across Srinagar, Gulmarg, Pahalgam and Sonmarg with licensed local operators.

- [Tour Packages](${base}/tours)
- [Adventures](${base}/adventures)
- [Contact us](${base}/contact)`,

  "/tours": `# Tour Packages

Kashmir and Vaishno Devi tour packages from Delhi and Katra: Srinagar, Gulmarg, Pahalgam, Sonmarg itineraries with hotels, transport and guides.

- [All packages](${base}/tours)
- [Kashmir Explorer](${base}/tours/kashmir-explorer)
- [Vaishno Devi Yatra](${base}/tours/vaishno-devi-yatra)
- [Book a Consultation](${base}/consultation)`,

  "/adventures": `# Adventure Activities

Guided adventures in Kashmir: trekking, river rafting, camping, skiing, paragliding and rock climbing.

- [All activities](${base}/adventures)
- [Trekking](${base}/adventures/category/trekking)
- [Rafting](${base}/adventures/category/rafting)
- [Camping](${base}/adventures/category/camping)
- [Skiing](${base}/adventures/category/skiing)
- [Paragliding](${base}/adventures/category/paragliding)
- [Rock Climbing](${base}/adventures/category/rock-climbing)`,

  "/hotels": `# Hotels

Handpicked hotels in Katra and across Kashmir, with room types, prices per night and amenities.

- [All hotels](${base}/hotels)
- [Book a Consultation](${base}/consultation)`,

  "/taxi": `# Taxi Service

Katra and Jammu taxi service: sedans, SUVs, tempo travellers and buses with licensed drivers. Jammu to Katra transfers available.

- [Taxi options](${base}/taxi)
- [Contact for booking](${base}/contact)`,

  "/gallery": `# Gallery

Photos from our tours, adventures and hotels in Katra, Srinagar, Gulmarg and Pahalgam.

- [View gallery](${base}/gallery)`,

  "/blog": `# Blog

Travel guides, yatra tips and Kashmir itineraries from ${siteConfig.name}.

- [All posts](${base}/blog)`,

  "/contact": `# Contact Us

- Phone / WhatsApp: +91 ${siteConfig.phone.replace("91", "")}
- Email: ${siteConfig.email}
- Address: ${siteConfig.address}
- Hours: ${siteConfig.workingHours}

Send a message via [the contact form](${base}/contact) or [book a consultation](${base}/consultation).`,

  "/consultation": `# Book a Consultation

Tell us your travel dates, group size, budget and interests and a travel expert will contact you within 24 hours.

- [Request consultation](${base}/consultation)
- [FAQs](${base}/faq)
- [Cancellation policy](${base}/cancellation)`,

  "/faq": `# Frequently Asked Questions

Common questions about Vaishno Devi yatra packages, Kashmir tours, hotels, taxis and bookings.

- [FAQs](${base}/faq)
- [Contact us](${base}/contact)`,
};

// Comparison pages under /compare — content single-sourced from lib/comparisons

pages["/compare"] = `# Comparisons & Alternatives

Side-by-side guides with sourced prices and clear verdicts for Kashmir and Vaishno Devi travel (updated 2026-10-31).

${comparisons.map((c) => `- [${c.h1}](${base}/compare/${c.slug})`).join("\n")}

- [Book a Consultation](${base}/consultation)`;

for (const c of comparisons) {
  pages[`/compare/${c.slug}`] = `# ${c.h1}

${c.description}

${c.disclosure ? `> ${c.disclosure}\n\n` : ""}Updated ${c.updatedAt}.

${c.body}

## Frequently asked questions

${c.faq.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n")}

---
- [All comparisons](${base}/compare)
- [Book a Consultation](${base}/consultation)`;
}

function normalize(path: string): string {
  if (path === "/index") return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Page path for a `.md` sibling URL: "/tours.md" -> "/tours", "/index.md" -> "/" */
export function mdSiblingToPage(pathname: string): string {
  return normalize(pathname.replace(/\.md$/, ""));
}

export function hasMarkdownVersion(pagePath: string): boolean {
  return normalize(pagePath) in pages;
}

export function getMarkdownPage(pagePath: string): string | undefined {
  return pages[normalize(pagePath)];
}

/** Internal route path that serves the markdown for a page: "/" -> "/md/index", "/tours" -> "/md/tours" */
export function mdInternalPath(pagePath: string): string {
  const p = normalize(pagePath);
  return p === "/" ? "/md/index" : `/md${p}`;
}
