---
name: BenTech Solutions
description: Tangible industrial programming in navy, electric blue and clear technical layouts.
colors:
  ink: "#111f2d"
  navy: "#09141e"
  blue: "#0077bf"
  blue-hover: "#0065a4"
  bright: "#079ef3"
  display-blue: "#27b3ff"
  muted: "#526272"
  line: "#dce3e9"
  paper: "#f8fafc"
  white: "#ffffff"
  field: "#f8fbff"
  field-border: "#7b9ab0"
  outline-border: "#a5b6c5"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "61px"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.4
  field:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.7
  caption:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  field: "5px"
  button: "7px"
  card: "12px"
  quote: "15px"
  hero-action: "30px"
  circle: "50%"
spacing:
  small: "12px"
  medium: "22px"
  large: "30px"
  section: "82px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "inherit"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 22px"
  button-outline-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
  service-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "29px 22px 23px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.field}"
    padding: "11px 12px"
---

# Design System: BenTech Solutions

## Overview

**Creative North Star: "Industrial programming made tangible"**

The selected world puts tangible controllers and clear technical language inside an inky navy frame. Electric blue marks actions and programming emphasis; cool light sections keep service explanations easy to scan. Bold geometric Manrope and thin SVG strokes connect the photographic hardware to the interface.

The system is restrained and specific: broad tonal fields, inset content, fine borders and rounded technical containers. The current homepage expresses this world through a controller hero, services, a connected delivery sequence, illustrative applications and a quote disclosure. That page sequence belongs to its surface contract rather than becoming a mandatory template for every future page.

**Key Characteristics:**

- Navy and light surfaces alternate with a clear reading order.
- Electric blue identifies action, focus and technical emphasis.
- Self-hosted Manrope gives headings a compact, geometric voice.
- The controller hero uses three licensed-source product images in the client-selected dark workshop mood. Attribution and adaptation details sit on the footer-linked photo credits page. Application illustrations remain visibly illustrative.
- Borders and tonal layering carry depth. The hero has one authored photo sequence; supporting interaction feedback stays brief.

## Colors

The palette pairs deep industrial navy with cool paper and a blue action signal. Frontmatter values are normative; shared styles are in `automation.css`, with the hero signal and review proof in `proof-motion.css`. The review field is cool blue (`#eaf1f6`); the signal surface (`#0c1d2b`) and its cyan wires extend the existing navy/blue world.

### Primary

- **Control Blue** (`blue`): Filled primary actions; its darker hover sibling preserves the same role.
- **Electric Focus** (`bright`): Keyboard outlines, the navigation indicator and technical accents.
- **Programming Blue** (`display-blue`): The highlighted programming line in the hero.

### Neutral

- **Industrial Navy** (`navy`): Header, hero ground and dark-surface text contrast.
- **Technical Ink** (`ink`): Main text on light sections.
- **Cool Paper** (`paper`) and **White** (`white`): Page ground and service/consent surfaces.
- **Slate Copy** (`muted`): Secondary copy on light surfaces.
- **Technical Line** (`line`): Service boundaries and footer separation.
- **Field Ground**, **Field Border** and **Outline Border** (`field`, `field-border`, `outline-border`): Form and secondary-action definition.

### Named Rules

**The Blue Signal Rule.** Use blue for an action, a focus cue or a technical emphasis already represented in the system. Keep long-form copy neutral.

**The Legible Ground Rule.** Put light text on dark fields and ink text on light fields. When controller imagery sits behind copy, retain enough dark negative space for the complete heading.

## Typography

**Display Font:** Manrope with a sans-serif fallback.
**Body Font:** Manrope with a sans-serif fallback.

The variable font is self-hosted with weights 400–800 and `font-display: swap`. Heavy, tightly tracked headings contrast with relaxed body leading. Paragraph measure is capped at 72 characters; hero copy is narrower.

### Hierarchy

- **Display:** Hero heading at the frontmatter role. The observed responsive sizes are 68px from 1600px, 53px through 1200px, 47px through 992px, 43px through 600px and 36px below 360px. Mobile leading becomes 1.12.
- **Headline:** Main section headings use the frontmatter role, reducing to 30px through 1200px. The dark process introduction uses 31px and 29px on mobile.
- **Title:** Service headings use the title role. Delivery-step headings are smaller, at 14px on wide screens and 16px on mobile.
- **Body:** The base body role supports section introductions. Service and process descriptions use 12–13px with 1.8 leading; mobile section introductions use 14px.
- **Label:** Field labels and compact capability names use a strong small hierarchy.
- **Caption:** Illustration labels, secondary capability text and footer information use the caption role. Functional copy is at least 11px; the small SOLUTIONS wordmark is part of the decorative brand lockup.

### Named Rules

**The Complete Phrase Rule.** Responsive wrapping must preserve words and spaces. A hidden hard line break must not join adjacent words.

## Layout

The wide container is capped at 1280px, with 56px side gutters. Gutters become 32px through 1200px, 20px through 600px and 16px below 360px. Full-width dark fields contain this same inset content.

The standard desktop section split uses a 280px introduction, 50px gap and a flexible content region. At 1200px it becomes 240px with a 30px gap; at 992px it becomes one column. Three service/application columns collapse at 600px. The four-step horizontal sequence becomes a vertical line on mobile. The capability rail becomes two columns at 992px.

