# Build spec — Maze Lab

## Concept

Maze Lab is a free online maze generator and solver: it draws a fresh
perfect maze on a canvas and then animates the A* search algorithm finding
its way from the top-left corner to the bottom-right. It is for students
learning pathfinding, developers who want an intuition for A*, and anyone
who likes watching an algorithm think. It is delightful because the search
frontier visibly floods the maze, dead ends are pruned, and the final
shortest path snaps into brass — the difference between "explored" and
"optimal" is something you see, not just read about.

## Feature list (MVP, in priority order)

1. **Maze generation** — recursive-backtracker generation on a cell grid,
   producing a perfect maze (exactly one path between any two cells, no
   loops, no isolated cells). Size selector: Small (15×15), Medium
   (21×21), Large (31×31). "New maze" regenerates instantly.
2. **A* solve animation** — pressing "Solve" runs A* (Manhattan-distance
   heuristic, 4-neighbour moves) step by step on the canvas: visited
   cells shade muted, the current frontier shades lighter, and on
   completion the shortest path draws in brass. A speed selector
   (Slow / Normal / Fast) controls the animation interval.
3. **Instant solve** — "Solve instantly" skips the animation and shows
   the final visited set and path at once, for large mazes or impatient
   users.
4. **Live stats** — cells visited, path length (in steps), maze size,
   and solve state (Ready / Searching… / Solved / No path — the last
   never occurs for a perfect maze, but the state exists). Stats update
   when the animation finishes and for instant solves.
5. **Controls and legend** — buttons: New maze, Solve, Solve instantly,
   Clear solution (keeps the maze, wipes visited/path/stats). A legend
   explains start (green), goal (red), visited, frontier, and path
   colours. Solving disables Solve/Generate until finished or cleared,
   so the animation cannot be double-started.
6. **How A* works explainer** — a short collapsible section in plain
   words: f = g + h, g is steps taken, h is Manhattan distance to the
   goal, the frontier always expands the lowest-f cell first.

Out of scope for this version: other solvers (BFS, Dijkstra, DFS) as
selectable algorithms, user-drawn walls, maze saving/sharing, seeded
mazes via URL, or sound.

## Design

Page structure top to bottom: nav (Shipwright Studio / Lab), eyebrow
"Lab — Games & algorithms", h1 "Maze Lab", quotable definition
paragraph, controls card (size selector, speed selector, four buttons),
canvas card (maze canvas, square, dark background, walls in light
grey, legend row beneath), stats card (four tiles: Maze size, Cells
visited, Path length, Status), "How A* works" explainer, footer
("Built by Shipwright Studio" + back to /ideas/).
Key interactions and states: empty/ready state — maze drawn, stats
show size and "Ready", visited/path 0; active state — frontier and
visited cells colour in as the timer ticks, stats show "Searching…";
success state — path in brass, stats filled, status "Solved";
error state — none reachable (perfect mazes always have a path), but
the status line reports it if the solver ever returns empty.
Visual treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c`
path, muted slate visited cells, start/goal markers; canvas scales to
its card width while keeping square cells.
Mobile: controls wrap into two rows, canvas full width, stats grid
2 columns.

## Acceptance criteria

- A user can generate a new maze at three sizes and always gets a
  fully connected maze (A* finds a path from start to goal every time).
- A user can watch A* solve step by step, with visited cells, frontier
  cells, and the final shortest path visually distinct.
- A user can solve instantly and see the same final path and correct
  path-length stat as the animated solve.
- A user can clear the solution and re-solve the same maze.
- The page has exactly one h1, a unique title and description, a
  canonical link, a quotable definition paragraph, and a WebApplication
  JSON-LD block.
