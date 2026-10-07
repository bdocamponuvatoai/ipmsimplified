import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { siteUrl } from "@/lib/metadata";
// Utility pages marked noindex stay out of the public discovery sitemap.
const unlisted = new Set(["/privacy", "/terms", "/styleguide"]);
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes
    .filter(([path]) => !unlisted.has(path))
    .map(([path]) => ({ url: `${siteUrl}${path}`, lastModified }));
}
