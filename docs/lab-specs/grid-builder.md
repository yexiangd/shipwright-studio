# Grid Builder — Build Spec

## Concept
Grid Builder is a free online tool that turns a drawn layout into production-ready CSS grid code. It is for front-end developers and designers who think in boxes: set your columns and rows, drag across the canvas to mark out a region, and place items into it — the page writes the `grid-template-columns`, `grid-template-rows`, `gap`, and per-item `grid-column` / `grid-row` rules for you. What you draw is what the browser renders, and the CSS is one click from your clipboard.

## Feature list (MVP, in priority order)
1. Grid controls: columns (1–12) and rows (1–6) via sliders, gap slider (0–32px), and track sizing select (Equal `1fr`, `auto`, Fixed `120px`).
2. Cell canvas: a visible grid of cells; click-drag (or click a start cell then a second cell) to select a rectangular region, highlighted in brass.
3. Place item: puts a labelled item (A, B, C…) spanning the selected region; overlapping an existing item is rejected with a plain-language message and the region stays selected.
4. Item management: click an placed item (on the canvas or in the item list) to select it; delete the selected item; clear all items.
5. Live preview: items render inside a real CSS grid driven by the same config as the output, so preview and code can never disagree.
6. Generated CSS output for the container plus one rule per placed item, with a copy button and "Copied!" confirmation.
7. Four presets: 12-column, Holy Grail (header / sidebar / main / footer), Sidebar left, Bento — each sets columns, rows, gap, sizing, and a set of placed items in one click.
8. Reset button restoring defaults, and a short "What changed?" line naming the last action in plain language.
Out of scope: named grid areas / `grid-template-areas` editing, responsive breakpoint previews, saving or sharing layouts, free-text CSS editing, drag-reordering placed items, subgrids.

## Design
Sections top to bottom: nav (Shipwright Studio / Lab), eyebrow, h1, quotable definition paragraph, controls card (columns slider, rows slider, gap slider, track-sizing select, presets, reset), canvas card (grid canvas with cell coordinates hint, "Place item" + "Delete selected" + "Clear all" buttons, selected-region readout, item list, "What changed?" line), CSS output card (generated CSS, copy button), "Grid in 60 seconds" explainer (tracks vs lines vs spans in plain words), footer with Built by Shipwright Studio + link back to /ideas/.
Interactions and states: empty (no items yet — canvas shows empty cells, hint reads "Drag across cells, then Place item"; CSS shows container only); active (every control change re-renders canvas, preview, and CSS immediately; region selection updates the readout); success (copy button briefly shows "Copied!"); error (Place item with no selection is disabled and the hint explains why; placing over an occupied cell is rejected with "That region overlaps item X — pick empty cells" and nothing is placed).
Visual treatment: dark premium #0a0c0f, Fraunces serif headings, brass #d2a24c accent, generous whitespace. Canvas cells have a dashed grid-line look so track boundaries are visible; placed items are solid brass-tinted blocks with a letter label; the selected region is a brass outline. Mobile: controls stack above the canvas, canvas scrolls horizontally if the column count makes cells too narrow, buttons are full-width where sensible.

## Acceptance criteria
- A user can drag a 2×2 region on a 4-column grid, place an item, and see the CSS output contain `grid-column: 1 / 3;` and `grid-row: 1 / 3;` for that item.
- A user can apply the Holy Grail preset and get a header, sidebar, main, and footer with matching CSS.
- A user can try to place an item over an occupied cell and get a clear rejection with no item placed.
- A user can copy the generated CSS and see a "Copied!" confirmation.
- The page has exactly one h1, unique title/description, canonical link, and WebApplication JSON-LD.
