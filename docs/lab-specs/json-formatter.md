# Spec — JSON Formatter (`json-formatter`)

## Concept
JSON Formatter is a free online JSON toolkit for developers. Paste raw JSON and instantly validate it, prettify or minify it, inspect it as an expandable tree, and query it with JSONPath — all in the browser, nothing leaves the machine. Built for the daily grind of debugging API responses, config files, and log payloads.

## Feature list (MVP, prioritized)
1. **Input editor**: large monospace textarea with line numbers, paste/drop support, and a "Load sample" button.
2. **Validate**: parse on input (debounced); show valid/invalid status badge; on error, show a human message with line and column ("Unexpected token at line 4, column 12") derived from the native `SyntaxError` position.
3. **Prettify / Minify**: format with selectable indent (2 / 4 / Tab), or collapse to one line; output in a second pane with syntax highlighting (keys, strings, numbers, booleans, null).
4. **Tree view**: toggle between "Text" and "Tree" output; tree renders expandable/collapsible nodes, shows array indices and object key counts, click-to-collapse for deep structures.
5. **JSONPath query**: input for expressions like `$.store.book[0].title` (supports `.key`, `[index]`, `[*]`, `..` recursive descent); lists matched values; invalid path shows a gentle error.
6. **Utilities row**: Copy output, Download `.json`, Clear, character/byte count and parsed-type stats (object/array + top-level key count).
7. **URL-safe handling**: "Decode" for URL-encoded or escaped JSON strings (e.g. pasted `\"{...}\"` gets unescaped first) — one click.
8. **Mobile**: panes stack vertically; toolbar wraps.
Out of scope: schema validation, JSON diff, YAML conversion, saved history.

## Design
- **Layout**: toolbar (actions) on top; two-pane editor (input | output) side by side on desktop, stacked on mobile; output pane has Text/Tree tabs; status bar at bottom (valid badge, size, type stats).
- **Sections**: topbar, h1 + quotable definition paragraph, toolbar, editor grid, JSONPath bar, "Tips" section (keyboard hints, privacy note).
- **States**: empty input → ghost placeholder text; invalid → red badge + error message under input; valid → green badge + rendered output.
- **Visual treatment**: dark `#0a0c0f`; syntax colors — keys brass `#d2a24c`, strings soft green `#9ece8a`, numbers sky `#8ab8ff`, booleans/null lavender `#c792ea`, punctuation muted; Fraunces h1; tree uses disclosure triangles, hover highlights.
- **Mobile**: single column; panes min-height 220px; JSONPath input full width.

## Acceptance criteria
- [ ] Pasting invalid JSON shows an error with a correct line/column.
- [ ] Prettify with indent 2 and Minify both round-trip: parse(format(x)) deep-equals parse(x).
- [ ] Tree view renders a nested sample (5+ levels, arrays + objects) with working collapse.
- [ ] JSONPath `$.a[0].b` and `$.a[*].b` return correct matches on a test document.
- [ ] Copy and Download buttons work; no data leaves the browser (no network calls).
