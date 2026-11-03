# NFT Rarity Calculator — build spec

## Concept
NFT Rarity Calculator is a free online tool that scores how rare each item in a collection is, from its traits. Paste a collection as JSON — an array of items, each with an id and a traits object — and it computes trait frequencies, a rarity score per item, and a ranked leaderboard. It is for collectors and creators who want to answer "how rare is mine, really?" without a spreadsheet, and to see which single trait is doing the heavy lifting. All computation happens in the browser; nothing is uploaded.

## Feature list (priority order)
1. Paste-JSON input (textarea) with the expected format documented and a "Load sample collection" button (12 built-in items, 3 trait types: Background, Eyes, Mouth).
2. Rarity scoring: for each trait value, frequency = count / collection size; trait score = 1 / frequency; item score = sum of its trait scores. Rank items by score descending; rank 1 is rarest. Show score to 2 decimals and rarity percentile.
3. Ranked leaderboard table: rank, id, score, top trait (highest single trait score), and each trait value; click a row to highlight it and show its trait breakdown.
4. Trait frequency tables: per trait type, each value with count, percentage, and trait score, sorted rarest first.
5. Filter: a trait-type/value dropdown pair that filters the leaderboard to matching items (with a clear-filter button); empty result shows a plain "No items match" state.
6. Validation + error state: invalid JSON, non-array input, or items missing traits show a clear error message and keep the previous results (or the sample, if none loaded yet).
7. "How rarity is calculated" explainer: the formula in plain language, plus the caveat that this is trait-rarity scoring, not a market price.
8. Footer credit: "Built by Shipwright Studio" + link back to /ideas/.

Out of scope for this version: fetching live collections from marketplaces, statistical rarity (Jaccard / normalised) methods, price data, wallet connection, CSV upload, exporting results.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — Devtool" → h1 "NFT Rarity Calculator" → quotable definition paragraph → input card (format note, textarea, Load sample / Calculate / Clear buttons, error line) → summary strip (collection size, trait types, rarest item) → leaderboard card (table, click-to-inspect) → trait breakdown card (selected item's traits with scores) → trait frequency cards → "How it works" card → footer.
States: empty (no collection: prompt to load sample or paste), loaded (leaderboard + frequencies shown), error (red error line, previous results kept), filtered (subset shown, count noted), selected row (brass highlight + breakdown below the table). Mobile: tables scroll horizontally; controls stack.
Visual treatment: studio dark `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous whitespace; rank 1 row gets a brass left border.

## Acceptance criteria
1. A user can click "Load sample collection" and immediately see a ranked leaderboard with 12 items, rank 1 being the highest-scoring item.
2. A user can paste valid JSON in the documented format and get correct frequencies, scores and ranks (verified by node check below).
3. A user can filter by a trait value and see only matching items; clearing restores the full list.
4. A user pasting invalid JSON sees a clear error and loses no previous results.
5. The page has exactly one h1, a unique title/description, canonical link, WebApplication JSON-LD, and a link back to /ideas/.
6. Scoring code passes a node check on the sample collection: collection size 12; Background "Gold" appears once (trait score 12.00); the rarest item is the one holding the most unique traits, and item scores equal the sum of their trait scores to within 0.01.
