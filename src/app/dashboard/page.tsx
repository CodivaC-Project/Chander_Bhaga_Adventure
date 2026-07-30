"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSessionContext } from "@/components/auth/SessionProvider";
import { signOut } from "@/lib/auth-client";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Package,
  LogOut,
  Settings,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isPending, isAuthenticated } = useSessionContext();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [isPending, isAuthenticated, router, searchParams]);

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const recentBookings = [
    {
      id: "CBA-TEST-001",
      service: "Kashmir Explorer",
      date: "2024-03-15",
      status: "confirmed",
      amount: "₹19,999",
    },
    {
      id: "CBA-TEST-002",
      service: "Aru Valley Trek",
      date: "2024-04-20",
      status: "pending",
      amount: "₹5,999",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[var(--color-surface-alt)]">
      {/* Header */}
      <div className="bg-[var(--color-primary)] text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
              <p className="text-white/60 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-soft)] p-4 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 bg-[var(--color-primary)]/5 text-[var(--color-primary)] rounded-xl font-medium"
              >
                <User className="w-5 h-5" />
                My Profile
              </Link>
              <Link
                href="/dashboard/bookings"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Package className="w-5 h-5" />
                My Bookings
              </Link>
              <Link
                href="/dashboard/payments"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Payments
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
              <hr className="my-2" />
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-sm text-gray-500">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-sm text-gray-500">Upcoming Trips</div>
                <div className="text-2xl font-bold text-[var(--color-primary)] mt-1">1</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="text-2xl font-bold text-[var(--color-accent)] mt-1">₹25,998</div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-soft)]">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                <Link
                  href="/dashboard/bookings"
                  className="text-sm text-[var(--color-primary)] font-medium hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{booking.service}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(booking.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        {booking.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/tours"
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-[var(--shadow-medium)] transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                  Browse Tours
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Explore our handcrafted tour packages
                </p>
              </Link>
              <Link
                href="/adventures"
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-[var(--shadow-medium)] transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                  Adventure Activities
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Find thrilling adventures in Kashmir
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
