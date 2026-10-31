# BenTech Solutions

The public site restores the last release before the PLC/LOGO! switch:
`acff26a2f4b2f68f53ce94785f602942887806c4` (13 October 2026, PR #11).
It includes six electrical/energy services, five Plus subdomains, and local
WhatsApp/email quote handoffs. The site does not receive or store enquiries.

The response security headers, development-file protection and Pages-origin
noindex policy added on 28 October remain active. The retired automation demo,
privacy and photo-credit routes return 404 rather than the homepage fallback.

Run each `scripts/qa-*.mjs` with Node. Browser acceptance must cover the homepage,
five subdomains, electrical installations and About page on desktop and mobile,
including consent, navigation and intercepted quote handoffs without sending.

Publish through a feature PR and successful exact-head Cloudflare Pages preview,
then merge to main using the existing Pages Git integration. Verify production
routes, source assets and rendered behavior. DNS, mail, provider configuration,
Google Business and billing are outside this restoration.

Recovery uses a reviewed revert PR based on current main. Previous production
source: `047374932c35322647f1b18555950147c20fa221`, deployment
`e930f6c3-1b64-4f19-b7f4-6407e2a72e3b`.
