import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsultation extends Document {
  name: string;
  email: string;
  phone: string;
  travelDate: Date;
  groupSize: number;
  budget?: string;
  interests: string[];
  message?: string;
  status: "new" | "contacted" | "booked" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    groupSize: { type: Number, required: true, min: 1 },
    budget: { type: String },
    interests: [{ type: String }],
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

ConsultationSchema.index({ status: 1 });

const Consultation: Model<IConsultation> =
  mongoose.models.Consultation ||
  mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;
