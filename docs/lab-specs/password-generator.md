# Build Spec — Password Generator (`password-generator`)

## Concept
A free online password generator that creates either maximum-entropy random passwords or human-memorable passphrases. It shows a live strength estimate (bits of entropy + crack-time estimate) and lets users tune length and character classes. Zero network calls, zero tracking — everything happens in the browser, which is the whole point of a password tool.

## Feature list (MVP, priority order)
1. Random password generation with `crypto.getRandomValues` (CSP-safe, no `Math.random`).
2. Two modes: **Password** (random chars) and **Passphrase** (word-list based, e.g. `correct-horse-battery-staple`).
3. Tunables: length slider (8–64), character class toggles (uppercase, lowercase, digits, symbols), ambiguous-character exclusion (0O1lI|).
4. Live strength meter: entropy bits + human-readable crack-time estimate (e.g. "centuries at 10¹⁰ guesses/s").
5. One-click copy to clipboard with visual confirmation; regenerate with one click.
6. Passphrase mode: 4–8 words slider, separator choice, optional capitalization/number suffix.
7. History of the last 5 generated passwords (session only, auto-cleared; with clear button).
8. Aesthetic: dark premium (`#0a0c0f`), Fraunces serif headings, brass `#d2a24c` accent, generous whitespace, monospace password display, responsive mobile layout.

**Out of scope:** wordlist editing, password vault/storage, pronounceable-syllable mode, export.

## Design
- **Header**: studio nav breadcrumb, h1 "Password Generator", one-sentence quotable definition paragraph.
- **Main panel**: mode tabs (Password / Passphrase) → big monospace output field with copy + regenerate buttons → strength bar + entropy/crack-time readout → options (length slider, class checkboxes, exclude-ambiguous toggle).
- **History**: small strip below ("This session only — cleared when you leave").
- **Footer note**: why local generation matters, one line on passphrase vs password tradeoffs.
- **States**: empty (generate button highlighted), generated (copy enabled), copied (temporary "Copied" toast/check state), clipboard API failure → fallback select-and-copy message.
- **Mobile**: controls stack vertically, output wraps with break-all, sliders thumb-friendly.

## Acceptance criteria
1. A user can generate a password, adjust length/classes, and see the entropy/crack-time update live.
2. Copy works and gives visible confirmation; clipboard failure degrades gracefully.
3. Passphrase mode generates ≥4 words with configurable separator.
4. Strength meter changes monotonically as length grows; ambiguous chars never appear when excluded.
5. Page works fully offline-equivalent (no external JS; Google Fonts only).
