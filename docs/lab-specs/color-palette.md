# Palette Lab — Build Spec

## Concept

Palette Lab is a free online color toolkit for designers and developers:
pick a seed color and instantly generate color harmonies, verify WCAG
contrast between any two colors, and export the result as production-ready
design tokens. Everything runs client-side in one page — no accounts, no
uploads, no waiting. Built for the "which of these two passes AA?" question
that comes up in every design review.

## Feature list

1. Seed input: native color picker + hex text field (validated, shorthand
   `#abc` expanded) + "Surprise me" random-seed button.
2. Six harmony modes: complementary, analogous, triadic, tetradic,
   monochromatic, split-complementary — segmented control; changing mode or
   seed regenerates the 5-swatch palette live.
3. Palette strip: five large swatches with live HEX / RGB / HSL readouts
   per swatch; clicking any swatch copies its HEX with a "Copied" toast.
4. Per-swatch relative luminance shown as a small value chip.
5. WCAG contrast checker: two color selectors ("Text" and "Background") that
   can be set by typing a hex, picking, or clicking the corresponding
   swatch's "set as" button; shows the contrast ratio (2 decimals) plus
   AA/AAA pass-fail badges for normal text and large text, with a live
   sample preview block.
6. Export panel: format tabs for CSS variables, Tailwind config (v3-style
   `extend.colors`), and JSON tokens; live code preview with syntax-safe
   escaping; Copy button and Download button (`palette.css` / `.js` / `.json`).
7. Palette naming: generated tokens use `primary`, `secondary`, `accent`,
   `neutral`, `highlight` names so exports read like a real design system.

Out of scope: extracting palettes from uploaded images, gradient builder,
color-blindness simulation, font pairing, share links.

## Design

Top to bottom: topbar (← Lab / Shipwright Studio brand), `h1` "Palette Lab",
quotable definition paragraph (GEO), seed controls row (color input, hex
field, random button, harmony-mode segmented control), palette strip (5
tall rounded swatch cards; each shows name, HEX, RGB, HSL, luminance chip,
copy-on-click), contrast checker section (two color wells + ratio readout +
AA/AAA badges + live sample text block), export section (format tabs, code
block, Copy / Download buttons), footer note.

Visual treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accent
for active states and badges. Swatches are tall (≥160px) with generous
radius; text on a swatch auto-selects black/white for its own legibility.
Mono font for hex codes and ratios. Generous whitespace between sections.

Mobile: controls wrap; palette strip stacks to 2 columns then 1; export
code block scrolls horizontally; segmented control wraps.

States: default (seed generates a complementary palette on load), invalid
hex (field shakes, error hint, palette keeps last valid seed), copied
(toast "Copied #RRGGBB"), contrast fail (red-tinted badge), export copied /
downloaded (toast).

## Acceptance criteria

- A user can set a seed color three ways (picker, hex input, random) and
  switching harmony modes regenerates five correct swatches (e.g. triadic
  swatches sit 120° apart on the hue wheel; verifiable via HSL readouts).
- Each swatch shows HEX/RGB/HSL; clicking a swatch copies its HEX and shows
  a toast.
- The contrast checker computes the WCAG ratio for any two colors and shows
  correct AA/AAA pass-fail badges for normal and large text (e.g. pure
  black on pure white = 21.00, all pass).
- Export produces valid CSS variables, a valid Tailwind `extend.colors`
  snippet, and valid JSON — copy and download both work.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies; no email
  addresses, API keys, or secrets in the file.
