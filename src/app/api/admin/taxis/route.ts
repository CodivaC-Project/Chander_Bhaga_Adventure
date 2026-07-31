import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

// GET all taxis
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const available = searchParams.get("available");

    let query = supabaseAdmin.from("taxis").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (search) query = query.or(`vehicleName.ilike.%${search}%,type.ilike.%${search}%`);
    if (type && type !== "all") query = query.eq("type", type);
    if (available === "true") query = query.eq("available", true);
    if (available === "false") query = query.eq("available", false);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ taxis: data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST create taxi
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from("taxis")
      .insert({
        ...body,
        id: crypto.randomUUID(),
        slug: body.slug || body.vehicleName.toLowerCase().replace(/\s+/g, "-"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// PUT update taxi
export async function PUT(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from("taxis")
      .update({ ...body, updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE taxi
export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await supabaseAdmin.from("taxis").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
