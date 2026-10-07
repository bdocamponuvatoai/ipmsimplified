import { PageHero } from "./PageHero";
import { DemoForm } from "./DemoForm";
import { Eyebrow, Link } from "./ui";
export function ContactPage({ demo = false }: { demo?: boolean }) {
  return (
    <>
      <PageHero
        label={demo ? "Schedule a demo" : "Talk to us"}
        title={
          demo
            ? "See the record from your side."
            : "Tell us what your building owes."
        }
        description="A jurisdiction’s register. A permit file. An owner’s proof. Tell us which responsibility is yours."
        cta={false}
      />
      <section className="section paper">
        <div className="container form-layout">
          <aside className="form-aside">
            <Eyebrow>One conversation</Eyebrow>
            <h2>Start with the record you keep.</h2>
            <p>Tell us about your programs, permits or maintenance records.</p>
            <p>Each product stands on its own.</p>
            <div className="actions">
              <Link href="mailto:contact@ipmsimplified.com">Email us</Link>
            </div>
            <p className="mono">contact@ipmsimplified.com</p>
          </aside>
          <DemoForm />
        </div>
      </section>
    </>
  );
}
