# Rock Paper Scissors — build spec

## Concept
Rock Paper Scissors is a free online best-of-five game against a bot that learns from your play. It is for anyone wanting a 60-second game break: pick rock, paper, or scissors, watch the bot reveal its pick, and be first to 3 round wins. It is delightful because the bot is openly "suspiciously lucky" — it counters your most-played move more often than chance, so beating it feels earned, and every round's reasoning is shown in plain words.

## Feature list (priority order)
1. Pick rock / paper / scissors by button or keyboard (R / P / S); bot pick revealed with a short countdown-free reveal.
2. Best-of-five match: first to 3 round wins wins the match; ties do not count toward the 3.
3. Live scoreboard (You / Bot / Ties), round history log (last rounds, most recent first), and match result banner.
4. Adaptive bot: 60% of the time it counters your most-played move so far (ties broken by move order rock, paper, scissors); otherwise it picks uniformly at random. The bot's strategy is disclosed on the page, not hidden.
5. Stats: rounds played, win rate, current streak, and best streak, persisted in localStorage.
6. New match button (keeps lifetime stats) and reset stats button (clears localStorage stats).
7. Keyboard and touch support; buttons are large enough for mobile; result text is announced in the page (no audio dependency).
8. Empty state: before the first pick, scoreboard shows 0–0 and the history area says "No rounds yet — pick a move."

Out of scope: multiplayer, accounts, leaderboards, sound effects, timed rounds.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Game" → h1 "Rock Paper Scissors" → quotable definition paragraph → scoreboard card (You / Ties / Bot + match progress dots) → pick card (three large emoji-free text buttons: ✊ Rock, ✋ Paper, ✌️ Scissors — symbols are text glyphs, not images) → result card (your pick vs bot pick, round outcome, and one-line bot note, e.g. "Bot countered your favourite: paper") → history card (round list) → stats card (rounds, win rate, streaks, reset) → "How the bot works" explainer → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no rounds), active (mid-match), success (match won banner, brass), error (none expected; invalid state falls back to a fresh round). Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; mobile: pick buttons stack full-width, scoreboard stays readable.

## Acceptance criteria
- A user can play a full best-of-five match to a win/loss banner, with ties not ending the match early.
- A user can see every round in the history log with both picks and the outcome.
- The bot's pick logic matches the disclosed rule: countering the player's most-played move 60% of the time, random otherwise (verified by node test on the extracted logic).
- A user can start a new match without losing lifetime stats, and can reset lifetime stats.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, and passes scripts/seo-check.py.
