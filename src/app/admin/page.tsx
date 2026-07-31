"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Calendar, Users, MessageCircle, TrendingUp, Loader2, FileText } from "lucide-react";

interface DashboardStats {
  totalBookings: number;
  totalUsers: number;
  pendingConsultations: number;
  totalTours: number;
  totalAdventures: number;
  totalHotels: number;
  totalRevenue: number;
}

interface ActivityItem {
  text: string;
  time: string;
  type: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setActivity(data.activity || []);
      })
      .catch((err) => console.error("Failed to fetch stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${Math.floor(amount / 1000)}K`;
    return `₹${amount.toLocaleString()}`;
  };

  const statCards = [
    { label: "Total Bookings", value: stats?.totalBookings ?? "—", icon: Calendar, color: "text-[var(--color-pine)]", bg: "bg-[var(--color-pine)]/10" },
    { label: "Revenue", value: stats ? formatCurrency(stats.totalRevenue) : "—", icon: TrendingUp, color: "text-[var(--color-accent-deep)]", bg: "bg-[var(--color-accent)]/10" },
    { label: "Total Users", value: stats?.totalUsers ?? "—", icon: Users, color: "text-[var(--color-ink)]", bg: "bg-[var(--color-line)]/40" },
    { label: "Pending Consultations", value: stats?.pendingConsultations ?? "—", icon: MessageCircle, color: "text-[var(--color-accent-deep)]", bg: "bg-[var(--color-accent)]/10" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking": return <Calendar className="w-4 h-4 text-[var(--color-pine)]" />;
      case "consultation": return <MessageCircle className="w-4 h-4 text-[var(--color-accent-deep)]" />;
      case "user": return <Users className="w-4 h-4 text-[var(--color-ink-soft)]" />;
      default: return <FileText className="w-4 h-4 text-[var(--color-ink-soft)]" />;
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-6">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-[var(--color-line)] p-5 hover:border-[var(--color-ink-soft)] transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-sm text-[var(--color-ink-soft)]">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-ink)]">
              {loading ? <div className="h-8 w-20 bg-[var(--color-line)]/60 animate-pulse rounded" /> : String(stat.value)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-4">
          <div className="text-sm text-[var(--color-ink-soft)]">Tour Packages</div>
          <div className="text-xl font-bold text-[var(--color-ink)] mt-1">{loading ? "—" : String(stats?.totalTours ?? 0)}</div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-4">
          <div className="text-sm text-[var(--color-ink-soft)]">Adventures</div>
          <div className="text-xl font-bold text-[var(--color-ink)] mt-1">{loading ? "—" : String(stats?.totalAdventures ?? 0)}</div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-4">
          <div className="text-sm text-[var(--color-ink-soft)]">Hotels</div>
          <div className="text-xl font-bold text-[var(--color-ink)] mt-1">{loading ? "—" : String(stats?.totalHotels ?? 0)}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[var(--color-line)] p-6">
        <h2 className="text-lg font-bold text-[var(--color-ink)] mb-4">Recent Activity</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--color-line)] last:border-0">
                <div className="h-4 bg-[var(--color-line)]/60 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-[var(--color-line)]/60 animate-pulse rounded w-20" />
              </div>
            ))}
          </div>
        ) : activity.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-ink-soft)]">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent activity yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--color-line)] last:border-0">
                <div className="flex items-center gap-3">
                  {getActivityIcon(item.type)}
                  <span className="text-sm text-[var(--color-ink)]">{item.text}</span>
                </div>
                <span className="text-xs text-[var(--color-ink-soft)] whitespace-nowrap ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
