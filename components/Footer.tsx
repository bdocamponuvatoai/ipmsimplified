import NextLink from "next/link";
import { products } from "@/content/products";
import { BrandLockup } from "./brand/LogoMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-console">
          <div className="footer-brand">
            <NextLink href="/" aria-label="IPM Simplified home">
              <BrandLockup />
            </NextLink>
            <p>Record infrastructure for the built environment.</p>
            <span className="footer-system-note">Three independent products. One shared record model.</span>
          </div>

          <nav aria-label="Product links">
            <span className="footer-label">Systems / 03</span>
            {products.map((product, index) => (
              <NextLink key={product.slug} href={`/products/${product.slug}`}>
                <span className="mono">0{index + 1}</span>
                {product.short}
              </NextLink>
            ))}
          </nav>

          <nav aria-label="Platform links">
            <span className="footer-label">Platform</span>
            <NextLink href="/how-they-fit">Data model</NextLink>
            <NextLink href="/coverage">Coverage</NextLink>
            <NextLink href="/who-we-serve">Use cases</NextLink>
          </nav>

          <nav aria-label="Company links">
            <span className="footer-label">Company</span>
            <NextLink href="/company">About</NextLink>
            <NextLink href="/contact">Contact</NextLink>
            <NextLink href="/demo">Book a walkthrough</NextLink>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} IPM Simplified</p>
          <a href="mailto:contact@ipmsimplified.com">contact@ipmsimplified.com</a>
          <div>
            <NextLink href="/privacy">Privacy</NextLink>
            <NextLink href="/terms">Terms</NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
