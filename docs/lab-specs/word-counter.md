# Build spec — Word Counter

## Concept

Word Counter is a free online writing companion: paste or type any text and
instantly see its words, characters, sentences, paragraphs, reading time and
keyword density. It is for writers, students, editors and anyone facing a
word limit, a social-media character cap or a "how long will this take to
read?" question. It is delightful because everything recomputes live as you
type, with no sign-up and no data leaving the page — the density table even
surfaces which words you are leaning on too hard.

## Feature list (MVP, in priority order)

1. **Live text input** — a large textarea; all statistics recompute on every
   keystroke. A "Load sample" button fills a short sample paragraph and a
   "Clear" button empties the text.
2. **Core counts** — words, characters (with spaces), characters (without
   spaces), sentences, paragraphs, lines. Definitions: a word is a maximal
   run of non-whitespace characters (split on whitespace); a sentence ends
   at `.`, `!` or `?` (runs of terminators count once, and a trailing
   fragment without a terminator still counts as one sentence when
   non-empty); a paragraph is a non-empty line block separated by blank
   lines; lines are newline-separated lines including empty ones only when
   the text is non-empty (empty text gives 0 everywhere).
3. **Reading & speaking time** — reading time at 200 words/minute and
   speaking time at 130 words/minute, shown as "X min Y sec" (under 60
   seconds shown as seconds only; empty text shows "—").
4. **Averages** — average word length (characters per word, letters and
   digits only, punctuation stripped), average sentence length (words per
   sentence), and longest word (first longest wins ties).
5. **Keyword density table** — top 10 words by frequency: tokenised
   lowercase, stripped of surrounding punctuation, minimum 3 letters,
   stopwords excluded by default with a toggle to include them. Each row
   shows word, count, and density as a percentage of total words
   (count / total words × 100, one decimal). Empty text shows an empty
   state ("Type or paste text to see keyword density.").
6. **Copy summary button** — copies a one-line summary
   ("N words, M characters, X sentences · ~Y min read") to the clipboard
   with a "Copied" confirmation; clipboard failure shows an error line.
7. **Limits helper** — a small note row showing remaining characters
   against two common caps (280 for a short post, 2,200 for a long caption)
   as "N / 280" style counts that turn red when exceeded.

Out of scope for this version: readability grade scores (Flesch-Kincaid),
grammar or spell checking, file upload, saving or sharing text, language
detection, per-language tokenisation (CJK text counts by whitespace runs,
not by character).

## Design

Page structure top to bottom: nav (Shipwright Studio / Lab), eyebrow
"Lab — Writing tools", h1 "Word Counter", quotable definition paragraph,
textarea card, stats grid card (6 big-number tiles), time + averages card,
keyword density card (table + stopword toggle), limits helper row, "How it
works" explainer (definitions in plain words), footer ("Built by
Shipwright Studio" + back to /ideas/).
Key interactions and states: empty state — all counts 0, times "—",
density empty message; active state — counts update live; error state —
clipboard failure message only (there is no invalid input: any text is
valid, including punctuation-only text, which yields 0 words but still
counts characters). Visual treatment: dark `#0a0c0f`, Fraunces headings,
brass `#d2a24c` accents, monospace stats; stats grid 3 columns desktop,
2 columns mobile; textarea full width.
Mobile: textarea and grid stack; density table scrolls horizontally if
narrow; buttons full-width on small screens.

## Acceptance criteria

- A user can paste text and immediately see word, character, sentence and
  paragraph counts update without pressing any button.
- A user can read a reading time and a speaking time derived from the word
  count at 200 and 130 words per minute respectively.
- A user can see the top 10 keywords with counts and density percentages,
  and toggle stopwords on and off.
- A user can copy a one-line summary of the counts to the clipboard.
- The page has exactly one h1, a unique title and description, a canonical
  link, a quotable definition paragraph, and a WebApplication JSON-LD block.
