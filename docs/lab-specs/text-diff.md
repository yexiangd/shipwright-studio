# Build spec — Text Diff

## Concept

Text Diff is a side-by-side text comparison tool that runs entirely in the
browser: paste an original text and a revised text, and it shows exactly
which lines were added, removed, or changed, with word-level highlighting
inside changed lines. It is for anyone who needs to review an edit — a
writer checking a revision, a developer eyeballing a config change, a
student comparing drafts — without opening a code editor or sending text to
a server. It is delightful because the alignment is honest: a real
longest-common-subsequence line diff means an insertion in the middle of a
document does not cascade into false "everything changed" noise, and the
word highlights pinpoint the edit inside a line at a glance.

## Feature list (MVP, in priority order)

1. **Two text inputs** — an "Original" textarea and a "Revised" textarea,
   side by side on desktop, with a Compare button (comparison also runs
   live as the user types, debounced).
2. **LCS-based line diff, side by side** — lines are aligned by a real
   longest-common-subsequence diff (dynamic-programming table over lines),
   so insertions and deletions mid-document align correctly instead of
   shifting every following line. Rows are: unchanged, added (right only),
   removed (left only), or changed (both sides, paired).
3. **Word-level highlighting within changed lines** — paired changed lines
   are diffed again at the word level (also LCS, over word tokens that keep
   their whitespace), so only the edited words are highlighted: removed
   words in red on the left, added words in green on the right.
4. **Change counts** — a summary line above the diff shows lines added,
   lines removed, lines changed, and words changed (added + removed word
   tokens), plus unchanged line count.
5. **Ignore-whitespace toggle** — when on, lines are compared after
   trimming and collapsing runs of whitespace, while the displayed text
   keeps its original spacing.
6. **Sample-text button** — loads a short paired example (a paragraph with
   one inserted line, one deleted line, and one edited line) so the diff
   features are visible immediately.
7. **Copy diff summary** — copies a one-line plain-text summary ("Text Diff
   summary: N lines added, N removed, N changed, N words changed") to the
   clipboard, with a visible success or failure message.
8. **Clear button** — empties both textareas and resets the diff area to
   the empty state.

Out of scope for this version: character-level highlighting inside words,
unified (single-column) diff view, file upload, syntax highlighting,
sharing or saving diffs (no server, no persistence beyond the page), and
any network request beyond the font stylesheet.

## Design

Page structure, top to bottom:

1. Top nav: "Shipwright Studio" (home) and "Idea Lab" (`/ideas/`).
2. Eyebrow ("Lab · Devtool"), one `h1` ("Text Diff"), and a one-sentence
   definition paragraph ("Text Diff is a free online tool that …") for
   search and AI answer engines.
3. Input card: two labelled textareas (Original / Revised) in a two-column
   grid, then a control row — Compare button, Ignore whitespace checkbox,
   Sample text button, Copy summary button, Clear button — and a summary
   line (counts) plus a status line (empty / identical / differences found
   / copy feedback).
4. Diff card: a side-by-side grid. Each row has a left cell (original line
   with line number) and a right cell (revised line with line number).
   Unchanged rows are neutral; removed rows tint the left cell red and
   leave the right cell blank; added rows tint the right cell green and
   leave the left cell blank; changed rows tint both cells and highlight
   individual changed words. A legend explains the colours.
5. "How it works" explainer (collapsible): LCS line alignment, word diff
   inside changed lines, what ignore-whitespace does, and the privacy note
   (everything runs locally in the browser).
6. Footer: "Built in the Shipwright Studio Lab · more experiments" linking
   to `/ideas/` (never to `/lab/`).

Key interactions and states:

- **Empty** (both inputs blank): diff area shows "Enter text on both sides
  and press Compare — or load the sample." Summary counts are all zero.
- **Active / typing**: comparison re-runs on a short debounce after each
  keystroke, so the diff and counts stay live; Compare also forces an
  immediate run.
- **Success — differences found**: summary line reads e.g. "2 lines added ·
  1 removed · 1 changed · 4 words changed · 3 unchanged", and the diff
  grid shows the coloured rows with word highlights.
- **Success — identical**: status line reads "No differences found — the
  two texts are identical." and the diff grid shows all rows neutral
  (or the empty hint if both inputs are blank, not the identical message).
- **Error**: clipboard copy can fail (e.g. clipboard permission denied);
  the status line then reads "Could not copy — select the summary text
  manually." No other error state is reachable in normal use: any text,
  including empty input, diffs without throwing.
- **Changed-line pairing**: within a contiguous change block, deletes are
  paired with following inserts in order, so word diffs run on genuinely
  corresponding lines; leftover unpaired deletes/inserts render as plain
  removed/added rows.

Visual treatment: studio aesthetic throughout — dark `#0a0c0f` background,
`#101318` cards with `#1c2128` borders, Fraunces serif headings, brass
`#d2a24c` accents (Compare button, active controls, headings), generous
whitespace, sans-serif UI text for controls, counts, and diff cells.
Diff colours are muted for the dark theme: removed red `#ff7a7a` text on a
`rgba(255,122,122,.08)` background, added green `#7ddb8a` on
`rgba(125,219,138,.08)`; word highlights use a stronger tint of the same
hues. Line numbers are small, muted, and right-aligned in a fixed gutter.

Mobile considerations: textareas stack vertically; the control row wraps;
the diff grid keeps its two columns inside a horizontally scrollable
wrapper (minimum grid width 640 px) so left/right alignment is never
broken by wrapping — the user scrolls sideways rather than seeing
misaligned rows. Buttons are at least 44 px tall.

## Acceptance criteria

1. A user can paste text into both textareas and see a side-by-side diff
   where a line inserted mid-document appears as a single added row and
   the lines after it stay aligned as unchanged (verified by the node
   test, not just by eye).
2. A changed line shows word-level highlighting: only the edited words
   are coloured on each side, and the word-change count matches the
   highlighted tokens (verified by the node test).
3. The summary line reports lines added, removed, and changed, and words
   changed, and updates live as the user types; the ignore-whitespace
   toggle makes whitespace-only differences count as unchanged.
4. Sample text, Copy summary (with visible success/failure feedback), and
   Clear all work, and the empty and identical states show the correct
   status messages.
5. The page passes the house checks: exactly one `h1`, unique title
   "Text Diff · Shipwright Studio", one-sentence meta description,
   canonical link, WebApplication JSON-LD, no images (none used), no
   no mail-to links, no email addresses, and no secrets.
