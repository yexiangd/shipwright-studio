# Gradient Studio — build spec

## Concept
Gradient Studio is a free online tool for designing CSS gradients without a design app. It is for developers and designers who need a hero background, button, or card gradient fast: pick colours and stops, set the angle or radial shape, preview it large, and copy production-ready CSS. It is delightful because every control updates the preview and the code instantly, and one click copies the exact CSS you see.

## Feature list (priority order)
1. Large live preview area showing the current gradient at full card width.
2. Gradient type toggle: linear / radial, with an angle slider (0–360°) for linear and a shape note for radial.
3. Colour stops editor: 3 stops by default, add up to 5, remove down to 2; each stop has a colour picker, a position slider (0–100%), and a hex readout. Stops are sorted by position when rendering.
4. Preset gradients (Sunset, Ocean, Forest, Neon, Royal, Peach) that replace all stops and the angle in one click.
5. Random gradient button (random type, angle, and 2–4 harmonious stops).
6. CSS output block showing `background: linear-gradient(...)` / `radial-gradient(...)` exactly as rendered, plus a Copy CSS button with a "Copied" confirmation state.
7. Copy of the gradient as a shareable snippet: a second button copies just the gradient function value (without the `background:` wrapper).
8. Empty/error states: no error state is reachable — removing stops is clamped at 2, positions are clamped 0–100, and an invalid hex typed into a colour input falls back to the last valid colour.

Out of scope: drag-to-reorder stops on the preview bar, gradient animation, image export, saved palettes / accounts.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Developer tool" → h1 "Gradient Studio" → quotable definition paragraph → preview card (tall preview, gradient name label) → controls card (type toggle, angle slider with degree readout, presets row, random button) → stops card (one row per stop: colour swatch + native colour input + position slider + % readout + remove button; Add stop button) → CSS card (pre block + Copy CSS + Copy gradient only buttons + copied confirmation) → "How to use it" explainer (paste into any stylesheet) → footer "Built by Shipwright Studio" + link back to /ideas/.
States: active (every change re-renders preview + code), success (copied confirmation for 2 seconds), empty (not applicable — a default gradient always loads). Visual treatment: dark #0a0c0f page chrome so the gradient itself is the colour; Fraunces headings, brass #d2a24c accents; mobile: stop rows wrap, sliders full-width, preview stays tall.

## Acceptance criteria
- A user can change any stop colour, position, angle, or type and see the preview and CSS update immediately and identically.
- A user can apply a preset and get a complete, valid gradient (preview + CSS agree).
- A user can copy the full CSS declaration and the bare gradient value, with visible confirmation.
- A user cannot reduce stops below 2 or above 5, and stops render in position order even if edited out of order.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, and passes scripts/seo-check.py.
