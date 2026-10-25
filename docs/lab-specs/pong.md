# Build spec — Pong vs AI (idea-018)

## Concept

Pong vs AI is a faithful revival of the 1972 arcade original, rebuilt as a
single self-contained web page: the player defends the left paddle against a
computer opponent on the right. It is for anyone who wants a two-minute arcade
break with no downloads, no account, and nothing leaving the browser. It is
delightful because it is instantly familiar — one paddle, one ball, first to
seven — while the three-level AI opponent gives the classic formula a reason
to be replayed: Easy forgives, Hard punishes.

## Feature list (MVP, in priority order)

1. **Playable Pong match** — canvas game: player paddle (left), AI paddle
   (right), ball, centre line, first to 7 points wins, win screen with the
   final score.
2. **Player controls** — mouse move and touch drag move the paddle; ArrowUp /
   ArrowDown and W / S keys also work. Paddle movement is clamped to the
   canvas.
3. **AI opponent with 3 difficulty levels** — Easy / Medium / Hard, selectable
   before and between matches, differing in reaction speed and tracking
   error. Easy is visibly slower and noisier than Hard.
4. **Score display and win screen** — live score above the canvas, "first to
   7" stated up front, and a win/lose screen with a Play again button.
5. **Pause / resume and restart** — Pause button and P / Esc key pause and
   resume; Restart button resets score and ball at any time.
6. **Ball speed ramps within a rally** — the ball gets slightly faster on
   every paddle hit, so long rallies escalate; speed resets when a point is
   scored.
7. **Rally and speed readout** — a small status line shows the current rally
   length and ball speed, so the escalation is visible.
8. **Best result in localStorage** — the best result against the AI (player
   wins, e.g. "Best: 7–3 vs Hard") is remembered per difficulty and shown
   under the canvas; it never leaves the browser.

Out of scope for this version: two-player mode, sound (no audio at all —
keeps the page silent and simple), online leaderboards, custom themes,
mobile tilt control, and any network request beyond the font stylesheet.

## Design

Page structure, top to bottom:

1. Top nav: "Shipwright Studio" (home) and "Idea Lab" (`/ideas/`).
2. Eyebrow ("Lab · Game"), one `h1` ("Pong vs AI"), and a one-sentence
   definition paragraph ("Pong vs AI is a free online game that …") for
   search and AI answer engines.
3. Game card: scoreboard (You / AI, first to 7), the canvas, and an overlay
   inside the canvas area for idle / paused / game-over states.
4. Controls card: difficulty selector (Easy / Medium / Hard), Start / Pause
   button, Restart button, and a status line (rally length, ball speed,
   best result).
5. "How to play" explainer (collapsible): controls, scoring, and what each
   difficulty changes.
6. Footer: "Built in the Shipwright Studio Lab · more experiments" linking
   to `/ideas/` (never to `/lab/`).

Key interactions and states:

- **Idle** (before Start): canvas shows paddles and ball at rest, overlay
  reads "Press Start — first to 7 wins". Difficulty can be changed.
- **Playing**: ball moves; paddle follows mouse / touch / keys; score
  updates on each point; the ball pauses briefly (countdown-free, ~0.8 s)
  after a point before serving toward the player who just conceded.
- **Paused**: overlay reads "Paused"; ball and paddles freeze; Start button
  becomes Resume. P / Esc toggles.
- **Game over**: overlay reads "You win!" or "AI wins" with the final score
  and a Play again button; the best result updates if the player won with a
  better margin than the stored best for that difficulty.
- **Error / edge states**: none reachable in normal play — a resize keeps the
  internal game coordinates fixed (canvas has a fixed internal resolution
  and scales via CSS), so play is identical on every screen size.

Visual treatment: studio aesthetic throughout — dark `#0a0c0f` background,
`#101318` cards with `#1c2128` borders, Fraunces serif headings, brass
`#d2a24c` accents (score, active difficulty button, overlay text), generous
whitespace, sans-serif UI text for controls and status lines. The canvas is
dark with a dashed centre line, brass ball, and light paddles.

Mobile considerations: the canvas scales to the card width while keeping its
internal 720 × 400 resolution; touch drag on the canvas moves the paddle
(with `touch-action: none` so the page does not scroll mid-drag); buttons are
full-width-friendly and at least 44 px tall; keyboard hints are hidden on
touch layouts.

## Acceptance criteria

1. A user can start a match, move the paddle with mouse, touch, or
   Arrow/W-S keys, and score points until one side reaches 7, at which point
   a win/lose screen appears with a working Play again button.
2. The page offers three difficulty levels, and the AI on Easy moves
   measurably slower and with more error than on Hard (verified by the
   node test, not just by feel).
3. Pause/resume (button and P / Esc) freezes and resumes the game, and
   Restart resets the score to 0–0 at any time.
4. The ball speeds up slightly on every paddle hit within a rally and resets
   to base speed after a point, with rally length and speed shown in the
   status line.
5. The page passes the house checks: exactly one `h1`, unique title
   "Pong vs AI · Shipwright Studio", one-sentence meta description,
   canonical link, WebApplication JSON-LD, no images without alt (no images
   at all), no `mailto:`, no email addresses, and no secrets.
