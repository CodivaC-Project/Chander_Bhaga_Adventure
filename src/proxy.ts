import { NextResponse, type NextRequest } from "next/server";
import { hasMarkdownVersion, mdInternalPath, mdSiblingToPage } from "@/lib/markdown-pages";

export default async function proxy(request: NextRequest) {
  // Check for Better Auth session cookie
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const protectedRoutes = ["/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL("/login", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  const { pathname } = request.nextUrl;

  // Markdown delivery (see src/lib/markdown-pages.ts): explicit `.md` sibling
  // URLs and `Accept: text/markdown` negotiation rewrite to the /md route,
  // but only for pages that actually have a Markdown version — anything else
  // keeps its normal HTML/404 handling.
  if (!pathname.startsWith("/md")) {
    if (pathname.endsWith(".md")) {
      const pagePath = mdSiblingToPage(pathname);
      if (hasMarkdownVersion(pagePath)) {
        return NextResponse.rewrite(new URL(mdInternalPath(pagePath), request.url));
      }
    } else if (
      request.method === "GET" &&
      (request.headers.get("accept") ?? "").toLowerCase().includes("text/markdown") &&
      hasMarkdownVersion(pathname)
    ) {
      return NextResponse.rewrite(new URL(mdInternalPath(pathname), request.url));
    }
  }

  const response = NextResponse.next();
  // HTML representations of pages that also have a Markdown version are
  // variant-dependent on Accept.
  if (hasMarkdownVersion(pathname)) {
    response.headers.append("Vary", "Accept");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
