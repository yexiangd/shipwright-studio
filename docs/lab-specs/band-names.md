# Band Name Gen — build spec

Idea: `band-names` (idea-093) · "Band Name Gen" · category: app · effort: S

## Concept

Band Name Gen is a free online tool that generates band names in one click.
It is for musicians, songwriters, and anyone naming a side project, a
playlist, or a fictional band — pick a genre and a naming style, hit
Generate, and get a name worth keeping. The word banks are large enough
(40+ words per bank, plus genre-specific banks) that repeats are rare, and
favourites persist in the browser so a good name is never lost. Everything
runs locally: no account, no upload, no server.

## Feature list (MVP, in priority order)

1. **One-click generation** — a big Generate button produces a name from
   the selected genre + style and displays it large in Fraunces serif,
   with a short playful tagline and a genre label underneath.
2. **Genre filters** — Any, Rock, Metal, Indie, Punk, Electronic, Jazz.
   Each genre draws from its own adjective/noun banks merged with the
   universal banks, so the pools are genuinely distinct (e.g. Metal leans
   "Iron", "Obsidian"; Jazz leans "Velvet", "Blue").
3. **Name style modes** — four patterns, selectable as segmented buttons:
   "The + Noun" (The Midnight Wolves), "Adjective + Noun" (Crimson Static),
   "The + Adjective + Noun" (The Hollow Echoes), "Noun + Noun" (Mirror
   Wolves); plus "Mix" (a random pattern each time).
4. **Generate 5 batch** — produces five distinct names at once (no
   duplicates within a batch), each with its own copy and favourite button.
5. **Copy to clipboard** — copies the current name; shows a brief "Copied ✓"
   state. Falls back to a textarea trick where the Clipboard API is
   unavailable.
6. **Favourites (localStorage)** — star a name to save it; the favourites
   panel lists saved names with per-name copy/remove, a Copy all button,
   and Clear all. Persists across visits.
7. **History** — the last 10 generated names, click any name to copy it.
   Kept in memory for the session (not persisted).
8. **Band name of the day** — a deterministic name derived from the date
   (seeded PRNG from `YYYY-MM-DD`), so every visitor sees the same name
   on the same day; includes its own copy button.

### Out of scope (this version)

- Checking whether a name is already taken (domain / streaming / trademark
  lookup) — generation only.
- Logo or artwork generation for the name.
- Sharing to social media.
- User-submitted words or custom word banks.
- Pronunciation / meaning notes per name.

## Design

Page structure, top to bottom:

1. Eyebrow ("Shipwright Studio · Lab"), `h1` "Band Name Gen", and the
   quotable definition paragraph.
2. **Band name of the day card** (panel): the deterministic daily name in
   large serif, its genre label, and a small Copy button.
3. **Generator card** (panel): genre chips (Any + 6 genres), style
   segmented buttons (Mix + 4 patterns), the big brass Generate button,
   the current name displayed large, its tagline + genre label, and
   Copy / Favourite buttons beside it. Empty state before the first
   generate: "Hit Generate — your next band name is one click away."
4. **Batch results** (appears only after Generate 5): a list of five names,
   each row with copy and favourite buttons.
5. **Favourites panel**: saved names (empty state: "No favourites yet —
   star a name you like."), Copy all and Clear all actions.
6. **History panel**: the last 10 names as clickable chips; empty state:
   "Nothing generated yet."
7. **How it works** section: 3 short paragraphs (word banks, genre pools,
   name of the day) + a note that everything runs locally and favourites
   never leave the browser.
8. Back link to `/ideas/` and the footer ("Built by Shipwright Studio",
   linked to `/ideas/`).

Key interactions and states:

- **Empty**: no name yet → display area shows the hint; Copy / Favourite
  buttons disabled; favourites and history panels show their empty states.
- **Active**: Generate (or a genre/style change followed by Generate)
  replaces the name with a fade-in; batch mode lists five distinct names.
- **Success**: copy shows "Copied ✓" for 2 s; favouriting fills the star
  and adds the name to the favourites panel; Copy all shows "Copied ✓".
- **Error**: clipboard failure falls back silently to the textarea method;
  if that also fails, the button briefly reads "Copy not supported".
  localStorage errors (e.g. private mode) are caught and favourites fall
  back to in-memory only.

Visual treatment: dark premium studio aesthetic — background `#0a0c0f`,
panels `#11141a` with `#232a35` borders, Fraunces serif headings and
generated names, brass `#d2a24c` accents, Inter body text, generous
whitespace, centred column (max-width 900 px). Genre chips are pill
buttons; the active chip/style is brass. The generated name is the
visual centrepiece (large Fraunces, brass underline flourish).

Mobile considerations: chips and segmented buttons wrap; the big Generate
button is full-width on small screens; batch rows stack cleanly; panels
stack to one column; touch targets ≥ 44 px.

## Acceptance criteria

1. A user can click Generate and immediately see a non-empty band name in
   the selected genre and style, with a tagline and genre label.
2. Genre filters produce distinct pools (a Metal name draws from the Metal
   bank; switching genre changes the name distribution) and each style mode
   produces names matching its pattern.
3. A user can generate 5 distinct names at once, copy any name, and star
   names into a favourites list that persists across page reloads.
4. The band name of the day is identical for the same date and changes
   across dates.
5. The page passes the repo SEO rules: unique title/description, canonical
   URL, exactly one `h1`, WebApplication JSON-LD, `alt` text on images, no
   `mailto:` anywhere.
