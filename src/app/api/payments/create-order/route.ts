import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", bookingId } = await request.json();

    // Razorpay order creation
    // In production, use the Razorpay SDK:
    // const Razorpay = require("razorpay");
    // const instance = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_SECRET,
    // });
    // const order = await instance.orders.create({ amount: amount * 100, currency, receipt: bookingId });

    // Mock response for development
    const order = {
      id: `order_${Date.now()}`,
      amount: amount * 100,
      currency,
      receipt: bookingId,
      status: "created",
    };

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
