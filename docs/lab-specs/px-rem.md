# PX ⇄ REM Converter — build spec

- Slug: `px-rem`
- Idea: px-rem, "PX ⇄ REM", priority from ideas.json
- Status: doing → done on ship
- Page: `lab/px-rem/index.html`

## Concept

PX ⇄ REM Converter is a free online tool that converts pixel values to rem units and back, at any root font size — the two-way translator every front-end developer reaches for when a design file says 20px and the stylesheet speaks rem. It is for developers and designers who want a precise, copy-ready value in one keystroke, without opening a calculator or a docs tab. It is delightful because it answers instantly as you type, remembers your base size, and hands you a paste-ready CSS declaration in the same breath.

## Feature list (MVP, priority order)

1. **Two-way live conversion** — a px input and a rem input; typing in either updates the other instantly at the current base size. Values are rounded to at most 4 decimal places, with trailing zeros trimmed.
2. **Configurable base size** — a base (root font-size) input in px, default 16, valid range 1–100. Changing it re-computes both conversions immediately.
3. **Base-size presets** — chips for 14, 16, 18, 20 px; clicking one sets the base and re-computes. The active preset is highlighted.
4. **Common-value table** — a quick table of px 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64 with their rem equivalents at the current base; the table rebuilds when the base changes.
5. **Copy to clipboard** — every rem value in the table and the main result row has a click-to-copy action (Clipboard API with a textarea fallback); the clicked value shows a "Copied ✓" state for 2 seconds. Copy buttons in the result row copy the rem value and the CSS snippet respectively.
6. **Live CSS snippet generator** — a code block that updates as you type: `font-size: 1.25rem; /* 20px */` (or `/* 20px at 16px base */` when the base is not 16), plus a property picker (font-size / width / padding / margin / line-height) so the snippet matches the CSS the user actually needs. One click copies the snippet.
7. **Keyboard-friendly inputs** — inputs are real `<input type="number">` fields with labels; arrow keys step values; `Tab` order is px → rem → base → presets → snippet; `Enter` in the px field copies the rem result.
8. **localStorage persistence** — the base size is saved on change and restored on load; if the stored value is missing or invalid, the default 16 is used. Nothing else is stored.

Out of scope for this version: batch conversion / paste-a-list, em conversion, CSS file parsing, a custom property picker beyond the five listed properties, theme switching, any server or API call.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as quote-generator).
2. Eyebrow: `Lab — Dev Tools`.
3. `h1`: PX ⇄ REM Converter.
4. Definition paragraph (`.define`): "PX ⇄ REM Converter is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Converter card (`.card`, main): a two-column converter row — px input on the left, a ⇄ swap indicator in the middle, rem result/input on the right — with a small "at 16px base" line beneath; below it, a base-size row: number input labelled "Root font-size (base)" with `px` suffix, plus preset chips 14 / 16 / 18 / 20. Invalid base input shows an inline error in muted red and keeps the last valid base.
6. Snippet card: property picker chips (font-size, width, padding, margin, line-height), a monospace code block showing the live declaration, and a "Copy snippet" button with success state.
7. Common-values card: a compact table — two columns (px, rem), rows for 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64. Each rem cell is a button that copies its value; the row matching the current px input is highlighted.
8. "How it works" card: 3 short bullets — the formula (`rem = px ÷ base`, `px = rem × base`), why rem scales with the user's browser font size, and the rounding rule (max 4 decimal places, trailing zeros trimmed).
9. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty**: px input starts at 16 and rem at 1 — never blank; clearing the px field clears the rem field and shows a hint ("Enter a pixel value").
- **Active**: typing in either field re-computes the other, the snippet, and the highlighted table row on every keystroke. Changing the base re-computes everything and re-highlights the active preset (or none, if the base is a custom value).
- **Success**: copy actions show "Copied ✓" on the clicked control for 2 s and a status note; the snippet copy button shows the same.
- **Error**: non-numeric, zero, negative, or out-of-range base input shows "Base must be between 1 and 100 px" and keeps the last valid base; clipboard failure shows "Copy failed — select the value manually".

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings, system sans for UI labels, JetBrains Mono for inputs, values, table, and code; generous whitespace, max-width 960px, centred. The converter row uses large mono numbers; the swap glyph is brass.

Mobile: single column — converter inputs stack vertically with the swap glyph rotated 90°, preset chips wrap, table scrolls horizontally if needed (fits at 360px via compact padding).

## Acceptance criteria

1. A user can type a px value and see the correct rem value instantly (e.g. 20px → 1.25rem at base 16), and typing a rem value converts back to px.
2. A user can change the base size (input or preset) and every value, the table, and the snippet update immediately; the base persists across reloads via localStorage.
3. A user can click any table rem value or the copy buttons and get a "Copied ✓" confirmation with the exact value on the clipboard.
4. The snippet block always shows a valid CSS declaration matching the current px value, base, and chosen property.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (pxToRem, remToPx, formatRem, buildSnippet, validBase, parseBase, COMMON_PX) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
- Rounding: round to 4 decimal places (`Math.round(x * 10000) / 10000`) then strip trailing zeros via `String()` — 20px at 16 = 1.25rem, 15px at 16 = 0.9375rem, 1px at 16 = 0.0625rem.
- The snippet comment always states the px value; when base ≠ 16 it also states the base, so the declaration is unambiguous when pasted elsewhere.
