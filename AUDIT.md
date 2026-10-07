# Production readiness audit

Last reviewed: October 8, 2026.

## Automated gates

The release workflow requires:

- ESLint with zero errors
- TypeScript strict checking
- Content and schema tests
- A hardened Next.js production build
- Stable CSP hashes across repeated builds
- Static route titles, one H1 per page and complete CSP coverage
- All tracked public photos below 120 KB
- Bundle and emitted-font reporting
- Playwright route, responsive, interaction and axe checks
- Zero known production dependency vulnerabilities at the configured audit level

Generated results are written to `audit-static.json` and `audit-results.json`.

## Latest verification

| Check | Result |
| --- | --- |
| Consolidated release check | Pass |
| Next.js production build | Pass on 16.4.0 with Turbopack |
| Static route/CSP/image audit | 15 routes, 0 failures |
| Content and schema tests | 4 passed |
| Playwright and axe | 17 passed |
| Responsive overflow widths | 360, 390, 768, 1024, 1440 and 1920 passed |
| Full npm dependency audit | 0 known vulnerabilities |
| Motion source | 2,239 bytes gzipped |

## Security posture

The demo form validates on the client and server, sends plain-text email, rate-limits a hashed trusted IP, and fails closed when production delivery or distributed rate limiting is unavailable. The site ships restrictive response headers and a production CSP derived from the final static output.

The non-Vercel production IP branch deliberately shares an `untrusted-host` rate-limit bucket. A self-hosted deployment must add an adapter for its trusted reverse proxy before enabling public form traffic.

## Human release gates

Automation cannot approve the following:

- Set the canonical production domain and all delivery/rate-limit secrets.
- Verify a real end-to-end email delivery with controlled addresses.
- Have counsel review the privacy notice and website terms for the operating organisation and launch jurisdictions.
- Have a subject-matter expert review code citations, program language and generated infrastructure imagery.
- Review the final deployment on representative physical mobile devices and networks.

These are deployment and organisational approvals, not unresolved code errors.
