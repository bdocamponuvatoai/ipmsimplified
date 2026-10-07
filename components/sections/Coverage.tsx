import { programs, cycles } from "@/content/programs";
import { ProgramIcon } from "@/components/brand/ProgramIcon";
import { SectionHeader, Link } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
export function Coverage() {
  return (
    <section className="section block">
      <div className="container">
        <SectionHeader
          number="03 / Programs & cycles"
          title="Every required item has a place."
        >
          From fire alarm testing to backflow prevention. Keep the citation with
          the record.
        </SectionHeader>
        <Reveal moment="icons">
          <div className="program-grid">
            {programs.map((p) => (
              <div className="program-cell" key={p.name}>
                <ProgramIcon name={p.icon} />
                <h3>{p.name}</h3>
                <p className="mono">{p.citation}</p>
              </div>
            ))}
          </div>
          <div className="cycle-strip">
            {cycles.map((c) => (
              <span className={c === "annual" ? "annual" : ""} key={c}>
                {c}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="actions">
          <Link href="/coverage">Programs and adopted editions</Link>
        </div>
      </div>
    </section>
  );
}
