#!/bin/sh
# ใส่เลขเวอร์ชันท้ายไฟล์ .js/.css ใน index.html และ admin.html
# เพื่อให้เบราว์เซอร์โหลดไฟล์ใหม่ทันทีหลังอัปเดต (ไม่ใช้ของเก่าที่จำไว้)
cd "$(dirname "$0")/.." || exit 1
v=$(date +%Y%m%d%H%M)
for f in index.html admin.html; do
  sed -i '' -E "s#(assets/[a-z-]+\.(js|css))(\?v=[0-9]+)?\"#\1?v=$v\"#g" "$f"
done
echo "version $v"
