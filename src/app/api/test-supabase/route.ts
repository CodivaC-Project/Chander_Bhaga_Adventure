import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  // Debug endpoint — only available when explicitly enabled via env, never in production.
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_DEBUG_ENDPOINTS !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    // Test basic Supabase connection
    const { data, error } = await supabase.from("adventures").select("id, title").limit(1);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, details: error },
        { status: 500 }
      );
    }

    // Test auth connection
    const { data: authData, error: authError } = await supabase.auth.getSession();

    return NextResponse.json({
      success: true,
      message: "Supabase connected successfully!",
      database: {
        connected: true,
        sampleData: data,
      },
      auth: {
        connected: !authError,
        error: authError?.message || null,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Connection failed", details: String(err) },
      { status: 500 }
    );
  }
}
