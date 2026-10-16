# Build Spec — Sudoku

Slug: `sudoku` · idea-013 (priority 82)

## Concept

A fresh, fully playable Sudoku every load — no puzzle database, no network.
The page generates a complete solution grid in-browser with randomized
backtracking, then digs holes symmetrically while a solver guarantees the
resulting puzzle still has exactly one solution. Difficulty maps to givens
(Easy/Medium/Hard). The player gets a dark, brass-accented board with number
entry, pencil notes, hints, mistake highlighting, and a timer — everything a
daily-paper puzzle offers, generated on the spot.

Audience: casual players wanting a quick elegant puzzle and regulars who
like a clean, fast, mobile-friendly board.

## Feature list (MVP, priority order)

1. **In-browser puzzle generation with unique solutions** — randomized
   backtracking builds a full solution grid; holes are dug in random
   symmetric pairs; each candidate removal is kept only if a solver finds
   exactly one solution. Bounded loop so generation never hangs.
2. **Difficulty levels** — Easy (~44 givens), Medium (~36 givens),
   Hard (~30 givens). Selector changes the target dig count; choosing one
   generates a fresh puzzle at that level.
3. **Cell selection + related highlighting** — tapping/clicking a cell
   highlights its row, column, box, and all cells with the same value.
4. **Number entry + erase** — on-screen 1–9 keypad and Erase button;
   keyboard 1–9, Backspace/Delete, arrow keys also work. Givens are locked.
5. **Pencil notes toggle** — entering digits into a non-given cell adds
   small candidate notes; notes auto-clear from a cell once its digit is
   correct; placing a value clears notes in related cells.
6. **Hint button** — fills one currently-empty cell with its correct
   solution value (or corrects the selected cell); hints counter shown.
7. **Mistake highlighting toggle** — when on, digits that don't match the
   solution render in red; mistakes counter shown.
8. **Timer + new puzzle + win state** — timer starts on first entry, pauses
   with a Pause button; New Puzzle generates another at the same level;
   completing the board shows an overlay with time, mistakes, hints and a
   "New puzzle" action.

Out of scope for this version: daily puzzle seed, leaderboard / accounts,
auto-candidate auto-fill, X-Sudoku / killer variants, undo history,
save-to-localStorage persistence, sound effects.

## Design

### Page structure (top → bottom)

1. Topbar: `← The Lab` link (→ `../../ideas/`), `Shipwright Studio` brand.
2. Header: `h1` "Sudoku", one quotable definition paragraph
   ("Sudoku is a free online tool that …"), difficulty segmented control
   (Easy / Medium / Hard).
3. Board card: stats row (Timer, Mistakes, Hints), 9×9 board, below it
   controls row (Pause, Hint, Erase, Notes toggle, Mistakes toggle),
   number pad 1–9, New Puzzle button.
4. Hint line: keyboard help (`1`–`9`, Backspace, arrows).
5. Footnote paragraph + `Built by Shipwright Studio` link.
6. Win overlay (absolutely positioned over the board): congrats, stats,
   New Puzzle button.

### Key interactions & states

- **Idle → playing**: board renders with givens in bright text, empty
  cells awaiting input. Timer starts on the first user-entered digit.
- **Selected cell**: brass-tinted background; row/col/box get a faint
  highlight; same-value cells get a stronger tint. Selected given can't
  be edited.
- **Wrong entry** (mistakes ON): digit in red, mistakes +1. Wrong entry
  stays (player can fix) — classic casual behavior.
- **Notes mode**: toggle pill turns brass; digits entered land as a
  3×3 mini-grid of candidates in the selected cell.
- **Hint**: picks the selected empty cell if any, else a random empty
  cell, fills the solution digit, flashes brass, hints +1. Hints can't be
  used on givens or locked correct cells.
- **Paused**: board blurred with a "Paused — resume" overlay; timer
  frozen; input ignored.
- **Won**: all 81 cells correct → overlay with final stats; mistakes
  counter excludes hint-filled cells.

### Visual treatment

Studio aesthetic: `#0a0c0f` background, `#10141a` cards, Fraunces serif
headings, brass `#d2a24c` accents, Inter body, JetBrains Mono for timer
and stats. Board cells are square via `aspect-ratio`; thick borders
separate 3×3 boxes. Givens `#f2efe6`, user entries brass-ish white,
same-value highlight brass tint, mistake red `#e0655f`.

### Mobile considerations

- Board width `min(92vw, 480px)`; cells ≥ 44px touch targets via the
  number pad (grid cells themselves use `touch-action: manipulation`).
- Number pad 9-column row wraps to a comfortable tap strip on small
  screens; no hover-dependent interactions.

## Acceptance criteria

1. A user can pick Easy/Medium/Hard, get a fresh puzzle each time, and
   New Puzzle regenerates at the current level (difficulty counts:
   Easy ≈44, Medium ≈36, Hard ≈30 givens).
2. Generated puzzles always have exactly one solution (solver verifies
   before shipping; node test asserts uniqueness on sample grids).
3. A user can select cells, enter digits via keypad or keyboard, toggle
   pencil notes, use hints, toggle mistake highlighting, erase, and
   pause/resume the timer; completing the board triggers the win overlay.
4. The page is self-contained (no external JS), responsive down to
   360px wide, with exactly one `h1`, unique title/description,
   canonical link, and `WebApplication` JSON-LD.
5. No secrets, emails, or `mailto:` in the file; back-links point to
   `/ideas/` (never `/lab/`); images (none beyond favicon) would carry
   `alt`.
