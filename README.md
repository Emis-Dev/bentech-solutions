# BenTech Solutions

Static website for Siemens PLC programming, LOGO! domotics and PLC/LOGO! troubleshooting. The 23 October 2026 relaunch follows the customer's supplied dark industrial reference.

## Run and verify

- `node scripts/serve.mjs`: local preview at http://127.0.0.1:8788 (loopback only).
- `node scripts/qa-routing.mjs`: old hosts/routes, canonical host, preview/origin indexing policy, sitemap and security headers on static and Function responses.
- `node scripts/qa-content.mjs`: current services, claim boundaries, metadata and asset references.
- `node scripts/qa-browser.mjs`: responsive layout, menu, quote handoff, validation, consent and errors. Requires the Playwright Node module (`PLAYWRIGHT_MODULE` may point to a managed installation) and installed Chrome. It mocks analytics and WhatsApp opening; it sends no enquiries. Set `BENTECH_QA_URL` and `BENTECH_QA_OUT` for preview/production checks and separate evidence.

- `node scripts/qa-proof-motion.mjs`: sourced historical review links, centred layouts from 320 to 3440px, actual hero movement, image rotation, arrows/direct selection/keyboard/swipe, failed-image recovery, offscreen suspension, reduced-motion changes and static no-script fallback. Uses the same environment variables and managed Chrome runtime as browser QA.

The old energy-service/Vanta assertions were retired with those product features. The October Google proof section retains original older electrical-service reviews with visible historical context; it does not establish PLC/LOGO! project experience. Replacement checks preserve canonical-host, consent, form, responsive and factual-claim coverage for the new three-service scope. Historical sources and evidence remain in Git history.

## Security boundaries

The site has no login, server-side form receiver, database, upload, webhook or AI endpoint. Contact details are prepared locally for email or WhatsApp; the browser does not claim delivery. The Pages Function applies the same HSTS, clickjacking, MIME-sniffing, referrer and browser-feature restrictions to static, redirect, generated and blocked-path responses. The fixed Pages origin and deployment previews are marked `noindex`; `bentechsolutions.be` remains the canonical indexable host.

## Publish

Feature branch and review → main merge → existing Cloudflare Pages Git integration → independently verify bentechsolutions.be. No build command or framework. Do not change DNS, mail, Pages bindings or credentials as part of a content release.

No form server or database: contact.js creates an email/WhatsApp draft on the visitor's device; the visitor sends it in the selected app. consent.js loads Google only after permission. New rasters are illustrations; prompt sidecars retain provenance. Manrope is self-hosted under the included OFL licence.
