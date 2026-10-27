# Build spec — Game of Life

## Concept

Game of Life is Conway's cellular automaton as a paintable, mesmerizing
toy: a grid of cells lives or dies by two simple rules, and from those
rules emerge gliders, oscillators, and guns that run forever. It is for
anyone who wants to play with emergence — paint a few cells, press Play,
and watch order (or chaos) unfold — without installing anything or
signing up. It is delightful because the interaction is immediate:
drawing feels like sketching, and the famous patterns (a glider sliding
across the board, the Gosper Glider Gun firing forever) reward a single
click with a show that never repeats itself exactly.

## Feature list (MVP, in priority order)

1. **Paintable canvas grid** — a 48 × 32 cell grid rendered on a
   `<canvas>`. Paint cells alive or erase them by click-drag (mouse) or
   touch-drag; a tap (no drag) toggles the tapped cell. A Paint / Erase
   brush selector controls what dragging applies.
2. **Conway rules, B3/S23** — a live cell survives with 2 or 3 live
   neighbours, otherwise dies; a dead cell becomes alive with exactly 3
   live neighbours. Stepping is double-buffered so every cell updates
   from the same generation.
3. **Play / Pause, Step, Clear** — Play runs the simulation at the
   chosen speed; Pause freezes it; Step advances exactly one generation
   (and pauses, so a single step is inspectable); Clear empties the
   board and resets the generation counter to 0.
4. **Pattern presets** — six one-click patterns, loaded onto a cleared
   board centred on the grid with the generation counter reset to 0 and
   playback paused so the pattern can be inspected before pressing
   Play: Glider, Blinker, Toad, Beacon, Pulsar, Gosper Glider Gun.
5. **Randomise with density control** — fills the board with a random
   scatter at the density set by a slider (10–50%, default 25%),
   resets the generation counter to 0, and pauses playback.
6. **Speed control** — a slider from 1 to 20 generations per second
   (default 8) that takes effect immediately, including mid-playback.
7. **Wrap-around (toroidal) toggle** — when on (default), neighbours
   wrap across edges so gliders loop forever; when off, edges are dead
   borders and patterns die at the boundary.
8. **Live counters and status** — a generation counter and a live-cell
   counter update every generation and every edit, plus a status line
   (empty / paused / playing / pattern-loaded feedback).

Out of scope for this version: custom rules (anything other than
B3/S23), variable grid sizes, saving or sharing boards (no server, no
persistence), pattern stamping at an arbitrary position (presets always
load centred on a cleared board), colouring cells by age, and any
network request beyond the font stylesheet.

## Design

Page structure, top to bottom:

1. Top nav: "Shipwright Studio" (home) and "Idea Lab" (`/ideas/`).
2. Eyebrow ("Lab · Game"), one `h1` ("Game of Life"), and a one-sentence
   definition paragraph ("Game of Life is a free online tool that …")
   for search and AI answer engines.
3. Controls card: a control row — Play/Pause button, Step button,
   Clear button, Randomise button with a density slider and value label
   — a second row — speed slider with value label, Wrap-around
   checkbox, Paint / Erase brush selector — and a stats line
   (Generation N · M live cells) plus a status line (empty / playing /
   paused / pattern-loaded feedback).
4. Canvas card: the 48 × 32 grid canvas (brass live cells on the dark
   grid, faint grid lines), followed by a preset row of six buttons
   (Glider, Blinker, Toad, Beacon, Pulsar, Gosper Glider Gun) and a
   hint line ("Drag to paint or erase · tap a cell to toggle it").
5. "How it works" explainer (collapsible): the B3/S23 rules in plain
   English, what wrap-around does, and the privacy note (everything
   runs locally in the browser).
6. Footer: "Built in the Shipwright Studio Lab · more experiments"
   linking to `/ideas/` (never to `/lab/`).

Key interactions and states:

- **Initial**: the page loads with a Glider centred on the board
  (generation 0, paused), so the first sight is a runnable pattern
  rather than a blank grid; the status reads "Glider loaded — press
  Play to watch it glide."
- **Empty** (board blank, not playing, e.g. after Clear): canvas shows only the faint
  grid; stats read "Generation 0 · 0 live cells"; status reads
  "Empty board — paint some cells, load a pattern, or randomise."
- **Active / painting**: dragging paints (Paint brush) or erases
  (Erase brush) every cell the pointer crosses; a tap with no drag
  toggles that one cell; counters update immediately on every edit.
- **Playing**: the Play button becomes Pause; each generation advances
  on a timer at the speed-slider rate; stats update every generation;
  painting while playing is allowed and takes effect on the next step.
- **Paused**: the timer stops; Step advances exactly one generation;
  loading a preset or randomising also pauses playback.
- **Success — pattern loaded**: status reads e.g. "Gosper Glider Gun
  loaded — press Play to watch it fire."; the board shows the pattern
  centred and the generation counter reads 0.
- **Error**: no error state is reachable in normal use — every control
  is safe on an empty board (Step on an empty board stays empty,
  Play on an empty board runs with zero live cells, Clear on an empty
  board is a no-op). Painting outside the canvas is ignored via
  coordinate clamping.

Visual treatment: studio aesthetic throughout — dark `#0a0c0f`
background, `#101318` cards with `#1c2128` borders, Fraunces serif
headings, brass `#d2a24c` accents (Play button, live cells, active
controls, headings), generous whitespace, sans-serif UI text for
controls, stats, and hints. Live cells are solid brass squares with a
small inset so the grid stays readable; dead cells are the panel
background with faint `#1c2128` grid lines.

Mobile considerations: the canvas scales to the full card width
(internal resolution fixed at 960 × 640, CSS width 100%, height auto)
so cells stay tappable on a phone; pointer events handle both mouse
and touch, with touch scrolling suppressed on the canvas while
painting; control rows wrap; buttons are at least 44 px tall.

## Acceptance criteria

1. A user can paint cells by dragging and toggle a cell by tapping,
   and the live-cell counter updates immediately on every edit.
2. The simulation follows B3/S23 exactly: a 2 × 2 block is unchanged
   after one step, a blinker returns to its starting shape after two
   steps, and a glider has moved one cell diagonally after four
   generations (verified by the node test, not just by eye).
3. Play/Pause, Step, Clear, Randomise (with density control), speed
   control, and the wrap-around toggle all work; loading any of the six
   presets shows that pattern centred on a cleared board with the
   generation counter reset to 0.
4. The empty, playing, paused, and pattern-loaded states show the
   correct status messages, and stepping or playing on an empty board
   never throws or mis-counts.
5. The page passes the house checks: exactly one `h1`, unique title
   "Game of Life · Shipwright Studio", one-sentence meta description,
   canonical link, WebApplication JSON-LD, no images (none used), no
   mail-to links, no email addresses, no secrets, and no network
   fetches in JavaScript.
