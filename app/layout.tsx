import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { display, hero, condensed, sans, body, mono } from "@/lib/fonts";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IPM Simplified — One building. Three records.",
    template: "%s | IPM Simplified",
  },
  description:
    "Inspection, permitting and maintenance software for the built environment.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${display.variable} ${hero.variable} ${condensed.variable} ${sans.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
