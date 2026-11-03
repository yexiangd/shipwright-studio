# Shadow Forge — build spec

## Concept
Shadow Forge is a free online box-shadow designer for front-end developers and designers. It turns the fiddly `box-shadow` syntax into sliders: drag offset, blur, spread, colour and opacity, and watch a live preview update instantly. It is for anyone styling cards, buttons or modals who wants a shadow that looks intentional, not guessed — then copies production-ready CSS in one click.

## Feature list (priority order)
1. Five sliders: horizontal offset (−50–50px), vertical offset (−50–50px), blur (0–100px), spread (−30–30px), opacity (0–100%).
2. Colour picker for the shadow colour, plus an inset/outset toggle.
3. Live preview card on a switchable light/dark backdrop, with adjustable corner radius (0–48px) and preview size (S/M/L).
4. Preset shadows: Soft, Lift, Deep, Neon (brass glow), Inset, Sharp — one click applies a full slider set.
5. Live CSS output (`box-shadow: …;`) with one-click Copy, plus a "Copied" confirmation state; a second copy button for the full element rule (background, radius, shadow).
6. Randomize button (seeded-free random within sane ranges) and Reset button.
7. "How it works" explainer: one line per parameter in plain language.
8. Footer credit: "Built by Shipwright Studio" + link back to /ideas/.

Out of scope for this version: multi-layer shadows, text-shadow mode, Tailwind class output, saved/sharable shadow links.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Devtool" → h1 "Shadow Forge" → quotable definition paragraph → two-column layout (controls card left, preview card right; stacked on mobile) → presets row → CSS output card with copy buttons → "How it works" card → footer.
States: default (Soft preset applied), slider drag (preview + CSS update live), inset on (preview shows inner shadow), copied (button text becomes "Copied ✓" for 2s), colour changed (output updates). Error state: none expected — all inputs are bounded sliders; colour input falls back to #000000 if empty.
Visual treatment: studio dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace; sliders use brass accent colour; preview backdrop toggles between light `#e8e4da` and dark `#14181e` so the shadow reads on both.

## Acceptance criteria
1. A user can drag any slider and see the preview shadow and the CSS output change together, live.
2. A user can click each of the 6 presets and get a visibly different, correct shadow (inset preset uses `inset`).
3. A user can copy the CSS string; the copied text equals the displayed `box-shadow` value.
4. The page has exactly one h1, a unique title/description, canonical link, WebApplication JSON-LD, and a link back to /ideas/.
5. Shadow-string code passes a node check: `buildShadow({x:0,y:10,blur:30,spread:0,color:'#000000',opacity:0.25,inset:false})` returns `0px 10px 30px 0px rgba(0, 0, 0, 0.25)`, and hex-to-rgba conversion handles 3-digit hex.
