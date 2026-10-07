"use client";
import { useState } from "react";
import { StatusPill } from "./ui";
import { fixtures as f } from "@/content/fixtures";
export function StyleDemos() {
  const [run, setRun] = useState(0);
  return (
    <>
      <div className="style-components">
        <button className="button">Default button</button>
        <button className="button button-secondary">Secondary button</button>
        <button className="button" disabled>
          Disabled button
        </button>
        <button className="button" onClick={() => setRun((r) => r + 1)}>
          Replay motion sample
        </button>
      </div>
      <p className="style-note">
        Hover, press and keyboard-focus the controls to inspect their states.
        Reduced motion disables movement.
      </p>
      <div className="record-card style-motion" key={run}>
        <div className="record-card-header">
          <strong>{f.building}</strong>
          <span className="sample-label">Sample data</span>
        </div>
        <p>{f.heroCitation}</p>
        <StatusPill status="Pass" />
        <p>Next due {f.nextDue}</p>
      </div>
    </>
  );
}
