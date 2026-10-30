# Wallet Address Validator — build spec

## Concept
Wallet Address Validator is a free online tool that checks whether an
Ethereum-style wallet address is well-formed and, if it is, whether its
mixed-case checksum follows EIP-55. It is for anyone about to paste an
address into a send form who wants a second opinion before money moves:
one glance tells you if the address is valid, checksummed, merely
lowercase/uppercase (valid format, no checksum protection), or broken — and
exactly which rule failed. Everything runs locally in the page; nothing is
sent anywhere.

## Feature list (priority order)
1. Live validation on every keystroke: 0x prefix, exactly 40 hex characters,
   hex-only characters — each rule reported pass/fail individually.
2. EIP-55 checksum verification using a dependency-free Keccak-256
   implementation written inline (no external JS, no network).
3. Verdict states: Valid + checksummed / Valid format, no checksum
   (all-lowercase or all-uppercase) / Invalid, with a plain-English
   explanation of what the verdict means for sending funds.
4. Checksummed version output for any valid-format address, with one-click
   copy.
5. Four one-click sample addresses: a checksummed address, its lowercase
   twin, an invalid (wrong-length) address, and a checksum-mismatch address.
6. Character breakdown: prefix, length count, hex-character count, and
   case pattern (mixed / lower / upper) shown beside the verdict.
7. Clear button and a short "What is EIP-55?" explainer.

Out of scope: ENS name resolution, balance/token lookups, other chains'
address formats (Bitcoin, Solana), QR scanning, network calls of any kind.
Checksum correctness is safety-critical: the Keccak-256 implementation must
be verified against published test vectors and the EIP-55 example addresses
before shipping.

## Design
Top to bottom: eyebrow + h1 + quotable definition paragraph; input card
(monospace address field, paste hint, sample buttons, clear button);
verdict banner (green / amber / red states, never ambiguous); rule checklist
card (each rule with pass/fail icon); details card (checksummed address +
copy button, breakdown stats); "What is EIP-55?" explainer; footer with Built
by Shipwright Studio + link to /ideas/. Visual treatment: dark premium
`#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace.
Mobile: input wraps without horizontal scroll, verdict banner full width,
copy button thumb-sized. States: empty (neutral prompt, no verdict),
typing/invalid (red banner + failing rules), valid-unchecksummed (amber),
valid-checksummed (green), copied (brief "Copied" confirmation).

## Acceptance criteria
- A user can paste an address and immediately see a verdict plus which
  individual rules passed or failed.
- A checksummed EIP-55 example address verifies as valid + checksummed, and
  its lowercase twin verifies as valid format without checksum.
- A checksum-mismatch address (one letter's case flipped) is reported
  invalid, not merely "unchecksummed".
- The page makes zero network requests (no fetch/XHR) and works fully offline
  after load except for the font stylesheet.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no secrets.
