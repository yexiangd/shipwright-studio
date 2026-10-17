# Lab spec — timestamp-converter

## Concept
Timestamp Converter is a free online developer tool that converts Unix timestamps to human-readable dates in any timezone, and back. Devs constantly meet raw epoch values in logs, APIs and database dumps; this tool turns them into readable moments instantly — in UTC, in any IANA timezone, or in relative terms ("3 days ago"). It is for backend/frontend developers, data engineers, and anyone debugging time. It is delightful because it guesses the input unit (seconds, ms, µs, ns) automatically and needs no buttons — paste and read.

## Feature list (MVP, in priority order)
1. **Live "now" ticker** — current Unix time in seconds, ticking every second, with a "copy" button. Also shows current ISO 8601.
2. **Timestamp → date** — paste an integer; auto-detect unit: ≤10 digits = seconds, 13 = ms, 16 = µs, 19 = ns. Show ISO 8601 (UTC), the date/time in the selected timezone, and the timezone's UTC offset at that moment. Reject non-numeric input with an inline error state.
3. **Date → timestamp** — `datetime-local` input plus a timezone selector; outputs epoch seconds, milliseconds, and ISO 8601 (UTC).
4. **Timezone picker** — searchable dropdown: a short list of common zones at top (UTC, America/Los_Angeles, America/New_York, Europe/London, Europe/Berlin, Asia/Shanghai, Asia/Tokyo, Australia/Sydney), then the full `Intl.supportedValuesOf('timeZone')` list. Selection applies to both converters.
5. **Relative time** — for any converted moment, show "in 2 hours" / "3 days ago" alongside the absolute rendering.
6. **Copy buttons** — one click copies each output value.
7. **Shareable state** — timestamp, direction, and timezone live in the URL hash (`#t=<ts>&tz=...`); loading a link restores the result.

**Out of scope for this version**: date arithmetic between two dates (beyond relative display), cron/next-run calculations, week-number or calendar widgets, natural-language parsing ("tomorrow at 5").

## Design
- Dark premium studio page: `#0a0c0f` background, Fraunces serif `h1` ("Time Converter"), brass `#d2a24c` accents, generous whitespace, max-width ~860px centered column.
- Top: one quotable definition paragraph ("Time Converter is a free online tool that …").
- Hero card: live "now" ticker, large mono numerals, copy button.
- Two cards side by side on desktop, stacked on mobile: (A) "Timestamp → Date" with a mono input, unit auto-detect badge, output rows; (B) "Date → Timestamp" with datetime input, timezone select, outputs.
- Relative-time line under each result ("≈ 3 days ago").
- Empty state: dimmed placeholder examples; error state: red-tint inline message, no exceptions thrown.
- Footer: "Built by Shipwright Studio" link back to `/ideas/`.
- No external JS. Google Fonts (Fraunces + a mono font) via `<link>` is allowed.

## Acceptance criteria
- A user can paste `1696118400` and immediately see `2023-10-01T00:00:00Z` (UTC) plus the correct wall-clock time in a chosen timezone.
- A user can paste a 13-digit millisecond timestamp and the tool labels it as milliseconds, not seconds.
- A user can pick "Asia/Tokyo", enter a local datetime, and get the correct epoch seconds.
- The page ships with required SEO: unique `<title>` "Time Converter · Shipwright Studio", one-sentence meta description, canonical `https://shipwright-studio.pages.dev/lab/timestamp-converter/`, exactly one `h1`, `WebApplication` JSON-LD, and a quotable definition paragraph.
