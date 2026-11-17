# Bitcoin Halving Countdown — build spec

## Concept
Bitcoin Halving Countdown is a free online tool that counts down to the next
Bitcoin halving at block 1,050,000. It is for anyone curious about Bitcoin's
issuance schedule — holders, miners, and the simply curious — who wants to see
at a glance how many blocks remain, roughly when the halving lands, and how
the block reward will change. Because the page makes no network calls, it
works from a clearly labelled estimated block height that advances in real
time, so the countdown is always moving and always honest about being an
estimate rather than live chain data.

## Feature list (priority order)
1. Live countdown: days, hours, minutes and seconds until the estimated
   halving moment, ticking every second, derived from blocks remaining × 10
   minutes per block.
2. Estimated current block height: advances in real time at one block per
   10 minutes from a documented anchor (block 976,255 at 2026-11-17 09:55
   UTC, observed on bitinfocharts.com). The anchor block and timestamp are
   shown on the page, and every figure is labelled "estimated".
3. Blocks-remaining readout: blocks left until 1,050,000, with a progress bar
   through the current halving epoch (840,000 → 1,050,000) and a percentage.
4. Estimated halving date/time: shown in the visitor's local timezone and in
   UTC, with an explicit caveat that real block times vary around the
   10-minute target, so the date will drift.
5. Block-reward panel: current reward 3.125 BTC per block → 1.5625 BTC after
   the halving, plus the new daily issuance (450 → 225 BTC/day at the
   10-minute target pace).
6. Past-halvings table: the four halvings so far — 2012-11-28 (block
   210,000, 50 → 25 BTC), 2016-07-09 (420,000, 25 → 12.5), 2020-05-11
   (630,000, 12.5 → 6.25), 2024-04-20 (840,000, 6.25 → 3.125) — with the
   next halving (1,050,000, 3.125 → 1.5625) as the highlighted final row.
7. Manual block-height override: a "Set current block height" input lets the
   visitor replace the estimate with a height they looked up elsewhere; the
   countdown, progress bar and date all recompute instantly. Values are
   clamped to the current epoch (840,001–1,049,999); out-of-range input shows
   an inline error and keeps the previous value. A "Reset to estimate" button
   restores the anchor-derived height.
8. "How it works" explainer: halvings every 210,000 blocks, ~10 minutes per
   block, why the date is an estimate, and the note that this page fetches no
   live chain data.

Out of scope: live chain data (no network calls of any kind), price data or
price predictions, mining profitability, wallet or node connection, and any
account or login.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; a brass-bordered
note stating all figures are estimates from a labelled anchor, not live chain
data; the big countdown (four flip-style digit cards: days / hours / minutes /
seconds, same treatment as Event Countdown); an estimated-halving-date line
(local time + UTC); the epoch progress bar with "block X of 210,000 in this
epoch" label; a stats row (estimated current block, blocks remaining, current
reward, reward after halving); the past-halvings table with the next halving
row highlighted in brass; the override card (number input + Set button +
Reset button + inline error area + anchor note); "How it works" explainer;
footer link back to /ideas/. Visual treatment: dark premium `#0a0c0f`,
Fraunces headings, brass `#d2a24c` accents, generous whitespace; digits in
Fraunces with tabular numerals. Mobile: countdown cards go 2×2, stats stack
to one column, table scrolls horizontally if needed. States: active (digits
tick every second; block height increments every 10 minutes of wall-clock
time); override (brass "Using your height" badge appears; reset restores the
estimate); error (out-of-range or non-numeric height shows a red inline
message and the previous value is kept); reached (if the countdown ever hits
zero, digits freeze at 00 and a "Halving reached — check a block explorer for
confirmation" note appears).

## Acceptance criteria
- A user sees a ticking days/hours/minutes/seconds countdown to the estimated
  halving moment, plus blocks remaining and an estimated date in local time
  and UTC, all labelled as estimates.
- The estimated block height advances by one every 10 minutes of wall-clock
  time from anchor block 976,255 at 2026-11-17 09:55 UTC, and the anchor is
  stated on the page.
- The epoch progress bar shows the correct percentage: at the anchor height
  it is (976,255 − 840,000) / 210,000 ≈ 64.88%.
- Setting a manual block height within 840,001–1,049,999 recomputes the
  countdown, progress and date; an out-of-range value is rejected with an
  inline error and the previous value is kept.
- The past-halvings table lists all four halvings with the correct block
  numbers, dates and reward changes, and the next halving row is highlighted.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no network
  calls, no secrets, no email addresses.
