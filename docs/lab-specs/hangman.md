# Hangman — build spec

Slug: `hangman` · Tagline: "Guess the word before the drawing finishes."

## Concept

Hangman is the classic pencil-and-paper word game as a polished single-page game. Pick a category and difficulty, then guess letters — every correct letter is revealed in place, every wrong one draws another part of the gallows figure, and six misses ends the game. It is built for quick sessions: a fresh word every round, a streak system that rewards returning, and zero friction (works with physical keyboard, taps, or voice-free on-screen keys).

## Feature list (MVP, priority order)

1. **Word bank** — ~190 curated common words in 4 categories: Tech, Nature, Food, and Mixed; difficulty bands by length: Easy 3–5 letters, Medium 6–8, Hard 9+. No repeats until the bank cycles (shuffle-bag).
2. **Progressive SVG drawing** — gallows + 6 figure parts (head, body, arm L, arm R, leg L, leg R); each wrong guess reveals one part with a draw-in animation; win = figure stays incomplete, loss = completes with a red accent on the final part.
3. **Letter guessing** — on-screen QWERTY keyboard plus physical keyboard; correct letters flip-reveal in the word slots; wrong letters dim the key and advance the drawing. Accented/special chars never appear (word bank is A–Z only, case-insensitive).
4. **Hint** — one hint per game: reveals a random unguessed letter (does not count as a wrong guess); button disables after use and counts a "hint used" stat.
5. **Win / loss states** — win: word fully revealed with a "Solved!" banner, guesses-used tally; loss: full figure + the word revealed with "The word was …"; both show a prominent "New word" action and stats line.
6. **Streak + stats** — wins, losses, current streak, best streak, persisted in localStorage; small "reset stats" link.
7. **Category & difficulty selectors** — pill selectors above the game; changing either starts a fresh round immediately.
8. **Remaining-misses indicator** — "6 misses left" pill that counts down; screen-reader live region announces guess results.

Out of scope: custom-word two-player mode, timed mode, word definitions on reveal, multiplayer/leaderboards, sound effects beyond a subtle tick on keypress (keep silent by default — skip audio entirely in v1), non-English word banks.

## Design

Page structure top → bottom:
1. Top nav (`/ `→ Shipwright Studio, `/ideas/` → Idea Lab) — same as other lab pages.
2. Eyebrow "Lab · Games", h1 "Hangman", definition paragraph (quotable: "Hangman is a free online game that …").
3. **Controls card** — category pills (Tech / Nature / Food / Mixed), difficulty pills (Easy / Medium / Hard), "New word" button.
4. **Game card** — left: SVG gallows + figure (progressive); right: word slots, misses-left pill, hint button. Mobile stacks: drawing on top.
5. **Keyboard card** — on-screen QWERTY rows; keys: brass-tinted when guessed correctly, dimmed when guessed wrong, default otherwise.
6. **Result banner** — appears on win/loss: word revealed, stats line (guesses used / streak), "New word" button.
7. **Stats strip** — wins · losses · streak · best (localStorage), tiny reset link.
8. Footer linking `/ideas/` and `/`.

Key interactions / states:
- **Empty / new round**: slots are blank, keyboard reset, hint re-enabled, drawing shows gallows only.
- **Active**: each guess animates (slot flip for hits, key dim + figure part draw-in for misses); repeated letter press is a no-op; hint reveals one letter with a highlight pulse.
- **Success**: "Solved in N guesses" banner (brass); streak increments; best streak updates.
- **Error / loss**: figure completes, word revealed, "The word was X" banner (muted red `#e06c5c`); streak resets to 0.

Visual treatment: dark premium `#0a0c0f`, panel cards `#101318`, Fraunces serif headings, brass `#d2a24c` accents (revealed letters, correct keys, CTA), generous whitespace. SVG line art in brass; figure parts animate via stroke-dashoffset draw-in. Mobile: keyboard keys ≥44px touch targets, cards stack vertically, drawing scales to viewport width.

## Acceptance criteria

1. A user can start a round (default Mixed/Medium), guess letters by clicking on-screen keys or typing, see correct letters revealed in place and wrong guesses progressively draw the 6-part figure; the 6th miss ends the round as a loss with the word shown.
2. Category and difficulty selectors each deal a fresh round whose word comes from the selected category and length band (verifiable in node: sampled words match band + category lists; no repeats within a shuffle cycle).
3. Hint reveals exactly one previously unguessed letter, works once per round, and does not advance the miss counter.
4. Win/loss/streak/best-streak persist across reloads via localStorage; stats strip reflects them.
5. The page meets all lab SEO requirements: unique title "Hangman · Shipwright Studio", one-sentence meta description, definition paragraph, canonical link, WebApplication JSON-LD, exactly one h1, footer links to `/ideas/` and `/`.
