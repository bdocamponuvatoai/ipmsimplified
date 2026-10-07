import { PageHero } from "@/components/PageHero";
import { audiences } from "@/content/audiences";
import { products } from "@/content/products";
import { AudiencePhoto } from "@/components/sections/Audiences";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Who we serve",
  "Compliance records for jurisdictions, inspection and service contractors, and property owners and managers.",
  "/who-we-serve",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Who we serve"
        title="The same building. Different responsibilities."
        description="Jurisdictions, contractors, and owners and managers each keep a different part of the same record."
        index={audiences.map((a) => ({
          href: `#${a.title.toLowerCase().replace(/\W+/g, "-")}`,
          label: a.title,
        }))}
      />
      {audiences.map((a, i) => (
        <section
          key={a.title}
          id={a.title.toLowerCase().replace(/\W+/g, "-")}
          className={`section ${i % 2 ? "frost" : "paper"}`}
        >
          <div className="container">
            <Reveal moment="photos">
              <div className="audience-long">
                <div>
                  <Eyebrow>
                    0{i + 1} / {a.title}
                  </Eyebrow>
                  <h2>{a.name}</h2>
                  <p>{a.copy}</p>
                  <p>{a.detail}</p>
                  {a.products.map((slug) => (
                    <Link key={slug} href={`/products/${slug}`}>
                      {products.find((p) => p.slug === slug)?.name}
                    </Link>
                  ))}
                </div>
                <AudiencePhoto photo={a.photo} />
              </div>
            </Reveal>
          </div>
        </section>
      ))}
      <FinalCTA />
    </>
  );
}
