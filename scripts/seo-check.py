#!/usr/bin/env python3
"""SEO hygiene checks for the static site. Stdlib only. Exit 1 on failure.

Checks per HTML page (docs/ and .github/ excluded):
  - non-empty <title>, meta description, canonical link
  - exactly one <h1>
  - every <img> has alt text
  - at least one JSON-LD block
Plus: internal link integrity, ideas.json schema sanity.
"""
import os
import re
import json
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {"docs", ".github", ".wrangler", ".git"}
ERRORS = []


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.descriptions = []
        self.canonicals = []
        self.h1 = 0
        self.imgs_no_alt = 0
        self.jsonld = 0
        self.links = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta" and a.get("name") == "description":
            self.descriptions.append(a.get("content", ""))
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonicals.append(a.get("href", ""))
        elif tag == "h1":
            self.h1 += 1
        elif tag == "img" and not a.get("alt"):
            self.imgs_no_alt += 1
        elif tag == "script" and a.get("type") == "application/ld+json":
            self.jsonld += 1
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def err(msg):
    ERRORS.append(msg)


def pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn.endswith(".html"):
                yield os.path.join(dirpath, fn)


def check_page(path):
    rel = os.path.relpath(path, ROOT)
    with open(path, encoding="utf-8", errors="replace") as f:
        src = f.read()
    p = Page()
    p.feed(src)
    if not p.title.strip():
        err(f"{rel}: missing/empty <title>")
    if not any(d.strip() for d in p.descriptions):
        err(f"{rel}: missing/empty meta description")
    if not p.canonicals:
        err(f"{rel}: missing canonical link")
    if p.h1 != 1:
        err(f"{rel}: expected exactly 1 <h1>, found {p.h1}")
    if p.imgs_no_alt:
        err(f"{rel}: {p.imgs_no_alt} <img> without alt")
    if not p.jsonld:
        err(f"{rel}: missing JSON-LD block")
    return p.links


def resolve_link(page_path, href):
    href = href.split("#")[0].split("?")[0]
    if not href or href.startswith(("http://", "https://", "//", "mailto:",
                                    "tel:")):
        return None
    if href.startswith("/"):
        target = os.path.join(ROOT, href.lstrip("/"))
    else:
        target = os.path.normpath(os.path.join(os.path.dirname(page_path),
                                               href))
    if os.path.isdir(target):
        target = os.path.join(target, "index.html")
    return target


def check_links():
    for path in pages():
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8", errors="replace") as f:
            src = f.read()
        p = Page()
        p.feed(src)
        for href in p.links:
            target = resolve_link(path, href)
            if target and not os.path.exists(target):
                err(f"{rel}: broken internal link -> {href}")


def check_ideas():
    fp = os.path.join(ROOT, "ideas", "ideas.json")
    try:
        data = json.load(open(fp))
    except Exception as e:
        err(f"ideas.json: unreadable ({e})")
        return
    ideas = data.get("ideas", [])
    seen_id, seen_slug = set(), set()
    for it in ideas:
        iid, slug = it.get("id"), it.get("slug")
        if not iid or not slug or not it.get("title"):
            err(f"ideas.json: entry missing id/slug/title: {it}")
        if iid in seen_id:
            err(f"ideas.json: duplicate id {iid}")
        if slug in seen_slug:
            err(f"ideas.json: duplicate slug {slug}")
        seen_id.add(iid)
        seen_slug.add(slug)
        if it.get("status") not in ("todo", "doing", "done"):
            err(f"ideas.json: {iid} bad status {it.get('status')!r}")
        if it.get("status") == "done" and not it.get("url"):
            err(f"ideas.json: {iid} done but missing url")


def main():
    n = 0
    for path in pages():
        check_page(path)
        n += 1
    check_links()
    check_ideas()
    print(f"checked {n} pages")
    if ERRORS:
        print(f"FAILED ({len(ERRORS)}):")
        for e in ERRORS:
            print(" -", e)
        sys.exit(1)
    print("SEO checks passed")


if __name__ == "__main__":
    main()
