import { Button, Eyebrow } from "./ui";
// Mobile: one column. Desktop: title left, description and CTA bottom-right,
// optional in-page index across the bottom.
export function PageHero({
  label,
  title,
  description,
  cta = true,
  index,
}: {
  label: string;
  title: string;
  description?: string;
  cta?: boolean;
  index?: { href: string; label: string }[];
}) {
  return (
    <section className="page-hero night">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-gridlines" />
      </div>
      <div className="container page-hero-inner">
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        {(description || cta) && (
          <div className="page-hero-aside">
            {description && <p>{description}</p>}
            {cta && (
              <div className="actions">
                <Button />
              </div>
            )}
          </div>
        )}
        {index && (
          <nav
            className="page-hero-index"
            aria-label="On this page"
            style={{ "--index-count": index.length } as React.CSSProperties}
          >
            {index.map((item, i) => (
              <a key={item.href} href={item.href}>
                <span>{item.label}</span>
                <span className="mono" aria-hidden="true">
                  0{i + 1} ↓
                </span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
