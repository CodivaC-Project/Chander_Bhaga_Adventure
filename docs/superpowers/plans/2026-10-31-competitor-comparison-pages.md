# Competitor Comparison & Alternatives Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/compare` section of comparison / alternatives / roundup pages to shrimatavaishnodevitravels.in that captures comparison-intent keywords page-1 competitors are winning, with verifiable claims, affiliation disclosure, and full schema + markdown-delivery parity with the rest of the site.

**Architecture:** Comparison pages are static, content-driven routes (`src/app/compare/[slug]/page.tsx`) fed by a typed registry in `src/lib/comparisons.ts`, rendered with the same lightweight markdown renderer pattern used by `src/app/blog/[slug]/page.tsx`. JSON-LD via the existing `src/components/seo/JsonLd.tsx` + `breadcrumbSchema`. Sitemap, `public/llms.txt`, and `src/lib/markdown-pages.ts` are extended so every compare page gets a sitemap entry, an llms.txt link, and a `.md` twin. Internal links from `/tours`, `/adventures`, `/taxi`, `/consultation` and the Footer.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React, TypeScript, Tailwind, existing `JsonLd`/`breadcrumbSchema` SEO components, `siteConfig` from `src/lib/config.ts`. No new dependencies.

**Spec:** seo-competitor-pages skill (fairness rules: verifiable claims, "as of 2026-10-31" pricing notes, affiliation disclosure, balanced presentation, cite sources) + competitor research annex in §0 below.

## Global Constraints

- Every competitor fact must be verifiable from a public source; cite the URL inline in the content. Where pricing is quoted, include "as of 2026-10-31".
- Every comparison page must visibly disclose that Shri Mata Vaishno Devi Travels is the site owner (affiliation disclosure) — put it in the intro and in the schema (`about`/`publisher`).
- Balanced presentation: each competitor named gets at least one honest strength.
- No ranking promises. No claim that Google/llms.txt affects Search.
- Min 1,500 words per page (skill requirement), H1 under 70 chars, title formula per skill.
- Pages must be server-rendered, accessible (named controls, landmarks — the site already passes agent-accessibility-tree), CLS-safe (no layout-shifting embeds).
- Every new public page must appear in `sitemap.ts`, `public/llms.txt`, and the markdown registry, and return real 404 for unknown compare slugs.
- Verification for every task: `node node_modules/typescript/bin/tsc --noEmit`, `next build`, and curl checks against `next start` (200 HTML, 200 `.md`, negotiation, 404 on unknown slug).

## §0 Research annex — page-1 competitors and extracted meta (checked 2026-10-31)

### Query: "Vaishno Devi yatra package from Delhi 2026 price best travel agency Katra"
| Domain | Title (≤70c pattern) | Meta description gist | Keywords/schema | Price |
|---|---|---|---|---|
| irctctourism.com (NDR01) | "IRCTC Tourism Official Website" (generic, weak) | generic booking blurb; kw: "Bharat Tirtha Darshan, Affordable Package tours…" | Organization, ContactPoint | — |
| avaniholidays.in | "Vaishno Devi Tour Package From Delhi With Helicopter - AvaniHolidays" | customize package, exclusive deals; kw: "Vaishno Devi tour package from Delhi, honeymoon, volvo tour packages" | Product, AggregateRating, Brand, BreadcrumbList | — |
| prayagsamagam.com | "Vaishno Devi Tour Package \| Rs.8,000" (price-in-title) | 3N/4D pilgrimage, guided darshan | Product+TouristTrip+AggregateRating+MerchantReturnPolicy+FAQ… (richest schema) | ₹8,000 |
| ayodhyacarhire.com | "Vaishno Devi Tour Package With Shivkhodi & Patnitop" | 4N/5D itinerary | Product, AggregateRating, PropertyValueSpecification | — |
| sotc.in | (no title — weak) | Vaishno Devi + Kashmir combo | Product, Offer, Trip, Table, VideoObject | ₹14,900 |
| ojastravel.com | "Vaishno Devi Tour Package from Katra \| Best Price Darshan Trip 2026 \| Ojas Travel" | family, senior citizens, group tours; 10 meta keywords (helicopter package, trip cost, pilgrimage tour…) | TouristTrip+FAQPage+ItemList+TravelAgency+AggregateRating (very rich) | — |
| indianholiday.com | "Maa Vaishno Devi Tour Packages - Yatra by Helicopter & Road" | helicopter & road deals | CollectionPage, WebSite | — |
| katratravels.in | "Best Tour and Travels in Katra \| Katra Travel Agency & Kashmir Packages" | 18 meta keywords: "katra travel agents, katra cab service, jammu katra express…" | TravelAgency, GeoCoordinates | — |
| kesari.in | "Best India & World Tour Packages | Awarded Best Tour Operator" | group tours | ItemList | ₹3.3L+ (world tours) |
| maavaishnodevi.live | yatra guide / official bookings (Shrine Board info) | informational | — | — |

