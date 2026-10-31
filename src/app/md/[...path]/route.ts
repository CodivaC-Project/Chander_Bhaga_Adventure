import { getMarkdownPage } from "@/lib/markdown-pages";

// Serves Markdown versions of pages (text/markdown). Selected by src/proxy.ts
// for `.md` sibling URLs and `Accept: text/markdown` negotiation. Unknown
// paths return a real 404 — never a catch-all 200.

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await params;
  const pagePath = `/${path.join("/")}`;
  const md = getMarkdownPage(pagePath);
  if (!md) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=60",
    },
  });
}
