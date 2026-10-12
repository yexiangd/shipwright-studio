# Build Spec — Aim Trainer (`aim-trainer`)

**Seed:** "Click the targets, track your precision over time." · category: game · effort: S

## Concept

Aim Trainer is a free online reflex and precision trainer for gamers, designers, and anyone who lives by the mouse. Targets spawn at random positions inside an arena; you get 30 seconds to click as many as you can while misses count against your accuracy. Every round ends with a report card (hits, misses, accuracy, average reaction time) and a precision-over-time chart so progress is visible, not vibes.

## Feature list (MVP, priority order)

1. **Timed rounds** — 30-second rounds with a visible countdown and a start overlay. Auto-ends at 0.
2. **Random target spawning** — one circular brass target at a time at a random arena position; click it to despawn and spawn the next. Target size shrinks slightly each 5 hits to raise difficulty within the round.
3. **Hit / miss scoring** — clicking a target = hit (+1). Clicking empty arena = miss. Stray hits during the start overlay don't count.
4. **Reaction-time measurement** — per-hit latency = time since target appeared; round average shown in ms.
5. **Precision-over-time chart** — canvas line chart of per-hit reaction times across the round (lower = better), plus a rolling 5-hit average line.
6. **Best-score persistence** — best hits in localStorage, shown on the start overlay; "new best" badge when beaten.
7. **Round summary panel** — hits, misses, accuracy %, avg reaction, fastest hit.
8. **Mobile / touch support** — arena targets sized for touch, `touchstart` handled, layout stacks on small screens.

Out of scope: moving targets, grid-shot vs reflex modes, accounts, leaderboards, sound (keep silent by default).

## Design

Dark premium `#0a0c0f` background, Fraunces serif headings, brass `#d2a24c` accent, generous whitespace.
Top to bottom: compact studio header link row → h1 "Aim Trainer" + one-sentence definition paragraph (quotable for SEO) → stats bar (time left, hits, accuracy, avg ms) → arena card (large rounded panel, ~420px tall on desktop) → start/round-end overlay inside the arena → round summary row (4 stat cards + canvas chart) → "How it works" footer blurb.
Key states: idle (start overlay visible, stats zeroed), playing (overlay hidden, timer ticking), finished (summary shown, replay button).
Interactions: cursor crosshair over the arena; target scales down with a pop on hit; red ripple on miss.

## Acceptance criteria

1. A user can start a 30-second round, click targets, and see the round end automatically with a summary.
2. Accuracy = hits / (hits + misses); the chart plots every hit's reaction time.
3. The page records and displays the best score across visits (localStorage).
4. Works with touch taps on a phone-sized viewport; no external JS dependencies.
5. SEO fields present: title/description/canonical/one h1/JSON-LD.
