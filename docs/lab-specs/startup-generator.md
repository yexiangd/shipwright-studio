# Startup Idea Generator — build spec

## Concept
Startup Idea Generator is a free online tool that combines a random audience,
problem, technology, business model, and twist into a complete startup pitch —
a name, a one-line tagline, and a short pitch paragraph — in a single click.
It is for founders, hackathon teams, and anyone stuck staring at a blank page
who wants a fresh, funny, sometimes genuinely good business idea to riff on.
Every idea is generated locally from built-in word banks, and a self-aware
"Meta" button generates the idea for a startup idea generator — this very tool.

## Feature list (priority order)
1. **Generate a pitch**: one click rolls five slots — audience, problem,
   technology, business model, twist — and composes a startup name, a
   one-line tagline, and a 2–3 sentence pitch paragraph from them.
2. **Lock individual slots**: each slot has a lock toggle; locked slots keep
   their value while the rest re-roll, so a good audience or twist can be
   kept while the rest is reshuffled.
3. **Copy pitch to clipboard**: copies the name, tagline, and pitch as plain
   text, with a short confirmation message; falls back to selecting the text
   when the clipboard API is unavailable.
4. **History**: the last 20 generated ideas are listed newest-first; clicking
   one restores it as the current idea; duplicates are not added twice in a
   row; a Clear button empties the list.
5. **Favourites**: star the current idea to save it; favourites persist in
   localStorage and survive a page reload, and are shown in their own list
   with the same click-to-restore behaviour.
6. **"Meta" button**: generates a pitch for a startup idea generator itself
   (audience: aspiring founders; technology: a random idea generator; twist:
   self-referential), with a short note explaining the joke.
7. **Stats bar**: ideas generated this session, favourites saved, and
   history length, shown as three stat tiles.
8. **Download .txt**: downloads the current pitch as a plain-text file.

Out of scope: AI/LLM generation (all combinations come from built-in banks),
user accounts or server-side storage, shareable links, funding or valuation
estimates, and any network calls — everything runs in the browser.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; a brass-bordered
note stating all ideas are generated locally from built-in word banks, no AI
and no network calls; stats bar (three tiles); generator card with five slot
rows (label, value, lock button) and Generate / Meta buttons; pitch card
(startup name in Fraunces, tagline, pitch paragraph, Copy / Download buttons,
star toggle, and a status line); favourites list card; history list card;
"How it works" explainer (how the five slots combine, the lock rule, and the
meta joke). Visual treatment: dark premium `#0a0c0f`, Fraunces headings,
brass `#d2a24c` accents, generous whitespace; locked slots get a brass
outline and a filled lock glyph, unlocked slots a dim outline. Mobile: slot
rows stack (label above value), buttons go full-width, lists collapse to
single column. States: empty (no idea yet — pitch card shows a sample pitch
marked "Sample — press Generate"), active (all five slots filled, pitch
rendered, Copy/Download enabled), locked (slot value frozen across
re-rolls, visibly marked), success (brass flash on the pitch card + status
message after Generate/Copy/Favourite), error (clipboard unavailable — text
is selected instead with an explanatory message).

## Acceptance criteria
- A user can press Generate and get a complete pitch: a non-empty startup
  name, a tagline, and a pitch paragraph, with all five slots filled.
- Locking a slot keeps its exact value across repeated Generate clicks while
  the other slots change; unlocking lets it re-roll again.
- A user can copy the pitch as plain text (name + tagline + pitch), and the
  copied text assembles correctly from the current idea.
- History records generated ideas newest-first, never stores the same pitch
  twice in a row, caps at 20 entries, and clicking an entry restores it.
- The Meta button produces a pitch for a startup idea generator, and the
  page passes the SEO checklist: unique title/description, canonical, one
  h1, quotable definition paragraph, WebApplication JSON-LD, no external JS,
  no network calls, no secrets, no email addresses.
