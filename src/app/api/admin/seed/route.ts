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
    ];

    // ── Blogs ──
    const blogs = [
      { id: uuid(), title: "Top 10 Things to Do in Kashmir", slug: "top-10-things-to-do-in-kashmir", content: "Kashmir is a paradise on earth offering countless experiences. From houseboat stays on Dal Lake to trekking in Sonamarg, here are the top 10 things you must do.", excerpt: "Best experiences in Kashmir.", author: "Shri Mata Vaishno Devi Team", coverImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80", tags: ["travel", "kashmir"], category: "Travel Guide", published: true, views: 1250, createdAt: now, updatedAt: now },
      { id: uuid(), title: "Best Time to Visit Kashmir", slug: "best-time-to-visit-kashmir", content: "Kashmir is beautiful year-round but each season offers a unique experience. Spring brings tulip gardens, summer is perfect for trekking, autumn has golden chinar trees, and winter offers skiing.", excerpt: "Seasonal guide.", author: "Shri Mata Vaishno Devi Team", coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80", tags: ["travel", "tips"], category: "Travel Tips", published: true, views: 980, createdAt: now, updatedAt: now },
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
