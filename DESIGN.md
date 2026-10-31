---
name: BenTech Solutions
description: Directe, betrouwbare elektrische dienstverlening en hernieuwbare energie in een helder, redactioneel licht merklandschap.
colors:
  canvas: "#f8fafc"
  surface: "#ffffff"
  surface-secondary: "#f1f5f9"
  surface-card: "#ffffff"
  surface-card-hover: "#f8fafc"
  border-hairline: "rgba(15, 23, 42, 0.08)"
  border-subtle: "#e2e8f0"
  border-emerald: "rgba(4, 120, 87, 0.25)"
  emerald: "#047857"
  emerald-vibrant: "#059669"
  emerald-light: "#10b981"
  emerald-tint: "#ecfdf5"
  emerald-dark: "#065f46"
  proof-rail-surface: "#ffffff"
  review-star: "#f59e0b"
  text-primary: "#090d16"
  text-secondary: "#475569"
  text-muted: "#64748b"
  danger: "#dc2626"
  danger-dark: "#991b1b"
  danger-deep: "#7f1d1d"
  danger-tint: "#fef2f2"
  whatsapp: "#25d366"
  klimaatplus: "#ea580c"
  batteryplus: "#15803d"
  serviceplus: "#0284c7"
  solarplus: "#d97706"
  border-input: "#cbd5e1"
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
  caption:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "6px"
  button: "8px"
  md: "10px"
  lg: "14px"
  card: "16px"
  dialog: "18px"
  media: "22px 22px 96px 22px"
  proof-rail: "8px"
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
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
  google-proof-rail:
    backgroundColor: "{colors.proof-rail-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.proof-rail}"
---

# Design System: BenTech Solutions

## Overview

**Creative North Star: "The Architectural Energy Atelier"**

BenTech Solutions transitions from a dark-mode tech look to an authoritative, editorial light design architecture. The new visual world radiates professional reliability, crisp legibility, and architectural clarity: clean white and slate surfaces, high-contrast ink-slate typography, and a purposeful botanical circuit emerald accent.

This direction deliberately strips away common "AI slop" tells:
- **No dark glowing halos:** Replaces neon blur rings with natural, multi-layer diffuse ambient elevation.
- **No simulated liveness gimmicks:** Replaces decorative pulsing dots with calm, high-contrast operational status tags.
- **No decorative kickers:** Eliminates redundant label badges above headings, letting typography speak with genuine hierarchical weight.
- **No muddy contrast:** Establishes rigorous WCAG AAA contrast for body typography (`#090d16` on white, secondary `#475569`), ensuring effortless readability under all ambient lighting conditions.

The signature **Google Proof Rail** is re-anchored as a pristine architectural white console with a hairline emerald anchor rule, crisp review typography, authentic star ratings, and direct links to the official Google Business Profile.

## Colors

The light palette pairs luminous neutral foundations with a commanding botanical emerald signal.

### Primary
- **Architectural Emerald** (`#047857`): Primary interactive elements, active route states, key structural rules, and focus outlines. Calibrated to deliver >5.1:1 contrast on white surfaces.
- **Vibrant Emerald** (`#059669`): Hover states and micro-interaction accents.
- **Emerald Tint** (`#ecfdf5`): Soft pill backgrounds, active dropdown states, and badge surfaces.
- **Deep Emerald** (`#065f46`): Active button presses and high-emphasis boundaries.

### Neutral
- **Canvas** (`#f8fafc`): Cool architectural slate-tinted canvas that prevents screen glare while feeling pure and modern.
- **Pure White Surface** (`#ffffff`): Elevated cards, modals, navigation headers, and proof console.
- **Section Secondary** (`#f1f5f9`): Alternating section rhythm and grouped technical panels.
- **Obsidian Text** (`#090d16`): Primary headings and essential body text with maximum optical contrast.
- **Slate Body** (`#475569`): High-legibility body copy and descriptions (exceeds WCAG AAA).
- **Muted Slate** (`#64748b`): Secondary labels, timestamps, and supporting metadata.
- **Hairline Border** (`rgba(15, 23, 42, 0.08)`): Crisp structural separation between cards and sections.
- **Border Subtle** (`#e2e8f0`): Definite component borders and dividers.

### Secondary & Semantic
- **Review Amber** (`#f59e0b`): Official Google review star rating symbols only; never used decoratively elsewhere.
- **Urgent Red** (`#dc2626`): 24/7 emergency electrical breakdown indicators and immediate-call triggers.
- **Urgent Tint** (`#fef2f2`): Soft background tint for emergency callouts.

**The Signal Rule:** Emerald is reserved for intentional action, verification, and orientation. It never floods the page as a decorative wash.

## Typography

**Display & Body Font:** Plus Jakarta Sans with clean system fallbacks (`system-ui, -apple-system, sans-serif`).

The typography uses tight tracking on large headings, balanced proportional line heights, and relaxed, readable prose measure (capped near `65ch`).

