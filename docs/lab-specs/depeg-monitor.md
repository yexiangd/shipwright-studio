# Stablecoin Depeg Monitor — build spec

- Slug: `depeg-monitor`
- Idea: "Stablecoin Depeg Monitor", tagline "Peg deviation dashboard with demo feed."
- Status: doing → done on ship
- Page: `lab/depeg-monitor/index.html`

## Concept

Stablecoin Depeg Monitor is a free online tool that watches how far major stablecoins (USDT, USDC, DAI, FRAX, USDe, TUSD, PYUSD) sit from their $1.00 peg and flags any coin drifting too far, with a live chart, per-coin sparklines, and a user-set alert threshold. It is for crypto-curious builders, traders, and students who want to understand peg deviation — what a 10-basis-point wobble looks like, when a drift becomes a depeg, and how fast a coin can recover — without signing up for a market-data account. It is delightful because the dashboard is alive: prices tick every second and a half, charts draw themselves, and a "Simulate depeg" button lets you watch a demo depeg event unfold and recover in real time. **All prices are simulated, client-side, labelled DEMO — the feed is not real market data.**

## Feature list (MVP, priority order)

1. **Stablecoin table/cards** — rows for 7 stablecoins (USDT, USDC, DAI, FRAX, USDe, TUSD, PYUSD) showing symbol, name, current simulated price (4 decimals), deviation from $1.00 in % and in basis points, and a status badge (Pegged / Watch / Depegged). Rows are sortable by deviation magnitude (click the Deviation header to toggle).
2. **Status badges with clear thresholds** — Pegged when |deviation| < 0.10% (10 bps), Watch when 0.10% ≤ |deviation| < 0.50% (50 bps), Depegged when |deviation| ≥ 0.50%. Thresholds are printed in a legend under the table so the rule is never hidden.
3. **Simulated live feed** — prices tick every 1.5 s via a client-side random walk with mean reversion to $1.00; each coin has its own volatility, prices stay clamped to [$0.90, $1.10], and occasional small depeg events occur on their own. A Pause / Resume feed button freezes the feed (state shown on the button).
4. **Selected-coin price chart (canvas)** — clicking a row selects that coin; a canvas line chart draws its price history (last ~60 ticks) against a $1.00 peg line, with the current price and deviation labelled. The chart updates on every tick.
5. **Deviation sparklines** — a small canvas sparkline per row showing that coin's recent deviation history (last ~40 ticks), coloured brass when pegged and red when depegged.
6. **Alert threshold control** — a number input (default 0.50%) lets the user set the alert threshold; any row whose |deviation| meets or exceeds the threshold is highlighted and a banner above the table counts the active alerts ("2 coins breaching your 0.50% alert threshold"). The threshold is saved to localStorage and restored on load.
7. **Simulate depeg button** — triggers a demo event: a randomly chosen coin (not already depegged) drops 1–3% below peg over a few ticks and then recovers over the following ~30 ticks; the button is disabled while an event is running and the affected coin is named in a status line ("Demo event: DAI depegging…").
8. **Demo disclaimer** — a prominent banner at the top of the page and a line in the footer: "Demo data — simulated feed, not real market data. Prices are generated in your browser and never leave the page."

