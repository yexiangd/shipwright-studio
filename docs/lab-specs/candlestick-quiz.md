# Spec — Candlestick Quiz (`candlestick-quiz`)

## Concept
Candlestick Quiz is a free online game that teaches classic candlestick chart patterns under time pressure. Each round a pattern is drawn fresh on canvas from a bank of 10 classics; the player names it from four choices against a 10-second clock. Every answer ends with a one-line explanation, so the game teaches while you play — no finance background needed, and no real market data involved.

## Feature list (MVP, prioritized)
1. **Pattern bank of 10 classics** — Doji, Hammer, Inverted Hammer, Shooting Star, Bullish Engulfing, Bearish Engulfing, Morning Star, Evening Star, Three White Soldiers, Three Black Crows. Each has a deterministic geometry generator (with bounded random jitter so no two rounds look identical) plus a one-line teaching explanation.
2. **10-question timed rounds** — 10 seconds per question, animated countdown bar plus numeric readout. Timer stops the moment an answer is tapped.
3. **4 answer choices** — 1 correct + 3 shuffled distractors drawn from the bank, unique per round; min 48px tap targets, 2×2 grid on mobile.
4. **Scoring + streaks** — correct: 100 base + 10 per second remaining; +50 streak bonus from the 3rd consecutive correct answer. Wrong or timeout: 0 points, streak resets. Score, streak, and round (n/10) shown live in a HUD.
5. **Answer feedback** — after each answer the timer freezes, the correct choice is highlighted in brass, a wrong pick in red; a banner states Correct / Wrong / Time's up, followed by the pattern's one-line explanation and a Next button.
6. **Results screen** — final score, correct count, accuracy, and best score persisted in `localStorage` (`cq-best`), with a "NEW BEST" callout when beaten. Play-again button.
7. **Pure-canvas rendering** — devicePixelRatio-aware canvas, faint grid, bullish candles in brass `#d2a24c`, bearish in muted red; zero image assets.
8. Out of scope: user accounts, global leaderboard, sound effects, difficulty tiers, untimed "learn mode", real market data or price feeds.

## Design
- **Layout (top → bottom)**: topbar (breadcrumb `← The Lab` → `../../ideas/`, brand mark, best-score line) → intro screen (h1, one-sentence definition paragraph, how-it-works list, Start button) → play screen (HUD: round / score / streak; timer bar; canvas chart card; 2×2 answer grid; feedback banner + explanation + Next) → results screen (score, accuracy, best, replay) → footer (`Built by Shipwright Studio`, back link).
- **States**: `idle` → `question` (timer live) → `answered` (correct: brass highlight) / `wrong` (red pick, correct shown brass) / `timeout` (correct shown, "Time's up") → `result`. Intro/results are full-screen swaps; the canvas card is blank until a question starts (empty state), and the timer bar is full and pulsing on question start (active state).
- **Visual treatment**: bg `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accents, Inter body, JetBrains Mono for numbers. Candles cast a subtle glow on the correct-answer reveal.
- **Mobile**: 2×2 answer grid stays tappable at 360px wide; `touch-action: manipulation`; canvas resizes to container width; page fits the viewport so nothing scrolls mid-game.
- **Edge cases**: no best score yet → best line reads "No best yet — set one."; `localStorage` unavailable → game plays normally, best tracking silently disabled; rapid double-tap on an answer → first tap wins (buttons lock on answer).

## Acceptance criteria
- [ ] A player can complete 10 rounds; each round shows a freshly drawn pattern, 4 unique choices, and a working 10s countdown.
- [ ] Node harness asserts drawing geometry for all 10 patterns across seeded runs (Doji open≈close; Hammer long lower wick ≥2× body; Inverted Hammer / Shooting Star long upper wick ≥2× body with correct bullish/bearish bodies; engulfing pairs truly engulf; Morning/Evening Star 3-candle sequences with star + confirming close past the first candle's midpoint; soldiers/crows step correctly) — all pass.
- [ ] Score/streak math matches the spec (100 + 10/s + streak bonus), timeout counts as wrong, and best score survives a page reload.
- [ ] Every answer reveals the correct choice plus the pattern's explanation; results show score, accuracy, best, and replay.
- [ ] `scripts/seo-check.py` passes with zero errors on the page.
