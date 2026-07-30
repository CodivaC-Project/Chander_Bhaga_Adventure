"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        q: "Is it safe to travel to Kashmir?",
        a: "Yes, Kashmir is very safe for tourists. The tourist areas are well-secured and we have been operating for 8+ years without any incidents. Our local guides know the area well and follow all safety protocols.",
      },
      {
        q: "What is the best time to visit Kashmir?",
        a: "Kashmir is a year-round destination. March to May is great for spring blooms, June to August for trekking, September to November for autumn colors, and December to February for snow activities. Each season has its unique charm.",
      },
      {
        q: "Do you provide customized tour packages?",
        a: "Absolutely! We specialize in creating personalized itineraries based on your interests, budget, group size, and travel dates. Contact us with your requirements and we'll craft the perfect trip.",
      },
      {
        q: "What documents do I need to carry?",
        a: "For Indian nationals, a valid photo ID (Aadhaar, Passport, or Voter ID) is required. Foreign nationals need a valid passport and may require a permit for certain areas. We'll guide you on all requirements.",
      },
    ],
  },
  {
    category: "Booking & Payment",
    questions: [
      {
        q: "How do I book a tour package?",
        a: "You can book through our website, call us at 6006465184, or chat with us on WhatsApp. We'll confirm availability and guide you through the booking process.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept online payments via Razorpay (UPI, Credit/Debit Cards, Net Banking), bank transfers, and cash payments. A 30% advance is required to confirm the booking.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Free cancellation up to 48 hours before the trip. Cancellations within 48 hours incur a 50% charge. No-show is non-refundable. We recommend travel insurance for unforeseen circumstances.",
      },
      {
        q: "Do you offer EMI options?",
        a: "Yes, EMI options are available through our payment partner Razorpay for bookings above ₹10,000. You can select EMI at checkout.",
      },
    ],
  },
  {
    category: "During the Trip",
    questions: [
      {
        q: "What should I pack for the trip?",
        a: "It depends on the season. Generally: warm layers, comfortable walking shoes, sunscreen, sunglasses, rain gear, and a camera. We provide a detailed packing list after booking.",
      },
      {
        q: "Is the food vegetarian-friendly?",
        a: "Yes, we cater to all dietary preferences including vegetarian, vegan, and Jain food. Kashmir also has excellent vegetarian cuisine. Just let us know your requirements.",
      },
      {
        q: "Will I have network connectivity?",
        a: "Postpaid connections work well in most areas. Prepaid may have limited connectivity in remote areas. We recommend getting a postpaid connection or informing your contacts beforehand.",
      },
      {
        q: "What if there's a medical emergency?",
        a: "We carry first aid kits and our guides are trained in basic first aid. We have tie-ups with hospitals in all major destinations. For serious emergencies, we arrange immediate evacuation.",
      },
    ],
  },
  {
    category: "Adventure Activities",
    questions: [
      {
        q: "Do I need prior experience for adventure activities?",
        a: "Most activities are designed for beginners with professional guidance. Some advanced activities like certain treks may require basic fitness levels. We'll clearly mention prerequisites for each activity.",
      },
      {
        q: "Is equipment provided?",
        a: "Yes, all necessary equipment for adventure activities is provided and included in the package cost. Our equipment is regularly maintained and safety-checked.",
      },
      {
        q: "What is the age limit for adventure activities?",
        a: "It varies by activity. Most activities are suitable for ages 12+. Some extreme activities may have higher age requirements. Check individual activity pages for specific age limits.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");

  const currentCategory = faqCategories.find(
    (c) => c.category === activeCategory
  );

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know before your Kashmir adventure
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.category
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {currentCategory?.questions.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-500 mb-4">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
