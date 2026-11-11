# Joke Machine — build spec

- Slug: `joke-machine`
- Idea: "Joke Machine", tagline "Programmer jokes, rated by your groans."
- Status: doing → done on ship
- Page: `lab/joke-machine/index.html`

## Concept

Joke Machine is a free online programmer-joke machine that deals one random programming joke at a time — setup first, punchline on reveal — and lets the reader rate it on a groan scale, because a programming joke is only as good as the groan it earns. It is for developers, students, and anyone who has ever debugged at 2 a.m. and needed a laugh that understands why `null` is not the same as `undefined`. It is delightful because every joke is a tiny performance — the setup lands, the punchline is earned with a click, and the groan meter keeps a running score of which jokes made you laugh and which made you want to `git revert`.

## Feature list (MVP, priority order)

1. **Random joke card** — a card showing a joke's setup with the punchline hidden; a "Reveal punchline" button (or clicking the card) shows the punchline with a small brass flourish. The joke's category is shown as a small tag on the card.
2. **Groan-scale rating** — after the punchline is revealed, three rating buttons appear: 😂 "Loved it", 😐 "Meh", 🙄 "Full groan". Each maps to a groan score (😂 = 1, 😐 = 2, 🙄 = 3). One rating per joke per pass; rating is optional and the user can skip straight to the next joke. The chosen rating is highlighted and locked for that joke until the next joke is dealt.
3. **No-repeat shuffle deck** — jokes are dealt from a shuffled deck; no joke repeats until the deck is exhausted, then the deck is reshuffled automatically and a note says "Deck reshuffled — all jokes back in play." A progress line shows "Joke N of M in this deck".
4. **Category filter** — filter chips: All, General, DevOps, Databases, AI. Changing the filter rebuilds the deck from that category only (at least 6 jokes per category) and resets the progress counter. The active chip is highlighted.
5. **Session stats** — a stats strip under the card: jokes seen, jokes rated, average groan (numeric, 1 decimal, plus a label — "Mostly laughs", "Mixed bag", "Maximum groan"), and the current best joke (lowest average groan, most 😂) and worst joke (highest groan) by title/first line. Stats update live on every rating and reset with a "Reset stats" button.
6. **Copy joke button** — copies `setup + punchline` as plain text to the clipboard (Clipboard API with a textarea fallback); the button shows "Copied ✓" for 2 seconds. Works whether or not the punchline has been revealed (copies the full joke either way).
7. **Next joke button + keyboard** — a prominent "Next joke →" button deals the next card; `Space` or `→` also deals the next joke, `Enter` reveals the punchline when hidden. The setup of the next joke is shown immediately; the punchline is always hidden again.
8. **Built-in joke bank + localStorage persistence** — a bank of 32 original-ish programmer jokes (8 per category), stored inline in the page; each has `setup`, `punchline`, `category`, and a stable `id`. Session stats and per-joke ratings persist in localStorage and are restored on load; corrupt stored data falls back to empty stats.

Out of scope for this version: user-submitted jokes, sharing to social media, joke-of-the-day scheduling, sound effects, accounts or any server or API call, favouriting beyond the best/worst stats.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as aspect-ratio).
2. Eyebrow: `Lab — Just for Fun`.
3. `h1`: Joke Machine.
4. Definition paragraph (`.define`): "Joke Machine is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Category filter row: chips (All, General, DevOps, Databases, AI) with counts, e.g. "General · 8".
6. Joke card (`.card`, main): category tag + deck progress line ("Joke 3 of 32"), the setup in large serif type, a brass "Reveal punchline" button, the punchline area (hidden until revealed — shown in brass-tinted type with a short fade), then the groan rating row (three buttons, disabled until reveal) and a status line ("Rated 🙄 — full groan." / "Not rated yet — how bad was it?").
7. Action row: "Next joke →" (primary, brass) and "Copy joke" (secondary); a small note under it: "No repeats until the deck runs out — then it reshuffles."
8. Stats card: four stat tiles (Jokes seen / Rated / Average groan / Best & worst) — best and worst shown as the joke's setup first line plus its groan score; a "Reset stats" text button. Empty state: "No ratings yet — reveal a punchline and rate it."
9. "How it works" card: 3 short bullets — the groan scale (😂 = 1, 😐 = 2, 🙄 = 3; lower is funnier), the no-repeat deck, and that everything runs in the browser with stats saved on the device.
10. Footer: `Built by Shipwright Studio · Back to the Lab`.

