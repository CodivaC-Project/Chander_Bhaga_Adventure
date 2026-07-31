import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

// GET all reviews
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search");
    const rating = searchParams.get("rating");

    let query = supabaseAdmin.from("reviews").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (search) query = query.or(`userName.ilike.%${search}%,title.ilike.%${search}%`);
    if (rating && rating !== "0") query = query.eq("rating", parseInt(rating));

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ reviews: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// POST create review
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    // reviews.userId is NOT NULL with FK to users(id) — resolve by email via upsert, else fall back to the first user
    let userId = body.userId || null;
    if (!userId) {
      if (body.userEmail) {
        const { data: created } = await supabaseAdmin
          .from("users")
          .upsert(
            {
              id: crypto.randomUUID(),
              name: body.userName || body.userEmail.split("@")[0],
              email: body.userEmail,
              role: "user",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            { onConflict: "email" }
          )
          .select("id")
          .single();
        userId = created?.id || null;
      }
      if (!userId) {
        const { data: first } = await supabaseAdmin.from("users").select("id").limit(1).maybeSingle();
        userId = first?.id || null;
      }
    }
    if (!userId) {
      return NextResponse.json({ error: "A reviewer email is required to create a review" }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert({ ...body, userId, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// PUT update review
export async function PUT(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .update({ ...body, updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// DELETE review
export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await supabaseAdmin.from("reviews").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
