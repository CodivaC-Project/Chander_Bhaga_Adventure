import { supabase } from "@/lib/supabase";
import { TestimonialsClient } from "./TestimonialsClient";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  package: string;
  avatar: string;
}

export async function TestimonialsSection() {
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("verified", true)
    .order("rating", { ascending: false })
    .limit(10);

  const testimonials: Testimonial[] = (reviews || []).map((review) => ({
    name: review.userName || "Anonymous",
    location: "Kashmir",
    rating: review.rating,
    text: review.comment || review.title || "",
    package: review.serviceType || "Tour",
    avatar: (review.userName || "A").charAt(0).toUpperCase(),
  }));

  // Fallback if no reviews exist
  if (testimonials.length === 0) {
    testimonials.push(
      {
        name: "Priya Sharma",
        location: "Delhi",
        rating: 5,
        text: "Absolutely incredible experience! The Kashmir Explorer package exceeded all our expectations. The team was professional, and every detail was taken care of.",
        package: "Kashmir Explorer",
        avatar: "PS",
      },
      {
        name: "Amit Kumar",
        location: "Mumbai",
        rating: 5,
        text: "We booked a family trip to Vaishno Devi. The arrangements were perfect — from hotel to transport. Highly recommended for families!",
        package: "Vaishno Devi Yatra",
        avatar: "AK",
      }
    );
  }

  return <TestimonialsClient testimonials={testimonials} />;
}
