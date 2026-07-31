import { Metadata } from "next";
import { TaxiCard } from "@/components/cards/TaxiCard";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Taxi & Cab Service",
  description:
    "Book reliable taxi and cab services in Kashmir. Sedans, SUVs, Tempo Travellers, and buses available for airport transfers and sightseeing.",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80";

export default async function TaxiPage() {
  const { data: rawVehicles } = await supabase
    .from("taxis")
    .select("*")
    .order("createdAt", { ascending: false });

  const vehicles = (rawVehicles || []).map((v) => ({
    vehicleName: v.vehicleName,
    slug: v.slug,
    type: v.type,
    capacity: v.capacity,
    pricePerKm: v.pricePerKm,
    pricePerDay: v.pricePerDay,
    features: v.features || [],
    image: v.gallery?.[0] || DEFAULT_IMAGE,
    available: v.available,
  }));
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
