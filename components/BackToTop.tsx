"use client";
// Appears after one viewport and its ring fills with reading progress (both pure CSS).
// The click only handles smooth scrolling and moving focus back to the start of the page.
export function BackToTop() {
  return (
    <a
      href="#main"
      className="back-to-top"
      aria-label="Back to top"
      onClick={(e) => {
        e.preventDefault();
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle className="btt-track" cx="24" cy="24" r="22" />
        <circle className="btt-ring" cx="24" cy="24" r="22" pathLength="1" />
        <path d="M24 32V16M17 23l7-7 7 7" />
      </svg>
    </a>
  );
}
