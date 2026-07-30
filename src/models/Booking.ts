import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  bookingId: string;
  serviceType: "tour" | "adventure" | "hotel" | "taxi" | "consultation";
  serviceId: string;
  userId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  date: Date;
  endDate?: Date;
  specialRequests?: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CBA-${timestamp}-${random}`;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: {
      type: String,
      default: generateBookingId,
      unique: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["tour", "adventure", "hotel", "taxi", "consultation"],
    },
    serviceId: { type: String, required: true },
    userId: { type: String },
    guestName: { type: String, required: true, trim: true },
    guestEmail: { type: String, required: true, lowercase: true },
    guestPhone: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true },
    endDate: { type: Date },
    specialRequests: { type: String },
    totalAmount: { type: Number, required: true, min: 0 },
    discountAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true, min: 0 },
    couponCode: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

BookingSchema.index({ bookingId: 1 });
BookingSchema.index({ userId: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
