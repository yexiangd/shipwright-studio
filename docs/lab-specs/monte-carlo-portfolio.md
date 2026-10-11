# Build Spec — Monte Carlo Portfolio Sim

**Slug:** `monte-carlo-portfolio` · **idea-105** · category: devtool · effort M

## Concept

A Monte Carlo Portfolio Simulator is a free online tool that runs thousands of simulated investment paths — each year drawing a random return from a log-normal distribution around a user-set mean and volatility — and shows the odds of reaching a financial goal. It's aimed at curious investors, students, and anyone doing rough retirement planning who wants to feel the range of outcomes, not just the average. The delight is the fan chart: hundreds of faint possible futures collapsing into clear percentile bands, turning abstract "sequence of returns" risk into something you can see.

## Feature list (MVP, in priority order)

1. **Inputs panel** — initial balance, annual contribution, years (5–50), expected annual return %, annual volatility %, goal target, simulations (1k / 2.5k / 5k), inflation-adjusted toggle.
2. **Preset scenarios** — Conservative / Balanced / Aggressive buttons that fill in return + volatility (6%/5%, 9%/12%, 12%/20%).
3. **Run simulation** — Box–Muller normals, yearly compounding with contributions at start of each year; progress indicator while running; re-run button.
4. **Fan chart (canvas)** — P10 / P25 / P50 / P75 / P90 bands by year, plus a faint overlay of ~150 individual paths; goal target drawn as a dashed line.
5. **Summary stat cards** — median final value, P10–P90 range, probability of hitting goal, probability of ending below starting capital. All numbers formatted with commas.
6. **Outcome histogram (canvas)** — distribution of final portfolio values across runs, with goal marker.
7. **Export** — download the yearly percentile bands as CSV.
8. **Disclaimer** — one line under the controls: educational toy, not financial advice; past returns don't predict the future.

**Out of scope:** taxes, rebalancing schedules, multi-asset allocation sliders, monthly (vs annual) steps, saving scenarios, shareable URLs.

## Design

- **Structure top→bottom:** breadcrumb back to `/ideas/` · h1 + one-sentence definition paragraph (quotable, GEO) · controls card (two-column on desktop, stacked on mobile) · stats row (4 cards) · fan chart canvas (wide, ~16:9) · histogram canvas (half width) + "how it works" column (half width) · footer "Built by Shipwright Studio" + back link.
- **Interactions/states:** empty state = pre-run placeholder message inside each canvas area ("Set your numbers and hit Run"); active = progress bar + disabled inputs while simulating (chunked via setTimeout so UI stays responsive); success = charts + stats fade in; edge case = years/volatility clamped, "goal = 0" disables the probability card with a hint.
- **Visual treatment:** dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accent for median line and primary button; percentile bands in desaturated brass tints; histogram bars brass→slate gradient; generous whitespace; no template gimmicks.
- **Mobile:** controls stack, canvases resize via devicePixelRatio, stat cards 2×2 grid.

## Acceptance criteria

1. A user can set starting balance $10k, $6k/yr contribution, 30 years, 9%/12%, and see a fan chart with five labelled percentile bands plus ~150 individual paths.
2. The stats cards show a median, a P10–P90 range, a goal-hit probability between 0–100%, and a loss probability — all formatted with thousand separators.
3. The CSV export downloads and contains one row per year with the five percentile columns.
4. Running twice with different inputs produces different numbers; the sim completes 5k runs × 50 years in under ~3s on a laptop (chunked, non-blocking UI).
5. The page passes the repo `scripts/seo-check.py` (title, description, canonical, one h1, JSON-LD, no secrets).
