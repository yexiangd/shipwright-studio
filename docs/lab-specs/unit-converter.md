# Build Spec — Unit Converter (`lab/unit-converter/`)

## Concept
A single-page, instant unit converter for everyday and technical conversions. Unlike tabbed converter sites, this is one input with a category row — type a number, pick a category (length, mass, temperature, data, …), and see the value in every unit of that category at once, with the single from→to pair highlighted. For developers and students who bounce between metric and imperial, it removes the "convert, then convert again" loop: one number, the whole table.

## Feature list (MVP, in priority order)
1. **Category pills** (8): Length, Mass, Temperature, Data, Area, Volume, Speed, Time. Clicking switches the unit set instantly.
2. **Value input** — big numeric field; accepts decimals and scientific notation (`1e3`); invalid input shows a gentle error state, not NaN spam.
3. **From/To selects + swap button** — the pair drives the hero result; swap arrow exchanges the two units.
4. **Hero result** — large brass number showing from→to conversion with the formula line underneath (`1 km = 1000 m`, `°F → °C: (F − 32) × 5/9`).
5. **Full conversion table** — the input value in ALL units of the current category, each row click-to-copy.
6. **Copy button** on the hero result.
7. **Temperature done right** — affine (offset) conversion, not multiplicative; handles °C/°F/K/R.
8. **Data units** — bits through petabytes, SI (1000) and binary (1024) bases both shown.

**Out of scope**: currency (needs live rates), timezone/date math, conversions between categories, saving history.

## Design
- Top to bottom: studio topbar (← Lab index / Shipwright Studio brand) → `h1` "Unit Converter" → quotable definition paragraph (GEO) → card with category pills → value input row + from/to selects + swap → hero result card (big Fraunces/serif number, formula in mono) → "All units" table card → small footnote (bases for data units).
- States: empty input → result shows em-dash placeholder; invalid → red border + "Enter a valid number"; copy → toast "Copied".
- Visual: dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` hero number, mono (JetBrains Mono) for all numbers, tabular-nums to prevent jitter.
- Mobile: pills wrap; input/selects stack full-width; table stays two-column, no horizontal scroll.

## Acceptance criteria
- A user can convert `32 °F → 0 °C` exactly (affine path verified).
- A user can convert `1024 MiB → 1.073741824 GB` (both data bases present).
- Switching categories never loses the typed value; the table always lists ≥4 units.
- Clicking any table row copies that row's value; toast confirms.
- Page works offline with no JS errors; exactly one `h1`, canonical + JSON-LD present.
