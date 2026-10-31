# Token Vesting Visualizer — build spec

## Concept
Token Vesting Visualizer is a free online tool that turns a token unlock
schedule into a timeline anyone can read. It is for founders, investors and
community members who want to see when tokens actually unlock — cliff, linear
release and first-day (TGE) unlock included — instead of parsing a paragraph
in a tokenomics doc. Enter the schedule, drag through the months, and read off
exactly how many tokens are unlocked at any point.

## Feature list (priority order)
1. Schedule inputs: total tokens, TGE unlock %, cliff (months), linear
   vesting duration (months), and start date.
2. Cumulative unlock chart: an SVG step-and-slope curve with the cliff
   marked, the TGE step at month 0, and a marker for the selected month.
3. Month slider (0 to cliff + vesting months) with a readout: tokens unlocked
   at that month, percent unlocked, tokens still locked, and calendar date.
4. Monthly unlock table: one row per month with tokens unlocked that month
   and cumulative unlocked, in a scrollable card.
5. Three presets: Team (0% TGE, 12-month cliff, 36-month linear), Investor
   (10% TGE, 6-month cliff, 18-month linear), Advisor (0% TGE, 3-month cliff,
   12-month linear). Presets fill all inputs.
6. Copy-summary button: copies a one-paragraph plain-text summary of the
   schedule and the selected month's unlock state.

Out of scope: multiple tranches, price or dollar valuation, revocable /
cancellable schedules, on-chain data — all inputs are manual and the chart is
a pure schedule calculation.

## Design
Top to bottom: eyebrow + h1 + quotable definition paragraph; preset buttons;
inputs card (five labelled fields); chart card (SVG curve, cliff marker,
selected-month marker, readout line); month slider card with the four-number
readout; monthly table card (scrollable); summary card (text + copy button);
"How it works" explainer (TGE vs cliff vs linear, why the curve is flat then
straight, rounding note). Visual treatment: dark premium `#0a0c0f`, Fraunces
headings, brass `#d2a24c` accents, generous whitespace. Mobile: inputs stack
to one column, chart scales to full width, table scrolls horizontally if
needed. States: valid schedule (chart + table render), selected month (marker
moves, readout updates), invalid input (clamped to sane ranges with a short
note, never a blank page).

## Acceptance criteria
- A user can enter a schedule and see the cumulative unlock curve with the
  cliff and TGE step drawn correctly.
- A user can drag the month slider and read unlocked tokens, percent and
  remaining locked tokens for that month.
- A user can switch presets and see all inputs, the chart and the table
  update together.
- The monthly table sums to exactly the total token supply at the final
  month (within display rounding).
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no secrets.
