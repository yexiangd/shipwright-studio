# Aspect Ratio Calc — build spec

- Slug: `aspect-ratio`
- Idea: idea-054, "Aspect Ratio Calc", category devtool
- Status: doing → done on ship
- Page: `lab/aspect-ratio/index.html`

## Concept

Aspect Ratio Calc is a free online aspect ratio calculator that fits any dimensions to any ratio — type a width, get the height, or type a height and get the width, at 16:9, 4:3, 1:1, 21:9, 3:2, 9:16, 2.39:1, or any custom ratio. It is for developers, designers, and video/photo editors who need a resized frame that stays true to its ratio, whether that is a 1920×1080 hero image, a 9:16 phone story, or a 2.39:1 cinema still. It is delightful because the answer appears as you type, a live preview box shows the shape of the ratio, and one click loads any common resolution or copies the result.

## Feature list (MVP, priority order)

1. **Two-way live dimension conversion** — a width input and a height input; typing in either computes the other instantly at the current ratio. Results are rounded to the nearest whole pixel.
2. **Ratio preset chips** — 16:9, 4:3, 1:1, 21:9, 3:2, 9:16, 2.39:1; clicking one sets the ratio and re-computes the other dimension from the last-edited field. The active preset is highlighted.
3. **Custom ratio** — a "Custom" chip plus two number inputs (custom width : custom height); any positive numbers are accepted, e.g. 2.39 : 1. Selecting a preset hides the custom inputs; selecting Custom shows them.
4. **Live visual preview** — a brass-outlined box inside a fixed stage that renders at the current ratio (scaled to fit), with the current dimensions labelled on it. It updates on every keystroke and every ratio change.
5. **Swap button** — swaps the width and height values (and the ratio orientation when a preset is active, e.g. 16:9 becomes 9:16, falling back to Custom if the flipped ratio has no preset). The preview and result update immediately.
6. **Copy result button** — copies `1920 × 1080` (the current dimensions) to the clipboard (Clipboard API with a textarea fallback); the button shows "Copied ✓" for 2 seconds. `Enter` in either dimension field also copies the result.
7. **Common resolutions table** — a compact table of well-known resolutions for the selected ratio (at least 5 per ratio), each row clickable to load that resolution into the converter; the row matching the current dimensions is highlighted. When Custom is active, the table shows resolutions derived from the custom ratio instead (widths 1920, 1280, 800, 640, 3840).
8. **Ratio readout + localStorage persistence** — a line under the converter showing the simplified ratio of the current dimensions (via GCD, e.g. 1920×1080 → "16:9") and, when the dimensions do not simplify to the selected ratio, the nearest named ratio. The selected ratio and dimensions are saved on change and restored on load; invalid stored values fall back to 16:9 and 1920×1080.

Out of scope for this version: image upload or actual image resizing, batch conversion / paste-a-list, CSS snippet generation, video-specific frame rates or pixel aspect ratios, theme switching, any server or API call.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as px-rem).
2. Eyebrow: `Lab — Dev Tools`.
3. `h1`: Aspect Ratio Calc.
4. Definition paragraph (`.define`): "Aspect Ratio Calc is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Converter card (`.card`, main): a two-column row — width input on the left, a ⇄ swap button in the middle, height input on the right — with a small ratio readout line beneath ("1920 × 1080 simplifies to 16:9"). Below it, ratio preset chips (16:9, 4:3, 1:1, 21:9, 3:2, 9:16, 2.39:1, Custom); when Custom is active, two small number inputs appear ("Custom ratio — width : height"). An inline error line (muted red) appears for zero, negative, or non-numeric input and the last valid value is kept. A "Copy result" button row sits at the bottom of the card with a status note.
6. Preview card: a fixed-height stage containing a brass-outlined box sized to the current ratio (scaled to fit the stage), centred, with the current dimensions printed inside (or just below when the box is too small). A caption under the stage states the ratio, e.g. "Preview — 16:9 (1.78 : 1)".
7. Common-resolutions card: a compact table — columns Width, Height, Label (e.g. "Full HD") — rows for the selected ratio; each row is a button that loads those dimensions; the row matching the current dimensions is highlighted.
8. "How it works" card: 3 short bullets — the formula (`height = width × ratio height ÷ ratio width`, and vice versa), how the ratio is simplified with the greatest common divisor, and the rounding rule (nearest whole pixel; 2.39:1 is stored as 239:100).
9. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty**: width starts at 1920 and height at 1080 — never blank; clearing a field clears the other and shows a hint ("Enter a dimension"); the preview collapses to a placeholder outline with the text "Enter a dimension to preview".
- **Active**: typing in either field re-computes the other, the preview, the ratio readout, and the highlighted table row on every keystroke. Changing the ratio re-computes the other dimension from the last-edited field and rebuilds the table and preview; the active preset chip is highlighted (or Custom, if the ratio is custom).
- **Success**: copy actions show "Copied ✓" on the button for 2 s and a status note ("Copied 1920 × 1080."); loading a table row flashes the converter briefly (row highlight moves).
- **Error**: non-numeric, zero, or negative dimension or custom-ratio input shows an inline error ("Dimensions must be positive numbers — keeping 1920 × 1080.") and keeps the last valid values; clipboard failure shows "Copy failed — select the value manually".

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings, system sans for UI labels, JetBrains Mono for inputs, values, table, and ratio readouts; generous whitespace, max-width 960px, centred. Dimension inputs use large mono numbers; the swap button is a brass ⇄ glyph; the preview box is a brass 1px outline filled with a subtle brass tint.

Mobile: single column — dimension inputs stack vertically with the swap button rotated 90°, preset chips wrap, the preview stage shrinks to fit, table scrolls horizontally if needed (fits at 360px via compact padding).

## Acceptance criteria

1. A user can type a width (e.g. 1280 at 16:9) and see the correct height instantly (720), and typing a height converts back to width (720 at 4:3 → 960).
2. A user can pick any preset ratio or enter a custom ratio (e.g. 2.39:1) and every value, the preview box, and the resolutions table update immediately; the ratio and dimensions persist across reloads via localStorage.
3. A user can click the swap button and see width and height exchanged (and the ratio flipped), and click "Copy result" and get a "Copied ✓" confirmation with `WIDTH × HEIGHT` on the clipboard.
4. The preview box visibly changes shape when the ratio changes (wide for 21:9, tall for 9:16, square for 1:1), and the resolutions table lists at least 5 resolutions matching the selected ratio, each loadable with one click.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (heightFromWidth, widthFromHeight, simplifyRatio, nearestNamedRatio, roundPx, validDimension, parseDimension, PRESET_RATIOS, commonResolutions) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
- Rounding: dimensions round to the nearest whole pixel (`Math.round`); 2.39:1 is stored internally as 239:100 so the math stays exact.
- Standard resolutions in the table are the marketed sizes; the 2.39:1 scope rows (4096×1716, 2048×858, 1920×804) are the real DCI scope standards and sit within rounding of 2.39:1. The 21:9 rows use exact-ratio sizes instead of the marketed ultrawide panels (2560×1080, 3440×1440), because those panels are actually ~2.37:1 — closer to 2.39:1 than to 21:9 — and would make the readout contradict the selected ratio. Loading a table row sets the dimensions verbatim; re-typing a width re-computes to the exact ratio.
- GCD simplification: 1920×1080 → 16:9; a dimension pair that does not simplify to a named ratio shows its simplified form plus the nearest named ratio by decimal closeness.
