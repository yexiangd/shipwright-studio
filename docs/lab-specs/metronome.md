# Metronome — build spec

Tagline seed: "From largo to prestissimo, with visual pulse"

## Concept

Metronome is a free, dependency-free practice metronome that runs entirely in the browser. It is for musicians, students, and anyone practising rhythm who wants a precise, drift-free click plus a large visual pulse they can follow at a glance. The click is generated live with the Web Audio API (no audio files, nothing to download), and every beat is shown as a pulsing disc and a row of beat dots so it stays useful with the sound muted.

## Feature list (MVP, in priority order)

1. **BPM control (30–240, clamped)** — a slider and a numeric input kept in sync; out-of-range values are clamped to 30–240 on change, and the current BPM is shown large.
2. **Start / stop with lookahead scheduling** — a start/stop button plus the Space key; timing uses a 25 ms `setInterval` lookahead scheduler against `AudioContext.currentTime` with a 0.1 s schedule-ahead window, so the click does not drift.
3. **WebAudio click with accented downbeat** — each beat is a short oscillator click; the downbeat (beat 1 of each bar) uses a distinct, higher accent tone, other beats a lower tone. A mute toggle silences the audio while the visual pulse keeps running.
4. **Time signatures 2/4, 3/4, 4/4, 6/8** — selectable buttons; BPM counts numerator beats per bar (so 6/8 ticks six beats per bar), the downbeat is accented, and the beat-dot row shows one dot per beat in the bar.
5. **Large visual pulse + beat dots** — a large disc pulses on every beat (stronger on the accent), the current beat dot lights up, and a status line shows running/stopped state, BPM, and time signature.
6. **Tap tempo** — a Tap button; the BPM is set from the median interval of the recent taps (taps more than 2 seconds apart reset the tap sequence), then clamped to 30–240.
7. **BPM presets** — one-tap buttons: Largo 60, Andante 80, Moderato 110, Allegro 140, Presto 180.
8. **Audio-gesture note** — a short note states that sound starts only after a user gesture (start button or Space key), because browsers block audio autoplay.

Out of scope for this version: subdivisions (eighth/triplet clicks), swing, setlists / saved tempos, a visual pendulum animation, sound choices beyond the two click tones, and any server, account, or audio-file feature.

## Design

Page structure, top to bottom:

1. Nav — links to `/` and `/ideas/` only (never `/lab/`).
2. Eyebrow ("Lab · Music tools"), exactly one `h1` ("Metronome"), and a quotable definition paragraph near the top ("Metronome is a free online tool that …").
3. Pulse card — the large pulse disc, the beat-dot row, the beat counter ("Beat 1 of 4"), and the status line (stopped / playing, BPM, time signature, muted state).
4. Controls card — BPM display, slider + numeric input, preset buttons, time-signature buttons, Tap Tempo button, start/stop button, and mute toggle.
5. How-it-works card — a short explanation of tap tempo, the lookahead scheduler, and the audio-gesture requirement.

Interactions and states:

- Stopped: disc at rest (dim, no pulse), all beat dots dim, status reads "Stopped", start button reads "Start".
- Running: disc pulses on every beat (accent pulse larger/brighter), the current beat dot is lit, status reads "Playing · {BPM} BPM · {time signature}", start button reads "Stop".
- Muted while running: audio is skipped but the visual pulse, dots, and status continue; the mute button shows the muted state and the status line notes "Muted".
- BPM change while running: takes effect from the next scheduled beat (the scheduler reads the current BPM when advancing).
- Tap tempo: each tap flashes the Tap button; once at least two taps exist, the BPM updates from the median tap interval. A gap over 2 seconds resets the sequence.
- Space key: toggles start/stop, except when focus is in an input, textarea, or button (so typing a BPM or activating a button is not hijacked).
- Invalid BPM input: clamped to 30–240 with a short hint line; empty input restores the last valid BPM on blur/change.

Visual treatment: dark premium background `#0a0c0f`, panel `#101318`, Fraunces serif headings, brass accent `#d2a24c` for the pulse, active dots, active preset/signature buttons, and the start button; generous whitespace, a maximum content width matching other lab pages, and UI controls in a clean sans-serif.

Mobile considerations: the pulse disc and controls stack in a single column, tap targets are at least ~44 px, the slider spans the full card width, and preset/signature buttons wrap.

## Acceptance criteria

1. A user can set any BPM from 30 to 240 via the slider, the numeric input, a preset, or tap tempo, and the value is clamped to that range.
2. A user can start and stop the metronome with the button or the Space key, and while running the disc pulses and the beat dots advance in time with the accented downbeat.
3. The page offers 2/4, 3/4, 4/4, and 6/8; in each, beat 1 is accented and the dot row shows the correct number of beats per bar.
4. The mute toggle silences the click while the visual pulse keeps running, and audio only begins after a user gesture.
5. The page is self-contained (inline CSS/JS, no external JS, no audio files), has exactly one `h1`, a unique title and description, a canonical URL, and a `WebApplication` JSON-LD block.
