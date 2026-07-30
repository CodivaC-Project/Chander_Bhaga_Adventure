import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITaxi extends Document {
  vehicleName: string;
  slug: string;
  type: "sedan" | "suv" | "tempo" | "bus";
  capacity: number;
  pricePerKm: number;
  pricePerDay: number;
  features: string[];
  gallery: string[];
  available: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaxiSchema = new Schema<ITaxi>(
  {
    vehicleName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "tempo", "bus"],
    },
    capacity: { type: Number, required: true, min: 1 },
    pricePerKm: { type: Number, required: true, min: 0 },
    pricePerDay: { type: Number, required: true, min: 0 },
    features: [{ type: String }],
    gallery: [{ type: String }],
    available: { type: Boolean, default: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

TaxiSchema.index({ type: 1 });
TaxiSchema.index({ available: 1 });

const Taxi: Model<ITaxi> =
  mongoose.models.Taxi || mongoose.model<ITaxi>("Taxi", TaxiSchema);

export default Taxi;
