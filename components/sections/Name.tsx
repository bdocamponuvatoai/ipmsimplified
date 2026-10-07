import { products } from "@/content/products";
import { Monogram } from "@/components/brand/Monogram";
import { LogoMark } from "@/components/brand/LogoMark";
import { SectionHeader, Link } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
// Sticky logo; each step's view timeline lights its node as it crosses the viewport (CSS only).
export function Name() {
  return (
    <section id="the-name" className="section paper name-scene">
      <div className="container">
        <SectionHeader
          number="01 / The name"
          title="Three responsibilities. One name."
        />
        <div className="orbit-story">
          <div className="orbit-stage">
            <div className="orbit-sticky">
              <LogoMark nodes className="story-mark" />
              <ol className="orbit-index mono" aria-hidden="true">
                {products.map((p) => (
                  <li key={p.slug} data-for={p.letter}>
                    {p.letter} / {p.short}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="orbit-steps">
            {products.map((p, i) => (
              <article className="orbit-step" data-step={p.letter} key={p.slug}>
                <div className="orbit-step-head">
                  <Monogram letter={p.letter} />
                  <span className="mono">
                    0{i + 1} / {p.buyer}
                  </span>
                </div>
                <h3>{p.short}</h3>
                <p>{p.tagline}</p>
                <Link href={`/products/${p.slug}`}>
                  Explore {p.short.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="simplified-line">
            <h3>Simplified</h3>
            <p>The part all three share.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
