# Trading Journal — build spec

## Concept

Trading Journal is a free, private trade-logging tool for retail traders who
want to learn from their own history. You enter each trade — date, symbol,
direction, entry, exit, and size — and the page instantly computes the
performance stats that matter: total P&L, win rate, profit factor,
expectancy, average win and loss, and best and worst trade. Everything runs
entirely in the browser: trades persist in localStorage, nothing is uploaded
anywhere, and a CSV export lets you take your data with you.

## Feature list (MVP, in priority order)

1. **Add-trade form** — fields: date, symbol, direction (Long/Short), entry
   price, exit price, quantity, optional note. Validation: required fields
   present, prices and quantity positive numbers, exit present before the
   trade counts. Invalid input shows an inline error and adds nothing.
2. **Live stats bar** — recomputed on every change: total P&L, trade count,
   win rate, profit factor, expectancy, average win, average loss, best
   trade, worst trade. All figures are plain per-trade P&L (no commissions,
   no fees) and are safe on an empty list (zeros and dashes, never NaN or
   Infinity).
3. **Trade table** — newest first, one row per trade showing date, symbol,
   direction, entry, exit, quantity, P&L (green/red), and note; each row
   has a delete button.
4. **localStorage persistence** — trades load on page open and save on every
   add/delete/clear. A corrupt stored value is ignored and treated as an
   empty journal rather than crashing the page.
5. **CSV export** — downloads `trading-journal.csv` with a header row and one
   row per trade including computed P&L. Export is disabled when the journal
   is empty.
6. **Load sample trades** — one click fills the journal with a fixed set of
   6 illustrative trades (mixed longs/shorts, wins/losses) so a first-time
   visitor can see the stats working. Only offered when the journal is
   empty.
7. **Clear all** — wipes every trade after a `confirm()` dialog; no
   confirmation, no wipe.

### Out of scope for this version

- No commissions, fees, or taxes in P&L math (per-trade gross P&L only).
- No charts or equity curve.
- No editing of an existing trade (delete and re-add instead).
- No open/partial positions — every trade is closed (entry + exit).
- No accounts, sync, or server storage of any kind.
- No market data, prices, or symbol lookup.

## Design

Page structure top to bottom:

1. **Nav** — "Shipwright Studio" (home) and "Idea Lab" (`/ideas/`), same as
   other lab pages.
2. **Eyebrow + h1 + definition paragraph** — "Trading Journal is a free
   online tool that …" (the quotable summary for answer engines).
3. **Stats card** — a grid of stat tiles (Total P&L, Trades, Win rate,
   Profit factor, Expectancy, Avg win, Avg loss, Best, Worst). Empty state:
   all tiles show `—` or `0` with a short line "No trades yet — add your
   first trade below, or load sample trades."
4. **Add-trade form card** — labelled fields in a responsive grid; Long /
   Short as a segmented control; submit button "Add trade"; inline error
   line (empty by default).
5. **Actions row** — "Load sample trades" (only when empty), "Export CSV",
   "Clear all" (danger styling).
6. **Trade table card** — table with a sticky header on desktop; on mobile
   the table scrolls horizontally rather than reflowing. Empty state: a
   single row reading "No trades logged yet."
7. **Explainer** — a `<details>` block defining win rate, profit factor, and
   expectancy in plain language.
8. **Disclaimer + footer** — "This is a personal journal tool, not financial
   advice." Footer links back to `/ideas/` only (never `/lab/`).

Key interactions and states:

- **Empty**: stats show dashes/zeros, table shows the empty row, Export is
  disabled, "Load sample trades" is visible.
- **Active**: adding a trade appends it, stats update immediately, the form
  resets (date defaults to today on load and after each add).
- **Success**: a brief confirmation line ("Trade added.") appears after a
  successful add and clears on the next interaction.
- **Error**: missing/invalid fields show an inline message naming the
  problem; nothing is added and existing trades are untouched.
- **Delete**: removing a row updates stats and storage immediately.
- **Clear all**: `confirm()` gate; cancelling leaves everything untouched.

Visual treatment: dark premium `#0a0c0f` background, `#101318` cards,
`#1c2128` borders, Fraunces serif headings, brass `#d2a24c` accents, sans
UI text for forms and tables. P&L positive in green (`#4caf7d`), negative
in red (`#e0655a`). Generous whitespace, max-width 960px, centred.

Mobile considerations: the form grid collapses to a single column; the
stats grid goes 3 → 2 columns; the trade table scrolls horizontally inside
its card; buttons stay full-width tappable.

## Acceptance criteria

1. A user can add a trade (long or short) and immediately see it in the
   table and reflected in every stat tile.
2. The page computes win rate, profit factor, expectancy, average win/loss,
   best/worst trade, and total P&L correctly for mixed long/short trades,
   and shows safe values (no NaN/Infinity) with zero trades.
3. Trades survive a page reload via localStorage, and a corrupt stored value
   degrades to an empty journal.
4. A user can export all trades (with computed P&L) as a CSV file, load
   sample trades into an empty journal, delete individual trades, and clear
   all trades only after confirming.
5. The page has exactly one `h1`, a unique title and description, a
   canonical link, a WebApplication JSON-LD block, no images, no email
   addresses, no `mailto:` links, and no secrets.
