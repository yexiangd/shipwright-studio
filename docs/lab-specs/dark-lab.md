# Dark Mode Lab — Build Spec

- **Slug:** `dark-lab`
- **Title:** Dark Mode Lab
- **URL:** `/lab/dark-lab/`
- **Seed tagline:** "Preview any palette in dark mode before you ship it."

## Concept

Dark Mode Lab is a free online tool that lets designers and developers preview any colour palette in dark mode before shipping it. Paste or pick a palette, and the page instantly renders a realistic sample UI (cards, buttons, text, forms) in that palette, with WCAG contrast ratios for every text/background pairing. It is for anyone who has ever shipped a dark theme that looked great in Figma and unreadable in production.

## Feature list (MVP, in priority order)

1. **Palette input** — 5 colour slots (background, surface, text, muted text, accent), each a native colour input + hex text field; presets: Shipwright (dark `#0a0c0f` / brass `#d2a24c`), Midnight Blue, Forest, Plum, Slate.
2. **Live preview** — a sample UI rendered in the chosen palette: heading, paragraph, primary/secondary buttons, a card, a form field, a badge, a link. Updates instantly on any colour change.
3. **Contrast checker** — for each text colour vs each background/surface, show ratio (e.g. 12.4:1) and WCAG AA / AAA pass-fail badges (normal text ≥4.5 AA, ≥7 AAA; large text ≥3 AA).
4. **Auto-suggest fix** — when a pairing fails AA, offer a one-click "Fix" that lightens/darkens the text colour just enough to pass AA (recompute luminance, step lightness until ratio ≥ 4.5).
5. **Copy CSS variables** — one click copies a `:root` block with `--bg`, `--surface`, `--text`, `--muted`, `--accent` custom properties.
6. **Random palette** — "Surprise me" generates a harmonious dark palette (dark bg, light text, one accent hue).
7. **Invert / light-mode toggle** — flip the preview to light mode using the same palette inverted, so the palette can be judged both ways.
8. **Reset** — restore the Shipwright preset.

Out of scope: saving palettes to an account, exporting PNG, full site theming, colour-blindness simulation.

## Design

- Page structure top to bottom: nav (`← Lab` / `Shipwright Studio`), eyebrow "Lab · Extension prototype", `h1` "Dark Mode Lab", definition paragraph ("Dark Mode Lab is a free online tool that ..."), palette editor card (5 slots + presets + random/reset), live preview card, contrast results table, CSS export card, footer ("Built by Shipwright Studio" + link back to `/ideas/`).
- Visual treatment: studio dark aesthetic (`#0a0c0f`, Fraunces headings, brass `#d2a24c`); the preview card itself is the canvas — it re-skins live with the chosen palette.
- States: empty — never (preset loaded by default); active — preview updates on every input; success — "Copied" feedback on the copy button; error — invalid hex shows inline "Not a valid hex colour" and keeps the last good value.
- Mobile: editor slots stack 1 column; preview stacks below editor; contrast table scrolls horizontally.

## Acceptance criteria

1. A user can change any of the 5 colours and the preview UI re-skins instantly.
2. The page shows a correct WCAG contrast ratio and AA/AAA badge for text vs background and text vs surface (verified: `#e8e4da` on `#0a0c0f` ≈ 15.4:1, AAA — corrected from 15.9:1 on 2026-11-28 after a node check of the WCAG formula returned 15.42:1).
3. A failing pairing offers a Fix button that adjusts the text colour until the ratio passes AA (≥ 4.5).
4. "Copy CSS" puts a valid `:root` custom-properties block on the clipboard.
5. The page has exactly one `h1`, a unique title/description, canonical link, definition paragraph, and `WebApplication` JSON-LD; no external JS dependencies; no email addresses or secrets.

## Implementation notes

- Contrast: relative luminance per WCAG 2.1 (`L = 0.2126R + 0.7152G + 0.0722B` on linearised sRGB), ratio `(L1 + 0.05) / (L2 + 0.05)`.
- Fix algorithm: convert text colour to HSL, step lightness ±1% toward the direction that raises the ratio, stop at ratio ≥ 4.5 or lightness bounds (5% / 95%).
- Random palette: pick a hue 0–360, bg `hsl(h, 25%, 7%)`, surface `hsl(h, 20%, 13%)`, text `hsl(h, 15%, 88%)`, muted `hsl(h, 10%, 62%)`, accent `hsl(h, 70%, 60%)`.
- Node-check the pure functions: luminance/ratio (known vectors), fix function (a failing pair becomes ≥ 4.5), CSS export string, random palette invariants (bg luminance < text luminance, accent distinct from bg).
