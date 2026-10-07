# IPM Simplified

Production website for IPM Simplified, a built-environment software platform with three independent systems: Inspection, Permit and Maintenance.

## Stack

- Next.js 16 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS 4/PostCSS with a custom CSS design system
- MDX legal pages
- Server Actions, Zod validation, Resend delivery and Upstash rate limiting
- Playwright and axe browser coverage

Node.js 20.9 or newer is required. Node 24 LTS is used in CI.

## Local development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

| Variable | Required in production | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, unless the Vercel production URL is available | Canonical HTTPS origin |
| `RESEND_API_KEY` | Yes for form delivery | Server-only Resend credential |
| `DEMO_FROM_EMAIL` | Yes for form delivery | Sender on a Resend-verified domain |
| `DEMO_TO_EMAIL` | Recommended | Enquiry destination; defaults to `contact@ipmsimplified.com` |
| `UPSTASH_REDIS_REST_URL` | Yes for form delivery | Distributed rate-limit endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes for form delivery | Distributed rate-limit credential |

The form fails closed in production when email delivery or distributed rate limiting is not configured. Secrets must never use a `NEXT_PUBLIC_` prefix.

## Validation and release

```sh
npm run check
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

`npm run check` runs ESLint, TypeScript, content/schema tests, the hardened production build, static HTML/CSP checks and the bundle report. The build intentionally runs Next.js more than once to derive and verify hashes for inline framework scripts. Deploy with `npm run build`, not `next build` directly.

The browser suite checks every public route for a single H1, runtime errors, WCAG axe violations and horizontal overflow at six viewport widths. It also covers mobile navigation, keyboard tabs, form validation, no-JavaScript rendering and reduced motion.

## Deployment

The project is ready for a standard Next.js deployment. On Vercel:

1. Import the GitHub repository.
2. Keep the install command as `npm ci` and set the build command to `npm run build`.
3. Configure all production environment variables above.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain and redeploy.
5. Exercise a real form submission using controlled addresses before promoting the deployment.

Preview deployments are automatically excluded from search indexing when `VERCEL_ENV` is available. Self-hosted deployments should run behind a trusted reverse proxy and must adapt the trusted client-IP logic in `app/actions.ts` before enabling the public form.

## Security model

- Strict server/client Zod validation and payload limits
- Honeypot protection and five requests per 15-minute hashed-IP rate limit
- Plain-text email delivery; provider errors are not exposed
- CSP with build-verified script hashes in production
- HSTS, frame denial, MIME sniffing protection, restrictive permissions and referrer policies
- No advertising analytics or third-party browser scripts
- Production dependencies are checked with `npm audit --omit=dev`

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## Content and assets

Product examples use clearly marked sample data. Program citations and cycle assignments must be reviewed against the adopted edition for each jurisdiction before being used operationally. The public privacy notice and website terms describe the implementation but still require organisation-specific legal review before launch.

Optimized public photography lives in `public/photos/`; editable source artwork is kept outside the public directory in `assets/source/`. Asset provenance and review notes are documented in [ASSETS.md](ASSETS.md).
