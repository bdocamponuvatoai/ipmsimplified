import { PageHero } from "@/components/PageHero";
import { products } from "@/content/products";
import { Link } from "@/components/ui";
export default function NotFound() {
  return (
    <>
      <PageHero label="404 / Not found" title="No record at this address." />
      <section className="section paper">
        <div className="container">
          <h2>Find the right product.</h2>
          <div className="actions">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
