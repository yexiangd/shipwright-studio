# Shipwright Studio

Freelance engineering studio site — static HTML/CSS/JS, zero build step.

## Deploy (Cloudflare Pages)

1. Cloudflare dashboard → Workers & Pages → connect this repo.
2. Framework preset: **None**. Build command: *(empty)*. Build output directory: `/`.
3. Deploy. Every push to `main` redeploys; each deploy gets a preview URL.

## Local preview

Open `index.html` in a browser, or: `python3 -m http.server` in this folder.
