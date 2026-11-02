# LP Simulator — build spec

## Concept
Uniswap v3 LP Simulator is a free online educational tool that shows how
concentrated liquidity actually behaves. A user picks a price range for an
ETH/USDC position, a fee tier, and a price-path scenario, and the simulator
walks the price day by day, reporting fees earned, impermanent loss, and
whether the position beats simply holding the two tokens. It is for DeFi
curious learners and LPs sizing their first position — it teaches the
range-vs-fees trade-off without risking real money. All numbers are simulated
from clearly labelled assumptions, never live quotes.

## Feature list (priority order)
1. Inputs: capital (USD), entry price (ETH/USDC), lower and upper range
   prices, fee tier (0.05% / 0.3% / 1%), horizon (30 / 90 / 180 days),
   scenario (Range-bound / Trending up / Trending down / Volatile), and a
   daily-volume assumption (USD) that drives fee accrual.
2. Seeded deterministic price path: a seeded random walk with a scenario
   drift/volatility, so the same inputs always give the same path and the
   result is reproducible (seed shown on the page).
3. Position maths (Uniswap v3 concentrated liquidity): virtual liquidity L
   derived from capital and the range; token amounts x/y recomputed from the
   current price each day; out-of-range days hold a single token.
4. Results panel: final position value, HODL value, fees earned, net P&L vs
   HODL, impermanent loss %, time in range %, and an effective APR.
5. Two canvas charts: price path with the range band shaded, and position
   value vs HODL value over time.
6. Scenario presets plus a "What the range does" explainer: narrow range =
   more fees while in range but more time out of range; wide range = the
   opposite. The page states the model assumptions in plain language.
7. Edge handling: lower price must be below entry price and upper above it;
   invalid ranges show an inline error and do not run the simulation.
8. Footer credit: "Built by Shipwright Studio" + link back to /ideas/.

Out of scope for this version: multi-position portfolios, real pool data or
wallet connection, gas costs, rebalancing/auto-compounding, and tick-level
precision (daily steps only).

## Design
Top to bottom: nav → eyebrow "Lab — DeFi tool" → h1 "Uniswap v3 LP Simulator"
→ quotable definition paragraph → inputs card (two-column grid on desktop,
stacked on mobile; fee-tier and scenario as button groups) → Run button →
results card (big stat tiles: position value, HODL value, fees, P&L vs HODL,
IL %, time in range, APR) → price-path chart card (range band shaded) →
value-vs-HODL chart card → assumptions/explainer card → footer.
States: empty (default inputs pre-filled with a sensible example, Run not yet
pressed — results show "Run the simulation"), active (charts drawn, tiles
filled), error (invalid range message, simulation not run).
Visual treatment: studio dark `#0a0c0f`, Fraunces headings, brass `#d2a24c`
accents; charts drawn on canvas with brass/teal lines; mobile: inputs stack,
charts shrink to full width.

## Acceptance criteria
1. A user can set a range, fee tier, and scenario, press Run, and see position
   value, HODL value, fees, IL %, time in range, and APR.
2. The same inputs always produce the same price path and results (seeded
   RNG; seed displayed).
3. Position maths passes a node check: at the entry price the position is
   worth exactly the capital; a price outside the range converts the position
   to a single token; fees are zero on out-of-range days and positive on
   in-range days with volume > 0.
4. Invalid ranges (lower ≥ entry, or upper ≤ entry) are rejected with an
   inline error and no results are shown.
5. The page has exactly one h1, a unique title/description, canonical link,
   WebApplication JSON-LD, a link back to /ideas/, and a clear "simulated
   data, not financial advice" note.
