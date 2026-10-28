# Build spec — Gas Fee Dashboard

## Concept

Gas Fee Dashboard is a free online gas-price gauge board for major
blockchains: it shows slow, standard and fast gas prices per chain, a
congestion meter, and what a typical transfer or swap would cost in
dollars — all from clearly labelled demo data. It is for crypto-curious
readers and developers learning how gas works, and for anyone who has
wondered why the same transaction can cost cents on one chain and dollars
on another. It is delightful because the gauges make an abstract fee market
tangible, and one click re-simulates a new block so prices visibly move.

## Feature list (MVP, in priority order)

1. **Chain gauge board** — six chains (Ethereum, Arbitrum, Optimism, Base,
   Polygon, BNB Chain), each a card with slow / standard / fast gas prices
   in gwei, a congestion bar (0–100%), and the chain's native-token demo
   price in USD. A banner above the board states plainly: "Demo data —
   simulated prices, not live network data."
2. **Chain detail + cost estimator** — clicking a chain selects it and
   shows its three tiers, its base fee and priority fee (standard tier
   split: base + priority = standard), and estimated USD cost for three
   transaction types (Transfer 21,000 gas, Token transfer 65,000 gas,
   Swap 150,000 gas) at the selected tier. Cost formula:
   cost USD = gas used × gas price (gwei) × 10⁻⁹ × token price (USD).
3. **Tier selector** — Slow / Standard / Fast buttons switch the tier used
   by the estimator; the selected tier is highlighted on every card.
4. **Simulate new block** — a button perturbs every chain's prices by a
   small random walk (±10% per tier, clamped to a minimum of 0.1 gwei and
   to congestion 5–98%), updates the "block" counter (+1) and the
   "last updated" label to the current time; congestion moves with the
   standard price (up when the price rises, down when it falls, clamped).
   An auto-tick every 30 seconds does the same, and can be paused with a
   toggle.
5. **Cheapest-chain ranking** — a small ranked list of the six chains by
   standard-tier swap cost in USD, cheapest first, recomputed after every
   simulation step.
6. **"How gas works" explainer** — a short plain-language section: gas is
   the unit of computation, gas price is what you pay per unit, base fee
   vs priority fee (tip), why L2s are cheaper, and why these numbers are
   demo-only.
7. **Reset demo** — restores the original snapshot values, block counter
   and timestamp.

Out of scope for this version: live RPC or API price feeds, wallet
connection, real transaction submission, custom gas-price input, historical
charts, chains beyond the six listed, fiat currencies other than USD.

## Design

Page structure top to bottom: nav (Shipwright Studio / Lab), eyebrow
"Lab — Web3 tools", h1 "Gas Fee Dashboard", quotable definition paragraph,
demo-data banner, controls row (Simulate new block, Reset demo, auto-tick
toggle, block counter, last-updated label), chain gauge grid (3 columns
desktop, 1 column mobile; each card: chain name, congestion bar, three
tier prices, token price), selected-chain estimator card (tier selector,
base + priority breakdown, three cost rows), cheapest-swap ranking card,
"How gas works" explainer, footer ("Built by Shipwright Studio" + back to
/ideas/).
Key interactions and states: initial state — snapshot values shown, block
#1; active state — after simulation, prices, ranking and timestamp update;
error state — none (no user input can be invalid; all controls are buttons
and toggles). Visual treatment: dark `#0a0c0f`, Fraunces headings, brass
`#d2a24c` accents, monospace numbers; congestion bar colour shifts
green → brass → red as congestion rises; fast tier highlighted in brass.
Mobile: cards stack, estimator rows stack, controls wrap.

## Acceptance criteria

- A user can see slow, standard and fast gas prices and a congestion meter
  for six chains, with a visible demo-data disclaimer.
- A user can select a chain and a tier and see the estimated USD cost of a
  transfer, a token transfer and a swap, computed by the stated formula.
- A user can click "Simulate new block" and see prices, the block counter,
  the timestamp and the cheapest-chain ranking all update.
- A user can reset the board to the original demo snapshot.
- The page has exactly one h1, a unique title and description, a canonical
  link, a quotable definition paragraph, and a WebApplication JSON-LD block.
