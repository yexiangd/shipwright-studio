# Build Spec — Regex Tester (`lab/regex-tester/`)

Seed: "Test patterns live with match highlighting and cheatsheet."

## Concept

Regex Tester is a free, no-signup browser tool for writing and debugging
regular expressions. As you type a pattern and test string, matches are
highlighted in place, every match is listed with its capture groups, and a
built-in cheatsheet sits beside the editor so you never leave the tab. It is
aimed at developers, analysts, and anyone learning regex who wants immediate
visual feedback instead of console trial-and-error.

## Feature list (MVP, in priority order)

1. Pattern input with live validation — invalid patterns show a readable
   error message instead of throwing.
2. Flag toggles: `g`, `i`, `m`, `s`, `u` (clickable chips, `g` on by default).
3. Test-string textarea with in-place match highlighting (matches wrapped in
   brass-highlighted spans; alternating tint for readability).
4. Match list panel: for each match — match index, full match text, capture
   groups (indexed), and named groups where present.
5. Cheatsheet panel: a compact two-column table of common tokens
   (`\d`, `\w`, `.`, `*`, `+`, `?`, `{n,m}`, `[]`, `()`, `^`, `$`, `\b`,
   alternation, lookahead) with one-line descriptions. Collapsible on mobile.
6. Preset patterns (Email, URL, Phone US, Date YYYY-MM-DD, Hex color) that
   load pattern + sample text in one click.
7. Copy-match action per match (copies the matched substring).

Out of scope for v1: replace/substitution mode, multiline result export,
regex explanation in plain English, sharing via URL, test-suite mode.

## Design

Dark premium studio aesthetic (`#0a0c0f` background, Fraunces serif headings,
brass `#d2a24c` accent, generous whitespace). Structure top to bottom:

- Page header: small "Lab" eyebrow, `h1` "Regex Tester", one definition
  paragraph for GEO citation, meta links (back to /ideas/).
- Two-column layout on desktop: left column = editor (pattern field + flag
  chips + test-string textarea); right column = tabs or stacked panels for
  "Matches" and "Cheatsheet". Single column on mobile, panels stacked.
- Pattern field has brass underline glow when valid, red tint + error line
  when invalid.
- Empty state: pattern empty → cheatsheet visible with a hint "type a
  pattern to see live matches"; test string empty → placeholder sample
  available via "Load sample text" button.
- Active state: highlights + match count badge ("7 matches").
- Error state: `new RegExp` failure message shown under the pattern input;
  previous good highlights cleared.
- Mobile: editor stacks above results; cheatsheet becomes a `<details>`
  accordion; textareas at least 120px tall for touch editing.

## Acceptance criteria

1. A user can type a pattern and test string and see every match highlighted
   live, with the match count updating.
2. A user can toggle `i` flag and immediately see case-insensitive matches.
3. A user can click a preset and get a working pattern + matching sample
   text pre-loaded.
4. An invalid pattern shows a clear error and does not freeze the page.
5. The page has exactly one `h1`, unique title/description, canonical link,
   WebApplication JSON-LD, and a GEO-style definition paragraph.
