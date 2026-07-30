import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Adventure from "@/models/Adventure";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (featured === "true") query.featured = true;

    const adventures = await Adventure.find(query).limit(limit).sort({ createdAt: -1 });
    return NextResponse.json({ adventures });
  } catch (error) {
    console.error("Failed to fetch adventures:", error);
    return NextResponse.json({ error: "Failed to fetch adventures" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const adventure = await Adventure.create(body);
    return NextResponse.json(adventure, { status: 201 });
  } catch (error) {
    console.error("Failed to create adventure:", error);
    return NextResponse.json({ error: "Failed to create adventure" }, { status: 500 });
  }
}
