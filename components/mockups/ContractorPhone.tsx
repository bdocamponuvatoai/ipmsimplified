"use client";
import { useState } from "react";
import { fixtures as f } from "@/content/fixtures";
import { StatusPill } from "@/components/ui";
export function ContractorPhone() {
  const [filed, setFiled] = useState(false);
  return (
    <div className="phone">
      <div className="phone-top" />
      <p className="mono">{f.contractor}</p>
      <h4>Today’s route</h4>
      {f.route.map((stop, i) => (
        <div className="route-stop" key={stop.building}>
          <span className="mono">{stop.time}</span>
          <strong>{stop.building}</strong>
          <p>{stop.task}</p>
          {i === 0 && (
            <>
              <button
                type="button"
                className="mock-button"
                disabled={filed}
                onClick={() => setFiled(true)}
              >
                {filed ? "Result filed" : "File result"}
              </button>
              <span aria-live="polite">
                {filed && (
                  <>
                    <StatusPill status="Pass" />
                    <span className="mono"> Next due {f.nextDue}</span>
                  </>
                )}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
