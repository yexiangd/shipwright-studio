# Guitar Tuner — Build Spec

- **Slug:** `guitar-tuner`
- **Title:** Guitar Tuner
- **URL:** `/lab/guitar-tuner/`
- **Seed tagline:** "Tune by mic with a needle that tells the truth."

## Concept

Guitar Tuner is a free online chromatic tuner that listens through the microphone and shows, with a needle gauge, exactly how sharp or flat each string is. Pick a string (E2–E4 standard tuning) or let it auto-detect the nearest note; the needle, cents readout, and colour tell the player when they are in tune. It is for guitarists who need a quick, honest tune-up with no app install — and it works for any instrument, since the chromatic mode shows any detected note.

## Feature list (MVP, in priority order)

1. **Mic listening** — `getUserMedia` + `AnalyserNode`; YIN pitch detection (difference function + CMNDF) on a 2048-sample buffer; "Start listening" button (mic permission is user-gated); clear "Microphone unavailable" state if denied or absent.
2. **Needle gauge** — semicircular dial, needle swings −50…+50 cents; green zone within ±5 cents; note name + octave in the centre; live cents readout.
3. **String selector** — six standard-tuning strings (E2, A2, D3, G3, B3, E4) as buttons; selecting one targets that note; auto mode detects the nearest note.
4. **In-tune indicator** — when |cents| ≤ 5 for ~0.5s, the note flashes green and a "In tune" badge appears; a small history of the last tuned string is kept in the session.
5. **Frequency readout** — detected Hz and target Hz for the selected string.
6. **Chromatic mode toggle** — shows any detected note (not just the six strings).
7. **Reference tone** — click a string to play its target pitch via WebAudio oscillator (so the player can tune by ear too); stop button.
8. **Sensitivity / noise gate** — a "signal strength" meter; below the threshold the needle freezes with a "Play louder / move closer" hint.

Out of scope: alternate tunings (drop D etc. — standard only for v1), strobe display, recording, metronome.

## Design

- Page structure top to bottom: nav (`← Lab` / `Shipwright Studio`), eyebrow "Lab · App", `h1` "Guitar Tuner", definition paragraph ("Guitar Tuner is a free online tool that ..."), mic status card with Start/Stop, needle gauge (SVG or canvas), note + cents readout, string buttons row, chromatic toggle, frequency readout, reference-tone buttons, signal meter, footer ("Built by Shipwright Studio" + link back to `/ideas/`).
- Visual treatment: studio dark aesthetic (`#0a0c0f`, Fraunces headings, brass `#d2a24c`); needle in brass, in-tune zone green `#5cb85c`, sharp/flat zones muted red/blue.
- States: empty — before mic starts, gauge shows "Tap Start listening"; active — needle moves live; success — in-tune flash + badge; error — mic denied / no mic / insecure context shows a friendly message and the reference-tone fallback still works.
- Mobile: gauge scales to width; string buttons wrap; large tap targets (≥44px).

## Acceptance criteria

1. With the mic on, a played note moves the needle and shows the correct nearest note name and cents offset (verified in node tests with synthetic sine buffers).
2. Selecting a string targets its exact frequency (E2 82.41 Hz, A2 110.00 Hz, D3 146.83 Hz, G3 196.00 Hz, B3 246.94 Hz, E4 329.63 Hz).
3. The cents calculation is correct: `cents = 1200 × log2(f / f_target)`; ±5 cents is the in-tune band.
4. Reference tones play the correct frequency for each string and stop cleanly.
5. The page has exactly one `h1`, a unique title/description, canonical link, definition paragraph, and `WebApplication` JSON-LD; no external JS dependencies; no email addresses or secrets.

## Implementation notes

- Pitch detection: YIN difference function on the time-domain buffer (2048 samples @ 48kHz), with cumulative-mean-normalised difference (CMNDF); take the first dip below 0.15, then the local minimum, with parabolic interpolation for sub-sample accuracy; reject if RMS below noise threshold or no dip crosses the threshold. (Do NOT use plain autocorrelation for this: its finite-window boundary term shifts the correlation peak by up to ~6 samples on the low strings — measured −16.6 cents on E2 at 82.41 Hz, −3.1 cents at 220 Hz — which breaks the ±1 cent node check. YIN's difference function is exactly zero at the true period regardless of window edges, and measures ≤0.08 cents on synthetic sines and ≤0.02 cents on harmonic-rich signals.)
- Note math: `midi = 69 + 12 × log2(f / 440)`; note names `['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']`; cents offset from nearest equal-tempered note.
- Node-check the pure functions (extract them so they can run under node): `freqToNote` (440 → A4, 0 cents; 466.16 → A#4; 82.41 → E2), `centsOff` (441 vs 440 → +3.93 cents; 220 vs 220 → 0), YIN pitch detection on synthetic sine buffers at 110 Hz / 220 Hz / 329.63 Hz within ±1 cent, string table frequencies.
- `getUserMedia` only runs on user gesture; page must be fully usable (reference tones) even when the mic is denied.
