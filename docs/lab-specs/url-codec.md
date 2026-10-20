# URL Codec — build spec

## Concept
URL Codec is a free online tool that percent-encodes and decodes URLs and query
strings, with a live query-parameter table. It is for developers debugging
links, redirect URLs, and API calls: it makes the
`encodeURIComponent` vs `encodeURI` difference visible instead of mysterious,
shows exactly what changes when a string is encoded, and lets you parse a query
string into editable rows and re-serialize it — all locally in the browser.

## Feature list (MVP, priority order)
1. **Textarea input** with Encode/Decode mode toggle; conversion runs live as
   you type.
2. **Encode-mode selector** (encode mode only): *Component*
   (`encodeURIComponent`) vs *Full URL* (`encodeURI`), plus a one-line note
   explaining the difference (component encodes `? & = /`, full URL keeps them
   as structure).
3. **Live result pane** (read-only textarea) with char/byte stats on both panes.
4. **Copy-to-clipboard** buttons for input and output (with fallback when the
   Clipboard API is unavailable).
5. **Query-string parameter table**: "Parse params" extracts `key=value` pairs
   from the current input (the part after the first `?`; a `?`-less input is
   treated as a raw query only if it contains `=`, otherwise it yields no
   rows), showing rows with key / decoded value / encoded value; each value is
   editable inline.
   "Rebuild query" serializes the table back (with `encodeURIComponent`) into
   the result pane. Keys are kept decoded in the table and encoded on rebuild.
6. **Quick sample inputs**: three buttons that load a representative input
   (plain messy URL, query with Unicode, pre-encoded URL for decoding).
7. **Error state for malformed percent-sequences**: decode of `%` followed by
   non-hex (e.g. `%zz`, `100%`, `%2`) shows an error banner pinpointing the
   offending position; the page keeps working.
8. **Swap** (output → input) and **Clear** buttons.

Out of scope: full URL parsing into host/path/fragment parts; URL validation;
batch processing; URL shortening; `application/x-www-form-urlencoded` form-data
body encoding (`+` for space); saved history or localStorage.

## Design
Page structure top to bottom:
1. Nav (`Shipwright Studio`, `Idea Lab`), eyebrow `Lab · Developer tools`,
   `h1` "URL Codec", definition paragraph (`define` class) written as
   "URL Codec is a free online tool that …" for AI citation.
2. **Codec card**: cardlabel "Encode / decode"; mode line with Encode/Decode
   segmented control + encode-mode segmented control (visible in encode mode
   only) + the difference note; two panes (Input / Output) with stats strips;
   error banner area; button row: Swap, Clear, Copy input, Copy output.
3. **Parameter table card**: cardlabel "Query-string parameters"; "Parse params"
   + "Rebuild query" buttons; table with columns Key / Decoded value (editable
   `<input>`) / Encoded value (read-only text); empty state "No parameters
   parsed yet — enter a URL with a query string and press Parse params."; row
   delete buttons and an "Add row" control.
4. **Samples card**: cardlabel "Try a sample"; three ghost buttons loading
   samples.
5. Footer: "Built in the Shipwright Studio Lab · more experiments".

Interactions/states:
- Empty: output empty, table shows empty-state text, no banner.
- Active (typing): live conversion, stats update.
- Error (decode): red banner naming the offending `%…` sequence and its
  position; output keeps the last successful result (or empty).
- Success: conversion shown; stats show char counts.

Visual treatment: dark `#0a0c0f`, panels `#101318`, Fraunces serif headings,
brass `#d2a24c` accent, mono (`JetBrains Mono`) for code/stats, generous
whitespace. Mobile: panes stack vertically, table columns Key/Value stack,
buttons go full width.

## Acceptance criteria
- A user can paste a URL and see it encoded or decoded live in the output pane.
- A user can toggle Component vs Full-URL encode and see `?`/`=`/`&` encoded
  in Component mode and preserved in Full-URL mode.
- A user can parse `?q=hello+world&lang=zh` into a table, edit a value, and
  rebuild the encoded query string.
- A user can copy the output to the clipboard with one click.
- A user pasting `100%` or `%zz` in decode mode sees a clear error naming the
  offending sequence, and the page stays usable.
