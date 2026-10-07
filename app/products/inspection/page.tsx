import { products } from "@/content/products";
import { ProductPage } from "@/components/ProductPage";
import { metadata as meta } from "@/lib/metadata";
const product = products[0];
export const metadata = meta(
  product.name,
  product.tagline,
  "/products/inspection",
);
export default function Page() {
  return <ProductPage product={product} />;
}
