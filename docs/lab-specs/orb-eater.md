# Orb Eater — build spec

Idea: `orb-eater` · "Orb Eater" · tagline: "Eat or be eaten in a petri dish arena."

## Concept

Orb Eater is a free online agar.io-style arena game that runs entirely in
the browser. You are a single glowing orb in a petri dish, steered by mouse,
touch or keyboard: eat the drifting pellets and any orb smaller than you to
grow, and dodge anything bigger, because one touch from a larger orb ends
your run. Enemy orbs hunt, flee and grow by the same rules, and the arena
gets hungrier the longer you survive, so every run is a short, tense
risk-versus-reward loop — grab a pellet in the open, or gamble on a smaller
orb near a giant? The whole game is one self-contained page with no
downloads, accounts or server: your best score is saved locally.

## Feature list (MVP, in priority order)

1. **Canvas arena with camera follow** — a world (2400 × 2400) larger than
   the viewport, rendered on `<canvas>` with a camera centred on the player
   (clamped to the world edges), a subtle grid and soft vignette so the
   dish reads as a petri dish. The canvas resizes to its container and
   honours `devicePixelRatio` (capped at 2).
2. **Player steering** — the orb accelerates toward the pointer
   (mouse move / touch drag) with smooth easing; arrow keys / WASD steer
   in the pointer's absence. Speed falls as the orb grows (big orbs are
   slower), so growth is a trade-off, not a free win.
3. **Pellets** — ~220 small food dots scattered across the world, each
   worth score and a little mass. Eaten pellets respawn elsewhere after a
   short delay, so the arena never runs dry.
4. **Enemy orbs with simple AI** — 12 enemies spawn at random sizes.
   Each frame an enemy picks the nearest edible target (pellet or smaller
   orb) and chases it, or flees from the nearest larger orb (including the
   player) when one is close. Enemies eat pellets and each other by the
   same rules as the player, and grow or die accordingly; dead enemies
   respawn after a delay at a size scaled to the player's size so the
   arena stays fair.
5. **Eating and growth rules (shared by player and enemies)** — an orb
   can eat another orb when its radius is at least 10% larger than the
   victim's (`eater.r > victim.r * 1.1`) and the centres overlap by more
   than the radius difference. Mass is conserved by area: the eater gains
   a fraction of the victim's area. Score equals mass eaten, plus a
   survival bonus of 1 point per second alive.
6. **HUD, timer and scoring** — live score, current size, elapsed time
   and best score (localStorage `orb-eater-best`) shown above the arena;
   the timer counts up from the moment a run starts.
7. **Game states: start / playing / paused / game over** — a start
   overlay with the rules and a Start button (the empty state); Pause
   button plus `P` / `Esc` to pause and resume; when a larger enemy eats
   the player, a game-over overlay shows final score, time survived,
   orbs eaten and pellets eaten, a "New best!" badge when applicable, and
   a Play again button. Restart resets the world cleanly.
8. **Difficulty and sound** — a difficulty select (Chill / Classic /
   Spicy) that scales enemy speed, aggression and spawn size, applied on
   the next run; a sound toggle (default on) for tiny WebAudio blips on
   eating, with no audio files and no autoplay before the first user
   gesture.

### Out of scope (this version)

- Splitting, ejecting mass, viruses or teams (classic agar.io extras).
- Multiplayer or leaderboards — single-player only, best score is local.
- Skins, custom orb names or cosmetics.
- Pause-on-tab-hide beyond the manual pause (the game does pause when
  the tab is hidden, as a safety net only).
- Touch joystick UI — touch drag steers directly, which is enough on
  mobile.

## Design

Page structure, top to bottom:

1. Eyebrow ("Shipwright Studio · Lab"), `h1` "Orb Eater", and the
   quotable definition paragraph.
2. **HUD bar** (panel strip): Score, Size, Time, Best — four stat tiles;
   below them the controls row: difficulty select, sound toggle, Pause
   button, Restart button.
3. **Arena card** (panel): the `<canvas>` (16:10 aspect, max-width
   900 px) with three absolutely-positioned overlays inside it:
   - **Start overlay** (empty state): title, one-line rules, "Start
     game" primary button, best score line when one exists.
   - **Paused overlay**: "Paused" and a Resume button.
   - **Game-over overlay**: "Eaten!", final stats grid (score, time,
     orbs eaten, pellets eaten), "New best!" badge when applicable, and
     a "Play again" primary button.
   A small hint line under the canvas ("Steer with mouse, touch or
   arrow keys — eat smaller, dodge bigger").
4. **How to play** section: 3 short paragraphs (the eating rule and
   why size slows you down, how enemy AI behaves, difficulty and the
   local best score).
5. Back link to `/ideas/` and the footer.

Key interactions and states:

- **Empty**: before Start, the canvas shows the dish with pellets and
  drifting enemies in a slow "attract" mode behind the start overlay;
  HUD reads 0; Pause/Restart disabled.
- **Active**: pointer/touch/keys steer the player; pellets pop with a
  small ring effect on being eaten; enemies visibly chase and flee;
  the HUD updates every frame; the player slowly loses a little mass
  over time (0.15% per second) so sitting still is never free.
- **Success**: surviving and growing — score and size climb, the
  difficulty ramps (enemy speed and aggression rise slightly with
  elapsed time); a new best is written to localStorage the moment it is
  passed and the Best tile updates live.
- **Error**: being eaten ends the run — the game-over overlay appears
  with final stats; the canvas keeps rendering the arena behind it.
  Restart resets score, timer, player size and the whole world. If
  localStorage is unavailable, best score simply shows 0 and nothing
  breaks.

Visual treatment: dark premium studio aesthetic — background `#0a0c0f`,
panels `#11141a` with `#232a35` borders, Fraunces serif headings, brass
`#d2a24c` accents, Inter body text, generous whitespace, centred column
(max-width 900 px). The arena is a deep teal-black dish with a faint
grid, glowing pellets (brass, teal, rose), the player orb in brass with
a soft glow and a subtle face (two eyes that look toward the movement
direction), enemies in muted teal/rose/violet with a thin rim. Pellets
and orbs get a gentle pulse; eaten pellets leave a fading ring.

Mobile considerations: the canvas fills the card width and keeps its
aspect; touch drag steers (touch-action none on the canvas); controls
wrap; HUD tiles shrink to two columns; overlays and buttons are
thumb-sized; the game pauses automatically when the tab is hidden.

## Acceptance criteria

1. A user can start a run, steer the orb with mouse, touch or keyboard,
   eat pellets and smaller orbs to grow, and see score, size and time
   update live.
2. A larger enemy orb touching the player ends the run with a game-over
   overlay showing final score, time, orbs eaten and pellets eaten, and
   a working Play again button.
3. Enemy orbs chase smaller targets, flee larger ones, eat pellets and
   each other, and respawn at a fair size; pellets respawn after being
   eaten.
4. Pause/resume works from the button and from `P` / `Esc`; difficulty
   changes the enemy behaviour on the next run; the best score persists
   across page reloads via localStorage.
5. The page passes the repo SEO rules: unique title/description,
   canonical URL, exactly one `h1`, WebApplication JSON-LD, `alt` text on
   images, no `mailto:` anywhere; the eating/growth/collision/AI rules
   are validated by node assertions.
