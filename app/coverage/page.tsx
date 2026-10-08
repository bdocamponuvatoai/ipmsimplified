import { PageHero } from "@/components/PageHero";
import { CoverageFilter } from "@/components/coverage-filter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { metadata as meta } from "@/lib/metadata";
export const metadata = meta(
  "Programs and cycles",
  "Eight program categories, exact code references and configurable inspection cycles.",
  "/coverage",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Programs & cycles"
        title="The citation stays with the record."
        description="Code citations follow adopted editions; administrators edit the comment and program libraries."
      />
      <section className="section paper">
        <div className="container">
          <CoverageFilter />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
