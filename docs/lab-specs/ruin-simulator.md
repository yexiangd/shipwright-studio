# Build Spec — Risk of Ruin Simulator (`ruin-simulator`)

## Concept
Risk of Ruin Simulator is a Monte Carlo gambler's-ruin simulator for anyone who wagers, trades, or bets with a repeatable edge. The user dials in bankroll, bet size (fixed dollars or a % of bankroll), win probability, payout odds, and a bet count, and the tool runs thousands of simulated equity paths to answer one question: *how likely is blowup given your edge and bet size?* It is aimed at quantitative bettors and day traders who have heard of Kelly staking but want an intuitive feel for how bet sizing drives survival, not just expected value.

## Feature list (priority order)
1. **Core Monte Carlo engine**: fixed-bet and proportional (re-stake % of current bankroll) modes; inputs: bankroll, bet size, win probability (slider + number), payout odds (decimal-style profit multiple), number of bets per path, number of simulation runs (1k–50k). Deterministic PRNG seeded for reproducibility across runs is not required; plain `Math.random` is fine.
2. **Ruin probability headline**: fraction of runs that hit zero (or below one bet unit) — the single hero metric, plus ruin-by-half and median ruin-time context.
3. **Canvas equity-curve chart**: up to ~300 downsampled representative paths drawn on one canvas, surviving paths in green, ruined paths in red fading early; median path in brass. Ruined paths stop at ruin.
4. **Distribution summary**: median, 10th, and 90th percentile of final bankroll; expected value per bet (closed form) vs simulated mean per bet so users can see convergence.
5. **Bet-size comparison (A/B)**: preset chips that set bet size to a second value and run both presets side by side in one results card — showing how ruin probability moves with bet size. Simplified: a second bet-size field "compare against" with its own ruin %.
6. **Kelly criterion hint line**: closed-form Kelly fraction for the given win probability and odds, shown as a suggestion ("full Kelly would stake X% of bankroll"); warns if the user's bet size exceeds Kelly.
7. **Smart preset chips**: one-click scenarios — "Coin-flip trader" (50%, 1:1, 2% fixed), "Small edge" (55%, 1:1, 2% fixed), "Overbettor" (55%, 1:1, 20% fixed — ~35% ruin despite the edge, the lesson of the page) — to make the ruin intuition land instantly.
8. **Input validation & states**: invalid inputs highlight the field in red with an inline error line; the Run button disables while a batch is simulating; empty state before first run shows a muted prompt.

**Out of scope (v1)**: server-side or Web Worker computation (canvas + chunked batches keep the main thread responsive); exact gambler's-ruin closed-form solutions beyond the Kelly hint; downloadable CSV of paths; variable bet sizing within a path; multi-table / bankroll rebalancing between bets.

## Design
Page structure top → bottom:
1. Eyebrow ("Shipwright Studio · Lab") + `h1` "Risk of Ruin Simulator" + one quotable definition paragraph near the top.
2. Inputs card: two-column grid (bankroll, bet mode toggle fixed/proportional, bet size, win probability slider+number, payout odds, bets per path, simulation runs). Preset chips row underneath.
3. Run button (brass, full width on mobile); error line under it.
4. Results hero: three metric tiles — Ruin probability (hero, brass/red), Median final bankroll, Expected value per bet. Below: Kelly hint bar ("Kelly suggests X% — your current stake is Y% (above Kelly)") and the A/B comparison strip ("vs 1% bets: ruin 3.1%").
5. Canvas chart card with legend (survived / ruined / median), downsampled to 300 paths, axis ticks for bet count.
6. "How to read this" notes card: 3 bullets on ruin vs EV, Kelly, and why proportional betting can't go to exactly zero in this model.
7. Footer: links to `/ideas/` and home `/` (never `/lab/`).

Key interactions/states:
- **Empty**: before first run, chart area shows a dashed placeholder with "Set your numbers and press Run."
- **Active**: Run button shows "Simulating…" and is disabled; computation is chunked in `setTimeout` slices so the UI never freezes (50k runs max is fine).
- **Success**: metrics populate with count-up-free simple text; chart animates? no — static draw is fine and tight.
- **Error**: invalid field gets `.bad` red border + one shared error line; no alert dialogs.
- Ruin definition: path value ≤ 0 for fixed bets; for proportional bets, ruin = value < 1 unit (can't go below 0 by construction, so ruin is reported as "below 1% of starting bankroll" and labeled honestly). Median of surviving-only? No — median of all final values, ruins count as 0.

Visual treatment: dark premium `#0a0c0f` background, panel `#11141a`, Fraunces serif headings, brass `#d2a24c` accents, generous whitespace, centered narrow column (max-width ~940px). Mobile: inputs collapse to one column, chart height shrinks, metrics stack.

## Acceptance criteria
- A user can enter bankroll/bet/edge/odds and press Run to get a ruin probability, a percentile summary, and an equity-path chart with zero page reloads.
- A user can switch to proportional (percent-of-bankroll) betting and see ruin fall for the same edge, because proportional bets can't hit exactly zero.
- A user can set a comparison bet size and see two ruin probabilities side by side.
- The Kelly hint shows the closed-form Kelly fraction and flags when the user's stake exceeds it.
- The page carries the required SEO: unique title, meta description, canonical, WebApplication JSON-LD, exactly one h1, and the quotable definition paragraph.

## Notes / divergence log
- Ruin definition differs per mode by necessity: fixed mode → bankroll ≤ 0 or the next fixed bet can't be covered; proportional mode → bankroll below 1% of the starting bankroll (multiplicative stakes asymptotically approach zero but never reach it). The UI labels this explicitly rather than hiding it. (This is a modeling clarification, not a spec change.)
