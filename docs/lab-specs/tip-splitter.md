# Tip & Split — build spec

Slug: `tip-splitter` · Tagline: "Split the bill fairly, tip without math anxiety."

## Concept

Tip & Split is a restaurant bill splitter for groups who don't want to do arithmetic at the table. You enter each dish or shared item with its price and tap which diners it belongs to, add the tip percentage and any tax, and the page computes exactly what each person owes — items plus their proportional share of tax and tip, with a clean per-person breakdown. It removes the two frictions of bill splitting: deciding who's paying for what, and dividing tax/tip fairly instead of just splitting evenly.

## Feature list (MVP, priority order)

1. **People management** — add/remove diner names (max 10, dupe names auto-suffixed). Chips list with delete.
2. **Item entry** — add items with name + price; each item row lets you toggle which diners share it (tap chips, multi-select). Empty-state hint: "Add an item to begin."
3. **Simple mode** — toggle to a plain subtotal field for when nobody wants to itemise (one line per person still splits tax/tip proportionally to each diner's entered amount).
4. **Tip control** — preset buttons 15 / 18 / 20 / 22 %, plus a custom % field; zero is allowed ("no tip"). Tap-to-select with active state.
5. **Tax input** — single tax amount field (absolute $), split across diners proportionally to their item totals. Zero default.
6. **Per-person breakdown** — live result panel: for each diner, items subtotal + tax share + tip share = their total, with the grand total reconciling to bill + tax + tip. Rounding handled with a penny-adjustment pass so displayed shares always sum exactly to the grand total (and each person's items + tax + tip parts always sum exactly to their displayed total).
7. **Summary copy** — "Copy summary" button producing a plain-text message (per person + grand total) for pasting into the group chat.
8. **Sample data** — one-click "Load sample dinner" to demo the flow (also used for first-visit onboarding).

Out of scope: accounts/login, persistence beyond session (no localStorage needed, but acceptable if free — skip it), receipt OCR/photo scanning, currency conversion, service-fee line items beyond tax+tip, tip-on-post-tax vs pre-tax toggle (tip computed on pre-tax subtotal, standard US convention), editing quantities per item (duplicate the row instead).

## Design

Page structure top → bottom:
1. Top nav (`/ `→ Shipwright Studio, `/ideas/` → Idea Lab) — same as other lab pages.
2. Eyebrow "Lab · Everyday tools", h1 "Tip & Split", definition paragraph (quotable: "Tip & Split is a free online tool that …").
3. **Diners card** — name input + Add button, chip list.
4. **Bill card** — mode toggle (Itemised / Simple). Itemised: item rows (name, price, per-item diner chips), "Add item". Simple: one "what did X pay for?" amount per diner.
5. **Tip & tax card** — preset tip buttons + custom % input, tax $ input, note: tip calculated on pre-tax subtotal.
6. **Results card** — live per-diner rows (name, items $, tax $, tip $, big total), grand-total footer showing "Items + Tax + Tip = Grand total" with reconciliation line. Empty state: "Add people and items to see the split." CTA row: "Copy summary" + "Load sample dinner" + "Start over".
7. Footer linking `/ideas/` and `/`.

Key interactions / states:
- **Empty**: no diners, no items → results card shows empty-state text; copy button disabled.
- **Active**: any edit recalculates instantly; invalid inputs (empty name, price ≤ 0, no diner selected on an item) highlight the offending field with a red hint line.
- **Success**: totals reconcile — a green "✓ Totals reconcile" line; copy gives "Copied ✓" feedback.
- **Error**: an item with zero assigned diners, or zero diners at all → inline warning in results card, not a modal.

Visual treatment: dark premium `#0a0c0f` background, panel cards `#101318`, Fraunces serif headings, brass `#d2a24c` accents (selected chips, tip preset active, totals), generous whitespace, sans-serif UI labels (system stack like url-codec). Selected-chips use brass-tinted background.

Mobile: single column stack (already is), chips wrap, price inputs `inputmode="decimal"`, tip presets wrap to two rows, buttons full-width on <720px.

## Acceptance criteria

1. A user can add diners, add an item, assign it to a subset of diners, and see each assigned diner's item subtotal update live.
2. Selecting a tip preset (e.g. 20%) plus a tax amount produces per-person totals where tip is computed on the pre-tax item subtotal and tax is split proportionally to item subtotals.
3. The sum of displayed per-person totals always equals items + tax + tip to the cent (penny-adjustment pass), with a "Totals reconcile" indicator.
4. "Copy summary" places a plain-text breakdown (each name + amount + grand total) on the clipboard.
5. The page meets all lab SEO requirements: unique title "Tip & Split · Shipwright Studio", one-sentence meta description, definition paragraph, canonical link, WebApplication JSON-LD, exactly one h1, footer links to `/ideas/` and `/`.
