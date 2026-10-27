# Build spec — Funding Rate Arbitrage Calc

## Concept

Funding Rate Arbitrage Calc is a cash-and-carry calculator for perpetual
futures: it prices the classic long-spot / short-perp trade from
user-entered prices, position size, and funding rate, and shows what the
funding leg alone is worth over a chosen holding period. It is for anyone
learning how perp funding works — a trader sanity-checking a basis trade,
or a curious reader who has heard that "shorts get paid when funding is
positive" and wants to see the arithmetic. It is delightful because every
number is transparent and recomputes live: change one input and the basis,
daily funding, annualised rate, and breakeven point all move at once, with
no sign-up, no live market data, and no trade ever placed.

## Feature list (MVP, in priority order)

1. **Cash-and-carry inputs** — spot price, perp price, position notional
   (USD), funding rate (% per interval), funding interval selector
   (1h / 4h / 8h), holding period (days), spot fee (%), and perp fee (%).
   Implied coin quantity (notional / spot price) is shown as a read-only
   derived value.
2. **Core outputs** — basis in dollars (perp − spot) and percent
   ((perp − spot) / spot), funding per interval (notional × rate),
   funding per day (per-interval × 24 / interval hours), annualised
   funding rate (rate × intervals per day × 365), cumulative funding over
   the holding period (daily × days), total fees, net P&L, and breakeven
   notes (see feature 4).
3. **Net P&L definition, stated on the page** — headline net P&L is
   funding-only: cumulative funding minus total fees, where total fees =
   notional × (spot fee % + perp fee %). Basis gain if the perp converges
   to spot at exit (basis × quantity) is shown as a separate line, and a
   second "net if basis converges" total adds it in. This keeps the funding
   story honest: convergence profit is conditional, not guaranteed.
4. **Breakeven notes** — days to cover fees (fee total / daily funding,
   when daily funding is positive; otherwise "fees are never covered by
   funding at this rate"), and the funding rate per interval that would
   exactly cover fees over the holding period (fee total / (notional ×
   intervals in holding period)), when holding days > 0.
5. **Presets** — three buttons that set rate + interval only, leaving all
   other inputs untouched: Mild (+0.01% / 8h), Strong (+0.10% / 8h), and
   Negative (−0.03% / 8h, so the sign flip is visible).
6. **Cumulative-funding table and summary bars** — a small table with one
   row per horizon (1, 7, 14, 30 days, plus the chosen holding period if
   it is not already listed) showing cumulative funding and funding-only
   net after fees at that horizon; a simple horizontal-bar summary of
   cumulative funding at those horizons, scaled to the largest value.
7. **"How it works" explainer and disclaimer** — a short explainer of the
   cash-and-carry trade (long spot, short perp; positive funding means
   longs pay shorts, so the short leg collects it; negative funding
   reverses the flow), plus an educational-only disclaimer: demo math, not
   trading advice; all funding rates are user-entered, no live market data
   is fetched, and no trade is placed.
8. **Reset button** — restores the default inputs (spot 90,000, perp
   90,100, notional 100,000, rate 0.01% / 8h, 30 days, fees 0.05% each leg).

Out of scope for this version: live funding-rate data or any network
fetch, coin-quantity input mode (notional is the single size input;
quantity is derived), leverage / margin / liquidation math, exit-price or
slippage modelling, multi-asset comparison, saving or sharing a scenario,
and any trading, account, or order functionality.

## Design

Page structure, top to bottom:

1. Top nav: "Shipwright Studio" (home) and "Idea Lab" (`/ideas/`).
2. Eyebrow ("Lab · Devtool"), one `h1` ("Funding Rate Arbitrage Calc"),
   and a one-sentence definition paragraph ("Funding Rate Arbitrage Calc
   is a free online tool that …") for search and AI answer engines.
3. Calculator card: inputs in a labelled grid (number inputs and the
   interval select), a preset row (Mild / Strong / Negative), a Reset
   button, a status line (empty / active / error), and a results grid of
   labelled stat tiles (basis $, basis %, funding per interval, daily
   funding, annualised rate, cumulative funding, fee total, funding-only
   net P&L, basis gain if converges, net if converges). Positive values
   read green, negative values red, neutral values brass/white.
4. Breakeven card: two plain sentences — days to cover fees, and the
   breakeven funding rate over the holding period — with the
   never-covered / no-holding-period wording when those cases apply.
5. Cumulative card: the horizon table (horizon, cumulative funding,
   funding-only net) plus horizontal bars for cumulative funding at each
   horizon, with negative bars rendered in red and labelled as payments
   rather than receipts.
6. "How it works" explainer (collapsible) plus the educational-only
   disclaimer, in plain language.
7. Footer: "Built in the Shipwright Studio Lab · more experiments" linking
   to `/ideas/` (never to `/lab/`).

Key interactions and states:

- **Empty**: if any required input is blank, results are hidden and the
  status line reads "Fill in every field to see the funding math."
  Defaults are pre-filled, so this state appears only after the user
  clears a field.
- **Active**: every input change recomputes all outputs immediately (no
  Calculate button needed); presets update rate + interval and recompute.
- **Success**: all stat tiles, breakeven sentences, table, and bars show
  values formatted to two decimals (basis % and rates to two decimals,
  dollars with thousands separators); a negative funding rate flips
  every funding sign, and the breakeven card says funding never covers
  fees.
- **Success — zero holding days**: cumulative funding is $0, funding-only
  net is −fee total, and the breakeven-rate sentence reads "No holding
  period, so no funding is collected."
- **Error**: a non-positive spot price, perp price, or notional; a
  negative holding period; or a negative fee shows "Check the highlighted
  fields: prices and notional must be above zero, and days and fees must
  not be negative." and hides the results. Non-numeric input is treated
  the same way as blank.
- **Sign convention, stated in the UI**: positive funding = the short
  perp leg receives funding, so funding P&L is positive; negative funding
  = the short leg pays, so funding P&L is negative.

Visual treatment: studio aesthetic throughout — dark `#0a0c0f`
background, `#101318` cards with `#1c2128` borders, Fraunces serif
headings, brass `#d2a24c` accents (preset buttons, section labels, bar
fills for positive funding), generous whitespace, sans-serif UI text for
inputs, stats, and table. Funding gains use muted green `#7ddb8a`,
losses/payments muted red `#ff7a7a`. Stat tiles are a responsive grid
(3 columns desktop, 1 column mobile).

Mobile considerations: input grid collapses to one column; stat tiles
stack; the horizon table keeps full width with wrapping values (no
horizontal scroll needed); preset buttons wrap; all controls are at
least 44 px tall.

## Acceptance criteria

1. A user can enter the worked example ($100,000 notional, 0.01% per 8h)
   and see $10 per interval, $30 per day, and a 10.95% annualised rate
   (verified by the node test, not just by eye).
2. A negative funding rate flips the sign of per-interval, daily,
   cumulative, and net funding, and the breakeven card states fees are
   never covered by funding at that rate.
3. Zero holding days gives $0 cumulative funding and a funding-only net
   equal to −fee total, with the no-holding-period breakeven wording.
4. The three presets set rate + interval only (other inputs unchanged),
   the horizon table includes the chosen holding period, and Reset
   restores all defaults.
5. The page passes the house checks: exactly one `h1`, unique title
   "Funding Rate Arbitrage Calc · Shipwright Studio", one-sentence meta
   description, canonical link, WebApplication JSON-LD, no images, no
   mailto links, no email addresses, no secrets, and no network fetches
   in JS.
