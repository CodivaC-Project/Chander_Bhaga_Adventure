import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", bookingId } = await request.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay is not configured" },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: bookingId || `receipt_${Date.now()}`,
      notes: { bookingId: bookingId || "" },
    });

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Failed to create payment order:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
