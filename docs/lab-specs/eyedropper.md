# Screen Picker — Build Spec

## Concept

Screen Picker is a free online color-picker tool for designers and
developers: sample any color on your screen with the browser's native
eyedropper, or type/pick a color by hand, and instantly get it in every
format a project needs — HEX, RGB, HSL, and a CSS variable. It exists for
the "what color is that?" moment: a brand color in a screenshot, a shade in
a mockup, a hex in a teammate's message. Everything runs client-side in one
page — no accounts, no uploads, no server.

## Feature list

1. **Native eyedropper (primary input):** "Pick a color from your screen"
   button calls `navigator.eyeDropper.open()` and adopts the returned
   `sRGBHex` as the current color. Feature-detected at load: the button is
   hidden/disabled with a clear fallback note when the API is unavailable.
2. **Manual color input:** native `<input type="color">` swatch plus a hex
   text field (accepts `#d2a24c`, `d2a24c`, and 3-digit shorthand `#abc`).
   Either control updates the current color immediately.
3. **Live format conversion:** HEX, RGB (`rgb(210, 162, 76)`), HSL
   (`hsl(39, 60%, 56%)`), and CSS custom-property
   (`--color: #d2a24c;`) readouts, recomputed on every color change.
4. **Click-to-copy:** each format row copies its value to the clipboard on
   click; a "Copied" toast confirms, and the copied row flashes a brief
   success state. Clipboard failure (non-secure context, denied permission)
   falls back to selecting the text and shows a hint.
5. **Recent palette strip:** the last 10 picked colors, newest first, shown
   as clickable swatches; clicking one restores it as the current color.
   Persisted in `localStorage` (`screen-picker-recent`); a "Clear" button
   empties the strip.
6. **Curated demo swatches:** a small set of labelled swatches — the studio
   palette (brass `#d2a24c`, ink `#0a0c0f`, panel `#11141a`, parchment
   `#e8e4da`) plus a few vivid primaries — so the conversion and copy flow
   is fully usable even where the EyeDropper API is unsupported.
7. **Large live preview:** the current color shown as a big swatch with its
   hex overlaid, with auto-contrasting label text (black/white chosen by
   relative luminance).

Out of scope: image upload and pixel sampling, color-blindness simulation,
palette harmonies (see Palette Lab), gradient builder, share links,
eyedropper support outside Chromium (the API simply does not exist there).

## Design

Top to bottom: eyebrow ("Shipwright Studio · Lab"), `h1` "Screen Picker",
quotable definition paragraph (GEO), support banner (detects EyeDropper
support: a brass note "Works in Chrome / Edge" when supported, a muted
note "Your browser doesn't support the screen eyedropper — use the picker
or a hex code below" when not), main panel: large preview swatch (with hex
overlay) + eyedropper button + manual controls row (color input, hex field,
random button), format rows (four copyable rows: HEX / RGB / HSL / CSS
variable, each with label, value in mono, and a copy affordance), recent
palette section (swatch strip + Clear), demo swatches section (labelled
grid), "How it works" notes, back link, footer.

Visual treatment: dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c`
accent for the primary button, active rows, and copied state. Generous
whitespace; panels `#11141a` with `#232a35` borders and 16px radius. Mono
font for format values. The preview swatch is the visual hero (≥180px tall,
rounded, border) and its color is the only bright element on the page.

Mobile: controls stack vertically; format rows stay full-width with
tap-sized targets; swatch strips wrap to a grid; preview stays on top.

States: empty — no color picked yet: a default seed (`#d2a24c`, the studio
brass) is shown so the page is never blank; active — any color change
updates preview, formats, and recents instantly; success — copied row shows
a brass check + toast "Copied #d2a24c"; error — invalid hex input shakes,
shows a hint ("Enter a hex like #d2a24c"), and keeps the last valid color;
unsupported — eyedropper button replaced by the explanatory note, manual
and demo paths remain fully working.

## Acceptance criteria

- In a Chromium browser, clicking "Pick a color from your screen" opens
  the native eyedropper and the chosen color appears in the preview and in
  all four format rows; in a browser without the API, the button is
  replaced by a clear note and the rest of the tool still works.
- Typing a hex (with or without `#`, 3- or 6-digit) updates every format
  correctly — e.g. `#d2a24c` reads `rgb(210, 162, 76)`,
  `hsl(39, 60%, 56%)`, `--color: #d2a24c;` — and an invalid hex is
  rejected with a hint and no state change.
- Clicking any format row copies its exact value and shows a "Copied"
  confirmation; the clipboard fallback works when `navigator.clipboard`
  is unavailable.
- Picked colors appear in the recent strip (newest first, max 10), survive
  a page reload via `localStorage`, and clicking a recent swatch restores
  that color; Clear empties the strip.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies; no email
  addresses, API keys, or secrets in the file.
