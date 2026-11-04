# Nonogram — Build Spec

## Concept
Nonogram is a free online logic-grid pixel puzzle game. Numbers beside each row and column tell how many consecutive filled cells appear in that line; the player deduces the hidden picture cell by cell. It is for puzzle fans who want a quick, satisfying logic break, from a 5×5 warm-up to a 15×15 challenge. No account, no downloads — every puzzle is generated in the browser and solved entirely on the page.

## Feature list (MVP, in priority order)
1. Three board sizes: 5×5, 10×10, 15×15, each with a fresh seeded puzzle on demand.
2. Row and column clues computed from the hidden solution.
3. Fill mode and mark (X) mode, plus erasing by clicking a filled/marked cell again; keyboard shortcut F toggles mode.
4. Mistake counter: filling a cell that is empty in the solution counts a mistake and flashes, but stays playable.
5. Timer, moves counter, and a win state showing time, moves and mistakes.
6. Hint button revealing one correct unfilled cell (costs nothing, counts as a move).
7. Check progress button that reports filled-correct / total-filled-cells without revealing the picture.
8. New puzzle, reset board, and a "reveal solution" option for giving up gracefully.
Out of scope: user-created puzzles, daily puzzle archive, leaderboards, accounts, multi-colour puzzles, drag-painting (click-only keeps mobile taps precise).

## Design
Sections top to bottom: nav (Shipwright Studio / Lab), eyebrow, h1, quotable definition paragraph, controls card (size selector, New puzzle, Fill/X mode toggle, Hint, Check, Reset, Reveal), board card (clue grid + cells + status line: timer, mistakes, progress), "How to play" explainer, footer with Built by Shipwright Studio + link back to /ideas/.
Interactions and states: empty board (all cells blank); active (cells fill brass or show X, mistake flash red); success (win banner, board locked except New puzzle); error (mistake counter increments, cell shakes briefly); give-up (solution shown in muted brass, labelled as revealed).
Visual treatment: dark premium #0a0c0f, Fraunces serif headings, brass #d2a24c accent, generous whitespace. Cells are square, separated by a thicker line every 5 cells. Mobile: board scales to viewport width, controls wrap, tap targets at least 32px.

## Acceptance criteria
- A user can start a 5×5 puzzle, fill cells, and win when every solution cell is filled and no wrong cell is filled.
- The page shows correct row/column clues for the generated solution (clues recomputed from the solution, not hand-written).
- A user can switch to X mode and mark cells, toggle mode with F, and erase a cell by clicking it again.
- The page shows a mistake count that increments exactly when a filled cell is not in the solution.
- The page has exactly one h1, unique title/description, canonical link, and WebApplication JSON-LD.
