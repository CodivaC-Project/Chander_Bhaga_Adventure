import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdventure extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  price: number;
  duration: string;
  difficulty: "easy" | "moderate" | "challenging" | "extreme";
  minAge: number;
  maxGroupSize: number;
  featured: boolean;
  gallery: string[];
  includes: string[];
  safetyMeasures: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AdventureSchema = new Schema<IAdventure>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "trekking",
        "rafting",
        "camping",
        "skiing",
        "paragliding",
        "bungee",
        "zip-lining",
        "rock-climbing",
        "other",
      ],
    },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging", "extreme"],
      default: "moderate",
    },
    minAge: { type: Number, default: 12, min: 0 },
    maxGroupSize: { type: Number, default: 15, min: 1 },
    featured: { type: Boolean, default: false },
    gallery: [{ type: String }],
    includes: [{ type: String }],
    safetyMeasures: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

AdventureSchema.index({ slug: 1 });
AdventureSchema.index({ category: 1 });
AdventureSchema.index({ featured: 1 });

const Adventure: Model<IAdventure> =
  mongoose.models.Adventure ||
  mongoose.model<IAdventure>("Adventure", AdventureSchema);

export default Adventure;
