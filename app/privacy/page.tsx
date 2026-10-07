import { metadata as meta } from "@/lib/metadata";
import Content from "@/content/legal/privacy.mdx";
export const metadata = meta(
  "Privacy",
  "How IPM Simplified handles information submitted through this website.",
  "/privacy",
  { index: false },
);
export default function Page() {
  return <Content />;
}
