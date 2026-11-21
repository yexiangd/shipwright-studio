# robots.txt Builder — build spec

Idea: `robots-builder` · "robots.txt Builder" · tagline: "Click together a crawler policy, download the file."

## Concept

robots.txt Builder is a free online tool that lets anyone assemble a valid
`robots.txt` crawler policy by clicking, instead of hand-writing the file
and hoping the syntax is right. It is for site owners, developers and SEO
practitioners who need to tell search engines and AI crawlers which parts
of a site they may crawl — from a simple "allow everything" file to a
WordPress-style policy with separate rules for Googlebot and AI bots. Rules
are edited visually as groups of User-agent + Allow/Disallow path rows,
presets load common policies in one click, and the generated file updates
live with validation warnings, ready to copy or download.

## Feature list (MVP, in priority order)

1. **Rule-group editor** — add, edit and remove groups. Each group has a
   User-agent field (free text, defaults to `*`) and a list of path rows,
   each row being an Allow or Disallow directive plus a path value
   (defaults: one Disallow row). Add-row / remove-row buttons per group;
   add-group / remove-group buttons for the page. Empty path on a Disallow
   row is flagged (see validation).
2. **Preset templates** — one-click buttons that replace the current rules
   with a known-good policy: Allow all, Block all, Block admin/login/search
   (Disallow `/admin/`, `/login/`, `/search/`), WordPress-style (blocks
   `/wp-admin/` and `/wp-includes/`, allows `/wp-admin/admin-ajax.php`),
   and AI-crawler rules (separate groups for `GPTBot`, `CCBot` and
   `ClaudeBot`, each disallowing `/`, plus the general `*` allow-all
   group). Loading a preset replaces the editor state and regenerates the
   file immediately.
3. **Sitemap and Crawl-delay lines** — optional Sitemap URL field (appended
   as `Sitemap: <url>` at the end, only when non-empty) and an optional
   Crawl-delay field in seconds (added to every group as
   `Crawl-delay: <n>`, only when set). Both are plain text/number inputs
   above the generated preview.
4. **Live generated-file preview with line numbers** — the generated
   `robots.txt` renders in a read-only monospace preview that updates on
   every edit, with line numbers in a gutter. Groups are separated by a
   blank line; directives print in the order User-agent lines, then
   Allow/Disallow rows, then Crawl-delay.
5. **Copy and download** — Copy robots.txt button (clipboard API with a
   textarea fallback, brief "Copied ✓" state) and Download robots.txt
   button (Blob download, filename `robots.txt`).
6. **Validation warnings** — a warnings panel that lists problems in
   plain language and updates live: Disallow with an empty path (invalid —
   crawlers treat it as "allow all"), duplicate identical directives
   within a group, a path that does not start with `/` or `*`, a wildcard
   `*` used in the middle of a path (only `*` as a suffix or a lone `*` is
   a recognised pattern), an empty User-agent, and a Sitemap value that is
   not a valid `http(s)://` URL. A warning never blocks generation; the
   preview always shows the file as it would be written.
7. **Load sample / Reset** — a "Load sample" button that loads the
   WordPress-style preset as an editable example, and a Reset button that
   returns to the default single-group allow-all state. Default on first
   load: one group, User-agent `*`, one row `Allow: /`.
8. **Rule / line counts** — a live count line under the preview showing the
   number of groups, rules and generated lines, so the user can see the
   size of the file at a glance.

### Out of scope (this version)

- Fetching and editing a site's live `robots.txt` by URL (CORS / proxy) —
  the tool builds a new file only.
- Testing the policy against a URL (a "would this URL be blocked?"
  checker is a future feature).
- Importing an existing `robots.txt` file to edit it (parse-back).
- Per-directive comments or `Noindex:` support (not part of the
  `robots.txt` standard as widely honoured).
- Saving policies to localStorage or accounts (no storage; everything is
  in-memory).

## Design

Page structure, top to bottom:

1. Eyebrow ("Shipwright Studio · Lab"), `h1` "robots.txt Builder", and the
   quotable definition paragraph.
2. **Presets card** (panel): five preset buttons in a wrap row — Allow
   all, Block all, Block admin / login / search, WordPress-style, AI
   crawler rules — plus a one-line note that loading a preset replaces the
   current rules.
