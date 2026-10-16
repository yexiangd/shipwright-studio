# Build Spec — Pairs Trading Lab (`pairs-trading-lab`)

**Seed:** "Cointegration and spread z-score explorer for pair trades." · category: devtool · effort: L

## Concept

Pairs Trading Lab is a free online tool that teaches how statistical pairs trading works, using fully synthetic price pairs generated in the browser — no live market data, no API keys, no account. The user picks a scenario preset (Tight, Sloppy, Drifting, or Broken pair) and tunes the data-generating process: mean-reversion speed, spread noise, hedge ratio, structural drift. The Lab then runs the real statistical workflow a pairs trader would run: estimate the hedge ratio by OLS, compute the rolling spread z-score, test the spread for stationarity with an ADF-style heuristic, and backtest a ±σ-band entry/exit strategy with a trade log. The delight is watching cointegration break in real time — flip from "Tight pair" to "Broken pair" and see the stationarity verdict, bands, and P&L collapse together.

## Feature list (MVP, priority order)

1. **Synthetic pair generator** — seeded PRNG (mulberry32) with *independent* gaussian streams for the Stock A random walk and the spread shocks (shared innovations would inject spurious correlation). Stock A = random walk; spread follows an Ornstein–Uhlenbeck process `s_{t+1} = s_t + θ(μ − s_t) + σ_s·ε`, plus optional smooth structural drift and a **regime shift** (at the midpoint the spread jumps to a new long-run mean and stays there — the classic pair-killer: a takeover, a business-model break); Stock B = β·A + spread. 252 trading days per run.
2. **Scenario presets** — Tight pair (fast θ, low noise), Sloppy pair (slow θ, high noise), Drifting pair (very slow θ, wide noise — still tradeable around the local trend, verdict gets shaky), Broken pair (mid-sample regime shift: the spread jumps to a new level and never comes home — the failure mode that kills real pairs books). Presets set all parameter sliders.
3. **Parameter sliders** — mean-reversion speed θ, spread noise σ_s, true hedge ratio β, smooth structural drift, one-time regime shift ($ jump at day 126), entry threshold (1.5–3σ), exit threshold (0–1σ), per-trade cost ($). "New random pair" re-seeds.
4. **OLS hedge-ratio estimation — no lookahead** — regress B on A over a 60-day *formation window only* (classic formation/trading split); the spread is then computed out-of-sample for the remaining days. Report β̂ and the lookback correlation of the pair. The true β stays visible so users see estimation error. (Deliberate choice: full-sample OLS would demean the series and manufacture spurious mean reversion — a Brownian-bridge artifact — making even a random-walk "broken" pair look tradable. The Lab refuses to cheat like that.)
5. **Spread z-score engine** — spread = B − β̂·A; rolling 60-day mean/std; current z with a live signal badge (Long spread / Short spread / Flat).
6. **Stationarity heuristic** — simplified Augmented Dickey–Fuller on the spread (regress Δs on s_{t−1}, t-stat of the lag coefficient vs ≈ −2.86 critical value) plus estimated mean-reversion half-life in days. Verdict: "likely stationary" / "not stationary". Labeled clearly as a heuristic, not a formal test.
7. **Band backtest with trade log** — ±entry-σ entries, exit at |z| ≤ exit-σ, traded only after the 60-day formation window; positions sized to a fixed $10,000 notional per leg (spread P&L scaled by `10000 / mean|B|`, so a flat per-side cost is economically meaningful — this mirrors how real pairs books size trades); per-trade costs deducted; metrics: total P&L ($), trades, win rate, max drawdown, return on exposure; per-trade log (entry/exit day, direction, entry z, exit z, P&L). The spread chart shades the formation period.
8. **Two canvas charts** — (a) normalized price co-movement (A vs B / 100 rebased); (b) spread with rolling ±2σ bands and entry/exit markers. Responsive, resize on window change.

Out of scope: live market data, uploading own price series, multi-pair portfolios, transaction-cost modeling beyond a flat per-trade cost, leverage/margin modeling, regime-switching estimation. Every number on the page is synthetic — the footer disclaimer and "How to read this" section say so plainly.

## Design

Dark premium `#0a0c0f` background, Fraunces serif headings, brass `#d2a24c` accent, generous whitespace.

Top to bottom: studio header (brand + Lab/Ideas nav → `/ideas/`) → `h1` "Pairs Trading <span class='accent'>Lab</span>" → quotable definition paragraph ("Pairs Trading Lab is a free online tool that ...") → short summary → two-column grid: left card "Market & strategy controls" (scenario chips, sliders with live values, regenerate button, disclaimer micro-note); right card "Estimates" (stat rows: β̂ vs true β, half-life, ADF-style t-stat + verdict badge, correlation, current z + signal badge). Full-width chart card "Price co-movement" (canvas), full-width chart card "Spread & bands" (canvas) → backtest card: metrics row (5 stat tiles) + trade log table → "How to read this" explainer with formulas and the stationarity-heuristic caveat → footer: educational-only disclaimer, nav to `/ideas/` (never `/lab/` — CI seo-check fails on `/lab/` links).

Key interactions: changing any slider or preset regenerates and recomputes everything live (no apply button). "New random pair" bumps the seed and regenerates. Hovering a chart row highlights the nearest day in both charts (optional stretch; spec says: implement crosshair on spread chart only if cheap — decision: implement simple vertical crosshair on both charts sharing the day index).

States: idle → everything computed on load (no empty state needed beyond first paint); error state: none expected, guard against NaN in stats (std = 0 edge) by disabling signals when bands are flat.

Mobile: controls collapse to single column; charts full width with horizontal touch crosshair; sliders `min-height: 44px`; trade log table scrolls horizontally.

## Acceptance criteria

1. A user can pick "Broken pair", press nothing else, and watch the stationarity verdict flip to "not stationary" while the backtest P&L deteriorates vs the "Tight pair" preset.
2. The page shows estimated β̂ within 0.15 of the true β for the Tight preset, a finite half-life, and an ADF-style t-stat below −2.86 for the Tight preset.
3. A user can drag the entry-threshold slider and immediately see the band lines, trade markers, and backtest metrics (trades, win rate, P&L) update.
4. The trade log's per-trade net P&Ls (both side costs included) sum exactly to the reported total P&L; win rate = winners / total trades; max drawdown ≥ 0 reported as −$; all metrics finite numbers.
5. Page ships with unique title "Pairs Trading Lab · Shipwright Studio", canonical, one-sentence meta description, one `h1`, WebApplication JSON-LD, `alt` on any image, and a footer disclaimer that data is synthetic and the page is educational, not investment advice.
