# Build Spec — Decision Wheel (`lab/decision-wheel/`)

## Concept
A single-page spin-the-wheel decision maker for groups that can't pick. Add 2–12 options (dinner spots, movie nights, who's driving), hit Spin, and the wheel decelerates with a weighted-feel easing curve to land on one winner. Unlike random list pickers, the wheel is a shared ritual — everyone watches it slow down together. Options persist in localStorage, so your usual rotation survives a refresh.

## Feature list (MVP, in priority order)
1. **Option editor** — text input + Add button (Enter also adds); each option renders as a removable chip; duplicates rejected with a gentle notice; 2–12 options.
2. **Canvas wheel** — segments colored from a curated brass/teal/rose palette; option labels drawn radially and truncated cleanly; brass pointer at top.
3. **Spin** — requestAnimationFrame loop with ease-out-cubic over ~4–6 s plus random extra rotations; disabled while spinning and when <2 options.
4. **Winner reveal** — winning segment highlighted, winner name shown big in Fraunces with a subtle scale-in; "Remove winner & spin again" one-click.
5. **Shuffle / Clear** — shuffle reorders options; clear resets with confirm.
6. **Persistence** — options saved to localStorage on every change; seeded with 4 starter options on first visit.
7. **Sound-free** — no audio; motion is the feedback. prefers-reduced-motion shortens the spin to a near-instant pick.

**Out of scope**: weighted segments, shareable links, wheel themes, tick sounds, user accounts.

## Design
- Top to bottom: studio topbar (← Lab / Shipwright Studio brand) → `h1` "Decision <em>Wheel</em>" → quotable definition paragraph (GEO) → two-column layout (wheel card left, options card right; stacks on mobile) → how-it-works strip → footer.
- Wheel: square canvas (min 320px, scales to viewport), dark rim, brass pointer triangle at top; winner segment flashes accent outline.
- States: empty (1 option) → wheel shows placeholder arcs and Spin is disabled with hint "Add at least 2 options"; spinning → editor locked, button shows "Spinning…"; winner → result card with name, "Spin again" and "Remove winner".
- Visual: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` pointer/accents, generous whitespace. Canvas labels in Inter, truncated at ~14 chars.
- Mobile: single column; wheel max-width 92vw; chips wrap; touch-safe buttons (min 44px).

## Acceptance criteria
- A user can add "Sushi", "Tacos", "Ramen", spin, and get exactly one of them as the winner, deterministic against the final wheel angle.
- With <2 options the Spin button is disabled and explains why.
- Reloading the page keeps the previously entered options.
- Removing the winner and spinning again never selects the removed option.
- Exactly one `h1`, canonical + WebApplication JSON-LD present; works offline, no console errors.
