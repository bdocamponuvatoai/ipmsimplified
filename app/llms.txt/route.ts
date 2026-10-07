import { products, heroCopy, principle } from "@/content/products";
import { programs } from "@/content/programs";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
// Plain-text summary for AI search, generated from the same content files as the site.
export function GET() {
  const body = [
    "# IPM Simplified",
    "",
    "> One building. Three records. Inspection, permitting and maintenance software for the built environment.",
    "",
    heroCopy,
    "",
    principle,
    "",
    "## Products",
    ...products.map(
      (p) =>
        `- [${p.name}](${siteUrl}/products/${p.slug}): ${p.tagline} For ${p.buyer.toLowerCase()}.`,
    ),
    "",
    "## Programs covered",
    ...programs.map((p) => `- ${p.name} (${p.citation})`),
    "",
    "## Contact",
    `- [Schedule a demo](${siteUrl}/demo)`,
    "- Email: contact@ipmsimplified.com",
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
