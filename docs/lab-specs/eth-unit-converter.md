# Ethereum Unit Converter — Build Spec

## Concept
Ethereum Unit Converter is a free online tool that converts between wei, gwei and ether with exact integer arithmetic, so developers never lose value to floating-point rounding when reading gas prices or transaction values. It is for Ethereum developers, auditors and curious users who need to move between the three denominations quickly and check what a transaction will actually cost. Every keystroke re-computes all three units live, and a gas-cost calculator turns a gas limit and gas price into a real cost in gwei, ether and an editable sample USD value.

## Feature list (MVP, in priority order)
1. Three linked inputs — wei, gwei, ether — converting live in both directions; editing any one updates the other two immediately.
2. Exact integer math with `BigInt` for the conversion itself (wei values exceed `Number` precision); floating point is never used for the conversion. Fractional wei is rejected with an inline error.
3. Quick chips for common amounts: 1 gwei, 1 ether, 0.01 ether, 1,000,000 wei, and a "standard transfer" chip (21,000 gas at 20 gwei → 0.00042 ether).
4. Gas-cost calculator: gas limit + gas price (gwei) inputs, showing cost in wei, gwei and ether, plus an editable sample ETH price (default $3,000) that converts the cost to USD — clearly labelled as a sample value, not live market data.
5. Copy buttons next to each unit value and a "Copy all" action, each with a brief "Copied!" confirmation.
6. Reference table of unit magnitudes: wei 10⁰, kwei 10³, mwei 10⁶, gwei 10⁹, szabo 10¹², finney 10¹⁵, ether 10¹⁸ — with a one-line note on which units are used in practice (gwei for gas, ether for value).
7. Validation and error states: invalid characters, empty input (treated as 0 / blank), and fractional wei all produce a clear inline message naming the problem; valid input clears it.
8. Reset button restoring the default state (1 ether shown across all units).
Out of scope: live ETH price feeds or any network request, other chains or tokens, hex conversion, fiat currencies beyond the editable USD sample, saved history.

## Design
Sections top to bottom: nav (Shipwright Studio / Lab), eyebrow, h1, quotable definition paragraph, converter card (three labelled unit fields with copy buttons + quick chips + error line), gas-cost calculator card (gas limit, gas price, sample ETH price, cost readout in wei/gwei/ether/USD), reference table card (unit magnitudes), "How the units relate" explainer (why wei is the base unit, why BigInt matters), footer with Built by Shipwright Studio + link back to /ideas/.
Interactions and states: empty (all fields blank, cost readout shows "—"); active (typing in any field recomputes the other two and the gas cost instantly); success (copy buttons briefly show "Copied!"); error (invalid input or fractional wei shows a brass/red inline message and leaves the last good values in place).
Visual treatment: dark premium #0a0c0f, Fraunces serif headings, brass #d2a24c accent, generous whitespace. Unit fields use a monospace font for numbers so long wei values stay legible; the wei field wraps/scrolls horizontally. Mobile: fields stack full-width, chips wrap, table scrolls horizontally if needed.

## Acceptance criteria
- A user can type 1 in the ether field and see exactly 1000000000000000000 wei and 1000000000 gwei, with no rounding.
- A user can type 21000 gas at 20 gwei in the calculator and see a cost of 0.00042 ether.
- A user can type a fractional wei value (e.g. 1.5) and see a clear error, with no conversion performed.
- A user can copy any unit value and see a "Copied!" confirmation.
- The page has exactly one h1, unique title/description, canonical link, and WebApplication JSON-LD.
