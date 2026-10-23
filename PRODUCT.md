# BenTech Solutions website product context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- People and businesses with a Siemens PLC or Siemens LOGO! application to program.
- Visitors with an existing PLC or LOGO! program that behaves unexpectedly.
- Visitors who can describe the required operation and want to discuss scope before requesting a quote.

## Product purpose

Help visitors understand BenTech's three automation services, the path from functional description to delivered program, and the direct route to discuss their application.

## Positioning

BenTech translates the customer's functional description into Siemens PLC or LOGO! logic, simulates the agreed operation, and supplies the agreed program with its documentation dossier.

## Capabilities and constraints

- Exactly three services: Siemens PLC programming, Siemens LOGO! domotics, and PLC/LOGO! troubleshooting.
- Four delivery steps: functional description and scope; programming; simulation and test; delivery of the agreed program and dossier.
- The homepage, privacy page and 404 page use custom static HTML, CSS and JavaScript. A Pages Function handles canonical routing, retired routes, robots and sitemap responses.
- The current relaunch replaces the former electrician and energy presentation. Former service paths and division hosts route to the new services. They do not establish continuing offers.
- Visitors choose a service and describe their hardware, required behaviour and timing. The proposed primary route uses a native POST to FormSubmit, including spam checking, an owner notification and a submitter autoresponse with a copy. AJAX and disabled CAPTCHA must not replace this route because the provider excludes autoresponses in those modes.
- FormSubmit documents a 30-day submission archive. The site has no local form database. The return page alone is not proof of email delivery. Inbox receipt and confirmation remain unverified until an authorised live test after mailbox activation.
- The native POST works without JavaScript. WhatsApp is an optional draft handoff; direct email/telephone/WhatsApp links remain available.
- Deployment gate: provider mailbox activation, real owner notification and sender confirmation must be verified before merging this proposed route to production. Current live production still uses the prior draft handoff until that gate is met.
- Google marketing measurement requires explicit opt-in. A handoff is an interaction, not a received lead. Contact analytics carry channel, service and form identifiers, never names, email addresses, telephone numbers or the project description.
- Internal product/design documentation and raster provenance sidecars are blocked from public routing.

## Brand commitments

- Direct, practical Dutch copy.
- The client-selected dark industrial reference: navy, electric blue, bold Manrope and tangible controller imagery.
- Public identity remains BenTech Solutions CommV, BTW BE 1025.714.523, +32 486 32 86 45, info@bentechsolutions.be and https://bentechsolutions.be/.
- BenTech is an independent service provider; Siemens and LOGO! are their owners' trademarks.
- The hero uses a real photograph of a Siemens LOGO! 8 by MakeMagazinDE, licensed CC BY-SA 4.0, with visible linked attribution and resize/crop disclosure. Application images remain visibly illustrative. Neither is BenTech project evidence or an employee/founder portrait.
- No AI service references, old energy offers, invented projects, reviews, statistics, accreditations, guarantees or 24/7 promises.
- Contract, customer finance and billing information has no place on public pages.

## Evidence and acceptance boundaries

- The visual authority and current scope are recorded in `.impeccable/surfaces/automation.md`; the signed and archived customer addendum is retained in the customer dossier.
- The implemented system is recorded in `DESIGN.md` and `.impeccable/design.json`.
- Shipping rasters under `assets/automation` retain source or exact prompt provenance sidecars. Font files are self-hosted Manrope with the OFL licence.
- Rendered review states and browser evidence are under `.impeccable/review`. Source, local QA and review artifacts do not by themselves establish production publication or enquiry receipt.
- This relaunch does not authorise DNS, email, billing or customer-account changes.

## Product principles

1. Keep the three services and the delivery model understandable before asking for contact details.
2. Use the functional description to establish scope; do not imply unspecified hardware installation, commissioning, response times or support coverage.
3. Make only claims supported by current customer facts.
4. Keep direct contact usable on small screens and when form scripting is unavailable.
5. Keep consent optional and handoff status explicit.

## Accessibility and inclusion

- Semantic headings, landmarks, labels and native form validation.
- Keyboard-operable navigation and quote disclosure, visible focus states and an Escape path from the mobile menu.
- Responsive layouts down to 320px and readable content without horizontal overflow.
- Reduced-motion support and descriptive illustration text.
- Browser evidence is scoped acceptance evidence, not a comprehensive assistive-technology audit.
