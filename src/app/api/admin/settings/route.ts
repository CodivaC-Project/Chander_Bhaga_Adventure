import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

// GET all settings
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("*")
      .order("key");
    if (error) throw error;

    // Convert key-value pairs to a flat object for easy use
    const settings: Record<string, string> = {};
    data?.forEach((row) => {
      settings[row.key] = row.value;
    });

    return NextResponse.json({ settings, rows: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// PUT upsert settings
export async function PUT(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Settings object required" }, { status: 400 });
    }

    // Upsert each setting as a key-value row
    const rows = Object.entries(settings).map(([key, value]) => ({
      id: crypto.randomUUID(),
      key,
      value: String(value),
      type: typeof value === "boolean" ? "boolean" : typeof value === "number" ? "number" : "text",
    }));

    const { data, error } = await supabaseAdmin
      .from("settings")
      .upsert(rows, { onConflict: "key" })
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, settings: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
