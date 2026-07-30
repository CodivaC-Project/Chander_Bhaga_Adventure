import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoomType {
  type: string;
  price: number;
  capacity: number;
  available: number;
}

export interface IHotel extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  address: string;
  stars: number;
  pricePerNight: number;
  amenities: string[];
  roomTypes: IRoomType[];
  gallery: string[];
  featured: boolean;
  coordinates?: { lat?: number; lng?: number };
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    pricePerNight: { type: Number, required: true, min: 0 },
    amenities: [{ type: String }],
    roomTypes: [
      {
        type: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        capacity: { type: Number, required: true, min: 1 },
        available: { type: Number, default: 0, min: 0 },
      },
    ],
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

HotelSchema.index({ slug: 1 });
HotelSchema.index({ stars: 1 });
HotelSchema.index({ featured: 1 });

const Hotel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;
