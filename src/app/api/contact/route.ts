import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: message, error } = await supabase.from("contact_messages").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Failed to send message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
