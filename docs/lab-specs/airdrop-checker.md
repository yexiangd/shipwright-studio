# Airdrop Checker Template — build spec

- Slug: `airdrop-checker`
- Idea: "Airdrop Checker Template", tagline "Eligibility-check UI template with rule builder."
- Status: doing → done on ship
- Page: `lab/airdrop-checker/index.html`

## Concept

Airdrop Checker Template is a free online tool that lets anyone paste a wallet address and check it against a transparent, editable set of token-airdrop eligibility rules — minimum balance, holding period, activity count, and a snapshot date — and see an eligible / not eligible verdict with a per-rule pass/fail breakdown. It is for builders prototyping airdrop claim pages and for users learning how eligibility rules actually work: every rule is visible, toggleable, and adjustable, and the demo stats behind the verdict are shown in full. **This is a demo with sample data only — no real chain connection, no real balances, no real airdrop.**

## Feature list (MVP, priority order)

1. **Wallet address input with validation** — text input accepting a `0x` + 40-hex address; format validation (`/^0x[0-9a-fA-F]{40}$/`) runs on every keystroke; an invalid address shows a clear inline error ("That doesn't look like a wallet address — expected 0x followed by 40 hex characters") and blocks the check. No checksum is enforced (EIP-55 checksum is optional and not computed).
2. **Deterministic demo eligibility engine** — pure functions derive stable pseudo-random demo stats from the address hash (FNV-1a over the lowercase address): balance (0–10 tokens, 2 decimals), holding days (0–730), transaction count (0–1500), and first-activity date (2024-01-01 + 0–700 days). The same address always yields the same stats; nothing is fetched from any network.
3. **Rule builder** — four editable rules, each with an on/off toggle and a value input: minimum balance (default 1.00), minimum holding days (default 90), minimum transactions (default 10), snapshot date (default 2025-07-01; passes when first activity is on or before the snapshot). Editing a rule re-runs the check live if an address is already entered. Disabled rules are shown as skipped, not failed.
4. **Per-rule pass/fail breakdown** — after a check, each enabled rule shows pass/fail with the address's demo stat next to the threshold (e.g. "Balance 3.42 ≥ 1.00 — Pass"); disabled rules show "Skipped".
5. **Overall verdict** — a prominent eligible / not-eligible banner: green "Eligible" when every enabled rule passes, red "Not eligible" naming how many rules failed. A verdict is only shown after a valid address has been checked.
6. **One-click sample addresses** — three sample buttons: one address that passes all default rules, one that fails at least one, and one invalid-format example. Samples are verified by the node test before shipping.
7. **Demo disclaimer** — a prominent banner at the top and a line in the footer: "Demo only — sample data, no real chain connection. Stats are generated in your browser from the address and are not real balances."

Out of scope for this version: real blockchain / RPC calls, real airdrop claims, wallet connection (MetaMask etc.), EIP-55 checksum enforcement, saving or sharing rule sets, multiple chains, any server or API call, any email address or contact form.

## Design

Page structure, top to bottom:

1. Nav: `Shipwright Studio` · `Lab` (same as address-validator).
2. Eyebrow: `Lab — Web3 tool`.
3. `h1`: Airdrop Checker Template.
4. Definition paragraph (`.define`): "Airdrop Checker Template is a free online tool that …" — one quotable summary sentence set for AI answer engines.
5. Demo disclaimer banner (`.demo-banner`, brass border, "DEMO" tag): "Demo only — sample data, no real chain connection. Stats are generated in your browser from the address and are not real balances."
6. Checker card (`.card`): address input (mono font, placeholder `0x…`), inline error line (hidden when valid/empty), "Check eligibility" button (brass), and a row of three sample-address buttons. A note under the input: "Nothing leaves this page — no lookup, no wallet connection, no network request."
7. Rule builder card (`.card`): four rule rows. Each row: toggle switch (checkbox styled as a switch), rule name + short explanation, value input (number, or date for the snapshot), and a live status chip (Pass / Fail / Skipped) once a check has run. Disabled rows are dimmed. A "Reset rules" button restores the four defaults.
8. Verdict card (`.card`): a verdict banner (neutral before a check: "Paste an address and press Check eligibility."; green "✓ Eligible for the airdrop" / red "✗ Not eligible — N of M rules failed") plus a demo-stats table (balance, holding days, transactions, first activity) and the per-rule breakdown list.
9. "How the demo works" explainer (`details`): the stats are derived deterministically from the address hash (FNV-1a), so the same address always gives the same result; changing the rules or the address re-runs the check; none of it touches a chain.
10. Footer: `Built by Shipwright Studio · Back to the Lab` (link to `/ideas/`).

