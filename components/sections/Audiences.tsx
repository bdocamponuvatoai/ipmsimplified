import Image from "next/image";
import { audiences } from "@/content/audiences";
import { alt } from "@/content/alt";
import { SectionHeader, Link } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
export function AudiencePhoto({
  photo,
}: {
  photo: (typeof audiences)[number]["photo"];
}) {
  return (
    <div className="photo-frame">
      <Image
        src={`/photos/${photo}.avif`}
        alt={alt[photo]}
        width={1600}
        height={1200}
        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1440px) 32vw, 405px"
      />
    </div>
  );
}
export function Audiences() {
  return (
    <section className="section frost">
      <div className="container">
        <SectionHeader
          number="05 / Who we serve"
          title="A different responsibility on each side."
        />
        <Reveal moment="photos">
          <div className="audience-grid">
            {audiences.map((a, index) => (
              <article className="audience-card" key={a.title}>
                <AudiencePhoto photo={a.photo} />
                <div className="audience-card-meta mono">
                  <span>0{index + 1} / OPERATOR</span>
                  <span>{a.products.length} SYSTEM{a.products.length > 1 ? "S" : ""}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.copy}</p>
                <Link href={`/products/${a.products[0]}`}>
                  {a.title === "Jurisdictions"
                    ? "See the jurisdiction register"
                    : a.title === "Contractors"
                      ? "See the contractor edition"
                      : "See the owner edition"}
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
