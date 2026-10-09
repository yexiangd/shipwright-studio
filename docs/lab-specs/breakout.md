# Breakout — Build Spec

## Concept

Breakout is the classic brick-breaker rebuilt as a single self-contained
web page: one paddle, ninety bricks, endless satisfaction. Move the paddle
with mouse, arrow keys, or touch; smash the ball through five rows of
brass-toned bricks that take color and speed as you clear levels. High
score persists locally, and the game runs at a fixed timestep so physics
feel identical on any display.

## Feature list

1. Canvas playfield (aspect 4:3, max ~640×480) with dark surface and subtle frame.
2. Paddle control: mouse follow, arrow keys / A-D, touch drag; keyboard velocity with smoothing.
3. Ball: fixed-timestep physics, paddle-angle bounce (offset from center steers), capped ball speed.
4. Ninety bricks: 5 rows × 18 cols; rows worth 1/2/3/5/8 points top-down (classic scoring); brass/honey color gradient by row.
5. Three lives; life lost on ball passing the paddle; game-over overlay with score and restart.
6. Level system: clearing all bricks raises the level, ball speeds up 8%, bricks re-spawn.
7. Score + best score (localStorage) pills; "NEW BEST" badge on game-over when beaten.
8. Pause on blur and with P / Space; start overlay ("Move or press Space").
9. Paddle shrink twist: at level 3+ the paddle narrows 15% — the "endless satisfaction" gets harder.
10. Sound: none (kept quiet deliberately; mobile-friendly).

Out of scope: power-ups, multiple ball types, particles beyond a small trail, online leaderboard.

## Design

Top to bottom: topbar (← Lab / Shipwright Studio brand), `h1` "Breakout",
quotable definition paragraph (GEO), stats row (Score / Best / Level / Lives pills),
canvas stage (dark `#10141a`, 1px frame), controls hint
("Mouse · Arrows · Touch"), footer note: "Ninety bricks. The paddle never sleeps."

Visual: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` palette —
bricks shift from dim `#6d5a35` at the bottom row to bright `#e8c76a` at the
top; ball in brass, paddle in warm ivory `#f2efe6`. Mono font for stats.

Mobile: canvas scales to viewport (`width:100%; height:auto`),
`touch-action: none`; touch drag controls paddle directly.

States: empty (start overlay), active (ball in play), serving (ball glued to
paddle until launch), paused (overlay), game over (overlay + score + restart),
level clear (brief banner "Level N — faster").

## Acceptance criteria

- A user can launch the ball, bounce it off walls/paddle/bricks, destroy
  bricks for points, lose lives, clear a level, and restart — via mouse,
  keyboard, or touch.
- Paddle bounce angle depends on hit offset (center = straight, edges =
  sharper), verifiably in the physics function.
- Score awards 8/5/3/2/1 per row top→bottom; best score persists across
  reloads; clearing all 90 bricks advances the level and raises ball speed.
- Game auto-pauses when the tab loses focus; P/Space toggles pause.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies.
