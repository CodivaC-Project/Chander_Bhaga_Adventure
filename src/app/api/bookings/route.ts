import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase.from("bookings").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (status) query = query.eq("status", status);
    if (serviceType) query = query.eq("serviceType", serviceType);

    const { data: bookings, error } = await query;
    if (error) throw error;
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: booking, error } = await supabase.from("bookings").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
