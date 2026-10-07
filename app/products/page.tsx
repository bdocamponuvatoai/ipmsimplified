import { PageHero } from "@/components/PageHero";
import { Products } from "@/components/sections/Products";
import { Story } from "@/components/sections/Story";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "The three products",
  "InspectionSimplified, PermitSimplified and MaintenanceSimplified. Sold separately. Each stands on its own.",
  "/products",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="The products"
        title="Three systems. Each stands on its own."
        description="Each has its own customer, pricing and site. None requires the other two."
      />
      <Story />
      <Products heading={false} />
    </>
  );
}