### Query: "Kashmir tour package from Delhi 2026 best price"
| Domain | Title | Desc gist | Schema | Price |
|---|---|---|---|---|
| kashmirtourtravel.com | "Srinagar Gulmarg Sonmarg Pahalgam Tour Package - Kashmir" | "Compare the route, stays and inclusions… written quote" (comparison language!) | TouristTrip, TravelAgency | ₹15,650 |
| travelcoffee.in | "Best Kashmir Tour Packages 2026 \| Packages from ₹7,999" (price+year in title) | families, couples, honeymooners from ₹7,999 | FAQPage, TouristDestination, TravelAgency | ₹7,999 |
| tusktravel.com | "Kashmir Tour Packages — Srinagar, Gulmarg & Pahalgam Itineraries" | houseboats, gondola, custom quotes | — | — |
| kashmirtourismpackage.in | "Kashmir Tour Packages \| Best Kashmir Tour Packages" | "Upto 45% Off, Lowest Price Guaranteed" | TravelAgency | — |
| sotc.in | (no title) | J&K packages from Delhi | Product, ItemList, Table, Trip | ₹19,800 |
| joytourandtravels.com | "Kashmir Tour Packages - Book… at Best Price" | airfare+hotel+sightseeing | — | — |
| kashmirtoursandtravels.com | "Kashmir Tour Packages \| Srinagar, Gulmarg & Pahalgam Tours" | "from ₹11,900 per person, private cabs" | TravelAgency | ₹11,900 |
| jaktourandtravels.com | "Kashmir Tour Packages – JAK Tour & Travels Srinagar" | "Transparent pricing… Free Shikara ride included" | — | ₹11k–30k |
| acmekashmirtravels.com | "Kashmir Tour Packages 2026–27" | "Compare packages 2–9 nights with listed rates" | CollectionPage, FAQPage, ItemList | — |
| yatra.com | "Kashmir Packages from Delhi" | "Rs. 6,890 – 42,990 per person twin sharing" | — | ₹6,890–42,990 |
| kesari.in | "Best India & World Tour Packages" | group tours | — | — |

### Comparison-intent SERP landscape (2026-10-31)
- "Vaishno Devi helicopter vs trek vs ropeway" → happyfares.in, tripclap, trivenicabs, yatradham, holidify, tourmyindia (blog posts). Facts: helicopter ~₹2,000–2,500 one-way Katra↔Sanjichhat (SMVDSB), ropeway ₹100 return (Katra↔Bhairon Ghati), 13 km trek; new ₹200–250 Cr base-camp→Bhawan ropeway in bidding (Swarajya, RITES) — not operational.
- "Kedarnath vs Vaishno Devi trek" → udanaviation.in has a comparison-table blog (precedent: comparison pages rank).
- "IRCTC vs private tour operator" → almost no dedicated page; bestbus.in/ritualholidays are listicles. **Content gap.**
- "Kashmir private cab vs group tour" → no dedicated comparison page. **Content gap.**
- "Best Katra travel agencies / top tour operators" → Justdial, TripAdvisor, katratravels.in. **Roundup gap for a licensed-operator angle (JKAT license).**

### Keyword phrases dominating competitor titles/descriptions/H1s
"tour package", "from Delhi", "best price", "2026", "helicopter", "yatra package", "darshan", "honeymoon", "family", "group tour", "private cab", "customised/customized", "price from ₹X", "verified/licensed travel agency", "24/7 WhatsApp", "free quote", "itinerary", "inclusions".

