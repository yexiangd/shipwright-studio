# Lab Spec — JWT Decoder

Slug: `jwt-decoder` · Category: devtool · Effort: S

## Concept

JWT Decoder is a free online tool that decodes JSON Web Tokens entirely in the browser — no
token ever leaves the page, no server is involved. Paste a token (or load a sample) and the
tool splits it into header, payload, and signature segments, pretty-prints the JSON of the
first two, decodes the signature as base64url hex/base64, and checks the standard time
claims (`exp`, `iat`, `nbf`) against the current clock, flagging expired tokens and "not
yet valid" tokens. It is built for developers debugging auth flows who need a quick,
privacy-safe token inspector.

## Feature list (MVP, priority order)

1. Paste input: large textarea accepting a full `xxxxx.yyyyy.zzzzz` token (also tolerates
   pasting with `Bearer ` prefix and surrounding whitespace/newlines). (P0)
2. Decodes header + payload with base64url, pretty-prints JSON with syntax highlighting
   (keys brass, strings teal, numbers/booleans muted). (P0)
3. Signature panel: shows raw segment, decoded length in bytes, and algorithm from header
   (`alg`, with a note that signature *validity* is not verified — decoding ≠ verifying). (P0)
4. Time-claim checks: `exp` → "Expired" / "Expires in X" / "Valid"; `nbf` → "Not yet valid";
   `iat` shown as human time; all times rendered in the viewer's local timezone plus UTC. (P0)
5. Per-segment breakdown view showing the three base64url segments side by side with byte
   lengths. (P1)
6. "Load sample token" button (a well-known jwt.io-style demo token with `exp` in the
   future... or honestly an expired demo token — spec prefers a *valid-until-2030* demo token
   crafted in the builder for stable UX) and "Clear" button. (P1)
7. Copy buttons for header JSON, payload JSON, and the full token. (P2)

OUT OF SCOPE: signature verification (needs the secret/key), JWK fetching, encrypted JWT
(JWE) support, any network call, token storage/history.

## Design

- Structure top to bottom: studio header (link back to the /ideas/ lab listing), h1 "JWT Decoder",
  quotable definition paragraph, input card (textarea + sample/clear buttons), status banner
  (valid / expired / invalid token) that appears after parsing, three-column segment panels
  (Header / Payload / Signature) collapsing to stacked on mobile, time-claims summary card,
  "What this tool does NOT do" honesty note (no signature verification), footer disclaimer.
- Key interactions/states: empty state shows helper text and the sample button; active
  state parses live on input (debounced ~300ms); invalid input shows a red banner with the
  reason ("not three segments", "header is not valid base64url JSON", etc.); success shows
  a green/amber status banner summarising exp state.
- Visual treatment: studio dark `#0a0c0f`, Fraunces serif headings, brass `#d2a24c` accents
  for JSON keys and status banner borders, monospace for token segments, generous
  whitespace, cards with subtle 1px `#1c2128` borders.
- Mobile: single column, textarea ≥ 5 rows, segment panels stack, copy buttons full width.

## Acceptance criteria

1. A user can paste a JWT and see header, payload, and signature decoded and displayed
   with syntax highlighting.
2. An expired token (exp in the past) shows an "Expired" banner; a token expiring in the
   future shows remaining time; `nbf` in the future shows "Not yet valid".
3. Malformed input (wrong segment count, invalid base64url, non-JSON payload) shows a
   specific, accurate error message rather than a crash or silent blank.
4. Nothing leaves the browser: no fetch/XHR calls anywhere in the page (verify by grep).
5. The page ships the required SEO block: unique title, meta description, canonical URL,
   `WebApplication` JSON-LD, exactly one `h1`, one quotable definition paragraph; all JS
   passes a node sanity run of the decoder core before deploy.
