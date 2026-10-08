import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IPM Simplified",
    short_name: "IPM",
    description:
      "Inspection, permitting and maintenance software for the built environment.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f5f8",
    theme_color: "#0f1f33",
    icons: [
      {
        src: "/icons/ipm-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/ipm-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/ipm-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/ipm-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
