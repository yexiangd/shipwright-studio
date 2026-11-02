# White Noise — build spec

## Concept
White Noise is a free online ambient-sound mixer for focus, sleep, and masking
background noise. It generates every sound live in the browser with the Web
Audio API — no audio files, no downloads, nothing leaves the page — so it
starts instantly and works offline once loaded. It is for anyone who needs a
steady sound backdrop: deep-work sessions, naps, babies' rooms, or noisy
open-plan offices.

## Feature list (priority order)
1. Five generated sounds, each independently toggleable: White, Pink, Brown,
   Rain, and Ocean. White/pink/brown are filtered noise buffers; Rain is
   noise through a band-pass with a slow random patter; Ocean is noise through
   a low-pass whose gain breathes on a slow sine LFO.
2. Per-sound volume slider (0–100) that works while the sound is playing.
3. One master Play/Pause control plus a master volume slider; Space toggles
   play/pause when focus is not in a text field.
4. Sleep timer: Off / 15 / 30 / 60 minutes — counts down visibly and fades
   the master gain out over the last 10 seconds, then stops all sounds.
5. Live level meter: a small canvas bar visualiser driven by an AnalyserNode
   on the master bus, so the page visibly responds to sound.
6. Preset buttons: Focus (pink + brown, low), Sleep (brown + rain), Storm
   (rain + ocean).
7. "How it works" explainer: one short paragraph per sound type, in plain
   language (why pink sounds softer than white, what brown noise is).
8. Footer credit: "Built by Shipwright Studio" + link back to /ideas/.

Out of scope for this version: mixing saved as shareable links, downloading
audio files, a Pomodoro-style session timer, mobile background playback
guarantees (browsers suspend audio when the tab is backgrounded — noted in
the FAQ line, not worked around).

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — App" → h1
"White Noise" → quotable definition paragraph → master control card (big
Play/Pause button, master volume slider, timer buttons, countdown readout) →
sound grid (5 cards, each with a name, one-line description, toggle button,
and volume slider) → visualiser card (canvas bars) → presets row → "How it
works" explainer card → footer.
States: idle (no sound active, Play disabled until a sound is on), playing
(active cards highlighted in brass, meter animating), timer running
(countdown shown, timer button highlighted), timer finished (fade-out, all
stops, "Timer finished" note). Error state: if Web Audio is unavailable, show
a plain message instead of the controls.
Visual treatment: studio dark `#0a0c0f`, Fraunces headings, brass `#d2a24c`
accents, generous whitespace; sound cards in a responsive grid (3 columns
desktop, 1 column mobile). Buttons are large touch targets on mobile.

## Acceptance criteria
1. A user can turn on any combination of the five sounds, adjust each
   volume, and hear the mix change without restarting playback.
2. A user can set a 15-minute timer and see the countdown; when it ends, all
   sound stops (verified by the fade-out logic, not by waiting 15 minutes).
3. The page works with no external JS dependencies; all audio is generated
   locally (grep for fetch/XMLHttpRequest returns nothing).
4. The page has exactly one h1, a unique title/description, canonical link,
   WebApplication JSON-LD, and a link back to /ideas/.
5. Noise-generation code passes a node check: pink/brown buffers are finite
   and non-clipping, and brown noise is smoother than white noise
   (lag-1 autocorrelation higher).
