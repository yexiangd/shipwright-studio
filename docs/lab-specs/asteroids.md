# Asteroids — build spec

- Slug: `asteroids`
- Idea: idea-024, "Asteroids", category game, tagline "Vector-style space rocks, inertia included."
- Status: doing → done on ship
- Page: `lab/asteroids/index.html`

## Concept

Asteroids is a free online arcade game that recreates the 1979 vector classic: pilot a lone triangular ship through a drifting field of tumbling rocks, with real inertia — thrust only accelerates you, and stopping takes counter-thrust. It is for anyone who wants a quick, skill-based arcade break in the browser, no install and no account. It is delightful because the physics feel honest: every shot, drift, and near-miss is yours, the rocks split under fire, and each cleared field comes back bigger and faster.

## Feature list (MVP, priority order)

1. **Canvas game field** — a single `<canvas>` (fixed logical size 800×600, scaled to fit) rendering everything as crisp vector outlines in brass and off-white on the dark background: ship, rocks, bullets, particles, and a starfield backdrop.
2. **Ship controls** — rotate left/right (←/→ or A/D), thrust (↑ or W, with a visible flame), shoot (Space), and hyperspace (Shift or H, with a small chance of exploding). Touch buttons for mobile: rotate left/right, thrust, fire, hyperspace.
3. **Inertia / drift physics** — thrust accelerates the ship along its heading; a small drag (0.995 per frame) keeps speed bounded but never stops the ship by itself; the ship wraps around the screen edges. Rocks drift in straight lines at constant velocity, wrap at edges, and tumble (rotate).
4. **Asteroids and splitting** — large rocks (radius ~52) split into 2 medium rocks (~30) when shot, medium split into 2 small (~16), small rocks are destroyed. A destroyed rock spawns a short particle burst. New levels spawn 4 + level rocks, with higher base speed as the level rises.
5. **Score, lives, levels, high score** — large rock 20 points, medium 50, small 100; level bonus 250 × level on clearing a field; 3 lives, brief invulnerability (with blinking) after respawn in the centre when the area is clear of rocks; game over screen with final score and restart; best score saved in localStorage.
6. **HUD and overlays** — score, level, lives (drawn as small ship icons), and best score in a bar above the canvas; a start overlay ("Press Enter or tap Start"), a level-clear banner, and a game-over overlay with restart button.
7. **Collision rules** — bullet–rock and ship–rock collisions use circle tests; ship destroyed on contact (unless invulnerable); bullets expire after a fixed lifetime and a max of 4 are on screen at once.
8. **Pause and sound-free feedback** — P (or the pause button) pauses the game with a visible "Paused" state; all feedback is visual (flashes, particles, blinking), no audio.

Out of scope for this version: sound effects / music, UFO enemies, multiplayer or leaderboards, difficulty settings, particle-based ship explosion animation beyond a burst, saving progress across sessions beyond the best score.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as px-rem).
2. Eyebrow: `Lab — Game`.
3. `h1`: Asteroids.
4. Definition paragraph (`.define`): "Asteroids is a free online game that …" — one quotable summary sentence set for AI answer engines.
5. HUD bar (`.hud`, UI font): score, level, lives (small ship glyphs), and best score; a pause button on the right.
6. Game card (`.card`): the canvas, focusable with keyboard hints beneath; touch controls below the canvas, shown on coarse pointers (and always usable).
7. Overlays drawn inside the canvas via DOM overlays (`.overlay`): start screen, level-clear banner, game over — each with a brass button (Start / Play again). Buttons are real DOM elements so they work with touch and keyboard.
8. "How to play" card: 4 short bullets — controls, inertia tip, scoring table (large 20 / medium 50 / small 100), hyperspace risk.
9. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty / start**: before the first game, the canvas shows the starfield and a few drifting rocks behind the start overlay; no lives are lost, no score.
- **Active**: ship rotates, thrusts (flame shown), fires (bullet from the nose, capped at 4); rocks drift and tumble; score and level update live; HUD lives update on death; respawn is delayed 1.2 s, then the ship blinks for 2 s of invulnerability.
- **Success**: when the last rock is destroyed, a "Level clear — bonus +N" banner shows for 2 s, then the next level spawns with more and faster rocks.
- **Error / game over**: on the last life, the game stops, the overlay shows the final score, the best score (with "New best!" when beaten), and a Play again button; Enter or Space restarts.
- **Paused**: P or the pause button freezes the loop and shows a "Paused — press P to resume" overlay; the loop does not advance while paused.

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings, system sans for UI labels, JetBrains Mono for score/HUD numbers; generous whitespace, max-width 960px, centred. The game is drawn in 1.5px vector strokes: ship and bullets in off-white, rocks in muted grey-white with irregular polygon outlines, thrust flame and score flashes in brass. Subtle starfield (80 fixed stars, varying alpha).

Mobile: canvas scales to container width (CSS `width:100%`, aspect preserved via the logical 800×600); touch buttons are large (min 56px), laid out in two groups (rotate left/right on the left, thrust/fire/hyperspace on the right); keyboard hints hidden on touch devices; the page does not scroll while a touch button is held (touch-action: none on the canvas and buttons).

## Acceptance criteria

1. A user can rotate, thrust, and shoot with the keyboard (arrows/WASD + Space) and with the touch buttons; the ship accelerates along its heading and keeps drifting when thrust stops.
2. A user can destroy a large rock and see it split into 2 medium rocks (and medium into 2 small); points are awarded 20 / 50 / 100 and the score in the HUD updates.
3. A user loses a life on ship–rock contact, respawns after a short delay with temporary invulnerability, and sees game over with the final score and a working restart after the third life.
4. Clearing a field advances the level with more and faster rocks, and the best score persists across reloads via localStorage.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (thrust, drag, wrap, bullet–rock collision, rock splitting, score values, level rock counts) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
- Physics constants: thrust accel 0.12 px/frame², drag 0.995, rotation 0.09 rad/frame, bullet speed 7 px/frame, bullet life 55 frames, max bullets 4, fire cooldown 12 frames, ship radius 10, rock radii 52/30/16, rock score 20/50/100, invulnerability 120 frames, respawn delay 72 frames.
- Hyperspace: teleports the ship to a random position with zero velocity; 15% chance the ship is destroyed on re-entry.
- Level N spawns 3 + N rocks (level 1 = 4) with base speed 0.4 + 0.15 × (N − 1), capped at 2.2; rock speed also scales slightly with size (smaller rocks move a bit faster).
