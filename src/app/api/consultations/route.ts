import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase.from("consultations").select("*").order("createdAt", { ascending: false });

    if (status) query = query.eq("status", status);

    const { data: consultations, error } = await query;
    if (error) throw error;
    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("Failed to fetch consultations:", error);
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: consultation, error } = await supabase.from("consultations").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Failed to create consultation request:", error);
    return NextResponse.json({ error: "Failed to create consultation request" }, { status: 500 });
  }
}
