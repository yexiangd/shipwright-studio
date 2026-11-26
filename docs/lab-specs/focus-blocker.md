# Focus Blocker — build spec

## Concept
Focus Blocker is a concept page for a distraction-killing browser extension: it lets you build a blocklist of distracting sites, run a timed focus session, and watch blocked attempts get stopped in real time. It is for anyone who loses hours to social feeds and video rabbit holes and wants a lightweight, honest way to rehearse deep work — the timer creates a commitment, the blocklist makes the distraction concrete, and the simulated block screen gives an instant taste of what the real extension would feel like. It is delightful because the simulation is playful rather than preachy: clicking a blocked site mid-session shows a satisfying "Blocked" screen and counts the attempt, turning willpower into a game you can win.

## Feature list (priority order)
1. Blocklist manager: a preset list of common distracting sites (social feeds, video, news) shown as toggleable chips, plus a custom entry field to add any domain; entries can be removed. Adds are deduplicated and normalised (lower-cased, `www.` and scheme stripped).
2. Focus session timer: 25 / 50 / 90 minute presets plus a custom minute input (1–240); start, pause, resume, and reset; a large MM:SS countdown with a thin progress ring/bar showing session progress.
3. Live "blocked attempt" simulation: while a session is running, a row of site buttons is shown — clicking a blocked site shows a blocked screen (brass "Blocked" overlay with the site name and the remaining focus time) and increments "sites blocked today"; clicking a non-blocked site shows a "You stayed on track" note instead.
4. Session stats: sessions completed, total minutes focused, sites blocked today, and current streak of completed sessions — persisted in localStorage, with a reset button. "Sites blocked today" resets automatically on a new calendar day.
5. Session completion: when the timer reaches zero, a success state shows ("Session complete — 25 minutes of focus banked."), minutes are added to the totals, and the session count and streak increment.
6. Concept notice: a clearly visible note near the top stating this is a concept demo — blocking is simulated in-page only, no real extension is installed and no site is actually blocked outside this page.
7. Empty states: an empty blocklist shows "No sites blocked yet — add one below."; before any session the stats show zeroes and the timer shows the selected duration.
8. Error handling: adding an empty or invalid domain shows an inline error; custom minutes outside 1–240 are rejected with an inline error; the timer cannot be started with an empty blocklist — starting with an empty list shows a warning and lets the user start anyway only after confirming (button becomes "Start anyway").

Out of scope: a real browser extension, actual site blocking, accounts, sync, browser notifications, sound, multi-device state, paid plans, any network calls.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Extension" → h1 "Focus Blocker" → quotable definition paragraph → concept notice ("Concept demo — blocking is simulated in-page only. No extension is installed and no site is actually blocked outside this page.") → timer card (duration presets 25 / 50 / 90 + custom minutes input, large MM:SS countdown with progress bar, Start / Pause / Reset buttons, session state line) → blocklist card (preset site chips with toggle, custom add field + Add button, active list with remove buttons, empty state message, inline error line) → "Try it" card (site buttons for a mix of blocked and non-blocked sites; blocked click shows the blocked overlay; result line under the buttons) → stats card (sessions completed, minutes focused, sites blocked today, current streak; reset stats button) → "How it would work" explainer (three short bullets: blocklist → timer → blocked screen) → footer "Built by Shipwright Studio" + link back to /ideas/.
States: idle (timer shows selected duration, Start enabled), running (countdown ticking, presets and custom input disabled, Pause enabled), paused (countdown frozen, Resume enabled), complete (success message, minutes banked, timer resets to selected duration), blocked (overlay shown after clicking a blocked site, with a "Back to focus" dismiss), error (invalid domain or minutes shows an inline red message; starting with an empty blocklist shows a warning and a "Start anyway" option).
Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; timer digits in JetBrains Mono at large size; blocked overlay is a brass-bordered panel with a bold "Blocked" heading; mobile: presets wrap, timer digits shrink, site buttons stack, stats grid collapses to two columns.

## Acceptance criteria
- A user can add a custom domain to the blocklist (normalised and deduplicated) and remove any entry; the list persists across reloads.
- A user can start a 25-minute session, see the countdown tick and the progress bar advance, pause and resume it, and reset it; when it reaches zero the session is counted and minutes are banked (verified by node test on the extracted logic).
- While a session runs, clicking a blocked site shows the blocked screen and increments "sites blocked today"; clicking a non-blocked site does not.
- Stats (sessions completed, minutes focused, sites blocked today, streak) persist across reloads and reset cleanly; "sites blocked today" resets on a new calendar day.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, and passes scripts/seo-check.py.
