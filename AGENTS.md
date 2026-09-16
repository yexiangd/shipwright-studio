# AGENTS.md — shipwright-studio

> This repo is **public by design** (build in public). Treat everything you
> write here as visible to the world. The first half of this file is the
> owner's standing policy — copy it into any repo you work in.

## Security & privacy (hard rules, apply everywhere)

1. **NEVER commit secrets**: API keys, tokens, passwords, credentials of any
   kind — not in code, configs, workflows, logs, data files, or git history.
2. Secrets live in **GitHub Secrets** (or the deploy platform's env vars) and
   are injected at runtime. Code references placeholders only
   (e.g. `__WEB3FORMS_KEY__`).
3. **NEVER commit personal data**: real names, addresses, family details,
   financial info, or anything identifying the owner.
4. If a secret is ever committed by accident: **revoke/rotate it first**,
   then purge it from git history, then tell the owner what happened.

## Site conventions (this repo)

- Brand is **Shipwright Studio**. Never mention the owner's employer anywhere
  on the site. The GitHub profile (`yexiangd/yexiangd`) keeps its separate
  GPU-communication professional identity — don't mix the two.
- Aesthetic: short, concise, high-end. No template-y gimmicks (no typewriter
  effects). Tasteful motion (waves, 3D) is fine.
- Tech: no external JS dependencies. Dark `#0a0c0f`, Fraunces headings,
  brass `#d2a24c` accents. Must work on desktop and mobile.
- Contact is form-only: no public email address, no `mailto:` anywhere.
  The form submits via Web3Forms directly from the browser; the repo keeps
  only the `__WEB3FORMS_KEY__` placeholder — the real key is injected at
  deploy time from the Cloudflare environment.
- `docs/` holds specs and plans: never ship it to production (strip before
  deploy). `ideas/ideas.json` is the idea bank.
- Every page: canonical URL, unique title/description, exactly one `h1`,
  JSON-LD, `alt` on images.
- Deploys go through the Direct Upload flow; after every deploy verify the
  real URLs return HTTP 200. A successful task is not proof of delivery.
