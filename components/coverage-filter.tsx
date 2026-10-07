"use client";
import { useState } from "react";
import {
  programs,
  cycles,
  confirmedCycles,
  type Cycle,
} from "@/content/programs";
import { ProgramIcon } from "./brand/ProgramIcon";
export function CoverageFilter() {
  const [cycle, setCycle] = useState<Cycle | "all">("all");
  const filtered = programs.filter(
    (p) => cycle === "all" || confirmedCycles[p.name]?.includes(cycle),
  );
  return (
    <div>
      <div
        className="coverage-filters"
        role="group"
        aria-label="Filter confirmed program cycles"
      >
        <button aria-pressed={cycle === "all"} onClick={() => setCycle("all")}>
          All programs
        </button>
        {cycles.map((c) => (
          <button
            key={c}
            aria-pressed={cycle === c}
            onClick={() => setCycle(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="filter-note">
        Supported cycles are listed above. Program assignments depend on adopted
        editions and require administrator confirmation.
      </p>
      <div aria-live="polite">
        <p className="mono">{filtered.length} programs shown</p>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No confirmed assignments for this cycle.</h3>
          <p>
            Program-to-cycle assignments have not been supplied. This does not
            mean the program is unsupported.
          </p>
          <button className="button" onClick={() => setCycle("all")}>
            View all programs
          </button>
        </div>
      ) : (
        filtered.map((p) => (
          <details className="program-details" key={p.name}>
            <summary>
              <ProgramIcon name={p.icon} />
              <h3>{p.name}</h3>
              <span className="mono">{p.citation}</span>
            </summary>
            <div>
              <p>
                Code reference: <span className="mono">{p.citation}</span>
              </p>
              <p>
                Applicable cycles: to be confirmed against the jurisdiction’s
                adopted edition.
              </p>
              <p>Administrators edit the comment and program libraries.</p>
            </div>
          </details>
        ))
      )}
    </div>
  );
}
