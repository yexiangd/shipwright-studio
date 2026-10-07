# Spec — Tetris (`tetris`)

## Concept
Tetris is a free online clone of the classic falling-block puzzle: seven tetrominoes, one 10×20 well, zero mercy. It runs entirely in the browser with keyboard and touch controls, guideline-style scoring, levels that speed up as you clear lines, ghost piece, hold queue, and a persistent local best. Built for anyone with five minutes and a competitive streak — no dependencies, no assets, no signup.

## Feature list (MVP, prioritized)
1. **Core playfield**: 10×20 well rendered on canvas; 7 tetrominoes with wall-kick rotation (simple SRS-style kicks).
2. **7-bag randomizer** for fair piece distribution; 3-piece next queue; **hold** piece (C / button).
3. **Ghost piece** showing landing position; soft drop (down arrow) and hard drop (space).
4. **Scoring**: guideline values (single 100 → Tetris 800, × level), soft/hard drop points, combo counter; **levels** every 10 lines, gravity speeds up per level.
5. **Top-out game over** screen with score, lines, level, and restart; **pause** (P / button).
6. **Persistent best** in `localStorage`, shown on idle and game-over screens.
7. **Controls**: keyboard (←/→ move, ↓ soft drop, ↑/X rotate CW, Z rotate CCW, Space hard drop, C hold, P pause) + on-screen touch buttons for mobile.
8. Out of scope: T-spin bonus scoring, multiplayer/versus, themes beyond the studio palette, sound effects.

## Design
- **Layout**: header (title + back to Lab link) → quotable definition → game area: side panel (Hold, score, level, lines, best, controls help) | well canvas | side panel (Next queue, pause/restart buttons); on mobile the well centers and touch buttons appear below.
- **Visuals**: studio dark `#0a0c0f`, brass `#d2a24c` accents, Fraunces numerals for score; each tetromino a distinct muted color; subtle grid lines; cleared lines flash before vanishing.
- **States**: idle (press Start / tap to begin), playing, paused overlay, game over overlay.
- **Mobile**: well scales to fit viewport height; touch controls (left, right, down, rotate, drop, hold) with `touch-action: manipulation`, no scroll interference.

## Acceptance criteria
- [ ] A user can start a game, move/rotate/drop pieces, clear at least one line, and see the score increase.
- [ ] Clearing 10 lines advances the level and the fall speed increases.
- [ ] Hold swaps the current piece once per drop (locked until lock).
- [ ] Ghost piece shows the landing position and hard drop locks instantly with points awarded.
- [ ] Best score persists across page reloads.
- [ ] The game is playable end-to-end with touch controls on a phone-width viewport.
