# Build Spec — Backtest Visualizer (`lab/backtest-visualizer/`)

## Concept
A single-page backtest visualizer for strategy tinkerers. Paste or upload a CSV of daily returns (or prices), and the page renders an equity curve, an underwater (drawdown) chart, and a monthly returns heatmap — plus the stats that matter: total return, CAGR, max drawdown, Sharpe, and win rate. Everything runs in the browser; no data leaves the machine. A "load sample data" button ships a synthetic 3-year series so the page is useful in one click.

## Feature list (MVP, in priority order)
1. **Data input** — paste CSV into a textarea OR upload a `.csv` file; accepts `date,return` (decimal or `%`) or `date,price` (auto-detected); sample-data button loads a built-in series.
2. **Robust parsing** — header row optional; tolerates blank lines; rows sorted by date; invalid rows reported as "skipped N rows" (never silently dropped without a count).
3. **Equity curve** — canvas line chart of cumulative growth (starts at 100), brass line on dark grid, hover crosshair with value readout.
4. **Underwater chart** — drawdown depth over time, red area fill; max-drawdown point annotated.
5. **Monthly heatmap** — year × month grid colored green/red by monthly return; tooltip with exact value; empty months dimmed.
6. **Stats cards** — Total return, CAGR (annualized), Max drawdown, Sharpe (√252), Win rate (days), Best/Worst month. All from the same return series, rounded sanely.
7. **Error state** — fewer than ~20 valid rows → friendly message "need at least 20 data points", keeps sample button visible.

**Out of scope**: benchmarks/overlay comparison, trade-level logs, fees/slippage modeling, live market data, export PNG/PDF.

## Design
- Top to bottom: studio topbar → `h1` "Backtest <em>Visualizer</em>" → quotable definition paragraph (GEO) → input card (tabs: Paste / Upload / Sample) → stats row (6 cards) → equity chart card → underwater chart card → monthly heatmap card → CSV format help + privacy note → footer.
- Charts: responsive canvas, DPR-aware; brass `#d2a24c` equity line, red `#e0655f` drawdown fill, green/red diverging heatmap cells on dark; mono numbers, tabular-nums.
- States: empty → sample CTA visible; parsing → spinner; <20 rows → error card; success → all sections render.
- Mobile: stats grid 2-col; charts full-width with horizontal scroll-free scaling (canvas re-renders at container width); textarea usable.

## Acceptance criteria
- Loading sample data renders all six stats, the equity curve, the underwater chart, and a populated heatmap with no console errors.
- Uploading a `date,price` CSV produces the identical stats as the equivalent `date,return` CSV (within rounding).
- A CSV with junk rows reports the skip count and still renders the valid portion.
- Hovering the equity chart shows the date and value at the cursor.
- Exactly one `h1`, canonical + WebApplication JSON-LD present; no network calls except Google Fonts.
