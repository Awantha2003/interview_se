"""Convert supplied teaching PDFs into page records and browser-native SVG fragments.

Usage: python scripts/import-editions.py /path/to/folder/containing/Section_*.pdf
Requires PyMuPDF. Source positions decide diagram boundaries; all original pages
are included so layout and question order can also be checked against the PDF.
"""
import argparse
from base64 import b64encode
import io
import json
from pathlib import Path
import re
import shutil

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "editions"
LESSON = re.compile(r"^(?:L\s*ESSON|OOP / LESSON)\s+\d+", re.I)
SPECIAL = re.compile(r"^(?:VISUAL (?:COMPANION|LESSON)|(?:I\s*)?NTERVIEW PRACTICE|ANSWER KEY|(?:P\s*)?RACTICAL PROJECT|STUDY CHECKLIST|ADDITIONAL TOPICS)", re.I)
FIGURE = re.compile(r"^(?:graphical explanation|visual explanation|visual trace|step-by-step visual trace|read the diagram step by step)$", re.I)
NUMBERED = re.compile(r"^\d{1,2}\.\s+[A-Z]")
SI = re.compile(r"[\u0d80-\u0dff]")
FOOTER_Y = 797
SECTION_TITLES = [
    "Programming Fundamentals", "Object-Oriented Programming", "Data Structures",
    "Algorithms and Problem Solving", "HTML and Accessibility", "CSS Fundamentals",
    "CSS Layouts and Responsive UI", "JavaScript Fundamentals", "JavaScript in the Browser",
    "TypeScript", "React.js Fundamentals", "React Hooks and Performance", "Next.js and Angular",
    "UI Libraries and Frontend Tooling", "Backend Fundamentals", "HTTP and REST APIs",
    "Node.js and Express.js", "Java Fundamentals", "Spring Boot and Spring Security",
]


def page_blocks(page):
    for block in page.get_text("dict", flags=fitz.TEXTFLAGS_DICT & ~fitz.TEXT_PRESERVE_IMAGES)["blocks"]:
        if "lines" not in block:
            continue
        lines = ["".join(span["text"] for span in line["spans"]) for line in block["lines"]]
        fonts = [span["font"] for line in block["lines"] for span in line["spans"]]
        sizes = [span["size"] for line in block["lines"] for span in line["spans"]]
        if not any(x.strip() for x in lines):
            continue
        yield dict(rect=fitz.Rect(block["bbox"]), text="\n".join(lines).strip("\n"),
                   mono=all("Mono" in font for font in fonts), size=max(sizes),
                   bold=all("Bold" in font for font in fonts))


def inner_svg(source, number, bounds):
    with fitz.open() as edited:
        edited.insert_pdf(source, from_page=number, to_page=number, annots=False)
        page = edited[0]
        w, h = page.rect.width, page.rect.height
        r = fitz.Rect(bounds) & page.rect
        for outside in [(0,0,w,r.y0),(0,r.y1,w,h),(0,r.y0,r.x0,r.y1),(r.x1,r.y0,w,r.y1)]:
            if fitz.Rect(outside).is_empty:
                continue
            page.add_redact_annot(outside, fill=False, cross_out=False)
        page.apply_redactions(images=0, graphics=2, text=0)
        page.set_cropbox(r)
        svg = page.get_svg_image()
        svg = re.sub(r' data-text="[^"]*"', '', svg)
        # SVG from MuPDF is inert artwork. Drop metadata and namespace noise.
        return re.sub(r' xmlns:inkscape="[^"]*"', '', svg)


def clipped_region(region, padding=0.9):
    return fitz.Rect(region.x0-padding,region.y0-padding,region.x1+padding,region.y1+padding)


def diagram_regions(page, blocks, section):
    draws = [d for d in page.get_drawings() if 34<d["rect"].y0 and d["rect"].y1<FOOTER_Y]
    regions = []
    for block in blocks:
        if not FIGURE.fullmatch(block["text"].strip()):
            continue
        heading=block["rect"]
        later=[b["rect"].y0 for b in blocks if b["rect"].y0>=heading.y1
               and b["rect"].x0<=heading.x0+3]
        boundary=min(later,default=FOOTER_Y)
        shapes=[d["rect"] for d in draws if d["rect"].y0>=heading.y1-1 and d["rect"].y1<=boundary+1]
        if shapes and min(r.y0 for r in shapes)-heading.y1<33:
            region=fitz.Rect(shapes[0])
            for shape in shapes[1:]:
                region|=shape
            if region.height>=14:
                regions.append(region)
    # Companion pages place the illustration before their reading instructions.
    if blocks and re.match(r"VISUAL (?:COMPANION|LESSON)",blocks[0]["text"],re.I):
        notes=next((b for b in blocks if re.match(r"(?:HOW TO READ THE DIAGRAM|Read the diagram step by step)",b["text"],re.I)),None)
        if notes:
            shapes=[d["rect"] for d in draws if 105<d["rect"].y0 and d["rect"].y1<=notes["rect"].y0+1]
            if shapes:
                region=fitz.Rect(shapes[0])
                for shape in shapes[1:]:
                    region|=shape
                # Include the guide labels alongside the original shapes.
                for b in blocks:
                    r=b["rect"]
                    if r.y0>=region.y0-2 and r.y1<=region.y1+2:
                        region|=r
                regions.append(region)
    if section in (1,2):
        regions.extend(fitz.Rect(table.bbox) for table in page.find_tables().tables if table.row_count>=2 and table.col_count>=2)
    # Infers standalone figures from their source background and contained shapes.
    for drawing in draws:
        r = drawing["rect"]
        if r.width < 240 or r.height < 19 or r.height > 410 or not drawing.get("fill"):
            continue
        labels = [b for b in blocks if r.contains(b["rect"]+(-1,-1,1,1)) and (not b["mono"] or section==3)]
        nested = sum(r.contains(d["rect"]) and d["rect"].get_area() < r.get_area()*.95 and d["rect"].height>=4 for d in draws)
        if nested >= 2 and len(labels)>=1:
            regions.append(r)
        elif len(labels)==1:
            label=labels[0]
            head=label["text"].lstrip()
            centered=label["rect"].x0>r.x0+27 and label["rect"].x1<r.x1-20
            if centered and (section==3 and 175<r.y0<235 or "→" in head and section in (1,2,4)):
                regions.append(r)
    # Ignore contained subpanels; preserve the whole diagram.
    result = []
    for region in sorted(regions,key=lambda r:r.get_area(),reverse=True):
        if any((region & other).get_area() > region.get_area()*.45 for other in result):
            continue
        result.append(region)
    return result


