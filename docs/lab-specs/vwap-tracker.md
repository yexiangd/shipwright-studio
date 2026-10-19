# Spec — VWAP Tracker

**Idea slug:** `vwap-tracker`
**Status:** doing → done on ship

## Concept

VWAP Tracker is a free online tool that draws a stock's intraday price against its volume-weighted average price (VWAP) and the classic deviation bands (±1σ, ±2σ), the chart every day trader glances at but nobody can see without a paid terminal. The user picks a ticker-style scenario or pastes their own price/volume series, and the lab renders the bands live with a "where would mean reversion have paid off" readout. Useful as a teaching lab for VWAP mechanics; delightful because the animated intraday replay makes the bands' logic click visually. No live market data — everything runs on included sample sessions or user-pasted data.

## Feature list (MVP, priority order)

1. **VWAP engine:** cumulative Σ(P×V)/ΣV per bar, computed in JS from bar data (time, price, volume).
2. **Deviation bands:** rolling ±1σ and ±2σ around VWAP using the session's price residuals weighted by volume; render as 5 lines (VWAP + 4 band edges).
3. **3 sample sessions:** "Trend day", "Chop", "Reversal" — hand-crafted 78-bar (5-min bars over 6.5h) series with realistic volume curve (open/close heavy).
4. **Custom paste:** textarea accepting `HH:MM,price,volume` lines; parse errors reported with line numbers; generates a new session instantly.
5. **Replay mode:** animated sweep through the day at adjustable speed; a marker moves along price while bands extend; pause/resume/reset.
6. **Band-touch stats:** count of touches and closes beyond ±2σ, max excursion %, and a simple "band-reversion score" (fraction of ±2σ excursions that later reverted to VWAP within the session).
7. **Time scrub:** click/drag on chart to inspect any bar's price, volume, VWAP, and band values in a readout strip.
8. **Canvas chart:** single `<canvas>`, devicePixelRatio-scaled, dark theme, legend, axis labels (time x, price y).

**Out of scope:** live market data / any network fetch, multiple tickers, alerts, trade-size calculator, exporting images, server persistence.

## Design

- **Structure:** h1 + quotable definition paragraph ("VWAP Tracker is a free online tool that ...") → session selector (3 presets + Custom) → canvas chart (main, ~60vh) → readout strip (hovered/selected bar values) → controls row (Replay/Pause/Reset, speed slider) → stats cards (band touches, max excursion, reversion score) → "How VWAP works" explainer (3 short paragraphs) → custom-paste panel (collapsible).
- **Interactions:** replay animates with requestAnimationFrame; scrub via pointer events; stats recompute per session; invalid paste → error list under textarea.
- **States:** empty custom (placeholder), active (chart live), error (parse errors listed, chart keeps last good session).
- **Visual:** dark `#0a0c0f`, brass `#d2a24c` for VWAP line, muted teal/red bands at low opacity, Fraunces headings, generous whitespace. Mobile: canvas full-width, controls wrap, stats stack.
- **SEO:** per-lab standards.

## Acceptance criteria

- A user can select each of the 3 sample sessions and see 5 correctly drawn lines (VWAP + ±1σ + ±2σ) on a labelled chart.
- Replay mode animates the day with pause/resume/reset and a speed control.
- A user can scrub any bar and read its price, volume, VWAP, and band values.
- A user can paste a valid 10-line `HH:MM,price,volume` series and get a new session; invalid lines are reported with line numbers.
- The band stats (touches beyond ±2σ, max excursion, reversion score) match a node-verified reference computation.