### Our current meta (live, 2026-10-31) — baseline
- `/`: title "Shri Mata Vaishno Devi Travels — Your Gateway to Kashmir's Untouched Beauty"; desc covers yatra packages, Kashmir tours from Delhi, hotels, taxi, adventures; schema TravelAgency+WebSite.
- `/tours`: "Kashmir & Vaishno Devi Tour Packages | …"; ItemList only (no FAQ/TouristTrip on the listing).
- `/adventures`, `/taxi`, `/hotels`, `/consultation`: single-purpose titles, thin schema (ItemList/TaxiService).
- Gap: no comparison/alternatives pages at all; no FAQPage on listing pages; no price-in-title anywhere.

## §1 Pages to build (all under `/compare/[slug]`)

| # | Slug | Type | Primary keyword | Title formula (≤70c where possible) |
|---|---|---|---|---|
| 1 | `vaishno-devi-helicopter-vs-trek-vs-ropeway` | X vs Y vs Z comparison | "vaishno devi helicopter vs trek 2026" | "Vaishno Devi: Helicopter vs Trek vs Ropeway (2026 Costs)" |
| 2 | `irctc-vaishno-devi-package-vs-private-tour-operator` | X vs Y (affiliation disclosed) | "irctc vs private tour operator vaishno devi" | "IRCTC vs Private Operator: Vaishno Devi Package 2026" |
| 3 | `kashmir-group-tour-vs-private-cab` | X vs Y | "kashmir group tour vs private cab" | "Kashmir 2026: Group Tour vs Private Cab — Which Wins?" |
| 4 | `vaishno-devi-vs-amarnath-yatra` | X vs Y | "vaishno devi vs amarnath yatra" | "Vaishno Devi vs Amarnath Yatra: 2026 Comparison" |
| 5 | `best-katra-travel-agencies-2026` | alternatives/roundup | "best travel agency katra 2026" | "7 Best Katra Travel Agencies in 2026 (Licensed & Reviewed)" |

Secondary keywords per page (from competitor extraction): "tour package from delhi", "price from", "helicopter booking", "darshan package", "custom itinerary", "family tour", "senior citizens", "24/7 support", "fixed fare taxi", "written quote", "inclusions exclusions".

Each page: intro with affiliation disclosure → comparison table (feature matrix per skill) → per-option pros/cons + "best for" → pricing table with "as of 2026-10-31" + source links → FAQ (≥5 Q&A, FAQPage schema) → verdict/recommendation → CTA to `/consultation` (above fold summary + after table + bottom) → related comparisons cross-links → "Last updated 2026-10-31" + methodology note.

## Review Focus

1. **Unverifiable competitor claims** — a competitor row must have a source URL or be marked "not publicly available" (skill error-handling). Test: every table row in the registry has either a `source` or the literal string.
2. **Stale pricing** — every ₹ figure carries `asOf: "2026-10-31"`. Test: schema/content assertion.
3. **Unknown slug must 404** (both HTML and `.md`), never a catch-all 200 (breaks `http-404` audit).
4. **Affiliation disclosure present** on roundup/comparison pages where we list ourselves. Test: page HTML contains the disclosure string; JSON-LD publisher = our org.
5. **Markdown parity** — each `/compare/x` has `/compare/x.md` via negotiation + `.md` URL, with `Vary: Accept`, else `markdown-delivery` regresses.

## Task Structure

### Task 1: Comparison content registry

**Files:**
- Create: `src/lib/comparisons.ts`

**Interfaces:**
- Produces: `export interface ComparisonPage { slug, title, description, h1, updatedAt, affiliationDisclosure, intro, sections: ComparisonSection[], table: { headers: string[], rows: { cells: string[], source?: string }[] }, faq: { q, a }[], verdict, related: string[] }`; `export const comparisons: ComparisonPage[]`; `export function getComparison(slug: string): ComparisonPage | undefined`.

