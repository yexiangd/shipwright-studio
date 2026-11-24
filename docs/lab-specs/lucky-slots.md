# Lucky Slots — build spec

## Concept
Lucky Slots is a free online 3-reel slot machine that uses play-money credits only — all of the spinning, none of the losing money. It is for anyone wanting a 30-second game break: pick a bet size, hit spin, and watch the reels land against a published, weighted paytable. It is delightful because the odds are printed on the page instead of hidden — every symbol's weight and payout is disclosed, the theoretical return is stated, and the machine keeps honest stats (spins, wins, best win) so the luck feels earned, not rigged.

## Feature list (priority order)
1. 3-reel slot machine with text-glyph symbols (🍒 cherry, 🍋 lemon, 🔔 bell, ⭐ star, 💎 diamond, 7 seven); reels animate and stop left to right with a stagger.
2. Play-money credits: start at 100 credits; no real money anywhere on the page, stated clearly. Bet size selector: 1, 5, 10, 25 credits; the bet is clamped to the current balance, and the spin button is disabled when credits fall below the minimum bet.
3. Weighted random reels with a documented paytable, evaluated on the centre line only: 7-7-7 pays 120×, 💎💎💎 50×, ⭐⭐⭐ 25×, 🔔🔔🔔 16×, 🍋🍋🍋 12×, 🍒🍒🍒 8×, exactly two 🍒 pays 2×. Symbol weights: cherry 28, lemon 22, bell 18, star 14, diamond 10, seven 8 (out of 100 per reel). Theoretical return to player ≈ 91.5% (computed from weights × multipliers; verified by simulation in the node check).
4. Win feedback: payout message ("You won N credits"), winning reels highlighted in brass, and a "Big win" treatment for payouts of 25× the bet or more.
5. Spin history: last 8 spins, most recent first, showing symbols, bet, and payout (win or —).
6. Stats: spins played, wins, best win (largest single payout), persisted in localStorage.
7. Reset credits button: restores 100 credits and clears the spin history; lifetime stats are kept and have their own reset button.
8. Keyboard support: Space (or Enter) spins; buttons are large enough for mobile; result text is announced in the page (no audio dependency).
9. Empty state: before the first spin the history area says "No spins yet — place your bet and hit Spin."

Out of scope: real money, accounts, leaderboards, sound effects, multiple paylines, bonus rounds, autoplay, any gambling links.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Game" → h1 "Lucky Slots" → quotable definition paragraph → "Play money only — no real money, no deposits, nothing to lose" notice → credits card (credits balance, current bet, Spin button) → machine card (3 reel windows, result line) → paytable card (symbol weights and payouts, plus the stated ~91.5% theoretical return) → history card (last 8 spins) → stats card (spins, wins, best win, reset buttons) → "How the odds work" explainer → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no spins yet, reels show 🍒 🍋 🔔 as a neutral starting display), active (spinning — reels cycling, Spin and bet buttons disabled), success (win banner with payout, winning reels highlighted brass; big-win treatment at ≥25× bet), out of credits (credits < 1: spin disabled, message "You're out of credits — hit Reset credits to play again. It's play money, so no harm done."). Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; reels are large glyph windows on a dark panel with a brass frame; mobile: reels shrink, bet buttons wrap, spin button full-width.

## Acceptance criteria
- A user can spin with a chosen bet, see credits decrease by the bet and increase by the paytable payout, and never go below zero credits.
- Wins match the published paytable exactly: every 3-of-a-kind line and the two-cherry line pay the stated multiplier (verified by node test on the extracted logic).
- A 100,000-spin simulation returns an RTP within 88–95% (theoretical ≈ 91.5%), every paytable line is hit at least once, and the balance never goes negative.
- A user can see the last 8 spins in history, their lifetime stats, and reset credits to 100 without losing lifetime stats.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, and passes scripts/seo-check.py.
