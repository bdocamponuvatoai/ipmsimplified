import type { ReactNode } from "react";
export function Reveal({
  children,
  className = "",
  moment = "reveal",
}: {
  children: ReactNode;
  className?: string;
  moment?: string;
}) {
  return (
    <div data-moment={moment} className={`moment ${className}`}>
      {children}
    </div>
  );
}
