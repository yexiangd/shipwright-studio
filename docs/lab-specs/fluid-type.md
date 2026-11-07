# Fluid Type Calc — build spec

## Concept
Fluid Type Calc is a free online tool that generates CSS `clamp()` expressions so text scales smoothly between two viewport widths instead of jumping between breakpoints. It is for front-end developers and designers who want responsive typography without media-query soup: type four numbers, see the type breathe at any screen width, and copy a production-ready `font-size` declaration. The delight is the live preview — drag a simulated-viewport slider and watch the heading grow and shrink in real time, with the exact computed pixel size shown at every width.

## Feature list (priority order)
1. Four numeric inputs (px): min font size, max font size, min viewport width, max viewport width. Defaults 16 → 24px over 360 → 1280px.
2. Fluid `clamp()` computation with correct slope/intercept math: `clamp(min, intercept px + slope vw, max)`, slope rounded to 3 decimals, intercept to 2.
3. Live preview pane: sample heading + body paragraph rendered at the fluid size for a simulated viewport width, adjustable via a slider (320–1440px, default 768px), with a readout of the exact computed size at that width.
4. CSS output card showing the `font-size: clamp(...);` declaration (with a comment noting the range), plus a one-click Copy button with a "Copied ✓" confirmation state for 2s.
5. Three presets — Body (16→20px), Heading (28→48px), Display (40→80px), all over 360→1280px — one click applies a full input set and marks the preset active.
6. Input validation with a clear error state: non-positive values, empty/non-numeric input, min ≥ max font size, or min ≥ max viewport width show an inline error message, highlight the offending fields, and disable the copy button until fixed.
7. "How it works" explainer: one line each for slope, intercept, and how `clamp()` pins the size at the ends.
8. Footer credit: "Built by Shipwright Studio" + link back to /ideas/.

Out of scope for this version: rem/em output toggle, multiple type-scale steps (h1–h6 scale), Tailwind/theme output, saved or shareable links, custom preview text editing.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Devtool" → h1 "Fluid Type Calc" → quotable definition paragraph → two-column layout (controls card left, preview card right; stacked on mobile) → presets row → CSS output card with copy button → "How it works" card → footer.
States: default (Body-ish defaults 16→24px applied, preview at 768px); input change (output, preview, and readout update live); preset click (inputs + output + preview update, preset button marked active); copied (button text becomes "Copied ✓" for 2s); error (red-tinted message under the inputs, offending fields get a red border, copy disabled, preview shows a muted "fix the values" note and output shows a placeholder); slider drag (preview text resizes live, readout updates).
Visual treatment: studio dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace; number inputs and the viewport slider use the brass accent colour; preview pane uses a slightly lighter panel so the fluid type reads clearly; the CSS output is shown in JetBrains Mono.
Mobile: single column, controls above preview, viewport slider full width, presets wrap.

## Acceptance criteria
1. A user can change any of the four inputs and see the `clamp()` output, the preview text size, and the computed-size readout update together, live.
2. A user can drag the simulated-viewport slider from 320 to 1440px and watch the preview heading scale smoothly, with the readout matching the fluid formula at that width.
3. A user can click each of the 3 presets and get the documented input values applied, with the output recomputed.
4. Entering an invalid range (e.g. min font ≥ max font, or a zero/negative value) shows a clear error, highlights the bad fields, and disables copying until fixed.
5. The page has exactly one h1, a unique title/description, canonical link, WebApplication JSON-LD, a link back to /ideas/, and no email address or `mailto:` anywhere.
6. Node check passes: `computeClamp({minSize:16, maxSize:24, minVp:360, maxVp:1280})` returns slope ≈ 0.87vw and intercept ≈ 12.87px; evaluated size equals 16px at 360px viewport and 24px at 1280px; midpoint is linear; invalid inputs are rejected.
