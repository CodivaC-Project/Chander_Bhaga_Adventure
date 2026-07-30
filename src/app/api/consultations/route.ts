import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const consultations = await Consultation.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("Failed to fetch consultations:", error);
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const consultation = await Consultation.create(body);
    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Failed to create consultation:", error);
    return NextResponse.json({ error: "Failed to create consultation request" }, { status: 500 });
  }
}
