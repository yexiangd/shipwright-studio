# Web3 Glossary Flashcards — build spec

## Concept
Web3 Glossary Flashcards is a free online study game that teaches crypto and
web3 terminology through a deck of 40 flip cards with plain-English
definitions. It is for anyone new to crypto — curious readers, new hires at
web3 companies, students — who keeps tripping over jargon like "gas", "MEV"
or "rollup" and wants to learn it by doing rather than reading a wall of
text. The game sorts each card into a Know or Still-learning pile as the
player works through the deck, so every session ends with a clear picture of
what stuck and a one-click review round for what did not.

## Feature list (priority order)
1. Flip-card deck: 40 terms, each with a one-line plain-English definition
   and a category tag. Click/tap the card (or press Space) to flip it in 3D
   and reveal the definition; flip back to the term.
2. Know / Still-learning buttons: after revealing a card, the player sorts
   it into a pile. Know advances the progress bar and the session score;
   Still-learning queues the card for review. Buttons are disabled until the
   card is flipped.
3. Category filter: All / Basics / DeFi / Infrastructure / Security. Filtering
   rebuilds the deck from that category only and resets progress for that
   view; the progress label shows "known x / N" for the active filter.
4. Shuffle: a true Fisher–Yates permutation of the active deck, applied on
   load, on filter change, and via a Shuffle button. Mid-session, Shuffle
   (and the R key) only reorders the cards not yet sorted — cards already
   placed in a pile stay placed, so progress and stats are never double-counted.
5. Progress bar and session stats: "known x / N" bar, plus a live stats row
   (cards seen, known, still learning, current streak of consecutive Knows).
6. Review-mistakes mode: a "Review still-learning" button re-deals only the
   Still-learning pile as a fresh round; when that pile is empty the button
   is disabled with a note that there is nothing to review.
7. Keyboard navigation: Space flips the card, K marks Know, L marks Still
   learning, ←/→ move to the previous/next card in the current deck order
   (without sorting), R reshuffles.
8. Restart: a Restart button resets the whole session — piles cleared, deck
   reshuffled, streak back to zero — for the active filter.

Out of scope: user accounts or saved progress (session only, no storage),
audio pronunciation, spaced-repetition scheduling across visits, quizzes or
multiple-choice mode, price or market data, and any wallet connection.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; a small
educational disclaimer ("Educational only — not financial advice"); the
filter pill row (All / Basics / DeFi / Infrastructure / Security) with the
active filter in brass; the progress bar with "known x / N" and the stats row
(seen / known / still learning / streak); the 3D flip card (term side in
Fraunces with a large term, category tag and "click to flip" hint; definition
side with the definition, the term as a small header, and a "plain-English
definition" label); the action row (Know / Still learning / Shuffle /
Restart) with Know in brass; the "Review still-learning (n)" button below,
disabled when n is 0; a keyboard-shortcuts hint line; a "How to use" explainer
(flip, sort, review); footer link back to /ideas/. Visual treatment: dark
premium `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accents,
generous whitespace; the card is a large centred panel (~560px wide,
~300px tall) with a subtle brass border and a smooth 3D flip; Know button
brass-filled, Still-learning ghost. Mobile: card scales down, action buttons
stack into two rows, filter pills wrap. States: empty (deck exhausted —
a "Deck complete" panel shows the final score and offers Review or Restart);
active (card face up or down, buttons enabled only when flipped); review
mode (a brass "Reviewing still-learning" badge appears, progress counts
against the review pile only); error (none expected — no inputs; a broken
deck would show a plain "Something went wrong, restart" message, which
should never trigger).

## Acceptance criteria
- A user can flip a card by click, tap or Space, then sort it with Know /
  Still learning (or K / L); the progress bar and stats update exactly, and
  the next card appears automatically.
- The deck holds exactly 40 unique terms with non-empty definitions, spread
  across the four categories (10 each); filtering shows only that category's
  terms and the count matches.
- Shuffle is a true Fisher–Yates permutation: same 40 terms, different order.
- Review mode re-deals only the Still-learning pile; when it is empty the
  button is disabled; Restart clears all piles and reshuffles.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no images,
  no secrets, no email addresses, and an "educational, not financial advice"
  note on the page.
