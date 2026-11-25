# Coin Flip — build spec

## Concept
Coin Flip is a free online coin-flip tool that settles 50/50 decisions with physics-grade drama: a CSS-3D coin spins through several full turns and lands on a face decided by a cryptographic random draw before the animation ends. It is for anyone who needs a fair, quick decision — who goes first, heads or tails, yes or no — and wants the flip itself to feel like an event rather than a coin toss in a chat app. It is delightful because the drama is honest: the result is fixed by `crypto.getRandomValues` the moment you flip, the animation is presentation only, and the page keeps running stats, streaks, and a best-of series mode so a single flip can grow into a proper contest.

## Feature list (priority order)
1. CSS-3D spinning coin with two faces (Heads / Tails), spinning through several full turns with an easing curve that starts fast and settles slowly. The outcome is decided by the RNG before the animation starts; the animation rotates to the pre-decided face, never the other way around.
2. Fair randomness: each flip uses `crypto.getRandomValues` (with a `Math.random` fallback if unavailable), giving exactly 50/50 heads/tails. The fairness method is printed on the page.
3. Flip button plus Space key and click-on-coin to flip; the flip button is disabled while the coin is spinning so a flip can never be double-counted.
4. "Call it" mode: pick Heads or Tails before flipping; correct calls are tracked (calls made, correct, accuracy %).
5. Best-of series mode: best of 3 / 5 / 7 — Heads and Tails race to the majority; the first side to reach the majority wins the series, with a live series scoreboard and a "New series" button. A series always ends within the chosen number of flips.
6. Flip history strip: the last 12 flips as Heads/Tails chips, most recent first, with the current streak highlighted.
7. Running stats: total flips, heads count and %, tails count and %, current streak (side + length), longest streak — persisted in localStorage with a reset button.
8. Result announcement: the outcome is stated in text under the coin ("Heads!" / "Tails!") and in the series/call context ("Your call was right — Heads!"), so the result never depends on reading the coin face alone.
9. Empty state: before the first flip the history strip says "No flips yet — hit Flip and let it land." and the stats show zeroes.

Out of scope: real money, betting, accounts, leaderboards, sound effects, multiple coins, animated physics simulation of a bouncing coin, any gambling links.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Game" → h1 "Coin Flip" → quotable definition paragraph → fairness notice ("Fair by construction — each flip uses crypto.getRandomValues, exactly 50/50, decided before the coin stops spinning.") → coin card (3D coin stage, result line, big Flip button) → mode card (mode selector: Free flip / Call it / Best of; call picker shown in Call it mode; series length picker + scoreboard shown in Best of mode) → history card (last 12 flips strip) → stats card (flips, heads %, tails %, current streak, longest streak, call accuracy when in Call it mode, reset button) → "How fairness works" explainer → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no flips yet, coin shows Heads face up, history empty message), active (spinning — coin rotating, Flip button and mode controls disabled), success (coin settled, result line announces the outcome; in Call it mode the line says whether the call was right; in Best of mode the scoreboard updates and a series win shows a brass banner with a New series button), error (none expected — the RNG fallback is silent; if localStorage is unavailable, stats simply reset on reload).
Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; the coin is a large brass-rimmed disc with a serif H/T glyph on each face and a radial highlight; mobile: coin shrinks, Flip button full-width, mode buttons wrap, history chips wrap.

## Acceptance criteria
- A user can flip and see the coin land on the face the RNG decided, with the result announced in text; the outcome distribution over 100,000 simulated flips is within 49.5–50.5% heads.
- In Call it mode, picking a side before flipping tracks correct calls and accuracy; flipping without a pick prompts the user to pick first.
- In Best of mode, the series ends with a winner as soon as one side reaches the majority, never exceeding the chosen length (verified by node test on the extracted logic).
- A user can see the last 12 flips, current and longest streaks, and heads/tails percentages; stats persist across reloads and reset cleanly.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, and passes scripts/seo-check.py.
