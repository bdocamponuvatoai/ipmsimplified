import { fixtures as f } from "@/content/fixtures";
import { alt } from "@/content/alt";
import { SampleLabel, StatusPill } from "@/components/ui";
export function PlanReview() {
  return (
    <figure className="mockup" aria-label={alt.plan}>
      <div className="mockup-head">
        <strong>{f.permit} · alarm · Issued</strong>
        <SampleLabel />
      </div>
      <div className="plan-body">
        <div className="plan-drawing">
          <svg
            viewBox="0 0 260 220"
            role="img"
            aria-label="Abstract alarm drawing, not a construction plan"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 15H245V205H15Z M15 80H95V15 M95 80V145H15 M95 145H180V205 M180 15V80H245 M180 80V145H245 M45 45H215V175H125V110H45Z" />
              <path d="M35 35H55V55H35Z M205 35H225V55H205Z M115 165H135V185H115Z M35 100H55V120H35Z" />
              <path
                d="M105 25H165 M105 30H165 M25 155H80 M25 160H80"
                opacity=".3"
              />
            </g>
            <g fill="var(--color-steel)">
              <circle cx="65" cy="65" r="12" />
              <circle cx="195" cy="155" r="12" />
            </g>
            <g
              fill="var(--color-white)"
              fontSize="12"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
            >
              <text x="65" y="69">
                1
              </text>
              <text x="195" y="159">
                2
              </text>
            </g>
          </svg>
          <p className="mono">{f.building} / Alarm</p>
        </div>
        <div className="plan-comments">
          <strong>Review comments</strong>
          <p>
            <b>01</b> · {f.citation}
            <br />
            Adopted edition recorded.
          </p>
          <p>
            <b>02</b> · Field inspection
            <br />
            Result on file.
          </p>
          <StatusPill status="Closed out" />
        </div>
      </div>
    </figure>
  );
}
