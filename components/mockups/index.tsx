import type { ProductSlug } from "@/content/products";
import { RegisterTable } from "./RegisterTable";
import { PlanReview } from "./PlanReview";
import { Maintenance } from "./Maintenance";
export function ProductMockup({
  product,
  compact = false,
}: {
  product: ProductSlug;
  compact?: boolean;
}) {
  return product === "inspection" ? (
    <RegisterTable compact={compact} />
  ) : product === "permit" ? (
    <PlanReview />
  ) : (
    <Maintenance />
  );
}
