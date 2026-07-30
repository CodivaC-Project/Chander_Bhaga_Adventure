import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TourPackage from "@/models/TourPackage";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const difficulty = searchParams.get("difficulty");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const query: Record<string, unknown> = {};
    if (destination) query.destination = destination;
    if (difficulty) query.difficulty = difficulty;
    if (featured === "true") query.featured = true;

    const skip = (page - 1) * limit;
    const [packages, total] = await Promise.all([
      TourPackage.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      TourPackage.countDocuments(query),
    ]);

    return NextResponse.json({
      packages,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
    });
  } catch (error) {
    console.error("Failed to fetch tour packages:", error);
    return NextResponse.json({ error: "Failed to fetch tour packages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const pkg = await TourPackage.create(body);
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("Failed to create tour package:", error);
    return NextResponse.json({ error: "Failed to create tour package" }, { status: 500 });
  }
}