- [ ] **Step 1: Create `src/lib/comparisons.ts` with the 5 pages from §1 fully written out** (≥1,500 words each, all facts from §0 with inline source URLs, every price tagged as of 2026-10-31, disclosure string on pages 2 and 5).
- [ ] **Step 2: Type-check** — `node node_modules/typescript/bin/tsc --noEmit` → clean.
- [ ] **Step 3: Word-count + fairness lint script** — throwaway script (not committed) asserting each page ≥1,500 words, every table row has `source` or "not publicly available", every ₹ figure adjacent to the as-of date. Run once, report counts.

### Task 2: `/compare` index + `[slug]` route

**Files:**
- Create: `src/app/compare/page.tsx` (index: ItemList of all comparisons, links)
- Create: `src/app/compare/[slug]/page.tsx` (detail page; `generateStaticParams` from registry; `notFound()` for unknown slugs; `generateMetadata` per slug; reuses the `renderContent`-style markdown renderer pattern from `src/app/blog/[slug]/page.tsx`, JsonLd, breadcrumbSchema, CTASection; comparison table rendered as a real `<table>`; FAQ accordion server-rendered)

**Interfaces:**
- Consumes: `comparisons`, `getComparison` from Task 1; `JsonLd`, `breadcrumbSchema`, `CTASection`, `siteConfig`.
- Produces: routes `/compare` and `/compare/:slug`; JSON-LD on detail pages: `Article` + `FAQPage` + `BreadcrumbList` (+ `ItemList` on index).

- [ ] **Step 1: Implement both routes.**
- [ ] **Step 2: Verify** — `tsc --noEmit` clean; `next build` succeeds; `next start`, then curl: `/compare` 200, each slug 200, `/compare/nope` 404, `/compare/nope.md` 404.

### Task 3: Discovery wiring (sitemap, llms.txt, markdown, nav)

**Files:**
- Modify: `src/app/sitemap.ts` (add `/compare` static entry + one entry per comparison slug, priority 0.8, weekly)
- Modify: `public/llms.txt` (add "## Comparisons" section with 5 www links + index)
- Modify: `src/lib/markdown-pages.ts` (add `/compare` and each `/compare/<slug>` to the markdown registry so `.md` URLs + Accept negotiation work through the existing `/md/[...path]` route and `src/proxy.ts`)
- Modify: `src/components/Navbar.tsx` and/or `src/components/Footer.tsx` (add "Compare" link in nav/footer quick links)

**Interfaces:**
- Consumes: registry from Task 1.

- [ ] **Step 1: Make the four edits.**
- [ ] **Step 2: Verify** — build + `next start`; curl: `/compare/vaishno-devi-helicopter-vs-trek-vs-ropeway.md` → 200 `text/markdown`; `Accept: text/markdown` on the HTML URL → markdown + `Vary: Accept`; `/sitemap.xml` contains all 6 compare URLs; `/llms.txt` lists them; home/nav HTML contains the Compare link.

### Task 4: Internal links from commercial pages

**Files:**
- Modify: `src/app/tours/page.tsx` (link "Compare: IRCTC vs private operator", "Group tour vs private cab" near the top)
- Modify: `src/app/taxi/page.tsx` (link the group-vs-private page)
- Modify: `src/app/adventures/page.tsx` and `src/app/faq/page.tsx` (cross-links to related comparisons)

- [ ] **Step 1: Add the links (existing Link + styling patterns).**
- [ ] **Step 2: Verify** — build; curl each modified page, grep for `/compare/` hrefs (≥1 each).

### Task 5: Final verification + deploy prep

- [ ] **Step 1:** `tsc --noEmit`, `next build`, `next start` smoke: all 14 prior checks still pass (robots Content-Signal, llms.txt, markdown negotiation, 404s, alternate link) + new compare checks above.
- [ ] **Step 2:** Rerun `agentic_check.py` against the live site after deploy; confirm `llms-txt`, `markdown-delivery`, `http-404` still pass.
- [ ] **Step 3:** `vercel --prod --yes` deploy; curl-verify the 5 new pages + `.md` twins on production.
- [ ] **Step 4:** Commit all changes with `git commit -m "feat: add /compare comparison pages (competitor-intent keywords)"`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-10-31-competitor-comparison-pages.md`. Please review the plan — in particular the 5 chosen slugs/keywords in §1 and the competitor facts in §0 (all extracted 2026-10-31 from the live SERP). Does it capture what you want, and should I implement it natively in this session?
