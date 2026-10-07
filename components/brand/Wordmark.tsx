export function Wordmark() {
  return (
    <svg
      className="wordmark"
      viewBox="0 0 270 42"
      role="img"
      aria-label="IPM Simplified"
    >
      <title>IPM Simplified</title>
      {["I", "P", "M"].map((l, i) => (
        <g key={l} transform={`translate(${i * 34},0)`}>
          <rect width="30" height="38" rx="4" fill="var(--color-night)" />
          <text
            x="15"
            y="26"
            textAnchor="middle"
            fill="var(--color-white)"
            fontSize="27"
            fontFamily="var(--font-condensed)"
          >
            {l}
          </text>
          <path d="M7 32H23" stroke="var(--color-sky)" />
        </g>
      ))}
      <text
        x="111"
        y="29"
        fill="currentColor"
        fontSize="30"
        fontWeight="600"
        fontFamily="var(--font-display)"
      >
        Simplified
      </text>
    </svg>
  );
}
