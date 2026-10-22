# UUID Generator — build spec

Slug: `uuid-generator` · Tagline: "Bulk-generate v4 UUIDs, one click to copy."

## Concept

UUID Generator is a developer utility that produces universally unique identifiers in bulk, entirely in the browser. Choose the UUID version (v4 random, v1 time-based, v7 time-ordered), how many you need (1–1000), and output formatting (case, hyphens, braces), then copy everything with one click or download a text file. Nothing is sent anywhere — generation uses the Web Crypto API, so it is safe for seeding test fixtures, database rows, and API payloads.

## Feature list (MVP, priority order)

1. **Version selector** — v4 (cryptographically random), v1 (timestamp + random node/clock), v7 (Unix-ms time-ordered, RFC 9562), and Nil (all zeros). Version nibble and RFC 4122 variant bits set correctly per spec.
2. **Bulk quantity** — number input 1–1000; textarea lists one UUID per line; "Regenerate" produces a fresh batch with identical settings.
3. **Format options** — lowercase/UPPERCASE toggle, hyphens on/off (32-hex compact form), braces on/off (`{…}`), all applied live to the current batch.
4. **Copy all** — one click copies the full textarea content; per-line click-to-copy button on hover (desktop) / always visible copy icon per row is too heavy for 1000 rows — instead: click any row to copy that single UUID with a "copied" flash.
5. **Download** — "Download .txt" saves the batch as `uuids-<version>-<n>.txt`.
6. **Uniqueness scan** — after each generation, a line reports "1,000 generated · 1,000 unique · 0 duplicates" (Set-based check; always expected 0 duplicates).
7. **Sample/educational note** — one-line explainer per version under the selector (e.g. "v7 sorts by creation time — good for database primary keys"); a "What is a UUID?" collapsible with the definition-style sentence for GEO.

Out of scope: v3/v5 name-based UUIDs (need a namespace + SHA/MD5 — cheap but adds surface; skip), UUID decode/inspect mode, batch API, history of past batches, QR of a UUID.

## Design

Page structure top → bottom:
1. Top nav (`/` → Shipwright Studio, `/ideas/` → Idea Lab) — same as other lab pages.
2. Eyebrow "Lab · Developer tools", h1 "UUID Generator", definition paragraph (quotable: "UUID Generator is a free online tool that …").
3. **Options card** — version radio pills (v4 / v1 / v7 / nil) with one-line version notes; quantity input (1–1000) + Regenerate button; format toggles (Uppercase, Hyphens, Braces).
4. **Output card** — monospace textarea (readonly), click-a-row-to-copy, stats line (generated · unique · duplicates), action row: Copy all, Download .txt.
5. **Explainer card** — "What is a UUID?" definition paragraph + per-version one-liners; collapsible `<details>`.
6. Footer linking `/ideas/` and `/`.

Key interactions / states:
- **Empty**: page loads with a default batch of 10 v4 UUIDs already generated (no empty state — a generator should show output immediately).
- **Active**: changing version/quantity/format regenerates or reformats instantly; invalid quantity clamps to 1–1000 with an inline hint; copy actions give "Copied ✓" toast; row click flashes the row.
- **Success**: stats line always confirms uniqueness; download starts immediately.
- **Error**: quantity out of range → clamped + hint text; clipboard API unavailable (very old browsers) → select-all fallback in textarea.

Visual treatment: dark premium `#0a0c0f`, panel `#101318`, Fraunces headings, brass `#d2a24c` accents (active version pill, action buttons), monospace output (ui-monospace stack), generous whitespace. Mobile: options stack, action buttons full-width, textarea rows auto-size.

## Acceptance criteria

1. A user can select v4 and generate 1–1000 UUIDs; every output line matches the v4 regex and has correct variant bits; the stats line reports N generated, N unique, 0 duplicates.
2. v1 outputs have version nibble `1` and v7 outputs have nibble `7` with the timestamp portion non-decreasing across a batch; Nil outputs the all-zeros UUID; formatting toggles (uppercase / no-hyphens / braces) transform the whole batch consistently.
3. "Copy all" places exactly the textarea contents on the clipboard; clicking a row copies that single UUID; "Download .txt" produces a file with one UUID per line.
4. Core generation logic passes node unit checks (v4 regex + variant, v1/v7 nibbles, v7 monotonic timestamps, format transforms, uniqueness over 1,000).
5. The page meets all lab SEO requirements: unique title "UUID Generator · Shipwright Studio", one-sentence meta description, definition paragraph, canonical link, WebApplication JSON-LD, exactly one h1, footer links to `/ideas/` and `/`.
