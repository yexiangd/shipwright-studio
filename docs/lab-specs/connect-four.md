# Build spec — Connect Four vs AI

Slug: `connect-four` · Category: game · Tagline: "Out-think the machine, four in a row."

## Concept

Connect Four vs AI is a classic 7×6 drop-disc game against a real opponent: a
minimax engine with alpha-beta pruning that you can dial from a casual Easy
bot to a sharp Hard challenger. A local 2-player mode is included so the board
doubles as a digital game night piece. Drop discs with one click or tap, watch
the winning line light up, and track your lifetime record per difficulty —
all in a single dependency-free page in the studio's dark-brass aesthetic.

## Feature list (priority order)

1. **7×6 gravity board** — click/tap a column (or its floating drop arrow) to
   drop the current disc to the lowest free cell; the disc animates falling
   into place.
2. **AI opponent with 3 difficulties** — Easy (shallow depth + mistake chance),
   Medium (mid depth, slight randomness), Hard (depth 5 minimax with
   alpha-beta + center-priority move ordering, no randomness). The AI always
   responds after a short "thinking" beat; move calculation runs synchronously
   and stays under ~600ms on desktop.
3. **Human-first / AI-first choice** — pill toggle for who opens the game.
4. **Local 2-player mode** — pass-and-play on one device; AI controls hidden
   and the status line names the side to move (You = amber, Friend = ivory).
5. **Win/draw detection + winning-line highlight** — every winning 4 is
   highlighted with a brass glow and a connecting strike line drawn across it;
   draws dim the board with a centered "Draw" note.
6. **Move undo** — pops the last two plies in AI mode (your move + AI reply)
   or one ply in 2-player; disabled once the round is over.
7. **Restart / new round** — one button clears the board and starts fresh with
   the current settings; changing difficulty, starter, or mode auto-starts a
   new round.
8. **Score tracking** — session tally (wins/draws/losses) plus a lifetime
   record per difficulty and mode persisted in `localStorage`
   (key `cfour-stats-v1`); a Reset stats link clears both.

**Out of scope for this version:** networked multiplayer, move hints,
opening-book commentary, tournament brackets, sound effects, piece drag &
drop, per-move timers.

## Design

Top to bottom: topbar (Shipwright Studio brand · Lab link) → `h1`
"Connect Four *vs AI*" → lede definition paragraph → game card containing:
scoreboard (3 stats), round + lifetime lines, the board (column hover preview
showing the ghost disc; a bouncing arrow row above the columns; the board is
a vertical tray of 7×6 cells on a brass-edged frame), status line
("Your move", "AI is thinking…", "You win!", "Draw — nobody blinks." etc.),
and the controls: Opponent pills (Easy/Medium/Hard), Mode pills
(You vs AI / 2 Players), Starts pills (You first / AI first), Undo button,
New round button, Reset stats link → note card explaining the AI levels →
footer.

States:
- **Empty:** fresh board, status "Your move — you're amber."; ghost disc
  follows the hovered/tapped column.
- **Active:** discs stack with a drop animation; illegal clicks (full column)
  do nothing but shake the arrow for that column and show a one-line hint.
- **Win:** winning 4 discs glow brass + strike line draws across them; status
  celebrates; board locks.
- **Draw:** board dims; status "Draw — the board is full."
- **Error/edge:** AI-first mode on Medium/Hard computes on load — status
  shows "AI is thinking…" and input locks until the move lands; board never
  accepts clicks mid-thinking or after the round ends.

Visual treatment: page bg `#0a0c0f`, card surfaces `#10141a`, Fraunces serif
headings, brass `#d2a24c` accents; player disc = radial brass gradient
(amber), AI/friend disc = cool ivory-slate gradient; generous whitespace,
rounded 14px card, 18px board radius. Motion: disc drop via transform
translateY (no layout thrash), subtle hover states, win-line draw animation.

Mobile: board scales to `min(100vw - 100px, 560px)`; cells sized in `%`;
arrow buttons are 44px tap targets and a tap drops the disc immediately
(no tap-hold needed); the ghost landing preview shows on hover (desktop)
and on keyboard focus. Board keeps 7:6 ratio at any width.

## Acceptance criteria

1. A user can drop a disc into any non-full column by clicking/tapping it,
   and the disc lands in the lowest free cell.
2. The AI answers on all three difficulties within about a second, never
   plays into a full column, and Easy is observably beatable while Hard
   plays sharply (takes immediate wins, blocks immediate losses).
3. Win detection fires on every horizontal/vertical/diagonal four and the
   winning discs plus strike line highlight; a full board with no four ends
   in a draw state.
4. Undo removes the last move(s), Restart clears the board, switching
   difficulty/mode/starter starts a fresh round, and lifetime stats persist
   across page reloads.
5. The page has exactly one `h1`, unique title/description, canonical URL,
   WebApplication JSON-LD, and loads with zero external JS dependencies.
