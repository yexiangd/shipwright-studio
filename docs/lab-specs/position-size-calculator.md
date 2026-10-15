# Lab Spec — Position Size Calculator

Slug: `position-size-calculator` · Category: devtool · Effort: S

## Concept

Position Size Calculator is a free online tool that turns the one risk decision every trader
must make — "how much can I lose on this trade?" — into exact order numbers. Traders enter
account size, the percentage of the account they're willing to risk (typically 1–2%), and the
stop-loss distance for the trade; the calculator returns the maximum position size (in shares
or contracts), the dollar risk, and the notional value of the position. It is built for
retail stock, futures, and crypto traders who want disciplined, math-first position sizing
without a spreadsheet.

## Feature list (MVP, priority order)

1. Inputs: account balance ($), risk % per trade (preset chips 0.5/1/2/3 + custom), entry price,
   stop price, and optional "shares already held / contracts" field. (P0)
2. Outputs: max position size (shares/contracts, rounded down), dollar risk, notional value,
   and risk as % of account. (P0)
3. Validation: stop must differ from entry; entry/stop > 0; risk % clamped to (0, 100]; friendly
   inline error states rather than silent NaN. (P0)
4. Long/short toggle: stop above entry = short, below = long; direction shown in results. (P1)
5. Live recalculation on every input change (no "calculate" button). (P1)
6. "Try a sample trade" button that fills a sensible demo (e.g. $10,000 account, 1% risk,
   entry $150, stop $145 → 20 shares, $100 risk). (P1)
7. Reset button returning to empty state. (P2)

OUT OF SCOPE: multi-leg/parlay sizing, Kelly criterion, portfolio heat across positions,
account currency conversion, any server round-trip or analytics.

## Design

- Structure top to bottom: studio header (link back to the /ideas/ lab listing), h1 "Position Size
  Calculator", quotable definition paragraph, one-sentence summary, input card (left) +
  results card (right) on desktop / stacked on mobile, a short "How it works" explainer with
  the formula `size = (account × risk%) ÷ |entry − stop|`, and a footer note that this is a
  math tool, not financial advice.
- Key interactions/states: empty state shows placeholder "--" in result fields; active state
  updates results live; error state (bad stop) shows an inline message under the inputs and
  dims results; sample-trade button fills and focuses results.
- Visual treatment: studio dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accents
  for the primary results (position size in large brass numerals), generous whitespace,
  rounded cards with subtle 1px borders `#1c2128`.
- Mobile: single column, inputs full width, large tap targets, results card pinned above
  the explainer so it's visible without scrolling far.

## Acceptance criteria

1. A user can enter account size, risk %, entry and stop prices, and see position size,
   dollar risk, and notional value update instantly.
2. The page rejects a stop equal to entry and any non-positive price with a clear inline
   message (no silent blanks or NaN).
3. The "sample trade" fills $10,000 / 1% / $150 / $145 and produces 20 shares, $100 risk.
4. The page ships the required SEO block: unique title, meta description, canonical URL,
   `WebApplication` JSON-LD, exactly one `h1`, one quotable definition paragraph.
5. All JS logic passes a node sanity run of the core formula before deploy.
