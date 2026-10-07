export function RecordLines() {
  return (
    <svg
      className="record-lines"
      viewBox="0 0 1000 65"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {["I", "P", "M"].map((l, i) => (
        <g key={l}>
          <text
            x="0"
            y={14 + i * 22}
            fill="currentColor"
            fontSize="12"
            fontFamily="var(--font-mono)"
          >
            {l}
          </text>
          <path
            d={`M24 ${10 + i * 22} H600 L720 32 H1000`}
            fill="none"
            stroke="currentColor"
            pathLength="1"
          />
        </g>
      ))}
    </svg>
  );
}
