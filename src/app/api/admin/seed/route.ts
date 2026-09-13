import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const now = new Date().toISOString();
const uuid = () => crypto.randomUUID();
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const daysFromNow = (n: number) => new Date(Date.now() + n * 86400000).toISOString();

export async function POST() {
  try {
    // ── Tours ──
    const tours = [
      { id: uuid(), title: "Kashmir Explorer", slug: "kashmir-explorer", description: "Discover the breathtaking beauty of Kashmir with guided tours to iconic destinations.", shortDescription: "Explore paradise on earth.", duration: "6 Days / 5 Nights", destination: "Kashmir", price: 24999, discountPrice: 19999, featured: true, difficulty: "easy", maxGroupSize: 15, gallery: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80", "https://images.unsplash.com/photo-1587214086729-2d724e209f4d?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Hotel", "Meals", "Transport"], excludes: ["Flight"], highlights: ["Dal Lake", "Gondola", "Mughal Gardens"], rating: 4.9, reviewCount: 234, createdAt: now, updatedAt: now },
      { id: uuid(), title: "Vaishno Devi Yatra", slug: "vaishno-devi-yatra", description: "Embark on a spiritual journey to the sacred Vaishno Devi shrine.", shortDescription: "Sacred pilgrimage.", duration: "3 Days / 2 Nights", destination: "Katra", price: 12999, featured: true, difficulty: "moderate", maxGroupSize: 20, gallery: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Stay", "Meals", "Guide"], excludes: [], highlights: ["Temple Visit", "Bhawan", "Ardhkuwari Cave"], rating: 4.8, reviewCount: 189, createdAt: now, updatedAt: now },
      { id: uuid(), title: "Gulmarg Skiing Adventure", slug: "gulmarg-skiing", description: "Experience world-class skiing in Gulmarg's pristine slopes.", shortDescription: "Ski paradise.", duration: "5 Days / 4 Nights", destination: "Gulmarg", price: 34999, discountPrice: 29999, featured: false, difficulty: "challenging", maxGroupSize: 10, gallery: ["https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Hotel", "Equipment", "Instructor"], excludes: [], highlights: ["Gondola Ride", "Skiing Lessons", "Apres Ski"], rating: 4.7, reviewCount: 156, createdAt: now, updatedAt: now },
    ];

    // ── Adventures ──
    const adventures = [
      { id: uuid(), title: "Pahalgam Trekking", slug: "pahalgam-trekking", description: "Trek through the stunning valleys of Pahalgam with experienced guides.", shortDescription: "Trekking in Kashmir.", category: "trekking", location: "Pahalgam", price: 5999, duration: "2 Days", difficulty: "moderate", minAge: 12, maxGroupSize: 15, featured: true, gallery: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Guide", "Camping", "Meals"], safetyMeasures: ["First Aid", "Satellite Phone"], rating: 4.8, reviewCount: 178, createdAt: now, updatedAt: now },
      { id: uuid(), title: "Zanskar River Rafting", slug: "zanskar-rafting", description: "White water rafting on the mighty Zanskar River through dramatic gorges.", shortDescription: "Rafting adventure.", category: "rafting", location: "Zanskar", price: 8999, duration: "1 Day", difficulty: "challenging", minAge: 16, maxGroupSize: 10, featured: true, gallery: ["https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Equipment", "Guide", "Transport"], safetyMeasures: ["Life Jackets", "Helmet", "Rescue Team"], rating: 4.9, reviewCount: 145, createdAt: now, updatedAt: now },
      { id: uuid(), title: "Sonamarg Camping", slug: "sonamarg-camping", description: "Camp under the stars in the meadows of Sonamarg.", shortDescription: "Camping experience.", category: "camping", location: "Sonamarg", price: 4999, duration: "2 Days", difficulty: "easy", minAge: 8, maxGroupSize: 20, featured: true, gallery: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"], includes: ["Tent", "Meals", "Bonfire"], safetyMeasures: ["Security", "First Aid"], rating: 4.7, reviewCount: 203, createdAt: now, updatedAt: now },
    ];

    // ── Hotels ──
    const hotels = [
      { id: uuid(), name: "The Lalit Grand Palace", slug: "lalit-grand-palace", description: "Experience royal Kashmiri hospitality at The Lalit Grand Palace with stunning Dal Lake views.", shortDescription: "5-star heritage hotel.", location: "Srinagar", address: "Gupkar Road, Srinagar", stars: 5, pricePerNight: 15999, amenities: ["Spa", "Restaurant", "Lake View", "Pool", "Gym"], gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"], featured: true, rating: 4.9, reviewCount: 312, createdAt: now, updatedAt: now },
      { id: uuid(), name: "Kahwa House", slug: "kahwa-house", description: "A cozy boutique hotel in the heart of Gulmarg offering authentic Kashmiri hospitality.", shortDescription: "Boutique stay.", location: "Gulmarg", address: "Main Road, Gulmarg", stars: 4, pricePerNight: 8999, amenities: ["Restaurant", "WiFi", "Garden"], gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80"], featured: true, rating: 4.7, reviewCount: 198, createdAt: now, updatedAt: now },
      { id: uuid(), name: "Bhawan View Katra", slug: "bhawan-view-katra", description: "Family-run hotel 600 m from Banganga trek start — early yatra starts, hot meals at odd hours, and shuttle to the registration counter.", shortDescription: "Hotel near Banganga, Katra.", location: "Katra", address: "Near Banganga, Katra", stars: 3, pricePerNight: 3499, amenities: ["Restaurant", "WiFi", "24x7 Front Desk", "Yatra Assistance", "Luggage Storage"], gallery: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"], featured: false, rating: 4.5, reviewCount: 141, createdAt: now, updatedAt: now },
      { id: uuid(), name: "Lidder Riverside Resort", slug: "lidder-riverside-resort", description: "Riverside resort on the Lidder in Pahalgam — pine-view rooms, riverside garden and easy drives to Betaab and Aru valleys.", shortDescription: "Riverside resort in Pahalgam.", location: "Pahalgam", address: "Lidder Road, Pahalgam", stars: 4, pricePerNight: 7499, amenities: ["Restaurant", "WiFi", "Garden", "Bonfire", "Parking"], gallery: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80", "https://images.unsplash.com/photo-1595815771614-2296c14805ee?w=1200&q=80"], featured: false, rating: 4.6, reviewCount: 167, createdAt: now, updatedAt: now },
    ];

    // ── Blogs ──
    const blogs = [
      { id: uuid(), title: "Top 10 Things to Do in Kashmir", slug: "top-10-things-to-do-in-kashmir", content: "Kashmir is a paradise on earth offering countless experiences. From houseboat stays on Dal Lake to trekking in Sonamarg, here are the top 10 things you must do. Read our detailed [best time to visit guide](/blog/best-time-to-visit-kashmir-guide) or browse [Kashmir tour packages](/tours) for a curated trip.", excerpt: "Best experiences in Kashmir.", author: "Shri Mata Vaishno Devi Team", coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80", tags: ["travel", "kashmir"], category: "Travel Guide", published: true, views: 1250, createdAt: now, updatedAt: now },
      // ── SEO long-tail posts (from content/blog-drafts) — interlinked, target real queries ──
      {
        id: uuid(),
        title: "Vaishno Devi Yatra 2026: Complete First-Timer's Guide (Parchi, Trek, Helicopter & Cost)",
        slug: "vaishno-devi-yatra-first-timer-guide",
        content: `Vaishno Devi is India's most-visited shrine after Tirupati — over 8 million pilgrims a year make the 14 km climb from Katra to the holy cave at 1,584 metres. It's completely doable as a first-timer, but the yatra has its own system: registration, RFID cards, ponies, palkis, helicopter slots. This guide walks you through everything in the order you'll actually experience it.

## What is the Vaishno Devi yatra and how long does it take?

The yatra is the 14 km paved trek from Katra (1,700 ft) to the Vaishno Devi Bhawan cave (5,200 ft). Most pilgrims complete it in 6–9 hours up and 4–5 hours down. A same-day return yatra means leaving Katra by 4–5 AM. Many devotees also extend to Bhairon Temple (2.5 km further), which completes the traditional yatra.

**Best for:** First-timers, families, seniors (with helicopter or palki)

## Step 1 — Yatra registration (parchi + RFID card)

Every pilgrim must register before starting the trek. Two ways:

- **Online (recommended):** Book on the official Shrine Board website (maavaishnodevi.org) — free, generates a yatra parchi with a date and slot
- **At Katra:** Yatra Registration Counter at the railway station or Katra bus stand — carry any photo ID

At Banganga (trek start), your parchi converts to an RFID card worn on the wrist. It tracks you through every checkpoint — keep it on until you exit. Without registration you cannot cross Banganga.

- **Documents:** Any government photo ID (Aadhaar, DL, voter ID)
- **Cost:** Registration is free. RFID card deposit is refundable at the end

## Step 2 — Reaching Katra

Katra has its own railway station on the Jammu–Baramulla line, and Jammu Tawi (50 km, ~1.5 hrs) connects to the rest of India. Most packages include a Jammu–Katra taxi pickup.

| Route | Distance | Typical taxi fare |
| --- | --- | --- |
| Jammu Airport → Katra | 50 km | ₹2,500–3,000 sedan |
| Jammu Tawi Station → Katra | 50 km | ₹2,500–3,000 sedan |
| Delhi → Katra (train) | 655 km | ₹700–2,500 (Sleeper–3AC) |
| Srinagar → Katra | 260 km | ₹6,000–8,000 SUV |

## Step 3 — The trek: Banganga to Bhawan

The track is paved, lit all night, with cafeterias, washrooms and medical posts roughly every 1–2 km.

- **On foot:** 6–9 hours. Start 4–5 AM for a comfortable same-day return
- **Pony:** ₹1,000–1,500 from Banganga to Bhawan (fixed Shrine Board rates)
- **Palki (doli):** ₹3,000–5,000 per person, carried by a 4-person team — best for seniors
- **Battery car:** Only from Ardhkuwari to Bhawan segment, ₹300, limited tickets

The climb is steady but never technical.

## Step 4 — Helicopter option (Katra → Sanjichhat)

The helicopter drops you at Sanjichhat, 2.5 km from the Bhawan — cutting the trek to under an hour of easy walking.

- **Route:** Katra (Udhampur helipad base) → Sanjichhat, ~8 minutes
- **Fare 2026:** ~₹2,130 one-way per seat, official booking only through the Shrine Board site
- **Tip:** Seats for Navratri and summer weekends sell out weeks in advance — book the moment your dates are fixed. Our [Vaishno Devi tour packages](/tours) include helicopter booking as part of the package.

## Step 5 — Darshan and Bhairon Temple

At the Bhawan, darshan runs continuously through the night in 2–3 hour queues depending on season. Special Aarti darshan tickets (₹500–2,000) shorten the wait. After darshan, the traditional yatra completes at Bhairon Temple, 2.5 km above the Bhawan (battery car and pony available).

## What it costs — realistic budgets per person

| Item | Budget | Comfort |
| --- | --- | --- |
| Katra hotel (2 nights) | ₹1,200–2,000 | ₹3,000–6,000 |
| Meals | ₹600–1,000 | ₹1,500–2,500 |
| Pony/palki (optional) | — | ₹1,000–5,000 |
| Helicopter (optional) | — | ₹4,260 return |
| Jammu–Katra taxi (shared) | ₹500 | ₹3,000 private |
| **Total (without heli)** | **₹2,500–4,000** | **₹8,000–13,000** |

A complete guided package with hotel, transfers, registration help and meals typically runs ₹5,999–8,500 per person — see our [current packages](/tours) for exact 2026 pricing.

## Best time for the yatra

- **March–June:** Peak season — pleasant weather, biggest crowds
- **July–September:** Monsoon — fewer crowds, carry rain gear; occasional track advisories
- **October–November:** Navratri — most auspicious, most crowded, book everything 4–6 weeks ahead
- **December–February:** Cold but serene; snow on the upper track possible, carry layers

## First-timer mistakes to avoid

- Starting the trek at noon — you'll climb in the hottest hours with the biggest crowds
- Skipping the free locker at Banganga — leather items and electronics are restricted inside; carry only essentials
- Not carrying your RFID card visible — checkpoints won't let you through without it
- Booking Katra hotels after arriving — Navratri and long weekends sell out the whole town
- Ignoring altitude — the Bhawan sits at 1,584 m; go slow if you have cardiac or knee issues

## Plan your yatra with a local team

We're a licensed Katra agency running Vaishno Devi packages for 8+ years — hotel near Banganga, Jammu pickup, registration assistance and helicopter slots handled end-to-end. Browse our [Vaishno Devi and Kashmir tour packages](/tours) or [contact us](/contact) for a custom plan.`,
        excerpt: "Planning your first Vaishno Devi yatra? Complete 2026 guide — yatra parchi and RFID registration, the 14 km trek from Banganga, helicopter vs walking, Katra hotels, costs, and what nobody tells first-timers.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1571348659398-985afc7adde5?w=1200&q=80",
        tags: ["vaishno devi", "yatra", "pilgrimage", "katra"],
        category: "Vaishno Devi",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Kashmir Tour Package from Delhi: 5N/6D Itinerary, Cost & Booking Guide (2026)",
        slug: "kashmir-tour-package-from-delhi",
        content: `Kashmir is the one-hour flight that feels like a different country — Dal Lake shikaras at dawn, Gulmarg's gondola above the clouds, Pahalgam's pine forests along the Lidder. Delhi travellers do this trip year-round, and the 5 nights / 6 days Srinagar–Gulmarg–Pahalgam circuit is the format that works. Here's the full plan with honest 2026 costs.

## Why 5 nights / 6 days is the right length

Fewer days and you rush Gulmarg or skip Pahalgam's valleys; more days usually just add a second Srinagar night. The classic split:

- **Day 1–2:** Srinagar (arrival, Mughal Gardens, Dal Lake)
- **Day 3:** Gulmarg (gondola, meadows)
- **Day 4–5:** Pahalgam (Betaab, Aru, Chandanwari valleys)
- **Day 6:** Srinagar houseboat night or departure

## Getting there from Delhi

| Option | Time | Cost (one way) | Verdict |
| --- | --- | --- | --- |
| Flight DEL → SXR | 1h 25m | ₹3,500–9,000 | Best — book 6–8 weeks ahead for summer |
| Train to Jammu + taxi | 12–14 hrs | ₹700–2,500 + ₹3,000 | Budget-friendly, tiring |
| Direct train to Srinagar (via Katra) | ~13 hrs | ₹800–2,500 | New rail link — scenic through the Pir Panjal |

## Day-wise itinerary

### Day 1 — Arrive Srinagar
Land at Sheikh ul-Alam Airport, transfer to your hotel or houseboat. Evening shikara ride on Dal Lake.

### Day 2 — Srinagar sights
Mughal Gardens circuit (Nishat Bagh, Shalimar Bagh, Chashme Shahi), Shankaracharya Temple, and handicraft shopping — pashmina, papier-mâché, saffron.

### Day 3 — Gulmarg day trip (or overnight)
Drive 50 km through the Pir Panjal foothills. The Gulmarg Gondola is the reason you come — Phase 1 to Kongdoori, Phase 2 to Apharwat at nearly 4,000 m. Ride the gondola **early** — Phase 2 closes often for wind/weather.

### Day 4 — Srinagar → Pahalgam
90 km along the Lidder River. Afternoon: Betaab Valley and the riverside.

### Day 5 — Aru and Chandanwari
Local cab to Aru Valley and Chandanwari. Evening back to Srinagar — or take the houseboat night here.

### Day 6 — Departure
Last-minute saffron shopping, airport transfer. Keep 3 hours buffer — Srinagar airport security is thorough.

## What a 5N/6D Kashmir package actually costs (per person, 2026)

| Tier | Price | What you get |
| --- | --- | --- |
| Budget | ₹12,500–16,000 | 2–3 star hotels, sedan cab, breakfast |
| Standard | ₹16,000–29,000 | 3–4 star hotels, SUV, breakfast + dinner, gondola tickets |
| Luxury | ₹38,000–45,000+ | 5 star/houseboat premium, private Innova, all entries, winter gear |

## Best time to visit Kashmir from Delhi

- **March–May:** Tulip bloom, 10–22°C — the most beautiful window
- **June–August:** Peak summer escape, biggest crowds and prices
- **September–November:** Chinar gold, crisp air, thin crowds — the underrated choice
- **December–February:** Snow season — Gulmarg skiing, frozen Dal

## Mistakes that waste a day

- Treating Gulmarg as a half-day — Phase 2 queues eat hours; start at dawn
- Not budgeting for local sightseeing cabs in Pahalgam
- Booking flights before hotels in peak season
- Skipping the houseboat night — it's the most Kashmir thing you'll do

## Book with a local operator

We run [Kashmir tour packages from Delhi](/tours) with Katra and Srinagar ground teams — private cabs, gondola tickets and houseboat nights included. See the [packages](/tours) or [talk to us on WhatsApp](/contact) for a custom 5N/6D quote.`,
        excerpt: "The complete Delhi to Kashmir plan — 5 nights / 6 days across Srinagar, Gulmarg and Pahalgam with day-wise itinerary, real 2026 costs, flights vs train, and the mistakes that waste a day of your trip.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        tags: ["kashmir", "delhi", "tour package", "itinerary"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Vaishno Devi Bhawan Room Booking Guide 2026: Shrine Board vs Private Hotels",
        slug: "vaishno-devi-bhawan-room-booking",
        content: `Eight million pilgrims a year pass through Katra, and accommodation is the part that decides whether your yatra feels smooth or exhausting. You have two very different options: the Shrine Board's own guest houses, and Katra's private hotels. This guide covers both — prices, booking rules, and which area to pick.

## Option 1 — Shrine Board accommodation

The Vaishno Devi Shrine Board (SMVDSB) runs its own properties, from ₹150 dormitory beds to ₹1,500-family rooms.

| Property | Where | Price range (2026) |
| --- | --- | --- |
| Niharika Bhawan | Katra (Yatra counter area) | ₹800–1,500 |
| Shakti Bhawan | Katra | ₹600–1,200 |
| Vaishnavi Dham / Saraswati Dham | Near railway station | ₹400–1,000 |
| Dormitories (Banganga / Manokamna Bhawan) | Katra | ₹150–300 per bed |
| Bhawan-area cottages (Manokamna) | At the shrine | ₹800–1,500 |

### How to book
- **Official site:** maavaishnodevi.org → "Online Services" → Accommodation. Create an account, book against your yatra parchi
- **Booking window:** 60 days ahead — Navratri and summer weekend slots vanish within minutes
- **At the counter:** same-day rooms often available at the Katra enquiry office, but never count on it in season

## Option 2 — Private hotels in Katra

Katra has 200+ private hotels in three clusters:

- **Near Banganga / Yatra parchi counter:** best for an early trek start; mid-range family hotels ₹1,500–3,500
- **Main Katra road (bus stand side):** bigger hotels with parking; ₹2,000–5,000
- **Premium:** ₹3,500–8,000, most with shuttle to Banganga

**What to check before booking a private hotel:** distance to Banganga in walking minutes; early check-in; packed-breakfast option; luggage storage for the trek day.

## Bhawan-area stays — should you sleep at the top?

If you're doing the yatra over two days or travelling with seniors, staying near the Bhawan beats descending at night. Shrine Board cottages at Manokamna Bhawan are the only official option at the top.

## Which area is right for you?

| Traveller | Best pick |
| --- | --- |
| First-timer, one-day yatra | Katra hotel near Banganga |
| Family with kids | Main-road hotel, 2 nights, helicopter optional |
| Seniors | Shrine Board Niharika + helicopter to Sanjichhat |
| Budget solo | Shrine Board dormitory ₹150–300 |
| Navratri pilgrim | Whatever books 45+ days out |

## Book Katra stays with a local team

We're based in Katra and book hotels here every day — see our [Katra and Kashmir hotels](/hotels) or bundle your stay into a complete [Vaishno Devi yatra package](/tours) with transfers and registration help included.`,
        excerpt: "Where to stay for the Vaishno Devi yatra — Shrine Board guest houses (₹150 dorms to ₹1,500 rooms), private Katra hotels, Bhawan-area accommodation, and the booking windows that decide whether you get a room at all.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        tags: ["vaishno devi", "katra hotels", "bhawan booking"],
        category: "Vaishno Devi",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Best Time to Visit Kashmir: Month-by-Month Guide (2026)",
        slug: "best-time-to-visit-kashmir-guide",
        content: `There's no wrong month for Kashmir — only the wrong month for *you*. A honeymoon in January and a trek in January are two different trips. Here's every month, honestly.

## Quick answer

- **Snow and skiing:** December–February (best snow: January)
- **Tulips and blossoms:** Late March–April
- **Green meadows, all passes open:** May–August
- **Autumn colours, best prices:** September–November

## Month by month

### March — spring arrives
10–18°C. Almond and cherry blossoms, gardens waking up. Crowds still thin.

### April — tulip month
The Indira Gandhi Memorial Tulip Garden (Asia's largest) hits full bloom for ~3 weeks, usually early-to-mid April. This is the most photographed window.

### May — perfect weather
18–28°C in Srinagar, snow still on the Apharwat peaks. Every valley accessible.

### June — peak season begins
Summer holidays. Book flights 6–8 weeks out; weekend Srinagar hotels sell out.

### July — green and busy
Monsoon reaches the valley but Kashmir's rain is gentler. Meadow trekking at its best.

### August — saffron fields prep
High season continues. Great Lakes and Tarsar Marsar treks run full.

### September — the insider's month
Chinar trees begin turning gold, crowds drop, prices fall 15–20%. Apple harvest.

### October — golden autumn
Copper and gold. Crisp mornings, clear skies, best photography light.

### November — quiet and cold
5–15°C, fewest tourists. Hotels at their cheapest.

### December — snow season opens
Gulmarg's ski season starts; Dal Lake freezes at the edges. Christmas–New Year is premium.

### January — deep snow
The skiing month. Gulmarg's powder at its best.

### February — snow with thinner crowds
Skiing continues, queues shorter. Best snow-month value.

## Season × price × crowd summary

| Season | Months | Crowd | Prices | Come for |
| --- | --- | --- | --- | --- |
| Spring | Mar–Apr | Medium | Medium | Tulips, blossoms |
| Summer | May–Aug | High | High | Green valleys, treks |
| Autumn | Sep–Nov | Low | Low | Colours, photography, value |
| Winter | Dec–Feb | High (holidays) | Medium–High | Snow, skiing |

## Matching the season to your trip

- **Honeymoon:** April, September, or December
- **Family with kids:** May–June or September
- **Trekking:** July–September
- **Skiing:** Late December–February
- **Photography:** April (tulips) or October (chinar gold)
- **Budget travel:** September and November

## Pick a month and we'll plan around it

Our [Kashmir tour packages](/tours) run year-round with season-adjusted itineraries. [Talk to our Katra team](/contact) for the month you have in mind.`,
        excerpt: "Kashmir month by month — tulips in April, skiing in January, saffron in October. Snow seasons, crowd levels, prices, and the one window most travellers never consider.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80",
        tags: ["best time", "kashmir", "season", "weather"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Jammu to Katra Taxi Fare Guide 2026: Vehicle Rates, Booking & Routes",
        slug: "jammu-to-katra-taxi-fare-guide",
        content: `Jammu to Katra is 50 km of highway — about 1.5 hours — and it's the first leg of nearly every Vaishno Devi yatra. Fares look simple, but airport stands, night arrivals and season surge make the range wide. Here's the honest 2026 picture.

## Jammu to Katra taxi fares (2026)

| Vehicle | Seats | One-way fare | Best for |
| --- | --- | --- | --- |
| Sedan (Dzire/Etios) | 4 | ₹2,500–3,000 | Couples, small families |
| Ertiga / Rumion | 6 | ₹3,500–4,500 | Family + luggage |
| Innova / Crysta | 6–7 | ₹4,500–5,500 | Comfort, seniors |
| Tempo Traveller 12–17 seat | 12–17 | ₹5,000–7,500 | Groups, yatra parties |

- Night pickup (10 PM–6 AM): +₹200–500 driver allowance
- Return-trip bookings usually discount 10–15%

## Airport vs railway station pickup

- **Jammu Airport (IXJ):** prepaid stand outside arrivals — convenient but quoted highest. Pre-booked cabs wait with a name board inside
- **Jammu Tawi Station:** prepaid booth at the exit; agree the full fare *before* sitting in
- **Katra Railway Station:** if your train runs to Katra itself, the station is 2 km from Banganga

## Booking options compared

1. **Prepaid stand** — no haggling, but peak-season rates
2. **Hotel arrangement** — convenient, typically 10–15% commission built in
3. **Direct operator booking (call/WhatsApp)** — fixed fare, named driver, flight/train tracking
4. **App cabs (Uber/Ola)** — unreliable for outstation Katra drops

## The Katra drop: what to know

- Katra town closes to heavy vehicles at certain hours — expect the last 2 km on a smaller road
- Your hotel's gate matters: "Katra hotel" can mean a 5-minute or 25-minute walk to the trek start
- Continuing to Srinagar or Patnitop after the yatra? Book it as one round-trip with the same operator

## Beyond Katra: popular taxi routes

| Route | Distance | Sedan approx. |
| --- | --- | --- |
| Katra → Shiv Khori | 75 km | ₹3,000 |
| Katra → Patnitop | 80 km | ₹3,200 |
| Katra → Srinagar | 260 km | ₹6,500–8,000 |
| Jammu → Srinagar | 290 km | ₹7,000–9,000 |

## Fixed-fare booking with us

We run our own fleet with fixed published fares — sedan ₹3,000, Innova ₹5,000, Tempo Traveller from ₹5,000 for Jammu–Katra, meet-and-greet at any hour, no surge in Navratri week. See [taxi service details](/taxi) or message us on WhatsApp for an instant quote.`,
        excerpt: "What a Jammu to Katra taxi actually costs in 2026 — sedan, Innova and Tempo Traveller rates, airport vs railway pickup, night charges, and how to avoid overpaying at the stand.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
        tags: ["jammu to katra", "taxi fare", "katra taxi"],
        category: "Travel Tips",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      // ── Batch 2: destination & activity guides (long-tail interlinked) ──
      {
        id: uuid(),
        title: "Things to Do in Gulmarg: Gondola, Skiing & Meadows (2026 Guide)",
        slug: "things-to-do-in-gulmarg",
        content: `Gulmarg — "Meadow of Flowers" — is Kashmir's adventure capital at 2,650 m. In winter it's India's premier ski resort; in summer its alpine meadows bloom and the gondola carries you nearly 4,000 m up Apharwat. Here's everything worth doing.

## Gulmarg Gondola

Asia's highest cable car in two phases:

| Phase | To | Height | 2026 fare (return) |
| --- | --- | --- | --- |
| Phase 1 | Kongdoori | 3,080 m | ₹740 |
| Phase 2 | Apharwat | 3,953 m | ₹950 |

**Go early** — Phase 2 closes often for wind, and afternoon queues are long. Our [Kashmir packages](/tours) include gondola tickets.

## Skiing & snow

December–March is ski season. Beginners take lessons on the lower slopes; confident skiers head to Phase 2 and backcountry. Gear and instructors are available in town — book ahead in peak snow.

## Summer meadows & trekking

July–September the meadows are green and the [Great Lakes trek](/adventures/category/trekking) region opens. Pony rides, golf at the world's highest course, and strawberry fields line the approach road.

## Where to stay

See [Gulmarg hotels](/hotels/location/gulmarg) — from slope-side resorts to boutique stays like Kahwa House.

## Getting there

Srinagar → Gulmarg is 50 km (~1.5–2 hrs). Book a [Kashmir taxi](/taxi) for the day or bundle it into a [tour package](/tours).`,
        excerpt: "Gulmarg gondola phases and fares, skiing season, summer meadows and treks, plus where to stay and how to reach this Kashmir adventure hub.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80",
        tags: ["gulmarg", "gondola", "skiing", "kashmir"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Things to Do in Pahalgam: Betaab, Aru & Chandanwari Valleys",
        slug: "things-to-do-in-pahalgam",
        content: `Pahalgam sits where the Lidder River enters a pine valley at 2,140 m — the base for the Amarnath yatra and some of Kashmir's prettiest day trips. Most travellers spend a night or two here on a [5N/6D Kashmir tour](/tours/kashmir-explorer).

## The three valleys

- **Betaab Valley** — film-famous riverside meadow, 15 min from town. Entry ₹50.
- **Aru Valley** — quieter meadows, starter treks, pony rides (20 km).
- **Chandawari** — Amarnath route base, glacier views (16 km).

## Trekking & rafting

[Pahalgam trekking](/adventures/pahalgam-trekking) and Lidder river walks start here. Nearby, the [Zanskar river rafting](/adventures/zanskar-rafting) is a full-day white-water run.

## Where to stay

[Browse Pahalgam & Kashmir hotels](/hotels) — riverside cottages to family resorts.

## Getting there

Srinagar → Pahalgam is 90 km (~2.5–3 hrs) along the Lidder. Note: local sightseeing cabs in Pahalgam are union-run and separate from your tour vehicle — budget for them. See [taxi options](/taxi).`,
        excerpt: "Pahalgam's Betaab, Aru and Chandanwari valleys, trekking and rafting, where to stay, and how to plan the drive from Srinagar.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        tags: ["pahalgam", "betaab valley", "aru valley", "kashmir"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Things to Do in Srinagar: Dal Lake, Mughal Gardens & Old City",
        slug: "things-to-do-in-srinagar",
        content: `Srinagar is the gateway to Kashmir and a destination in itself — houseboats on Dal Lake, the Mughal Gardens, and a old city of saffron and shawls. Most [Kashmir tours](/tours) start here.

## Dal Lake & shikara

A sunrise shikara ride is unmissable. Stay on a [houseboat](/hotels) for the full experience — floating markets, wet gardens and mountain reflections.

## Mughal Gardens

- **Nishat Bagh** — the largest, with 12 terraces down to the lake.
- **Shalimar Bagh** — the emperor's garden.
- **Chashme Shahi** — smallest, with a natural spring.

## Shankaracharya Temple

A hilltop Shiva temple with the best valley panorama — 243 steps up.

## Food & shopping

Try Wazwan (multi-course Kashmiri feast), Kahwa saffron tea, and pashmina. Buy saffron only with the Pampore seal.

## Stay & reach

See [Srinagar hotels](/hotels/location/srinagar) (including The Lalit Grand Palace) and book a [Srinagar airport taxi](/taxi).`,
        excerpt: "Dal Lake shikara and houseboats, the Mughal Gardens, Shankaracharya Temple, Kashmiri food and where to stay in Srinagar.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1587214086729-2d724e209f4d?w=1200&q=80",
        tags: ["srinagar", "dal lake", "houseboat", "mughal gardens"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Sonamarg Travel Guide: Thajiwas Glacier & the Zojila Gateway",
        slug: "sonamarg-travel-guide",
        content: `Sonamarg — "Meadow of Gold" — lies 80 km from Srinagar at 2,800 m, the last stop before the Zojila Pass to Ladakh. It's a base for glaciers, alpine lakes and [camping](/adventures/category/camping).

## Thajiwas Glacier

A short pony or walk from town to the glacier (summer only). Snow even in early autumn — great for first-timers who won't reach higher Himalayas.

## Treks & lakes

The trailheads to Vishansar and Krishansar lakes start here. [Sonamarg camping](/adventures/sonamarg-camping) puts you under the stars in the meadows.

## Best time

May–October is accessible; the rest of the year Zojila often closes and the valley is snowbound.

## Getting there

Srinagar → Sonamarg is 80 km (~2 hrs). Book a [Kashmir taxi](/taxi) or include it in a [tour package](/tours).`,
        excerpt: "Sonamarg's Thajiwas Glacier, alpine lake treks, the best season to visit, and how to reach this Zojila gateway from Srinagar.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        tags: ["sonamarg", "thajiwas glacier", "camping", "kashmir"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Vaishno Devi Helicopter Booking 2026: Fare, Slots & How to Book",
        slug: "vaishno-devi-helicopter-booking",
        content: `The Katra–Sanjichhat helicopter is the fastest way up — an 8-minute flight replaces ~5 hours of climbing. Here's how booking actually works in 2026.

## Fare & route

- **Route:** Katra (Udhampur base) → Sanjichhat, ~8 minutes
- **Fare 2026:** ~₹2,130 one-way per seat (official only)
- **From Sanjichhat:** 2.5 km paved walk (or pony/palki) to the Bhawan

## How to book

1. Only via the official Shrine Board site (maavaishnodevi.org) — no agents sell genuine seats
2. Book opens ~60 days ahead; Navratri and summer weekends sell out in minutes
3. Carry the same ID used at booking

## Should you fly?

Best for **seniors, families with small kids, and tight schedules**. Fit pilgrims often walk one way and fly the other.

## We handle it for you

Our [Vaishno Devi yatra package](/tours/vaishno-devi-yatra) includes helicopter seats booked the moment your dates lock, plus Katra hotel and Jammu pickup. See the [first-timer guide](/blog/vaishno-devi-yatra-first-timer-guide) for the full yatra flow.`,
        excerpt: "Vaishno Devi helicopter fare 2026, how and when to book official seats, who should fly, and how to bundle it into a yatra package.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1571348659398-985afc7adde5?w=1200&q=80",
        tags: ["vaishno devi", "helicopter", "booking", "katra"],
        category: "Vaishno Devi",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Kashmir Honeymoon Package 2026: Houseboats, Gulmarg & Tulips",
        slug: "kashmir-honeymoon-package",
        content: `Kashmir is one of India's most romantic trips — shikara sunrises, houseboat nights, and snow at Gulmarg. Here's how to plan a honeymoon that isn't rushed.

## The ideal 6-day shape

- **Day 1–2:** Srinagar houseboat + Mughal Gardens
- **Day 3:** Gulmarg gondola & meadows
- **Day 4–5:** Pahalgam valleys
- **Day 6:** Departure (or add a [Sonamarg](/blog/sonamarg-travel-guide) day)

## Best months

**April** (tulips) and **September** (golden chinar) are the romantic sweet spots; **December–January** for a snow honeymoon.

## What makes it special

- Private houseboat with a floating breakfast
- Candlelight dinner on Dal Lake
- Gondola ride + photography stops

## Book it

See our [Kashmir tour packages](/tours) or [talk to our Katra team](/contact) for a custom honeymoon quote. Add a [Kashmir taxi](/taxi) for privacy.`,
        excerpt: "Plan a Kashmir honeymoon — houseboats, Gulmarg gondola, tulip season, the best months, and how to book a custom package.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1587214086729-2d724e209f4d?w=1200&q=80",
        tags: ["kashmir", "honeymoon", "houseboat", "tour package"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Gulmarg Skiing Guide 2026: Slopes, Lessons & What It Costs",
        slug: "gulmarg-skiing-guide",
        content: `Gulmarg has some of the world's highest ski terrain. Whether you're a first-timer or an off-piste rider, here's the 2026 picture.

## Season

**Mid-December to March** is prime. January has the deepest powder.

## Slopes by level

- **Beginners:** lower Kongdoori gentle gradients with certified instructors
- **Intermediate:** Phase 2 (Apharwat) red runs
- **Advanced:** backcountry off-piste (avalanche briefing required)

## Costs (per person, approx.)

| Item | Price |
| --- | --- |
| Ski/snowboard rental | ₹500–1,000/day |
| Group lesson | ₹1,500–2,500/day |
| Gondola Phase 1+2 | ₹1,690 return |
| Private instructor | ₹4,000–6,000/day |

## Stay & pack

[Ski resorts in Gulmarg](/hotels/location/gulmarg) book out weeks ahead in January. Pack thermal layers, goggles and gloves.

## Bundle it

Our [Gulmarg Skiing Adventure](/tours/gulmarg-skiing) includes equipment, instructor and stays. See [skiing in Gulmarg](/blog/things-to-do-in-gulmarg) for the full activity list.`,
        excerpt: "Gulmarg skiing season 2026, slopes by ability, lesson and gondola costs, where to stay, and how to bundle a ski trip.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80",
        tags: ["gulmarg", "skiing", "winter", "kashmir"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Kashmir Trekking Guide: Pahalgam, Sonamarg & the Great Lakes",
        slug: "kashmir-trekking-guide",
        content: `Kashmir's treks run from easy valley walks to multi-day alpine lake circuits. Here's where to start.

## Easy day treks

- **Pahalgam → Aru/Kalidadi:** gentle meadow walks, [guided trekking available](/adventures/pahalgam-trekking)
- **Sonamarg → Thajiwas:** glacier walk, ponies for kids

## Multi-day classics

- **Great Lakes (7 days):** Vishansar, Krishansar, Gangabal — July–September
- **Tarsar Marsar:** alpine lakes, flower meadows
- **Kolahoi Glacier:** from Aru

## What to know

- Best window: **July–September** (snow-free passes)
- Carry layers, poles, and a licensed guide
- [Camping](/adventures/category/camping) options at Sonamarg and Pahalgam

## Book guided treks

See all [Kashmir adventures](/adventures) or [contact us](/contact) for a custom trek plan with permits and porters.`,
        excerpt: "Kashmir trekking from easy Pahalgam walks to the Great Lakes circuit — best season, what to carry, and guided options.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
        tags: ["trekking", "kashmir", "great lakes", "adventure"],
        category: "Adventure",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Dal Lake Houseboat Stay: What to Expect & How to Book",
        slug: "dal-lake-houseboat-stay",
        content: `A night on a Dal Lake houseboat is the most "Kashmir" thing you can do. Here's how to pick one and what the stay is like.

## Types of houseboats

- **Deluxe (1–3 bedrooms):** carved cedar interiors, attached bath, sundeck
- **Heritage:** older, ornate, on the open lake
- **Budget shikara-cum-stay:** smaller, cheaper

## What's included

Most packages cover dinner, breakfast and a complimentary shikara ride at sunset/sunrise.

## Booking tips

- Book through a [verified Srinagar hotel/houseboat](/hotels/location/srinagar) rather than touts at the ghat
- Confirm hot water in winter
- Lakeside vs channel — channel boats are quieter

## Combine it

Pair the stay with a [Srinagar tour](/tours) and a [Kashmir taxi](/taxi) for airport transfers. See [things to do in Srinagar](/blog/things-to-do-in-srinagar).`,
        excerpt: "Dal Lake houseboat types, what's included, how to book safely, and how to combine a stay with a Kashmir tour.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1587214086729-2d724e209f4d?w=1200&q=80",
        tags: ["dal lake", "houseboat", "srinagar", "stay"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Patnitop Travel Guide: Meadows, Cable Car & Snow",
        slug: "patnitop-travel-guide",
        content: `Patnitop is a pine-clad hill station on the Jammu–Srinagar highway, 80 km from Katra — a natural stop between Vaishno Devi and Kashmir.

## What to do

- **Cable car:** short ride with valley views
- **Nathatop:** 15 min higher, paragliding in season and snow in winter
- **Nature walks:** pine trails and the Naag temple
- **Winter:** light snowfall, quieter than Gulmarg

## Best time

Year-round; **December–February** for snow, **April–June** for green meadows.

## Where it fits

Most travellers add Patnitop as a half-day break on the [Jammu–Katra–Srinagar](/taxi) drive. Book a [taxi](/taxi) for the leg.

## Stay

Small resorts and cottages in town — see [Kashmir & Katra hotels](/hotels).`,
        excerpt: "Patnitop cable car, Nathatop, snowfall and the best season — plus how to fit this Jammu–Kashmir stopover into your drive.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        tags: ["patnitop", "nathatop", "jammu", "hill station"],
        category: "Travel Tips",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Is Kashmir Safe to Travel? 2026 Honest Answer for Tourists",
        slug: "is-kashmir-safe-to-travel",
        content: `Short answer: yes, the main tourist circuit is safe and heavily secured. Here's the honest, practical version.

## Where tourists go

Srinagar, Gulmarg, Pahalgam, Sonamarg and the highway are well-patrolled tourist zones. We've operated 8+ years without incident.

## Practical safety tips

- Travel with a [local operator](/contact) who monitors routes daily
- Keep a buffer day for Srinagar airport security
- Follow advisory closures during heavy snow (Zojila, Gulmarg)
- Carry ID; register for the [Vaishno Devi yatra](/vaishno-devi) online

## When to avoid

Avoid fringe protest days in the old city; your hotel/guide will advise. The tourist valleys are unaffected by most events.

## Plan with confidence

See [Kashmir tour packages](/tours) or [talk to our Katra team](/contact) — we adjust plans in real time. Read the [best time to visit](/blog/best-time-to-visit-kashmir-guide) to pick your window.`,
        excerpt: "Is Kashmir safe for tourists in 2026 — where it's secure, practical tips, when to be cautious, and how a local operator keeps you covered.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
        tags: ["kashmir", "safe travel", "tourist", "advisory"],
        category: "Travel Tips",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Kashmir Family Tour Guide 2026: Itinerary for Kids & Seniors",
        slug: "kashmir-family-tour-guide",
        content: `Kashmir works well for families — gentle shikara rides, gondola trips and meadow picnics. Here's how to keep it easy for all ages.

## Family-friendly 6-day plan

- **Srinagar:** houseboat + gardens (easy)
- **Gulmarg:** gondola to Phase 1 only with kids; snow play in winter
- **Pahalgam:** Betaab Valley, pony rides
- **Sonamarg:** short Thajiwas walk

## Tips

- Pick **May–June or September** — safe weather, everything open
- Avoid long trek days; keep drives under 3 hrs
- Book [family hotels](/hotels) with early check-in and kids' meals
- A private [Kashmir taxi](/taxi) beats shared cabs with kids

## Bundle it

See [Kashmir tour packages](/tours) or [contact us](/contact) for a family custom plan. Pair with the [things to do in Srinagar](/blog/things-to-do-in-srinagar) guide.`,
        excerpt: "A Kashmir family itinerary for kids and seniors, the best months, and tips for hotels and private taxis on a multi-gen trip.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
        tags: ["kashmir", "family tour", "itinerary", "kids"],
        category: "Kashmir",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Amarnath Yatra Guide 2026: Route, Registration & Heli Options",
        slug: "amarnath-yatra-guide",
        content: `The Amarnath Yatra to the ice Shiva lingam is one of Hinduism's great pilgrimages, with Baltal and Pahalgam as the two base camps. Many Vaishno Devi pilgrims combine the two.

## Two routes

| Route | Length | Style |
| --- | --- | --- |
| Pahalgam → Chandanwari | 36–48 km (2 days) | Scenic, traditional |
| Baltal | 14 km (1 day) | Shorter, steeper |

## Registration

Compulsory via the official J&K portal with a health certificate. Slots are limited — book early.

## Heli options

Helicopter services run Baltal–Panchtarni and (seasonally) Neelgrath. Book only through official channels.

## Combine with Vaishno Devi

Our [Vaishno Devi hub](/vaishno-devi) covers the Katra leg; add [Pahalgam stays](/hotels/location/pahalgam) and a [Katra–Srinagar taxi](/taxi) for the full pilgrimage circuit.`,
        excerpt: "Amarnath Yatra 2026 routes from Pahalgam and Baltal, registration, helicopter options, and how to combine it with Vaishno Devi.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1571348659398-985afc7adde5?w=1200&q=80",
        tags: ["amarnath", "yatra", "pahalgam", "pilgrimage"],
        category: "Vaishno Devi",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuid(),
        title: "Kashmir Packing List 2026: What to Carry for Yatra & Valley",
        slug: "kashmir-packing-list",
        content: `Kashmir swings from 30°C meadows to −5°C snow in one trip. Here's a practical packing list.

## Always carry

- Government photo ID (needed for [Vaishno Devi registration](/vaishno-devi) too)
- Layers: thermals, fleece, waterproof shell
- Comfortable walking shoes + grip soles for the trek
- Sunglasses, sunscreen, lip balm (high UV)
- Personal meds; altitude note for the Bhawan (1,584 m)

## Seasonal adds

- **Winter:** heavy jacket, gloves, woolens, snow boots
- **Summer:** light cottons + a warm layer for evenings
- **Monsoon:** rain shell, quick-dry

## For the yatra

Carry only essentials — leather and electronics are restricted at the Bhawan; use the free Banganga locker.

## Plan the rest

See [best time to visit](/blog/best-time-to-visit-kashmir-guide) and [Kashmir packages](/tours).`,
        excerpt: "What to pack for Kashmir year-round and for the Vaishno Devi yatra — layers, documents, and seasonal extras.",
        author: "Shri Mata Vaishno Devi Team",
        coverImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80",
        tags: ["kashmir", "packing", "vaishno devi", "tips"],
        category: "Travel Tips",
        published: true,
        views: 0,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // ── Taxis ──
    const taxis = [
      { id: uuid(), vehicleName: "Toyota Innova Crysta", slug: "toyota-innova-crysta", type: "suv", capacity: 7, pricePerKm: 18, pricePerDay: 3500, features: ["AC", "GPS", "Luggage Space", "Water Bottles"], gallery: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80"], available: true, description: "Comfortable 7-seater SUV perfect for family trips across Kashmir.", createdAt: now, updatedAt: now },
      { id: uuid(), vehicleName: "Maruti Swift Dzire", slug: "maruti-swift-dzire", type: "sedan", capacity: 4, pricePerKm: 12, pricePerDay: 2200, features: ["AC", "GPS", "Phone Charger"], gallery: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80"], available: true, description: "Economical sedan ideal for couples and small groups.", createdAt: now, updatedAt: now },
      { id: uuid(), vehicleName: "Force Traveller 26 Seater", slug: "force-traveller-26", type: "tempo", capacity: 26, pricePerKm: 35, pricePerDay: 8000, features: ["AC", "GPS", "Pushback Seats", "Luggage Compartment", "Music System"], gallery: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"], available: true, description: "Large tempo traveler for group tours and pilgrimages.", createdAt: now, updatedAt: now },
      { id: uuid(), vehicleName: "Ertiga ZXI Plus", slug: "ertiga-zxi-plus", type: "ertiga", capacity: 6, pricePerKm: 16, pricePerDay: 3000, features: ["AC", "GPS", "Bluetooth", "Roof Rail"], gallery: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80"], available: true, description: "Premium 6-seater with extra boot space for road trips.", createdAt: now, updatedAt: now },
    ];

    // ── Bookings ──
    const tourIds = tours.map((t) => t.id);
    const bookings = [
      { id: uuid(), bookingId: "BK-2026-001", serviceType: "tour", serviceId: tourIds[0], guestName: "Priya Sharma", guestEmail: "priya@gmail.com", guestPhone: "+919876543210", guests: 2, date: daysFromNow(15), totalAmount: 24999, discountAmount: 5000, finalAmount: 19999, status: "confirmed", paymentStatus: "paid", specialRequests: "Honeymoon package", createdAt: daysAgo(5), updatedAt: now },
      { id: uuid(), bookingId: "BK-2026-002", serviceType: "tour", serviceId: tourIds[1], guestName: "Amit Kumar", guestEmail: "amit.kumar@outlook.com", guestPhone: "+919812345678", guests: 4, date: daysFromNow(30), totalAmount: 12999, discountAmount: 0, finalAmount: 12999, status: "pending", paymentStatus: "pending", createdAt: daysAgo(2), updatedAt: now },
      { id: uuid(), bookingId: "BK-2026-003", serviceType: "adventure", serviceId: adventures[0].id, guestName: "Sneha Patel", guestEmail: "sneha.p@yahoo.com", guestPhone: "+919988776655", guests: 3, date: daysFromNow(7), totalAmount: 17997, discountAmount: 1000, finalAmount: 16997, status: "confirmed", paymentStatus: "paid", createdAt: daysAgo(7), updatedAt: now },
      { id: uuid(), bookingId: "BK-2026-004", serviceType: "hotel", serviceId: hotels[0].id, guestName: "Rahul Verma", guestEmail: "rahul.v@gmail.com", guestPhone: "+919001234567", guests: 2, date: daysFromNow(10), totalAmount: 31998, discountAmount: 2000, finalAmount: 29998, status: "completed", paymentStatus: "paid", createdAt: daysAgo(15), updatedAt: now },
      { id: uuid(), bookingId: "BK-2026-005", serviceType: "taxi", serviceId: taxis[0].id, guestName: "Neha Gupta", guestEmail: "neha.g@hotmail.com", guestPhone: "+919765432100", guests: 5, date: daysFromNow(3), totalAmount: 5000, discountAmount: 0, finalAmount: 5000, status: "confirmed", paymentStatus: "paid", createdAt: daysAgo(1), updatedAt: now },
      { id: uuid(), bookingId: "BK-2026-006", serviceType: "tour", serviceId: tourIds[2], guestName: "Vikram Singh", guestEmail: "vikram@rediffmail.com", guestPhone: "+919654321098", guests: 2, date: daysFromNow(20), totalAmount: 59998, discountAmount: 5000, finalAmount: 54998, status: "cancelled", paymentStatus: "refunded", createdAt: daysAgo(10), updatedAt: now },
    ];

    // ── Consultations ──
    const consultations = [
      { id: uuid(), name: "Arjun Mehta", email: "arjun.mehta@gmail.com", phone: "+919876512345", travelDate: daysFromNow(45), groupSize: 6, budget: "₹1,00,000 - ₹1,50,000", interests: ["trekking", "photography", "camping"], message: "We are a group of friends planning a Kashmir trip in September. Want to explore offbeat locations.", status: "contacted", createdAt: daysAgo(3), updatedAt: now },
      { id: uuid(), name: "Kavitha Nair", email: "kavitha.nair@yahoo.com", phone: "+919765412345", travelDate: daysFromNow(60), groupSize: 2, budget: "₹50,000 - ₹75,000", interests: ["honeymoon", "luxury", "houseboat"], message: "Planning our honeymoon in Kashmir. Looking for a premium experience with houseboat stay.", status: "booked", createdAt: daysAgo(7), updatedAt: now },
      { id: uuid(), name: "Deepak Joshi", email: "deepak.joshi@outlook.com", phone: "+919654312345", travelDate: daysFromNow(25), groupSize: 15, budget: "₹2,00,000+", interests: ["pilgrimage", "vaishno-devi", "family"], message: "Family pilgrimage trip with elderly parents. Need comfortable arrangements.", status: "new", createdAt: daysAgo(1), updatedAt: now },
      { id: uuid(), name: "Sanya Khan", email: "sanya.k@gmail.com", phone: "+919543212345", travelDate: daysFromNow(40), groupSize: 4, budget: "₹80,000 - ₹1,20,000", interests: ["skiing", "gulmarg", "adventure"], message: "Want to learn skiing in Gulmarg. Are lessons included?", status: "new", createdAt: daysAgo(2), updatedAt: now },
    ];

    // ── Reviews ──
    // First, get existing user IDs to satisfy foreign key constraint
    const { data: existingUsers } = await supabaseAdmin.from("users").select("id").limit(10);
    let reviewUserIds: string[] = (existingUsers || []).map((u) => u.id);

    // If no users exist, create seed users with proper timestamps
    if (reviewUserIds.length === 0) {
      const seedUsers = [
        { id: "seed-user-priya", name: "Priya Sharma", email: "priya.seed@example.com", emailVerified: now, createdAt: now, updatedAt: now },
        { id: "seed-user-amit", name: "Amit Kumar", email: "amit.seed@example.com", emailVerified: now, createdAt: now, updatedAt: now },
        { id: "seed-user-sneha", name: "Sneha Patel", email: "sneha.seed@example.com", emailVerified: now, createdAt: now, updatedAt: now },
      ];
      const { error: userErr } = await supabaseAdmin.from("users").upsert(seedUsers, { onConflict: "email" });
      if (!userErr) reviewUserIds = seedUsers.map((u) => u.id);
    }

    const reviews = [
      { id: uuid(), serviceType: "tour", serviceId: tourIds[0], userId: reviewUserIds[0] || "seed-user-priya", userName: "Priya Sharma", rating: 5, title: "Absolutely magical experience!", comment: "The Kashmir Explorer tour exceeded all our expectations. The guides were knowledgeable, the hotels were excellent, and every moment was memorable. Dal Lake at sunset was breathtaking.", verified: true, helpful: 24, createdAt: daysAgo(10), updatedAt: now },
      { id: uuid(), serviceType: "tour", serviceId: tourIds[1], userId: reviewUserIds[1] || reviewUserIds[0] || "seed-user-amit", userName: "Amit Kumar", rating: 5, title: "Spiritual and well-organized", comment: "The Vaishno Devi Yatra was perfectly organized. Everything from transport to stay was taken care of. The helicopter ride saved us a lot of time.", verified: true, helpful: 18, createdAt: daysAgo(8), updatedAt: now },
      { id: uuid(), serviceType: "adventure", serviceId: adventures[0].id, userId: reviewUserIds[2] || reviewUserIds[0] || "seed-user-sneha", userName: "Sneha Patel", rating: 4, title: "Great trek, could be longer", comment: "Pahalgam trekking was wonderful. The scenery is unparalleled. I just wish the trek was a day longer to really soak in the views.", verified: true, helpful: 12, createdAt: daysAgo(5), updatedAt: now },
      { id: uuid(), serviceType: "hotel", serviceId: hotels[0].id, userId: reviewUserIds[0] || "seed-user-priya", userName: "Rahul Verma", rating: 5, title: "Royal treatment!", comment: "The Lalit Grand Palace is pure luxury. The heritage rooms are stunning, the food is exceptional, and the Dal Lake view from our room was priceless.", verified: true, helpful: 31, createdAt: daysAgo(12), updatedAt: now },
      { id: uuid(), serviceType: "adventure", serviceId: adventures[1].id, userId: reviewUserIds[1] || reviewUserIds[0] || "seed-user-amit", userName: "Vikram Singh", rating: 5, title: "Thrilling adventure!", comment: "Zanskar rafting was the highlight of our Kashmir trip. The rapids are exciting yet safe. The team was professional and fun.", verified: true, helpful: 15, createdAt: daysAgo(3), updatedAt: now },
      { id: uuid(), serviceType: "tour", serviceId: tourIds[2], userId: reviewUserIds[2] || reviewUserIds[0] || "seed-user-sneha", userName: "Neha Gupta", rating: 4, title: "Amazing skiing but needs more beginner slopes", comment: "Gulmarg skiing was incredible. The gondola ride itself is worth the trip. Would love more beginner-friendly slopes though.", verified: false, helpful: 8, createdAt: daysAgo(1), updatedAt: now },
    ];

    // ── Gallery (stable ids so re-running the seed upserts instead of duplicating) ──
    const gallery = [
      { id: "gallery-dal-lake-sunset", title: "Dal Lake Sunset", description: "A golden evening over Dal Lake, Srinagar.", imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80", category: "Srinagar", featured: true, order: 1, createdAt: now, updatedAt: now },
      { id: "gallery-gulmarg-skiing", title: "Gulmarg Skiing", description: "World-class slopes in the snow-capped meadows of Gulmarg.", imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80", category: "Gulmarg", featured: true, order: 2, createdAt: now, updatedAt: now },
      { id: "gallery-mountain-peaks", title: "Mountain Peaks", description: "Towering peaks of the Pir Panjal range.", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", category: "Pahalgam", featured: false, order: 3, createdAt: now, updatedAt: now },
      { id: "gallery-houseboat", title: "Houseboat on Dal Lake", description: "Stay on a traditional Kashmiri houseboat.", imageUrl: "https://images.unsplash.com/photo-1587214086729-2d724e209f4d?w=1200&q=80", category: "Srinagar", featured: false, order: 4, createdAt: now, updatedAt: now },
      { id: "gallery-vaishno-devi", title: "Vaishno Devi Bhawan", description: "The holy shrine of Shri Mata Vaishno Devi at Katra.", imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80", category: "Katra", featured: true, order: 5, createdAt: now, updatedAt: now },
      { id: "gallery-kahwa", title: "Kashmiri Kahwa", description: "Traditional saffron tea served in a copper samovar.", imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80", category: "Culture", featured: false, order: 6, createdAt: now, updatedAt: now },
    ];

    // ── Upsert all ──
    const results: Record<string, string> = {};

    const { error: e1 } = await supabaseAdmin.from("tour_packages").upsert(tours, { onConflict: "slug" });
    results.tours = e1 ? e1.message : `${tours.length} tours`;

    const { error: e2 } = await supabaseAdmin.from("adventures").upsert(adventures, { onConflict: "slug" });
    results.adventures = e2 ? e2.message : `${adventures.length} adventures`;

    const { error: e3 } = await supabaseAdmin.from("hotels").upsert(hotels, { onConflict: "slug" });
    results.hotels = e3 ? e3.message : `${hotels.length} hotels`;

    const { error: e4 } = await supabaseAdmin.from("blogs").upsert(blogs, { onConflict: "slug" });
    results.blogs = e4 ? e4.message : `${blogs.length} blogs`;

    // Superseded thin stub — full month-by-month guide lives at
    // best-time-to-visit-kashmir-guide. Delete so the two don't cannibalise.
    await supabaseAdmin.from("blogs").delete().eq("slug", "best-time-to-visit-kashmir");

    const { error: e5 } = await supabaseAdmin.from("taxis").upsert(taxis, { onConflict: "slug" });
    results.taxis = e5 ? e5.message : `${taxis.length} taxis`;

    const { error: e6 } = await supabaseAdmin.from("bookings").upsert(bookings, { onConflict: "bookingId" });
    results.bookings = e6 ? e6.message : `${bookings.length} bookings`;

    const { error: e7 } = await supabaseAdmin.from("consultations").upsert(consultations);
    results.consultations = e7 ? e7.message : `${consultations.length} consultations`;

    const { error: e8 } = await supabaseAdmin.from("reviews").upsert(reviews);
    results.reviews = e8 ? e8.message : `${reviews.length} reviews`;

    const { error: e8b } = await supabaseAdmin.from("gallery").upsert(gallery, { onConflict: "id" });
    results.gallery = e8b ? e8b.message : `${gallery.length} gallery images`;

    // ── Itineraries & room types ──
    // Tours/hotels upsert by slug, so look up the actual row IDs to link child tables
    const { data: seededTours } = await supabaseAdmin.from("tour_packages").select("id, slug");
    const tourIdBySlug = Object.fromEntries((seededTours || []).map((t) => [t.slug, t.id]));
    const { data: seededHotels } = await supabaseAdmin.from("hotels").select("id, slug");
    const hotelIdBySlug = Object.fromEntries((seededHotels || []).map((h) => [h.slug, h.id]));

    const itineraryRows = [
      // Kashmir Explorer (6 days)
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 1, title: "Arrival in Srinagar", description: "Arrive at Srinagar airport and transfer to your Dal Lake houseboat. Evening shikara ride on the lake.", accommodation: "Houseboat, Dal Lake", meals: "Welcome dinner" },
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 2, title: "Srinagar – Mughal Gardens", description: "Visit Shalimar Bagh, Nishat Bagh and the iconic Chashme Shahi. Afternoon at leisure in the old city.", accommodation: "Hotel in Srinagar", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 3, title: "Gulmarg Day Trip", description: "Drive to Gulmarg. Gondola ride to Kongdoori Mountain and snow activities (seasonal).", accommodation: "Hotel in Srinagar", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 4, title: "Pahalgam Excursion", description: "Full-day excursion to Pahalgam with the Lidder River valley and Betaab Valley.", accommodation: "Hotel in Pahalgam", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 5, title: "Sonamarg & Thajiwas Glacier", description: "Drive to Sonamarg, pony ride to Thajiwas Glacier. Return to Srinagar for the night.", accommodation: "Hotel in Srinagar", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["kashmir-explorer"], day: 6, title: "Departure", description: "Breakfast, shikara ride at sunrise, transfer to airport for departure.", accommodation: "—", meals: "Breakfast" },
      // Vaishno Devi Yatra (3 days)
      { tourPackageId: tourIdBySlug["vaishno-devi-yatra"], day: 1, title: "Arrival at Katra", description: "Arrive in Katra, check in and get your Yatra registration. Evening aarti at Bhairon Temple viewpoint.", accommodation: "Hotel in Katra", meals: "Dinner" },
      { tourPackageId: tourIdBySlug["vaishno-devi-yatra"], day: 2, title: "Vaishno Devi Yatra", description: "Start the trek to the Bhawan (13 km). Darshan at the sanctum, visit Ardhkuwari cave on the way back.", accommodation: "Hotel in Katra", meals: "Breakfast, Packed lunch, Dinner" },
      { tourPackageId: tourIdBySlug["vaishno-devi-yatra"], day: 3, title: "Departure", description: "Morning aarti, breakfast, and departure with holy prasad.", accommodation: "—", meals: "Breakfast" },
      // Gulmarg Skiing (5 days)
      { tourPackageId: tourIdBySlug["gulmarg-skiing"], day: 1, title: "Arrival in Gulmarg", description: "Arrive and settle into your resort. Equipment fitting and a brief orientation session.", accommodation: "Ski resort in Gulmarg", meals: "Dinner" },
      { tourPackageId: tourIdBySlug["gulmarg-skiing"], day: 2, title: "Beginner Slopes", description: "Full-day beginner lessons on the gentle slopes with certified instructors.", accommodation: "Ski resort in Gulmarg", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["gulmarg-skiing"], day: 3, title: "Gondola & Intermediate Trails", description: "Ride the gondola to Kongdoori Mountain and ski the intermediate trails.", accommodation: "Ski resort in Gulmarg", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["gulmarg-skiing"], day: 4, title: "Backcountry Session", description: "Guided off-piste session for the confident skier with avalanche-safety briefing.", accommodation: "Ski resort in Gulmarg", meals: "Breakfast, Lunch" },
      { tourPackageId: tourIdBySlug["gulmarg-skiing"], day: 5, title: "Departure", description: "Morning ski before checkout, then transfer to Srinagar airport.", accommodation: "—", meals: "Breakfast" },
    ].filter((r) => r.tourPackageId);

    const roomTypeRows = [
      // The Lalit Grand Palace
      { hotelId: hotelIdBySlug["lalit-grand-palace"], type: "Deluxe Room", price: 15999, capacity: 2, available: 5 },
      { hotelId: hotelIdBySlug["lalit-grand-palace"], type: "Heritage Suite", price: 24999, capacity: 3, available: 2 },
      { hotelId: hotelIdBySlug["lalit-grand-palace"], type: "Lakeside Villa", price: 38999, capacity: 4, available: 1 },
      // Kahwa House
      { hotelId: hotelIdBySlug["kahwa-house"], type: "Standard Room", price: 8999, capacity: 2, available: 6 },
      { hotelId: hotelIdBySlug["kahwa-house"], type: "Garden Suite", price: 12999, capacity: 3, available: 2 },
      // Bhawan View Katra
      { hotelId: hotelIdBySlug["bhawan-view-katra"], type: "Deluxe Double", price: 3499, capacity: 2, available: 8 },
      { hotelId: hotelIdBySlug["bhawan-view-katra"], type: "Family Room", price: 5499, capacity: 4, available: 4 },
      // Lidder Riverside Resort
      { hotelId: hotelIdBySlug["lidder-riverside-resort"], type: "Pine View Room", price: 7499, capacity: 2, available: 5 },
      { hotelId: hotelIdBySlug["lidder-riverside-resort"], type: "Riverside Suite", price: 11999, capacity: 4, available: 2 },
    ].filter((r) => r.hotelId);

    if (itineraryRows.length) {
      // Explicit ids: some Supabase instances don't have the gen_random_uuid() default on id
      const { error: e9 } = await supabaseAdmin
        .from("itineraries")
        .upsert(itineraryRows.map((r) => ({ id: uuid(), ...r })), { onConflict: "tourPackageId,day" });
      results.itineraries = e9 ? e9.message : `${itineraryRows.length} itinerary days`;
    } else {
      results.itineraries = "skipped — no tour IDs found";
    }

    if (roomTypeRows.length) {
      const { error: e10 } = await supabaseAdmin
        .from("room_types")
        .upsert(roomTypeRows.map((r) => ({ id: uuid(), ...r })), { onConflict: "hotelId,type" });
      results.roomTypes = e10 ? e10.message : `${roomTypeRows.length} room types`;
    } else {
      results.roomTypes = "skipped — no hotel IDs found";
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
