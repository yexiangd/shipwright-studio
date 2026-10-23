# Efficient Frontier Plotter — build spec

Slug: `efficient-frontier` · Tagline: "Markowitz frontier from expected returns and covariances."

## Concept

Efficient Frontier Plotter is an interactive mean-variance portfolio optimizer in the style of Harry Markowitz's portfolio theory, running entirely in the browser. The user defines 2–6 assets with expected returns and volatilities plus a correlation matrix; the page computes the efficient frontier (the set of portfolios with the highest expected return for each level of risk), plots it as a smooth curve, and marks the global minimum-variance portfolio and the maximum-Sharpe (tangency) portfolio for a given risk-free rate. It is for investors, finance students, and developers curious about portfolio theory — delightful because hovering anywhere along the curve instantly reveals the exact asset-weight mix of that frontier portfolio, and a long-only toggle answers "what changes if I can't short?" Everything is local: no data leaves the page.

## Feature list (MVP, priority order)

1. **Asset editor table** — 2–6 assets; per asset: name, expected return %, volatility %; add/remove rows; live numeric validation (volatility > 0; return any real number).
2. **Correlation matrix editor** — N×N grid; diagonal locked at 1.00; edits mirror symmetrically; inputs clamped to [−1, 1]; on change, the page checks the matrix is positive-definite and shows an inline warning if not (curve keeps the last valid result).
3. **Frontier curve (shorts-allowed, closed form)** — using Σ⁻¹: a = 1′Σ⁻¹1, b = 1′Σ⁻¹μ, c = μ′Σ⁻¹μ, d = ac − b²; for target returns μₚ across a sensible range plot σ(μₚ) = √((aμₚ² − 2bμₚ + c)/d). Gaussian elimination written by hand (no dependency).
4. **Long-only mode** — toggle "Short selling allowed / Long-only". Long-only frontier: dense grid over the weight simplex (step 0.05, N ≤ 6) + upper Pareto hull (for each return bin keep the minimum-volatility point, then take the non-dominated upper envelope). All plotted weights ≥ 0.
5. **Special portfolios** — global minimum-variance portfolio (w = Σ⁻¹1/a) and maximum-Sharpe tangency portfolio (w ∝ Σ⁻¹(μ − r_f·1), normalized), drawn as distinct markers with labels; per-asset points drawn as small dots; risk-free rate input (default 2%).
6. **Interactive chart** — hi-dpi canvas; hover crosshair snapping to the nearest frontier point; tooltip + side inspector showing that portfolio's weights (bar list, summing to 100%), expected return, volatility, Sharpe.
7. **3-asset preset on load** — "Example: US Stocks / Bonds / Crypto-like" pre-filled so the page is alive immediately; "Reset to example" button.
8. **Copy weights** — one click copies the currently selected portfolio's weights as CSV text (name,weight%) with a "Copied ✓" toast.

Out of scope: fetching historical prices, Monte Carlo resampling / robust optimization, Black–Litterman, constraints beyond long-only, taxes or transaction costs, pinch-zoom (basic responsive layout only), saving portfolios across sessions.

## Design

Page structure top → bottom:
1. Top nav (`/` → Shipwright Studio, `/ideas/` → Idea Lab) — same as other lab pages.
2. Eyebrow "Lab · Finance tools", h1 "Efficient Frontier Plotter", definition paragraph (quotable: "Efficient Frontier Plotter is a free online tool that …").
3. **Inputs card** — asset table (Name | Expected return % | Volatility %), add/remove asset buttons; correlation matrix grid below with a one-line hint; risk-free rate input; mode toggle (Shorts allowed / Long-only); preset reset button.
4. **Chart card** — canvas (~16:9, min height 320px), legend (Frontier / Min-variance / Max Sharpe / Assets), hover tooltip; below it a slim inspector strip: selected portfolio stats + weight bars + "Copy weights" button.
5. **Explainer card** — "What is the efficient frontier?" definition paragraph + the three formulas (frontier σ(μ), GMV, max-Sharpe) in plain text; `<details>` with 2–3 caveats (garbage-in-garbage-out: outputs only as good as the inputs; educational, not investment advice).
6. Footer linking `/ideas/` and `/`, "Built by Shipwright Studio" signature.

Key interactions / states:
- **Empty**: never empty — 3-asset preset is loaded on first visit.
- **Active**: any input change re-validates and re-renders the curve instantly (debounced ~150ms); hover/tap on the curve selects the nearest point; invalid input (empty cell, corr outside [−1,1]) gets an inline red hint and the curve holds its last valid state.
- **Success**: weights table always sums to 100.00% (display rounding note); copy button flashes "Copied ✓".
- **Error**: non-positive-definite correlation matrix → amber warning "Correlation matrix is not valid (not positive-definite) — curve shows the last valid result"; singular Σ (e.g. two perfectly-correlated assets) handled the same way.

Visual treatment: dark premium `#0a0c0f`, panel `#101318`, Fraunces headings, brass `#d2a24c` accents (frontier curve, max-Sharpe marker), muted teal/grey for secondary markers, generous whitespace. Chart axes in `#8a93a0`. Mobile: inputs stack; asset table and correlation grid scroll horizontally; canvas full width; hover becomes tap-to-select.

## Acceptance criteria

1. With the 3-asset preset, the frontier renders as a smooth curve; the GMV marker matches w = Σ⁻¹1/(1′Σ⁻¹1) to 1e-6 and its σ is the minimum σ on the plotted curve (σ rises as |μₚ − μ_GMV| grows, checked at ≥5 points per side).
2. Max-Sharpe weights sum to 1.000 (within 1e-9) and its Sharpe ratio is ≥ every portfolio in a 10,000-point random-weight benchmark (seeded).
3. Long-only mode: every plotted frontier point has all weights ≥ −1e-9 and sums to 1; the two hull endpoints equal the min-return and max-return single-asset points.
4. Hovering/tapping the curve selects a point whose inspector weights sum to 100% (±0.02 display rounding) and whose return/volatility match the curve coordinates.
5. Core math passes node unit checks (hand-rolled inverse, GMV formula vs a 2-asset hand-solved fixture, Sharpe benchmark win, monotonicity, long-only hull non-negativity).
6. The page meets all lab SEO requirements: unique title "Efficient Frontier Plotter · Shipwright Studio", one-sentence meta description, definition paragraph, canonical link, WebApplication JSON-LD, exactly one h1, footer links to `/ideas/` and `/`, canvas has `role="img"` + `aria-label`, no `mailto:`/emails/secrets.
