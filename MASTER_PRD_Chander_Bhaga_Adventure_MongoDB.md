# MASTER_PRD_MongoDB.md

# Chander Bhaga Adventure — Master PRD (MongoDB Edition)

## Overview
This specification defines a premium tourism, adventure, hotel, taxi, and consultation booking platform built with:

- Next.js 17 (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP
- React Three Fiber (Three.js)
- MongoDB Atlas
- Mongoose
- Better Auth/Auth.js
- Razorpay
- Cloudinary
- Resend
- Google Maps API
- Vercel

---

# Database

## MongoDB Collections

- users
- tourPackages
- adventureActivities
- hotels
- taxiVehicles
- bookings
- payments
- reviews
- blogs
- gallery
- destinations
- faqs
- contactMessages
- consultations
- coupons
- settings

---

# Recommended Folder Structure

```text
src/
 ├── app/
 ├── actions/
 ├── components/
 ├── features/
 ├── hooks/
 ├── lib/
 │    └── mongodb.ts
 ├── models/
 │    ├── User.ts
 │    ├── TourPackage.ts
 │    ├── Adventure.ts
 │    ├── Hotel.ts
 │    ├── Taxi.ts
 │    ├── Booking.ts
 │    ├── Payment.ts
 │    ├── Review.ts
 │    ├── Blog.ts
 │    ├── Gallery.ts
 │    └── Consultation.ts
 ├── services/
 ├── types/
 ├── utils/
 └── docs/
```

---

# MongoDB Connection

```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}
```

---

# Sample Tour Package Document

```json
{
  "title": "Kashmir Explorer",
  "slug": "kashmir-explorer",
  "duration": "6 Days / 5 Nights",
  "destination": "Kashmir",
  "price": 24999,
  "featured": true,
  "itinerary": [
    {"day":1,"title":"Arrival"},
    {"day":2,"title":"Sightseeing"}
  ],
  "gallery": [],
  "includes": ["Hotel","Breakfast","Transport"],
  "excludes": ["Flights"]
}
```

---

# Booking Flow

1. Select Service
2. Choose Package/Activity
3. Select Date
4. Enter Traveller Details
5. Pay with Razorpay
6. Booking Confirmation
7. WhatsApp Confirmation
8. Dedicated Team Follow-up

---

# Animations

- GSAP ScrollTrigger
- Hero text reveal
- Magnetic buttons
- Smooth scrolling
- Image reveal
- Page transitions
- 3D mountains
- Floating clouds
- Snow particles
- Interactive map

---

# SEO

- Dynamic metadata
- Open Graph
- JSON-LD
- Sitemap
- Robots
- Canonicals
- Local SEO landing pages
- TravelAgency schema
- FAQ schema

---

# Environment Variables

```env
MONGODB_URI=
AUTH_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
GOOGLE_MAPS_API_KEY=
```

---

# Contact

Business: Chander Bhaga Adventure

Phone: 6006465184

WhatsApp:
https://wa.me/message/OB2XZSSTWBMGN1

Email:
Sharmasidhant129@gmail.com

Address:
Katra, Vaishno Devi, Jammu & Kashmir

License:
JKAT00003494

---

This is the MongoDB-based foundation document. Expand each section into implementation tasks during development.
