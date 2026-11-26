# BMI Check — build spec

## Concept
BMI Check is a free online body-mass-index calculator that gives you your number and, more importantly, honest context for it: your WHO category, a visual gauge showing where you sit on the scale, and the healthy weight range for your height. It is for anyone who wants a quick, judgment-free read on their BMI — no account, no tracking, no data leaving the page. It is delightful because it treats the number as information, not a verdict: the copy is plain and kind, the limits of BMI are stated up front, and the result is never a lecture.

## Feature list (priority order)
1. Instant BMI calculation: typing a height and a weight computes the result immediately (on every input event), with no submit button.
2. Metric + imperial inputs: metric mode takes height in cm and weight in kg; imperial mode takes height in ft + in and weight in lb. A unit toggle switches modes and converts the entered values so nothing is lost.
3. WHO category: Underweight (<18.5), Healthy (18.5–24.9), Overweight (25–29.9), Obese (≥30), with the exact boundaries 18.5 / 25 / 30 and one-decimal BMI display.
4. Visual gauge: a horizontal bar split into the four category segments, with a brass marker positioned at the result's BMI (clamped to the 14–40 display range), so the user can see where they sit at a glance.
5. Healthy weight range for the given height: the kg (or lb) range that yields BMI 18.5–24.9, shown alongside the result.
6. "What the number means" explainer: per-category copy in plain language plus a "What BMI can't tell you" note — muscle mass, age, fat distribution, and the reminder that this is not medical advice and is no substitute for a clinician.
7. Unit toggle: Metric / Imperial segmented control at the top of the calculator card; switching converts the current values and keeps the calculation live.
8. Empty state: before any input, the result area says "Enter your height and weight to see your BMI." and the gauge marker is hidden; invalid/partial input (e.g. height with no weight, zero or negative values, height above 300 cm) shows a short, kind hint instead of a result.

Out of scope: accounts, saving history, body-fat or waist measurements, calorie or diet advice, medical diagnosis or recommendations, sharing/exporting results, charts of BMI over time.

## Design
Top to bottom: nav (Shipwright Studio / Lab) → eyebrow "Lab — App" → h1 "BMI Check" → quotable definition paragraph → privacy notice ("Everything is calculated in your browser. No data leaves this page — no account, no tracking.") → calculator card (unit toggle, height + weight inputs, live result: big BMI number, category chip, gauge, healthy weight range) → "What the number means" explainer card (four category rows with ranges, plus the BMI-limits note) → footer "Built by Shipwright Studio" + link back to /ideas/.
States: empty (no inputs yet — result area shows the prompt, gauge marker hidden), active (both fields valid — result, category, gauge marker and healthy range update live on every keystroke), error (missing or out-of-range input — a short hint replaces the result; e.g. "Enter a height between 100 and 250 cm."), success (same as active — a valid result is the success state; category chip colour is a muted brass/green/amber/red tint, never a scolding tone).
Visual treatment: dark #0a0c0f, Fraunces headings, brass #d2a24c accents, generous whitespace; the gauge is a segmented bar in four muted tones with a brass marker and tick labels (15 / 18.5 / 25 / 30 / 40); inputs are large, dark, borderless-looking with a brass focus ring; mobile: inputs stack full-width, unit toggle stays visible, gauge labels shrink and the marker stays readable.

## Acceptance criteria
- A user can enter height and weight in metric or imperial and see the BMI (one decimal), the WHO category, the gauge marker, and the healthy weight range update instantly.
- Switching units converts the entered values (e.g. 178 cm / 80 kg becomes 5 ft 10.1 in / 176.4 lb) and keeps the BMI result unchanged within rounding.
- The category boundaries are exact: BMI 18.4 → Underweight, 18.5 → Healthy, 24.9 → Healthy, 25.0 → Overweight, 29.9 → Overweight, 30.0 → Obese (verified by node test).
- Known vectors check out: 178 cm / 80 kg → BMI ≈ 25.2, Overweight; 175 cm / 70 kg → BMI ≈ 22.9, Healthy (verified by node test).
- The page has exactly one h1, unique title/description, canonical link, WebApplication JSON-LD, no external JS, no email addresses, and works on mobile width.
