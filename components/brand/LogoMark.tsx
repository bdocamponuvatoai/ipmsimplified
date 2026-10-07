// Renders public/icons/ipm.webp as an alpha mask so the mark takes any colour.
// Node overlays sit on the three circles (P top, I bottom-left, M bottom-right).
export function LogoMark({
  className = "",
  nodes = false,
  label,
}: {
  className?: string;
  nodes?: boolean;
  label?: string;
}) {
  return (
    <span
      className={`logo-mark ${className}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {nodes &&
        ["p", "i", "m"].map((n) => (
          <i key={n} className={`logo-node node-${n}`} />
        ))}
    </span>
  );
}
export function BrandLockup() {
  return (
    <span className="lockup">
      <LogoMark className="lockup-mark" />
      <span className="lockup-text">
        <b>IPM</b> Simplified
      </span>
    </span>
  );
}
