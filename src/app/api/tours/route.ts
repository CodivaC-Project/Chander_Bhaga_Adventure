import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const difficulty = searchParams.get("difficulty");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    let query = supabase.from("tour_packages").select("*", { count: "exact" }).order("createdAt", { ascending: false }).range(skip, skip + limit - 1);

    if (destination) query = query.eq("destination", destination);
    if (difficulty) query = query.eq("difficulty", difficulty);
    if (featured === "true") query = query.eq("featured", true);

    const { data: packages, error, count } = await query;
    if (error) throw error;

    return NextResponse.json({
      packages,
      pagination: { total: count || 0, page, pages: Math.ceil((count || 0) / limit), limit },
    });
  } catch (error) {
    console.error("Failed to fetch tour packages:", error);
    return NextResponse.json({ error: "Failed to fetch tour packages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: pkg, error } = await supabase
      .from("tour_packages")
      .insert({ ...body, id: crypto.randomUUID() })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("Failed to create tour package:", error);
    return NextResponse.json({ error: "Failed to create tour package" }, { status: 500 });
  }
}
