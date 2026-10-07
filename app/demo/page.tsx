import { ContactPage } from "@/components/ContactPage";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Schedule a demo",
  "Request a demonstration of inspection registers, permitting or maintenance records.",
  "/demo",
);
export default function Page() {
  return <ContactPage demo={true} />;
}
