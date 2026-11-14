# Bridge Fee Comparator — Build Spec

## Concept

Bridge Fee Comparator is a free online tool that compares cross-chain bridge costs side by side, so anyone moving crypto between blockchains can see — before they bridge — which bridge is cheapest, which is fastest, and what each one will actually cost. The user picks a source chain, a destination chain, and an amount in USD, and instantly gets a ranked table of well-known bridges with their fees, estimated times, and total cost, plus a simple bar comparison.

It is for anyone who bridges tokens — DeFi users moving funds to a cheaper chain, NFT collectors switching networks, developers testing a new chain — who is tired of opening six bridge websites one by one and guessing which quote is best. All figures are illustrative demo estimates from a built-in dataset: no live prices, no wallet connection, nothing leaves the page.

## Feature list (MVP, in priority order)

1. **Route inputs** — source chain and destination chain selects (Ethereum, Arbitrum, Optimism, Base, Polygon, BNB Chain, Avalanche, Solana), amount in USD, and a speed preference (Cheapest / Fastest / Balanced). A swap button exchanges source and destination. Every change re-computes the comparison live.
2. **Ranked results table** — one row per bridge (Across, Hop, Stargate, Synapse, cBridge, Wormhole) with: bridge fee (flat + % breakdown), estimated time range, total cost, and amount received. Rows are ranked by the chosen preference; the cheapest row gets a "Cheapest" badge and the fastest a "Fastest" badge.
3. **Illustrative fee models** — each bridge has a built-in fee model (flat USD fee + percentage of amount) and a time range, with per-route availability: a bridge that does not support the chosen route shows as "Not available on this route" instead of a fake number.
4. **Bar comparison** — horizontal bars showing each bridge's total cost relative to the most expensive option, so the gap between cheapest and priciest is visible at a glance. Bars update with every input change.
5. **Preset routes** — three one-click presets: $100 Ethereum → Arbitrum, $1,000 Ethereum → Base, $5,000 Polygon → Ethereum; each fills all inputs and re-renders the comparison.
6. **Validation and error states** — same source and destination chain is rejected ("Source and destination must be different chains"); amount must be a positive number (≤ $1,000,000) or the table shows an error message instead of results. Invalid states never show fabricated numbers.
7. **Summary line** — one sentence under the table stating the best pick for the current preference ("Across is cheapest at $3.10 total — you receive $996.90 of $1,000") plus a note that figures are illustrative demo estimates, not live quotes.
8. **Demo-data note** — a visible line stating all fees and times are illustrative estimates for comparison, not live prices; real bridge fees change with gas, liquidity, and market conditions.

Out of scope for this version: live price/fee fetching from any bridge API, wallet connection or signing, token selection beyond a USD amount, slippage or gas-price modelling, saving/sharing comparisons, and any persistence (localStorage) of inputs.

## Design

Page structure, top to bottom:

1. **Header** — studio masthead (small "Shipwright Studio" wordmark linking to `/`), then `h1` "Bridge Fee Comparator".
2. **Summary paragraph** — one quotable definition sentence ("Bridge Fee Comparator is a free online tool that …").
3. **Demo-data note** — one line: "All fees and times are illustrative demo estimates for comparison — not live prices. Real bridge costs change with gas, liquidity, and market conditions."
4. **Comparator panel** — labelled controls in a card: source chain select, swap button (⇄), destination chain select, amount input (USD, with "$" prefix), speed preference as three radio-style buttons (Cheapest / Fastest / Balanced). A "Presets" row with three buttons ($100 ETH → Arbitrum / $1,000 ETH → Base / $5,000 Polygon → Ethereum).
5. **Error strip** — appears only when the route or amount is invalid; lists each problem with a ⚠ marker; results area is hidden while an error is shown.
6. **Results** — a summary line (best pick for the current preference), then a ranked table: columns Rank | Bridge | Fee (flat + %) | Est. time | Total cost | You receive. Cheapest row carries a brass "Cheapest" badge; fastest row a "Fastest" badge; unsupported bridges show a muted "Not available on this route" row. On narrow screens the table becomes stacked cards (each row a block with labelled values).
7. **Bar comparison** — labelled horizontal bars, one per available bridge, length proportional to total cost; the cheapest bar is brass, others are muted; each bar shows its total-cost value. Hidden when no bridges are available on the route.
8. **How fees are calculated** — a short section explaining the fee model (flat fee + percentage of amount) and listing the illustrative model per bridge in a small table, so the numbers are auditable.
9. **Footer** — "Built by Shipwright Studio" linking back to `/ideas/`.

Key interactions and states:

- **Empty**: inputs start pre-filled with the $1,000 Ethereum → Base preset so results are never blank on first load.
- **Typing/selecting**: every input or select change re-computes fees, ranking, badges, bars, and the summary line immediately — no submit button.
- **Same chain**: choosing the same chain for source and destination hides results and shows "Source and destination must be different chains — pick two different chains."
- **Invalid amount**: empty, zero, negative, or non-numeric amount (or over $1,000,000) hides results and shows "Enter an amount between $1 and $1,000,000."
- **Unavailable bridge**: a bridge without the route shows a muted row with "Not available on this route" and no fee, time, or bar; it never affects the ranking.
- **Cheapest/fastest badges**: exactly one bridge carries "Cheapest" (lowest total cost) and one carries "Fastest" (shortest estimated-time midpoint); a bridge can hold both badges.
- **Preference switch**: "Fastest" re-ranks by time midpoint; "Balanced" ranks by a simple score (cost rank + time rank); "Cheapest" ranks by total cost ascending.
- **Preset click**: fills all inputs, re-renders everything, and briefly highlights the comparator panel.
- **Swap**: exchanges source and destination chains and re-renders.

Visual treatment: dark premium background `#0a0c0f`, Fraunces serif headings, brass accent `#d2a24c`, generous whitespace, hairline borders (`#1e242c`), muted secondary text (`#9aa3ad`). Table rows are dark cards with hairline dividers; the cheapest row gets a subtle brass left border. Bars are thin brass/muted tracks with a value label. Buttons are dark with brass outline; the active preference is brass-filled with dark text. The swap button is a compact ghost button.

Mobile considerations: layout stacks vertically; controls are full width with ≥44px tap targets; the table becomes stacked labelled rows (no horizontal scroll); bars are full width; preset buttons wrap.

## Acceptance criteria

1. A user can pick a source chain, destination chain, and USD amount and immediately see a ranked table of bridges with fee breakdown, estimated time, total cost, and amount received, plus Cheapest/Fastest badges.
2. A user can switch the preference (Cheapest / Fastest / Balanced) and see the ranking and summary line change accordingly; a bridge unsupported on the route shows as unavailable, never as a fake number.
3. A user can swap source and destination with one click, and load any of the three preset routes with one click.
4. Same-chain routes and invalid amounts show a clear error and hide the results instead of showing numbers.
5. The page works with no external JavaScript, contains exactly one `h1`, has the required SEO tags (title, description, canonical, JSON-LD), and contains no email addresses, `mailto:` links, or secrets; all fee figures are labelled as illustrative demo estimates and no network request is ever made.
