# Drum Pad — build spec

## Concept
Drum Pad is a free online finger-drumming machine that runs entirely in the
browser. It is for anyone who wants to tap out a beat in seconds — no
downloads, no sign-up, no samples to load: every sound is synthesized live
with WebAudio. Three kits, a 16-step loop sequencer and keyboard play make it
both a toy for a first beat and a sketchpad for a groove idea.

## Feature list (priority order)
1. Nine playable pads (Kick, Snare, Clap, Closed Hat, Open Hat, Tom, Rim,
   Crash, Shaker), each synthesized with WebAudio oscillators / filtered
   noise — no audio files, no network.
2. Three kits (Boom Bap, Electronic, Lo-Fi) that retune the same nine pads
   (different pitch, decay, filter and noise character).
3. 16-step sequencer: toggle steps per pad row, loop playback, current-step
   highlight, per-row mute.
4. Transport: play/stop, BPM slider 60–180 with tap-tempo button.
5. Keyboard play: keys A S D F G H J K L trigger pads 1–9; space toggles
   playback. Visual pad flash on trigger (mouse, touch or key).
6. Master volume slider and a "Clear pattern" button.
7. Last-played readout: name of the pad just hit, plus beat position while
   the sequencer runs.

Out of scope: recording/exporting audio, saving patterns to a server,
sample upload, MIDI input, swing control (v2 candidate).

## Design
Top to bottom: eyebrow + h1 + quotable definition paragraph; kit selector and
transport card (play/stop, BPM, tap, volume); pad grid (3×3, large touch
targets, active flash state); sequencer card (9 rows × 16 steps, row labels,
mute toggles, clear button); "How it works" explainer (how each sound is
synthesized, keyboard map); footer with Built by Shipwright Studio + link to
/ideas/. Visual treatment: dark premium `#0a0c0f`, Fraunces headings, brass
`#d2a24c` accents, generous whitespace. Mobile: pads stay thumb-sized, the
sequencer scrolls horizontally, no layout shift when steps light up.
States: idle (pads at rest), playing (step column highlighted, pad flashes),
muted row (dimmed), empty pattern (sequencer plays nothing but keeps time).

## Acceptance criteria
- A user can tap any pad (or press its key) and hear that drum sound
  immediately, with a visible flash.
- A user can switch kits and hear the same pad change character.
- A user can toggle steps, press play, and hear the pattern loop at the
  chosen BPM with the current step highlighted.
- The page works with mouse, touch and keyboard, and degrades gracefully if
  WebAudio is unavailable (a visible notice, pads still flash).
- SEO checklist: unique title/description, canonical, one h1, quotable
  definition paragraph, WebApplication JSON-LD, no external JS, no secrets.
