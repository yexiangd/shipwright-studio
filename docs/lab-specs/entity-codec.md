# Entity Codec — Build Spec

## Concept

Entity Codec is a free, instant HTML entity encoder/decoder for developers and content authors. Paste or type text in either pane and the other updates live, so escaping markup for embedding in HTML or recovering readable text from an encoded blob takes seconds, not a search through docs. It is a dependency-free static page that runs entirely in the browser — nothing typed ever leaves the device.

## Feature list (MVP, priority order)

1. **Live two-way conversion** — typing in the raw-text pane encodes into the entity pane; typing in the entity pane decodes into the raw pane. Conversion is debounced (~150 ms) so fast typing stays smooth.
2. **Encode modes** (radio group, affects encoding only):
   - *Specials only* — encode only the five XML specials `& < > " '`.
   - *Specials + non-ASCII* — also encode every character above U+007E as a named entity where one exists, otherwise a decimal numeric reference.
   - *All numeric* — encode every character as a decimal numeric reference `&#NNN;`.
3. **Full decode** — named entities (`&amp;`, `&copy;`, `&mdash;`, `&lt;`, …), decimal numeric refs (`&#169;`), hex numeric refs (`&#xA9;`), and double-encoded input (e.g. `&amp;lt;` decodes one level to `&lt;`, not to `<`).
4. **Quick-reference table** — ~16 common entities (name, character, code). Clicking a row inserts the entity into the entity pane at the cursor (or appends) and decodes it into the raw pane.
5. **Copy buttons** — one per pane, copying the pane's current contents; button label briefly flips to "Copied ✓" on success.
6. **Counts** — live character count under each pane, plus an entity count under the entity pane (number of `&...;` sequences found).
7. **Clear + Swap buttons** — Clear empties both panes; Swap exchanges the contents of the two panes and re-derives the other side.
8. **Sample presets** — three buttons that load example text: *HTML snippet*, *Special characters* (©, —, emoji, quotes), *Double-encoded*.

**Out of scope for this version:** file upload/download, URL-encoding modes, custom entity definitions, history/undo beyond the browser's native behaviour, shareable links, and any server-side processing.

## Design

**Page structure (top to bottom):**
1. Header — studio wordmark link back to `/`, small "Lab" eyebrow, `h1` "Entity Codec".
2. Definition paragraph — one quotable sentence ("Entity Codec is a free online tool that …") plus a one-line safety note: decoding renders as plain text, so pasted markup can never execute on this page.
3. Encode-mode radio group (three options, horizontal on desktop, stacked on mobile).
4. Two-pane editor — left pane "Raw text" textarea, right pane "HTML entities" textarea, with a Swap button between them on desktop (stacked: swap sits between the stacked panes on mobile). Each pane has a label row (name + char count) and a Copy button.
5. Action row — Clear, three sample-preset buttons.
6. Quick-reference table — grid of entity cards: entity code, rendered character, name. Click to insert.
7. Footer — "Built by Shipwright Studio" with a link back to `/ideas/`.

**Key interactions and states:**
- *Empty:* both panes empty; counts show 0; copy buttons disabled (or copy an empty string silently — disabled is clearer).
- *Active:* typing in one pane updates the other after debounce; counts update live; the pane being edited shows a brass focus ring.
- *Success:* copy shows "Copied ✓" for 1.5 s; preset load fills both panes.
- *Error:* invalid or unknown entities (e.g. `&notareal;`, `&#xZZ;`) are left as-is on decode — no error banner; the behaviour is documented in a small note under the entity pane ("Unknown or malformed entities are left unchanged").

**Visual treatment:** dark premium studio aesthetic — page background `#0a0c0f`, panels `#11141a` with 1px `#232833` borders, Fraunces serif for the `h1`/headings, system sans for body and UI, brass accent `#d2a24c` for buttons, focus rings, and the active radio. Generous whitespace (max-width ~960px, section spacing 2.5rem). Textareas use a monospace font, min-height 180px.

**Mobile:** panes stack vertically; mode radios stack; reference table becomes a 2-column grid; buttons full-width where sensible; no horizontal scrolling.

## Acceptance criteria

1. A user can type `<a href="x">&` in the raw pane and immediately see it encoded in the entity pane, and typing entities in the other pane decodes them back.
2. Switching encode modes re-encodes the current raw text in the selected mode without losing the raw input.
3. A user can click any quick-reference row and its entity is inserted into the entity pane and decoded into the raw pane.
4. Decoding `&#169;`, `&#xA9;`, `&copy;`, and `&amp;lt;` produces `©`, `©`, `©`, and `&lt;` respectively; unknown entities such as `&notareal;` are left unchanged.
5. The page contains exactly one `h1`, a unique title and meta description, a canonical link, a `WebApplication` JSON-LD block, and no email addresses, `mailto:` links, or secrets.