Out of scope for this version: real market data or any network request, historical data beyond the live session, email/SMS/webhook alerts, portfolio holdings or P&L, other pegged assets (gold, fiat), theme switching, any server or API call.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as aspect-ratio).
2. Eyebrow: `Lab — Market Tools`.
3. `h1`: Stablecoin Depeg Monitor.
4. Definition paragraph (`.define`): "Stablecoin Depeg Monitor is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Demo disclaimer banner (`.demo-banner`, brass border, "DEMO" tag): "Demo data — simulated feed, not real market data. Prices are generated in your browser and never leave the page."
6. Alert banner (`.alert-banner`, hidden when 0 alerts): "⚠ N coin(s) breaching your X% alert threshold" — appears when any row breaches the threshold; hidden otherwise. A status line under it reports the feed state ("Feed live — ticking every 1.5 s" / "Feed paused" / "Demo event: DAI depegging…").
7. Controls card (`.card`): alert-threshold number input (%, step 0.05, min 0.05, max 5) with a short explanation, "Simulate depeg" button (brass), and "Pause feed" / "Resume feed" button. Controls sit in one row on desktop, wrap on mobile.
8. Chart card (`.card`): "Price chart — <selected coin>" heading, a canvas (~280px tall) drawing the price history with a dashed $1.00 peg line and a brass price line, plus a readout line: current price, deviation %, bps, and status badge for the selected coin.
9. Table card (`.card`): a table — columns Coin, Price, Deviation %, Deviation (bps), Status, Sparkline. Clicking a row selects the coin (highlighted row, chart switches). The Deviation header is a sort toggle (ascending/descending by |deviation|). Rows breaching the alert threshold get an alert highlight (red-tinted background + left border).
10. Legend card: the three status thresholds spelled out (Pegged < 0.10%, Watch 0.10–0.50%, Depegged ≥ 0.50%) and a short "How the demo feed works" note (random walk + mean reversion, clamped to $0.90–$1.10, occasional auto depeg events, no network).
11. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty**: never empty — the feed starts with 7 coins at prices near $1.00 and ~60 ticks of pre-generated history, so the chart and sparklines are drawn on first paint.
- **Active**: every 1.5 s tick updates prices, deviations, badges, sparklines, the chart, and the alert count. Selecting a row switches the chart and its readout immediately. Changing the alert threshold re-highlights rows and the banner instantly; invalid threshold input shows an inline error and keeps the last valid value.
- **Success**: a depeg event completes when the coin recovers inside the Watch band; the status line reports "Demo event finished — DAI recovered to $0.9991." Rows recovering drop their alert highlight and the banner count falls.
- **Error**: threshold input outside 0.05–5% or non-numeric shows "Alert threshold must be between 0.05% and 5% — keeping 0.50%." and keeps the last valid threshold. Canvas is never relied on for the numbers — every value also appears as text in the table.

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings, system sans for UI labels, JetBrains Mono for prices, percentages, and table values; generous whitespace, max-width 960px, centred. Status colours: Pegged — muted green `#7fb069`; Watch — brass `#d2a24c`; Depegged — muted red `#e07856`. Alert rows get a red-tinted background and a 3px red left border. The demo banner is a brass 1px outline with a brass "DEMO" tag.

Mobile: single column — controls stack, table scrolls horizontally if needed (fits at 360px via compact padding and a smaller sparkline), chart canvas shrinks to fit, threshold input stays full-width.

## Acceptance criteria

1. A user can see 7 stablecoins with simulated prices near $1.00, each showing deviation in % and basis points and a status badge that matches the published thresholds (e.g. a −0.13% deviation shows −13 bps and a Watch badge).
2. A user can click a row and see that coin's live price chart update on every tick, with the $1.00 peg line visible and the current price/deviation labelled.
3. A user can set an alert threshold (e.g. 0.20%) and immediately see breaching rows highlighted and the alert banner count update; an out-of-range threshold shows an inline error and keeps the last valid value.
4. A user can click "Simulate depeg", watch a coin drop below peg and recover over the following ticks, and see the status line name the coin and report the recovery.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, a visible "Demo data — simulated feed, not real market data" disclaimer, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (deviationPct, deviationBps, statusFor, isAlert, clampPrice, stepPrice, simulateDepegStep, COINS, STATUS_THRESHOLDS) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
- Deviation math: `deviationPct = (price - 1) * 100`; bps = `deviationPct * 100` (1% = 100 bps); price 0.9987 → −0.13% / −13 bps. Status thresholds: |dev| < 0.10% Pegged; 0.10–0.50% Watch; ≥ 0.50% Depegged.
- Feed model: each tick, `price += (1 - price) * 0.02 + (rand - 0.5) * 2 * volatility` (mean reversion + noise), then clamp to [0.90, 1.10]. Volatilities: USDT/USDC 0.0004, DAI 0.0007, FRAX 0.0009, USDe 0.0012, TUSD 0.0010, PYUSD 0.0008. A demo depeg event sets a target of 1 − (0.01 + rand * 0.02) for ~6 ticks, then releases to mean reversion; auto events fire with ~2% probability per tick when no event is running.
- Seeded randomness is not used; the demo is intentionally non-deterministic, but all pure functions are deterministic given their inputs, which is what node tests cover.
