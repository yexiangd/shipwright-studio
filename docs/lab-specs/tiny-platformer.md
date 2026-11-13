# Tiny Platformer — Build Spec

## Concept

Tiny Platformer is a free online canvas platformer: run, jump, wall-slide, and wall-jump through 12 hand-made levels, collecting coins and gems and racing the clock to reach each goal flag.

It is for anyone who wants a quick precision-platformer fix in the browser — no install, no account, no downloads. Each level is a compact tile map designed around one movement idea (gaps, spikes, one-way platforms, wall-jump shafts), with a per-level timer, death counter, and best times saved locally so repeat runs feel like speedrunning.

## Feature list (MVP, in priority order)

1. **12 hand-made levels** — compact tile maps in JS (`#` solid, `=` one-way platform, `^` spikes, `o` coin, `*` gem, `S` spawn, `G` goal), each with a name and a distinct movement theme, all reachable and verified by an automated reachability search: a BFS over standable cells whose transitions are scripted input macros (walk, jump with early/full release, run-up jumps, chained wall-jump presses) run through the real in-page physics step function. Design rule learned during verification: no jumpable platform may sit at row 2 — the ceiling row kills the jump arc — so the highest platforms sit at row 3 or lower.
2. **Movement: run, jump, wall-slide, wall-jump** — acceleration-based horizontal movement, variable jump height (hold to jump higher), coyote time and jump buffering for forgiving controls, wall-slide that caps fall speed when pressing toward a wall, and wall-jump that pushes away from the wall.
3. **Keyboard + touch controls** — Arrow keys / WASD to move, Space / ArrowUp / W to jump, R to restart the level, P to pause; on-screen ◀ ▶ and JUMP buttons (≥44px tap targets) for touch devices.
4. **Coins and gems** — coins scattered along the natural path, one gem per level placed on a riskier route; collected counts shown in the HUD and saved per level.
5. **Timer and deaths** — per-level timer (starts on first input, runs across deaths), death counter; spikes or falling out of the world respawns the player at the spawn with a brief flash.
6. **Level select** — grid of 12 level buttons with best time and gem status per level; all levels unlocked from the start.
7. **Best times in localStorage** — best time and gem-collected state per level (`tp_best_<n>`, `tp_gem_<n>`); a "New best!" badge on the level-clear overlay when beaten.
8. **Win states** — level-clear overlay (time, best, coins, gem, Next / Replay / Levels buttons); an all-levels-complete banner on the level select plus a completion overlay after finishing level 12 when every level has a best time.

Out of scope for this version: enemies or moving hazards, moving platforms, checkpoints inside a level, a level editor, leaderboards or any server-side state, sound beyond tiny WebAudio beeps (with an M mute toggle), and gamepad support.

## Design

Page structure, top to bottom:

1. **Header** — studio masthead (small "Shipwright Studio" wordmark linking to `/`), then `h1` "Tiny Platformer".
2. **Summary paragraph** — one quotable definition sentence ("Tiny Platformer is a free online tool that …").
3. **HUD bar** — level name, timer, deaths, coins (x/total), gem indicator, best time; Pause and Restart buttons.
4. **Game canvas** — 960×480 internal resolution, scaled by CSS to fit the container; dark stage, brass player, gold coins, cyan gems, brass goal flag.
5. **Touch controls** — on-screen ◀ ▶ (left) and JUMP (right) buttons, shown always but primarily for touch; keyboard hint line under the canvas on desktop ("← → / A D move · Space jump · wall-slide by holding toward a wall · R restart · P pause").
6. **Level select** — grid of 12 buttons (level number, name, best time or "—", gem dot if collected); "All 12 levels complete" banner appears here once every level has a best time.
7. **Overlays (inside the canvas area)** — start prompt ("Press any key or tap to start"), pause overlay, level-clear overlay, all-complete overlay. Only one visible at a time.
8. **How to play** — short section explaining the four moves and the goal, plus a note that best times are stored only in the browser.
9. **Footer** — "Built by Shipwright Studio" linking back to `/ideas/`.

Key interactions and states:

- **Idle / start**: canvas shows the level with the player at spawn; timer reads 0:00.00 and does not run until the first move/jump input; start prompt overlay visible.
- **Active**: timer runs; HUD updates on coin/gem pickup (coin pops with a small particle burst and a beep); gem pickup shows a "Gem!" flash in the HUD.
- **Death**: spikes or falling below the world flash the screen red, deaths +1, player respawns at the spawn after a short delay; timer keeps running.
- **Level clear**: touching the goal freezes play and shows the overlay with time, best time (and "New best!" when beaten), coins collected, gem status, and Next / Replay / Levels buttons.
- **All complete**: after clearing level 12 with all 12 levels having best times, the overlay adds "You finished all 12 levels!" and the level-select banner appears.
- **Pause**: P or the Pause button freezes the loop and shows the pause overlay; Resume / Restart / Levels buttons.
- **Error/edge**: localStorage unavailable (private mode) — best times simply don't persist, with no error shown; canvas unsupported — a plain message replaces the canvas ("This demo needs a browser with canvas support.").

Visual treatment: dark premium background `#0a0c0f`, Fraunces serif headings, brass accent `#d2a24c`, generous whitespace, hairline borders (`#1e242c`), muted secondary text (`#9aa3ad`). Tiles are flat dark slabs with a subtle top highlight; the player is a solid brass rounded square with two eyes; the goal is a brass flag on a pole; coins are gold circles with a darker rim; gems are cyan diamonds. No external images.

Mobile considerations: canvas scales to container width (aspect ratio preserved); touch buttons are large (≥56px) and use `touchstart`/`touchend` with `preventDefault` so the page doesn't scroll; the HUD wraps; the level-select grid collapses to 3 columns on narrow screens; the game is playable in portrait, though landscape is more comfortable.

## Acceptance criteria

1. A user can move, jump, wall-slide, and wall-jump with keyboard or touch controls, and reach the goal of every one of the 12 levels (verified by an automated physics reachability check).
2. A user can collect coins and the gem in a level, see the counts and timer update live, and see deaths increment on spikes or falls.
3. A user can pick any of the 12 levels from the level select, and can see their best time and gem status per level after playing.
4. A user sees a level-clear overlay on reaching the goal, and an all-levels-complete state once all 12 levels have best times.
5. The page works with no external JavaScript, contains exactly one `h1`, has the required SEO tags (title, description, canonical, JSON-LD), and contains no email addresses, `mailto:` links, or secrets.
