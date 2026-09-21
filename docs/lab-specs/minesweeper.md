# Build Spec — Minesweeper (`lab/minesweeper/`)

## Concept
The classic minefield in a single self-contained page: click to reveal, right-click to flag, chord on numbers to blast open safe neighbors. Three difficulties (Beginner 9×9/10, Intermediate 16×16/40, Expert 30×16/99) plus a timer and mine counter in the studio's dark premium skin. Mobile-friendly via a long-press/right-click flag toggle. The delight is in the polish: guaranteed safe first click, smooth chord interactions, and crisp win/lose states.

## Feature list (MVP, in priority order)
1. **Three difficulties** — Beginner 9×9/10 mines, Intermediate 16×16/40, Expert 30×16/99; one-click board rebuild.
2. **Reveal + flood fill** — left-click reveals; zero cells cascade-open neighbors; first click is guaranteed safe (mines placed after it).
3. **Flagging** — right-click toggles flags; flag-mode toggle button for mobile/touch.
4. **Chording** — clicking an open number whose flag count matches its value reveals all unflagged neighbors; wrong flags trigger loss (classic behavior).
5. **Timer + mine counter** — timer starts on first click, stops on win/loss; counter shows mines − flags placed.
6. **Win/Lose states** — win: board flashes, all mines auto-flagged, time + difficulty recorded; lose: all mines revealed, the fatal cell highlighted.
7. **New game / same-board retry** — "New game" button + click on the status face.
8. **Touch support** — tap = reveal, long-press = flag (long-press ≥400ms), flag-mode toggle as fallback.

**Out of scope**: best-time leaderboard persistence, custom board sizes, guess-free board generation, sounds.

## Design
- Top to bottom: studio topbar → `h1` "Minesweeper" → quotable definition paragraph (GEO) → HUD card (mine counter, difficulty pills, timer) → board card (CSS grid of cells) → controls row (flag-mode toggle, new game) → short "how to play" list.
- Cells: unopened = raised `#10141a` tile; opened = flat `#0a0c0f` with classic number colors (blue/green/red/brass); flags = brass ⚑; mines = ●. Expert board scrolls horizontally on small screens, centered otherwise.
- States: ready (no timer), running, won (brass flash + stats), lost (red highlight on exploded cell).
- Visual: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, mono HUD digits, tabular-nums.

## Acceptance criteria
- A user can win Beginner by clearing all non-mine cells; timer stops and stats show.
- First click never ends the game (mine placement deferred until first reveal).
- Chord on a correctly-flagged number opens all safe neighbors in one click.
- Right-click and long-press both flag/unflag; flag counter decrements correctly.
- No external assets; single `index.html`, exactly one `h1`, canonical + JSON-LD present.
