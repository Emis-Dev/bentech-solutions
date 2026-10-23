# BenTech Solutions

Static website for Siemens PLC programming, LOGO! domotics and PLC/LOGO! troubleshooting. The 23 October 2026 relaunch follows the customer's supplied dark industrial reference.

## Run and verify

- `node scripts/serve.mjs`: local preview at http://127.0.0.1:8788 (loopback only).
- `node scripts/qa-routing.mjs`: old hosts/routes, canonical host, previews and sitemap.
- `node scripts/qa-content.mjs`: current services, claim boundaries, metadata and asset references.
- `node scripts/qa-form-delivery.mjs`: native POST and confirmation configuration, with all provider calls mocked; no live delivery claim.
- `node scripts/qa-browser.mjs`: responsive layout, menu, quote handoff, validation, consent and errors. Requires the Playwright Node module (`PLAYWRIGHT_MODULE` may point to a managed installation) and installed Chrome. It mocks analytics and WhatsApp opening; it sends no enquiries. Set `BENTECH_QA_URL` and `BENTECH_QA_OUT` for preview/production checks and separate evidence.

The old energy-service/Vanta/review assertions were retired with those product features. Replacement checks preserve canonical-host, consent, form, responsive and factual-claim coverage for the new three-service scope. Historical sources and evidence remain in Git history.

## Publish

Feature branch and review → main merge → existing Cloudflare Pages Git integration → independently verify bentechsolutions.be. No build command or framework. Do not change DNS, mail, Pages bindings or credentials as part of a content release.

Proposed form: native FormSubmit POST with mandatory provider spam check, owner email and submitter copy; 30-day provider archive. WhatsApp remains an optional draft. No local form database. This route is not live until mailbox activation and an explicitly authorised real owner/confirmation test pass. Native submission must remain non-AJAX; do not disable CAPTCHA. The thank-you page alone never proves inbox delivery. consent.js loads Google only after permission. New rasters are illustrations; prompt sidecars retain provenance. Manrope is self-hosted under the included OFL licence.
