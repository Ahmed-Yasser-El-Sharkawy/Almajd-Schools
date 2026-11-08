#!/usr/bin/env python
"""Convert the quant-sections workbook into a source JSON for build-data.mjs.

    python -I scripts/sheet-to-json.py "<sheet>.xlsx" "<out>.json"

The sheet is the teacher's export: one row per section with the number, the
full form name, the question count, both links and an EDIT link. The edit
link is dropped here and never written anywhere build-data can read, so it
cannot reach the public bundle. Only the fact that the forms are gated is
recorded; the password itself is not in the sheet and must stay that way.
"""
import json
import re
import sys
from datetime import date

import openpyxl

TITLE = re.compile(r"^القسم\s+\S+\s+—\s+(.+?)\s+—\s+القدرات الكمي\s*\|\s*مدارس المجد الأهلية$")
HEADERS = ["القسم", "اسم الفورم", "عدد الأسئلة", "الرابط المختصر", "رابط الفورم"]


def main(src, out):
    # The Windows console defaults to cp1252, which cannot print the Arabic path.
    sys.stdout.reconfigure(encoding="utf-8")
    ws =openpyxl.load_workbook(src, data_only=True, read_only=True).worksheets[0]
    rows = ws.iter_rows(values_only=True)
    header = [str(h).strip() for h in next(rows)[:5]]
    if header != HEADERS:
        sys.exit(f"unexpected columns: {header}")

    forms = []
    for row in rows:
        if not any(v is not None for v in row):
            continue
        number, name, questions, short, url = row[:5]
        m = TITLE.match(str(name).strip())
        if not m:
            sys.exit(f"section {number}: title does not follow the pattern: {name}")
        forms.append(
            {
                "section": int(number),
                "topic": re.sub(r"\s+", " ", m.group(1)).strip(),
                "questions": int(questions),
                "short": short,
                "url": url,
            }
        )

    data = {
        "generated": date.today().isoformat(),
        "requiresPassword": True,
        "totalQuestions": sum(f["questions"] for f in forms),
        "forms": forms,
    }
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print(f"{len(forms)} sections, {data['totalQuestions']} questions -> {out}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
