"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSessionContext } from "@/components/auth/SessionProvider";
import { signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Hotel,
  Car,
  Calendar,
  Users,
  MessageCircle,
  Star,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Tour Packages", href: "/admin/tours", icon: Package },
  { label: "Adventures", href: "/admin/adventures", icon: MapPin },
  { label: "Hotels", href: "/admin/hotels", icon: Hotel },
  { label: "Taxi Fleet", href: "/admin/taxi", icon: Car },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Consultations", href: "/admin/consultations", icon: MessageCircle },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminPage() {
  const router = useRouter();
  const { user, isPending, isAuthenticated } = useSessionContext();

  useEffect(() => {
    if (!isPending && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login");
    }
  }, [isPending, isAuthenticated, user, router]);

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-500 mb-8">
            You don&apos;t have permission to access the admin panel.
          </p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const stats = [
    { label: "Total Bookings", value: "156", change: "+12%", color: "text-blue-600" },
    { label: "Revenue", value: "₹12.5L", change: "+8%", color: "text-green-600" },
    { label: "Active Users", value: "1,234", change: "+23%", color: "text-purple-600" },
    { label: "Pending Consultations", value: "18", change: "-5%", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-[var(--color-primary-dark)] text-white py-3">
        <div className="container-custom flex items-center justify-between">
          <span className="font-semibold">Admin Panel — Chander Bhaga Adventure</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="flex items-end justify-between mt-2">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { text: "New booking from Rahul Sharma for Kashmir Explorer", time: "2 hours ago" },
                  { text: "Consultation request from Priya Patel", time: "4 hours ago" },
                  { text: "New review posted by Amit Kumar (5 stars)", time: "6 hours ago" },
                  { text: "Payment received: ₹19,999 from Sneha Reddy", time: "8 hours ago" },
                  { text: "New user registration: Vikram Singh", time: "12 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{item.text}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
