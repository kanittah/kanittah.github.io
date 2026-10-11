#!/usr/bin/env python3
"""นำเข้าข้อมูลจาก PDF ที่พิมพ์จาก "ระบบฐานข้อมูลเพื่องานวิจัยและงานบริการวิชาการ มจพ." (research.kmutnb.ac.th)
แล้วเขียนเป็น data/kmutnb.json (เฉพาะข้อมูล ไม่อัปโหลดไฟล์ PDF ขึ้นเว็บ)

วิธีใช้ (บนเครื่องที่มี PyMuPDF):
    python3 scripts/import_kmutnb_pdf.py "/path/ผศ.ดร. ขนิษฐา หินอ่อน.pdf"
แล้ว commit ไฟล์ data/kmutnb.json — เว็บจะรวมกับข้อมูลจาก OpenAlex และตัดรายการซ้ำให้เอง
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "kmutnb.json"
ME = re.compile(r"ขนิษฐา\s*หินอ่อน|Kanitta\s+Hinon", re.I)
THAI = re.compile(r"[฀-๿]")


def join_lines(cell, names=False):
    """รวมข้อความในเซลล์ที่ถูกตัดบรรทัด
    - ภาษาอังกฤษ: เว้นวรรคเมื่อขึ้นบรรทัดใหม่
    - ภาษาไทย: ต่อกันตรง ๆ (คำไทยถูกตัดกลางคำได้) ยกเว้นช่องรายชื่อบุคคล ให้เว้นวรรค (ชื่อ / นามสกุล)"""
    if cell is None:
        return ""
    out = ""
    for line in str(cell).split("\n"):
        line = line.strip()
        if not line:
            continue
        thai_join = out and THAI.match(line[0]) and THAI.match(out[-1])
        if out and (names or not thai_join) and not out.endswith(("-", "/")):
            out += " "
        out += line
    out = re.sub(r"\s{2,}", " ", out).strip()
    if not names:  # คำที่มักขึ้นต้นส่วนใหม่ของชื่อหน่วยงาน
        out = re.sub(r"(?<=[\u0e00-\u0e7f])(มหาวิทยาลัย|ประจำปี|โครงการ(?!วิจัย))", r" \1", out)
    return out


def be_to_ce(v):
    m = re.search(r"(25\d\d)", v or "")
    return int(m.group(1)) - 543 if m else None


NAME_COLS = ("นักวิจัย",)


def cell_text(page, bbox):
    """อ่านข้อความในเซลล์โดยขยายขอบเล็กน้อย (กันสระ/วรรณยุกต์ท้ายคำหลุดขอบตาราง)"""
    if not bbox:
        return ""
    r = fitz.Rect(bbox)
    r.x1 += 2  # กว้างพอให้สระท้ายคำไม่หลุด แต่ไม่ล้ำคอลัมน์ถัดไป
    return page.get_text("text", clip=r).strip()


def tables_by_header(doc):
    """รวมตารางที่ต่อกันหลายหน้า โดยจัดกลุ่มตามหัวตาราง"""
    groups = {}
    for page in doc:
        for t in page.find_tables().tables:
            raw = [[cell_text(page, c) for c in row.cells] for row in t.rows]
            if not raw:
                continue
            head = [join_lines(h) for h in raw[0]]
            rows = [[join_lines(c, names=head[i].startswith(NAME_COLS) if i < len(head) else False) for i, c in enumerate(r)] for r in raw[1:]]
            key = head[1] if len(head) > 1 else head[0]
            groups.setdefault(key, []).extend(r for r in rows if any(r))
    return groups


def main(pdf):
    doc = fitz.open(pdf)
    text = "".join(p.get_text() for p in doc)
    g = tables_by_header(doc)

    def rows(prefix):
        for k, v in g.items():
            if k.startswith(prefix):
                return v
        return []

    printed = re.search(r"วันที่พิมพ์:\s*([^\n]+)", text)
    summary = {}
    for k, v in g.items():
        if k == "จำนวน":
            summary = {r[0]: (int(r[1]) if r[1].isdigit() else 0) for r in v if len(r) > 1}

    projects = []
    for r in rows("โครงการวิจัย"):
        if len(r) < 6 or not r[1]:
            continue
        team = r[4]
        first = team.split(",")[0] if team else ""
        projects.append({
            "year": be_to_ce(r[5]), "title": r[1], "kind": "service" if "บริการ" in r[2] else "research",
            "funder": r[3], "team": team, "role": "lead" if ME.search(first) else "co",
        })

    journals = [{"year": be_to_ce(r[3]), "title": r[1], "authors": r[2], "type": "journal"}
                for r in rows("บทความวารสาร") if len(r) >= 4 and r[1]]
    procs = [{"year": be_to_ce(r[4]) or be_to_ce(r[3]), "title": r[1], "authors": r[2], "type": "conference"}
             for r in rows("บทความประชุม") if len(r) >= 5 and r[1]]
    awards = [{"year": be_to_ce(r[5]), "title": r[1], "work": r[2], "place": r[3], "level": r[4], "team": r[6]}
              for r in rows("รางวัลนักวิจัย") if len(r) >= 7 and r[1]]

    out = {
        "source": "ระบบฐานข้อมูลเพื่องานวิจัยและงานบริการวิชาการ มจพ.",
        "url": "https://research.kmutnb.ac.th/researcher/",
        "printed": printed.group(1).strip() if printed else "",
        "imported": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "summary": summary,
        "projects": projects, "publications": journals + procs, "awards": awards,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: projects={len(projects)} journals={len(journals)} "
          f"proceedings={len(procs)} awards={len(awards)} (summary {summary})")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
