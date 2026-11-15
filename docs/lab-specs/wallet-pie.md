# Wallet Portfolio Pie — build spec

## Concept
Wallet Portfolio Pie is a free online tool that turns a manually entered list
of holdings into a clear donut chart of portfolio allocation. It is for anyone
who wants a quick visual of how their money is spread — across stocks, funds,
crypto, cash or any asset they type in — without connecting a brokerage
account or installing an app. Type in each holding's name and value, and the
page instantly shows the weight of every position, the total, and a chart you
can read at a glance.

## Feature list (priority order)
1. Add-holding form: symbol/name, quantity, and price per unit — or a direct
   total value per holding (a toggle switches the form between "quantity ×
   price" and "value" mode). Value is computed as quantity × price in the
   first mode.
2. Donut allocation chart: a canvas pie chart (no external libraries) with a
   distinct colour per holding, a centre readout of the total portfolio value,
   and a legend listing each holding with its colour swatch and weight %.
3. Holdings table: one row per holding with symbol/name, quantity, price,
   value, and weight %; rows sorted by value descending. Weights always sum
   to 100%.
4. Edit and delete: each row has Edit (loads the holding back into the form)
   and Delete (removes it and renormalises the weights). Deleting the last
   holding returns the page to the empty state.
5. Totals bar: total portfolio value, number of holdings, and the largest
   holding (name + weight) shown above the chart.
6. Sample-data button: loads a realistic five-holding example portfolio so
   the chart can be seen immediately; a Clear-all button empties the list.
7. localStorage persistence: holdings survive a page reload on the same
   browser; a short note under the form says data is stored only locally.

Out of scope: live prices or market data (no network calls of any kind),
currency conversion, historical performance, importing from a broker or CSV,
and any account or login — all values are manually entered demo data.

## Design
Top to bottom: masthead + h1 + quotable definition paragraph; a brass-bordered
note stating all values are manually entered demo data, not live prices;
totals bar (three stat tiles); chart card (donut canvas + legend, or an empty
state with an illustration-free message "No holdings yet — add your first
holding below"); holdings table card; add-holding form card with the
quantity×price / value toggle and an inline error area; sample-data and
clear-all buttons; "How it works" explainer (value = quantity × price, weight
= value ÷ total, rounding note that displayed weights may sum to 99.9–100.1%
while the underlying math sums to exactly 100%). Visual treatment: dark
premium `#0a0c0f`, Fraunces headings, brass `#d2a24c` accents, generous
whitespace; chart palette is a set of muted, distinguishable brass/gold/teal/
slate/rose tones on the dark background. Mobile: form fields stack to one
column, table collapses to labelled card rows, chart scales to full width.
States: empty (no holdings — chart area shows the empty message, totals read
$0.00), active (chart + table + totals update on every change), error (invalid
name/value/quantity/price shows a red inline message and the bad field is
highlighted; nothing is saved until valid), success (a brief brass flash on
the chart card when a holding is added or edited).

## Acceptance criteria
- A user can add a holding by quantity × price or by direct value and see it
  appear in the donut chart, the legend, and the holdings table immediately.
- Weights are computed as value ÷ total and displayed to one decimal place;
  holdings of 600 / 300 / 100 show 60.0% / 30.0% / 10.0% and sum to 100%.
- A user can edit and delete holdings; deleting a holding renormalises the
  remaining weights, and deleting the last holding restores the empty state.
- Holdings persist across a page reload via localStorage, and the sample-data
  button loads a five-holding example portfolio.
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no network
  calls, no secrets, no email addresses.
