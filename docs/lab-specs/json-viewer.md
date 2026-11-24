# Spec — JSON Viewer (`json-viewer`)

## Concept
JSON Viewer is a free online JSON tree explorer for developers. Paste any JSON — an API response, a config file, a log payload — and instantly explore it as a collapsible, searchable tree instead of a wall of text. It is the browser preview of the extension idea: the same inspect-and-search experience, with nothing leaving the browser.

## Feature list (MVP, prioritized)
1. **Paste input**: large monospace textarea; paste or type JSON; parse runs on input (debounced) and on a "View tree" button.
2. **Validation with position**: on invalid JSON, show a clear error message with the line and column of the fault, computed by a small built-in JSON scanner that finds the first invalid character (modern JS engines no longer include a position in the native `SyntaxError` message, so the page does not rely on it); the offending line is highlighted in the input gutter.
3. **Collapsible tree**: objects and arrays render as expandable/collapsible nodes with disclosure carets; primitives render with type-coloured values (string green, number sky, boolean/null lavender, keys brass); empty objects/arrays render inline as `{}` / `[]`; collapsed containers show a summary (`{5 keys}` / `[12 items]`).
4. **Search**: search box filters the tree — matching keys and values are highlighted, non-matching branches are hidden, and ancestors of matches are auto-expanded; shows a match count ("7 matches") and a clear button.
5. **Expand all / Collapse all**: one-click controls to open or close every container node.
6. **Copy path**: clicking a node's key (or index) copies its JSON path (`$.store.book[0].title`) to the clipboard and shows a small toast confirmation.
7. **Stats bar**: node count, max depth, and counts by type (objects, arrays, strings, numbers, booleans, nulls) for the parsed document.
8. **Sample buttons**: two built-in samples — "API response" (nested object with arrays) and "Config" (flat-ish config with nested sections) — loaded with one click.
Out of scope: editing values in place, JSONPath queries, formatting/minify (see `json-formatter`), schema validation, file upload, saved history.

## Design
- **Layout**: topbar (brand + back to home); h1 + quotable definition paragraph; toolbar (samples, View tree, Expand all, Collapse all, Clear); input pane (textarea + gutter with line numbers) above the tree pane on desktop in a two-column grid, stacked on mobile; search box + stats bar sit above the tree pane.
- **Sections**: topbar, h1 + definition, toolbar, editor/tree grid, stats strip, "How it works" tips section (privacy note: everything runs in your browser, nothing is uploaded).
- **States**: empty input → tree pane shows an inviting empty state ("Paste JSON to explore it"); invalid → red error banner under the input with line/column and the error line highlighted in the gutter; valid → tree renders; searching → matches highlighted in brass, non-matching rows hidden, match count shown; no search matches → "No matches" empty state in the tree pane.
- **Visual treatment**: dark `#0a0c0f`; Fraunces serif h1; brass `#d2a24c` accents; type colours — keys brass, strings soft green `#9ece8a`, numbers sky `#8ab8ff`, booleans/null lavender `#c792ea`, punctuation muted; tree rows use disclosure triangles and hover highlights; generous whitespace.
- **Mobile**: single column; toolbar wraps; tree pane min-height 240px; search input full width.

## Acceptance criteria
- [ ] Pasting invalid JSON shows an error with the correct line and column.
- [ ] A nested sample (5+ levels, arrays + objects) renders as a collapsible tree with working expand/collapse, including expand-all / collapse-all.
- [ ] Searching finds a deep key and a deep value, highlights them, and reports the correct match count.
- [ ] Clicking a node key copies its JSON path (e.g. `$.store.book[0].title`) to the clipboard.
- [ ] Stats (node count, max depth) are correct for a known test document; empty objects/arrays render without crashing.
- [ ] No data leaves the browser (no network calls besides Google Fonts).
