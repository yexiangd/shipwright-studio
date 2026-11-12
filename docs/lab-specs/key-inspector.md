# Key Inspector — Build Spec

## Concept

Key Inspector is a free online keyboard event inspector. Press any key and it instantly shows the browser's `KeyboardEvent` details — `event.code`, `event.key`, `keyCode`, which modifiers are held, and the key's physical location — alongside a plain-English description of what was pressed.

It is for developers debugging keyboard shortcuts, hotkeys, and input handling, and for curious users who want to see exactly what their keyboard sends. Nothing is recorded or sent anywhere; everything happens locally in the page.

## Feature list (MVP, in priority order)

1. **Live key display** — the last pressed key shown large: the key glyph, `event.code`, `event.key`, `keyCode`, and a plain-English description ("Ctrl + K — letter K with Control held").
2. **Modifier chips** — Shift, Ctrl, Alt, Meta chips that light up while held, plus a readout of the combined modifier state.
3. **Key location** — shows `event.location` decoded (Standard / Left / Right / Numpad) when available.
4. **History log** — the most recent 20 key events, latest first, each row showing key, code, modifiers, and time; a **Clear** button empties it.
5. **Copy as JSON** — copies the last event's details as a JSON object to the clipboard, with a "Copied" confirmation state.
6. **Virtual key buttons (touch fallback)** — on-screen buttons for common keys (letters A–Z row subset, digits, Enter, Space, arrows, modifiers) that simulate a key event so mobile users without a physical keyboard can test the display.
7. **Repeat / edge-case handling** — `e.repeat` flagged on held keys (shown as "held / repeating" rather than a new entry flooding the log); modifier-only presses shown as such ("Shift alone — no character key"); dead keys reported with their `key` value (`"Dead"`).
8. **Privacy note** — a short line stating nothing leaves the page and no keystrokes are recorded or transmitted.

Out of scope for this version: full on-screen QWERTY keyboard rendering, key-remapping or shortcut recording, key-combination sequence detection (e.g. multi-step shortcuts), sound/haptics, and any persistence (localStorage) of history.

## Design

Page structure, top to bottom:

1. **Header** — studio masthead (small "Shipwright Studio" wordmark linking to `/`), then `h1` "Key Inspector".
2. **Summary paragraph** — one quotable definition sentence ("Key Inspector is a free online tool that …").
3. **Live display card** — large key glyph in the centre, with a grid of labelled fields underneath: `code`, `key`, `keyCode`, `location`, `repeat`. Idle state shows a prompt ("Press any key…") with dashed placeholder fields.
4. **Modifier chips row** — four chips (Shift / Ctrl / Alt / Meta) that highlight in brass while held; below them a plain-English description line of the last event.
5. **Virtual keys** — a compact row of tappable buttons (A, S, D, F, Enter, Space, ← ↑ ↓ →, Shift, Ctrl, Alt) for touch devices; tapping one simulates the corresponding event through the same rendering path as a real keydown.
6. **Actions row** — "Copy event as JSON" and "Clear history" buttons.
7. **History** — a list (max 20, latest first) with columns: time, key, code, modifiers, repeat flag. Empty state: "No keys yet — press a key to begin."
8. **Privacy note** — one line: "Everything runs in your browser. No keystrokes are recorded, stored, or sent anywhere."
9. **Footer** — "Built by Shipwright Studio" linking back to `/ideas/`.

Key interactions and states:

- **Idle/empty**: prompt glyph ("⌨"), placeholder fields show "—", history empty state visible, modifier chips all dim.
- **Key pressed**: glyph updates, fields populate, description line updates, chips reflect held modifiers, a new row prepends to history (repeated keydowns while held update the live display and the repeat flag but do not flood the log — the latest row's count increments instead).
- **Modifier-only press**: display shows the modifier name, description reads "Shift alone — modifier key, no character", `key` field shows the modifier name.
- **Dead key**: `key` shows `"Dead"`, description notes the key produces no character until combined.
- **Copy success**: button label briefly changes to "Copied ✓"; clipboard failure shows "Copy failed — select the JSON manually" and reveals the JSON in a `<pre>` fallback.
- **Error/edge**: unknown `keyCode` (0) shown as "—"; `location` 0 shown as "Standard".

Visual treatment: dark premium background `#0a0c0f`, Fraunces serif headings, brass accent `#d2a24c`, generous whitespace, hairline borders (`#1e242c`), muted secondary text (`#9aa3ad`). Key glyph in a large rounded card with a subtle brass glow on press. Buttons are dark with brass outline; primary action (Copy) is brass-filled with dark text. Chips are pill-shaped, dim by default, brass-filled when active.

Mobile considerations: layout stacks vertically; the live display card and virtual-key row are full width; virtual keys are at least 44px tall tap targets; the history list scrolls; no physical keyboard is assumed — the virtual keys and a "tap to test" hint are the primary path on touch devices.

## Acceptance criteria

1. A user can press any key and immediately see its `code`, `key`, `keyCode`, modifiers, and location in the live display.
2. A user can see which modifier keys are held via the chips, and can read a plain-English description of the last event.
3. A user can tap a virtual key button on a touch device and see the same display and history update as a physical keypress.
4. A user can copy the last event's details as JSON and clear the history log.
5. The page works with no external JavaScript, contains exactly one `h1`, has the required SEO tags (title, description, canonical, JSON-LD), and contains no email addresses, `mailto:` links, or secrets.
