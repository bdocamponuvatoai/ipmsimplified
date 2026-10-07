import { socialImage } from "@/lib/og";
export const alt = "IPM Simplified";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export default function Image() {
  return socialImage("See the record from your side.");
}
