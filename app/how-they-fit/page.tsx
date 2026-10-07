import { PageHero } from "@/components/PageHero";
import { principle } from "@/content/products";
import { Story } from "@/components/sections/Story";
import { HowTheyFit } from "@/components/sections/HowTheyFit";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "How they fit",
  "A required item, a due date, a last result and a proof document. The shared object underneath three independent products.",
  "/how-they-fit",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="How they fit"
        title="The same object underneath."
        description={principle}
      />
      <Story />
      <HowTheyFit />
    </>
  );
}
