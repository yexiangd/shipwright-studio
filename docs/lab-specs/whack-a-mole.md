# Build Spec — Whack-a-Mole

**Slug:** `whack-a-mole` · **idea-010** · category: game · effort S

## Concept

Whack-a-Mole is a free online reaction game: for sixty seconds, moles pop out of a 3×3 grid of holes at quickening intervals and you bonk them with a hammer cursor. It's a pure two-minute time-killer aimed at anyone bored at a keyboard — the delight is the custom hammer cursor that swings on click, the combo streak when you're fast, and the occasional golden mole worth five points. Tight, tactile, and over in a minute.

## Feature list (MVP, in priority order)

1. **3×3 grid of holes** — moles pop up at random holes on a timer; CSS-drawn moles (no image assets), hammer cursor rendered as a CSS/SVG element following the pointer.
2. **60-second round** — countdown start (3-2-1-GO), big timer readout, round auto-ends at zero.
3. **Click-to-bonk** — hit registers on the mole; hammer does a quick rotate "swing" animation on every click; miss = no penalty, hit = +1.
4. **Combo streak** — consecutive hits without a miss build a ×2 / ×3 multiplier shown above the grid; a miss resets it.
5. **Difficulty ramp + golden mole** — spawn interval shortens every 15 seconds; ~1 in 12 spawns is a golden mole worth 5 base points.
6. **High score** — best score persisted in `localStorage`, shown on start and end screens; "New best!" flash when beaten.
7. **Start / game-over screens** — overlay cards with the rules blurb, final score, best score, and a Play again button.
8. **Sound toggle** — tiny WebAudio "bonk"/"pop" blips (no external files), on by default with a mute button.

**Out of scope:** online leaderboard, multiplayer, themed skins, keyboard-only mode, pause button (tab blur auto-pauses; resume via overlay click).

## Design

- **Structure top→bottom:** breadcrumb back to `/ideas/` · h1 + one-sentence definition paragraph (quotable, GEO) · score / time / best HUD bar · the 3×3 board (centered, max-width ~560px) · start overlay on first load · game-over overlay at the end · footer "Built by Shipwright Studio" + back link.
- **Interactions/states:** empty/idle = start overlay with instructions; active = HUD live, moles popping, hammer follows pointer (desktop) or fixed mallet bounce on tap (touch); success = game-over overlay with score, best, and a "Play again" button; pause = tab hidden → overlay "Paused — tap to resume", timer frozen.
- **Visual treatment:** dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` for HUD numbers and buttons; moles in warm tan/brown with brass noses; holes as inset dark ellipses; whitespace generous; no typewriter effects.
- **Mobile:** board fits viewport width, tap = bonk (no cursor); hammer cursor only on `(pointer: fine)` devices; 60s timer unchanged.

## Acceptance criteria

1. A user can start a round, see the 3-2-1 countdown, and bonk moles for exactly 60 seconds of gameplay.
2. Hitting a mole increments the score by 1 (or 5 for golden), a miss resets the combo multiplier to ×1, and the HUD updates every frame of change.
3. Spawn rate visibly increases over the 60 seconds; at least one golden mole appears in most rounds.
4. The best score survives a page reload (localStorage); beating it shows "New best!".
5. The page passes the repo `scripts/seo-check.py` (title, description, canonical, one h1, JSON-LD, no secrets); no external JS dependencies, Google Fonts only.
