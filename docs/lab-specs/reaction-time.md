# Spec — Reaction Timer (`reaction-time`)

## Concept
Reaction Timer is a free online reflex test. It measures how fast you react to a visual signal — click when the screen turns green — across 5 rounds, then ranks your average against playful tiers. Built for anyone curious about their reflexes: gamers warming up, athletes, or the merely competitive.

## Feature list (MVP, prioritized)
1. **Three-state stage**: idle (dark, "Click to start") → waiting (red, "Wait for green…") → go (green, "CLICK!"). Full-viewport, single click/tap target.
2. **Millisecond timing** via `performance.now()`; random 2–5s delay before green so it can't be anticipated.
3. **False-start detection**: clicking during "waiting" shows "Too soon!" and retries the round without counting it.
4. **5 rounds** with a round counter; per-round ms shown briefly between rounds.
5. **Results screen**: average, best round, tier rank (Lightning <180ms, Pro <220ms, Average <260ms, Casual <320ms, Sleepy ≥320ms).
6. **Personal best** persisted in `localStorage`, shown on idle and results screens.
7. **Restart** button on results.
8. **Mobile**: works with touch (`pointerdown`), large tap target, no scroll interference.
9. Out of scope: accounts, global leaderboard, sound effects.

## Design
- **Layout**: one full-viewport stage; minimal top bar with title + "back to Lab" link; results replace the stage content.
- **States**: idle `#0a0c0f` / waiting deep red `#3d0f12` / go vivid green `#1f9d55` / false-start amber. Big Fraunces numerals for the ms readout.
- **Interactions**: the whole stage is the button; subtle scale pulse on state change; no animation that could affect timing perception.
- **Mobile**: `touch-action: manipulation`, viewport-locked stage height (`100dvh`).

## Acceptance criteria
- [ ] A user can complete 5 rounds and sees average, best, and tier rank.
- [ ] Clicking before green shows "Too soon!" and the round restarts uncounted.
- [ ] Timings are measured with `performance.now()` (sub-frame accuracy).
- [ ] Personal best survives a page reload.
- [ ] Works with mouse click and mobile tap; no page scroll during play.
