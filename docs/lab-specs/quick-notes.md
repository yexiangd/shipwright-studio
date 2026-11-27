# Quick Notes — build spec

## Concept
Quick Notes is a free online sticky-notes tool that recreates the feel of a browser-extension popup — a compact, always-handy scratchpad that opens fast and remembers everything. It is for anyone who jots down fleeting thoughts, links, or reminders and wants them still there when they come back: no account, no sync, no data leaving the page. It is delightful because it behaves like a real popup — small, instant, and quietly persistent — and because every note is saved to localStorage the moment it changes, so closing the tab never loses a word.

This page is a demo of the popup experience as a web page. It is not a real browser extension — no extension is installed, and nothing syncs to a browser account — it simply shows how the popup would work, using the same localStorage persistence an extension popup would use.

## Feature list (priority order)
1. Create notes: a composer at the top (title line + body textarea) with an "Add note" button; a note saves on submit and clears the composer. Empty body is rejected with a short hint.
2. Edit notes in place: clicking a note's body (or an Edit button) turns it into an editable field; saving updates the note and its updated timestamp.
3. Delete notes: a delete button per note, with a one-click undo toast ("Note deleted — Undo") that restores the note for 5 seconds.
4. Colour labels: each note gets one of five muted colours (brass, sage, slate blue, rose, stone); colour is picked in the composer and changeable per note.
5. Pin notes: pinned notes stay at the top of the grid in a "Pinned" section, with a pin toggle per note.
6. Search / filter: a search box filters notes live by title or body text (case-insensitive); a colour filter (All + five colours) narrows the grid further.
7. localStorage persistence: all notes persist in localStorage under the key `quickNotes.v1` and are restored on page load, including pinned state, colour, and timestamps.
8. Character count + export: a live character count on the composer (and per note while editing); "Copy all" puts every note as plain text on the clipboard, and "Export .txt" downloads all notes as a single `quick-notes.txt` file.

Out of scope: a real browser extension (no manifest, no install), sync across devices or browsers, accounts, tags/folders beyond colour labels, reminders or notifications, rich text or images, sharing links, server storage.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — App" → h1 "Quick Notes" → quotable definition paragraph → popup notice ("A demo of the browser-extension popup — notes are saved in this browser only, via localStorage. This page is not a real extension.") → toolbar card (search box, colour filter pills, Copy all / Export .txt buttons, note count) → composer card (title input, body textarea with live character count, colour picker dots, Add note button) → pinned section (label "Pinned", grid of pinned note cards) → all-notes section (label "Notes", grid of note cards; newest first) → empty state ("No notes yet — jot down your first one above.") → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no notes at all — empty-state message shown, toolbar export buttons disabled), active (notes present — grid renders, pinned section only when at least one note is pinned), editing (note body becomes a textarea with Save / Cancel), success (note added/edited — count updates, toast "Note saved"), error (empty body on add — inline hint "Write something first."; localStorage unavailable — banner "This browser won't let notes be saved — your notes will disappear when you leave."), undo (after delete — toast with Undo button for 5 seconds).
Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; note cards are dark panels with a thin coloured top edge (or left border) in the note's label colour; pinned cards carry a small brass pin mark; mobile: single-column grid, composer and toolbar stack full-width, filter pills wrap.

## Acceptance criteria
- A user can create a note (title + body), edit it in place, delete it with undo, pin it to the top, and assign/change its colour label.
- Notes persist across reloads: creating a note, reloading the page, and finding the same note (with pin and colour) present — verified by the localStorage round-trip in the node test.
- Search filters by title or body text and combines with the colour filter; an empty search shows all notes (verified by node test).
- Pinned notes sort above unpinned notes, and within each group newest-first (verified by node test).
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no images, no email addresses, and works on mobile width.