Key interactions and states:

- **Empty**: before any rating, the stats card shows dashes and the empty-state line; the rating row is disabled with a hint ("Reveal the punchline to rate it."). On first load a joke is already dealt, setup visible, punchline hidden.
- **Active**: revealing the punchline enables the three groan buttons; rating one locks it in (highlighted, others dimmed) and updates the stats immediately; "Next joke" deals a fresh setup, hides the punchline, and re-enables rating. Changing a category chip rebuilds and shuffles the deck and deals the first joke of that category.
- **Success**: copy shows "Copied ✓" on the button for 2 s; deck exhaustion shows the reshuffle note ("Deck reshuffled — all 32 jokes back in play.") in the progress line for the next deal.
- **Error**: clipboard failure shows "Copy failed — select the joke manually."; corrupt localStorage is silently ignored and stats start empty.

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings and the joke setup, system sans for UI labels, JetBrains Mono for stats, progress, and the groan score; generous whitespace, max-width 960px, centred. The punchline appears in a brass-tinted panel with a left brass border; the groan buttons are large emoji buttons that lift on hover and fill brass when selected. The joke card has a subtle top brass rule.

Mobile: single column — category chips wrap, groan buttons stay in one row (large touch targets, ≥44px), stats tiles stack 2×2, action buttons full width.

## Acceptance criteria

1. A user can click "Reveal punchline" (or press Enter) and see the punchline, after which the three groan buttons become enabled; rating one updates the stats strip immediately and locks the rating for that joke.
2. A user can click "Next joke" repeatedly and never see the same joke twice until the whole deck (32 jokes, or the filtered category count) has been dealt, at which point the deck reshuffles and the progress line says so.
3. A user can pick a category chip (e.g. Databases) and only see jokes from that category, with the progress counter counting within that category.
4. A user can click "Copy joke" and get a "Copied ✓" confirmation with the full setup + punchline on the clipboard, and the session stats (seen, rated, average groan, best/worst) persist across reloads via localStorage.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (JOKES bank, shuffleDeck, drawNext, groanScore, rateJoke, computeStats, bestWorst, filterJokes, jokeText, deckProgress, validJoke) is written as dependency-free functions before any DOM access, guarded by `typeof document !== 'undefined'`, so it can be exercised under node.
- Groan scale: 😂 = 1 (no groan — actually funny), 😐 = 2, 🙄 = 3 (maximum groan). Average groan is the mean of all ratings, 1 decimal. Labels: avg < 1.7 "Mostly laughs", 1.7–2.3 "Mixed bag", > 2.3 "Maximum groan".
- Best joke = lowest average groan among jokes with ≥1 rating (ties broken by most ratings, then earliest rated); worst = highest average groan, same tie-breaks. A joke rated once is eligible.
- Deck: Fisher–Yates shuffle of the filtered joke ids; the deck is an array of ids; drawing pops from the end; when empty, rebuild and reshuffle from the same filter. The deck state carries a `started` flag so the very first build is not reported as a reshuffle — only a rebuild after a full deck has been dealt shows the reshuffle note. The current joke id is tracked so a re-rate after reload cannot double-count — ratings are stored per joke id as a list of scores.
- Joke bank: 32 jokes, 8 per category (general, devops, databases, ai). All original-ish, clean, no swearing, no targeting of any person or group. Each joke has a unique numeric id and non-empty setup/punchline.
