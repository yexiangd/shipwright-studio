# Build Spec — Pomodoro (`pomodoro`)

## Concept
A free online Pomodoro timer: 25 minutes of focused work, 5 minutes of break, repeated. The page is designed to sit in a tab and do one thing beautifully — a large legible timer with a progress ring, session tracking dots, and a gentle browser-notification sound/vibration when a session flips. Includes auto-cycle long breaks (15 min after 4 pomodoros) with editable durations.

## Feature list (MVP, priority order)
1. Focus/break timer with durations editable (focus 5–60 min, short break 1–30, long break 5–45).
2. Cycle logic: 4 focus sessions → long break, then reset; session dots show progress.
3. Big time display + SVG progress ring; document title shows remaining time (tab-friendly).
4. Start / pause / reset / skip controls; auto-starts next phase optionally (toggle).
5. Sound + `Notification` API alert on phase change (permission requested only when toggled on).
6. Daily counter: completed pomodoros today (persisted in `localStorage`), reset button.
7. Aesthetic: dark premium (`#0a0c0f`), Fraunces serif headings, brass `#d2a24c` accent, focus mode turns the page brass-forward, break mode shifts to a cooler calm tint; mobile-first layout.
8. Keyboard: Space toggles start/pause (when not typing in a field).

**Out of scope:** task lists tied to sessions, accounts/sync, statistics charts, ambient soundscapes.

## Design
- **Header**: studio nav breadcrumb, h1 "Pomodoro Timer", one-sentence quotable definition paragraph.
- **Main**: mode tabs (Focus / Short Break / Long Break) → giant timer readout inside an SVG ring → controls row (start/pause, reset, skip) → session dots → settings (duration number inputs, auto-cycle toggle, sound toggle).
- **Stats strip**: today's completed focus sessions + total focus minutes today.
- **States**: idle (start highlighted), running (pause + reset enabled, title counts down), paused, finished (flash + notification + auto-advance if enabled), settings invalid (clamp + hint).
- **Mobile**: ring scales to viewport, controls thumb-size, everything single-column.

## Acceptance criteria
1. A user can run a 25/5 cycle, see the ring deplete and the tab title count down, and have break auto-start.
2. After 4 focus sessions the timer serves a long break; dots reflect cycle position.
3. Start/pause/reset/skip behave predictably; durations clamp to valid ranges.
4. Completed-session count persists across reloads (localStorage).
5. Sound/notification fire only after user opted in; no permission prompt on load.
