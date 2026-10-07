import NextLink from "next/link";
import type { ReactNode } from "react";
export function Button({
  href = "/demo",
  children = "Schedule a demo",
  secondary = false,
}: {
  href?: string;
  children?: ReactNode;
  secondary?: boolean;
}) {
  return (
    <NextLink
      className={`button ${secondary ? "button-secondary" : ""}`}
      href={href}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </NextLink>
  );
}
export function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <NextLink className="text-link" href={href}>
      {children}
      <span aria-hidden="true">→</span>
    </NextLink>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function SectionHeader({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="section-heading">
      <Eyebrow>{number}</Eyebrow>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}
export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}
export function StatusPill({ status }: { status: string }) {
  const kind = /Pass|file|Current|Closed|Issued/i.test(status)
    ? "pass"
    : /Due/i.test(status)
      ? "due"
      : "fail";
  return (
    <span className={`status status-${kind}`}>
      <span aria-hidden="true">
        {kind === "pass" ? "✓" : kind === "due" ? "◷" : "!"}
      </span>{" "}
      {status}
    </span>
  );
}
export function SampleLabel() {
  return <span className="sample-label">Sample data</span>;
}
