# Date Night Generator — build spec

Idea: `date-night` · "Date Night Gen" · tagline: "Pick a vibe, get a plan. Romance, outsourced."

## Concept

Date Night Generator is a free online tool that turns the "what should we do tonight?" stalemate into a finished plan in one click. You pick a vibe, a budget band and how much time you have, and it assembles a complete evening — a pre-dinner activity, dinner, and an after-dinner wind-down — with timings that actually add up. Every step can be swapped for an alternative without rebuilding the whole night, and a Surprise Me mode rolls the dice entirely, so deciding takes seconds and the evening itself gets the attention.

## Feature list (MVP, in priority order)

1. **Vibe picker** — five vibe chips: Cozy at Home, Adventurous, Fancy Night Out, Low-Key, Artsy. Exactly one selected at a time; a sensible default (Cozy at Home) is pre-selected so the page never sits in a blank state.
2. **Budget band** — three options: $ (Under $25), $$ ($25–$75), $$$ ($75+). Budgets filter the option pools so a $ night never suggests a tasting menu.
3. **Time available** — three options: ~2 hours, ~3 hours, ~4 hours. Each step carries a duration; the generator picks steps whose durations fit the chosen window.
4. **Plan generator** — assembles a three-step evening (pre-dinner activity → dinner → after-dinner) from curated per-vibe option pools, with start times computed from a chosen start time (default 18:00). No step repeats within a plan, and every plan always has exactly three steps with valid, non-empty text.
5. **Shuffle / regenerate** — a "Shuffle the night" button rebuilds the whole plan from the current settings; a "Surprise me" button randomises vibe, budget and time as well, then generates.
6. **Per-step alternatives** — each step has a "Swap" control that replaces just that step with a different option from the same pool (never the one currently shown, never a step already in the plan). Times re-flow automatically after a swap.
7. **Copy plan to clipboard** — one button copies the whole evening as plain text ("Date night · Cozy at Home · 18:00–21:00" plus each step with its time), with a visible "Copied!" confirmation. Falls back to a selectable text area if the Clipboard API is unavailable.
8. **Plan summary header** — above the steps, a compact summary shows the vibe, budget band, total duration and cost estimate band, updating on every generation or swap.

### Out of scope (this version)

- Real venue data, maps, booking links or prices — all options are generic, location-free activities any couple can do anywhere.
- Saving / sharing plans beyond copy-to-clipboard (no accounts, no share links).
- Calendar export (.ics) and reminders.
- Multi-date or group / double-date modes.

## Design

### Page structure (top to bottom)

1. Studio eyebrow ("Shipwright Studio · Lab"), `h1` "Date Night Generator", and the quotable definition paragraph.
2. **Controls panel** — three labelled groups in a row on desktop (stacked on mobile): vibe chips, budget segmented control, time segmented control; plus a start-time select (17:00–20:00 in 30-minute steps, default 18:00).
3. **Action row** — primary brass button "Plan my night", ghost button "Surprise me", and (once a plan exists) a ghost "Copy plan" button.
4. **Summary strip** — vibe · budget · total time · cost band, shown once a plan exists.
5. **Timeline** — three step cards in a vertical timeline (numbered 1–3, connected by a brass line): each card shows time range, step label (e.g. "Pre-dinner"), activity title, one-line description, duration, and a "Swap" button. A short "tip" line under each card (e.g. "Bring a blanket" / "Book ahead") where relevant.
6. **How it works** — a short "How it works" section (3 lines) and a footer link back to the Lab index.

### Key interactions and states

- **Empty state**: before the first generation, the timeline area shows a gentle placeholder ("Pick a vibe and hit Plan my night — or let Surprise me decide.") No blank page, no broken layout.
- **Active state**: after generation, the timeline renders with a subtle fade-in; controls remain editable — changing vibe/budget/time and pressing "Plan my night" regenerates immediately.
- **Swap state**: swapping a step animates that card only (brief fade); the summary and times update; if a pool has only one viable option for a slot, the Swap button disables itself with a "No alternative" note.
- **Success state**: after copy, the button label becomes "Copied!" for 2 seconds, then reverts.
- **Error state**: if the Clipboard API fails, a fallback text area with the plan appears and is auto-selected, with the hint "Copy it manually". No `alert()` anywhere.

### Visual treatment

- Studio aesthetic: dark premium background `#0a0c0f`, panels `#11141a` with `#232a35` borders, text `#e8e4da`, muted `#9aa3b2`, brass accent `#d2a24c`.
- Fraunces serif for the `h1` and step titles; Inter/system sans for body and controls.
- Vibe chips and segmented controls are pill-shaped; the selected option is brass-filled with dark text. Generous whitespace, max-width ~900px, centred.
- Timeline: numbered brass circles on a vertical line; step cards are panels with a soft hover lift.

### Mobile considerations

- Controls stack vertically; vibe chips wrap to two rows; segmented controls become full-width rows.
- Timeline cards are full-width with the number above the title on narrow screens.
- Buttons are full-width on ≤600px; touch targets ≥44px.

## Acceptance criteria

1. A user can pick a vibe, budget and time, press "Plan my night", and see a three-step evening (pre-dinner → dinner → after-dinner) with start/end times that fit the chosen window.
2. Every generated plan has exactly three steps, each with a non-empty title and description, a positive duration, and times that run consecutively without gaps or overlaps.
3. "Surprise me" randomises all three settings and produces a valid plan; "Swap" replaces only that step (never with a duplicate of another step in the plan); "Copy plan" copies the full plan text and shows a "Copied!" confirmation.
4. The page works entirely client-side with no network calls beyond the Google Fonts stylesheet, renders correctly at 360px wide, and contains exactly one `h1`.
5. The page carries the required SEO: unique title, one-sentence meta description, canonical link, definition paragraph, and a `WebApplication` JSON-LD block.
