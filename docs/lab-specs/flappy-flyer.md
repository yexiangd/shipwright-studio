# Flappy Flyer — build spec

Slug: `flappy-flyer` · Tagline: "Tap to fly, thread the pipes, rage responsibly."

## Concept

Flappy Flyer is a one-button arcade game for the Lab's arcade corner: tap (or click, or press space) to flap, thread the gaps in oncoming pipes, and survive as long as you can. One point per pipe cleared; your best score persists in localStorage. The gap narrows and the world speeds up as your score climbs, so every run ends — the only question is how far you get. It's for anyone with sixty seconds to kill, delightful because it is buttery 60 fps, instantly restartable, and dressed in the studio's dark-night aesthetic: a brass bird against a starfield, pipes like brushed-steel columns. Everything runs locally, no assets, no network.

## Feature list (MVP, priority order)

1. **One-tap flap** — pointerdown anywhere on the canvas / Space / ArrowUp flaps; physics: gravity 1500 px/s², flap impulse −420 px/s, max fall speed capped at 560 px/s; integrated in fixed 1/120 s substeps so 60 Hz and 120 Hz displays produce identical trajectories.
2. **Procedural pipes** — pipe pairs spawn from the right every ~1.5 s; gap starts at 165 px and shrinks to a floor of 112 px by score 40; world speed starts at 190 px/s and rises to 300 px/s by score 40; pipe width 64 px; gap center randomized within safe bounds.
3. **Collision** — bird as a circle (r = 14) vs pipe rects and vs ceiling/floor; AABB-with-circle test; graze margin zero (fair hitboxes — the bird's visual matches its hit circle). Hitting the ceiling clamps the bird without death (classic behavior); pipes and the ground kill.
4. **Scoring** — +1 when a pipe pair's right edge passes the bird's x (exactly once per pair via a `passed` flag); score popup "+1" at the gap; best score in `localStorage` under `flappy-flyer-best`; "NEW BEST" flash when beaten.
5. **Game states** — `ready` (canvas shows "Tap to fly", bird bobbing), `playing`, `paused` (auto-pause on tab blur / visibilitychange, resume with tap), `gameover` (panel: score, best, "Fly again" button, tap-anywhere also restarts after 400 ms debounce).
6. **Difficulty ramp feedback** — subtle: a small "Level up" tick? No — keep it invisible except a HUD line under the score showing speed/gap at milestones? Keep scope: no explicit level UI; the ramp is felt. (This keeps the feature list honest.)
7. **Sound** — tiny WebAudio blips (flap: short square blip; score: two-note chirp; hit: low thud), mute toggle button in the corner, default on; AudioContext created lazily on first user gesture.
8. **Responsive canvas** — fixed logical size 420×640, scaled by CSS to fit; `devicePixelRatio` scaling for crisp rendering; works in portrait phones and desktop.

Out of scope: multiplayer, online leaderboards, skins/themes, power-ups, medals, pause menu UI beyond tap-to-resume, landscape-optimized layout (portrait logical size letterboxed on wide screens is fine).

## Design

Page structure top → bottom:
1. Top nav (`/` → Shipwright Studio, `/ideas/` → Idea Lab) — same as other lab pages.
2. Eyebrow "Lab · Arcade", h1 "Flappy Flyer", definition paragraph (quotable: "Flappy Flyer is a free online game that …").
3. **Game card** — canvas centered (max-width 420px), HUD overlaid: big score top-center, best score top-left, mute button top-right; below canvas: one-line controls hint ("Tap / click / Space to flap · P pauses").
4. **Explainer card** — "How it works" 2–3 sentences (flap physics, pipe gap shrinks from 165→112 px, speed 190→300 px/s by score 40) + a "rage responsibly" one-liner; `<details>` with the difficulty numbers for the curious.
5. Footer linking `/ideas/` and `/`, "Built by Shipwright Studio" signature.

Key interactions / states:
- **Empty/ready**: bird bobs on a sine wave, pipes none, "Tap to fly" pulsing prompt; first tap starts the run.
- **Active**: bird rotates with velocity (−25° up … +80° down); pipes scroll; score ticks; near-miss has no special state (fair hitboxes).
- **Success**: passing a pipe → score +1 with a small "+1" float; new best → brass "NEW BEST" flash.
- **Error/game over**: hit → freeze 120 ms, bird tumbles to the ground (rotate to 90°, fall), panel slides up with score/best/"Fly again"; tap after 400 ms restarts instantly.

Visual treatment: night sky `#0a0c0f`→`#11141a` vertical gradient, parallax starfield (two layers) + faint distant skyline silhouette, pipes as brushed-steel columns with brass `#d2a24c` rim caps, bird a brass circle with a darker wing arc and a white eye; score in Fraunces numerals, white with soft shadow. Mobile: canvas fills available width, touch works anywhere on the card, no scroll-jacking (touch-action: manipulation).

## Acceptance criteria

1. With no input the bird accelerates downward (vy grows each step, y increases); a flap sets vy to the negative impulse; 120 Hz and 60 Hz runs produce the same trajectory within 1 px after 120 steps (delta-time normalization) — verified in node on extracted pure physics functions.
2. A pipe pair increments the score exactly once when it passes the bird, verified in node with a scripted pipe sweep (score 0→1, no double count on subsequent frames).
3. Circle-vs-rect collision returns true on a fixture where the bird overlaps a pipe edge and false on a fixture where the bird is centered in the gap — verified in node.
4. Hitting a pipe or the ground shows the game-over panel with score and best; best persists across page reloads (localStorage `flappy-flyer-best`); "Fly again" / tap restarts with score 0 and fresh pipes.
5. Core game logic passes node unit checks (physics step, flap impulse, pipe spawn/score, collision fixtures, difficulty ramp values at scores 0/20/40/60).
6. The page meets all lab SEO requirements: unique title "Flappy Flyer · Shipwright Studio", one-sentence meta description, definition paragraph, canonical link, WebApplication JSON-LD, exactly one h1, footer links to `/ideas/` and `/`, canvas has `role="img"` + `aria-label`, no `mailto:`/emails/secrets.
