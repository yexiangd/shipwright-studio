# Currency Convert — build spec

## Concept
Currency Convert is a free online currency converter that turns one amount into another currency instantly, using clearly-labelled sample rates so there is never any doubt about what the numbers mean. It is for travellers, online shoppers, and anyone doing quick mental maths across currencies who wants a fast, honest estimate without signing up or waiting on a network call. It is delightful because it is instant and transparent: every rate is shown, labelled as a sample, and the conversion can be checked in both directions at a glance.

## Feature list (priority order)
1. Instant conversion: typing an amount converts immediately (on every input event), with no submit button; the result shows the converted amount, both currency codes, and the rate used.
2. From/to selectors with swap: two dropdowns covering 12 major currencies (USD, EUR, GBP, JPY, CNY, CAD, AUD, CHF, HKD, SGD, INR, KRW); a swap button exchanges the two currencies and keeps the amount.
3. Sample rates, labelled honestly: all rates are static sample rates per 1 USD, dated 2026-11-27, shown under the heading "Sample rates — for illustration only". The page never claims live rates.
4. Quick-amount chips: 1, 10, 50, 100, 500, 1000 — tapping a chip sets the amount and converts.
5. Reverse conversion display: beneath the main result, the page shows the inverse ("1 EUR = 1.16 USD" style) so the user can sanity-check the direction.
6. Rates table: a small table of all 12 currencies with the sample rate per 1 USD and the rate per 1 unit of the selected "from" currency; clicking a row sets that currency as the "to" currency.
7. Copy result: a "Copy result" button copies a plain-text line ("100 USD = 86.00 EUR (sample rate)") to the clipboard and confirms with a short "Copied" state.
8. Empty/invalid states: before any amount is entered, the result area prompts "Enter an amount to convert."; empty, zero, negative, or non-numeric input shows a short hint instead of a result (e.g. "Enter an amount greater than zero.").

Out of scope: live exchange-rate API or any network fetch, historical charts, rate alerts, currency symbols beyond the code, saving or sharing conversions, multi-currency comparison beyond the two selected currencies.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — App" → h1 "Currency Convert" → quotable definition paragraph → sample-rates notice ("Sample rates, updated 2026-11-27, for illustration only — not live market rates.") → converter card (amount input, from selector, swap button, to selector, quick-amount chips, live result: big converted amount, rate line, reverse conversion line, copy button) → rates table card (12 rows, per-1-USD rate plus per-1-from-currency rate) → "How conversion works" explainer card (the formula, rounding rules, and why the rates are samples) → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no amount yet — result area shows the prompt), active (valid amount — result, rate line, reverse line, and table's per-from column update live on every keystroke), error (missing or invalid amount — a short hint replaces the result), success (same as active — a valid conversion is the success state; copy button flips to "Copied ✓" for 2 seconds).
Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; the result is a large mono figure with the currency code in brass; selectors are large dark inputs with a brass focus ring; the swap button is a circular brass-bordered button between the selectors; the rates table is a clean two-column mono table with the selected currencies highlighted; mobile: selectors and amount stack full-width, swap button sits between them, chips wrap, table scrolls horizontally if needed.

## Acceptance criteria
- A user can enter an amount, pick from/to currencies, and see the converted amount, the rate used, and the reverse conversion update instantly.
- Conversion math is exact and testable: 100 USD → EUR = 86.00 with the sample rate 0.86; round-trip USD→EUR→USD returns the starting amount within rounding; identity conversion (USD→USD) returns the amount unchanged; inverse rates are consistent (rate(A→B) × rate(B→A) = 1 within rounding) — verified by node test.
- The swap button exchanges from/to and the result re-computes for the same amount; quick-amount chips set the amount and convert.
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, no images, and works on mobile width.
- Every rate on the page is labelled as a sample with the date 2026-11-27; the word "live" never appears as a claim about the rates.