### Hierarchy
- **Display** (700, `clamp(2.8rem, 6.1vw, 5.55rem)`, line-height `0.98`, tracking `-0.04em`): Impactful service H1s, limited to concise editorial phrases.
- **Headline** (600–700, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height `1.2`): Section headers and primary decision gates.
- **Body** (400, `1rem`, line-height `1.65`): Informative Dutch prose with high-contrast slate coloring.
- **Label** (700, `0.85rem`, line-height `1.2`): Operational badges, table headers, and form labels.

**No Heading Kicker Rule:** Headings carry their own weight without decorative kicker tags above them.

## Layout

- **Container:** Maximum width `1200px` with responsive `90%` fluid padding.
- **Section Spacing:** Generous breathing room (`clamp(4.5rem, 8vw, 7.25rem)`) separated by hairline architectural rules rather than heavy dividers.
- **Editorial Split Grids:** Balanced two-column compositions (context column + content column) that collapse cleanly to single-column flow below `992px`.
- **Google Proof Rail:** Horizontal three-region trust bar on desktop (Rating Left · Swipeable Review Excerpts Center · Maps Link Right); stacks gracefully on mobile (`<=768px`).
- **Mobile First Conversion:** Persistent bottom emergency/quote bar on mobile screens with dedicated touch targets.

## Elevation & Depth

Depth in this light architecture is tactile and structural:
- **Hairline Boundaries:** Crisp 1px borders (`rgba(15, 23, 42, 0.08)`) give cards and headers definite shape without visual clutter.
- **Diffuse Ambient Elevation:** Multi-layered soft shadows replicate natural daylight rather than artificial dark glows.
  - Card Shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 10px 24px -4px rgba(15, 23, 42, 0.06)`
  - Elevated Form / Hero Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 20px 40px -6px rgba(15, 23, 42, 0.08)`
  - Hover Transition: Subtle lift (`translateY(-2px)`) with expanded diffuse ambient shadow.
- **Zero Glow Policy:** No colored blurred halos (`box-shadow: 0 0 25px rgba(...)`) or neon backdrops.

## Shapes

- **Buttons:** Clean `8px` radius for modern technical precision.
- **Cards & Containers:** `16px` radius with crisp interior padding (`1.75rem` to `2.5rem`).
- **Service Hero Media:** Asymmetric signature crop (`22px 22px 96px 22px`) providing bespoke editorial identity without generic rounded rectangles.
- **Proof Rail Console:** Balanced `8px` radius with top emerald accent rule.
- **Pills:** `9999px` reserved strictly for status chips and filter tags.

## Components

### Buttons
- **Primary Action:** Solid Architectural Emerald (`#047857`), crisp white text (`#ffffff`), `8px` radius, subtle depth. Hover shifts to `#059669`.
- **Outline / Secondary:** Pure white surface, subtle slate border (`#e2e8f0`), Obsidian text (`#090d16`). Hover tints background to Emerald Tint (`#ecfdf5`).
- **WhatsApp Direct:** Clean WhatsApp channel branding (`#25D366`) with white text; strictly for functional channel recognition.
- **Focus States:** High-visibility `2px solid #047857` outline with `2px` offset.

### Navigation Header
- Crisp semi-opaque white background (`rgba(255, 255, 255, 0.96)`) with `backdrop-filter: blur(12px)`.
- Hairline bottom border (`#e2e8f0`).
- Slate navigation links with emerald indicator on active route.

### Google Proof Rail
- Luminous white container surface with subtle ambient shadow and 1px hairline border.
- Left block: Authentic Google rating (`4,9/5`) with 5 amber stars (`#f59e0b`) and review count.
- Center block: Manually swipeable verified review cards with clear quote typography and attribution. No autoplay.
- Right block: Direct link to the official Google Business Profile map listing.

### Forms & Inputs
- Crisp white fields on subtle section backgrounds, with `1px solid #cbd5e1` borders.
- Active focus state: Clean emerald border (`#047857`) with `0 0 0 3px rgba(4, 120, 87, 0.15)` focus ring.
- Explicit validation states: Urgent Red (`#dc2626`) for error messaging.

## Do's and Don'ts

### Do:
- **Do** maintain high-contrast legibility: dark obsidian text on clean light surfaces.
- **Do** use subtle, multi-layered diffuse ambient shadows instead of heavy dark blots.
- **Do** keep emerald as a sharp, deliberate signal for calls-to-action and active states.
- **Do** respect the established Dutch copy and authentic Belgian electrical service context.
- **Do** maintain the manual-only interaction for the Google Proof Rail (no autoplay).
- **Do** preserve semantic landmarks, visible keyboard focus rings, and WCAG AA contrast throughout.

### Don't:
- **Don't** reintroduce dark background surfaces or saturated midnight layers.
- **Don't** use colored neon glowing box-shadows or text-shadows.
- **Don't** add decorative pulsing dots or artificial status animations.
- **Don't** place kickers or eyebrow tags above headings.
- **Don't** use low-contrast washed-out grays for secondary copy.
- **Don't** invent fake credentials, partner logos, certifications, or fictitious founder identities.
