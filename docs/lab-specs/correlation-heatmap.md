# Correlation Heatmap — Build Spec

## Concept

Correlation Heatmap is a free in-browser tool for investors and analysts:
paste a table of asset prices (or returns), and it instantly draws the
asset-by-asset Pearson correlation matrix as a heatmap. No upload, no
spreadsheet, no Python — everything computes locally in the page. Ideal
for a quick "which of these actually diversify me?" check before building
a portfolio.

## Feature list

1. Input textarea accepting CSV / TSV / whitespace-separated values; first
   row treated as asset names; an optional leading label column (dates) is
   auto-detected and skipped.
2. Mode toggle: "Prices" (computes log returns first) vs "Already returns"
   (uses values directly); default = Prices.
3. Sample data button: loads 6 synthetic assets × 60 observations with
   realistic correlations (two tech names highly correlated, one negative
   to bonds-ish asset, crypto loosely correlated) so the heatmap is
   immediately interesting.
4. Pearson correlation engine: pairwise-complete observations, numeric
   validation, n−1 denominator; sanity-tested via node before shipping.
5. Heatmap render: square matrix, diverging scale (−1 slate-blue → 0
   neutral → +1 brass), diagonal pinned at 1.00; value shown in each cell
   (2 decimals, contrast-safe text color); asset names as row/column
   labels; click or hover a cell for the exact value, asset pair, and a
   strength label (strong ≥0.7 / moderate ≥0.4 / weak ≥0.2 / negligible).
6. Summary line: strongest positive pair and most negative pair with values,
   plus observation count per pair (all equal here) and a note that
   correlation is not causation.
7. Validation + error states: fewer than 2 numeric columns, fewer than 3
   rows, non-numeric cells (with row/line numbers), empty input — each gets
   a specific, actionable message; the old heatmap is hidden until the
   error is fixed.
8. Clear button; the heatmap is horizontally scrollable on small screens.

Out of scope: Spearman/Kendall modes, significance p-values, file upload,
rolling windows, saving/sharing matrices, more than ~30 columns (render
cap with a friendly note).

## Design

Top to bottom: topbar (← The Lab / Shipwright Studio), `h1` "What moves
<em>together?</em>", quotable definition paragraph (GEO), input card:
mode toggle pills + textarea + buttons (Compute / Sample data / Clear),
error callout (hidden by default), heatmap card: summary line, matrix
table (sticky labels), diverging legend (−1 … 0 … +1), detail line for the
selected cell, foot note ("paste from a spreadsheet; correlation ≠
causation; data never leaves your browser").

States: empty (sample CTA visible), computing-error (callout + matrix
hidden), results (matrix + legend + summary). Cells use a CSS-variable
color computed in JS; text flips light/dark by luminance for readability.

## Acceptance criteria

- A user can paste CSV price data (with or without a leading date column),
  hit Compute, and see a correct correlation heatmap; the diagonal is 1.00
  and the matrix is symmetric.
- The "Already returns" mode and the Sample data button both produce
  correct matrices; the sample shows the engineered strong/negative
  correlations within ±0.15 of their designed values.
- Invalid input produces a specific error naming the row/problem; clicking a
  cell shows the exact correlation, pair name, and strength label.
- Exactly one `h1`, canonical link, meta description, and a WebApplication
  JSON-LD block are present; no external JS dependencies.
