# Spec — QR Studio (`qr-generator`)

## Concept
QR Studio is a free online QR code generator. It turns any text, URL, Wi-Fi credentials, or contact card into a crisp, scannable QR code in the browser — nothing is uploaded to a server. Aimed at freelancers, event organizers, and anyone who needs a quick code for a menu, a Wi-Fi login, or a link, with full control over error correction, colors, and export format (PNG/SVG).

## Feature list (MVP, prioritized)
1. **Content input**: textarea for free text/URL, with payload presets — Plain text, Website URL, Wi-Fi network (generates `WIFI:T:...;S:...;P:...;;`), vCard contact (name/phone/email) — each fills the input with the correctly formatted payload.
2. **Live preview**: the QR re-renders on every keystroke (debounced), drawn on a `<canvas>` with a 4-module quiet zone, centered in a preview card.
3. **Hand-written QR encoder**: zero-dependency inline JS — byte mode, versions 1–10 auto-selected, error-correction level selectable (L/M/Q/H, default M), all 8 masks evaluated with the standard penalty rules, format info + timing + finder + alignment patterns.
4. **Customization**: foreground/background color pickers (dark modules on light background, contrast warning if too close), module size slider (256–1024px export edge).
5. **Downloads**: Export PNG (canvas.toDataURL at chosen size) and Export SVG (vector, scales infinitely); "Copy SVG" to clipboard button.
6. **Capacity handling**: if content exceeds version-10 capacity at the chosen ECC level, show a clear inline error ("Too long for QR — shorten or lower error correction") instead of a broken code.
7. **Contrast/scanability hint**: small note under preview when chosen colors may scan poorly (luminance contrast < 2.5:1).
8. **Mobile**: single column, controls stack above preview, tap-friendly inputs.
Out of scope: logo embedding, rounded modules/artistic styles, batch generation, scan-from-camera.

## Design
- **Layout**: two-column grid on desktop — left: controls card (input, presets, options); right: preview card with big QR, download buttons row. Single column on mobile.
- **Sections**: topbar (back to Lab + title), hero line (h1 + one quotable definition paragraph), the builder grid, a short "How it works / tips" section (quiet zone, ECC explainer, privacy note "runs 100% in your browser").
- **States**: empty input → placeholder QR of a sample URL? No — show a subtle empty-state message in the preview ("Type something to generate"); active → live QR; error → inline error banner.
- **Visual treatment**: dark `#0a0c0f` cards with `rgba(255,255,255,.04)` fills, Fraunces h1, brass `#d2a24c` for primary buttons; QR on a white/ivory rounded tile so it looks like a real printed code.
- **Mobile**: `@media (max-width: 860px)` stacks columns; color inputs and buttons full-width friendly.

## Acceptance criteria
- [ ] Typing "https://example.com" produces a QR that scans to exactly that URL (verified by decoding the generated matrix with an independent decoder).
- [ ] The generated matrix is byte-identical (modulo mask choice) to a reference encoder for several test strings and ECC levels.
- [ ] PNG download yields the chosen pixel size; SVG download is valid vector markup containing the modules.
- [ ] Over-capacity input shows an inline error, never a malformed code.
- [ ] Page works offline once loaded (no external JS); exactly one h1; canonical + JSON-LD present.
