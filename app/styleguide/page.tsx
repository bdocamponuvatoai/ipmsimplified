import { PageHero } from "@/components/PageHero";
import { palette } from "@/content/tokens";
import { Monogram } from "@/components/brand/Monogram";
import { RecordLines } from "@/components/brand/RecordLines";
import { Button, Chip, StatusPill, Link, SectionHeader } from "@/components/ui";
import { StyleDemos } from "@/components/StyleDemos";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Styleguide",
  "The IPM Simplified palette, type system, record lines, interface states and motion tokens.",
  "/styleguide",
  { index: false },
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Design system / 01"
        title="The record, by design."
        description="One palette. Three product letters. Status colours carry a precise meaning."
      />
      <section className="section paper">
        <div className="container">
          <SectionHeader number="01 / Palette" title="Colour has a job." />
          <div className="style-colors">
            {palette.map((c) => (
              <div key={c}>
                <div
                  className="swatch"
                  style={{ background: `var(--color-${c})` }}
                />
                <span className="mono">{c}</span>
              </div>
            ))}
          </div>
          <p className="style-note">
            Body text uses night or steel on light. Use white or haze on night.
            Slate and mist are decorative only.
          </p>
          <p className="style-note">
            Pass means pass, on file, current or closed. Due and fail appear
            only in sample interfaces.
          </p>
          <div className="style-row">
            <h2>Type scale</h2>
            <p className="eyebrow">Barlow Condensed / Program reference</p>
            <h2>Inspection, permit, maintenance.</h2>
            <h3>Fulton Yard 12</h3>
            <p>IBM Plex Sans: The result stays with the record.</p>
            <p className="mono">IBM Plex Mono / FP-2026-0571 / Aug 12, 2027</p>
          </div>
          <div className="style-row">
            <h2>I / P / M</h2>
            <div className="actions">
              {["I", "P", "M"].map((l) => (
                <Monogram letter={l} key={l} />
              ))}
            </div>
            <RecordLines />
          </div>
          <div className="style-row">
            <h3>Actions and states</h3>
            <StyleDemos />
            <div className="actions">
              <Button />
              <Link href="/products">See the three products</Link>
              <Chip>NFPA 72</Chip>
            </div>
          </div>
          <div className="style-row">
            <h3>Sample statuses</h3>
            <div className="style-components">
              <StatusPill status="Pass" />
              <StatusPill status="Due soon" />
              <StatusPill status="Deficiency" />
              <StatusPill status="Closed out" />
            </div>
            <p className="sample-label">Sample data</p>
          </div>
          <div className="style-row">
            <h3>Space and shape</h3>
            <p>8px base unit. 24px gutters. 1280px maximum content width.</p>
            <p>
              Section padding: 96–160px. Inputs: 4px radius. Product windows:
              6px radius.
            </p>
          </div>
          <div className="style-row">
            <h3>Motion</h3>
            <p className="mono">fast 350ms / base 600ms / slow 900ms</p>
            <p className="mono">
              rise 16px / stagger 80ms / ease-out cubic-bezier(0.16, 1, 0.3, 1)
            </p>
            <p>
              One shared observer. Each animation completes once. Content
              remains readable without JavaScript.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
