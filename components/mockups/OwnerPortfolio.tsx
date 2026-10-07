import { fixtures as f } from "@/content/fixtures";
import { StatusPill } from "@/components/ui";
export function OwnerPortfolio() {
  return (
    <div className="portfolio">
      <p className="mono">Owner edition</p>
      <h4>Portfolio register</h4>
      <div className="portfolio-row">
        <strong>{f.building}</strong>
        <p>
          {f.program} / {f.certificate}
        </p>
        <StatusPill status="On file" />
      </div>
      <div className="portfolio-row">
        <strong>{f.deficiencies} deficiencies open</strong>
        <p>Correct by {f.correctBy}</p>
        <StatusPill status="Deficiency" />
      </div>
      <div className="portfolio-row">
        <p>{f.contractor2}</p>
        <p className="mono">{f.filed}</p>
      </div>
    </div>
  );
}
