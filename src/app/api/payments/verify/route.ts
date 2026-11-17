import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } =
      await request.json();

    if (!process.env.RAZORPAY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay is not configured" },
        { status: 500 }
      );
    }

    // Verify the Razorpay signature using the webhook secret
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Fetch the booking to persist the actual amount and its PK id
      // (payments."bookingId" FK references bookings.id, not the business key)
      const { data: booking } = await supabase
        .from("bookings")
        .select("id, finalAmount, totalAmount")
        .eq("bookingId", bookingId)
        .single();

      if (!booking) {
        return NextResponse.json(
          { verified: false, message: "Booking not found" },
          { status: 400 }
        );
      }

      // Update booking and payment status in Supabase
      const paidAmount = booking?.finalAmount ?? booking?.totalAmount ?? 0;
      await supabase
        .from("bookings")
        .update({ paymentStatus: "paid", status: "confirmed", receivedAmount: paidAmount })
        .eq("bookingId", bookingId);

      await supabase.from("payments").insert({
        id: crypto.randomUUID(),
        bookingId: booking.id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "captured",
        amount: paidAmount,
      });

      return NextResponse.json({ verified: true, message: "Payment verified successfully" });
    }

    return NextResponse.json({ verified: false, message: "Payment verification failed" }, { status: 400 });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
