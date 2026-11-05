# Name Picker — build spec

**Slug:** `name-picker`
**Idea:** "Name Picker — Raffle names fairly — classrooms and giveaways love it."
**Status:** doing → done on ship (2026-11-05)

## Concept

Name Picker is a free, no-sign-up raffle tool that draws a winner from any list of names with provable fairness. Teachers use it to call on students, hosts use it for giveaways, and teams use it to assign tasks without anyone feeling the draw was rigged. It runs entirely in the browser — names never leave the device — and the final pick uses the Web Crypto API, not a plain pseudo-random call, so every name in the pool has exactly the same chance.

## Feature list (MVP, in priority order)

1. **Name entry** — paste or type names, one per line, into a textarea. Input is trimmed, blank lines ignored, duplicates collapsed (exact-match, case-insensitive).
2. **Live count** — the pool size updates as you type, and the entry list below the textarea shows every name as a removable chip.
3. **Add / remove names** — click a chip's × to remove one name; "Clear all" empties the pool. Removing a name that already won also removes it from history.
4. **Fair pick with shuffle animation** — pressing "Pick a winner" cycles rapidly through candidate names in a large display (~1.8 s, two-phase deceleration: fast cycling then a slower settle), then lands on the final winner chosen with `crypto.getRandomValues`. During the animation the button is disabled.
5. **No-repeat mode** — a checkbox "Don't repeat winners" excludes already-picked names from future draws until every name has won once, then the pool resets automatically with a note.
6. **Winner display** — the winning name appears large in a brass-bordered panel, with a copy button.
7. **Winner history** — an ordered list of past winners with draw number and time; "Clear history" resets it (and the no-repeat exclusion set).
8. **Keyboard accessible** — the textarea, buttons, chips, and checkbox are all reachable and operable by keyboard; the winner display is an `aria-live` region.

**Out of scope for this version:** weighted draws, team/group splitting, import from CSV or file, saving lists to localStorage, shareable links, sound effects, confetti or any particle animation, drawing multiple winners at once, random ordering/shuffle of the whole list.

## Design

**Page structure (top to bottom):**
1. Nav — `Shipwright Studio` / `Idea Lab` (same as other lab pages).
2. Eyebrow — "Lab · Classroom & giveaway tools".
3. `h1` — "Name Picker".
4. Definition paragraph — quotable one-paragraph definition ("Name Picker is a free online tool that …").
5. Card — "Names" — textarea (placeholder shows three sample names), live count line ("12 names in the pool · 3 picked"), chip list of current names, buttons: Load sample / Clear all.
6. Card — "Draw" — big winner display (idle state: "Press pick to draw a name"), Pick a winner button (primary, brass), checkbox "Don't repeat winners", Copy winner button (appears once a winner exists), pool status line ("3 of 12 names have won — pool resets after everyone has won").
7. Card — "Winner history" — ordered list of past winners with draw # and time, Clear history button, empty state ("No winners yet — make your first draw.").
8. Collapsible "How it works" explainer — fairness (crypto randomness, equal odds), what no-repeat mode does, privacy (nothing leaves the browser).
9. Footer — "Built by Shipwright Studio · Back to the Lab" linking to `/ideas/`.

**Key interactions and states:**
- *Empty:* textarea empty → count 0, chips hidden, Pick button disabled, winner display shows idle prompt, history shows empty state.
- *Active:* typing updates count and chips live; pasting a bulk list (e.g. a class roster) dedupes on the fly.
- *Drawing:* winner display cycles names quickly with a decelerating interval; button disabled and labelled "Drawing…".
- *Success:* winner name settles in large Fraunces type inside a brass-bordered panel; history gains a row; pool status updates.
- *Error:* picking with an empty pool is impossible (button disabled); picking in no-repeat mode when all names have won resets the exclusion set first and notes it in the status line.

**Visual treatment:** dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` borders, brass `#d2a24c` accent, Fraunces serif headings, system sans for UI, JetBrains Mono for the winner name and counts. Generous whitespace, 14px card radius, pill buttons. No confetti, no typewriter effect, no external JS.

**Mobile:** single column (already the lab layout), full-width buttons under 720px, textarea min-height comfortable for touch, chips wrap, winner name scales with `clamp()`.

## Acceptance criteria

1. A user can paste a list of names (one per line) and the pool count, chip list, and pick button all reflect the deduped list immediately.
2. Pressing "Pick a winner" always returns a name that is in the current pool, and the final selection is made with `crypto.getRandomValues`, not `Math.random`.
3. With "Don't repeat winners" on, drawing repeatedly produces every name in the pool exactly once before any name repeats, and the pool resets with a visible note once exhausted.
4. Removing a name from the pool removes it from future draws; clearing history resets the no-repeat exclusion set.
5. The page has exactly one `h1`, a unique title and meta description, a canonical link, a WebApplication JSON-LD block, and no email address or `mailto:` anywhere.
