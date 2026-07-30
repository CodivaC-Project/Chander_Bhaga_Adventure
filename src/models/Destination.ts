import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestination extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  featured: boolean;
  attractions: string[];
  bestTimeToVisit: string;
  location?: { lat?: number; lng?: number };
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    attractions: [{ type: String }],
    bestTimeToVisit: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

DestinationSchema.index({ slug: 1 });
DestinationSchema.index({ featured: 1 });

const Destination: Model<IDestination> =
  mongoose.models.Destination ||
  mongoose.model<IDestination>("Destination", DestinationSchema);

export default Destination;
