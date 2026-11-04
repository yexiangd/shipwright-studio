# Flexbox Playground — Build Spec

## Concept
Flexbox Playground is a free online tool that teaches CSS flexbox by letting you toggle every container property and watch a row of boxes obey instantly. It is for front-end learners and developers who want to build layout intuition without refreshing a code editor. Every change updates both the live preview and the CSS you can copy into a real project.

## Feature list (MVP, in priority order)
1. Container controls: flex-direction (row, row-reverse, column, column-reverse), justify-content (6 values), align-items (5 values), flex-wrap (nowrap, wrap, wrap-reverse), align-content (6 values, active when wrapping).
2. Gap slider (0–40px) and item count control (1–8 boxes).
3. Click an item to select it; per-item controls for flex-grow (0–3), flex-shrink (0–2), flex-basis (auto/100/150/200px), and align-self (auto + 5 values).
4. Live preview panel with numbered, colour-varied boxes.
5. Generated CSS output for the container and the selected item, with a copy button and copied confirmation.
6. Four presets: Centred, Navbar, Card row, Equal columns — each sets container + item values in one click.
7. Reset button restoring defaults.
8. A short "What changed?" explainer line naming the last changed property and its effect in plain language.
Out of scope: grid layout, flex shorthand editing as free text, saving layouts, responsive breakpoint previews.

## Design
Sections top to bottom: nav (Shipwright Studio / Lab), eyebrow, h1, quotable definition paragraph, controls card (container selects + gap slider + item count + presets + reset), preview card (flex stage + selected-item controls + "What changed?" line), CSS output card (container CSS, selected-item CSS, copy button), "Flexbox in 60 seconds" explainer (container vs item axes in plain words), footer with Built by Shipwright Studio + link back to /ideas/.
Interactions and states: empty state is the default layout (no selection message until an item is clicked, item controls disabled); active (every control change re-renders preview and CSS immediately); success (copy button briefly shows "Copied!"); error (none expected — all inputs are bounded selects/sliders, so no invalid CSS can be produced).
Visual treatment: dark premium #0a0c0f, Fraunces serif headings, brass #d2a24c accent, generous whitespace. Preview stage has a dashed border so the container edge is visible. Mobile: controls stack above the preview, preview height adapts, selects are full-width.

## Acceptance criteria
- A user can change flex-direction to column and see the preview stack vertically and the CSS output update to match.
- A user can click an item, raise its flex-grow, and see that item grow relative to its siblings.
- A user can apply the Centred preset and get a centred single-row layout with matching CSS.
- A user can copy the generated CSS and see a "Copied!" confirmation.
- The page has exactly one h1, unique title/description, canonical link, and WebApplication JSON-LD.
