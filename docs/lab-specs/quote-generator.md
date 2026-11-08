# Quote Machine — build spec

- Slug: `quote-generator`
- Idea: idea-089, priority 68
- Status: doing → done on ship
- Page: `lab/quote-generator/index.html`

## Concept

Quote Machine is a free online aphorism dispenser: one click serves a short, attributed line worth pausing over, drawn from a curated bank of 59 real quotes spanning stoicism, focus, startups, craft, and resilience. It is for anyone who wants a moment of perspective before starting work — a founder, a maker, or a reader — and it is delightful because it never repeats itself until the whole deck is spent, so every draw feels fresh. Quotes are shown in large serif type with their author, and a deterministic "quote of the day" gives the page a reason to come back tomorrow.

## Feature list (MVP, priority order)

1. **Random draw, no repeats** — quotes are dealt from a shuffled deck; a quote cannot repeat until every quote in the current filter has been shown once, at which point the deck reshuffles and the counter resets.
2. **Category filters** — chips for All, Stoicism, Focus, Startups, Craft, Resilience. Switching category rebuilds the deck for that category and deals a fresh quote.
3. **New quote button** — large brass "New quote" button draws the next card. Keyboard: `N` or Space draws (Space is intercepted only when focus is not in a button/input).
4. **Copy to clipboard** — "Copy quote" copies `"<text>" — <author>` via the Clipboard API with a textarea fallback; the button shows "Copied ✓" for 2 seconds (success state), and "Copy failed — select the text" if both methods fail (error state).
5. **Quote of the day** — a small section below the main card shows today's quote, picked deterministically from the date (same date → same quote for everyone); a "Show today's quote" link loads it into the main card.
6. **Progress counter** — "Card 3 of 12 · Stoicism" under the card, so the no-repeat promise is visible.
7. **Author + category display** — every quote shows its author and category tag; no unattributed lines.

Out of scope for this version: favourites / saved quotes, localStorage persistence, social-share links, author biographies, search, any server or API call, audio.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as fluid-type).
2. Eyebrow: `Lab — Words`.
3. `h1`: Quote Machine.
4. Definition paragraph (`.define`): "Quote Machine is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Quote card (`.card`, large): category tag + progress counter at top; the quote itself in large Fraunces (clamp 1.6–2.4rem, centred); author line in brass below; button row: brass "New quote" + ghost "Copy quote" + status note. Subtle fade/slide animation on each new draw.
6. Category chips row (`.btnrow`): All + five categories, active chip highlighted in brass.
7. "Quote of the day" card: date label, today's quote in smaller type, author, "Show in card →" button.
8. "How it works" card: 3 short bullets — the deck (shuffle, no repeats), the daily quote (date-seeded), the sources (real, attributed lines; no invented attributions).
9. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty**: never empty — the page loads with the first card of a freshly shuffled deck already dealt.
- **Active**: drawing, filtering, copying — buttons respond immediately; the quote text cross-fades on each draw.
- **Success**: copy shows "Copied ✓" for 2 s; deck exhaustion shows a small note "Deck complete — reshuffled" once.
- **Error**: clipboard failure shows "Copy failed — select the text manually"; no other error path exists (all data is local).

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings and the quote itself, system sans for UI labels; generous whitespace, max-width 960px, centred. Large opening quotation mark in brass as a decorative glyph.

Mobile: single column, quote type scales down via clamp, buttons stack full-width, chips wrap.

## Acceptance criteria

1. A user can draw a new quote with the button or the `N` key, and no quote repeats until all quotes in the active category have been shown.
2. A user can filter by category and the deck, counter, and next draw all follow the selected category.
3. A user can copy the current quote and sees a clear success (or failure) message.
4. The quote of the day is identical for the same calendar date and changes when the date changes.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, and no email address, `mailto:`, or secret anywhere.

## Notes

- Quote bank: 59 real, attributed lines (Stoicism 12, Focus 10, Startups 16, Craft 10, Resilience 11). Attributions use only lines the builder is confident about (Marcus Aurelius, Seneca, Epictetus, Paul Graham, Reid Hoffman, Naval Ravikant, Steve Jobs, Dieter Rams, etc.); proverb lines are labelled "Japanese proverb" / "Chinese proverb" where that is the honest attribution. No invented attributions.
- Pure logic (shuffle, deck, daily pick, copy text) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
