import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } =
      await request.json();

    // Razorpay payment verification
    // In production:
    // const crypto = require("crypto");
    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_SECRET)
    //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    //   .digest("hex");

    // const isValid = expectedSignature === razorpay_signature;

    // Mock response for development
    const isValid = true;

    if (isValid) {
      // Update booking and payment status in MongoDB
      // await connectDB();
      // await Booking.findOneAndUpdate({ bookingId }, { paymentStatus: "paid", status: "confirmed" });
      // await Payment.create({ bookingId, razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: "captured", amount: 0 });

      return NextResponse.json({ verified: true, message: "Payment verified successfully" });
    }

    return NextResponse.json({ verified: false, message: "Payment verification failed" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