3. **Rules card** (panel): the rule groups. Each group is a bordered
   sub-card with a header row (label "Group 1", User-agent input, remove
   group button) and its path rows (a select Allow/Disallow + a text input
   for the path + a remove-row button), plus an "Add rule" ghost button.
   Below the groups, an "Add group" primary-ish ghost button. Empty state
   (no groups): a hint line ("No rule groups yet — add a group to start.")
   and the preview shows the empty state.
4. **Extras card** (panel, two-column grid on desktop, stacked on mobile):
   Sitemap URL text input (placeholder `https://example.com/sitemap.xml`)
   and Crawl-delay number input (seconds, placeholder `10`), each with a
   short hint about when the line is emitted.
5. **Preview card** (panel): the generated file in a monospace `<pre>`
   with a line-number gutter (numbers rendered as a left column), a count
   line underneath ("2 groups · 7 rules · 11 lines"), and the action row:
   Copy robots.txt (primary), Download robots.txt (ghost). Buttons are
   disabled only when there are no groups and no sitemap line.
6. **Warnings card** (panel, shown only when warnings exist): a list of
   warning lines, each prefixed with "⚠", in the red accent colour.
7. **How it works** section: 3 short paragraphs (what `robots.txt` does
   and that it is advisory, how the builder assembles groups and emits the
   file, the local privacy note).
8. Back link to `/ideas/` and the footer.

Key interactions and states:

- **Empty**: no groups → preview shows the empty-state hint ("Your
  robots.txt will appear here — add a group or load a preset."), counts
  read 0, copy/download disabled.
- **Active**: any edit (typing, adding/removing rows or groups, changing a
  preset or an extras field) regenerates the preview immediately; counts
  and warnings update in the same pass.
- **Success**: copy shows "Copied ✓" for 2 s; download triggers a file
  save of `robots.txt`.
- **Error**: validation is advisory, not blocking — warnings appear in the
  warnings panel and the offending row is highlighted with a red border,
  but generation continues. An empty User-agent is emitted as
  `User-agent: *` in the file (and flagged), so the generated file is
  always syntactically complete. An invalid Sitemap URL is omitted from the
  generated file and the omission is stated in the warning ("Sitemap line
  omitted — not a valid URL"). Copy falls back to a hidden textarea +
  `execCommand` when the clipboard API is unavailable and shows "Copy not
  supported" only if both fail.

Visual treatment: dark premium studio aesthetic — background `#0a0c0f`,
panels `#11141a` with `#232a35` borders, Fraunces serif headings, brass
`#d2a24c` accents, Inter body text, monospace (ui-monospace) for the
generated file and path inputs, generous whitespace, centred column
(max-width 900 px). Rule-group sub-cards use a slightly lighter panel
(`#161a21`) with a brass left border on the active group header.

Mobile considerations: panels stack to one column; the extras grid
collapses; each path row wraps so the select, input and remove button stay
usable at 360 px; the preview scrolls horizontally for long lines; action
buttons wrap.

## Acceptance criteria

1. A user can add, edit and remove rule groups and Allow/Disallow rows,
   and the generated `robots.txt` preview (with line numbers) updates
   live to match, groups separated by blank lines.
2. A user can load any of the five presets and see the correct policy in
   the preview — Allow all produces exactly `User-agent: *` + `Allow: /`,
   Block all produces exactly `User-agent: *` + `Disallow: /`.
3. A user can set a Sitemap URL and a Crawl-delay and see them emitted
   only when set (Sitemap once at the end; Crawl-delay once per group),
   and an invalid Sitemap URL is omitted with a warning.
4. Validation warnings appear live for an empty Disallow path, duplicate
   directives, a path not starting with `/` or `*`, a misplaced wildcard,
   an empty User-agent and an invalid Sitemap URL.
5. A user can copy the file to the clipboard and download it as
   `robots.txt`; the page passes the repo SEO rules (unique
   title/description, canonical URL, exactly one `h1`, WebApplication
   JSON-LD, `alt` text on images, no `mailto:` anywhere); the generation
   core is validated by node assertions.
