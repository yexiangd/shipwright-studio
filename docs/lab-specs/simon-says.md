# Simon Says — Build Spec

## Concept

Simon Says is the memory classic: four glowing pads play a sequence, you
repeat it back — and the sequence grows until you can't. Each pad has its
own synthesized tone (Web Audio, no files), playback speed ramps up every
few rounds, and your longest streak is saved locally. Strict rules: one
wrong pad ends the run, so every round feels like defusing something.

## Feature list

1. 2×2 pad grid (responsive square), each pad with a base and a lit state,
   mapped to tones: E4 / A4 / C♯5 / E5 (Web Audio oscillators, envelope on press).
2. Sequence engine: random pad appended each round; playback with light+sound,
   gap shrinks from 450ms → 220ms as rounds increase.
3. Input: click/tap pads, or keys 1–4 / A S D F (shown on pads).
4. Strict rules: wrong pad = game over immediately; correct full sequence =
   next round with one new step.
5. Round counter, longest streak (localStorage "best"), and a live progress
   bar showing how many steps of the current sequence are entered.
6. Start overlay ("Watch, then repeat"), game-over overlay with round/best
   and Restart; "strict" note so the rules are explicit up front.
7. Audio unlock: first user gesture resumes the AudioContext (mobile-safe).
8. Reduced motion: lit pads flash via opacity (no strobing); flashes capped
   at the playback speed (≥220ms, well below strobe risk).

Out of scope: two-player/vs modes, downloadable sequences, volume slider
(fixed sensible level), high-score tables beyond one best.

## Design

Top to bottom: topbar (← Lab / Shipwright Studio brand), `h1` "Simon Says",
quotable definition paragraph (GEO), stats row (Round / Best / Progress pills),
pad stage: 2×2 rounded pads, dark bases with brass glow when lit
(active state = brighter pad + soft outer glow + tone).

Pad colors in the dark/brass idiom: ember red `#e0655f`, brass `#d2a24c`,
sage green `#8fb573`, slate blue `#7aa2d8` — muted when idle, luminous when
lit. Pads show small key hints (1–4). Strict-mode badge under the stage:
"Strict — one mistake ends the run."

Mobile: pads scale with viewport; touch taps with 120ms light hold; audio
unlocked on first tap.

States: idle (start overlay), playing sequence ("Watch…" — input locked),
your turn ("Your move — repeat it"), game over (round reached, best,
restart). Progress pill counts entered-vs-total steps.

## Acceptance criteria

- A user can start, watch a lit+toned sequence, and repeat it with clicks
  or keys 1–4; each completed round appends exactly one new step.
- A wrong pad ends the run immediately (strict) and shows the game-over
  panel with the round reached.
- Playback tempo measurably increases with rounds (gap shrinks from ~450ms
  to ~220ms); the Round and Best pills update, and best persists across reloads.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies (Web Audio is native).
