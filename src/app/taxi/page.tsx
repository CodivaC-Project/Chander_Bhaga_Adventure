import { Metadata } from "next";
import { TaxiCard } from "@/components/cards/TaxiCard";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Taxi & Cab Service",
  description:
    "Book reliable taxi and cab services in Kashmir. Sedans, SUVs, Tempo Travellers, and buses available for airport transfers and sightseeing.",
};

const vehicles = [
  {
    vehicleName: "Toyota Etios / Swift Dzire",
    slug: "sedan",
    type: "sedan",
    capacity: 4,
    pricePerKm: 12,
    pricePerDay: 2500,
    features: ["AC", "Music System", "GPS Tracking", "Experienced Driver"],
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    available: true,
  },
  {
    vehicleName: "Toyota Innova Crysta",
    slug: "innova",
    type: "suv",
    capacity: 7,
    pricePerKm: 18,
    pricePerDay: 4000,
    features: ["AC", "Music System", "GPS Tracking", "Spacious Boot", "Experienced Driver"],
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    available: true,
  },
  {
    vehicleName: "Mahindra Scorpio",
    slug: "scorpio",
    type: "suv",
    capacity: 7,
    pricePerKm: 16,
    pricePerDay: 3500,
    features: ["AC", "Music System", "4x4 Available", "Experienced Driver"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    available: true,
  },
  {
    vehicleName: "Tempo Traveller 12 Seater",
    slug: "tempo-12",
    type: "tempo",
    capacity: 12,
    pricePerKm: 22,
    pricePerDay: 5500,
    features: ["AC", "Pushback Seats", "Music System", "Luggage Space", "First Aid"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
    available: true,
  },
  {
    vehicleName: "Tempo Traveller 17 Seater",
    slug: "tempo-17",
    type: "tempo",
    capacity: 17,
    pricePerKm: 28,
    pricePerDay: 7000,
    features: ["AC", "Pushback Seats", "Music System", "Large Luggage Space", "First Aid"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
    available: true,
  },
  {
    vehicleName: "Bus 35 Seater",
    slug: "bus",
    type: "bus",
    capacity: 35,
    pricePerKm: 45,
    pricePerDay: 12000,
    features: ["AC", "Comfortable Seats", "Music System", "Luggage Compartment", "First Aid Kit"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    available: false,
  },
];

export default function TaxiPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Taxi & Cab Service
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Reliable and comfortable taxi service across Kashmir. Airport
            transfers, sightseeing, and outstation trips.
          </p>
        </div>
      </section>

      {/* Info section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Fleet
            </h2>
            <p className="text-gray-500">
              Choose from our well-maintained fleet of vehicles, all driven by
              experienced local drivers who know every route in Kashmir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <TaxiCard key={v.slug} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Popular Routes & Prices
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Route
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Distance
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                      Sedan
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                      SUV
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { route: "Srinagar Airport → Gulmarg", dist: "55 km", sedan: "₹2,200", suv: "₹3,300" },
                    { route: "Srinagar Airport → Pahalgam", dist: "95 km", sedan: "₹3,500", suv: "₹5,200" },
                    { route: "Srinagar → Sonmarg", dist: "80 km", sedan: "₹3,000", suv: "₹4,500" },
                    { route: "Jammu Airport → Katra", dist: "50 km", sedan: "₹2,000", suv: "₹3,000" },
                    { route: "Srinagar → Leh", dist: "430 km", sedan: "₹15,000", suv: "₹22,000" },
                  ].map((r) => (
                    <tr key={r.route} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.route}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.dist}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-[var(--color-primary)]">{r.sedan}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-[var(--color-primary)]">{r.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              * Prices are approximate and may vary based on season and availability. Contact us for exact quotes.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
