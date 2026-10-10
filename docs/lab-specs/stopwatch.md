# Stopwatch — Build Spec

## Concept

Stopwatch is a precision in-browser stopwatch for people who time things
seriously: runners logging intervals, developers benchmarking load tests,
speakers rehearsing talks. Millisecond-accurate timing (driven by
`performance.now()`, not tick-counting), one-tap laps with split deltas,
best/worst lap highlighting, and full keyboard control — no install, no
account, no drift.

## Feature list

1. Start / Pause / Reset with a big tabular-figure mono display
   (`MM:SS.mmm`, hours appear automatically past 60 minutes).
2. Timing engine: `performance.now()`-based elapsed accumulation; render via
   `requestAnimationFrame`; stays accurate through tab throttling (recomputes
   from wall clock, never accumulates rAF deltas).
3. Lap button: records lap time + cumulative time + delta vs previous lap;
   best (fastest) lap highlighted brass, worst highlighted red; scrollable
   lap table, newest first.
4. Keyboard shortcuts: `Space` start/pause, `L` lap, `R` reset — shown under
   the controls; ignored when typing in inputs.
5. Stats row: total elapsed, lap count, fastest lap, slowest lap; updates live.
6. Reset asks nothing (single destructive action, instant) — but Reset while
   running stops and clears everything in one press.
7. Mobile: display scales with viewport; buttons ≥48px touch targets.

Out of scope: countdown mode, interval alarms, saving/exporting laps,
sound effects, multi-stopwatch sessions.

## Design

Top to bottom: topbar (← The Lab / Shipwright Studio), `h1` "Lap-perfect
<em>timing.</em>", quotable definition paragraph (GEO), stats row
(Total / Laps / Fastest / Slowest pills), the display stage: huge
JetBrains Mono time on a dark card with a faint brass top edge, pulsing
"RUNNING" / "PAUSED" badge, control buttons (Start/Pause primary brass
pill, Lap ghost, Reset ghost-danger), lap table card (columns # / Lap /
Total / ±Δ), foot note.

States: idle ("00:00.000", Start), running (Pause + Lap enabled, badge
pulsing brass), paused (Resume + Reset + Lap disabled), laps present
(table visible; empty state shows "No laps yet — press L").

## Acceptance criteria

- A user can start, pause, resume, lap, and reset; elapsed time is
  millisecond-accurate and survives backgrounding without drift.
- Pressing Lap adds a row with lap time, total time, and delta; fastest and
  slowest laps are visually distinguished.
- `Space`/`L`/`R` work as start-pause/lap/reset and don't fire while the
  user is typing.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies.
