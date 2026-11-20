# Markdown Clipper — build spec

Idea: `markdown-clipper` (idea-063) · "Markdown Clipper" · category: extension · effort: S

## Concept

Markdown Clipper is a free online tool that turns pasted HTML into clean,
readable Markdown entirely in the browser. It is for writers, developers and
researchers who copy content out of web pages, emails or CMS editors and want
portable plain-text Markdown — no account, no upload, no server: the HTML
never leaves the page. A small dependency-free HTML tokenizer and converter
runs locally (the same code is unit-tested with node), so headings, lists,
links, code and tables come out tidy, and live counts, options and a rendered
preview make the result easy to check before copying or downloading it.

## Feature list (MVP, in priority order)

1. **HTML → Markdown converter from scratch** — a dependency-free
   tokenizer/parser written in plain JS (no DOMParser, so it is testable in
   node). Handles headings h1–h6, paragraphs, bold/italic/strikethrough,
   links, images, unordered/ordered/nested lists, inline code and fenced
   code blocks, blockquotes, horizontal rules, simple tables, line breaks,
   HTML entity decoding, and whitespace normalisation. Strips `script`,
   `style`, `nav`, `header`, `footer`, `svg`, `iframe`, `form` and comment
   nodes, and drops all `class`/`id`/`style` attributes. Empty or malformed
   input is handled gracefully (empty output, no crash).
2. **Large HTML input with live output** — a textarea for pasting HTML and a
   read-only Markdown output area, converted on every keystroke with a short
   debounce (150 ms). Empty input shows an empty state with a hint, never a
   broken result.
3. **Load sample button** — fills the input with a realistic sample article
   (heading, paragraphs with bold/italic/links, a list, a code block, a
   quote and a small table) so the conversion is visible in one click.
4. **Conversion options** — three controls: include/exclude images
   (default on), link style inline vs reference (default inline), heading
   offset 0/+1/+2 (default 0, shifts every heading down so pasted fragments
   nest under the user's own h1).
5. **Copy and download** — Copy Markdown button (clipboard API with a
   textarea fallback, brief "Copied ✓" state) and Download `.md` button
   (Blob download, filename `clipped-markdown.md`).
6. **Word / character counts** — live counts for both the HTML input and the
   Markdown output, shown under each panel.
7. **Rendered preview toggle** — a "Preview" view of the output panel that
   renders the generated Markdown back to HTML with a tiny built-in
   Markdown renderer (headings, bold/italic/code, links, lists, quotes,
   code blocks, hr), so the user can check the result reads well. Toggle
   between "Markdown" and "Preview" tabs.
8. **Clear button** — empties the input and resets the output to the empty
   state.

### Out of scope (this version)

- Fetching a URL directly (CORS / proxy) — paste only.
- Full CommonMark / GFM compliance (footnotes, task lists, definition
  lists, nested tables, raw HTML passthrough).
- Preserving original HTML attributes, classes or inline styles.
- Syntax highlighting inside code blocks.
- Persistent history or saved clippings (no storage).
- Browser extension packaging (the idea's category is "extension", but this
  version ships as the web tool; the converter core is dependency-free so it
  can be lifted into an extension later).

## Design

Page structure, top to bottom:

1. Eyebrow ("Shipwright Studio · Lab"), `h1` "Markdown Clipper", and the
   quotable definition paragraph.
2. **Input card** (panel): a large monospace textarea labelled "Paste your
   HTML", with a character counter underneath and buttons: Load sample,
   Clear. Empty state: a hint line under the textarea ("Paste HTML from a
   web page, an email or a CMS — nothing leaves your browser").
3. **Options card** (panel, three-column grid on desktop, stacked on
   mobile): a checkbox for images, a select for link style
   (Inline / Reference), a select for heading offset (None / +1 / +2), plus
   a one-line note that conversion runs locally.
4. **Output card** (panel): tab toggle "Markdown | Preview" above the
   output area — a read-only monospace `<pre>`/textarea for the Markdown,
   and a rendered-HTML preview pane (same area, swapped). Underneath, a
   word/character count line and the action row: Copy Markdown (primary),
   Download .md (ghost). Buttons disabled in the empty state; copy shows a
   temporary "Copied ✓" state.
5. **How it works** section: 3 short paragraphs (what the converter keeps
   and drops, why the core is dependency-free and node-testable, the local
   privacy note).
6. Back link to `/ideas/` and the footer.

Key interactions and states:

- **Empty**: input blank → output area shows the empty-state hint
  ("Your clean Markdown will appear here."), counts read 0, copy/download
  disabled, preview tab shows the same hint.
- **Active**: input present → output updates live (debounced 150 ms);
  counts update; buttons enabled. Reference-link mode appends the link
  definitions at the end of the document.
- **Success**: copy shows "Copied ✓" for 2 s; download triggers a file
  save of `clipped-markdown.md`.
- **Error**: none expected for malformed HTML — the parser is tolerant
  (unclosed tags are closed implicitly, stray text is kept). If the input
  contains only stripped tags (e.g. only a `<script>`), the output is empty
  and a gentle note appears ("Nothing convertible found — the HTML
  contained only scripts, styles or navigation."). Copy falls back to a
  hidden textarea + `execCommand` when the clipboard API is unavailable
  and shows "Copy not supported" only if both fail.

Visual treatment: dark premium studio aesthetic — background `#0a0c0f`,
panels `#11141a` with `#232a35` borders, Fraunces serif headings, brass
`#d2a24c` accents, Inter body text, monospace (ui-monospace) for the
input/output textareas, generous whitespace, centred column
(max-width 900 px). The rendered preview pane sits on a light card
(`#f6f2ea` background, dark text) so it reads like a document.

Mobile considerations: panels stack to one column; options grid collapses;
textareas keep a usable height (min 180 px); action buttons wrap; the
preview pane scrolls horizontally for wide tables/code.

## Acceptance criteria

1. A user can paste HTML and immediately see clean Markdown (headings,
   lists, links, code, tables) in the output, updated live as they type.
2. A user can toggle images on/off, switch inline vs reference links, and
   shift headings by +1/+2, and see the output update to match.
3. A user can copy the Markdown to the clipboard and download it as a
   `.md` file; the Preview tab renders the output back to readable HTML.
4. Malformed HTML, script/style/nav-only input and empty input never crash
   the page and always produce a sensible empty or hint state.
5. The page passes the repo SEO rules: unique title/description, canonical
   URL, exactly one `h1`, WebApplication JSON-LD, `alt` text on images, no
   `mailto:` anywhere; the conversion core is validated by node assertions.
