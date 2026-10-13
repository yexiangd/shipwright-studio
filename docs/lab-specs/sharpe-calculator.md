# Spec — Sharpe Ratio Calculator (`sharpe-calculator`)

## Concept
Sharpe Calculator is a free online tool that turns a pasted series of monthly returns (or prices) into the risk-adjusted ratios investors actually read: annualised Sharpe and Sortino, max drawdown, annualised volatility, CAGR and win rate. Paste returns as comma/space/newline-separated numbers in % or decimal form, optionally paste prices instead, set an annual risk-free rate, and everything recomputes live — including a canvas equity-curve chart with the underwater drawdown shaded. All computation is local in the browser; nothing is uploaded. Educational content only — not financial advice.

## Conventions (must be consistent in spec and implementation)
- Input series is assumed **monthly**. Returns are annualised ×12, volatility ×√12.
- **Number interpretation:** a parsed value with `|x| ≥ 1` is treated as a percent (÷100); otherwise it is already a decimal return. E.g. `2` → 0.02, `0.02` → 0.02, `-1` → −0.01. Decimals are only expressible in (−1, 1): a true 100% monthly return must be entered as `100`. Ambiguity is shown live in a "parsed as" preview strip.
- **Prices mode** (toggle): converts to simple returns `r_t = P_t / P_{t-1} − 1`; needs ≥2 prices.
- **Risk-free rate** entered as an annual % (e.g. 4.5); the monthly rf used is `annual/12` (simple, not compounded).
- **Std dev** is the sample (Bessel, n−1) standard deviation of monthly returns/excess returns.
- **Sortino** downside deviation: `sqrt( mean( min(0, excess_i)^2 ) )` over all observations (original Sortino formulation, target = rf), then annualised ×√12.
- **Max drawdown** computed on the equity curve `E_t = Π(1+r_t)` rebased to 100; reported as a positive % (e.g. "3.2%").
- **CAGR** = `(1 + mean_monthly)^12 − 1`. **Win rate** = fraction of periods with return > 0.

## Feature list (MVP, prioritized)
1. **Returns input**: textarea accepting comma/space/newline/tab-separated numbers; live token count and "parsed as %" preview of first values; invalid tokens listed inline.
2. **Prices mode toggle**: switch between "Monthly returns" and "Prices" input; prices auto-convert to simple returns.
3. **Risk-free rate input**: annual % number field (default 4.0); recompute on change.
4. **Metric grid** (6 tiles): Sharpe (ann), Sortino (ann), Max drawdown, Annualised vol, CAGR, Win rate — each with a one-line definition beneath.
5. **Equity curve chart** (canvas): equity rebased to 100 in brass; underwater region (running peak → equity) shaded translucent red; max drawdown peak-to-trough markers; hover tooltip with date-free index + equity value; x-axis = period index.
6. **Sample data button**: loads a 24-month sample series (mix of decimals and percents to demo parsing).
7. **Clear button** + states: empty (metrics show em-dash, chart area shows "paste a series or load sample data"), error (invalid tokens / fewer than 2 returns / zero variance), success.
8. **Explainer strip**: annualisation convention stated plainly, one caveat that Sharpe punishes upside vol (why Sortino exists), and an "educational only — not financial advice" disclaimer.
9. Out of scope: live price fetching or ticker lookup, multi-asset portfolios, non-monthly frequencies, Monte Carlo / confidence intervals, saved scenarios, CSV export.

## Design
- **Layout top to bottom**: breadcrumb back link → eyebrow + `h1` "Sharpe Calculator" → one-sentence quotable definition ("Sharpe Calculator is a free online tool that …") → input card (textarea + parse preview + prices toggle + risk-free rate + sample/clear buttons) → metric grid (2×3, hero emphasis on Sharpe) → equity curve canvas card → explainer bullets + disclaimer → footer ("Built by Shipwright Studio" + back link).
- **Visuals**: dark surface cards; brass `#d2a24c` equity curve and Sharpe value; translucent red drawdown shading; muted gridlines; Fraunces serif headings; single `h1`.
- **Interactions/states**: debounce input ~150ms; invalid tokens highlighted with count + first few shown; Sharpe undefined (n<2 or zero variance) shows "—"; empty series shows placeholder CTA state, not zeros.
- **Mobile**: single column; textarea full width; metric grid 2 columns; chart min-height 260px, touch hover via tap.
- Studio aesthetic: `#0a0c0f` background, Fraunces headings, brass accents, generous whitespace.

## Acceptance criteria
- [ ] Input `2, -1, 3, 1.5, -0.5` (parsed as %) with rf 3% yields Sharpe ≈ 1.5323, Sortino ≈ 3.9852, max drawdown 1.00%, ann vol ≈ 5.8736%, CAGR ≈ 12.6825%, win rate 60% (node-verified against hand computation).
- [ ] Prices mode: `100, 102, 100.98` converts to returns `0.02, -0.01`.
- [ ] Mixed `0.02, 3, -0.015` parses as `0.02, 0.03, -0.015` and the preview strip says so.
- [ ] Invalid tokens (e.g. `abc`) block metrics, list the offending token, and keep the last good state.
- [ ] Underwater drawdown shading renders on the canvas, and max drawdown marker labels the peak-to-trough span.
- [ ] seo-check passes with no failures; page meets all hard SEO requirements in §2 of the task.
