import Image from "next/image";
import { heroCopy, products } from "@/content/products";
import { alt } from "@/content/alt";
import { RecordCard } from "@/components/mockups/RecordCard";
import { Button, Eyebrow } from "@/components/ui";

const metrics = [
  ["03", "independent systems"],
  ["01", "shared record model"],
  ["08", "program families"],
] as const;

export function Hero() {
  return (
    <section className="hero night">
      <div className="container">
        <div className="hero-top">
          <Eyebrow>Built-environment record infrastructure</Eyebrow>
          <span className="hero-release mono">
            INDEPENDENT SYSTEMS / SHARED RECORD MODEL
          </span>
        </div>

        <div className="hero-stage">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>
                <span className="line"><span>One building.</span></span>
                <span className="line"><span>Three <em>records.</em></span></span>
              </h1>
              <p className="hero-copy">{heroCopy}</p>
              <div className="actions">
                <Button>Book a product walkthrough</Button>
                <Button secondary href="/products">Explore the platform</Button>
              </div>

              <dl className="hero-metrics">
                {metrics.map(([value, label]) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hero-art">
              <div className="hero-photo">
                <Image
                  src="/photos/ipm-systems-hero.avif"
                  alt={alt["ipm-systems-hero"]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, calc(100vw - 32px)"
                />
              </div>
              <div className="hero-records">
                <span className="hero-card-label mono">SAMPLE RECORD / INSPECTION</span>
                <RecordCard product="inspection" animate />
              </div>
            </div>
          </div>
        </div>

        <nav className="hero-system-rail" aria-label="Product systems">
          <div className="hero-system-intro">
            <span className="mono">PRODUCT SYSTEMS / 03</span>
            <small>Independent by design</small>
          </div>
          {products.map((product, index) => (
            <a key={product.slug} href={`/products/${product.slug}`}>
              <span className="mono">0{index + 1} / {product.letter}</span>
              <strong>{product.short}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
