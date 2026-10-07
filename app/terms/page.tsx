import { metadata as meta } from "@/lib/metadata";
import Content from "@/content/legal/terms.mdx";
export const metadata = meta(
  "Website terms",
  "Terms for using the public IPM Simplified website.",
  "/terms",
  { index: false },
);
export default function Page() {
  return <Content />;
}
