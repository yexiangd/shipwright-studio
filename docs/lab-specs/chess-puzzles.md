# Chess Puzzles — build spec

## Concept
Chess Puzzles is a free online tool that serves up mate-in-two chess tactics,
one puzzle at a time. It is for casual players and club players alike who
want a five-minute tactics workout: White to move, find the single key move
that forces checkmate on the next move no matter how Black replies. Six
hand-checked puzzles run from a gentle warm-up to a quiet waiting move, with
hints, solutions, and a streak to chase — no account, no engine to fight, and
nothing leaves the browser.

## Feature list (priority order)
1. Six curated mate-in-2 puzzles: each is a genuine, unique mate in two —
   verified exhaustively by a small Node move-generation script before
   shipping (no mate in 1 exists, exactly one key move exists, and every
   legal Black reply is mated on move 2). Puzzles are ordered Easy → Hard
   with a difficulty label (1–3) and a short title.
2. Playable in-page board: Unicode chess pieces on an 8×8 board, click a
   piece then a destination square to move. Legal destinations are shown as
   dots; the selected piece and the last move are highlighted. White is at
   the bottom; coordinates a–h / 1–8 are labelled.
3. Scripted mate-in-2 flow: the player first finds the key move; a wrong
   (but legal) move shows a gentle error and increments a "tries" counter
   without penalty. After the correct key, Black's forced reply plays
   automatically (one of the verified replies, picked at random), and the
   player must then deliver checkmate. Any mating move counts; a legal
   non-mating move is undone with a "not mate yet" message.
4. Hint button: highlights the key move's starting square only — never the
   destination or the move itself. A hint does not break the streak.
5. Solution reveal: shows the full verified line (key move, every Black
   reply, and the mating move for each) in algebraic notation. A puzzle
   solved via the solution does not count as solved.
6. Progress and streaks in localStorage: solved count (x/6), current clean
   streak (consecutive puzzles solved with zero wrong moves), and best
   streak — all persisted across reloads. A "tries" counter is shown per
   puzzle.
7. Puzzle navigation: previous / next buttons, a puzzle picker (1–6 with
   solved checkmarks), and a reset button that restores the starting
   position. A move list shows the moves played in algebraic notation.

Out of scope: playing a full game against an engine, Black-to-move puzzles,
mate-in-3 or longer, timed/blitz modes, leaderboards or accounts, analysing
arbitrary user-entered positions, and sound effects.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; a brass-bordered
note stating every puzzle was machine-verified as a unique mate in two; stats
row (Solved x/6, Current streak, Best streak); puzzle header (puzzle number,
title, difficulty badge, "White to move — mate in 2"); board card (board +
status line + move list + control buttons: Hint, Solution, Reset); puzzle
picker (six numbered buttons); "How it works" explainer (what mate in 2
means, how the key/reply/mate flow works, what a clean streak is). Visual
treatment: dark premium `#0a0c0f`, Fraunces headings, brass `#d2a24c`
accents, generous whitespace; board uses warm light squares (`#ddd5c3`) and
dark squares (`#8a7a63`), white pieces in near-white with a dark outline,
black pieces in near-black; selected square gets a brass ring, legal
destinations get brass dots, the key-hint square gets a brass outline.
States: ready (board awaiting the key move), key found (brief brass flash,
then Black's reply animates in), mate delivered (success banner with the
solution line and a Next puzzle button), wrong move (gentle red-tinted
message + tries counter increments, board unchanged), hint (starting square
outlined, message names the piece), solution revealed (full line shown,
puzzle marked as revealed, not solved). Mobile: board scales to full width
(touch-sized squares), stats stack, controls wrap.

## Acceptance criteria
- A user can click a piece and a destination to move; only legal moves are
  offered, and the board state always matches the position shown.
- Each of the 6 puzzles is a verified unique mate in 2: no mate in 1, exactly
  one key move, every Black reply mated — confirmed by the Node verification
  script before shipping (see verification summary in the build report).
- After the key move Black's reply plays automatically, and delivering any
  checkmating move ends the puzzle with a success state and the solution
  line; a wrong move shows a gentle error and increments tries.
- The hint button reveals only the key move's starting square; the solution
  button reveals the full verified line and does not mark the puzzle solved.
- Solved count and best streak persist across reloads via localStorage.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no secrets,
  no email addresses.
