-- ============================================
-- Business Tables Migration for Shri Mata Vaishno Devi
-- Run this in Supabase SQL Editor or via CLI
-- ============================================

-- Adventures
CREATE TABLE IF NOT EXISTS adventures (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  duration TEXT NOT NULL,
  difficulty TEXT DEFAULT 'moderate',
  "minAge" INTEGER DEFAULT 12,
  "maxGroupSize" INTEGER DEFAULT 15,
  featured BOOLEAN DEFAULT false,
  gallery TEXT[] DEFAULT '{}',
  includes TEXT[] DEFAULT '{}',
  "safetyMeasures" TEXT[] DEFAULT '{}',
  rating DOUBLE PRECISION DEFAULT 0,
  "reviewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_adventures_category ON adventures(category);
CREATE INDEX IF NOT EXISTS idx_adventures_featured ON adventures(featured);

-- Blogs
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  "coverImage" TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  "publishedAt" TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "bookingId" TEXT UNIQUE NOT NULL,
  "serviceType" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "userId" TEXT,
  "guestName" TEXT NOT NULL,
  "guestEmail" TEXT NOT NULL,
  "guestPhone" TEXT NOT NULL,
  guests INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  "endDate" TIMESTAMPTZ,
  "specialRequests" TEXT,
  "totalAmount" DOUBLE PRECISION NOT NULL,
  "discountAmount" DOUBLE PRECISION DEFAULT 0,
  "finalAmount" DOUBLE PRECISION NOT NULL,
  "couponCode" TEXT,
  status TEXT DEFAULT 'pending',
  "paymentStatus" TEXT DEFAULT 'pending',
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings("userId");
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings("createdAt");

-- Consultations
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "travelDate" TIMESTAMPTZ NOT NULL,
  "groupSize" INTEGER NOT NULL,
  budget TEXT,
  interests TEXT[] DEFAULT '{}',
  message TEXT,
  status TEXT DEFAULT 'new',
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);

-- Destinations
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  attractions TEXT[] DEFAULT '{}',
  "bestTimeToVisit" TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_destinations_featured ON destinations(featured);

-- Hotels
CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  stars INTEGER NOT NULL,
  "pricePerNight" DOUBLE PRECISION NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  rating DOUBLE PRECISION DEFAULT 0,
  "reviewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hotels_stars ON hotels(stars);
CREATE INDEX IF NOT EXISTS idx_hotels_featured ON hotels(featured);

-- Room Types
CREATE TABLE IF NOT EXISTS room_types (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "hotelId" TEXT NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  capacity INTEGER NOT NULL,
  available INTEGER DEFAULT 0
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "serviceType" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "userName" TEXT NOT NULL,
  "userAvatar" TEXT,
  rating INTEGER NOT NULL,
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  helpful INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_service ON reviews("serviceType", "serviceId");
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews("userId");

-- Taxis
CREATE TABLE IF NOT EXISTS taxis (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "vehicleName" TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  "pricePerKm" DOUBLE PRECISION NOT NULL,
  "pricePerDay" DOUBLE PRECISION NOT NULL,
  features TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  description TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_taxis_type ON taxis(type);
CREATE INDEX IF NOT EXISTS idx_taxis_available ON taxis(available);

-- Tour Packages
CREATE TABLE IF NOT EXISTS tour_packages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  duration TEXT NOT NULL,
  destination TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  "discountPrice" DOUBLE PRECISION,
  featured BOOLEAN DEFAULT false,
  difficulty TEXT DEFAULT 'moderate',
  "maxGroupSize" INTEGER DEFAULT 20,
  gallery TEXT[] DEFAULT '{}',
  includes TEXT[] DEFAULT '{}',
  excludes TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  rating DOUBLE PRECISION DEFAULT 0,
  "reviewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tour_packages_destination ON tour_packages(destination);
CREATE INDEX IF NOT EXISTS idx_tour_packages_featured ON tour_packages(featured);
CREATE INDEX IF NOT EXISTS idx_tour_packages_price ON tour_packages(price);

-- Itineraries
CREATE TABLE IF NOT EXISTS itineraries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tourPackageId" TEXT NOT NULL REFERENCES tour_packages(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  accommodation TEXT,
  meals TEXT
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "bookingId" TEXT UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  "razorpayOrderId" TEXT,
  "razorpayPaymentId" TEXT,
  "razorpaySignature" TEXT,
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount DOUBLE PRECISION NOT NULL,
  "minAmount" DOUBLE PRECISION DEFAULT 0,
  "maxUses" INTEGER,
  "usedCount" INTEGER DEFAULT 0,
  "expiresAt" TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  "imageUrl" TEXT NOT NULL,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text'
);
