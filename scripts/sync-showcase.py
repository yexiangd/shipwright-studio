#!/usr/bin/env python3
"""Sync showcase.json from GitHub repos tagged with the `showcase` topic.

Tag any public repo with the `showcase` topic and it will appear as a card
in the Shipwright Studio work section after the next sync + deploy.

Stdlib only. Uses GH_TOKEN env (falls back to unauthenticated, 60 req/hr).
Exit 0 and print "changed"/"unchanged".
"""
import json
import os
import urllib.request
import urllib.error

OWNER = "yexiangd"
TOPIC = "showcase"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "showcase.json")
SELF_REPO = "shipwright-studio"


def api(path):
    url = "https://api.github.com" + path
    req = urllib.request.Request(
        url, headers={"Accept": "application/vnd.github+json",
                      "User-Agent": "shipwright-showcase-sync"})
    token = os.environ.get("GH_TOKEN", "").strip()
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        print(f"GitHub API {path} -> HTTP {e.code}, treating as empty")
        return None


def prettify(name):
    return " ".join(w.capitalize() for w in name.replace("-", " ")
                    .replace("_", " ").split())


def main():
    data = api(f"/search/repositories?q=user:{OWNER}+topic:{TOPIC}"
               f"&per_page=100") or {}
    projects = []
    for r in data.get("items", []):
        if r.get("private") or r.get("archived") or r.get("fork"):
            continue
        if r.get("name") == SELF_REPO:
            continue
        demo = (r.get("homepage") or "").strip()
        topics = [t for t in (r.get("topics") or []) if t != TOPIC][:4]
        tags = ([r["language"]] if r.get("language") else []) + topics
        projects.append({
            "name": r["name"],
            "title": prettify(r["name"]),
            "description": r.get("description") or "",
            "url": demo or r["html_url"],
            "repo_url": r["html_url"],
            "tags": tags[:4],
            "stars": r.get("stargazers_count", 0),
            "pushed_at": r.get("pushed_at"),
        })
    projects.sort(key=lambda p: p.get("pushed_at") or "", reverse=True)

    try:
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
    except Exception:
        old = {}
    new_projects = projects
    if old.get("projects") == new_projects:
        print("unchanged")
        return

    payload = {"updated": None, "projects": new_projects}
    from datetime import datetime, timezone
    payload["updated"] = datetime.now(timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%SZ")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"changed ({len(new_projects)} projects)")


if __name__ == "__main__":
    main()
