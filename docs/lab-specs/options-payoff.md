# Spec — Options Payoff Lab (`options-payoff`)

## Concept
Options Payoff Lab is a free online visualizer for option strategy payoffs at expiry. You stack individual legs (long/short calls and puts with custom strikes and premiums), or load a preset strategy like an iron condor or straddle, and it draws the combined profit-and-loss curve with breakevens, max profit and max loss. It is for traders sketching a structure before they price it: students learning how spreads behave, and retail option traders sanity-checking a ticket before sending it. Built with plain HTML, canvas-drawn charts, and a Black-Scholes delta for each leg — no dependencies, no market data, no signup.

## Feature list (MVP, prioritized)
1. **Leg editor**: add/remove up to 8 legs; per leg choose long/short × call/put, strike, premium, quantity.
2. **Strategy presets**: Long Call, Covered Call, Bull Call Spread, Bear Put Spread, Long Straddle, Long Strangle, Iron Condor, Butterfly — one click loads the legs and editable params.
3. **Payoff chart** (canvas): net P/L vs underlying price at expiry; breakeven markers; zero line; current-price reference line; area shading above/below zero; axis labels.
4. **Stats panel**: net premium (credit/debit), max profit, max loss, breakeven points (list).
5. **Greeks panel**: per-leg delta via Black-Scholes (needs IV + days to expiry inputs); aggregate net delta shown.
6. **Inputs**: underlying price, implied volatility %, days to expiry — sliders + number fields; chart updates live.
7. **Clear / reset** to empty strategy.
8. Out of scope: real market quotes, American early-exercise modelling, implied-vol surface, saving/sharing strategies, commissions/taxes.

## Design
- **Layout**: header (title + back to Lab link) → one-sentence quotable definition → main grid: left control column (presets, inputs, leg list), right chart card + stats strip + Greeks table below.
- **Chart**: dark surface, brass `#d2a24c` profit fill, muted red loss fill; hover crosshair showing price + P/L; responsive resize via `ResizeObserver`.
- **States**: empty (no legs → chart shows flat zero line + "add a leg or pick a preset" hint); active (chart + stats live); error (invalid input → field highlighted, keeps last good state).
- **Mobile**: controls stack above chart; chart canvas full-width, min height 300px; inputs are tap-friendly (44px targets).
- Visual treatment follows studio aesthetic: `#0a0c0f` background, Fraunces serif headings, brass accent, generous whitespace.

## Acceptance criteria
- [ ] A user can add a custom leg (e.g. short call, strike 110, premium 3, qty 2) and the chart/stats update instantly.
- [ ] Loading the Iron Condor preset produces exactly two breakevens, a finite max profit and a finite max loss, all shown.
- [ ] The chart shows breakeven markers, a zero line, and the current-price reference line.
- [ ] Changing the underlying price slider moves the current-price line and updates nothing about the expiry payoff (expiry payoff is time-independent).
- [ ] Per-leg deltas are computed with Black-Scholes and aggregate net delta matches the sum.
- [ ] With zero legs the page renders an empty state, not a broken chart.
