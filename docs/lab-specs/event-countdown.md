# Build Spec — Event Countdown (`lab/event-countdown/`)

Seed: "Count down to anything, with satisfying flip digits."

## Concept

Event Countdown is a free online countdown timer for anything ahead — a
product launch, a wedding, New Year's Eve, a flight. You name the event and
pick a date, and the page shows a large flip-digit display of days, hours,
minutes, and seconds ticking down, plus a progress ring of the time already
elapsed. Presets for common events load in one click, and the countdown is
deep-linkable so you can share an event link with anyone.

## Feature list (MVP, in priority order)

1. Event name + datetime inputs (datetime-local picker) with a "Start"
   action; validation rejects empty name or past dates with an inline error.
2. Flip-digit display: four cards (Days, Hours, Minutes, Seconds) that flip
   with a 3D top-half/bottom-half animation whenever the digit changes.
3. Progress bar: share of time elapsed since the countdown was created (only
   when a creation time is known; presets use a fixed lookback).
4. Presets: New Year 2027, plus 3–4 seasonal events (e.g. Christmas,
   next full moon is out of scope) — keep to fixed calendar dates computed
   in JS (next Jan 1, next Christmas, next Halloween, next Valentine's).
5. Shareable URL: event name and ISO datetime encoded in `?name=&date=`;
   on load, the page parses params and starts the countdown automatically.
6. Copy-share-link button (copies the deep link).
7. Finished state: when the timer hits zero, cards show 00s and a brass
   "It's time 🎉" banner replaces the ticking.

Out of scope for v1: recurring countdowns, multiple saved countdowns in
localStorage, sound effects, notifications, timezone picker (uses visitor's
local timezone), background themes.

## Design

Dark premium studio aesthetic (`#0a0c0f`, Fraunces headings, brass
`#d2a24c`, generous whitespace). Structure top to bottom:

- Header: "Lab" eyebrow, `h1` "Event Countdown", GEO definition paragraph.
- Setup card: event name text input, datetime-local input, "Start countdown"
  button; preset chips row below.
- Countdown stage: event name in Fraunces serif, four flip cards in a row
  (wrap on narrow screens), progress bar beneath with "X% elapsed".
- Flip cards: dark card, large tabular numerals; on digit change the top
  half folds down (CSS keyframe flip, no JS library).
- States: empty (setup visible, stage hidden or shows a demo countdown to
  next New Year); active (ticking); finished (banner, ticking stops);
  error (past date → inline error, keeps previous state).
- Mobile: cards shrink, two-per-row grid; inputs full width; datetime-local
  native picker.

## Acceptance criteria

1. A user can enter an event name + future datetime and watch all four
   units tick down every second with a flip animation on change.
2. A user can click a preset and get an instant working countdown.
3. A user can copy a share link, open it fresh, and land on the same
   countdown already running.
4. A past date shows a clear inline error and does not start the timer.
5. The page has exactly one `h1`, unique title/description, canonical link,
   WebApplication JSON-LD, and a GEO-style definition paragraph.
