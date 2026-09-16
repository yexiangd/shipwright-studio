# Spec — Typing Speed Test (`typing-test`)

## Concept
Typing Speed Test is a free online WPM test. It shows a stream of common English words; you type them as fast and accurately as you can against the clock. Live WPM and accuracy keep the pressure on, and a results screen breaks down your performance. For anyone who types for a living — or wants to.

## Feature list (MVP, prioritized)
1. **Word stream**: ~200 common words, shuffled per run; current word highlighted, typed letters colored correct/incorrect as you go.
2. **Durations**: 15 / 30 / 60 / 120 seconds, selectable before start.
3. **Live stats**: WPM and accuracy update every keystroke; countdown timer prominent.
4. **Caret**: visible caret tracking the current letter; auto-scroll keeps the active line in view.
5. **Results screen**: WPM (big), accuracy, correct/incorrect character counts, words completed; tier label (e.g. <40 "Casual", <60 "Proficient", <80 "Swift", ≥80 "Blazing").
6. **Personal best WPM** per duration in `localStorage`.
7. **Restart** (`Tab`+`Enter` hint and button); clicking the word area refocuses the hidden input.
8. **Mobile**: hidden input summons the keyboard; test remains completable via touch keyboard.
9. Out of scope: custom text import, multiplayer race, per-finger heatmaps.

## Design
- **Layout**: centered column — header (title + duration pills), stats row (wpm / acc / time), word stream card, footer note.
- **Visuals**: JetBrains Mono for words; upcoming words dimmed, current word underlined in brass with a block caret; correct letters in text color, errors in red with subtle underline.
- **States**: ready ("click the text and start typing") → running → finished (results card replaces stream).
- **Mobile**: word stream font scales down; stats stay visible above the fold.

## Acceptance criteria
- [ ] WPM = (all typed characters ÷ 5) ÷ minutes elapsed; accuracy = correct chars ÷ typed chars.
- [ ] Timer ends the run automatically and shows the results screen.
- [ ] Wrong letters are visually marked without blocking progress; space advances to the next word.
- [ ] Restart resets words, timer, and stats cleanly.
- [ ] Best WPM per duration persists across reloads.
