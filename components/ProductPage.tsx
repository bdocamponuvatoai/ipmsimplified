import { type Product } from "@/content/products";
import { fixtures as f } from "@/content/fixtures";
import { Monogram } from "./brand/Monogram";
import { ProductMockup } from "./mockups";
import { RecordCard } from "./mockups/RecordCard";
import { EditionTabs } from "./EditionTabs";
import {
  Button,
  Eyebrow,
  SectionHeader,
  SampleLabel,
  StatusPill,
  Link,
} from "./ui";
import { Reveal } from "./motion/Reveal";
import { FinalCTA } from "./sections/FinalCTA";
import { JsonLd, software } from "@/lib/jsonld";
export function ProductPage({ product: p }: { product: Product }) {
  return (
    <>
      <JsonLd value={software(p)} />
      <section className="page-hero night">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-gridlines" />
        </div>
        <div className="container product-hero-grid">
          <div>
            <div className="product-title">
              <Monogram letter={p.letter} />
              <Eyebrow>{p.name}</Eyebrow>
            </div>
            <h1>{p.tagline}</h1>
            <p>{p.buyer}</p>
            <div className="actions">
              <Button />
            </div>
          </div>
          <Reveal>
            <ProductMockup product={p.slug} />
          </Reveal>
        </div>
      </section>
      <section className="section paper">
        <div className="container">
          <SectionHeader number="01 / Who it’s for" title={p.buyer}>
            A required item, its due date, its last result and the document that
            proves it.
          </SectionHeader>
          {p.capabilities.map((c, i) => (
            <Reveal key={c}>
              <div className="capability">
                <span className="mono">0{i + 1}</span>
                <h3>{c}</h3>
                {p.slug === "inspection" && i === 3 ? (
                  <div className="record-card">
                    <div className="record-card-header">
                      <strong>{f.contractor2}</strong>
                      <SampleLabel />
                    </div>
                    <p>{f.licence}</p>
                    <div className="record-details">
                      <StatusPill status="Licence expired" />
                      <p>Filing blocked</p>
                    </div>
                  </div>
                ) : p.slug === "inspection" && i === 4 ? (
                  <RecordCard product="maintenance" />
                ) : (
                  <RecordCard product={p.slug} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {p.editions && (
        <section className="section frost">
          <div className="container">
            <SectionHeader
              number="02 / Editions"
              title="The edition for your responsibility."
            />
            <EditionTabs product={p} />
            <noscript>
              <div className="style-row">
                {p.editions.map((e) => (
                  <p key={e.name}>
                    <strong>{e.name}: </strong>
                    {e.copy}
                  </p>
                ))}
              </div>
            </noscript>
          </div>
        </section>
      )}
      <section className="section paper">
        <div className="container works-alone">
          <div>
            <Eyebrow>03 / Works alone</Eyebrow>
            <h2>
              Its own product.
              <br />
              Its own record.
            </h2>
          </div>
          <div>
            <p>Nothing here requires the other two products.</p>
            <p>None requires the other side of the record to buy anything.</p>
            <div className="actions">
              <Link href="/coverage">Programs, citations and cycles</Link>
            </div>
            <p className="mono">
              Fire alarm / NFPA 72 · Fire sprinklers / NFPA 25
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
