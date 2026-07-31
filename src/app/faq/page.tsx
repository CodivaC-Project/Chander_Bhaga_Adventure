import { Metadata } from "next";
import { FAQClient } from "./FAQClient";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Everything you need to know before your Kashmir adventure",
};

export default async function FAQPage() {
  const { data: faqItems } = await supabase
    .from("faqs")
    .select("*")
    .eq("active", true)
    .order("order", { ascending: true });

  // Group FAQs by category
  const faqCategories = (faqItems || []).reduce((acc: any[], item: any) => {
    const category = item.category || "General";
    const existing = acc.find((c) => c.category === category);
    if (existing) {
      existing.questions.push({ q: item.question, a: item.answer });
    } else {
      acc.push({
        category,
        questions: [{ q: item.question, a: item.answer }],
      });
    }
    return acc;
  }, []);

  // Fallback if no FAQ items exist
  const displayCategories = faqCategories.length > 0 ? faqCategories : [
    {
      category: "General",
      questions: [
        {
          q: "Is it safe to travel to Kashmir?",
          a: "Yes, Kashmir is very safe for tourists. The tourist areas are well-secured and we have been operating for 8+ years without any incidents.",
        },
        {
          q: "What is the best time to visit Kashmir?",
          a: "Kashmir is a year-round destination. March to May is great for spring blooms, June to August for trekking, September to November for autumn colors, and December to February for snow activities.",
        },
      ],
    },
    {
      category: "Booking & Payment",
      questions: [
        {
          q: "How do I book a tour package?",
          a: "You can book through our website, call us, or chat with us on WhatsApp. We'll confirm availability and guide you through the booking process.",
        },
      ],
    },
  ];

  return <FAQClient categories={displayCategories} />;
}
