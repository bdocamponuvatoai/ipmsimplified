import { siteUrl } from "./metadata";
import type { Product } from "@/content/products";
import { programs } from "@/content/programs";
export const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "IPM Simplified",
      url: siteUrl,
      logo: `${siteUrl}/icons/ipm-512.png`,
      email: "contact@ipmsimplified.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@ipmsimplified.com",
      },
      knowsAbout: programs.map((p) => `${p.name} (${p.citation})`),
    },
    {
      "@type": "WebSite",
      name: "IPM Simplified",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
export function software(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.tagline,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/products/${p.slug}`,
    publisher: { "@type": "Organization", name: "IPM Simplified" },
  };
}
export function JsonLd({ value }: { value: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}
