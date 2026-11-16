# Lorem Studio — build spec

## Concept
Lorem Studio is a free online tool that generates themed placeholder text
for designers and writers who are tired of the same grey Latin blocks. It is
for anyone mocking up a layout — a startup landing page, a pirate-themed
poster, or a classic editorial spread — who wants filler copy that already
sounds like the finished product. Pick a theme, choose how much text you
need, and get fresh, varied paragraphs in one click, ready to paste into
your design or copy out as HTML.

## Feature list (priority order)
1. Theme picker: three themes — Classic (traditional Latin lorem ipsum),
   Startup (buzzword-laden tech copy), Pirate (pirate-speak). Switching
   theme re-generates the output immediately.
2. Paragraph count: 1–10 paragraphs, via a number input / slider. Default
   3.
3. Paragraph length: short / medium / long, controlling sentences per
   paragraph (short 2–3, medium 4–5, long 6–8). Default medium.
4. "Start with Lorem ipsum..." toggle: only enabled for the Classic theme;
   when on, the first paragraph opens with the traditional "Lorem ipsum
   dolor sit amet, consectetur adipiscing elit..." sentence. Disabled (and
   greyed out) for Startup and Pirate, where it makes no sense.
5. Generate button: produces fresh text on every click. Generation is
   seeded-shuffled from a sentence bank, so repeated clicks give different
   text and no two paragraphs within one output are identical.
6. Copy button: copies the generated text as plain text (paragraphs joined
   by blank lines) to the clipboard, with a short "Copied" confirmation.
7. Download .txt button: downloads the generated text as a plain-text file
   named after the theme (e.g. `lorem-studio-startup.txt`).
8. Copy-as-HTML toggle/option: copies the same paragraphs wrapped in
   `<p>…</p>` tags, so it can be pasted straight into a markup file.
9. Live word/character count: updates with every generation, showing
   paragraphs, words, and characters.
10. Empty state: before the first generation the output area shows a short
    sample paragraph (Classic theme, medium length) with a hint to press
    Generate — so the page never looks blank.

Sentence banks: at least 12 unique sentences per theme, each genuinely in
that voice — Classic is real lorem-ipsum-style Latin sentences; Startup is
plausible startup copy (no real company names); Pirate is pirate dialect
("Arrr", "ye", "matey", "treasure", "seven seas"). No sentence is shared
between themes.

Out of scope: custom themes or user-editable sentence banks, word-level
controls (exact word counts), other output formats (Markdown, JSON),
server-side storage or accounts, and any network calls — everything runs
locally in the browser.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; controls card
(theme picker as three segmented buttons, paragraph count slider + number,
length segmented control, "start with Lorem ipsum" checkbox, Generate
button); output card (generated paragraphs in a readable serif-leaning text
area, or the empty-state sample paragraph before the first generation);
actions row (Copy plain text, Copy as HTML, Download .txt) + live counts
(paragraphs / words / characters); "How it works" explainer (sentence banks,
seeded shuffle, no repeats within one output, everything local). Visual
treatment: dark premium `#0a0c0f`, Fraunces headings, brass `#d2a24c`
accents, generous whitespace; theme buttons show a short sample line of
their voice when active. Mobile: controls stack to one column, action
buttons wrap full-width, output text stays at a comfortable reading size.
States: empty (sample paragraph shown, counts read 0 until first
generation — the sample is marked as a sample, not counted), active (fresh
text, counts live), success (brief "Copied" / "Downloaded" confirmation on
the action buttons), error (clipboard unavailable falls back to selecting
the output text and telling the user to press Ctrl/Cmd+C).

## Acceptance criteria
- A user can pick any of the three themes, set paragraph count 1–10 and a
  length, and generate text in that theme's voice; repeated clicks produce
  different text with no identical paragraphs inside one output.
- The "start with Lorem ipsum..." toggle only affects the Classic theme:
  it is disabled for Startup and Pirate, and when on for Classic the first
  paragraph begins with "Lorem ipsum dolor sit amet".
- Copy copies plain text, Copy-as-HTML copies `<p>`-wrapped paragraphs,
  and Download saves a `.txt` file; the live counts (paragraphs, words,
  characters) match the displayed text.
- The page shows a sample paragraph before the first generation, and every
  theme bank holds at least 12 unique sentences (verified by node).
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no network
  calls, no secrets, no email addresses.
