import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase.from("adventures").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (category) query = query.eq("category", category);
    if (difficulty) query = query.eq("difficulty", difficulty);
    if (featured === "true") query = query.eq("featured", true);

    const { data: adventures, error } = await query;
    if (error) throw error;
    return NextResponse.json({ adventures });
  } catch (error) {
    console.error("Failed to fetch adventures:", error);
    return NextResponse.json({ error: "Failed to fetch adventures" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: adventure, error } = await supabase.from("adventures").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(adventure, { status: 201 });
  } catch (error) {
    console.error("Failed to create adventure:", error);
    return NextResponse.json({ error: "Failed to create adventure" }, { status: 500 });
  }
}
