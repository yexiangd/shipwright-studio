# Seed Phrase Lab — build spec

Slug: `seed-phrase-lab`
Status: doing → done on ship
Idea: "Seed Phrase Lab — Educational BIP39 mnemonic generator, client-side only."

## Concept

Seed Phrase Lab is a free, client-side BIP39 mnemonic generator and validator for
learning how crypto wallets work. A learner picks a phrase length, generates a
recovery phrase from real cryptographic entropy, and can validate any phrase
against the official BIP39 English wordlist and checksum rules. Everything runs
in the browser — no network call, no storage, no account — because the point is
understanding the mechanics, not holding real funds.

Audience: students and curious learners who have heard "write down your 12
words" and want to see what those words actually are, how they are derived
from entropy, and how a wallet knows a phrase is mistyped. The page pairs the
tool with a plain-English explanation and a prominent warning that generated
phrases are for learning only.

## Feature list (MVP, in priority order)

1. **Generate a mnemonic** — word-count selector (12 / 15 / 18 / 21 / 24 words),
   entropy drawn from `crypto.getRandomValues`, BIP39 checksum via WebCrypto
   SHA-256. One click, result shown as numbered words.
2. **Entropy transparency** — show the entropy size in bits (128/160/192/224/256)
   and the word count for the generated phrase, plus the hex entropy itself.
3. **Validate a pasted phrase** — textarea + Validate button; checks word count
   (12/15/18/21/24), that every word is in the official 2048-word BIP39 English
   list, and that the checksum is valid. Per-rule feedback listing exactly what
   failed (unknown word with its position, wrong word count, bad checksum).
4. **Copy to clipboard** — one-click copy of the generated phrase, with a
   confirmation state.
5. **Educational warning banner** — always visible near the generator: learning
   only, never use a generated phrase for real funds, never share a phrase with
   anyone, nothing leaves the browser.
6. **"How it works" explainer** — collapsible section: entropy → checksum →
   11-bit word indices → 2048-word list; why 12 words ≈ 128 bits; why a typo
   breaks the checksum.
7. **Test-vector sample** — one-click load of the official BIP39 test vector
   (all-zero 128-bit entropy → "abandon" × 11 + "about") into the validator,
   so a learner can see a valid phrase validated.
8. **Clear / regenerate** — clear the result area; regenerate a fresh phrase.

Out of scope for this version:
- Deriving addresses, private keys, or seed bytes (no HD wallet / BIP32).
- Any network call; no fetching the wordlist at runtime (it is embedded).
- Storing phrases anywhere (no localStorage, no history, no sharing link).
- Non-English wordlists.
- "Strength meter" or security advice beyond the learning-only warning.

## Design

Page structure, top to bottom:
1. Nav (Shipwright Studio / Lab) + eyebrow "Lab — Web3 tool".
2. `h1` "Seed Phrase Lab" + one-sentence definition paragraph (quotable,
   "Seed Phrase Lab is a free online tool that …").
3. Warning card (red-tinted border): learning only — never use for real funds,
   never share a phrase, nothing leaves the browser.
4. Generator card: word-count segmented control (12/15/18/21/24), Generate
   button, numbered word grid (mono font, numbered chips), entropy stats
   (entropy bits, word count, entropy hex), Copy + Clear buttons.
5. Validator card: textarea, Validate button, "Load test-vector phrase" sample
   button, verdict box (green/amber/red) + rule-check list.
6. "How it works" collapsible explainer (`<details>`): entropy → SHA-256
   checksum → 11-bit groups → word indices; checksum catches typos.
7. Footer: "Built in the Shipwright Studio Lab · more experiments".

Key interactions and states:
- Empty: word grid shows a placeholder ("Pick a length and press Generate");
  verdict box neutral ("Paste a phrase to check it").
- Active: generating is instant; word grid fills with numbered words;
  stats update.
- Success: verdict green — "Valid mnemonic — word count, words and checksum
  all check out"; rule list all ✓.
- Error: verdict red with specific cause; rule list shows ✗ on the failing
  rule(s), including the position and spelling of unknown words and the
  expected vs actual checksum note. A phrase with valid words but a bad
  checksum is red, not amber — a bad checksum means a mistyped or swapped
  word.
- Copy: button label flips to "Copied ✓" for ~1.5 s; toast as in Hash Lab.
- WebCrypto unavailable (non-secure context): banner error, Generate disabled
  with explanation.

Visual treatment: studio aesthetic — dark `#0a0c0f` background, panel
`#101318`, Fraunces serif headings, brass `#d2a24c` accent, JetBrains Mono for
words/hex, generous whitespace, max-width 960px. Word chips in a responsive
grid (4 columns desktop, 3 on tablet, 2 on small phones). Buttons are the
pill style from other lab pages. No external JS; Google Fonts only.

Mobile: segmented control wraps; word grid collapses to 2 columns; textarea
full width; buttons full-width on narrow screens (as in Hash Lab).

## Acceptance criteria

1. A user can generate a 12/15/18/21/24-word mnemonic; every word comes from
   the official BIP39 English list and the phrase validates against its own
   checksum.
2. A user can paste a phrase and get a clear valid/invalid verdict, with the
   failing rule named (unknown word + position, wrong word count, or bad
   checksum).
3. The all-zero 128-bit entropy test vector produces exactly "abandon" × 11 +
   "about", and the validator accepts it; a bad-checksum phrase and an
   unknown-word phrase are both rejected (verified by node tests).
4. The page shows entropy bits and word count for each generated phrase, has
   copy-to-clipboard, and carries the learning-only warning where the
   generator is.
5. The page is self-contained (inline CSS/JS, Google Fonts only), has a unique
   title/description, canonical link, one `h1`, and a `WebApplication`
   JSON-LD block; no phrase is stored or sent anywhere.
