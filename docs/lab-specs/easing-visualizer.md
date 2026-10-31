# Easing Visualizer — build spec

## Concept
Easing Visualizer is a free online tool that makes CSS timing functions visible
and editable. It is for front-end developers and designers who pick easing
curves by feel and want to see exactly what a curve does before shipping it:
drag the two cubic-bezier control points, watch a dot travel the curve, and
copy the resulting CSS. A side-by-side race shows why `ease-out` feels
snappier than `ease-in` without reading a single formula.

## Feature list (priority order)
1. Interactive cubic-bezier editor: an SVG chart with two draggable control
   points (P1, P2), gridlines at 0 / 0.5 / 1, and a live curve redraw.
2. Live readout of the current curve as `cubic-bezier(x1, y1, x2, y2)` with
   values rounded to two decimals; x clamped to 0–1, y allowed −0.5–1.5 so
   overshoot curves (e.g. ease-out-back) stay editable.
3. Six presets: linear, ease, ease-in, ease-out, ease-in-out, ease-out-back
   (0.34, 1.56, 0.64, 1). Selecting a preset moves the control points.
4. Animated preview: a dot travels the curve and a box slides along a track
   over the chosen duration, with a progress readout in percent.
5. Duration slider (0.3–3 s) and Play / Replay button; animation uses
   requestAnimationFrame and the page's own easing solver.
6. Race mode: all six presets animate side by side over the same duration so
   their shapes can be compared at a glance.
7. Copy-CSS button: copies a one-line `transition` snippet using the current
   curve, with a "Copied" confirmation state.

Out of scope: spring-physics easings (not expressible as cubic-bezier),
`steps()` timing, keyframe export, saving curves to a server.

## Design
Top to bottom: eyebrow + h1 + quotable definition paragraph; preset buttons
and duration controls card; curve editor card (SVG chart, draggable points,
live cubic-bezier readout); animated preview card (curve dot + sliding box +
progress %); race card (six lanes, one Play button); snippet card (code block
+ copy button); "How it works" explainer (what P1/P2 mean, why y may exceed
0–1, why bounce is not a cubic-bezier). Visual treatment: dark premium
`#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace.
Mobile: chart scales to full width, preset buttons wrap, race lanes stay
readable at small widths. States: idle (curve shown, dot at start), playing
(dot and box moving, progress counting), copied (button confirms briefly),
empty n/a — the editor always shows a valid curve.

## Acceptance criteria
- A user can drag either control point and see the curve and the
  cubic-bezier readout update live.
- A user can pick any preset and see the control points move to that curve.
- A user can press Play and watch the dot and box animate with the selected
  easing over the selected duration.
- A user can copy a valid CSS `transition` snippet for the current curve.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no secrets.
