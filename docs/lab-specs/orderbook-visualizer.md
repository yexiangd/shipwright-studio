# Build Spec — Order Book Visualizer

**Slug:** `orderbook-visualizer` · **idea-110** · category: devtool · effort M

## Concept

Order Book Visualizer is an animated simulator that shows how a limit order book works: a canvas depth chart with bid/ask sides morphing in real time, a live ladder table of price levels, and a synthetic order-flow engine firing random limit/market/cancel events against a drifting mid-price. It is aimed at developers, students, and curious traders who want an intuitive feel for bids, asks, spread, and depth without touching real market data. All data is 100% synthetic and labelled as such on the page — the delight is watching the book breathe: spreads tighten when makers step in, widen when market orders eat the touch, and the mid-price wander in response to order-flow imbalance. A "place your own limit order" widget lets the user join the queue and watch their order's queue position evolve.

## Feature list (MVP, in priority order)

1. **Synthetic order-book engine (pure JS, no DOM)** — integer-cent prices; bids sorted desc, asks asc; events: limit add (at touch / inside spread / deeper), market buy/sell (FIFO level consumption), cancel (touch-biased); spread self-stabilises *atomically within each event* — after any market/cancel/reduce that would push the spread past `maxSpread`, makers step inside the touch (each placement provably shrinks the spread by ≥2 ticks, so it terminates); crossing limit prices are clamped to just inside the touch; mid-price derived from best bid/ask so it drifts naturally; momentum term makes buys/sells cluster into mini-trends. Engine code lives between `ENGINE-START`/`ENGINE-END` markers so node can extract and test it.
2. **Animated depth chart (canvas)** — cumulative bid curve (green) left of mid, ask curve (red) right of mid, both peaking at the touch (bid cum grows toward the best bid; ask cum starts at total ask depth at the best ask and shrinks outward), brass dashed mid-price line, axis price/qty labels; per-frame lerp of displayed levels toward engine state for smooth morphing; hover crosshair with tooltip (price, cumulative bid/ask depth).
3. **Live ladder table** — asks (worst→best) on top, spread row in the middle, bids (best→worst) below; columns price / size / cumulative / depth bar; cells flash green/red on size change; updates throttled to ~7/sec.
4. **Readout strip** — mid-price (with up/down tick arrow), spread in ticks and $, total bid depth, total ask depth, event counter.
5. **Playback controls** — play/pause (spacebar too), speed slider 1–120 events/sec, presets Tight / Normal / Wide spread (reseed book), reset button. Tab hidden auto-pauses via rAF.
6. **"Place your own limit order" widget** — side toggle, price + qty inputs (price prefilled at touch), inserts into the live book; shows queue estimate ("price priority #k · N shares ahead at your price"), fills as market orders consume the level; user-cancel button. Labelled illustrative.
7. **Event feed** — last 7 engine events as colour-coded one-liners (LMT/MKT/CXL with side, qty, price).
8. **Educational notes + simulated-data labelling** — "SIMULATED DATA" pill under the h1, definition paragraph for GEO, and a short "How to read an order book" list (bid, ask, spread, depth, market vs limit order).

**Out of scope:** real market data or any data feed; multi-symbol support; trade history/tape chart; order types beyond limit/market/cancel; OHLC candlesticks; persistence of user orders across reloads; WebSocket-style latency simulation.

## Design

- **Structure top→bottom:** breadcrumb back to `/ideas/` · eyebrow · h1 "Order Book Visualizer" · "SIMULATED DATA" pill + one-sentence definition paragraph (quotable, GEO) · readout strip (5 metrics) · depth chart card (canvas + hover tooltip + legend) · two-column grid: ladder table card | right column (controls card, your-order widget card, event feed card) · "How to read an order book" notes · footer "Built by Shipwright Studio" + back link.
- **Interactions/states:** running = chart morphs, ladder flashes, feed scrolls, readouts tick; paused = everything freezes, button label flips to Play; preset change = book reseeds instantly; your order placed = appears in ladder highlighted with brass outline + status line; filled = status flips to "Filled ✓"; level cancelled away = status notes it; hover on chart = crosshair + tooltip, hidden on leave; empty states n/a (book always seeded).
- **Visual treatment:** dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` for mid-line/readouts/buttons; bids green `#7dc98a`, asks red `#e0655f`; generous whitespace; cards like existing lab pages; no typewriter effects.
- **Mobile:** single column (grid collapses); canvas full-width with `touch-action` pan → tap shows tooltip; ladder table horizontally scrollable; controls wrap; speed slider full width.

## Acceptance criteria

1. A user can press Play and watch the depth chart animate, the ladder update, and the mid-price/spread readouts change; Pause freezes all of it.
2. At every engine step the invariants hold (node-tested): bids sorted desc, asks sorted asc, best bid < best ask, all sizes > 0, spread within [1, maxSpread], depth curves monotonic; 2,000 seeded events pass with zero violations.
3. Hovering the depth chart shows price + cumulative bid/ask depth; the ladder's spread row always equals best ask − best bid.
4. A user-placed limit order appears in the ladder, shows a queue estimate, and transitions to Filled (or reports cancellation) as the simulation runs.
5. The page passes `scripts/seo-check.py` (title, description, canonical, one h1, JSON-LD, no secrets); no external JS dependencies, Google Fonts only; no email/`mailto:`/API-key-like strings anywhere.
