# Habit Tracker — build spec

Slug: `habit-tracker` · Page: `/lab/habit-tracker/`

## Concept
A habit tracker is a free online tool that lets you define the small daily habits you want to keep — exercise, reading, meditation — and check each one off once a day while it quietly keeps score. It is for anyone who trusts streaks more than willpower: every check-in extends the current streak, and a week heatmap plus a weekly progress ring make momentum visible at a glance. No account, no sync, no tracking — everything lives in the browser's localStorage, so it is private by construction.

## Feature list (MVP, priority order)
1. **Add habits by name** — text input, max ~24 chars, dedupe by case-insensitive name; empty names rejected. Starter suggestions one-tap add: Exercise, Read, Meditate, Drink water.
2. **Today's check-off list** — each habit is a large tappable row/card with a satisfying tap animation and a streak badge; tap toggles today's completion (tap again unchecks).
3. **Streak counters** — per-habit current streak and longest streak. Day-boundary logic: `current = consecutive days ending today, or ending yesterday if today not yet done` (so a habit done every day up to yesterday still shows its streak today before check-in); any missed day breaks it. `longest` = max run over all recorded days. Display as "N days" / "Best N".
4. **Week heatmap** — per-habit row of the last 7 days (Mon–Sun) with filled/empty cells; hover/tap shows day label; today's cell highlighted.
5. **Weekly progress ring** — SVG ring showing completions across all habits this week (Mon–Sun) as a percentage of `habits × 7`; text "N%" in the centre.
6. **Edit / delete habit** — inline rename and delete with a confirm step (data for deleted habit is dropped).
7. **Export as text** — one-click "Copy summary" writes a plain-text recap (per-habit streaks + today's check-offs + weekly %) to the clipboard; fallback shows the text in a readonly box if clipboard API is unavailable.
8. **Empty state** — when no habits exist: friendly illustration-free panel explaining the flow with a big "Add your first habit" button and the starter suggestions.

Out of scope for this version: accounts/sync, multiple check-ins per day, custom weekly schedules (e.g. 5×/week targets), reminders/notifications, data import, per-habit notes.

## Design
Studio aesthetic: dark `#0a0c0f` page, `#11141a` cards, brass `#d2a24c` accents, Fraunces serif headings, Inter body, generous whitespace, max-width ~940px centred.

Top to bottom:
1. Breadcrumb ← Back to the idea bank, eyebrow "Shipwright Studio · Lab".
2. `h1` "Habit Tracker".
3. Definition paragraph (quotable, near top): **"A habit tracker is a free online tool that …"** — one paragraph, also explains local-only storage.
4. Week summary card: SVG progress ring (left) + "This week" totals (completed/total check-ins, best habit) (right). Collapsed to ring-only on mobile.
5. "Today" card: date heading ("Wednesday, 14 October"); check-off list. Each habit row: custom circular checkbox (animated fill on check), name (double-click/click edit icon to rename), streak pill "🔥 N" current streak, "Best N" small muted text, delete ✕ button. Checked rows: name struck-through/muted, checkbox filled brass with a check.
6. "This week" heatmap card: one row per habit (7 day cells, Mon→Sun; filled brass = done, hollow = missed, today's cell ringed). Legend below.
7. "Manage habits" card: input + Add button, starter suggestion chips (Exercise / Read / Meditate / Drink water) that add with one tap.
8. "Copy summary" button (secondary style) + notes on how streaks work.
9. Footer: "Built by Shipwright Studio" linking to https://shipwright-studio.pages.dev/.

Key states:
- **Empty (no habits):** week summary card shows ring at 0% with "Add a habit to start your first streak."; Today card replaced by the empty-state panel (big button + suggestion chips); heatmap card hidden entirely.
- **Active:** rows tappable; ring and heatmap update live.
- **Check-in complete:** tapping a row fills the checkbox with a scale-pop animation; streak pill increments immediately; no blocking modal — feedback is instant and inline.
- **Error states:** duplicate name → inline warning under input; clipboard failure → fallback textarea with the text selected.

Interactions: all rendering is a single `render()` from state; localStorage key `habittracker:v1`, schema `{habits:[{id,name,created,checks:{"YYYY-MM-DD":1}}]}`. Dates keyed by local calendar day (`YYYY-MM-DD` via local timezone). Mobile: rows ≥48px tap targets, grid wraps to one column, ring shrinks.

## Acceptance criteria
- A user can add a habit by typing a name (or tapping a suggestion), check it off today with one tap, and see the current streak increase by one.
- A streak survives "yesterday → today" and breaks when a day is missed (e.g. checks on [today, yesterday, two days ago] → streak 3; checks on [today, three days ago] → streak 1).
- Refreshing the page preserves all habits and check-ins (localStorage).
- A user can rename and delete a habit; deletion removes its data.
- The week heatmap shows the last 7 days correctly and the progress ring matches `completed / (habits × 7)` for the current Mon–Sun week.
