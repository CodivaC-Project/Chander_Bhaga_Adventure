"use client";

// Registers imperative WebMCP tools (W3C Web ML CG draft) for browsing agents.
// Every tool calls the same API endpoint as the site's own UI handlers — no
// privileged back door. Consequential tools (sends/requests) require
// `confirm: true` and otherwise only return a summary for the human to review.
// Descriptions never instruct the agent to skip confirmation.

import { useEffect } from "react";
import { z } from "zod";
import type { ModelContext, WebMcpTool } from "@/types/webmcp";

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function errorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
    return data.error;
  }
  return fallback;
}

async function getJson(path: string, params: Record<string, string>): Promise<unknown> {
  const qs = new URLSearchParams(params);
  const res = await fetch(`${path}?${qs.toString()}`, { headers: { Accept: "application/json" } });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(errorMessage(data, `Request failed with status ${res.status}`));
  }
  return data;
}

async function postJson(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(errorMessage(data, `Request failed with status ${res.status}`));
  }
  return data;
}

const listToursInput = z.object({
  destination: z.string().optional(),
  difficulty: z.enum(["easy", "moderate", "challenging"]).optional(),
  featured: z.boolean().optional(),
  limit: z.number().int().positive().max(50).optional(),
});

const listAdventuresInput = z.object({
  category: z.string().optional(),
  difficulty: z.enum(["easy", "moderate", "challenging", "extreme"]).optional(),
  limit: z.number().int().positive().max(50).optional(),
});

const listBlogsInput = z.object({
  category: z.string().optional(),
  limit: z.number().int().positive().max(50).optional(),
});

// Mirrors consultationSchema in src/lib/validations.ts (the endpoint the
// /consultation form posts to), plus the human-confirmation switch.
const consultationInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  travelDate: z.string().min(1),
  groupSize: z.number().positive(),
  budget: z.string().optional(),
  interests: z.array(z.string()).min(1),
  message: z.string().optional(),
  confirm: z.boolean(),
});

// Mirrors contactMessageSchema in src/lib/validations.ts (the endpoint the
// /contact form posts to), plus the human-confirmation switch.
const contactInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
  confirm: z.boolean(),
});

function buildTools(): WebMcpTool[] {
  return [
    {
      name: "list_tours",
      title: "List tour packages",
      description:
        "Search published Kashmir tour packages (destination, difficulty, featured). Returns titles, slugs, prices, durations and links. Read-only.",
      inputSchema: {
        type: "object",
        properties: {
          destination: { type: "string", description: "Destination name, e.g. Srinagar, Gulmarg" },
          difficulty: { type: "string", enum: ["easy", "moderate", "challenging"] },
          featured: { type: "boolean" },
          limit: { type: "number", description: "Max results, default 20, max 50" },
        },
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute(input) {
        const parsed = listToursInput.parse(input);
        const params: Record<string, string> = { limit: String(parsed.limit ?? 20) };
        if (parsed.destination) params.destination = parsed.destination;
        if (parsed.difficulty) params.difficulty = parsed.difficulty;
        if (parsed.featured !== undefined) params.featured = String(parsed.featured);
        const data = await getJson("/api/tours", params);
        return textResult(JSON.stringify(data));
      },
    },
    {
      name: "list_adventures",
      title: "List adventure activities",
      description:
        "Search published adventure activities (trekking, rafting, camping, skiing, paragliding, rock climbing). Returns titles, slugs, categories, prices and links. Read-only.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string", description: "e.g. trekking, rafting, camping, skiing, paragliding, rock-climbing" },
          difficulty: { type: "string", enum: ["easy", "moderate", "challenging", "extreme"] },
          limit: { type: "number", description: "Max results, default 20, max 50" },
        },
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute(input) {
        const parsed = listAdventuresInput.parse(input);
        const params: Record<string, string> = { limit: String(parsed.limit ?? 20) };
        if (parsed.category) params.category = parsed.category;
        if (parsed.difficulty) params.difficulty = parsed.difficulty;
        const data = await getJson("/api/adventures", params);
        return textResult(JSON.stringify(data));
      },
    },
    {
      name: "list_blogs",
      title: "List blog posts",
      description: "List published travel blog posts, optionally by category. Read-only.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string" },
          limit: { type: "number", description: "Max results, default 20, max 50" },
        },
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute(input) {
        const parsed = listBlogsInput.parse(input);
        const params: Record<string, string> = { published: "true", limit: String(parsed.limit ?? 20) };
        if (parsed.category) params.category = parsed.category;
        const data = await getJson("/api/blogs", params);
        return textResult(JSON.stringify(data));
      },
    },
    {
      name: "request_consultation",
      title: "Request a travel consultation",
      description:
        "Submit a consultation request to the same /api/consultations endpoint the /consultation form uses. Consequential: nothing is sent unless confirm is true; without it the tool only returns a summary for the human to review and confirm.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full name" },
          email: { type: "string", description: "Email address" },
          phone: { type: "string", description: "Phone number, at least 10 digits" },
          travelDate: { type: "string", description: "Preferred travel date, YYYY-MM-DD" },
          groupSize: { type: "number", description: "Number of travellers" },
          budget: { type: "string", description: "Budget range, optional" },
          interests: { type: "array", items: { type: "string" }, description: "e.g. [\"trekking\", \"hotels\"]" },
          message: { type: "string", description: "Anything else, optional" },
          confirm: { type: "boolean", description: "Must be true to actually submit" },
        },
        required: ["name", "email", "phone", "travelDate", "groupSize", "interests", "confirm"],
      },
      annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: true },
      async execute(input) {
        const { confirm, ...payload } = consultationInput.parse(input);
        if (!confirm) {
          return textResult(
            JSON.stringify({
              needsHumanConfirmation: true,
              summary: payload,
              note: "Nothing was submitted. A human must review this summary and re-call with confirm=true to send.",
            })
          );
        }
        const data = await postJson("/api/consultations", payload);
        return textResult(JSON.stringify(data));
      },
    },
    {
      name: "send_contact_message",
      title: "Send a contact message",
      description:
        "Send a message to the same /api/contact endpoint the /contact form uses. Consequential: nothing is sent unless confirm is true; without it the tool only returns a summary for the human to review and confirm.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full name" },
          email: { type: "string", description: "Email address" },
          phone: { type: "string", description: "Phone number, optional" },
          subject: { type: "string", description: "Message subject" },
          message: { type: "string", description: "Message body" },
          confirm: { type: "boolean", description: "Must be true to actually send" },
        },
        required: ["name", "email", "subject", "message", "confirm"],
      },
      annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: true },
      async execute(input) {
        const { confirm, ...payload } = contactInput.parse(input);
        if (!confirm) {
          return textResult(
            JSON.stringify({
              needsHumanConfirmation: true,
              summary: payload,
              note: "Nothing was sent. A human must review this summary and re-call with confirm=true to send.",
            })
          );
        }
        const data = await postJson("/api/contact", payload);
        return textResult(JSON.stringify(data));
      },
    },
  ];
}

export function WebMcpTools() {
  useEffect(() => {
    const mc: ModelContext | undefined = document.modelContext ?? navigator.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;
    const controller = new AbortController();
    for (const tool of buildTools()) {
      void mc.registerTool(tool, { signal: controller.signal }).catch(() => {
        // Registration can fail on re-run; the page stays fully usable without tools.
      });
    }
    return () => controller.abort();
  }, []);

  return null;
}
