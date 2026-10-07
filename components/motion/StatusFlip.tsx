import { fixtures as f } from "@/content/fixtures";
import { StatusPill } from "@/components/ui";
export function StatusFlip() {
  return (
    <div className="status-flip">
      <span className="flip-initial" aria-hidden="true">
        <span className="status status-due">◷ Due</span>
        <span>Next due {f.previousDue}</span>
      </span>
      <span className="flip-final">
        <StatusPill status="Pass" />
        <span>Next due {f.nextDue}</span>
      </span>
    </div>
  );
}
