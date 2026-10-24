# Hash Lab — build spec

## Concept
Hash Lab is a free online tool that computes SHA-1, SHA-256, SHA-384 and
SHA-512 digests for text or files, entirely in the browser via the Web
Crypto API. It is for developers and anyone verifying a download or a
checksum: paste text or drop a file, get all four digests at once, copy them
in hex or base64, and check two hashes for equality. Nothing is uploaded —
the input never leaves the device — which is the whole point of a hashing
tool.

## Feature list (MVP, priority order)
1. **Text input** (textarea): hashing runs on demand via a "Hash" button and
   live on input once a result exists, so edits re-hash without extra clicks.
2. **File input**: pick a file and hash its bytes with the same four
   algorithms; the file name and size are shown, and the file is never
   uploaded.
3. **All four digests at once**: SHA-1, SHA-256, SHA-384, SHA-512 computed
   with `crypto.subtle.digest`; each row shows the algorithm, the digest,
   and its own copy button.
4. **Hex / base64 output toggle**: one segmented control switches every
   digest row between lowercase hex and base64.
5. **Copy buttons**: one per digest row, plus a "Copy all" button that copies
   all four digests as labelled lines; clipboard fallback when the
   Clipboard API is unavailable.
6. **Compare two hashes**: two inputs and a "Compare" button; the result
   states Match or No match after normalising case and surrounding
   whitespace; comparing with either field empty shows an inline error.
7. **Sample text** button: loads a short sample ("The quick brown fox jumps
   over the lazy dog") and hashes it immediately.
8. **Clear + error states**: Clear resets text, file, results and compare.
   Empty input (no text, no file) shows a red error banner; a failed file
   read shows a red error banner naming the file; an insecure context
   without Web Crypto shows a banner explaining hashing is unavailable.
   Digests are not claimed for MD5 — MD5 is not available in Web Crypto,
   and the page says so in the explainer.

Out of scope: MD5 and other non-Web-Crypto algorithms; HMAC / keyed hashing;
hashing by URL fetch; drag-and-drop of files; saved history or localStorage;
hash cracking or reversing.

## Design
Page structure top to bottom:
1. Nav (`Shipwright Studio`, `Idea Lab`), eyebrow `Lab · Developer tools`,
   `h1` "Hash Lab", definition paragraph (`define` class) written as
   "Hash Lab is a free online tool that …" for AI citation.
2. **Input card**: cardlabel "Input"; textarea for text; file picker row
   showing the chosen file name and size (or "No file chosen"); error
   banner area; button row: Hash, Sample, Clear.
3. **Results card**: cardlabel "Digests — computed locally"; hex/base64
   segmented control; four digest rows (algorithm label, mono digest text,
   copy button); empty state "No digest yet — enter text or choose a file
   and press Hash."; "Copy all" button.
4. **Compare card**: cardlabel "Compare two hashes"; two mono inputs,
   "Compare" button, result line (green Match / red No match) or inline
   error when a field is empty.
5. **Explainer card**: `<details>` "Why no MD5?" — MD5 is not exposed by
   the Web Crypto API, so this tool only offers the SHA family; a note that
   hashing is one-way and that identical inputs always produce identical
   digests.
6. Footer: "Built in the Shipwright Studio Lab · more experiments".

Interactions/states:
- Empty: results card shows the empty-state text, compare result blank, no
  banner.
- Active (typing after a hash exists): digests recompute live.
- Success: four digest rows appear; copy shows a "Copied ✓" toast.
- Error (empty input): red banner "Enter some text or choose a file first.";
  results stay as they were (or empty).
- Error (file read failure): red banner naming the file; results cleared.
- Error (compare with empty field): inline red text "Enter both hashes to
  compare."

Visual treatment: dark `#0a0c0f`, panels `#101318`, Fraunces serif headings,
brass `#d2a24c` accent, mono (`JetBrains Mono`) for digests and hash inputs,
generous whitespace. Mobile: digest rows wrap (digest breaks anywhere),
buttons go full width, compare inputs stack.

## Acceptance criteria
- A user can type text, press Hash, and see correct SHA-1, SHA-256,
  SHA-384 and SHA-512 digests for that text.
- A user can choose a file and see digests of the file's bytes, with the
  file name and size displayed.
- A user can switch between hex and base64 output and copy any single
  digest, or all four at once, with one click.
- A user can paste two hashes, press Compare, and get a clear Match / No
  match verdict (case-insensitive).
- A user pressing Hash with no text and no file sees a clear error, and
  the page stays usable.
