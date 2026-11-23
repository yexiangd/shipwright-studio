# Baby Name Explorer — build spec

Idea: `baby-names` · "Baby Name Explorer" · tagline: "Browse names by origin and meaning, shortlist yours."

## Concept

Baby Name Explorer is a free online tool that makes choosing a baby's name feel like browsing, not homework. It holds a curated, fully offline dataset of 72 names from eight origins, each with its meaning, gender and a popularity tier (Classic, Rising or Rare), so parents can filter by what actually matters to them — sound, heritage, meaning or how common the name is. A "Surprise me" pick breaks decision paralysis, and a persistent shortlist turns a long browse into a short, shareable list of favourites.

## Feature list (MVP, in priority order)

1. **Built-in dataset** — 72 names, each with `name`, `gender` (girl / boy / unisex), `origin` (English, Irish, French, Latin, Greek, Hebrew, Japanese, Arabic), `meaning`, and `popularity` (Classic / Rising / Rare). All data static and in-page; no network calls.
2. **Search by substring** — a text input filters names by case-insensitive substring match on the name.
3. **Filter controls** — gender filter (All / Girl / Boy / Unisex), origin filter (All + 8 origins), starting-letter filter (All + A–Z), popularity filter (All / Classic / Rising / Rare). All filters combine (AND).
4. **Result count** — a live count line ("Showing N of 72 names") that updates on every filter change.
5. **Name cards** — a responsive grid of cards, each showing the name, origin · gender, meaning, and a popularity badge, plus a star button to shortlist. Clicking a card (not the star) opens the detail view.
6. **Detail card** — a modal showing the name, meaning, origin, gender and popularity, plus up to 5 similar names (same origin, excluding itself); clicking a similar name opens its detail.
7. **"Surprise me"** — picks one random name from the currently filtered set (or the whole dataset if the filters match nothing) and opens its detail card.
8. **Shortlist panel** — a side panel listing starred names with per-name remove, a "Clear all" button, and a "Copy list" button (copies one name per line, with "Copied!" confirmation). Persisted in `localStorage` so it survives reloads.

### Out of scope (this version)

- Live popularity rankings, yearly trend charts or real-world usage statistics — tiers are curated labels only.
- Name meanings in languages other than English; pronunciation audio.
- Sharing a shortlist via link, or syncing it across devices (localStorage only).
- User-submitted names or editing the dataset.

## Design

### Page structure (top to bottom)

1. Studio eyebrow ("Shipwright Studio · Lab"), `h1` "Baby Name Explorer", and the quotable definition paragraph.
2. **Filter panel** — search input (full width) above a row of four labelled filter groups: gender segmented control, origin select, starting-letter select, popularity segmented control.
3. **Action row** — primary brass button "Surprise me" and a "Clear filters" ghost button; result-count line on the left of the row.
4. **Main area** — two columns on desktop: name-card grid (flexible width) and the shortlist panel (fixed ~300px) on the right; stacked on mobile with the shortlist below the grid.
5. **Detail modal** — centred overlay card with backdrop; closes via the × button, the backdrop, or the Escape key.
6. **How it works** — a short "How it works" section (3 lines) and a footer: "Built by Shipwright Studio" with a link back to /ideas/.

### Key interactions and states

- **Empty state**: when no name matches the filters, the grid area shows "No names match those filters — try widening the search." with a "Clear filters" button. The shortlist panel has its own empty state ("No favourites yet — tap the star on any name.").
- **Active state**: cards render on every filter change; the active filter values stay visible; the count line updates.
- **Success state**: after copying the shortlist, the button label becomes "Copied!" for 2 seconds, then reverts. Starring a name fills the star brass and the shortlist count badge increments immediately.
- **Error state**: if the Clipboard API fails, a fallback text area with the shortlist appears and is auto-selected, with the hint "Copy it manually". No `alert()` anywhere. If `localStorage` is unavailable, shortlisting still works for the session and a quiet note ("Shortlist won't persist in this browser") appears in the panel.

### Visual treatment

- Studio aesthetic: dark premium background `#0a0c0f`, panels `#11141a` with `#232a35` borders, text `#e8e4da`, muted `#9aa3b2`, brass accent `#d2a24c`.
- Fraunces serif for the `h1` and name titles; Inter/system sans for body and controls.
- Name cards are panels with a soft hover lift; the name is set large in Fraunces; the popularity badge is a small pill (Classic: brass outline, Rising: brass fill, Rare: muted outline).
- Star buttons are ghost stars (☆) that fill brass (★) when shortlisted. Generous whitespace, max-width ~1080px, centred.
- Modal: centred panel with a dimmed backdrop, name in large Fraunces, meaning in italic, meta chips (origin · gender · popularity), similar names as small brass-outlined chips.

### Mobile considerations

- Filter groups stack vertically; segmented controls become full-width rows; the search input is full-width.
- The shortlist panel stacks below the grid; the grid is a single column below ~560px.
- Touch targets ≥44px; the modal is full-width with side margins on small screens.

## Acceptance criteria

1. A user can combine search text with gender, origin, starting-letter and popularity filters, and the grid shows only names matching all of them, with an accurate result count.
2. Every one of the 72 names carries a non-empty name, origin, meaning, gender and popularity; at least 6 distinct origins are present.
3. Clicking a name opens a detail card with its meaning, origin, gender, popularity and similar names from the same origin; clicking a similar name opens that name's detail.
4. "Surprise me" always opens a detail card for a name present in the dataset; starring names builds a shortlist that persists across reloads, with remove, clear-all and copy-list working.
5. The page works entirely client-side with no network calls beyond the Google Fonts stylesheet, renders correctly at 360px wide, and contains exactly one `h1`.
6. The page carries the required SEO: unique title, one-sentence meta description, canonical link, definition paragraph, and a `WebApplication` JSON-LD block.
