# Build spec — HTTP Status Guide

## Concept

HTTP Status Guide is a free online reference that explains every common
HTTP status code like a human would: what it means, when you will see
it, and what to do about it. It is for developers debugging an API,
students learning HTTP, and anyone who has stared at a bare "403" and
wondered whose fault it is. It is delightful because it reads like
advice from a senior engineer — plain language first, jargon second —
and because a built-in quiz turns the reference into something you
actually remember.

## Feature list (MVP, in priority order)

1. **Searchable catalogue** — 36 common codes (100, 101, 103, 200, 201,
   202, 204, 206, 301, 302, 303, 304, 307, 308, 400, 401, 403, 404, 405,
   408, 409, 410, 411, 412, 413, 414, 415, 418, 422, 429, 451, 500, 501,
   502, 503, 504). Each card shows code, official name, class colour,
   a one-line plain-English meaning, and an expanded "When you'll see
   it / What to do" note. Search matches code, name, or any text in
   the card; typing filters the grid live. Search is
   whitespace-insensitive, so "login" also matches a card that says
   "log in".
2. **Class filter** — chips for All, 1xx Informational, 2xx Success,
   3xx Redirection, 4xx Client error, 5xx Server error; combined with
   the search box (both must match). A result count line ("Showing N
   of 36 codes") and an empty state ("No codes match — try a different
   search.") when nothing matches.
3. **Detail on click** — clicking a card toggles its expanded note;
   only the clicked card expands (others stay collapsed), so the page
   stays scannable.
4. **Copy button** — each expanded card has "Copy summary" copying
   "CODE Name — one-line meaning" to the clipboard with a "Copied"
   confirmation; clipboard failure shows an inline error.
5. **Quiz mode** — "Quiz me" picks a random code, shows its plain-English
   meaning, and offers four code choices (the correct code plus three
   distinct distractors from the same catalogue, shuffled). Correct
   answers score +1 and advance; wrong answers reveal the correct code
   and advance. A running score ("Score: X / Y") and a "New question"
   button are shown; the quiz never repeats the same question twice
   in a row.
6. **Class legend** — a short strip explaining the five classes in one
   line each, so a beginner can orient before searching.

Out of scope for this version: the full IANA registry (rare codes such
as 402, 407, 505 are omitted deliberately), response-header details
per code, a "what code should I return?" decision tree, or server-side
code lookup by live request.

## Design

Page structure top to bottom: nav (Shipwright Studio / Lab), eyebrow
"Lab — Developer tools", h1 "HTTP Status Guide", quotable definition
paragraph, class legend strip, search + class-filter card, result
count, cards grid (code cards, 3 columns desktop, 1 column mobile),
quiz card (question, four choice buttons, score, feedback line),
"How to read a status code" explainer (first digit = class, rest =
specifics), footer ("Built by Shipwright Studio" + back to /ideas/).
Key interactions and states: empty state — no search, all 33 cards
shown, count "Showing 33 of 33 codes"; active state — grid filters
live, quiz shows a question with unselected choices; success state —
quiz correct answer turns green, score increments, feedback confirms;
error state — no-match empty message, clipboard failure message.
Visual treatment: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c`
accents, class colours (1xx slate, 2xx green, 3xx blue, 4xx amber,
5xx red) used only as a small code badge, never as full-card colour.
Mobile: filters stack, cards single column, quiz choices full width.

## Acceptance criteria

- A user can search by code, name, or keyword and see only matching
  cards, with the count line updating (36 codes total: 3 × 1xx,
  5 × 2xx, 6 × 3xx, 17 × 4xx, 5 × 5xx).
- A user can filter by class, combined with search, and sees an empty
  state when nothing matches.
- A user can expand a card to read when to expect the code and what to
  do, and copy its one-line summary.
- A user can play the quiz: every question offers the correct code
  among four distinct choices, scoring tracks correct/total, and no
  question repeats immediately.
- The page has exactly one h1, a unique title and description, a
  canonical link, a quotable definition paragraph, and a WebApplication
  JSON-LD block.
