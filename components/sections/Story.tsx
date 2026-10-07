import { fixtures as f } from "@/content/fixtures";
import { RecordCard } from "@/components/mockups/RecordCard";
import { RecordLines } from "@/components/brand/RecordLines";
import { SectionHeader, SampleLabel } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
const steps = [
  {
    product: "permit",
    title: "The permit that authorised it.",
    text: "Drawings reviewed. Permit issued. Field inspections close the file.",
  },
  {
    product: "inspection",
    title: "The register that tracks it.",
    text: "The required item stays on the register. A pass advances its due date.",
  },
  {
    product: "maintenance",
    title: "The proof both sides keep.",
    text: "Certificates on file. Deficiencies open until somebody corrects them.",
  },
] as const;
export function Story() {
  return (
    <section className="section frost">
      <div className="container">
        <div className="story-intro">
          <SectionHeader
            number="04 / Record pipeline"
            title="From authorization to proof."
          />
          <div className="story-label">
            {f.program} · {f.building}
            <br />
            <SampleLabel />
          </div>
        </div>
        <Reveal moment="lines">
          <div className="story-panels">
            {steps.map((s, i) => (
              <article className="story-panel" key={s.product}>
                <span className="mono">
                  0{i + 1} / {s.product.toUpperCase()}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <RecordCard product={s.product} />
              </article>
            ))}
          </div>
          <RecordLines />
        </Reveal>
      </div>
    </section>
  );
}
