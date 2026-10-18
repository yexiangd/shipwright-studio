# Build Spec — Tic-Tac-Toe vs AI (`lab/tic-tac-toe/`)

## Concept
The world's most-analysed game, presented as a precision duel against two minds: **Easy** makes human-like mistakes you can punish, **Unbeatable** plays perfect minimax and can never lose. A 3×3 board in the studio's dark premium skin, with a running win/loss/draw tally, round counter, and a "who starts" toggle. The delight is the contrast: beat the Easy bot comfortably, then try to outthink the Unbeatable one — the best you can do is a draw.

## Feature list (MVP, in priority order)
1. **3×3 board, player is X** — click an empty cell to place X; AI replies as O after a short beat (~450ms) so it feels like a thinking opponent.
2. **Easy mode** — beatable AI: takes a winning move if one exists, otherwise mostly random; intentionally "forgets" to block the player's immediate winning threat most of the time (blocks only ~25% of the time). Beatable, not free.
3. **Unbeatable mode** — perfect minimax with alpha-beta pruning; provably never loses (as either side); best result for the player is a draw.
4. **Difficulty switch** — two pills (Easy / Unbeatable); switching resets the board and keeps the score tally intact.
5. **Who starts toggle** — "You start" / "AI starts" pills; applies on next round. Default: player starts.
6. **Win/Loss/Draw tally + round counter** — persistent session scoreboard (W / L / D); round number increments per completed round; lifetime stats (per difficulty) persist in `localStorage`.
7. **End-of-round states** — winning line highlighted in brass (or red tint on loss); status line announces "You win", "AI wins", or "Draw"; a subtle board shake on loss, fade-in on marks.
8. **New round + reset stats** — "New round" button (board only); "Reset stats" link clears tally and localStorage.

**Out of scope**: sounds, online multiplayer, larger boards, timed play, animated thinking dots beyond a simple status pulse, move history/undo.

## Design
- Top to bottom: studio topbar → `h1` "Tic-Tac-Toe vs AI" → quotable definition paragraph (GEO) → game card containing: scoreboard row (You / Draws / AI counts + round #), board (CSS grid 3×3, responsive cells `clamp(84px, 26vw, 128px)`), status line, controls row (difficulty pills, starter pills, new-round button), reset-stats link → short "how it works" note (one line each: easy = mistakes, unbeatable = minimax).
- Marks: X drawn as two brass strokes via SVG/CSS (not font glyphs) for crispness; O as a soft-white ring. Marks fade/pop in on placement; winning line gets a brass underline/highlight; losing line gets a faint red wash; drawn board cells dim slightly.
- States: ready (board empty, status "Your move"), AI thinking (cells temporarily non-interactive, status "AI is thinking…"), won (brass win-line + status), lost (red wash + board shake), draw (dim + status). Difficulty change resets to ready; starter change applies from next round.
- Mobile: board cells sized in vw, tap targets ≥ 84px, everything stacked vertically; no hover-dependent affordances.
- Visual: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accent, generous whitespace, thin `rgba(255,255,255,.09)` borders; X in brass, O in off-white `#f2efe6`.

## Acceptance criteria
- A user can complete a full round vs Easy: placing X on three in a row wins, the winning line highlights brass, and the tally increments.
- Unbeatable mode: 200+ simulated games vs random play (minimax as either side) produce zero minimax losses; this is verified in node before shipping.
- Switching difficulty resets the board immediately; the score tally is preserved; localStorage stats survive a page reload.
- The starter toggle is honored: with "AI starts", the AI places the first mark before the player can move.
- Single self-contained `index.html`, exactly one `h1`, canonical + WebApplication JSON-LD + definition paragraph present, zero images or all with `alt`.
