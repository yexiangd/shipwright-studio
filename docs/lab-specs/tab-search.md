# Build spec — Tab Search

## Concept

Tab Search is a free online prototype of a browser-extension tab finder:
type a few letters and instantly find any open tab by title or URL, then
jump to it or close it without hunting through windows. It is for anyone
who lives with dozens of open tabs — researchers, developers, writers —
and it is delightful because search is instant, keyboard-first, and the
results stay grouped by window so you always know where a tab lives. A
static page cannot read a real browser's tabs, so this demo ships with a
realistic sample dataset (three windows, four tab groups, pinned and
audible tabs) and every interaction — search, filter, keyboard navigation,
switch, close — works fully against that simulated data.

## Feature list (MVP, in priority order)

1. **Live search** — a large search input; results filter on every
   keystroke against tab title and URL (case-insensitive substring match).
   Ranking: title match outranks URL-only match; a match at the start of
   the title outranks a mid-title match; ties keep the tab's original
   order. A count line reads "N of M tabs" and updates live.
2. **Grouped results** — results are grouped by browser window, each group
   with a header ("Window 1 · Work", tab count) and a collapse toggle.
   Groups with zero matches after filtering are hidden. Within a group,
   tabs keep their original order after ranking.
3. **Keyboard navigation** — ArrowDown / ArrowUp move the highlighted row
   across the whole flattened result list (clamped at the first and last
   rows, no wrap); Enter switches to the highlighted tab; Escape clears
   the search and returns focus to the input. The search input is focused
   on load. Arrow keys never scroll the page while the list is focused.
4. **Switch to tab** — clicking a row (or pressing Enter) marks that tab
   as the active tab: the previous active tab loses its "Active" badge,
   the new one gains it, and a toast confirms "Switched to <title>".
   Only one tab is active at a time.
5. **Close tab** — each row has a close (×) button. Closing removes the
   tab from the list, updates all counts, and shows a toast with an Undo
   button that restores the tab to its original position. Closing the
   active tab moves the active badge to the next tab in the same window
   (or the first remaining tab, or none if no tabs remain).
6. **Filter chips** — All tabs / Pinned only / Playing audio only, plus a
   window filter (All windows / Window 1 / Window 2 / Window 3). Filters
   combine with the search query (AND).
7. **Tab badges and favicons** — each row shows a coloured-initial favicon
   (initial letter of the site, deterministic colour from the domain),
   title, URL, and badges for Pinned, Audible (playing audio), Muted and
   Active. Long titles and URLs truncate with an ellipsis.
8. **Demo controls and note** — a clear note under the definition
   paragraph states this is a prototype with sample data, not real browser
   tabs. A "Reset demo" button restores the original sample dataset and
   clears search, filters and toasts.

Out of scope for this version: reading real browser tabs (needs the
extension APIs), fuzzy matching beyond substring + ranking, tab
reordering / drag-and-drop, suspending or discarding tabs, syncing across
devices, searching tab content (only titles and URLs), persisting state
across reloads.

## Design

Page structure top to bottom: masthead ("Shipwright Studio"), h1 "Tab
Search", quotable definition paragraph ("Tab Search is a free online tool
that …"), prototype note, search card (search input with keyboard hint,
filter chips row, window select, counts line), results section (grouped
tab lists), "How it works" explainer (search ranking, keyboard shortcuts
table, what the extension version would do), footer ("Built by Shipwright
Studio" + link back to /ideas/).
Key interactions and states: empty state — no query, all tabs shown
grouped, input focused; active state — typing narrows the list live and
the counts line updates; no-results state — "No tabs match '<query>'"
with a "Clear search" button; success state — toast on switch ("Switched
to …") and on close (with Undo); error state — none for input (any query
is valid, including punctuation-only, which simply matches nothing); the
highlighted row is brass-outlined and scrolls into view. Visual
treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents,
monospace URLs, generous whitespace; favicon chips 32px rounded squares
with a white initial on a deterministic domain colour; rows are 56px
minimum height with a hover surface. Mobile: chips wrap, rows stack the
URL under the title, close button stays 44px touch target, window select
full width.

## Acceptance criteria

- A user can type a query and see matching tabs instantly, ranked title
  match first, with the counts line updating live.
- A user can move the highlight with ArrowUp/ArrowDown (clamped at the
  ends), press Enter to switch to the highlighted tab, and press Escape
  to clear the search.
- A user can close a tab, see the counts update, and undo the close from
  the toast.
- A user can filter by Pinned / Playing audio and by window, combined
  with the search query, and collapse a window group.
- The page has exactly one h1, a unique title and description, a
  canonical link, a quotable definition paragraph, a prototype-data note,
  and a WebApplication JSON-LD block.
