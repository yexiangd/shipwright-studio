# Pocket Piano — build spec

## Concept

Pocket Piano is a playable piano that lives entirely in the browser: two full
octaves of keys rendered on one page, sounded with WebAudio oscillator
synthesis, with nothing to download, install, or upload. It is for anyone who
wants a quick musical sketchpad — a songwriter humming a melody, a student
checking a note, or a curious visitor killing two minutes. The delight is in
the immediacy: press a key, hear a note, with a sustain switch that turns
short plinks into ringing chords.

## Feature list (MVP, in priority order)

1. **Two-octave keyboard (C4–B5 by default)** — 14 white keys and 10 black
   keys, rendered as a single piano strip; every key shows its note name.
   White keys are labelled; black keys are labelled on larger screens.
2. **Mouse and touch playing** — pointer down sounds a note, pointer up (or
   pointer leaving the key) releases it; multi-touch / multi-pointer chords
   work because each pointer is tracked independently.
3. **Computer-keyboard playing** — the home row and the row above it map to
   a chromatic run starting at the current base note: A=C, W=C#, S=D, E=D#,
   D=E, F=F, T=F#, G=G, Y=G#, H=A, U=A#, J=B, K=C (+1 octave), O=C#,
   L=D, P=D#, ;=E (+1 octave). Held keys do not retrigger on auto-repeat.
4. **WebAudio oscillator synthesis, no audio files** — each note is an
   oscillator plus a gain envelope (fast attack, hold while pressed, release
   on lift). The AudioContext is created and resumed only on the first user
   gesture, per browser autoplay policy.
5. **Sustain toggle** — Off: short release (0.15 s), notes stop promptly on
   lift. On: long release (1.5 s), notes ring out after lift, so chords
   overlap. The toggle state is visible and labelled.
6. **Octave shift** — shifts the whole displayed two-octave strip and the
   keyboard mapping together. Base octaves 3, 4 (default), and 5, i.e.
   strips C3–B4, C4–B5, and C5–B6. Buttons and the current range label show
   the active range.
7. **Voices and volume** — four waveforms (sine, triangle, square,
   sawtooth) selectable as buttons, plus a volume slider (0–100, default 70).
   Changing voice or volume affects notes started after the change.
8. **Last-notes readout and demo tune** — a readout shows the last 12 notes
   played, most recent last, as labelled chips. A "Play demo tune" button
   plays a short built-in melody (the opening of "Ode to Joy", white keys
   only, in the current base octave); a Stop button ends it early. While the
   demo plays, its button shows the playing state.

Out of scope for this version: recording, playback export, or saving;
MIDI input or output; sampled instruments; a sustain pedal beyond the
on/off toggle; sheet music or chord charts; more than one demo tune;
account, sharing, or server features of any kind.

## Design

Page structure, top to bottom:

- **Nav** — "Shipwright Studio" linking to `/`, "Idea Lab" linking to
  `/ideas/` (never to `/lab/`, which has no index).
- **Eyebrow** — "Lab · Music".
- **h1** — "Pocket Piano" (exactly one `h1` on the page).
- **Quotable definition paragraph** — one paragraph near the top beginning
  "Pocket Piano is a free online tool that …" so answer engines can cite it.
- **Piano card** — the two-octave keyboard strip, with the current range
  label (e.g. "C4 – B5") and a sustain indicator above it.
- **Controls card** — sustain toggle button, octave shift buttons
  (Down / Up) with the range label, waveform buttons (Sine, Triangle,
  Square, Sawtooth), volume slider, demo Play/Stop buttons, and a "Clear
  notes" button for the readout.
- **Last-notes card** — the readout chips; empty state text until the first
  note is played.
- **How to play** — a collapsed `<details>` block with the keyboard map,
  sustain explanation, and octave-shift note.
- **Footer** — "Built by Shipwright Studio" with a backlink to `/ideas/`
  ("more experiments").

Interactions and states:

- **Empty** — before any note: readout shows "Play a key — your recent
  notes will appear here."; no key highlighted; demo button idle.
- **Active** — a sounding key is visually pressed (brass highlight, slight
  inset); the note name is appended to the readout; the sustain indicator
  shows On/Off.
- **Success** — demo tune completes: button returns to idle and the played
  notes remain in the readout.
- **Error / unavailable** — if WebAudio is unavailable, a notice replaces
  the keyboard area text explaining audio is not supported in this browser;
  the page otherwise still renders. If the AudioContext is suspended, the
  first pointer or key gesture resumes it; no sound is attempted before a
  gesture.

Visual treatment: dark premium background `#0a0c0f`, panel `#101318`,
Fraunces serif headings, brass accent `#d2a24c`, generous whitespace,
matching the studio house style (as in `lab/pong/index.html`).

Mobile considerations: keys are sized with flexible widths so the strip fits
small screens without horizontal scrolling; black keys overlay white keys
with percentage positioning; touch uses pointer events with
`touch-action: none` on the keyboard so scrolling does not steal notes;
controls wrap; note labels on black keys hide below 720 px.

## Acceptance criteria

1. A user can play every note from C4 to B5 (default range) with mouse or
   touch, and can play a chromatic run from the computer keyboard without
   auto-repeat retriggering.
2. With sustain off, a lifted note stops within about 0.15 s; with sustain
   on, it rings for about 1.5 s — the release times are the constants in the
   shipped code.
3. A user can shift the octave down to C3–B4 and up to C5–B6, and the
   displayed range label, key labels, and keyboard mapping all move together.
4. A user can switch between sine, triangle, square, and sawtooth voices,
   adjust volume, hear the built-in demo tune, stop it early, and see the
   last 12 notes played in the readout.
5. The page has exactly one `h1`, a unique title and one-sentence meta
   description, a canonical link, a `WebApplication` JSON-LD block, no
   external JS dependencies, no email address, and no secret of any kind.
