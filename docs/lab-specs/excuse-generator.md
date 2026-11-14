# Excuse Generator — Build Spec

## Concept

Excuse Generator is a free online tool that writes a believable excuse for the exact situation you're in — a missed deadline, a late arrival, an unanswered call, a reply that's three days overdue. Pick the scenario, the tone, and how bold you want to be, and it hands you a ready-to-send excuse, with a plausibility meter so you know how far you're stretching it.

It is for anyone who has ever stared at a blank message box knowing they owe someone an explanation — busy professionals, students, freelancers, and chronic optimists about their own schedules. The excuses are written to sound like something a real person would actually say: specific enough to be credible, vague enough to be unverifiable, and never mean-spirited. Everything runs in the browser; nothing is sent anywhere.

## Feature list (MVP, in priority order)

1. **Scenario picker** — six scenarios: Missed deadline, Late to a meeting, Missed call, Late reply, Missed an event, Running late on a delivery. Each has its own excuse pool.
2. **Tone picker** — Professional, Casual, or Creative. The tone changes the voice of the excuse, not just the wording.
3. **Believability control** — three levels: Rock solid (mundane, almost certainly believed), Plausible (believable with a straight face), Bold (stretching it — funny, but risky). Higher levels unlock the wilder excuses; lower levels only show safe ones.
4. **Excuse library (48 excuses)** — 8 per scenario, spread across tones and believability levels. Every excuse is a complete, sendable message of 1–3 sentences.
5. **Seeded variety, no repeats in a session** — excuses are drawn without replacement from the matching pool; the pool reshuffles (with a new seed) only after every matching excuse has been shown. A session counter shows "Excuse 3 of 8 in this pool" so the user knows when the well runs dry.
6. **Generate / Regenerate / Surprise me** — "Generate excuse" draws from the current filters; "Regenerate" draws the next one; "Surprise me" randomises scenario and tone first, then generates. The current excuse stays visible while a new one is drawn.
7. **Plausibility meter** — a 5-dot meter under the excuse showing that excuse's plausibility score (1–5), with a short label ("Rock solid", "Plausible", "Bold", "Risky", "Do not try this at work").
8. **Copy to clipboard** — one-click copy of the excuse (including the optional greeting line), button label changes to "Copied ✓" for 2 seconds; clipboard failure selects the text and shows "Copy failed — select the text manually."
9. **Optional recipient name** — a name field prepends a greeting line ("Hi Alex,") to the copied text; empty means no greeting. The greeting is part of the output card, shown as its own line above the excuse.

Out of scope for this version: excuses that blame a named real person, illness, or bereavement (never funny, never fair game); a "custom excuse" free-text editor; saving or sharing excuses; history beyond the current session; any server or network call; localStorage persistence.

## Design

Page structure, top to bottom:

1. **Header** — studio masthead (small "Shipwright Studio" wordmark linking to `/`), then `h1` "Excuse Generator".
2. **Summary paragraph** — one quotable definition sentence ("Excuse Generator is a free online tool that …").
3. **Note** — one line: "Every excuse here is written to be plausible, not provable — use the bold ones at your own risk."
4. **Controls panel** — three labelled groups in a row on desktop, stacked on mobile:
   - Scenario: six pill buttons (Missed deadline / Late to a meeting / Missed call / Late reply / Missed an event / Running late on a delivery). One active at a time.
   - Tone: three pill buttons (Professional / Casual / Creative).
   - Believability: three pill buttons (Rock solid / Plausible / Bold) with a one-line hint under them ("Bold unlocks the wilder excuses.").
   - Recipient name: a short text input ("Their name — optional, adds a greeting line").
   Below the groups: primary button "Generate excuse" (brass-filled), secondary buttons "Regenerate" and "Surprise me".
5. **Result card** — the excuse itself, in a large Fraunces serif quote style, with the optional greeting line above it in smaller text. Below the excuse: the plausibility meter (5 dots + label) and a small line "Excuse 3 of 8 in this pool · Missed deadline · Casual". Under the card: a "Copy excuse" button and a copy-status note.
6. **Empty state** — before the first generation, the result card shows muted placeholder text: "Your excuse will appear here. Pick a scenario, a tone, and how bold you're feeling — then hit Generate."
7. **How it works** — three short numbered steps (Pick your situation → Set the tone → Copy and send), one line each, muted.
8. **Footer** — "Built by Shipwright Studio" linking back to `/ideas/`.

Key interactions and states:

- **Empty**: no excuse shown until the first Generate; placeholder text in the result card; Copy button disabled.
- **Generate**: draws the next excuse from the filtered pool (seeded shuffle, no repeats), updates the quote, meter, counter line, and enables Copy. If the filters change, the pool resets to a fresh shuffle for the new filter set.
- **Filter change mid-session**: changing scenario/tone/believability rebuilds the pool and clears the current excuse back to the empty state with a hint ("Filters changed — generate a fresh excuse."). Changing the name does NOT clear the excuse; it only re-renders the greeting line.
- **Pool exhausted**: when the last excuse in a pool is shown, the counter reads "Excuse 8 of 8 — that's the whole pool" and the next Generate reshuffles and starts again at 1, with a note "Pool reshuffled — excuses may repeat now."
- **Fallback**: if the exact scenario + tone + level filter has no excuses (shouldn't happen with the shipped library, but guarded), the draw falls back to any tone within the scenario, then to the whole library, and the counter line notes "Showing a close match".
- **Copy success**: button label changes to "Copied ✓" for 2 seconds; clipboard failure selects the excuse text and shows "Copy failed — select the text manually."
- **Surprise me**: randomises scenario and tone (believability stays as set), updates the pill states to match, then generates.
- **Plausibility meter**: dots fill brass for the excuse's score (1–5); label text maps 5→"Rock solid", 4→"Plausible", 3→"Believable-ish", 2→"Bold", 1→"Risky — do not try this at work".

Visual treatment: dark premium background `#0a0c0f`, Fraunces serif headings, brass accent `#d2a24c`, generous whitespace, hairline borders (`#1e242c`), muted secondary text (`#9aa3ad`). The excuse quote is set in large Fraunces italic for a "written note" feel. Pills are dark with hairline borders; the active pill is brass-outlined with a brass-dim fill. Primary action (Generate) is brass-filled with dark text; secondary actions are ghost buttons. The plausibility meter is five small brass dots, unfilled ones in muted grey.

Mobile considerations: controls stack vertically; pill rows wrap and stay ≥44px tap targets; the result card is full width; the quote font scales down with `clamp()`; the Generate/Regenerate/Surprise-me buttons are full-width stacked on narrow screens.

## Acceptance criteria

1. A user can pick a scenario, tone, and believability level and generate an excuse that matches all three, drawn from a library of at least 40 excuses with no repeats until the matching pool is exhausted.
2. A user can copy the generated excuse (with optional greeting) to the clipboard, and can regenerate or hit "Surprise me" to get a different excuse with the filters updated to match.
3. Each generated excuse shows a plausibility meter (1–5 dots + label) and a pool counter ("Excuse N of M in this pool").
4. The page works with no external JavaScript, contains exactly one `h1`, has the required SEO tags (title, description, canonical, JSON-LD), and contains no email addresses, `mailto:` links, or secrets; no network request is ever made.
5. The excuse library contains no excuse that blames a named real person, illness, or bereavement.
