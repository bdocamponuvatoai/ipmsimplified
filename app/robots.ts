import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  // Preview deployments must never be indexed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production")
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
