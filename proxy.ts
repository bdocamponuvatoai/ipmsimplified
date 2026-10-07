import { NextResponse, type NextRequest } from "next/server";
import hashes from "./security/csp-hashes.json";

// Static pages use build-derived script hashes. Per-request nonces would
// require dynamic HTML and would give up static rendering for this site.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const route = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const manifest: Record<string, string[]> = hashes;
  const scriptHashes = manifest[route] || manifest["/_not-found"] || [];
  const dev = process.env.NODE_ENV !== "production";
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${dev ? "'unsafe-eval' 'unsafe-inline'" : scriptHashes.map((hash) => `'${hash}'`).join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|photos|icons|.*\\.(?:png|svg|avif|webp|ico)$).*)",
  ],
};
