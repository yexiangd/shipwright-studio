# OG Preview — Build Spec

## Concept

OG Preview is a free online tool that shows how a link will look when shared on X (Twitter), Slack, and iMessage — before it is posted anywhere. The user types a URL, title, and description, picks an image (upload, preset gradient, or placeholder), and instantly sees faithful recreations of each platform's link card side by side.

It is for anyone who publishes links — developers shipping a launch page, marketers writing a campaign, bloggers sharing a post — who wants to catch a truncated title or a missing image before the link goes live. Nothing is fetched and nothing leaves the page: no real URL is ever requested, so previews are built only from the values typed in.

## Feature list (MVP, in priority order)

1. **Editable card fields** — URL, title, description, and site name inputs; every keystroke re-renders all three previews live.
2. **Image picker** — upload a local image (read with `FileReader`, never uploaded), or choose one of four preset gradients (Brass, Ocean, Forest, Sunset) or a neutral placeholder; the chosen image appears in every preview.
3. **Faithful platform previews** — X large summary card (image on top, title + description + domain below), Slack unfurl (brass/grey left border, bold site name, title link, description, image), iMessage rich link (image left, title + domain right, iOS-style bubble styling). A platform tab bar switches between a single-platform focus view and a side-by-side "All" view.
4. **Character-count guidance** — live counts under the title and description fields, with per-platform truncation limits (X: title ~70 chars, description ~200; Slack: title ~300, description ~300; iMessage: title ~2 lines / ~90 chars) and a warning state when a value exceeds a platform's limit; previews themselves truncate exactly as the platform would (ellipsis at the limit).
5. **Copy meta-tag snippet** — one-click copy of a ready-to-paste `<head>` snippet with all required `og:` and `twitter:` tags generated from the current fields, with a "Copied ✓" confirmation state and a visible `<pre>` fallback if clipboard access fails.
6. **Preset examples** — three one-click presets: a Shipwright Studio page, a blog post, and a product page; each fills all fields and the image with sensible values.
7. **Validation warnings** — inline warnings for: invalid URL (must start with `http://` or `https://`), missing image (previews fall back to a text-only card and say so), title longer than the strictest platform limit, empty title or description.
8. **No-fetch note** — a short line stating previews are rendered from the entered values only; no URL is ever fetched, so real-world cards may differ slightly.

Out of scope for this version: fetching real URLs to read their actual meta tags (would need a server/proxy and leaks the URL), `og:image` dimension checking beyond a display hint, platform-specific image-size validation, saving/sharing presets, and any persistence (localStorage) of inputs.

## Design

Page structure, top to bottom:

1. **Header** — studio masthead (small "Shipwright Studio" wordmark linking to `/`), then `h1` "OG Preview".
2. **Summary paragraph** — one quotable definition sentence ("OG Preview is a free online tool that …").
3. **No-fetch note** — one line: "Previews are rendered from the values you type — this page never fetches the URL, so real cards may differ slightly."
4. **Editor panel** — labelled fields: URL (with validation state), Title (with live count + limit hint), Description (with live count + limit hint), Site name (optional, defaults to the URL's hostname). Below the fields: image picker — upload button + four gradient swatches + placeholder option; a thumbnail shows the current image. A "Presets" row with three buttons (Shipwright Studio page / Blog post / Product page).
5. **Warnings strip** — appears only when a validation issue exists; lists each warning with a ⚠ marker.
6. **View tabs** — "All platforms" | "X" | "Slack" | "iMessage"; tabs switch which previews are shown.
7. **Previews** — in "All" view, three labelled cards stacked (side by side on wide screens):
   - **X card**: dark card, 16:9 image on top, below it a bold title (max 2 lines, ~70 chars), a muted description (max ~200 chars), and the domain in muted text with a small link icon.
   - **Slack card**: light-on-dark unfurl with a 4px left border, bold site name, blue-ish title link, description, and a thumbnail image on the right (large-image variant shown when an image is set).
   - **iMessage card**: iOS-style grey bubble, image on the left (square-ish), title + domain on the right, truncated at ~2 lines.
   Each preview has a small platform label above it. Empty state (no title/URL yet): previews show placeholder text ("Your title here", "example.com") in muted style rather than blank space.
8. **Meta snippet panel** — a `<pre>` block with the generated `og:` / `twitter:` tags, a "Copy meta tags" button, and a note that the snippet is generated from the current fields.
9. **Footer** — "Built by Shipwright Studio" linking back to `/ideas/`.

Key interactions and states:

- **Empty**: fields start pre-filled with the Shipwright Studio preset (so previews are never blank on first load); clearing a field reverts that preview area to its placeholder text.
- **Typing**: every input event re-renders previews, counts, warnings, and the snippet — no save/submit step.
- **Over limit**: the count turns brass/red and a warning appears; the preview truncates with "…" exactly at the platform limit so the user sees what readers will see.
- **Invalid URL**: the URL field gets a red-ish outline and a warning "Enter a full URL starting with https://"; previews show the raw text as the domain fallback.
- **Missing image**: previews switch to their text-only variant (X card without image, Slack without thumbnail, iMessage without image) and a warning notes "No image set — cards will render text-only".
- **Image upload**: file input accepts images only; on load the image is rendered as a data URL in all previews. Upload failure (non-image file) shows "That file doesn't look like an image — try a PNG or JPG."
- **Preset click**: fills all fields and the image, re-renders everything, and briefly highlights the editor panel.
- **Copy success**: button label changes to "Copied ✓" for 2 seconds; clipboard failure reveals the snippet text selected in the `<pre>` and a note "Copy failed — select the text manually."
- **Tabs**: switching tabs shows only the chosen platform's preview (or all three); the active tab is brass-underlined.

Visual treatment: dark premium background `#0a0c0f`, Fraunces serif headings, brass accent `#d2a24c`, generous whitespace, hairline borders (`#1e242c`), muted secondary text (`#9aa3ad`). Editor fields are dark inputs with hairline borders that brighten on focus. Platform previews keep each platform's own look (X dark card, Slack unfurl with left border, iMessage grey bubble) but framed inside the studio's dark card chrome so the page stays coherent. Buttons are dark with brass outline; the primary action (Copy meta tags) is brass-filled with dark text.

Mobile considerations: layout stacks vertically; the editor is full width above the previews; previews are full width and never overflow horizontally (images scale, text wraps); tabs are large tap targets (≥44px); the snippet `<pre>` scrolls horizontally; gradient swatches are ≥44px.

## Acceptance criteria

1. A user can type a URL, title, and description and immediately see the X, Slack, and iMessage card previews update live, each styled to its platform's layout.
2. A user can upload an image or pick a preset gradient/placeholder and see it appear in all three previews; removing the image switches previews to their text-only variant with a warning.
3. A user can see live character counts against each platform's truncation limits, and previews truncate over-long titles/descriptions with an ellipsis exactly as the platform would.
4. A user can copy a generated `og:` / `twitter:` meta-tag snippet containing all required tags, and can load any of the three preset examples with one click.
5. The page works with no external JavaScript, contains exactly one `h1`, has the required SEO tags (title, description, canonical, JSON-LD), and contains no email addresses, `mailto:` links, or secrets; no network request is ever made to a user-entered URL.
