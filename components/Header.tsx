"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLockup } from "./brand/LogoMark";
import { products } from "@/content/products";

const nav = [
  ["Coverage", "/coverage"],
  ["Use cases", "/who-we-serve"],
  ["Data model", "/how-they-fit"],
  ["Company", "/company"],
] as const;

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const productMenu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  const lock = (on: boolean) => {
    document.documentElement.style.overflow = on ? "hidden" : "";
  };

  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }

  function closeProductMenu() {
    productMenu.current?.removeAttribute("open");
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <Link href="/" className="brand" aria-label="IPM Simplified home">
            <BrandLockup />
            <span className="environment-label">Inspection · Permit · Maintenance</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <details className="product-menu" ref={productMenu}>
              <summary aria-current={current("/products")}>
                Systems <span className="nav-count">03</span>
              </summary>
              <div className="product-menu-panel">
                <div className="product-menu-head">
                  <span className="mono">IPM / SYSTEMS</span>
                  <Link href="/products" onClick={closeProductMenu}>
                    View overview <span aria-hidden="true">→</span>
                  </Link>
                </div>
                {products.map((product, index) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    onClick={closeProductMenu}
                    aria-current={current(`/products/${product.slug}`)}
                    className="product-menu-item"
                  >
                    <span className="product-menu-index">0{index + 1}</span>
                    <span>
                      <strong>{product.short}</strong>
                      <small>{product.buyer}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </details>
            {nav.map(([label, href]) => (
              <Link aria-current={current(href)} key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/demo" className="button button-small header-cta">
              Book a walkthrough <span aria-hidden="true">↗</span>
            </Link>
            <button
              className="menu-trigger"
              ref={trigger}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
                lock(true);
              }}
            >
              <span>Menu</span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <span className="scroll-progress" aria-hidden="true" />

      <dialog
        id="mobile-menu"
        ref={dialog}
        className="mobile-menu"
        aria-label="Navigation"
        onClose={() => {
          lock(false);
          setOpen(false);
        }}
      >
        <div className="mobile-menu-top">
          <BrandLockup />
          <button onClick={close} aria-label="Close navigation">
            Close
          </button>
        </div>

        <div className="mobile-system-label">
          <span className="mono">PRODUCT SYSTEMS / 03</span>
          <span className="mobile-system-note">Independent products</span>
        </div>

        <div className="mobile-products">
          {products.map((product, index) => (
            <Link key={product.slug} href={`/products/${product.slug}`} onClick={close}>
              <span className="mono">0{index + 1}</span>
              <span>
                <strong>{product.short}</strong>
                <small>{product.buyer}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>

        <nav aria-label="Mobile navigation" className="mobile-links">
          {[["Overview", "/"], ["Systems", "/products"], ...nav].map(
            ([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={href === "/" ? (pathname === "/" ? "page" : undefined) : current(href)}
              >
                <span className="mono">0{index + 1}</span>
                <span>{label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ),
          )}
        </nav>

        <div className="mobile-menu-actions">
          <Link href="/demo" className="button" onClick={close}>
            Book a walkthrough <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/contact" className="button button-secondary" onClick={close}>
            Contact team
          </Link>
        </div>
      </dialog>
    </>
  );
}
