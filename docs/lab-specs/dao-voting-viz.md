# DAO Voting Power Viz — build spec

**Slug:** `dao-voting-viz`
**Idea:** dao-voting-viz, priority (from ideas.json)
**Status:** doing → done (shipped 2026-11-09)
**Live URL:** https://shipwright-studio.pages.dev/lab/dao-voting-viz/

## Concept

DAO Voting Power Viz is a free, client-side tool that turns a list of token
holders into a clear picture of who actually controls a DAO. Paste or edit a
list of voters with their token balances and the page computes each voter's
share of voting power, charts it, and quantifies concentration with the
standard metrics governance researchers use — top-holder shares, the
Herfindahl index, and the Nakamoto coefficient. It is for DAO contributors,
delegates, and token holders who want to answer one question before a vote:
how many wallets does it take to pass anything? Everything is computed
locally in the browser; the built-in datasets are illustrative samples, not
real on-chain data.

## Feature list (MVP, in priority order)

1. **Voter list input** — a textarea where each line is one voter:
   `name, balance` (comma-separated; whitespace-separated also accepted,
   balances may use thousands separators). Invalid lines are reported with
   their line number; valid lines still render.
2. **Share computation** — total supply, each voter's share of voting power,
   and cumulative share, all computed from the input — nothing is hardcoded.
   Voters are sorted by power, descending.
3. **Horizontal bar chart** — one bar per voter, width proportional to
   share, with name and share % labelled. Coalition members (see 6) are
   brass; the rest are a muted slate.
4. **Share table** — rank, voter, balance, share %, cumulative %, and a
   coalition badge for voters in the passing coalition.
5. **Concentration stats** — four stat cards, all computed live: top-1
   share, top-5 share, Herfindahl index (sum of squared shares, shown on
   the 0–10,000 scale with a plain-language reading), and Nakamoto
   coefficient (minimum number of voters whose combined share exceeds 50%).
6. **Quorum / threshold slider** — a slider from 1% to 99% (default 50%)
   that sets the passing threshold. The smallest set of top voters whose
   cumulative share reaches the threshold is highlighted as the passing
   coalition in the chart, the table, and a summary line ("3 voters control
   ≥ 50% of the vote").
7. **Sample datasets** — three one-click samples: a concentrated "Whale
   DAO" (one holder at 42%), a "Foundation DAO" (moderate concentration),
   and a "Distributed DAO" (twelve holders, no one above 15%). Loading a
   sample fills the textarea and renders immediately.
8. **Local-only note** — a short note under the results: all figures are
   computed in the browser from the pasted/sample data; sample datasets are
   illustrative, not real governance data.

### Out of scope for this version

- Fetching real holder data from an RPC endpoint, indexer, or API —
  paste-only.
- Delegation / vote-weight modelling (delegated power, quadratic voting,
  conviction voting).
- Vote outcomes or proposal simulation — this page shows power
  distribution, not what any given proposal would do.
- Export (CSV / PNG) of the chart or table.
- Multi-token / multi-chain support; one token, one list.

## Design

### Page structure (top to bottom)

1. Nav (`Shipwright Studio` · `Lab`) — same as other lab pages.
2. Eyebrow "Lab — Web3 tool", `h1` "DAO Voting Power Viz" (the only
   `h1`), and the quotable definition paragraph ("DAO Voting Power Viz is
   a free online tool that …").
3. **Input card** — textarea for the voter list with a hint line explaining
   the `name, balance` format; a row of three sample buttons (Whale DAO,
   Foundation DAO, Distributed DAO); "Visualize" (brass) + "Clear" (ghost)
   buttons; inline error area (`role="alert"`, brass-red text).
4. **Stats card** — appears after a successful render: four stat boxes
   (Top-1 share, Top-5 share, Herfindahl index, Nakamoto coefficient),
   each with a one-line plain-language reading, plus a total-supply and
   voter-count line.
5. **Threshold card** — slider (1–99%, default 50%) with a live value
   label and the coalition summary line ("3 voters control ≥ 50% of the
   vote — the passing coalition is highlighted below").
6. **Chart card** — horizontal bars, one per voter, labelled with name and
   share %; coalition bars in brass, others in muted slate.
7. **Table card** — columns Rank / Voter / Balance / Share / Cumulative /
   Coalition; coalition rows carry a small brass "coalition" tag.
8. **"How it works" card** — three short bullets: how share is computed,
   what the Herfindahl index means (below 1,500 competitive, 1,500–2,500
   moderately concentrated, above 2,500 highly concentrated), and what the
   Nakamoto coefficient measures.
9. **Local-only note** — sample data is illustrative; nothing leaves the
   browser.
10. Footer — "Built by Shipwright Studio · Back to the Lab" (`/ideas/`).

### Key interactions and states

- **Empty** — textarea shows a placeholder example; stats, chart and table
  hidden; Visualize disabled until the textarea is non-empty. The Whale
  DAO sample loads automatically on first visit so the page is never a
  blank wall.
- **Active** — typing enables Visualize; rendering is synchronous on click
  (no spinner needed). Moving the threshold slider re-computes the
  coalition live with no re-parse.
- **Success** — stats, chart and table render; coalition members highlighted
  in brass in both chart and table; summary line names the coalition size.
- **Error** — a line that cannot be parsed (missing balance, non-numeric
  balance, zero/negative balance) shows one plain sentence naming the
  line number, e.g. "Line 4: expected 'name, balance' — could not read a
  balance." Valid lines still render; the offending textarea gets a red
  border.
- **Clear** — empties the textarea and hides all results back to the
  empty state.

### Visual treatment

Studio aesthetic: background `#0a0c0f`, panels `#101318`, hairline
`#1c2128`, text `#e8e4da`, muted `#9aa3b2`, brass accent `#d2a24c`,
error `#e07856`. Fraunces serif headings, system sans for UI labels,
JetBrains Mono for balances / percentages / numbers. Cards with 14px
radius and generous padding; max content width 960px. Bars are plain CSS
divs (no chart library); coalition bars brass, non-coalition bars
`#2a313b`.

### Mobile

Single column under 700px; stat cards stack 2-up; the share table
collapses to stacked rows (labelled fields, value below); chart bar
labels wrap; buttons wrap; textarea keeps a comfortable 16px font to
avoid iOS zoom.

## Acceptance criteria

1. A user can click "Whale DAO" and immediately see a chart, table and
   stats: top-1 share 42.00%, top-5 share 87.00%, Herfindahl ≈ 2,387 and
   Nakamoto coefficient 2 — all computed from the sample, not hardcoded.
2. A user can paste their own list (e.g. `alice, 100` / `bob, 300`) and see
   shares of 25% / 75%, a Nakamoto coefficient of 1, and a chart with two
   bars.
3. Moving the threshold slider to 75% on the Whale DAO sample highlights
   exactly the top 4 voters (42 + 18 + 12 = 72% is not enough; adding the
   fourth at 9% reaches 81%) and updates the summary line.
4. A malformed line (missing balance, non-numeric balance, zero balance)
   shows a friendly one-line error naming the line number and never throws
   an uncaught exception; valid lines still render.
5. The page is a single self-contained `index.html` (inline CSS/JS, Google
   Fonts only), carries the required SEO block (unique title, description,
   canonical, JSON-LD, exactly one `h1`, definition paragraph, footer link
   to `/ideas/`), and contains no email address, `mailto:` or secret.
