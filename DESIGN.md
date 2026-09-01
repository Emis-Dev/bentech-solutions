---
name: BenTech Solutions
description: Directe, betrouwbare elektrische dienstverlening in een donker navy en emerald digitaal merklandschap.
colors:
  midnight: "#050a15"
  navy-surface: "#0a1124"
  navy-card: "#0d1629"
  navy-card-hover: "#111e3a"
  emerald: "#00c875"
  emerald-light: "#33d491"
  emerald-dark: "#009959"
  text-main: "#e8edf5"
  text-muted: "#8896ab"
  text-subtle: "#576b83"
  danger: "#ef4444"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.8rem, 6.1vw, 5.55rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  button: "8px"
  card: "16px"
  media: "22px 22px 96px 22px"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.85rem"
  md: "1.4rem"
  lg: "2rem"
  section: "clamp(4.5rem, 8vw, 7.25rem)"
components:
  button-primary:
    backgroundColor: "{colors.emerald}"
    textColor: "#041009"
    rounded: "{rounded.button}"
    padding: "0.7rem 1.4rem"
  button-outline:
    backgroundColor: "rgba(13, 22, 41, 0.8)"
    textColor: "{colors.text-main}"
    rounded: "{rounded.button}"
    padding: "0.7rem 1.4rem"
  card:
    backgroundColor: "{colors.navy-card}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.card}"
---

# Design System: BenTech Solutions

## Overview

**Creative North Star: "The Green Circuit Editorial"**

BenTech combines a technical midnight-navy foundation with a deliberately scarce emerald signal color. The visual world should feel competent, direct and local: polished enough for planned energy projects, but fast and legible enough for visitors who need an electrician now.

The dedicated service pages extend the incumbent brand rather than redesign it. Their editorial split layouts pair concise decision-oriented copy with one strong image, followed by structured proof, process, audience, related-service and quote sections. The decorative grid explored during implementation was removed because it competed with the content. Detector warnings about the incumbent Plus Jakarta Sans family were consciously accepted to preserve the established BenTech brand world.

**Key Characteristics:**

- Dark navy tonal layers with emerald used for action, orientation and focus.
- Large, compact headlines balanced by calm, readable body copy.
- Editorial two-column layouts that collapse cleanly to one column.
- Direct contact paths by phone, WhatsApp and quote form.
- Factual, situation-led copy without unverified commercial claims.

## Colors

The palette is a tinted midnight hierarchy with one energetic emerald accent; surfaces carry depth while text remains cool and restrained.

### Primary

- **Circuit Emerald** (`#00c875`): Primary calls to action, active navigation, icons, rules and focus rings.
- **Signal Emerald** (`#33d491`): Hover states and highlighted labels on dark surfaces.
- **Deep Emerald** (`#009959`): Darker supporting state; do not use as a second competing accent.

### Neutral

- **Midnight Canvas** (`#050a15`): Page background and deepest visual field.
- **Navy Section** (`#0a1124`): Alternating sections and quieter grouped content.
- **Navy Card** (`#0d1629`): Cards, forms and framed surfaces.
- **Lifted Navy** (`#111e3a`): Hovered or subtly elevated cards.
- **Cool White** (`#e8edf5`): Primary headings and high-priority text.
- **Steel Text** (`#8896ab`): Secondary copy and supporting descriptions.
- **Deep Steel** (`#576b83`): Low-priority metadata only.

**The Signal Rule.** Emerald identifies action or orientation; it must not become a decorative wash across every surface.

## Typography

**Display Font:** Plus Jakarta Sans with system UI fallbacks  
**Body Font:** Plus Jakarta Sans with system UI fallbacks

**Character:** Contemporary and technical without becoming industrial. Weight, scale and spacing create hierarchy; the service pages do not introduce another font.

### Hierarchy

- **Display** (700, `clamp(2.8rem, 6.1vw, 5.55rem)`, `0.98`): Service-page H1, normally capped near 12 characters per line.
- **Headline** (600–700, responsive, `1.2`): Section titles and decision points.
- **Body** (400, `1rem`, `1.65`): Explanatory copy, generally no wider than `65ch`.
- **Label** (700, about `0.85rem`): Kicker, section labels and compact signals.

**The One-Family Rule.** Preserve Plus Jakarta Sans across headings, controls and body copy; the detector font warning is an accepted incumbent-brand exception.

## Layout

