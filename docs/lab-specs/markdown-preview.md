# Spec — Markdown Live (`markdown-preview`)

## Concept
Markdown Live is a free online split-pane markdown editor with instant rendering. You type markdown on the left, a GitHub-flavoured preview appears on the right — headings, lists, tables, code blocks, blockquotes and task lists included. It is for developers drafting READMEs, docs and blog posts who want a zero-setup previewer without opening an editor or pushing a commit. Everything runs in the browser: a small hand-written markdown renderer (no external JS dependencies allowed), autosaved drafts in localStorage, and copy-HTML / download-markdown export. No signup, no server, no data leaves the page.

## Feature list (MVP, prioritized)
1. **Split-pane editor**: markdown textarea (left) and live rendered preview (right); panes stack vertically on mobile with an Edit/Preview toggle.
2. **Live rendering**: headings (h1–h6), bold/italic/strikethrough, inline code, fenced code blocks, blockquotes, ordered/unordered/nested lists, task lists, links, images, horizontal rules, and tables with alignment.
3. **Formatting toolbar**: one-click insert buttons for bold, italic, heading, link, image, inline code, code block, quote, bullet list, numbered list, task item, and table — wraps or inserts at cursor.
4. **Stats bar**: word count, character count, reading-time estimate, updating live.
5. **Export**: "Copy HTML" and "Download .md" buttons.
6. **Autosave**: draft persisted to localStorage, restored on load; "Clear" button resets to the built-in sample.
7. **Sample document** loaded by default so the preview is alive on first visit.
8. **XSS-safe by construction**: raw HTML in the source is escaped and shown as text; `javascript:` link targets are stripped.
9. Out of scope: full GFM (footnotes, math, TOC auto-generation), image/file upload, collaboration, multiple documents/tabs, syntax highlighting in code blocks (monospace styled only).

## Design
- **Layout top to bottom**: eyebrow + `h1` "Markdown Live" → one-sentence quotable definition paragraph → toolbar (icon-labelled buttons) → editor grid (textarea | preview, equal halves) → stats bar → export row → back link to the idea bank.
- **Editor**: dark code surface `#0d1015`, Inter for UI, monospace stack for the textarea; preview styled with Fraunces headings, brass links, hairline table borders, blockquote brass left border, task checkboxes read-only in preview.
- **Interactions/states**: typing re-renders instantly (debounced ~120ms for large docs); empty editor → preview shows a soft placeholder hint; toolbar actions work with or without a text selection; copy buttons show a brief "Copied" confirmation.
- **Mobile**: below ~720px the grid collapses to a single column with an Edit | Preview segmented toggle; toolbar wraps; minimum tap target 40px.
- Studio aesthetic: `#0a0c0f` background, Fraunces serif headings, brass `#d2a24c` accents, generous whitespace.

## Acceptance criteria
- [ ] Typing `# Hello` renders an `<h1>` in the preview within a keystroke; deleting it removes it.
- [ ] A pipe table with `---` and `:---:` alignment renders as an HTML table with left/center/right alignment.
- [ ] A fenced code block renders as `<pre><code>` preserving whitespace and line breaks.
- [ ] Pasting `<script>alert(1)</script>` shows it as escaped text, never executes.
- [ ] "Copy HTML" copies the rendered markup; "Download .md" downloads the source as a `.md` file.
- [ ] Reloading the page restores the previous draft from localStorage.
