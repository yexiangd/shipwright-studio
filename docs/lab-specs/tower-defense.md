# Mini Tower Defense — build spec

## Concept

Mini Tower Defense is a free, self-contained tower-defence game that runs entirely in the browser. Enemies march along a fixed winding path across a grid map, and the player places three kinds of towers on the buildable tiles beside it to stop them. Survive all 20 waves and the base holds; let too many enemies leak through and the run ends. It is built for a five-minute coffee-break session: one click to place a tower, one click to start the next wave, and a visible wave preview so every round feels like a small, fair puzzle rather than a reflex test.

## Feature list (MVP, in priority order)

1. **Grid map with a fixed enemy path** — a 12 × 8 tile canvas map; enemies enter from the left, follow a serpentine path, and exit on the right. Path tiles are never buildable.
2. **Three tower types** — Arrow (cheap, fast, single-target), Cannon (slow, heavy splash damage), Frost (low damage, slows enemies). Each has distinct cost, range, damage and fire rate, shown in a build bar.
3. **Gold economy** — start with 150 gold; kills pay a bounty, clearing a wave pays a bonus. Gold is the only currency; nothing costs real money.
4. **20 waves with scaling** — enemy count, HP and speed grow every wave (HP ×1.15 per wave); later waves introduce fast runners and armoured tanks, and wave 20 is a boss escorted by tanks and grunts.
5. **Lives and leak penalty** — 20 lives; an enemy that reaches the exit costs lives (1 for grunts and runners, 2 for tanks, 5 for the boss). At 0 lives the run is lost.
6. **Start / pause / speed controls** — start a wave when ready, pause any time, toggle 1× / 2× speed. Between waves the player builds in peace.
7. **Sell and upgrade** — click a placed tower to select it: upgrade (up to level 3, +50% damage and +10% range per level) or sell for a 70% refund of total invested gold.
8. **Wave preview and run states** — the next wave's composition is shown before it starts; victory at wave 20 and defeat both show a summary panel with restart. Best wave reached is saved in `localStorage`.

Out of scope for this version: multiple maps, tower targeting modes (first/strong/last), achievements, sound effects, multiplayer or leaderboards, and saving a run mid-game.

## Design

**Page structure, top to bottom**

1. Eyebrow ("Shipwright Studio · Lab"), one `h1` ("Mini Tower Defense"), and a one-sentence definition paragraph written so an answer engine can quote it.
2. HUD strip: Gold, Lives, Wave (n / 20), Enemies left, Best wave. All values update live.
3. Build bar: three tower cards (name, cost, damage, range, fire rate, one-line role) plus the selected tower's panel (level, damage, range, Upgrade cost, Sell value) when a tower is selected.
4. Canvas game board (12 × 8 grid, path drawn in brass, towers as coloured glyphs, enemies as circles with HP bars, range ring shown for the selected tower).
5. Controls row: Start Wave, Pause, Speed (1× / 2×), Restart. A wave-preview line sits above it ("Wave 4: 14 grunts, 3 runners").
6. End-state panel (victory / defeat) overlaid on the board, with stats and a Play again button.
7. "How to play" section, then a link back to `/ideas/` and the studio footer.

**Key interactions and states**

- *Empty / build phase:* no wave running; clicking a buildable tile with a tower selected places it (gold deducted, tile occupied); clicking an occupied tile selects that tower; clicking a path tile shows a short "Can't build on the path" hint.
- *Active wave:* enemies spawn on a timer and walk the path; towers fire automatically at the first enemy in range; kill bounties and leak penalties update the HUD immediately; the Start button becomes "Wave running…".
- *Paused:* the loop freezes, board and HUD stay visible, Pause toggles back to Resume.
- *Success (wave cleared):* bonus gold is added, preview advances to the next wave, Start Wave re-enables.
- *Victory (wave 20 cleared):* board freezes, gold banner panel shows waves cleared, gold earned, towers built, best wave saved.
- *Defeat (lives reach 0):* board freezes, defeat panel shows the wave reached, best wave saved, Play again resets.

**Balance notes (validated in node, see below):** HP scales ×1.15 per wave (wave-20 factor ≈ 14.2×). Grunt 20 HP / runner 12 / tank 70 / boss 350 base. Wave 1 totals 160 HP against ~177 damage from three starting arrow towers — clearable with no leaks. Wave-20 boss has ≈ 4,970 HP; a mid-game line of ~200 engaging DPS kills it inside its ~35 s path traversal. Leak costs: grunt/runner 1 life, tank 2, boss 5.
- *Error:* placing without enough gold, or on an invalid tile, shows a brief inline hint and shakes nothing loose — no gold is spent and no state changes.

**Visual treatment**

Studio aesthetic throughout: dark `#0a0c0f` background, Fraunces serif headings, brass `#d2a24c` accents, generous whitespace, Inter body text. The board uses a dark panel with a subtle grid; the path is a brass-lined track; towers are brass (arrow), warm red (cannon) and ice blue (frost) glyphs; enemies are muted red circles with thin HP bars. Selected tower shows its range as a soft brass ring. Mobile: the canvas scales to the viewport width, tower cards wrap into a row, and all controls are thumb-sized buttons — no hover-only interactions.

**Mobile considerations**

Canvas is sized with CSS `width: 100%` and a fixed internal resolution, so taps map through a coordinate transform. Tower selection uses tap, not hover. Text and buttons stay legible at 360 px wide; the HUD wraps to two rows.

## Acceptance criteria

1. A user can place each of the three tower types on buildable tiles, and only on buildable tiles, with gold deducted and a range ring shown on selection.
2. A user can start a wave, watch enemies follow the path and take tower damage, and see gold rise on kills and lives fall on leaks.
3. A user can upgrade a tower to level 3 and sell it for 70% of the gold invested in it.
4. Clearing wave 20 shows the victory panel; losing all 20 lives shows the defeat panel; in both cases the best wave is saved and shown on the next visit.
5. The page has exactly one `h1`, a unique title and meta description, a canonical link, a `WebApplication` JSON-LD block, no `mailto:` links, and no external JavaScript dependencies.
