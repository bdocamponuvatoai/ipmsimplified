import { products } from "@/content/products";
import { Monogram } from "@/components/brand/Monogram";
import { ProductMockup } from "@/components/mockups";
import { SectionHeader, Link } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
const recordTypes = {
  inspection: "Compliance register",
  permit: "Permit file",
  maintenance: "Service record",
} as const;
export function Products({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section night" id="systems">
      <div className="container">
        {heading && (
          <SectionHeader
            number="01 / Product systems"
            title="A system for each side of the record."
          />
        )}
        <Reveal moment="cards">
          <div className="product-grid">
            {products.map((p) => (
              <article className="product-card" key={p.slug}>
                <div className="product-card-meta mono">
                  <span>SYSTEM / {p.letter}</span>
                  <span>STANDALONE</span>
                </div>
                <div className="product-lockup">
                  <Monogram letter={p.letter} />
                  <div>
                    <h3>
                      {p.short}
                      <br />
                      Simplified
                    </h3>
                    <p className="eyebrow">{p.buyer}</p>
                  </div>
                </div>
                <p className="tagline">{p.tagline}</p>
                <dl className="product-card-facts">
                  <div>
                    <dt>Deployment</dt>
                    <dd>Standalone</dd>
                  </div>
                  <div>
                    <dt>Primary object</dt>
                    <dd>{recordTypes[p.slug]}</dd>
                  </div>
                </dl>
                <ul>
                  {p.capabilities.slice(0, 2).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <ProductMockup product={p.slug} compact />
                <Link href={`/products/${p.slug}`}>Open {p.short} system</Link>
              </article>
            ))}
          </div>
        </Reveal>
        <p className="product-footnote">Nothing here requires the other two.</p>
      </div>
    </section>
  );
}
