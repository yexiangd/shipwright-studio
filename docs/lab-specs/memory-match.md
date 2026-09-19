# Memory Match — Build Spec

## Concept

Memory Match is a free online concentration card game. A shuffled grid of
face-down cards is shown; the player flips two at a time trying to find
matching pairs. It's a quick 1–2 minute game for a coffee break, with a
difficulty picker (4×4 / 6×6) and a persistent local best score per
difficulty, so repeat plays feel like chasing a record rather than a
one-off distraction.

## Feature list

1. Difficulty picker: 4×4 (8 pairs, default) and 6×6 (18 pairs) — pills, game resets on change.
2. Animated card flip (CSS 3D) with a tasteful brass-accented card back and an emoji-free glyph face (geometric shapes/symbols — clean and themeable, no emoji).
3. Move counter and timer (live while playing); timer starts on first flip.
4. Match detection with a small "lock" celebration (matched cards fade to brass outline, stay face-up).
5. Mismatch: both cards flip back after ~650 ms; board input locked during this window.
6. Win state: overlay panel with time, moves, pairs-per-minute rating tier (e.g. "Sharp", "Steady", "Warm-up"), and a Play Again button.
7. Best score per difficulty stored in localStorage: fewest moves; shown under the stats, "NEW BEST" badge when beaten.
8. Keyboard + touch support: cards are `<button>`s, fully operable by tap/click/Enter; grid reflows on mobile (cards shrink).

Out of scope: emoji themes, user accounts, leaderboards across players, sound effects, animated confetti.

## Design

Top to bottom: topbar (← Lab / Shipwright Studio brand), `h1` "Memory Match",
quotable definition paragraph (GEO), difficulty pills + best-score line,
stats row (Time / Moves / Pairs), card grid panel (surface, rounded), hint
line ("Tap two cards to find a pair"), footer note.

Visual treatment: dark `#0a0c0f` page, surface `#10141a` cards face-down with
a subtle brass diamond motif; faces show a large geometric glyph in brass on
dark; matched pairs get a dimmed brass border. Fraunces headings, mono for
timer/counters. Generous whitespace, max-width 860px.

Mobile: grid uses `minmax(0,1fr)` with aspect-ratio squares; 6×6 still fits
~360px widths (cards ~48px); stats wrap.

States: empty (before start: all cards face-down, hint "Flip any card to
start"), active (timer running), success (win overlay with rating), best
badge. No error state possible (all logic client-side, no network).

## Acceptance criteria

- A user can pick 4×4 or 6×6, flip two cards per attempt, and clear the board.
- The timer starts on the first flip and stops when the last pair is found; moves count pairs of flips.
- Best moves per difficulty persist across reloads (localStorage) and a "New best" badge appears on improvement.
- Mismatched cards flip back automatically and input is locked during the flip-back.
- Exactly one `h1`, canonical link, meta description, and a WebApplication JSON-LD block are present; no external JS dependencies.