def classify(page,blocks,section,page_number,last_title):
    first = blocks[0]["text"].splitlines() if blocks else []
    numbers = [b["text"].splitlines()[0] for b in blocks if b["size"]>=13 and NUMBERED.match(b["text"])]
    if page_number==1:
        return SECTION_TITLES[section-1], "Overview", numbers
    for idx,block in enumerate(blocks[:4]):
        lines = block["text"].splitlines()
        prefix = lines[0]
        if LESSON.match(prefix) or SPECIAL.match(prefix):
            title = " ".join(lines[1:]) if len(lines)>1 else " ".join(blocks[idx+1]["text"].splitlines()) if idx+1<len(blocks) else prefix
            kind = "Lesson" if LESSON.match(prefix) else "Reference"
            return re.sub(r"^\d+\.\s+","",title),kind,numbers
    if numbers and section in (1,2):
        return re.sub(r"^\d+\.\s+","",numbers[0]),"Lesson",numbers
    if section in (1,2):
        prominent = next((b["text"].splitlines()[0] for b in blocks if b["size"]>=14 and len(b["text"])<160),None)
        return prominent or last_title,"Continuation",numbers
    if first and re.search(r"contents|checklist|chapter map",first[0],re.I):
        return "Contents","Reference",numbers
    title = next((b["text"].splitlines()[0] for b in blocks[:7] if b["size"]>=17 and len(b["text"])<160),None)
    return title or (first[0] if first and len(first[0])<95 else f"Page {page_number}"),"Reference",numbers


def label_text(block):
    return " ".join(block["text"].split())[:260]


def import_book(path, section):
    folder = ROOT / str(section)
    folder.mkdir(exist_ok=True, parents=True)
    shutil.copyfile(path, folder / "source.pdf")
    entries, last_title = [], SECTION_TITLES[section-1]
    with fitz.open(path) as doc:
        for page_number,page in enumerate(doc,1):
            blocks = sorted((b for b in page_blocks(page) if b["rect"].y1<FOOTER_Y),
                            key=lambda b:(round(b["rect"].y0/3),b["rect"].x0))
            title,kind,headings = classify(page,blocks,section,page_number,last_title)
            if kind in ("Overview","Lesson"):
                last_title=title
            diagrams = diagram_regions(page,blocks,section)
            placed = []
            for region in diagrams:
                labels=[label_text(b) for b in blocks if region.contains(b["rect"]+(-1,-1,1,1))]
                if labels:
                    placed.append((region.y0,0,"diagram",region," · ".join(labels)))
            for block in blocks:
                r=block["rect"]
                if any((region & r).get_area() >= r.get_area()*.88 for region in diagrams):
                    continue
                placed.append((r.y0,r.x0,"block",r,block))
            placed.sort(key=lambda x:(round(x[0]/3),x[1]))
            content=[]
            for _,_,kind_of_item,r,value in placed:
                if kind_of_item=="diagram":
                    svg=inner_svg(doc,page_number-1,clipped_region(r))
                    content.append(["diagram",svg,value])
                elif SI.search(value["text"]):
                    pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=clipped_region(r),alpha=False)
                    output=io.BytesIO()
                    Image.frombytes("RGB",(pix.width,pix.height),pix.samples).save(output,format="WEBP",quality=92)
                    content.append(["sinhala",b64encode(output.getvalue()).decode("ascii"),label_text(value),pix.width//2])
                else:
                    style="code" if value["mono"] else "heading" if value["bold"] or value["size"]>=15 else "text"
                    content.append([style,value["text"]])
            question_count = sum(len(re.findall(r"(?im)^\s*interview questions?\b",b["text"])) for b in blocks)
            (folder/f"{page_number}.json").write_text(json.dumps(content,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
            entries.append(dict(title=title,kind=kind,headings=headings,questions=question_count,
                                diagrams=sum(item[0]=="diagram" for item in content)))
    print(section, len(entries), sum(p["diagrams"] for p in entries), flush=True)
    return entries


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("source",type=Path)
    args=parser.parse_args()
    sources={int(path.name[8:10]):path for path in args.source.rglob("Section_*.pdf")}
    if set(sources)!=set(range(1,20)):
        raise SystemExit("Expected Sections 01–19")
    index={}
    for section in sorted(sources):
        index[section]=import_book(sources[section],section)
    (ROOT/"index.js").write_text("export const editions = "+json.dumps(index,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")

if __name__=="__main__":
    main()
