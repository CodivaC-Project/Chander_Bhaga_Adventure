import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItinerary {
  day: number;
  title: string;
  description?: string;
  accommodation?: string;
  meals?: string;
}

export interface ITourPackage extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  destination: string;
  price: number;
  discountPrice?: number;
  featured: boolean;
  difficulty: "easy" | "moderate" | "challenging";
  maxGroupSize: number;
  itinerary: IItinerary[];
  gallery: string[];
  includes: string[];
  excludes: string[];
  highlights: string[];
  location?: {
    address?: string;
    lat?: number;
    lng?: number;
  };
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TourPackageSchema = new Schema<ITourPackage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    duration: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    featured: { type: Boolean, default: false },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging"],
      default: "moderate",
    },
    maxGroupSize: { type: Number, default: 20, min: 1 },
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: String,
        accommodation: String,
        meals: String,
      },
    ],
    gallery: [{ type: String }],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    highlights: [{ type: String }],
    location: {
      address: String,
      lat: Number,
      lng: Number,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TourPackageSchema.index({ slug: 1 });
TourPackageSchema.index({ destination: 1 });
TourPackageSchema.index({ featured: 1 });
TourPackageSchema.index({ price: 1 });

const TourPackage: Model<ITourPackage> =
  mongoose.models.TourPackage ||
  mongoose.model<ITourPackage>("TourPackage", TourPackageSchema);

export default TourPackage;
