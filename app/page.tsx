import { metadata as meta } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Products } from "@/components/sections/Products";
import { Coverage } from "@/components/sections/Coverage";
import { Audiences } from "@/components/sections/Audiences";
import { HowTheyFit } from "@/components/sections/HowTheyFit";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, organization } from "@/lib/jsonld";
export const metadata = meta(
  "One building. Three records.",
  "Three independent systems for inspection registers, plan review and permitting, and maintenance records.",
  "/",
);
export default function Home() {
  return (
    <>
      <JsonLd value={organization} />
      <Hero />
      <Products />
      <HowTheyFit />
      <Coverage />
      <Story />
      <Audiences />
      <FinalCTA />
    </>
  );
}
