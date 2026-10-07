import type { Metadata } from "next";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export function metadata(
  title: string,
  description: string,
  path: string,
  { index = true }: { index?: boolean } = {},
): Metadata {
  return {
    title,
    ...(index ? {} : { robots: { index: false, follow: true } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: "IPM Simplified",
      images: [`${path === "/" ? "" : path}/opengraph-image`],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