Section padding is 82px, reducing to 58px through 992px and 46px through 600px. The header is 94px high, becoming 80px at the menu breakpoint. The current hero has a 620px minimum content height, growing to 660px on wide screens; mobile stacks copy above the controller crop and compact signal diagram. These are observed surface dimensions, not fixed requirements for unrelated pages.

## Elevation & Depth

Most surfaces are flat. Deep gradients, a real raster and the hero's dark overlay establish depth; fine borders separate cards. Shadows belong to overlays: the consent panel uses `0 10px 45px #001e3c38`, and the mobile navigation uses `0 20px 35px #0005`. Cards do not lift or cast decorative shadows.

**The Flat Content Rule.** Keep service containers flat; reserve elevation for the floating consent panel and navigation.

## Shapes

Cards and application media share the card radius. Buttons are compact rounded rectangles, while the hero primary action has a fuller rounded silhouette. The quote disclosure has a larger container radius. Circular step numbers connect to a thin horizontal or vertical line. Thin rounded SVG strokes and the angular B monogram provide the technical detail; text glyphs do not stand in for interface icons.

## Components

### Buttons

Direct, compact actions with a minimum height of 48px, an inline arrow where present and the frontmatter padding. Primary buttons darken on hover. Outline buttons use an outline border on dark surfaces, then become white with navy text on hover. Consent uses a light-surface outline variant with ink text. Buttons retain a visible three-pixel focus outline with five-pixel offset. Disabled buttons use a muted blue fill and a blocked cursor.

### Cards / Containers

Service cards use a white surface, a one-pixel technical line, the card radius and a flexible vertical layout that aligns the final service action. Mobile changes each card into an icon-and-copy grid. Illustration captions sit beneath the media, outside the crop.

### Inputs / Fields

Fields use the field ground, a one-pixel field border and the field radius. Minimum height is 47px; textareas start at 120px and resize vertically. Keyboard outlines have a two-pixel offset. Native user-invalid fields receive a two-pixel warm border. The disabled fieldset is dimmed until the handoff handler is ready.

### Navigation

The dark header has a brand lockup, compact text links and an outlined quote action. Current-page text has a blue indicator; hover lightens link text. At 992px the menu becomes a bordered dark dropdown controlled by a 46px toggle. Escape closes it and restores toggle focus; selecting a route or clicking outside also closes it.

### Quote Disclosure

An inset dark gradient strip contains the brand, short project invitation and blue action. Native details/summary exposes a two-column introduction and form; the layout stacks on mobile. Open state adds a fine separator and rotates the arrow. Handoff feedback uses a pale blue panel with readable dark text and a link to the prepared message.

### Process Sequence

Numbered circles and a thin connecting line express order. Outline icons accompany the wide-screen sequence; mobile keeps the number and text and removes the redundant icon.

### Consent Panel

A floating white panel with soft shadow contains equally available refusal and permission actions. It is hidden after a choice; the footer control reopens it. Controls stack as needed on small screens.

### Motion and Focus

Three product images form the hero sequence: S7-1200, LOGO!, and a real S7-1500 detail. The first two scenes use the customer reference's dark workshop, restrained blue light and product emphasis. Each image drifts gently over 24 seconds while active; eight-second rotation uses a 0.9-second crossfade. The headline and quote action stay fixed. The former SVG-console overlay is removed to let the hardware lead.

A compact, inset navy control bar contains the current photo name, count, previous/next controls, three direct selectors and pause/resume. Manual selection, keyboard arrows and horizontal swipe pause autoplay. Reduced motion disables automatic rotation, camera motion and spatial transitions while preserving manual photo choice. Hidden tabs, offscreen states and hover over controls suspend motion. A failed image is skipped. Without JavaScript the first image remains visible and controls stay hidden. Source text is absent from the hero; the footer's Fotocredits route retains the sources and licences.

On tablet the controller frame shifts right to keep identifying product faces clear of the headline. At 740px and below, copy, image and controls stack; full mobile product framing uses dedicated 960px variants. Focus is visible and all arrow/pause targets are 44px; tablet direct selectors are 32 by 44px, becoming 44 by 44px when stacked. This is scoped browser validation, not general accessibility certification.

### Google Review Proof

A small text link in the hero gives the sourced Google score and leads to the review section near the quote action. The cool-blue review field uses an editorial split: one prominent Eduardo quote and two shorter historical reviews, with no carousel or embedded widget. Reviewer names, original text, original Google source links, the earlier-service context and the checked date stay together. The layout stacks on mobile. Review scores use tabular numerals; stars are drawn SVG symbols in the existing blue. No portfolio or PLC-experience claim is inferred from these reviews.

## Do's and Don'ts

### Do:

- **Do** keep the navy and cool-light contrast, with blue used for meaningful emphasis.
- **Do** use self-hosted Manrope and preserve the complete heading at every breakpoint.
- **Do** keep content containers inset within full-width tonal sections.
- **Do** use inline SVG for technical icons and retain visible illustration disclosures.
- **Do** preserve keyboard focus, meaningful control heights and reduced-motion behaviour.

### Don't:

- **Don't** reuse the superseded emerald, electrician or energy visual identity.
- **Don't** turn illustrative imagery into claimed customer projects or personal portraits.
- **Don't** add invented ratings, metrics, credentials, decorative status signals or heading kickers.
- **Don't** add service-card lift shadows, gradient lettering or a Vanta/WebGL backdrop.
- **Don't** let a headline cross the controller's identifying face or remove spaces when reflowing copy.
