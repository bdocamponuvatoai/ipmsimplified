import { PageHero } from "@/components/PageHero";
import { Name } from "@/components/sections/Name";
import { principle } from "@/content/products";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Eyebrow, Link } from "@/components/ui";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Company",
  "IPM means Inspection, Permit and Maintenance. Simplified is the part all three share.",
  "/company",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Company / IPM Simplified"
        title="Built around the record."
        description="Compliance software for the built environment."
      />
      <Name />
      <section className="section block">
        <div className="container works-alone">
          <div>
            <Eyebrow>02 / Core principle</Eyebrow>
            <h2>The same object underneath.</h2>
          </div>
          <div>
            <p>{principle}</p>
            <p>Three products. Sold separately. Each stands on its own.</p>
            <div className="actions">
              <Link href="/how-they-fit">Follow the shared record</Link>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
