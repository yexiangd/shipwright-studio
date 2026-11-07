# Build spec — Pipe Loop

## Concept

Pipe Loop is a free online pipe-connection puzzle game: a grid of pipe
tiles is dealt in random rotations, and the player clicks each tile to
rotate it 90° at a time until every pipe joins into one single network.
It is for anyone who likes a quiet, spatial puzzle — the same itch as
Net or a plumbing puzzle, with no timer pressure unless the player wants
it. It is delightful because the network visibly lights up as it grows:
each rotation can snap a whole branch into brass, so progress is
something you see spread across the board, not just a number going up.

## Feature list (MVP, in priority order)

1. **Solvable puzzle generation** — a randomised depth-first spanning
   tree over the grid defines the solved layout (tile shapes follow each
   cell's degree: end cap, straight, corner, T-junction, cross); every
   tile is then rotated by a random amount. The shuffled board is
   re-rolled if it happens to already be solved, so every deal is a
   real puzzle.
2. **Rotate on click / tap** — clicking (or tapping, or pressing Enter /
   Space on a focused tile) rotates that tile 90° clockwise with a
   short CSS transition. Tiles are keyboard-focusable buttons.
3. **Live network highlight** — after every rotation, the largest
   connected component (pipes whose openings face each other) is drawn
   in brass; disconnected pipes stay muted slate. The player can watch
   the network grow and spot the loose ends. A status line under the
   board reports the size of the connected network ("Connected: 14 /
   25").
4. **Win detection (BFS)** — after every rotation, a breadth-first
   search checks two conditions: every tile is reachable through
   matched openings, and no opening faces a wall, the grid edge, or a
   closed side. When both hold, the board is won.
5. **Moves counter and timer** — moves count every rotation; the timer
   starts on the first rotation and stops on the win, displayed as
   mm:ss. Both are shown in the HUD and in the win message.
6. **Difficulty selector** — three grid sizes: Easy 5×5, Medium 7×7,
   Hard 9×9. Switching size starts a fresh puzzle at that size.
7. **New Game + win state** — "New Game" deals a fresh puzzle at the
   current size. On a win, a success banner appears over the board
   ("Loop complete") with moves, time, and a "Play again" button that
   deals a new puzzle.
8. **How to play explainer** — a short section under the board:
   click to rotate, match every opening, the whole grid must be one
   connected network with no loose ends.

Out of scope for this version: a "solve / peek" button, hint system,
move undo, best-time records in localStorage, sound, seeded puzzles
via URL, or tiles beyond the five shapes (cap, straight, corner, T,
cross).

## Design

Page structure top to bottom: nav (Shipwright Studio / Lab), eyebrow
"Lab — Games", h1 "Pipe Loop", quotable definition paragraph, HUD
card (difficulty pills, moves counter, timer, New Game button), board
card (the grid of SVG pipe tiles, square, centred, with a status line
beneath reporting the connected-network size), win banner
(hidden until won, overlaid on the board card), "How to play"
explainer, footer ("Built by Shipwright Studio" + back to /ideas/).
Key interactions and states: empty/ready state — fresh shuffled board,
moves 0, timer 00:00, no tiles highlighted beyond the largest
component; active state — tile rotates on click with a 120 ms turn,
largest component re-colours in brass, moves and timer tick; success
state — all pipes brass, board dims slightly, win banner shows moves
and time with a Play again button; error state — none reachable (every
deal is solvable by construction); a rotation that leaves an opening
facing the grid edge or a closed side is simply a loose end, shown by
the tile staying muted.
Visual treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c`
for the connected network and accents, muted slate `#8a93a3` for
unconnected pipes, tiles on `#10141a` cards with hairline borders;
pipes drawn as inline SVG strokes with round caps, tile rotation via
CSS `transform` on the SVG.
Mobile: board scales to the card width (cells shrink via CSS grid,
minimum tap target preserved by the grid filling the width), HUD wraps
into two rows, difficulty pills stay tappable.

## Acceptance criteria

- A user can start a new puzzle at 5×5, 7×7, or 9×9 and always gets
  a solvable board (the generated layout is connected before shuffling,
  and the shuffled board is never already solved).
- A user can click, tap, or keyboard-rotate any tile 90° clockwise,
  and the connected network re-highlights in brass after every move.
- A user can win: when every opening is matched and the whole grid is
  one connected network, the win banner appears with the correct moves
  and time, and Play again deals a fresh puzzle.
- Moves count every rotation; the timer starts on the first rotation
  and stops on the win.
- The page has exactly one h1, a unique title and description, a
  canonical link, a quotable definition paragraph, and a WebApplication
  JSON-LD block.
