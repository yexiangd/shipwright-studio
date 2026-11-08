# Contract Event Decoder — build spec

**Slug:** `event-decoder`
**Idea:** idea-123, priority 68
**Status:** doing → done (shipped 2026-11-08)
**Live URL:** https://shipwright-studio.pages.dev/lab/event-decoder/

## Concept

Contract Event Decoder is a free, client-side tool for reading EVM event logs
— the raw `topics` + `data` blobs you get from a block explorer or an RPC
`eth_getLogs` response — and turning them into human-readable parameter
names and values. Paste a contract's ABI (or just its event definitions) and
a log, and the page matches the log to its event by hashing the event
signature with Keccak-256, then decodes every indexed and non-indexed
parameter. It is for developers debugging a contract, analysts reading
on-chain activity, and anyone who has ever stared at a wall of hex and
wondered what a transaction actually did. Everything runs locally in the
browser: no wallet, no RPC call, no data leaves the page.

## Feature list (MVP, in priority order)

1. **ABI input** — paste a JSON array of event objects (or a full contract
   ABI; non-event entries are ignored). Invalid JSON or an ABI with no
   events yields a friendly error, not a crash.
2. **Log input** — paste either a raw log JSON object (`{ "topics": [...],
   "data": "0x..." }`, extra fields like `address`/`blockNumber` ignored) or
   a topics array plus a separate data field. Both are accepted; the page
   detects the shape.
3. **Event matching** — computes `keccak256("Name(type1,type2,...)")` for
   every event in the ABI and matches it against `topics[0]`. Shows the
   matched event name and signature. An unmatched `topics[0]` shows a clear
   "no matching event in this ABI" error with the computed topic hash.
4. **Parameter decoding** — decodes indexed parameters from `topics[1..]`
   and non-indexed parameters from `data`, rendered as a table of
   name / type / indexed / value. Integers are shown as exact decimals via
   `BigInt`; addresses are shown as `0x…` (40 hex chars); booleans as
   `true`/`false`; `bytes32`/`bytesN` as hex; `string`/`bytes` as decoded
   text (with hex shown alongside when the text is not printable).
5. **Supported types** — `address`, `uint`/`int` (any bit width),
   `bool`, `bytes32` and fixed `bytesN`, `string`, `bytes`, fixed-size
   static arrays (`uint256[3]`, `address[2]`, …) and dynamic arrays of
   static element types (`uint256[]`, `address[]`, …). Indexed dynamic
   types (`string`, `bytes`, arrays) are shown as their stored Keccak-256
   hash with a note that only the hash is on-chain.
6. **One-click samples** — built-in "Load sample" buttons for an ERC-20
   `Transfer` and an ERC-20 `Approval` log, each with a matching minimal
   ABI, so the page is demonstrable with one click and no pasting.
7. **Copy decoded output** — one click copies the decoded parameters as
   JSON to the clipboard.
8. **Clear / reset** — clears all inputs and results back to the empty
   state.

### Out of scope for this version

- Tuples / structs and nested arrays (ABI `tuple` components are not
  decoded; such events show an explicit "unsupported type" note).
- Anonymous events (no `topics[0]` to match on).
- Decoding more than one log at a time; no batch / multi-log mode.
- Fetching logs from an RPC endpoint or block explorer — paste-only.
- EIP-55 checksum casing of decoded addresses (shown as-is from the log).
- `indexed` dynamic values beyond their hash (a limitation of the EVM
  itself, not of this tool).

## Design

### Page structure (top to bottom)

1. Nav (`Shipwright Studio` · `Lab`) — same as other lab pages.
2. Eyebrow "Lab — Web3 tool", `h1` "Contract Event Decoder" (the only
   `h1`), and the quotable definition paragraph ("Contract Event Decoder
   is a free online tool that …").
3. **ABI card** — textarea for the ABI JSON, with a hint line explaining
   that a full contract ABI works (only events are used) and a "Load ERC-20
   events" quick button that fills a minimal Transfer + Approval ABI.
4. **Log card** — textarea for the log JSON (topics + data), plus a
   "Load sample" row: `Transfer` and `Approval` buttons that fill both the
   ABI and the log inputs at once. A short note: everything runs locally,
   nothing is sent anywhere.
5. **Decode button** (brass) + **Clear** (ghost) + inline error area
   (`role="alert"`, brass-red text).
6. **Result card** — appears after a successful decode:
   - matched event line: `Transfer(address from, address to, uint256 value)`
     plus its `topic0` hash in mono;
   - a table of decoded parameters: columns Name / Type / Indexed / Value.
     Indexed rows carry a small "indexed" tag; dynamic-indexed rows show
     the hash plus a footnote.
   - "Copy JSON" button under the table.
7. **"How it works" card** — three short bullets: signature hashing,
   indexed vs. data, and why dynamic indexed values only ever show a hash.
8. Footer — "Built by Shipwright Studio · Back to the Lab" (`/ideas/`).

### Key interactions and states

- **Empty** — textareas show placeholder examples; result card hidden;
  decode button disabled until both textareas are non-empty.
- **Active** — typing enables Decode; decoding runs synchronously on click
  (no spinner needed; Keccak-256 over a small ABI is instant).
- **Success** — result card renders; matched event header in brass;
  table rows alternate subtly; values in JetBrains Mono, long hex wraps.
- **Error** — error area under the buttons shows one plain sentence, e.g.
  "No event in this ABI matches topic 0xddf2… — check the ABI or the log."
  or "That ABI is not valid JSON." The offending textarea gets a red
  border; nothing crashes and previously decoded results stay visible
  until the next successful decode.
- **Copy** — button label flips to "Copied ✓" for 2 s.

### Visual treatment

Studio aesthetic: background `#0a0c0f`, panels `#101318`, hairline
`#1c2128`, text `#e8e4da`, muted `#9aa3b2`, brass accent `#d2a24c`,
error `#e07856`. Fraunces serif headings, system sans for UI labels,
JetBrains Mono for hex / code / values. Cards with 14px radius and
generous padding; max content width 960px.

### Mobile

Single column under 700px; the parameter table collapses to stacked rows
(name/type on one line, value below, full-width, wrapping hex); buttons
wrap; textareas keep a comfortable 16px font to avoid iOS zoom.

## Acceptance criteria

1. A user can paste an ERC-20 ABI and a Transfer log and see `from`, `to`
   and `value` decoded exactly (addresses and decimal value correct).
2. A user can click "Load sample: Transfer" and decode a correct result
   with no pasting at all; the same works for the Approval sample.
3. A log whose `topics[0]` matches no event in the ABI shows a clear
   "no matching event" message naming the topic hash, instead of wrong
   output or a blank page.
4. Malformed ABI JSON, malformed hex, a `data` field whose length is not a
   multiple of 32 bytes, or a `topics` array missing entries all produce a
   friendly one-line error and never throw an uncaught exception.
5. The page is a single self-contained `index.html` (inline CSS/JS, Google
   Fonts only), carries the required SEO block (unique title, description,
   canonical, JSON-LD, exactly one `h1`, definition paragraph, footer link
   to `/ideas/`), and contains no email address, `mailto:` or secret.
