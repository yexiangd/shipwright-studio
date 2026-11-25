# Dice Lab — build spec

## Concept
Dice Lab is a free online dice roller and probability explorer for tabletop gamers, board-game players, and anyone curious about the maths of chance. It rolls any dice pool — d4 through d100, with modifiers and classic presets like advantage or 4d6-drop-lowest — and shows the result live alongside the exact theoretical distribution, computed by convolution rather than simulation, so you can see at a glance how likely that natural 20 really was. It is delightful because the histogram updates with every roll and the observed results slowly converge on the exact curve, turning an abstract probability table into something you can watch happen.

## Feature list (priority order)
1. Dice pool builder: die type selector (d4 / d6 / d8 / d10 / d12 / d20 / d100), count stepper 1–20, modifier stepper −20 to +20, shown as a notation string (e.g. `3d6+2`) that updates live.
2. Roll button plus keyboard shortcut (Space or R); while rolling, dice faces shuffle briefly, then settle one by one. Rolls are fast (under ~600 ms total) so the histogram feels live.
3. Per-roll display: each individual die result shown as a numbered die face, the modifier applied, and the grand total in brass, large. A "natural 20 / natural 1" callout appears on a 1d20 roll.
4. Roll history: last 12 rolls, most recent first, showing notation, individual dice, modifier, and total; Clear history button.
5. Running stats: rolls so far, mean of totals, min total, max total; computed from the actual roll history of the current pool configuration (reset when the pool changes).
6. Live distribution histogram: exact theoretical distribution for the current pool, computed by convolution (enumeration for drop-lowest / advantage / disadvantage), shown as bars with the exact probability % per total; observed counts overlaid per total as a second bar, so theory and practice can be compared side by side. Toggling between "exact" and "observed" is not needed — both are always shown.
7. Quick presets: `1d20`, `2d6`, `4d6 drop lowest`, `Advantage (2d20, keep highest)`, `Disadvantage (2d20, keep lowest)`. Picking a preset sets the pool and clears the current session stats.
8. Stats persisted in localStorage (roll history and counts); a Reset button clears the session.
9. Empty state: before the first roll the history area says "No rolls yet — pick your dice and hit Roll", and the histogram shows the exact distribution for the current pool with zero observed rolls.

Out of scope: dice images/3D dice, sound effects, saving named pools, sharing a roll link, exploding dice, custom-sided dice (d3, d7, etc.), multiplayer / shared rooms, any account or server component.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Game" → h1 "Dice Lab" → quotable definition paragraph → pool builder card (die-type buttons, count stepper, modifier stepper, live notation, preset chips) → roll card (Roll button, last-roll dice faces, total, nat-20/nat-1 callout) → histogram card (exact vs observed bars per total, exact % labels, mean of the exact distribution) → history card (last 12 rolls) → stats card (rolls, mean, min, max, reset) → "How the maths works" explainer (convolution in one sentence, why 2d6 clusters at 7, why advantage shifts the mean) → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no rolls yet — faces show "–", history placeholder, histogram exact-only), active (rolling — faces cycling, Roll button disabled), success (faces settled, total shown, histogram observed bar grows, history prepends), error (none expected from user input — steppers clamp; if localStorage is unavailable the page still works in-memory and says so once). Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; die faces are numbered squares on a dark panel with a brass frame for the total; histogram bars are brass (exact) with a lighter overlay bar (observed). Mobile: die-type buttons wrap, steppers stay thumb-sized, histogram scrolls horizontally if the range is wide (d100), Roll button full-width.

## Acceptance criteria
- A user can build any pool (d4–d100, 1–20 dice, modifier −20 to +20), roll it, and see each die result plus the correct total (sum of dice + modifier).
- The exact distribution is mathematically correct: probabilities sum to 1 within 1e-9, mean matches the closed-form expectation (e.g. 2d6 mean 7, 1d20 mean 10.5, 4d6-drop-lowest mean ≈ 12.2446), and the observed histogram converges toward it (verified by node test on the extracted logic).
- Presets set the pool exactly: `4d6 drop lowest` rolls 4d6 and drops the lowest die; advantage rolls 2d20 and keeps the highest; disadvantage keeps the lowest (verified by node test).
- A user can see the last 12 rolls, running mean/min/max, and clear the session; changing the pool resets the session stats so observed counts never mix pools.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, and passes scripts/seo-check.py.
