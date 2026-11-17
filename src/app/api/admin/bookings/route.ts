import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

// GET all bookings
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    if (id) {
      const { data, error } = await supabaseAdmin.from("bookings").select("*").eq("id", id).single();
      if (error) throw error;
      return NextResponse.json({ booking: data });
    }

    let query = supabaseAdmin.from("bookings").select("*").order("createdAt", { ascending: false }).limit(limit);

    if (search) query = query.or(`guestName.ilike.%${search}%,bookingId.ilike.%${search}%,guestEmail.ilike.%${search}%`);
    if (status && status !== "all") query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ bookings: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// POST create booking
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const { notes, ...rest } = body;
    const totalAmount = Number(rest.totalAmount ?? 0);
    const finalAmount = Number(rest.finalAmount ?? totalAmount);
    const discountAmount = Number(rest.discountAmount ?? 0);
    let receivedAmount = Number(rest.receivedAmount ?? 0);
    if (rest.paymentStatus === "paid" && receivedAmount <= 0) receivedAmount = finalAmount;
    const bookingId =
      rest.bookingId ||
      `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const nowIso = new Date().toISOString();
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        ...rest,
        id: crypto.randomUUID(),
        bookingId,
        totalAmount,
        finalAmount,
        discountAmount,
        receivedAmount,
        specialRequests: body.specialRequests ?? notes ?? null,
        createdAt: nowIso,
        updatedAt: nowIso,
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// PUT update booking
export async function PUT(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await request.json();
    const { notes, ...rest } = body;
    const update: any = {
      ...rest,
      specialRequests: body.specialRequests ?? notes ?? null,
      updatedAt: new Date().toISOString(),
    };
    if (update.totalAmount !== undefined) update.totalAmount = Number(update.totalAmount);
    if (update.finalAmount !== undefined) update.finalAmount = Number(update.finalAmount);
    if (update.discountAmount !== undefined) update.discountAmount = Number(update.discountAmount);
    if (update.receivedAmount !== undefined) update.receivedAmount = Number(update.receivedAmount);
    if (update.guests !== undefined) update.guests = Number(update.guests);

    if (update.paymentStatus === "paid" && (update.receivedAmount === undefined || Number(update.receivedAmount) <= 0)) {
      let due =
        update.finalAmount !== undefined
          ? Number(update.finalAmount)
          : update.totalAmount !== undefined
            ? Number(update.totalAmount)
            : undefined;
      if (due === undefined || due <= 0) {
        const { data: existing } = await supabaseAdmin
          .from("bookings")
          .select("finalAmount,totalAmount")
          .eq("id", id)
          .single();
        due = Number(existing?.finalAmount ?? existing?.totalAmount ?? 0);
      }
      if (due > 0) update.receivedAmount = due;
    }
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update(update)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

// DELETE booking
export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await supabaseAdmin.from("bookings").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
