# Barcode Gen — build spec

Idea: `barcode-generator` (idea-058) · "Barcode Gen" · category: devtool · effort: S

## Concept

Barcode Gen is a free online tool that renders standards-compliant Code 128
barcodes entirely in the browser. It is for developers, warehouse and retail
staff, makers and anyone who needs a printable barcode for a SKU, asset tag or
label — no account, no upload, no server: the input never leaves the page.
The page encodes text from scratch (no barcode library), draws it crisply to
canvas, and hands back a print-ready PNG or SVG. Auto-switching to Code 128-C
for long digit runs keeps long numeric codes compact, and a live pattern view
shows exactly what the encoder produced, so the result is transparent and
verifiable rather than a black box.

## Feature list (MVP, in priority order)

1. **Code 128 encoder from scratch** — Code 128-B for the full printable
   ASCII range (space ` ` through `~`, codes 32–126), with automatic
   switching to Code 128-C for runs of 6+ digits. Checksum is the weighted
   modulo-103 sum (start value + Σ value × position, mod 103). Start, stop,
   and a 10-module quiet zone on each side are always included.
2. **Text input with live preview** — typing re-renders instantly; empty
   input shows an empty state with a hint, never a broken barcode.
3. **Human-readable text toggle** — the encoded text printed under the bars
   (on by default), with font size scaled to the barcode.
4. **Size controls** — bar height (40–200 px), module width / scale (1–4 px
   per module), and quiet-zone width (0–20 modules).
5. **Colour pickers** — foreground (bar) colour and background colour,
   defaulting to black on white for maximum scanner contrast.
6. **PNG and SVG download** — PNG rendered from the canvas at 2× for print
   sharpness; SVG built from the same module pattern (rects per run).
   Filenames are derived from the input text (sanitised, e.g.
   `barcode-ABC123.png`).
7. **Copy to clipboard** — copies the PNG image (via `ClipboardItem`) with
   a fallback that copies the text value; shows a brief success state.
8. **Sample presets** — one-click chips for common cases: a SKU
   (`SKU-8842`), a numeric code (`123456789012`), a URL-safe label
   (`ORDER-2026-1187`), and a long numeric run to demonstrate Code 128-C
   (`4006381333931`).
9. **Encoder details panel** — shows the encoded symbol sequence (start code,
   data values, checksum value, stop), total module count, and the detected
   encoding mode (B / C mix), so users can verify correctness.

### Out of scope (this version)

- Other symbologies (EAN-13, QR, Code 39) — Code 128 only.
- Printing layout / label sheets (Avery templates) — download only.
- Batch generation from CSV.
- Persistent history or saved barcodes (no storage).
- Code 128-A control characters (below ASCII 32) — out of range, rejected
  with a friendly error.
- Camera scanning / decoding of existing barcodes.

## Design

Page structure, top to bottom:

1. Eyebrow ("Shipwright Studio · Lab"), `h1` "Barcode Gen", and the
   quotable definition paragraph.
2. **Input card** (panel): a text input with a character counter and the
   valid-character hint ("ASCII 32–126"), preset chips underneath, and a
   friendly inline error area (red text, shown only for invalid input —
   e.g. a character outside Code 128-B range — with the offending character
   named).
3. **Preview card** (panel): the barcode rendered on `<canvas>` (white
   background by default), human-readable text under the bars when enabled,
   and an empty state ("Type something above to generate your barcode") when
   the input is blank. A small status line under the preview reports mode
   (B / B+C), module count and checksum.
4. **Controls card** (panel, two-column grid on desktop, stacked on mobile):
   toggles (human-readable text), sliders (bar height, module width,
   quiet zone), colour pickers (foreground / background), and a Reset button.
5. **Actions row**: Download PNG, Download SVG, Copy image — buttons
   disabled in the empty state; copy shows a temporary "Copied ✓" state.
6. **Encoder details** (collapsible `<details>`): symbol table — start code,
   each data value, checksum, stop — plus total modules.
7. **How it works** section: 3 short paragraphs (what Code 128 is, the
   checksum, why Code 128-C matters for digits) + a note that everything is
   computed locally.
8. Back link to `/ideas/` and the footer.

Key interactions and states:

- **Empty**: input blank → preview shows the empty-state hint, download/copy
  disabled, details panel hidden.
- **Active**: valid input → canvas re-renders on every keystroke/control
  change; status line updates.
- **Success**: download triggers a file save; copy shows "Copied ✓" for 2 s.
- **Error**: out-of-range character (e.g. `é`, emoji, tab) → inline error
  names the character and its position; the last valid barcode stays visible
  (or the empty state if there never was one) — never a broken barcode.
  Copy falling back to text (clipboard image unsupported) shows "Text copied"
  instead.

Visual treatment: dark premium studio aesthetic — background `#0a0c0f`,
panels `#11141a` with `#232a35` borders, Fraunces serif headings, brass
`#d2a24c` accents, Inter body text, generous whitespace, centred column
(max-width 900 px). The barcode preview itself sits on a light card so the
bars read as they would on a label. Buttons: brass primary (Download PNG),
ghost secondary (SVG / Copy).

Mobile considerations: controls stack to one column; the canvas scrolls
horizontally if the barcode is wider than the viewport (with a subtle scroll
hint); sliders get large touch targets; presets wrap.

## Acceptance criteria

1. A user can type printable ASCII text and immediately see a correct Code
   128 barcode (start, data, checksum, stop, quiet zones) rendered on canvas.
2. A user can toggle the human-readable text, adjust bar height / module
   width / quiet zone / colours, and see the preview update live.
3. A user can download the barcode as a PNG and as an SVG, and copy the PNG
   to the clipboard (or the text as a fallback).
4. Invalid input (a character outside ASCII 32–126) produces a friendly
   inline error naming the character; no broken barcode is ever shown.
5. The page passes the repo SEO rules: unique title/description, canonical
   URL, exactly one `h1`, WebApplication JSON-LD, `alt` text on images, no
   `mailto:` anywhere.
