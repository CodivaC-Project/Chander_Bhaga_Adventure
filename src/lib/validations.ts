import { z } from "zod";

// Tour Package
export const tourPackageSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  duration: z.string(),
  destination: z.string(),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  featured: z.boolean().default(false),
  difficulty: z.enum(["easy", "moderate", "challenging"]).default("moderate"),
  maxGroupSize: z.number().positive().default(20),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string().optional(),
      accommodation: z.string().optional(),
      meals: z.string().optional(),
    })
  ),
  gallery: z.array(z.string()),
  includes: z.array(z.string()),
  excludes: z.array(z.string()),
  highlights: z.array(z.string()),
  location: z.object({
    address: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
});

// Adventure Activity
export const adventureSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  category: z.enum([
    "trekking",
    "rafting",
    "camping",
    "skiing",
    "paragliding",
    "bungee",
    "zip-lining",
    "rock-climbing",
    "other",
  ]),
  location: z.string(),
  price: z.number().positive(),
  duration: z.string(),
  difficulty: z.enum(["easy", "moderate", "challenging", "extreme"]),
  minAge: z.number().nonnegative().default(12),
  maxGroupSize: z.number().positive().default(15),
  featured: z.boolean().default(false),
  gallery: z.array(z.string()),
  includes: z.array(z.string()),
  safetyMeasures: z.array(z.string()),
});

// Hotel
export const hotelSchema = z.object({
  name: z.string().min(1),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  location: z.string(),
  address: z.string(),
  stars: z.number().min(1).max(5),
  pricePerNight: z.number().positive(),
  amenities: z.array(z.string()),
  roomTypes: z.array(
    z.object({
      type: z.string(),
      price: z.number().positive(),
      capacity: z.number().positive(),
      available: z.number().nonnegative(),
    })
  ),
  gallery: z.array(z.string()),
  featured: z.boolean().default(false),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
});

// Taxi Vehicle
export const taxiSchema = z.object({
  vehicleName: z.string().min(1),
  slug: z.string(),
  type: z.enum(["sedan", "suv", "tempo", "bus"]),
  capacity: z.number().positive(),
  pricePerKm: z.number().positive(),
  pricePerDay: z.number().positive(),
  features: z.array(z.string()),
  gallery: z.array(z.string()),
  available: z.boolean().default(true),
  description: z.string(),
});

// Booking
export const bookingSchema = z.object({
  bookingId: z.string().optional(),
  serviceType: z.enum(["tour", "adventure", "hotel", "taxi", "consultation"]),
  serviceId: z.string(),
  userId: z.string().optional(),
  guestName: z.string().min(1),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(10),
  guests: z.number().positive(),
  date: z.string(),
  endDate: z.string().optional(),
  specialRequests: z.string().optional(),
  totalAmount: z.number().positive(),
  discountAmount: z.number().nonnegative().optional(),
  finalAmount: z.number().nonnegative().optional(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).default("pending"),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).default("pending"),
});

// Payment
export const paymentSchema = z.object({
  bookingId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("INR"),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  razorpaySignature: z.string().optional(),
  status: z.enum(["pending", "captured", "failed", "refunded"]).default("pending"),
});

// Review
export const reviewSchema = z.object({
  serviceType: z.enum(["tour", "adventure", "hotel", "taxi"]),
  serviceId: z.string(),
  userId: z.string(),
  userName: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  comment: z.string(),
  verified: z.boolean().default(false),
});

// Blog
export const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  author: z.string(),
  coverImage: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  published: z.boolean().default(false),
  publishedAt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Gallery
export const gallerySchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  description: z.string().optional(),
  order: z.number().default(0),
});

// Consultation
export const consultationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  travelDate: z.string(),
  groupSize: z.number().positive(),
  budget: z.string().optional(),
  interests: z.array(z.string()),
  message: z.string().optional(),
  status: z.enum(["new", "contacted", "booked", "closed"]).default("new"),
});

// Contact Message
export const contactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

// Coupon
export const couponSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  discount: z.number().positive(),
  discountType: z.enum(["percentage", "fixed"]),
  minAmount: z.number().nonnegative().default(0),
  maxDiscount: z.number().positive().optional(),
  validFrom: z.string(),
  validUntil: z.string(),
  usageLimit: z.number().nonnegative().optional(),
  usedCount: z.number().nonnegative().default(0),
  active: z.boolean().default(true),
});

// FAQ
export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string(),
  order: z.number().default(0),
});

// Destination
export const destinationSchema = z.object({
  name: z.string().min(1),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  image: z.string(),
  featured: z.boolean().default(false),
  attractions: z.array(z.string()),
  bestTimeToVisit: z.string(),
  location: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
});

// Settings
export const settingsSchema = z.object({
  siteName: z.string(),
  tagline: z.string().optional(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  address: z.string(),
  license: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  businessHours: z.string().optional(),
});

export type TourPackageInput = z.infer<typeof tourPackageSchema>;
export type AdventureInput = z.infer<typeof adventureSchema>;
export type HotelInput = z.infer<typeof hotelSchema>;
export type TaxiInput = z.infer<typeof taxiSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type FaqInput = z.infer<typeof faqSchema>;
export type DestinationInput = z.infer<typeof destinationSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