Key interactions and states:

- **Empty**: input empty, verdict neutral, rule status chips show "—", stats show "—". No error shown.
- **Checking**: the check is instant (pure local computation); the button briefly shows "Checking…" for 350 ms so the action is perceptible, then the verdict renders.
- **Eligible**: green verdict banner; all enabled rule rows show a green Pass chip; stats table populated.
- **Not eligible**: red verdict banner naming the failed count; failed rows show a red Fail chip with the stat vs threshold; passing rows still show green Pass.
- **Invalid address**: red inline error under the input, verdict card returns to neutral with "Fix the address above to run a check.", no stats shown.
- **Rule-builder editing**: toggling a rule off marks it Skipped and re-runs the check live; changing a threshold re-runs the check live; invalid rule values (negative numbers, empty snapshot date) show an inline hint and keep the last valid value.

Visual treatment: dark premium `#0a0c0f` background, `#101318` panels, `#1c2128` hairlines, `#e8e4da` text, `#9aa3b2` muted, brass `#d2a24c` accent; Fraunces serif for headings, system sans for UI labels, JetBrains Mono for addresses, stats, and rule values; generous whitespace, max-width 960px, centred. Verdict colours: eligible — muted green `#7fb069`; not eligible — muted red `#e0655f`; skipped — muted grey. The demo banner is a brass 1px outline with a brass "DEMO" tag.

Mobile: single column — rule rows stack (toggle + name on one line, input full-width below), stats table collapses to two columns, sample buttons wrap, inputs stay full-width at 360px.

## Acceptance criteria

1. A user can paste a valid `0x` + 40-hex address and get an eligible or not-eligible verdict with a per-rule pass/fail breakdown showing the demo stats next to each threshold.
2. A user pasting a short, non-hex, or prefix-less address sees a clear inline error and no verdict.
3. A user can toggle a rule off and see it marked Skipped (not failed) with the verdict recomputed; changing a threshold re-runs the check live.
4. The same address checked twice gives the identical verdict and stats; the three sample buttons give an eligible example, an ineligible example, and an invalid-format example respectively.
5. The page has exactly one `h1`, a unique title/description, canonical link, WebApplication JSON-LD, a footer link back to `/ideas/`, a visible "Demo only — sample data, no real chain connection" disclaimer, and no email address, `mailto:`, or secret anywhere.

## Notes

- Pure logic (`isValidAddress`, `hashAddress`, `demoStatsFor`, `evaluateRules`, `DEFAULT_RULES`) is written as dependency-free functions in a delimited block (`// ---- PURE LOGIC (node-testable) ----` … `// ---- END PURE LOGIC ----`) before any DOM access, so it can be extracted and exercised under node.
- Hash: FNV-1a 32-bit over the lowercase address string; four independent values are derived by hashing the address with a different salt suffix per stat (`address + ':balance'`, etc.), so stats are uncorrelated. Balance = (h % 1000) / 100 (0.00–9.99); holdingDays = h % 731 (0–730); txCount = h % 1501 (0–1500); firstActivity = 2024-01-01 + (h % 701) days.
- Boundary rule: a stat exactly equal to its threshold passes (`>=` comparison); snapshot rule passes when firstActivity <= snapshot date (date-only comparison, UTC).
- Sample addresses are chosen by brute-forcing candidate addresses in the node test until one passes all four default rules and one fails at least one; the chosen values are then baked into the page and re-verified by the same test.
