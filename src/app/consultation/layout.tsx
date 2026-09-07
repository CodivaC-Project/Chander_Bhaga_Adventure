import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan My Trip — Free Travel Consultation",
  description:
    "Tell us your travel dates, group size, and budget and our Kashmir travel experts will design a custom itinerary for you within 24 hours. Free consultation.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
