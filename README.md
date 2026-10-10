# เว็บไซต์โปรไฟล์ ผศ.ดร.ขนิษฐา หินอ่อน

🌐 **https://kanitt.github.io/**

| ลิงก์ | ใช้ทำอะไร |
|---|---|
| `https://kanitt.github.io/` | หน้าโปรไฟล์หลัก — **ภาษาอังกฤษเป็นค่าเริ่มต้น** (กด TH มุมขวาบนเพื่อสลับเป็นไทย) |
| `https://kanitt.github.io/?lang=th` | เปิดเป็นภาษาไทยโดยตรง (ส่งให้หน่วยงานไทย) |
| `https://kanitt.github.io/admin.html` | 🔒 หน้า Admin ส่วนตัว (รหัส 8 หลัก) |
| `https://kanitt.github.io/#cv` | หน้า CV — กด **พิมพ์ / บันทึกเป็น PDF** ได้ทันที ส่งให้หน่วยงานที่ขอประวัติ |
| `https://kanitt.github.io/#present` | โหมดนำเสนอ (สไลด์) สำหรับแนะนำตัวกับนักศึกษา |
| `https://kanitt.github.io/?lang=en#cv` | CV ภาษาอังกฤษโดยตรง |

---

## ✏️ วิธีแก้ไขข้อมูล (ทำบนเว็บ GitHub ได้เลย ไม่ต้องลงโปรแกรม)

ข้อมูลทั้งหมดอยู่ในไฟล์เดียว: **`content.yml`**

1. เข้า https://github.com/kanitt/kanitt.github.io แล้วล็อกอิน
2. คลิกไฟล์ `content.yml` → กดรูป ✏️ (Edit) มุมขวาบน
3. แก้ข้อความ / เพิ่มรายการ
4. กดปุ่มสีเขียว **Commit changes…** → **Commit changes**
5. รอประมาณ 1–2 นาที แล้วรีเฟรชเว็บ

> ทางลัด: ที่ท้ายหน้าเว็บมีลิงก์ **"แก้ไขข้อมูล"** พาไปหน้าแก้ไฟล์โดยตรง

### ตัวอย่าง: เพิ่มผลงานตีพิมพ์ใหม่

copy ก้อนนี้ไปวางใต้ `publications:` (ย่อหน้าให้ตรงกับรายการอื่น)

```yaml
  - year: 2026
    type: journal            # journal หรือ conference
    title: "ชื่อบทความ"
    authors: "Hinon, K., & Lastname, A."
    venue: ชื่อวารสาร
    volume: "15(1)"
    pages: "1–10"
    doi: 10.xxxx/xxxxx
    index: Scopus Q2          # หรือ TCI 1 / TCI 2
    role: first               # first / corresponding / co
    featured: true            # แสดงในสไลด์ "ผลงานเด่น"
```

จำนวนผลงาน / Scopus / โครงการ / รางวัล ที่หน้าแรกจะนับให้อัตโนมัติ และ CV จะอัปเดตตามทันที

### ข้อควรระวัง
- ใช้ **เว้นวรรค (space)** ในการย่อหน้า ห้ามใช้ Tab
- ข้อความที่มีเครื่องหมาย `:` ให้ครอบด้วย `"..."`
- ถ้าพิมพ์ผิดรูปแบบ เว็บจะขึ้นกล่องสีแดงบอกเลขบรรทัด — แก้แล้ว Commit ใหม่ได้เลย (ย้อนไปเวอร์ชันเก่าได้ที่ปุ่ม History)

### เปลี่ยนรูป / เพิ่มไฟล์ให้ดาวน์โหลด
- อัปโหลดรูปไปที่โฟลเดอร์ `assets/img/` (ปุ่ม **Add file → Upload files**) แล้วแก้ชื่อไฟล์ใน `content.yml`
- ไฟล์ PDF ที่อยากให้นักศึกษาโหลด: อัปโหลดไว้ที่โฟลเดอร์ `files/` แล้วใส่ `url: files/ชื่อไฟล์.pdf`
- ⚠️ เว็บนี้เป็นสาธารณะ — อย่าอัปโหลดเอกสารที่มีลายเซ็น เลขบัตร หรือข้อมูลส่วนตัว

---

## 📊 แดชบอร์ดผลงานวิชาการ

ข้อมูลอัปเดตอัตโนมัติ **ทุกวันจันทร์** โดย GitHub Actions (`.github/workflows/metrics.yml`) → เขียนลงไฟล์ `data/metrics.json`

| แหล่งข้อมูล | วิธีเชื่อม |
|---|---|
| OpenAlex + ORCID | อัตโนมัติ ไม่ต้องตั้งค่า (ใช้ ORCID ใน `ids:` ของ content.yml) |
| IEEE | นับอัตโนมัติจาก DOI ที่ขึ้นต้นด้วย 10.1109 |
| Scopus | ขอ API key ฟรีที่ https://dev.elsevier.com → ใส่ใน repo: **Settings → Secrets and variables → Actions → New secret** ชื่อ `SCOPUS_API_KEY` |
| Google Scholar | ไม่มี API ทางการ — กรอกตัวเลขเองใน `manual_metrics:` ของ content.yml (หรือใช้ secret `SERPAPI_KEY` ถ้ามี) |

อยากอัปเดตทันที: แท็บ **Actions → Update academic metrics → Run workflow**

## 🔒 หน้า Admin

- เข้าครั้งแรกจะให้ **ตั้งรหัส 8 หลัก** — ข้อมูลทุกอย่างในหน้านี้ถูกเข้ารหัส (AES-256) ด้วยรหัสนี้ **ลืมรหัส = กู้ข้อมูลไม่ได้**
- มี: ลิงก์ด่วน (CV/สไลด์/QR), เว็บโปรด, บันทึกส่วนตัว, สำรองข้อมูล
- ใช้หลายเครื่อง: ตั้งค่า → ใส่ GitHub fine-grained token (สิทธิ์ Contents: Read and write เฉพาะ repo นี้) แล้วข้อมูลที่เข้ารหัสจะซิงก์เป็นไฟล์ `data/vault.json`
- ⚠️ เว็บนี้เป็นสาธารณะ ไฟล์ที่เข้ารหัสจึงมีคนดาวน์โหลดได้ — **ห้ามเก็บรหัสผ่านหรือข้อมูลลับจริง** ไว้ในหน้า Admin

## 📁 โครงสร้างไฟล์

```
content.yml        ← ข้อมูลทั้งหมด (แก้ไฟล์นี้ไฟล์เดียว)
index.html         ← โครงหน้าเว็บ
assets/style.css   ← สีและหน้าตา (เปลี่ยนสีหลักได้ที่ :root บนสุด)
assets/app.js      ← ตัวสร้างหน้าเว็บ / แดชบอร์ด / CV / สไลด์ จาก content.yml
assets/admin.js    ← หน้า Admin (เข้ารหัสข้อมูล)
admin.html         ← หน้า Admin
data/metrics.json  ← ข้อมูลแดชบอร์ด (สร้างอัตโนมัติ)
scripts/fetch_metrics.py ← สคริปต์ดึงข้อมูลแดชบอร์ด
assets/img/        ← รูปภาพ
```

ดูบนเครื่องตัวเอง: `python3 -m http.server 8000` แล้วเปิด http://localhost:8000
