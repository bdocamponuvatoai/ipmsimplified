import { fixtures as f } from "@/content/fixtures";
import { statements } from "@/content/products";
import { SampleLabel, SectionHeader, StatusPill } from "@/components/ui";
import { RecordLines } from "@/components/brand/RecordLines";
import { Reveal } from "@/components/motion/Reveal";
export function Anatomy() {
  return (
    <div className="record-anatomy">
      <div className="schema-head mono">
        <span>RECORD_SCHEMA / CORE OBJECT</span>
        <span>VERSION 1.0</span>
      </div>
      <div className="anatomy-nodes">
        <div className="anatomy-node">
          <p className="eyebrow">01 / Required item</p>
          <strong>{f.program}</strong>
          <p>{f.citation}</p>
        </div>
        <div className="anatomy-node">
          <p className="eyebrow">02 / Due date</p>
          <strong>{f.nextDue}</strong>
          <p>Annual cycle</p>
        </div>
        <div className="anatomy-node">
          <p className="eyebrow">03 / Last result</p>
          <StatusPill status="Pass" />
          <p>{f.filed}</p>
        </div>
        <div className="anatomy-node">
          <p className="eyebrow">04 / Proof document</p>
          <strong>{f.certificate}</strong>
          <p>Certificate on file</p>
        </div>
      </div>
      <SampleLabel />
      <RecordLines />
    </div>
  );
}
export function HowTheyFit() {
  return (
    <section className="section night">
      <div className="container">
        <SectionHeader
          number="02 / Shared data model"
          title="The same object underneath every workflow."
        >
          A required item. A due date. A result. The document that proves it.
        </SectionHeader>
        <Reveal moment="lines">
          <Anatomy />
          <div className="principles">
            {statements.map((s, i) => (
              <div key={s}>
                <span className="mono">0{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
