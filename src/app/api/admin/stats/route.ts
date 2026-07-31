import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Fetch all stats in parallel
    const [
      bookingsResult,
      usersResult,
      consultationsResult,
      toursResult,
      adventuresResult,
      hotelsResult,
      recentBookings,
      recentConsultations,
      recentUsers,
    ] = await Promise.all([
      supabaseAdmin.from("bookings").select("id, status, finalAmount, createdAt, guestName", { count: "exact" }),
      supabaseAdmin.from("user").select("id", { count: "exact" }),
      supabaseAdmin.from("consultations").select("id, status, createdAt, name", { count: "exact" }),
      supabaseAdmin.from("tour_packages").select("id", { count: "exact" }),
      supabaseAdmin.from("adventures").select("id", { count: "exact" }),
      supabaseAdmin.from("hotels").select("id", { count: "exact" }),
      supabaseAdmin.from("bookings").select("id, guestName, status, finalAmount, createdAt, serviceType").order("createdAt", { ascending: false }).limit(5),
      supabaseAdmin.from("consultations").select("id, name, status, createdAt").order("createdAt", { ascending: false }).limit(5),
      supabaseAdmin.from("user").select("id, name, email, createdAt").order("createdAt", { ascending: false }).limit(5),
    ]);

    // Calculate stats
    const totalBookings = bookingsResult.count || 0;
    const totalUsers = usersResult.count || 0;
    const pendingConsultations = (consultationsResult.data || []).filter((c: any) => c.status === "new").length;
    const totalTours = toursResult.count || 0;
    const totalAdventures = adventuresResult.count || 0;
    const totalHotels = hotelsResult.count || 0;

    // Calculate revenue from bookings
    const totalRevenue = (bookingsResult.data || [])
      .filter((b: any) => b.status === "completed" || b.status === "confirmed")
      .reduce((sum: number, b: any) => sum + (b.finalAmount || 0), 0);

    // Build recent activity
    const activity: Array<{ text: string; time: string; type: string }> = [];

    (recentBookings.data || []).forEach((b: any) => {
      activity.push({
        text: `Booking from ${b.guestName} — ₹${b.finalAmount?.toLocaleString() || 0} (${b.status})`,
        time: new Date(b.createdAt).toLocaleDateString(),
        type: "booking",
      });
    });

    (recentConsultations.data || []).forEach((c: any) => {
      activity.push({
        text: `Consultation request from ${c.name} — ${c.status}`,
        time: new Date(c.createdAt).toLocaleDateString(),
        type: "consultation",
      });
    });

    (recentUsers.data || []).forEach((u: any) => {
      activity.push({
        text: `New user: ${u.name || u.email}`,
        time: new Date(u.createdAt).toLocaleDateString(),
        type: "user",
      });
    });

    // Sort activity by date (most recent first)
    activity.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return NextResponse.json({
      stats: {
        totalBookings,
        totalUsers,
        pendingConsultations,
        totalTours,
        totalAdventures,
        totalHotels,
        totalRevenue,
      },
      activity: activity.slice(0, 10),
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
