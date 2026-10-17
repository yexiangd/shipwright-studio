# Lab spec — mortgage-calc

## Concept
Mortgage Calc is a free online mortgage calculator that answers the real question — "what does this house actually cost me?" — not just the monthly number. Homebuyers enter price, down payment, rate and term; the tool shows the full monthly breakdown (P&I, property tax, insurance, HOA, PMI), a month-by-month amortization view, total interest over the life of the loan, and how extra payments shorten the term. It is for first-time buyers comparing offers and anyone sanity-checking a lender's quote. It is delightful because every slider and input recalculates instantly, and the equity-vs-interest chart makes the 30-year cost visceral.

## Feature list (MVP, in priority order)
1. **Inputs** — home price, down payment (dollar amount with % toggle), interest rate, loan term (15/20/30 years), annual property tax (dollars or % of price), annual home insurance, monthly HOA, PMI (auto-applied at 0.5%/yr of loan when down payment < 20%, shown separately and removable).
2. **Monthly payment summary** — headline monthly total plus a stacked breakdown bar: principal & interest, property tax, insurance, HOA, PMI (each labeled, color-coded, brass = P&I).
3. **Amortization view** — yearly table by default (year, payment, principal, interest, remaining balance) with a toggle for monthly rows; current-year row highlighted.
4. **True-cost panel** — total of payments over the term, total interest, total tax/insurance/HOA, and the loan-to-cost ratio ("for every $1 borrowed you pay $X").
5. **Extra payments** — extra $/month input: shows months saved, interest saved, and the new payoff date; chart marker shows the accelerated curve.
6. **Chart** — canvas line chart: remaining balance and cumulative interest over time (two series, legend), with an optional extra-payment curve. Tooltips on hover.
7. **Presets** — 3 one-click scenarios (e.g. "$1.5M home, 20% down, 6.5%, 30yr"; "$900K, 10% down"; "$2M, 30% down") to start from.

**Out of scope for this version**: adjustable-rate mortgages, refinancing comparisons, tax-deduction modeling, buy-vs-rent comparison, multi-scenario side-by-side.

## Design
- Dark premium studio page: `#0a0c0f` background, Fraunces serif `h1` ("Mortgage Calc"), brass `#d2a24c` accents, generous whitespace, max-width ~1000px.
- Top: one quotable definition paragraph ("Mortgage Calc is a free online tool that …").
- Layout: left column = inputs (sticky on desktop), right column = results. Mobile: inputs first, results below.
- Breakdown: stacked horizontal bar with legend; headline number in large Fraunces numerals.
- Chart: canvas, two series (balance = brass, cumulative interest = muted red/gray), hover tooltip with values.
- Amortization: accessible table; yearly rows by default, "Show monthly" toggle.
- Empty/invalid state: guard against zero/negative inputs with inline hints; all math via the standard amortizing-loan formula `M = P·r(1+r)^n / ((1+r)^n − 1)`.
- Footer: "Built by Shipwright Studio" link back to `/ideas/`.
- No external JS. Google Fonts via `<link>` allowed.

## Acceptance criteria
- A user can enter $1,000,000 price, 20% down, 6.5% rate, 30 years, and the P&I shown equals the formula result (~$5,056.54/mo) — verified by a node unit check of the shared formula.
- A user can see the monthly payment broken into P&I, tax, insurance, HOA, and PMI (PMI appears only when down payment < 20%).
- A user can add an extra $500/month and see the months-saved and interest-saved numbers update.
- The page ships with required SEO: unique `<title>` "Mortgage Calc · Shipwright Studio", one-sentence meta description, canonical `https://shipwright-studio.pages.dev/lab/mortgage-calc/`, exactly one `h1`, `WebApplication` JSON-LD, and a quotable definition paragraph.
