import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType");
    const serviceId = searchParams.get("serviceId");

    let query = supabase.from("reviews").select("*").order("createdAt", { ascending: false });

    if (serviceType) query = query.eq("serviceType", serviceType);
    if (serviceId) query = query.eq("serviceId", serviceId);

    const { data: reviews, error } = await query;
    if (error) throw error;
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: review, error } = await supabase.from("reviews").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
