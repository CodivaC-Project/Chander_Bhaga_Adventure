import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase.from("blogs").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (category) query = query.eq("category", category);
    if (published === "true") query = query.eq("published", true);

    const { data: posts, error } = await query;
    if (error) throw error;
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: post, error } = await supabase.from("blogs").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