The base container is `90%` wide with a `1200px` maximum. Dedicated service pages use editorial split grids: a near-even hero, a narrow context column beside a wider content column, and the same relationship for quote and FAQ sections. Section rhythm is generous (`clamp(4.5rem, 8vw, 7.25rem)`) and bounded by subtle borders rather than decorative separators.

At `992px` and below, editorial grids become a single column and sticky quote copy returns to normal flow. At `768px` and below, primary actions become full-width, process steps become a vertical sequence, hero media returns to a portrait crop, and the persistent call/WhatsApp bar owns the mobile conversion path. Content must remain usable above the sticky bar.

The shipped public routes are `/laadpalen/`, `/thuisbatterijen/` and `/zonnepanelen/`. They share `/style.css`, `/service-pages.css`, `/main.js`, `/consent.js` and `/assets/`. Nested pages must always use root-relative references so routes resolve identically in local QA and on Cloudflare Pages.

## Elevation & Depth

Depth is restrained and structural: tonal surface changes, one-pixel translucent borders and soft dark shadows separate important layers. The large hero photograph and quote form may carry deeper ambient shadows; routine sections remain flat. Emerald glow is reserved for interaction feedback.

- **Card shadow** (`0 8px 24px -8px rgba(0, 0, 0, 0.5)`): General elevated cards.
- **Hero-media shadow** (`20px 28px 70px -28px rgba(0, 0, 0, 0.8)`): Large service image only.
- **Form shadow** (`12px 18px 52px -30px rgba(0, 0, 0, 0.8)`): Quote form separation.

**The Flat-By-Default Rule.** Use shadow only when hierarchy or interaction requires it; do not turn every card into a floating tile.

## Shapes

Buttons use an `8px` radius, cards and forms generally use `16px`, and pills are reserved for compact statuses or intentional rounded controls. Service hero images use an asymmetric cropped frame (`22px 22px 96px 22px`, reduced responsively) as the signature silhouette. Thin translucent borders keep shapes legible without bright outlines.

## Components

### Buttons

- **Primary:** Circuit Emerald background, near-black text, `8px` radius and a minimum touch-friendly height in hero contexts.
- **Outline:** Translucent navy background with a subtle border; hover shifts the border and surface toward emerald.
- **WhatsApp:** The established WhatsApp green gradient is functional channel recognition, not a general brand color.
- **Focus:** Every button receives a visible `2px` emerald `:focus-visible` outline and offset.

### Cards / Containers

- Use navy-card backgrounds, subtle borders and `16px` corners.
- Editorial sections should not be reduced to repetitive equal card grids when hierarchy can be expressed through layout and type.
- Related-service links remain compact and navigational rather than promotional tiles.

### Inputs / Fields

- Quote forms sit on a navy-card surface with a visible boundary and comfortable internal padding.
- Preserve semantic labels, clear required states and the shared emerald keyboard focus treatment.
- Form behavior and service preselection must remain consistent across all three service pages.

### Navigation

- Desktop navigation retains the established header and services dropdown; the current route is marked in emerald.
- Mobile navigation and the bottom sticky bar remain shared site behavior.
- Telephone, WhatsApp and quote actions must remain immediately distinguishable.

### Service Hero

- Pair a bounded headline and short factual lead with one dominant image and a small explanatory caption.
- `/laadpalen/` uses the authentic Yassir installation photograph and may identify it as such.
- Battery and solar imagery is illustrative and must be captioned as illustrative, never presented as a completed BenTech case.

## Do's and Don'ts

### Do:

- **Do** preserve the navy/emerald palette, Plus Jakarta Sans and existing shared shell.
- **Do** write from the visitor's situation and explain that advice follows an assessment of their installation and needs.
- **Do** keep new service imagery explicitly classified as authentic or illustrative.
- **Do** retain semantic HTML, visible keyboard focus, readable contrast and `prefers-reduced-motion` support.
- **Do** keep Google Ads and other marketing tracking consent-gated through `/consent.js`.
- **Do** use root-relative assets and shared files on every nested route.

### Don't:

- **Don't** invent brands, prices, subsidies, guarantees, certifications, product capacities, case studies or scope commitments.
- **Don't** describe generic battery or solar artwork as BenTech's own installation work.
- **Don't** reintroduce the removed decorative grid or let background effects compete with conversion content.
- **Don't** add a new font merely to satisfy an automated detector; the incumbent Plus Jakarta Sans choice is intentional.
- **Don't** bypass consent for call-conversion or other marketing scripts.
