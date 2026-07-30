import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  serviceType: "tour" | "adventure" | "hotel" | "taxi";
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    serviceType: {
      type: String,
      required: true,
      enum: ["tour", "adventure", "hotel", "taxi"],
    },
    serviceId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ReviewSchema.index({ serviceType: 1, serviceId: 1 });
ReviewSchema.index({ userId: 1 });

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
