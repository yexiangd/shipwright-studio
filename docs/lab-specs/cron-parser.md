# Build Spec — Cron Explainer (`cron-parser`)

**Seed:** "Paste a cron expression, read it in plain English." · category: devtool · effort: S

## Concept

Cron Explainer is a free online cron translator for developers and ops folks. Paste any 5-field (or 6-field with seconds) cron expression and instantly get a plain-English description ("At 09:30 on weekdays"), a field-by-field breakdown, and the next 8 real run times in your local timezone with a live countdown to the next one. Everything computes in the browser — nothing is sent anywhere.

## Feature list (MVP, priority order)

1. **5- and 6-field parsing** — supports `* , - /` in every field; 6-field treated as seconds-first. Validates ranges (minute 0–59, hour 0–23, day 1–31, month 1–12 or JAN–DEC, weekday 0–7 or MON–SUN where 7=Sunday).
2. **Plain-English description** — generated sentence like "At 09:30 on weekdays" / "Every 15 minutes between 9:00 and 17:00 on Mondays".
3. **Next 8 run times** — computed forward minute-by-minute from now; each row shows local date/time plus a relative label ("in 3h 12m"). Live countdown chip for the very next run, updating every second.
4. **Field breakdown table** — each of the 5/6 fields with its raw value and a short meaning ("Every minute", "Only on 9", "Every 15 minutes", "Mon–Fri").
5. **Presets** — one-click chips: Every minute, Every hour, Daily 09:00, Weekly Monday 09:00, Monthly 1st 09:00, Every 5 min (workdays 9–5).
6. **Validation with helpful errors** — wrong field count, out-of-range value, or empty value yields a specific message ("Field 2 (hour): 25 is out of range 0–23"), not a generic error.
7. **Copy summary** — copies "expr → description, next: <date>" to the clipboard.

Out of scope: `@reboot`-style specials (except mapping @hourly/@daily/@weekly/@monthly/@yearly to expressions when pasted), timezone selection (local only), L/W/# cron extensions, cron generation from UI.

## Design

Dark premium `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accent, generous whitespace.
Top to bottom: studio header link → h1 "Cron Explainer" + one-sentence definition paragraph → input card (large monospace input, Parse on typing with debounce, error line under it) → preset chips row → plain-English result banner (big serif sentence) → countdown chip + next-8-runs list → field breakdown table → copy button + "everything runs locally" note.
Key states: empty (placeholder + presets, no results), valid (full results), invalid (error line, results hidden).
Interactions: parse-on-input (debounced 250ms), clicking a preset fills and parses, copy button shows "Copied" feedback.

## Acceptance criteria

1. A user can paste `*/15 9-17 * * MON-FRI` and read an accurate plain-English description plus the next 8 correct run times.
2. Invalid input (e.g. `61 * * * *`, or 4 fields) shows a specific, field-named error.
3. The countdown to the next run ticks every second and matches the listed next time.
4. Works on mobile; layout stacks; no external JS dependencies.
5. SEO fields present: title/description/canonical/one h1/JSON-LD.
