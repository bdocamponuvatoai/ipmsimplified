import { ContactPage } from "@/components/ContactPage";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Talk to us",
  "Contact IPM Simplified about your jurisdiction, contracting business or property portfolio.",
  "/contact",
);
export default function Page() {
  return <ContactPage demo={false} />;
}
