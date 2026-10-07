import {
  Barlow_Semi_Condensed,
  Barlow_Condensed,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
export const display = Barlow_Semi_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: false,
});
export const hero = Barlow_Semi_Condensed({
  weight: "600",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero",
  preload: true,
});
export const condensed = Barlow_Condensed({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-condensed",
  preload: false,
});
export const sans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: false,
});
export const body = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: true,
});
export const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
});
