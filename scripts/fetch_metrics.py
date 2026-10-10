#!/usr/bin/env python3
"""ดึงข้อมูลผลงานวิชาการจากฐานข้อมูลต่าง ๆ แล้วเขียนเป็น data/metrics.json

รันอัตโนมัติทุกสัปดาห์ผ่าน GitHub Actions (.github/workflows/metrics.yml)
หรือรันเองบนเครื่อง:  python3 scripts/fetch_metrics.py

แหล่งข้อมูล
  - OpenAlex  : ฟรี ไม่ต้องใช้คีย์ (ค้นจาก ORCID) — จำนวนผลงาน การอ้างอิง h-index รายปี
  - IEEE      : นับจาก DOI ที่ขึ้นต้นด้วย 10.1109 ในรายการของ OpenAlex
  - Scopus    : ต้องมี secret ชื่อ SCOPUS_API_KEY (ขอฟรีที่ https://dev.elsevier.com)
  - Google Scholar : ไม่มี API ทางการ — ใช้ SERPAPI_KEY (ถ้ามี) ไม่เช่นนั้นกรอกเองใน content.yml
ใช้เฉพาะ standard library ของ Python
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "metrics.json"
UA = {"User-Agent": "kanitt-profile-site/1.0 (+https://kanittah.github.io/)"}


def read_ids():
    """อ่านค่าใต้หัวข้อ ids: ใน content.yml (ไม่ต้องพึ่งไลบรารี YAML)"""
    text = (ROOT / "content.yml").read_text(encoding="utf-8")
    m = re.search(r"^ids:\s*\n((?:[ \t]+.*\n?|\s*\n)+)", text, re.M)
    ids = {}
    if m:
        for line in m.group(1).splitlines():
            kv = re.match(r"\s+([a-z_]+):\s*\"?([^\"#\n]*?)\"?\s*(?:#.*)?$", line)
            if kv and kv.group(2).strip():
                ids[kv.group(1)] = kv.group(2).strip()
    return ids


def get_json(url, headers=None):
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def openalex(ids):
    orcid = ids.get("orcid")
    author_id = ids.get("openalex")
    if author_id:
        a = get_json(f"https://api.openalex.org/authors/{author_id}")
    elif orcid:
        a = get_json(f"https://api.openalex.org/authors/orcid:{orcid}")
    else:
        return {"ok": False, "reason": "ยังไม่ได้ใส่ orcid หรือ openalex ใน content.yml"}
    aid = a["id"].rsplit("/", 1)[-1]
    works, cursor = [], "*"
    while cursor:
        q = urllib.parse.urlencode({
            "filter": f"author.id:{aid}", "per-page": 100, "cursor": cursor,
            "select": "id,publication_year,title,doi,cited_by_count,type,primary_location",
        })
        page = get_json(f"https://api.openalex.org/works?{q}")
        for w in page["results"]:
            src = ((w.get("primary_location") or {}).get("source") or {})
            doi = (w.get("doi") or "").replace("https://doi.org/", "")
            works.append({
                "year": w.get("publication_year"),
                "title": w.get("title") or "",
                "venue": src.get("display_name") or "",
                "doi": doi,
                "cited": w.get("cited_by_count", 0),
                "type": w.get("type") or "",
                "ieee": doi.lower().startswith("10.1109/"),
            })
        cursor = page["meta"].get("next_cursor")
        if not page["results"]:
            break
    works.sort(key=lambda w: (-(w["year"] or 0), -w["cited"]))
    by_year = sorted(
        ({"year": c["year"], "works": c["works_count"], "citations": c["cited_by_count"]} for c in a.get("counts_by_year", [])),
        key=lambda c: c["year"],
    )
    stats = a.get("summary_stats") or {}
    return {
        "ok": True,
        "url": f"https://openalex.org/authors/{aid}",
        "works_count": a.get("works_count", len(works)),
        "citations": a.get("cited_by_count", 0),
        "h_index": stats.get("h_index"),
        "i10_index": stats.get("i10_index"),
        "by_year": by_year,
        "works": works,
    }


def scopus(ids):
    key = os.environ.get("SCOPUS_API_KEY")
    au = ids.get("scopus")
    if not au:
        return {"ok": False, "reason": "ยังไม่ได้ใส่ scopus ใน content.yml"}
    url = f"https://www.scopus.com/authid/detail.uri?authorId={au}"
    if not key:
        return {"ok": False, "url": url, "reason": "ต้องเพิ่ม SCOPUS_API_KEY ใน GitHub Secrets"}
    docs, start = [], 0
    while True:
        q = urllib.parse.urlencode({"query": f"AU-ID({au})", "count": 25, "start": start})
        d = get_json(f"https://api.elsevier.com/content/search/scopus?{q}",
                     {"X-ELS-APIKey": key, "Accept": "application/json"})
        res = d["search-results"]
        entries = [e for e in res.get("entry", []) if "error" not in e]
        docs += entries
        start += 25
        if start >= int(res.get("opensearch:totalResults", 0)) or not entries:
            break
    cites = sorted((int(e.get("citedby-count", 0)) for e in docs), reverse=True)
    h = sum(1 for i, c in enumerate(cites, 1) if c >= i)
    return {"ok": True, "url": url, "documents": len(docs), "citations": sum(cites), "h_index": h}


def scholar(ids):
    sid = ids.get("google_scholar")
    key = os.environ.get("SERPAPI_KEY")
    if not sid:
        return {"ok": False, "reason": "ยังไม่ได้ใส่ google_scholar ใน content.yml"}
    url = f"https://scholar.google.com/citations?user={sid}"
    if not key:
        return {"ok": False, "url": url, "reason": "กรอกตัวเลขเองใน content.yml (manual_metrics)"}
    q = urllib.parse.urlencode({"engine": "google_scholar_author", "author_id": sid, "api_key": key})
    d = get_json(f"https://serpapi.com/search.json?{q}")
    table = {list(r.keys())[0]: list(r.values())[0].get("all") for r in d.get("cited_by", {}).get("table", [])}
    return {"ok": True, "url": url, "citations": table.get("citations"),
            "h_index": table.get("h_index"), "i10_index": table.get("i10_index")}


def safe(fn, ids):
    try:
        return fn(ids)
    except Exception as e:  # แหล่งไหนล่ม ไม่ให้กระทบแหล่งอื่น
        print(f"[warn] {fn.__name__}: {e}", file=sys.stderr)
        return {"ok": False, "reason": f"ดึงข้อมูลไม่สำเร็จ: {e}"}


def main():
    ids = read_ids()
    oa = safe(openalex, ids)
    ieee_works = [w for w in oa.get("works", []) if w["ieee"]]
    out = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sources": {
            "openalex": oa,
            "scopus": safe(scopus, ids),
            "scholar": safe(scholar, ids),
            "ieee": {"ok": oa.get("ok", False), "works_count": len(ieee_works),
                     "citations": sum(w["cited"] for w in ieee_works),
                     "url": "https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=Kanitta%20Hinon"},
        },
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: openalex works={oa.get('works_count')} citations={oa.get('citations')} ieee={len(ieee_works)}")


if __name__ == "__main__":
    main()
