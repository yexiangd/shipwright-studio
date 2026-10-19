# Spec — Base64 Lab

**Idea slug:** `base64-lab`
**Status:** doing → done on ship

## Concept

Base64 Lab is a free online tool that encodes, decodes, and inspects Base64 text and files entirely in the browser. Developers pasting a blob into a ticket, curious users decoding a JWT-like payload, or anyone converting a small file to a data URI get instant answers with zero uploads — everything runs client-side, which is itself the trust story: sensitive content never leaves the device. Delightful because it does more than a bare encoder: it shows a forensic breakdown (byte length, charset guess, suspicious whitespace) and handles files as well as text.

## Feature list (MVP, priority order)

1. **Encode mode:** text area → UTF-8 Base64 output, with output-length and input-byte count stats.
2. **Decode mode:** paste Base64 → best-effort UTF-8 decode; show raw-byte hex view when the decoded output is not valid text.
3. **Auto-detect input:** single toggle box that sniffs whether the input looks like Base64 and flips the mode button accordingly.
4. **File tab:** drop/pick a file → shows size, MIME guess (from extension/name + magic-byte sniff of first 16 bytes), data-URI output, and a download button for the decoded text when decoding.
5. **Whitespace janitor:** one click strips whitespace/newlines that broke the decode, re-attempts decode automatically.
6. **Copy + swap:** copy buttons on both panes; a swap button exchanges input/output in encode↔decode workflow.
7. **Share-safe stats line:** input bytes, output chars, SHA-256 fingerprint of the decoded bytes (computed locally via SubtleCrypto, shown for verification).
8. **Error state:** on invalid Base64, a plain-language message ("Not valid Base64: illegal character '@' at position 12") — never a raw exception.

**Out of scope:** URL-safe Base64 variants (notes mention it, not implemented), multi-file batch, hex-to-base64 mode, file → decoded-file download (text only), syntax highlighting, any network call.

## Design

- **Structure:** h1 + one-line quotable definition paragraph → tab bar (Text | File) → direction toggle (Encode/Decode, with Auto badge) → two textareas side-by-side (stack on mobile) with stats strip under each → action row (Swap, Copy input, Copy output, Clean whitespace) → "What to look for" insight card (decodes to a short checklist: length, charset, suspicious chars).
- **Interactions:** live conversion on input (debounced 150ms); file tab shows dropzone, then the stats + data-URI preview (truncated at 4,000 chars with "copy full" button); decode errors render inline with the offending position highlighted in the input.
- **States:** empty (placeholder guidance), active (live output), success (clean), error (inline message + caret pointer).
- **Visual:** studio aesthetic — `#0a0c0f` background, Fraunces serif headings, brass `#d2a24c` accents, monospace panes (ui-monospace), generous whitespace. Mobile: panes stack, tabs remain reachable.
- **SEO:** per-lab standards (title, description, canonical, WebApplication JSON-LD, single h1, quotable definition paragraph).

## Acceptance criteria

- A user can encode any UTF-8 text (including emoji) to Base64 and decode it back byte-for-byte.
- A user can drop a PNG file and get a working `data:` URI with MIME type and byte size shown.
- A user can paste Base64 with line breaks and fix it with one click of "Clean whitespace".
- A user pasting invalid Base64 sees which character and position broke it.
- All work happens locally; the page makes no network requests beyond the font stylesheet.
