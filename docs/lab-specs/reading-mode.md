# Reading Mode — build spec

## Concept
Reading Mode is a free online tool that strips any article down to clean,
readable text. It is for anyone who has ever opened an article and met a
wall of nav bars, ads, pop-ups and cookie banners before the first sentence
— the page shows three sample articles first in their cluttered, ad-covered
form, then one click removes everything but the words. A built-in
reading-time estimate, typography controls and a paste-your-own extractor
make it a working reader view, not just a mock-up.

## Feature list (priority order)
1. Three embedded sample articles (a tech essay, a science piece, a short
   story excerpt), each shown first in a "cluttered" mock page — nav bar,
   ad banners, sidebar, newsletter pop-up and cookie banner, every piece of
   clutter clearly labelled as demo clutter.
2. "Enter reading mode" action: strips the selected sample to clean text —
   headings, paragraphs, lists and blockquotes only — and swaps the view
   to the reader panel. "Exit reading mode" returns to the cluttered view.
3. Reading controls: font size (smaller / larger, 5 steps), line height
   (compact / comfortable / roomy), content width (narrow / standard /
   wide), serif/sans toggle, and theme (dark / sepia / light). Controls
   apply instantly and persist for the session.
4. Reading stats: word count and estimated reading time at 200 words per
   minute, shown above the reader, plus a reading-progress bar that fills
   as the reader scrolls through the article.
5. Copy clean text button: copies the extracted plain text of the current
   article to the clipboard and shows a "Copied" confirmation.
6. Paste-your-own extractor: a textarea accepts raw HTML, runs the same
   extraction, and renders the cleaned result in the reader. Empty input
   shows an inline error; malformed HTML is handled gracefully (the
   extractor never throws — unparseable input yields an empty result with
   a "nothing readable found" message).
7. Extraction as a pure function: `extractReadable(html)` removes
   script/style/nav/aside/header/footer/form elements and anything marked
   as an ad (class or id containing `ad`, `advert`, `popup`, `cookie`,
   `newsletter`, `sidebar`, `share`), keeps headings, paragraphs, lists
   and blockquotes, and returns clean plain text plus structured blocks.
8. "How it works" explainer: what gets removed, what is kept, the 200 wpm
   reading-time basis, and the note that everything runs locally in the
   browser — no article text is sent anywhere.

Out of scope: fetching arbitrary URLs (CORS makes that impossible from a
static page), saving articles or settings across visits, browser-extension
behaviour, PDF/ePub import, and any account or login.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; sample picker
(three tabs: Tech essay / Science / Short story); the cluttered article
preview — a bordered mock browser window with a fake nav bar, ad banners,
a sidebar, a cookie banner and a newsletter pop-up, each piece of clutter
tagged with a small "demo clutter" label; the brass "Enter reading mode"
button; the reader panel (hidden until reading mode is entered) with a
sticky controls bar (font size, line height, width, serif/sans, theme),
reading-progress bar, word-count / reading-time line, the clean article
text, and a "Copy clean text" button; the paste-your-own card (textarea +
"Extract" button + inline error area + cleaned-result area); "How it works"
explainer; footer link back to /ideas/. Visual treatment: dark premium
`#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace;
the reader's sepia theme is warm paper `#f4ead5` with dark ink `#2b2118`,
and the light theme is `#fafaf7` with near-black ink — themes apply to the
reader panel only, the rest of the page stays dark. Mobile: controls wrap
into two rows, the cluttered sidebar stacks below the article, font sizes
scale down. States: empty (no article chosen yet — the first sample is
pre-selected, so this state only appears if the reader is opened with no
sample); active (reading mode on — clutter hidden, reader shown, progress
bar live); success (copy button briefly reads "Copied ✓"); error (empty
paste input shows a red inline message; paste with no readable content
shows "Nothing readable found in that HTML").

## Acceptance criteria
- Each of the three samples renders first in a cluttered form with at
  least a nav bar, an ad, a sidebar, a cookie banner and a pop-up, all
  labelled as demo clutter, and "Enter reading mode" strips them to clean
  text with headings and paragraphs intact.
- The extractor removes nav/aside/script/style/ad-marked elements and
  keeps headings, paragraphs, lists and blockquotes; pasting the cluttered
  sample HTML through the textarea produces the same clean text as the
  button does.
- Word count and reading time are correct at 200 wpm (e.g. 400 words shows
  2 min read); the progress bar fills as the reader scrolls the article.
- All five control groups (font size, line height, width, serif/sans,
  theme) change the reader visibly and immediately; the copy button copies
  the clean text and confirms.
- Empty paste input is rejected with an inline error and malformed HTML
  never throws — it yields an empty result with a "nothing readable found"
  message.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no
  secrets, no email addresses.
