import { Metadata } from "next";
import { FAQClient } from "./FAQClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "FAQs — Vaishno Devi Yatra & Kashmir Trips",
  description:
    "Vaishno Devi yatra and Kashmir trip questions answered — yatra registration, helicopter booking, best time to visit Kashmir, Katra hotels, taxi fares, payments and cancellations.",
  alternates: { canonical: "/faq" },
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

  // Fallback if no FAQ items exist — questions mirror real search queries
  const displayCategories = faqCategories.length > 0 ? faqCategories : [
    {
      category: "Yatra & Booking",
      questions: [
        {
          q: "How do I book a Vaishno Devi yatra package?",
          a: "Choose a package on our tours page or message us on WhatsApp. We handle yatra registration, Katra hotel, taxi from Jammu, and optional helicopter tickets (Katra–Sanjichhat) in one booking.",
        },
        {
          q: "How do I get a Vaishno Devi yatra parchi and RFID card?",
          a: "Registration is free on the official Shrine Board website or at the Katra counter. Every package we book includes assistance with your yatra parchi and RFID entry card.",
        },
        {
          q: "Is the Vaishno Devi helicopter worth booking?",
          a: "The Katra–Sanjichhat helicopter cuts the 14 km trek to a 8-minute flight and is ideal for seniors and families with kids. Seats sell out weeks ahead in season — we book them as part of your package.",
        },
      ],
    },
    {
      category: "Kashmir Trips",
      questions: [
        {
          q: "What is the best time to visit Kashmir?",
          a: "March to May for tulips and spring, June to August for trekking and green meadows, September to November for autumn colors and fewer crowds, December to February for snow and Gulmarg skiing.",
        },
        {
          q: "How many days are enough for a Kashmir tour package?",
          a: "5 nights / 6 days covers Srinagar, Gulmarg and Pahalgam comfortably. Add 1–2 days for Sonmarg or a houseboat night. This is the most booked Kashmir itinerary from Delhi.",
        },
        {
          q: "How much does a Kashmir tour package from Delhi cost?",
          a: "Budget packages start around ₹12,500 per person, standard 5N/6D packages run ₹16,000–29,000, and luxury trips with premium hotels go ₹38,000+. Flights Delhi–Srinagar are typically ₹3,500–9,000 one way.",
        },
        {
          q: "Is it safe to travel to Kashmir?",
          a: "Yes. Tourist zones are well-secured and we have operated 8+ years without incidents. Our local guides monitor routes daily and adjust plans if needed.",
        },
      ],
    },
    {
      category: "Hotels & Taxi",
      questions: [
        {
          q: "Which area is best to stay in Katra for Vaishno Devi?",
          a: "Near Banganga if you start the trek early, near the yatra parchi counter for easy registration, or near the bus stand for budget stays. Premium hotels sit along the main Katra road.",
        },
        {
          q: "What is the Jammu to Katra taxi fare?",
          a: "A sedan from Jammu airport or railway station to Katra costs around ₹3,000, an Innova around ₹5,000, and a Tempo Traveller ₹5,000–7,000 depending on group size. Fixed fares, meet-and-greet at any hour.",
        },
      ],
    },
  ];

  const allQuestions = displayCategories.flatMap((c: any) => c.questions);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allQuestions.map((item: { q: string; a: string }) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <FAQClient categories={displayCategories} />
    </>
  );
}
