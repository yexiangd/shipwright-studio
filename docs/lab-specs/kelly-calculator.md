# Spec — Kelly Criterion Calculator (`kelly-calculator`)

## Concept
Kelly Criterion Calculator is a free online position-sizing tool for bettors and traders. You enter your estimated win probability and the payoff odds of the bet, and it computes the Kelly-optimal fraction of bankroll to stake — the fraction that maximizes long-run logarithmic growth. It shows full, half and quarter Kelly stakes, draws the expected-growth-vs-fraction curve so you can see why overbetting destroys wealth, and translates the fraction into a dollar stake for your bankroll. For anyone sizing trades, poker bets or sports wagers who wants the math, not vibes. All local, no signup. Educational content only — not financial advice.

## Feature list (MVP, prioritized)
1. **Inputs**: win probability `p` (%, slider + number), payoff odds `b` (net profit per 1 unit staked, e.g. 1 = even money), optional bankroll ($).
2. **Kelly fraction** `f* = p − (1−p)/b`, recomputed live; shown as % with a plain-English read ("Bet 20% of bankroll per opportunity").
3. **Fractional Kelly row**: full / half / quarter Kelly percentages side by side, with expected growth per bet for each.
4. **Growth curve chart** (canvas): expected log-growth `g(f) = p·ln(1+bf) + (1−p)·ln(1−f)` from f=0 to f=1 (and past 1 in muted red "ruin zone"); markers at f*, half Kelly, and the user's selected fraction; hover crosshair with values.
5. **Stake translation**: if a bankroll is entered, show dollar stakes for full/half/quarter Kelly.
6. **No-edge state**: when `f* ≤ 0`, replace the curve peak messaging with "No edge — the math says don't bet" and keep the curve for illustration.
7. **Presets**: "Fair coin at 60% (even money)", "Trading edge: 55% win, 1.5R payoff", "Longshot: 25% win, 4:1" — one click fills inputs.
8. **Explainer strip**: 3 short bullets (why log growth, why fractional Kelly is the sane default, garbage-in caveat on p estimates) + "educational only" disclaimer.
9. Out of scope: multi-outcome Kelly, portfolio-of-bets sizing, Monte Carlo equity fans, backtesting, saved scenarios.

## Design
- **Layout top to bottom**: eyebrow + `h1` "Kelly Criterion Calculator" → one-sentence quotable definition → input card (sliders + number fields, preset chips) → result cards (optimal fraction hero number, fractional table) → growth curve canvas → explainer bullets + disclaimer → back link.
- **Visuals**: dark surface cards; brass `#d2a24c` for the growth curve and optimal marker; muted red for the ruin zone past f=1; green-neutral tone for positive growth region.
- **Interactions/states**: every input change redraws instantly; invalid input (p ≤ 0, b ≤ 0, p ≥ 1) highlights the field and holds the last good state; empty bankroll hides the dollar-stake row.
- **Mobile**: single column; sliders full-width; chart min-height 260px; cards stack.
- Studio aesthetic: `#0a0c0f` background, Fraunces serif headings, brass accents, generous whitespace.

## Acceptance criteria
- [ ] p=60%, b=1 yields exactly f* = 20.0%; half Kelly shows 10%, quarter 5%.
- [ ] p=50%, b=1 yields f* = 0 and the "no edge" message appears.
- [ ] The growth curve peaks exactly at the computed f* (peak x-coordinate matches within 1 pixel bin).
- [ ] Setting p=110% is clamped to a valid range and flagged as invalid input, not silently accepted.
- [ ] Entering a $10,000 bankroll shows the correct dollar stake for full/half/quarter Kelly.
- [ ] The ruin zone (f ≥ 1, where log-growth is undefined) is visually distinguished and never suggested.
