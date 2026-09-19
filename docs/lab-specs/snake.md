# Snake — Build Spec

## Concept

Snake is the classic arcade game rebuilt for the browser with a punishing
speed curve: every food pellet you eat makes the snake faster, so greed is
literally the difficulty setting. One page, one game loop — no installs, no
accounts. Best score persists locally, and the game is fully playable with
arrow keys/WASD on desktop or swipe on mobile.

## Feature list

1. 20×20 canvas grid with dark surface and subtle grid lines.
2. Arrow keys + WASD steering; direction queue (buffer up to 2 queued turns so fast inputs don't eat themselves).
3. Speed curve: starts at 8 ticks/sec, +0.25 ticks/sec per pellet, capped at 20 ticks/sec — displayed as "Speed".
4. Score = pellets eaten; best score persisted in localStorage, shown next to live score.
5. Death conditions: wall collision and self collision; death flashes the board and shows an overlay with score/best and Restart.
6. Pause on blur (tab switch) and with P / Space; pause overlay. Start overlay ("Press any arrow or tap Start").
7. Touch controls: swipe on canvas steers; an on-screen Start/Restart button for mobile.
8. Reduced motion: none needed beyond canvas, but the death flash is a single frame change (no strobing sequences).

Out of scope: obstacles/portals modes, multiplayer, food types, sound, online leaderboard.

## Design

Top to bottom: topbar (← Lab / Shipwright Studio brand), `h1` "Snake",
quotable definition paragraph (GEO), stats row (Score / Best / Speed pills),
canvas panel (square, surface `#10141a`, brass snake, dim red food), controls
row (Start/Pause/Restart buttons + "Arrows / WASD · swipe on mobile" hint),
footer note about the speed curve.

Visual treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` snake
with a slightly darker head, food in muted red `#e0655f`. Mono font for
score/speed. Board max ~560px square, centered.

Mobile: canvas scales to viewport width via CSS (`width: 100%; height: auto`),
touch-action none on canvas; swipe detection with a 24px threshold; stats
wrap.

States: empty (start overlay over empty board), active (loop running, speed
pill updates), paused (overlay, "Paused — press P to resume"), success is
just beating the best score (badge "NEW BEST" on game-over panel), death
(game-over overlay).

## Acceptance criteria

- A user can start, steer, eat food, grow, speed up, die on wall/self collision, and restart — all on keyboard or swipe.
- Speed increases measurably per pellet (starts 8 t/s, +0.25/pellet, caps at 20 t/s) and the Speed pill reflects it.
- Best score persists across reloads; a "NEW BEST" indicator shows when the player beats it.
- Game auto-pauses when the tab loses focus; P/Space toggles pause.
- Exactly one `h1`, canonical link, meta description, and a WebApplication JSON-LD block are present; no external JS dependencies.
