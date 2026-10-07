import { Button, Eyebrow } from "@/components/ui";
import { RecordLines } from "@/components/brand/RecordLines";
import { Reveal } from "@/components/motion/Reveal";
export function FinalCTA() {
  return (
    <section className="section night">
      <div className="container">
        <Reveal moment="lines">
          <div className="cta-grid">
            <div>
              <Eyebrow>Next step / Product walkthrough</Eyebrow>
              <h2>See the record model working with your own process.</h2>
            </div>
            <div className="actions">
              <Button>Book a walkthrough</Button>
              <Button secondary href="mailto:contact@ipmsimplified.com">
                Email us
              </Button>
            </div>
          </div>
          <RecordLines />
        </Reveal>
      </div>
    </section>
  );
}
