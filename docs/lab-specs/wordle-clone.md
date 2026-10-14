# Wordle Clone — Build Spec

## Concept

A Wordle Clone is a free online word-guessing game: six tries to find one
five-letter word. This page is a self-contained, dependency-free clone of the
classic format — a daily puzzle (one seeded word per date, identical for
every visitor that day) plus a practice mode with unlimited random words.
It's built for word-game fans who want the daily ritual without a signup,
and for the studio it's another fully offline, in-browser Lab demo.

## Feature list

1. 6×5 tile grid with pop and tile-flip animations; type via physical
   keyboard or the on-screen QWERTY keyboard (Enter / Delete included).
2. Daily puzzle: seeded RNG from the local date (`YYYY-MM-DD`) → same word
   for everyone all day; mode pill shows "Daily" vs "Practice".
3. Practice mode: random word on demand, "New word" button; excluded from
   streak statistics.
4. Letter-state coloring (correct / present / absent) on tiles AND keyboard
   keys; duplicate letters handled correctly (no double-counting).
5. Guess validation against an embedded word list (~1,000 answer words,
   ~2,500 total valid guesses); invalid word → shake animation + toast, no
   guess consumed.
6. Win / lose overlays: win shows guess count ("4/6") and an emoji-grid share
   button (copies to clipboard, no external link); lose reveals the answer.
   Both offer Next / New word.
7. Streak & stats in localStorage: played, win %, current/max streak, guess
   distribution; daily progress resumes on reload (same day, same word).
8. Toast messages for edge cases ("Not in word list", "Not enough letters",
   "Daily solved — come back tomorrow", "Copied to clipboard").

Out of scope: hard mode, colour-blind palette, archived daily puzzles (only
the current date is playable as daily), cross-device sync, share links,
sound effects, confetti.

## Design

Top to bottom: topbar (← Back to the idea bank), eyebrow "Shipwright Studio ·
Lab", `h1` "Wordle Clone", quotable definition paragraph (GEO), mode pills
(Daily / Practice) + date line, stats chips (Streak / Played / Win %),
tile grid panel, on-screen keyboard, hint line, footer
("Built by Shipwright Studio", link to the homepage).

Visual treatment: dark `#0a0c0f` page; tiles dark surface `#11141a` with a
thin `#3a4250` border for empty, letter in Fraunces-adjacent serif? — no,
tiles use the UI sans for glyph clarity; correct = green `#538d4e`, present
= brass-gold `#b59f3b` (studio twist on the classic yellow), absent =
`#3a3a3c`. Fraunces headings, brass `#d2a24c` accents for buttons/pills.
Generous whitespace, max-width 560px so the board stays compact.

Mobile: tiles scale with viewport (`min(62px, 13vw)`); keyboard keys grow to
fill width, `touch-action: manipulation` to kill double-tap zoom; layout is
single column, no horizontal scroll at 360px.

States: start (empty board, cursor in row 1, hint "Type a 5-letter word"),
playing (tiles filling, flip on Enter), invalid (shake + toast), win
(overlay: "Brilliant!" tier by guesses, emoji grid, Copy result, stats),
lose (overlay: "The word was XXXXX", stats, Try again), solved-daily
(overlay offers practice mode instead of replaying the same word).

Keyboard state upgrades only (a key never downgrades: correct > present >
absent). Board rows lock after submission.

## Acceptance criteria

- Entering the same date (e.g. via the seeded RNG) always selects the same
  answer word; different dates (almost always) select different words.
- `colorGuess("EERIE", "ABBEY")` yields
  [present, absent, absent, absent, absent] and `colorGuess("SPEED",
  "ABBEY")` yields [absent, absent, absent, correct, absent] — duplicates
  never double-count (the second pass only consumes letters not already
  matched in the first pass; node-verified 2026-10-14).
- Submitting a word not in the list shakes the row, shows a toast, and does
  not consume a guess.
- Streak, win %, and guess distribution persist across reloads in
  localStorage; reloading mid-day resumes the daily board.
- Exactly one `h1`, unique title/description, canonical link, and a
  `WebApplication` JSON-LD block with `applicationCategory:
  "GameApplication"`; no external JS; Google Fonts only.
