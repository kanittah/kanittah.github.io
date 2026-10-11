/* ตัวแก้ไขข้อมูลเว็บในหน้า Admin — แก้ content.yml ผ่านฟอร์ม แล้วเผยแพร่ขึ้น GitHub ทันที
   ต้องเชื่อม GitHub token ก่อน (ตั้งค่า → ใส่ token) */
(function () {
  'use strict';

  var A = null;              // API จาก admin.js
  var root = null;           // กล่องที่ตัวแก้ไขอยู่
  var draft = null, origYaml = '', sha = null, dirty = false, loading = false, loadErr = '';
  var tab = 'profile', openIdx = {}, works = [], isOpen = true;
  var BI = 'bi', BIA = 'bia';

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return A.esc(s); }
  function tv(v) { return v && typeof v === 'object' ? (v.th || v.en || '') : (v == null ? '' : String(v)); }

  var ROLE_P = [['', '—'], ['first', 'ผู้แต่งหลัก (First author)'], ['corresponding', 'ผู้ประพันธ์บรรณกิจ (Corresponding)'], ['co', 'ผู้ร่วมแต่ง (Co-author)']];
  var SECTIONS = [
    { id: 'profile', label: 'โปรไฟล์', icon: '👤', kind: 'groups', groups: [{ path: 'profile', fields: [
      ['prefix', 'คำนำหน้าเต็ม', BI], ['prefix_short', 'คำนำหน้าแบบย่อ', BI], ['name', 'ชื่อ-นามสกุล', BI],
      ['nickname', 'ชื่อที่นักศึกษาเรียก (เช่น ครูกิ๊ก)', BI], ['position', 'ตำแหน่ง', BI], ['faculty', 'คณะ', BI],
      ['university', 'มหาวิทยาลัย', BI], ['tagline', 'คำโปรยใต้ชื่อ', BIA],
      ['photo_cutout', 'รูปหน้าแรก (แนะนำรูปไดคัทพื้นใส .png)', 'image'], ['photo', 'รูปใน CV (พื้นขาว)', 'image']] }] },
    { id: 'contact', label: 'ช่องทางติดต่อ', icon: '✉️', kind: 'groups', groups: [{ path: 'contact', fields: [
      ['email', 'อีเมล', 'text'], ['phone', 'โทรศัพท์ (ไม่ใส่ก็ได้)', 'text'], ['office', 'ที่อยู่ที่ทำงาน', BIA]] }] },
    { id: 'about', label: 'ประวัติโดยย่อ', icon: '📝', kind: 'groups', groups: [{ path: '', fields: [
      ['about', 'ประวัติโดยย่อ (เว้นบรรทัดว่าง 1 บรรทัด = ขึ้นย่อหน้าใหม่)', BIA]] }] },
    { id: 'education', label: 'การศึกษา', icon: '🎓', kind: 'list', path: 'education', blank: {},
      sum: function (i) { return [tv(i.year), tv(i.degree) + ' ' + tv(i.field)]; }, fields: [
      ['year', 'ปีที่จบ (เช่น 2560 / 2017)', 'text'], ['degree', 'วุฒิการศึกษา', BI], ['field', 'สาขา', BI], ['school', 'สถาบัน', BI]] },
    { id: 'expertise', label: 'ความเชี่ยวชาญ', icon: '💡', kind: 'list', path: 'expertise', blank: { icon: '✨' },
      sum: function (i) { return [i.icon || '', tv(i.title)]; }, fields: [
      ['icon', 'ไอคอน (อีโมจิ 1 ตัว)', 'short'], ['title', 'หัวข้อ', BI], ['desc', 'คำอธิบาย', BIA]] },
    { id: 'courses', label: 'รายวิชาที่สอน', icon: '📚', kind: 'list', path: 'teaching.courses', blank: {},
      sum: function (i) { return [i.code || '', tv(i.name)]; }, fields: [
      ['code', 'รหัสวิชา', 'text'], ['name', 'ชื่อวิชา', BI], ['level', 'ระดับ (เช่น ปริญญาตรี)', BI]] },
    { id: 'materials', label: 'เอกสารประกอบการสอน', icon: '📘', kind: 'list', path: 'teaching.materials', blank: {},
      sum: function (i) { return ['', tv(i.title)]; }, fields: [
      ['title', 'ชื่อเอกสาร', BI], ['desc', 'คำอธิบาย', BIA], ['cover', 'รูปปก (แสดงเฉพาะภาพปก ไม่มีไฟล์ให้ดาวน์โหลด)', 'image']] },
    { id: 'publications', label: 'ผลงานตีพิมพ์ (กรอกเอง)', icon: '📄', kind: 'list', path: 'publications', newOnTop: true,
      blank: function () { return { year: new Date().getFullYear(), type: 'journal' }; },
      note: 'ผลงานใหม่ ๆ ระบบดึงจากฐานข้อมูลมาแสดงเองทุกวัน — กรอกที่นี่เฉพาะเมื่ออยากเพิ่มรายละเอียด เช่น ป้าย Scopus/TCI, รางวัล หรือให้เป็นผลงานเด่น',
      sum: function (i) { return [i.year || '', i.title || '(ไม่มีชื่อเรื่อง)']; }, fields: [
      ['year', 'ปี ค.ศ.', 'number'], ['type', 'ประเภท', 'select', [['journal', 'บทความวารสาร'], ['conference', 'การประชุมวิชาการ'], ['other', 'อื่น ๆ']]],
      ['title', 'ชื่อเรื่อง', 'area'], ['authors', 'ผู้แต่ง (เช่น Hinon, K., & Lastname, A.)', 'text'], ['venue', 'ชื่อวารสาร / งานประชุม', 'text'],
      ['volume', 'ปีที่(ฉบับที่) เช่น 14(4)', 'text'], ['pages', 'หน้า เช่น 1–10', 'text'], ['doi', 'DOI (เช่น 10.xxxx/xxxx)', 'text'],
      ['index', 'ฐานข้อมูล (เช่น Scopus Q3, TCI 1)', 'text'], ['role', 'บทบาท', 'select', ROLE_P], ['award', 'รางวัล (ถ้ามี)', 'text'],
      ['featured', 'แสดงเป็นผลงานเด่น (ขึ้นในสไลด์)', 'bool']] },
    { id: 'auto', label: 'ผลงานจากฐานข้อมูล', icon: '⟳', kind: 'auto' },
    { id: 'projects', label: 'โครงการวิจัย', icon: '🔬', kind: 'list', path: 'projects', newOnTop: true,
      blank: function () { return { year: new Date().getFullYear(), role: 'lead' }; },
      sum: function (i) { return [i.year || '', tv(i.title)]; }, fields: [
      ['year', 'ปี ค.ศ.', 'number'], ['title', 'ชื่อโครงการ', BIA], ['funder', 'แหล่งทุน', BI], ['team', 'คณะผู้วิจัย', 'text'],
      ['role', 'บทบาท', 'select', [['lead', 'หัวหน้าโครงการ'], ['co', 'ผู้ร่วมวิจัย']]], ['ethics', 'เลขรับรองจริยธรรม (ถ้ามี)', 'text']] },
    { id: 'awards', label: 'รางวัล', icon: '🏆', kind: 'list', path: 'awards', newOnTop: true,
      blank: function () { return { year: new Date().getFullYear() }; },
      sum: function (i) { return [i.year || '', tv(i.title)]; }, fields: [
      ['year', 'ปี ค.ศ.', 'number'], ['title', 'ชื่อรางวัล', BI], ['detail', 'รายละเอียด', BIA]] },
    { id: 'links', label: 'ลิงก์ฐานข้อมูลนักวิจัย', icon: '🔗', kind: 'list', path: 'links', blank: {},
      sum: function (i) { return [i.label || '', i.url || '']; }, fields: [
      ['label', 'ชื่อ (เช่น Google Scholar)', 'text'], ['note', 'หมายเหตุสั้น ๆ', 'text'], ['url', 'ลิงก์', 'text']] },
    { id: 'translations', label: 'คำแปลชื่อคน/ชื่อเรื่อง', icon: '🔤', kind: 'list', path: 'translations', newOnTop: true, blank: {},
      note: 'ใช้แสดงชื่อคนและชื่อเรื่องภาษาไทยเป็นภาษาอังกฤษ เมื่อเปิดเว็บแบบ English — ใส่ข้อความภาษาไทยให้ตรงตัวอักษรกับที่แสดงบนเว็บ (ชื่อคนไม่ต้องใส่ ผศ.ดร.)',
      sum: function (i) { return ['', (i.th || '') + (i.en ? '  →  ' + i.en : '')]; }, fields: [
      ['th', 'ภาษาไทย (ตรงตัวอักษร)', 'area'], ['en', 'ภาษาอังกฤษ', 'area']] },
    { id: 'ids', label: 'รหัสนักวิจัย / Scholar', icon: '🆔', kind: 'groups', groups: [
      { path: 'ids', title: 'รหัสในฐานข้อมูล (ใช้ดึงข้อมูลอัตโนมัติ)', fields: [['orcid', 'ORCID', 'text'], ['openalex', 'OpenAlex ID', 'text'],
        ['scopus', 'Scopus Author ID', 'text'], ['google_scholar', 'Google Scholar ID (ตัวอักษรหลัง user= ในลิงก์)', 'text']] },
      { path: 'manual_metrics.google_scholar', title: 'ตัวเลขจาก Google Scholar (กรอกเอง)', fields: [['citations', 'Citations', 'text'],
        ['h_index', 'h-index', 'text'], ['i10_index', 'i10-index', 'text'], ['as_of', 'ข้อมูล ณ วันที่', 'date']] }] },
    { id: 'site', label: 'ตั้งค่าเว็บ', icon: '⚙️', kind: 'groups', groups: [
      { path: 'site', fields: [['default_lang', 'ภาษาเริ่มต้นเมื่อเปิดเว็บ', 'select', [['en', 'English'], ['th', 'ไทย']]], ['url', 'ลิงก์เว็บไซต์', 'text']] },
      { path: 'present', title: 'สไลด์แนะนำตัวกับนักศึกษา', fields: [['closing', 'ข้อความปิดท้ายสไลด์', BIA]] }] }
  ];
  function sec(id) { return SECTIONS.filter(function (s) { return s.id === id; })[0]; }

  // ---------- path helpers ----------
  function get(obj, path) {
    if (!path) return obj;
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function set(obj, path, val) {
    var ks = path.split('.'), o = obj;
    for (var i = 0; i < ks.length - 1; i++) {
      if (o[ks[i]] == null || typeof o[ks[i]] !== 'object') o[ks[i]] = /^\d+$/.test(ks[i + 1]) ? [] : {};
      o = o[ks[i]];
    }
    o[ks[ks.length - 1]] = val;
  }
  function join(a, b) { return a ? a + '.' + b : b; }

  // ---------- encoding ----------
  function toB64(str) {
    var bytes = new TextEncoder().encode(str), s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }
  function fromB64(b64) {
    var bin = atob(b64.replace(/\n/g, '')), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  function bufToB64(buf) {
    var bytes = new Uint8Array(buf), s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }

  // ---------- load / save ----------
  async function load() {
    if (!A.hasToken()) return render();
    loading = true; loadErr = ''; render();
    try {
      var r = await A.gh('/contents/content.yml?ref=main&t=' + Date.now());
      if (!r.ok) throw new Error('GitHub ' + r.status);
      var j = await r.json();
      sha = j.sha; origYaml = fromB64(j.content);
      draft = jsyaml.load(origYaml) || {};
      dirty = false;
      try {
        var m = await fetch('data/metrics.json?t=' + Date.now(), { cache: 'no-store' });
        works = m.ok ? (((await m.json()).sources || {}).openalex || {}).works || [] : [];
      } catch (e) { works = []; }
    } catch (e) { loadErr = 'โหลดข้อมูลเว็บไม่สำเร็จ: ' + e.message; }
    loading = false; render();
  }

  function clean(v) {
    if (Array.isArray(v)) return v.map(clean).filter(function (x) { return x !== undefined; });
    if (v && typeof v === 'object') {
      var o = {};
      Object.keys(v).forEach(function (k) {
        var c = clean(v[k]);
        var empty = c === undefined || c === '' || c === null || (typeof c === 'object' && !Array.isArray(c) && !Object.keys(c).length);
        if (!empty || k === 'hide_works') o[k] = c;
      });
      return o;
    }
    return v;
  }

  var HEADER = [
    '# =====================================================================',
    '#  ข้อมูลทั้งหมดของเว็บไซต์ — แก้ได้ 2 ทาง',
    '#   1) หน้า Admin → แก้ไขข้อมูลเว็บ (แนะนำ ง่ายที่สุด)',
    '#   2) แก้ไฟล์นี้ตรง ๆ บน GitHub (ย่อหน้าใช้ space, ข้อความที่มี : ให้ครอบด้วย "...")',
    '#  ผลงานตีพิมพ์ใหม่ ๆ ระบบดึงจาก OpenAlex / ORCID มาแสดงเองทุกวัน',
    '# =====================================================================',
    ''].join('\n');

  async function save() {
    if (!dirty) return;
    var btn = $('#edSave', root); if (btn) { btn.disabled = true; btn.textContent = 'กำลังเผยแพร่…'; }
    try {
      draft.site = draft.site || {};
      draft.site.updated = new Date().toISOString().slice(0, 10);
      var yaml = HEADER + jsyaml.dump(clean(draft), { lineWidth: -1, noRefs: true, quotingType: '"' });
      jsyaml.load(yaml); // ตรวจซ้ำว่าอ่านกลับได้
      var r = await A.gh('/contents/content.yml', { method: 'PUT', body: JSON.stringify({
        message: 'แก้ไขข้อมูลเว็บผ่านหน้า Admin', content: toB64(yaml), sha: sha, branch: 'main' }) });
      if (r.status === 409 || r.status === 422) throw new Error('ไฟล์ถูกแก้จากที่อื่น — กด "โหลดใหม่" แล้วแก้อีกครั้ง');
      if (!r.ok) throw new Error('GitHub ' + r.status);
      sha = (await r.json()).content.sha; origYaml = yaml; dirty = false;
      A.toast('เผยแพร่แล้ว — หน้าเว็บจะอัปเดตใน 1–2 นาที');
      render();
    } catch (e) {
      A.toast('บันทึกไม่สำเร็จ: ' + e.message);
      if (btn) { btn.disabled = false; btn.textContent = '💾 บันทึกและเผยแพร่'; }
    }
  }

  // ---------- upload ----------
  function stamp() { return new Date().toISOString().replace(/\D/g, '').slice(0, 14); }
  function safeName(n) { return n.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'file'; }
  async function shrink(file) {
    if (!/^image\/jpe?g$/.test(file.type) || file.size < 1.5e6) return file.arrayBuffer();
    var img = await createImageBitmap(file), k = Math.min(1, 1600 / Math.max(img.width, img.height));
    var c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    var blob = await new Promise(function (res) { c.toBlob(res, 'image/jpeg', 0.85); });
    return blob.arrayBuffer();
  }
  async function upload(path, file, isImage) {
    // นโยบาย: อัปโหลดได้เฉพาะรูปภาพ — ห้ามอัปโหลดหนังสือ/เอกสาร (PDF ฯลฯ) ขึ้นเว็บ
    if (!isImage || !/^image\//.test(file.type)) { A.toast('อัปโหลดได้เฉพาะรูปภาพเท่านั้น'); return; }
    if (file.size > 40e6) { A.toast('ไฟล์ใหญ่เกิน 40MB'); return; }
    A.toast('กำลังอัปโหลด…');
    try {
      var buf = isImage ? await shrink(file) : await file.arrayBuffer();
      var dest = (isImage ? 'assets/img/' : 'files/') + stamp() + '-' + safeName(file.name);
      var r = await A.gh('/contents/' + dest, { method: 'PUT', body: JSON.stringify({ message: 'อัปโหลดไฟล์ผ่านหน้า Admin', content: bufToB64(buf), branch: 'main' }) });
      if (!r.ok) throw new Error('GitHub ' + r.status);
      set(draft, path, dest); dirty = true; render();
      A.toast('อัปโหลดแล้ว — กด "บันทึกและเผยแพร่" เพื่อใช้ไฟล์นี้');
    } catch (e) { A.toast('อัปโหลดไม่สำเร็จ: ' + e.message); }
  }

  // ---------- render ----------
  function field(base, f) {
    var name = f[0], label = f[1], type = f[2], p = join(base, name), v = get(draft, p);
    var id = 'f-' + p.replace(/\./g, '-');
    if (type === BI || type === BIA) {
      var th = v && typeof v === 'object' ? v.th || '' : (v || ''), en = v && typeof v === 'object' ? v.en || '' : (v || '');
      var tag = function (lang, val) {
        return type === BIA
          ? '<textarea rows="3" data-bi="' + p + '" data-lang="' + lang + '" aria-label="' + esc(label + ' ' + lang) + '">' + esc(val) + '</textarea>'
          : '<input type="text" data-bi="' + p + '" data-lang="' + lang + '" value="' + esc(val) + '" aria-label="' + esc(label + ' ' + lang) + '">';
      };
      return '<div class="ed-f ed-wide"><span class="ed-l">' + esc(label) + '</span><div class="ed-bi"><label><b>TH</b>' + tag('th', th) + '</label><label><b>EN</b>' + tag('en', en) + '</label></div></div>';
    }
    var val = v == null ? '' : v, input;
    if (type === 'area') input = '<textarea id="' + id + '" rows="3" data-p="' + p + '">' + esc(val) + '</textarea>';
    else if (type === 'select') input = '<select id="' + id + '" data-p="' + p + '">' + f[3].map(function (o) {
      return '<option value="' + esc(o[0]) + '"' + (String(val) === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>';
    else if (type === 'bool') return '<label class="ed-f ed-check"><input type="checkbox" data-p="' + p + '"' + (val ? ' checked' : '') + '> ' + esc(label) + '</label>';
    else if (type === 'image' || type === 'file') {
      var isImg = type === 'image';
      input = '<div class="ed-up">' + (isImg && val ? '<img src="' + esc(val) + '" alt="">' : '') +
        '<input id="' + id + '" type="text" data-p="' + p + '" value="' + esc(val) + '" placeholder="' + (isImg ? 'assets/img/…' : 'files/…pdf') + '">' +
        '<label class="btn ghost">⬆ อัปโหลด<input type="file" hidden data-up="' + p + '" data-img="' + (isImg ? 1 : '') + '" accept="' + (isImg ? 'image/*' : '.pdf,application/pdf') + '"></label></div>';
    } else input = '<input id="' + id + '" type="' + (type === 'number' ? 'number' : type === 'date' ? 'date' : 'text') + '" data-p="' + p + '"' +
      (type === 'number' ? ' data-num="1"' : '') + ' value="' + esc(val) + '"' + (type === 'short' ? ' class="ed-short"' : '') + '>';
    return '<div class="ed-f' + (type === 'area' || type === 'image' || type === 'file' ? ' ed-wide' : '') + '"><label class="ed-l" for="' + id + '">' + esc(label) + '</label>' + input + '</div>';
  }

  function renderGroups(s) {
    return s.groups.map(function (g) {
      return '<fieldset class="ed-group">' + (g.title ? '<legend>' + esc(g.title) + '</legend>' : '') +
        '<div class="ed-grid">' + g.fields.map(function (f) { return field(g.path, f); }).join('') + '</div></fieldset>';
    }).join('');
  }

  function renderList(s) {
    var list = get(draft, s.path) || [];
    var oi = openIdx[s.id];
    return (s.note ? '<p class="ed-note">' + esc(s.note) + '</p>' : '') +
      '<div class="ed-list-tools"><button class="btn" type="button" data-add="' + s.id + '">+ เพิ่มรายการ</button><span class="muted">' + list.length + ' รายการ</span></div>' +
      '<ol class="ed-list">' + list.map(function (it, i) {
        var sm = s.sum(it || {}), open = oi === i;
        return '<li class="ed-item' + (open ? ' open' : '') + '"><div class="ed-item-head">' +
          '<button type="button" class="ed-item-toggle" data-open="' + s.id + ':' + i + '"><span class="ed-sum-a">' + esc(sm[0]) + '</span><span class="ed-sum-b">' + esc(sm[1] || '(ยังไม่มีข้อมูล)') + '</span></button>' +
          '<button type="button" class="bm-btn" data-move="' + s.id + ':' + i + ':-1" aria-label="เลื่อนขึ้น"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button type="button" class="bm-btn" data-move="' + s.id + ':' + i + ':1" aria-label="เลื่อนลง"' + (i === list.length - 1 ? ' disabled' : '') + '>↓</button>' +
          '<button type="button" class="bm-btn" data-rm="' + s.id + ':' + i + '" aria-label="ลบรายการ">✕</button></div>' +
          (open ? '<div class="ed-item-body"><div class="ed-grid">' + s.fields.map(function (f) { return field(s.path + '.' + i, f); }).join('') + '</div></div>' : '') +
          '</li>';
      }).join('') + '</ol>';
  }

  function normT(x) { return String(x || '').toLowerCase().replace(/[^a-z0-9฀-๿]/g, '').slice(0, 60); }
  function renderAuto() {
    if (!works.length) return '<p class="muted">ยังไม่มีข้อมูลจากฐานข้อมูล</p>';
    var manual = (draft.publications || []);
    var hide = (draft.hide_works || []).map(normT);
    return '<p class="ed-note">ผลงานที่ระบบดึงจาก OpenAlex / ORCID อัตโนมัติ — เอาเครื่องหมายถูกออกเพื่อซ่อนจากเว็บ หรือกด "เพิ่มรายละเอียด" เพื่อใส่ป้าย Scopus/TCI, รางวัล, ผลงานเด่น</p>' +
      '<ol class="ed-auto">' + works.map(function (w, i) {
        var key = w.doi || w.title;
        var inManual = manual.some(function (p) { return (p.doi && w.doi && String(p.doi).toLowerCase() === w.doi.toLowerCase()) || normT(p.title) === normT(w.title); });
        var shown = !w.broken_title && hide.indexOf(normT(key)) < 0;
        return '<li><label class="ed-check"><input type="checkbox" data-hide="' + i + '"' + (shown ? ' checked' : '') + (w.broken_title || inManual ? ' disabled' : '') + '> แสดง</label>' +
          '<div><span class="ed-sum-a">' + esc(w.year) + '</span> ' + esc(w.title) + '<small class="muted">' + esc(w.venue || '') + (w.cited ? ' · อ้างอิง ' + w.cited : '') +
          (w.broken_title ? ' · ชื่อภาษาไทยจากฐานข้อมูลไม่สมบูรณ์ — กด "เพิ่มรายละเอียด" แล้วพิมพ์ชื่อให้ถูก' : '') + '</small></div>' +
          (inManual ? '<span class="ed-tag">มีรายละเอียดแล้ว</span>' : '<button type="button" class="btn ghost" data-enrich="' + i + '">เพิ่มรายละเอียด</button>') + '</li>';
      }).join('') + '</ol>';
  }

  function render() {
    if (!root) return;
    var s = sec(tab);
    var head = '<button class="adm-head" type="button" data-edtoggle><span class="adm-num">01</span><span class="adm-kanji" aria-hidden="true">一</span>' +
      '<span class="adm-title">แก้ไขข้อมูลเว็บ · EDIT SITE</span><span class="adm-caret" aria-hidden="true">▾</span></button>';
    var body;
    if (!A.hasToken()) {
      body = '<div class="ed-connect"><h3>เชื่อมต่อ GitHub ก่อน (ทำครั้งเดียวต่อเครื่อง)</h3><ol>' +
        '<li>กดปุ่ม <b>สร้างกุญแจ</b> → GitHub จะเปิดหน้าใหม่ (ล็อกอินบัญชี kanittah)</li>' +
        '<li>ที่หัวข้อ <b>Repository access</b> เลือก <b>Only select repositories</b> → เลือก <code>' + esc(A.repo()) + '</code></li>' +
        '<li>ที่ <b>Permissions → Contents</b> เลือก <b>Read and write</b> แล้วกด <b>Generate token</b></li>' +
        '<li>คัดลอกกุญแจ (ขึ้นต้นด้วย github_pat_) แล้วกด <b>วางกุญแจ</b> ด้านล่าง</li></ol>' +
        '<div class="ql-row"><a class="btn ghost" target="_blank" rel="noopener" href="' + esc(A.tokenUrl()) + '">① สร้างกุญแจ ↗</a>' +
        '<button class="btn" type="button" data-act="token">② วางกุญแจ</button></div></div>';
    } else if (loading) body = '<p class="muted">กำลังโหลดข้อมูลเว็บ…</p>';
    else if (loadErr || !draft) body = '<p class="pin-msg">' + esc(loadErr || 'ยังไม่ได้โหลดข้อมูล') + '</p><button class="btn ghost" type="button" data-edreload>โหลดใหม่</button>';
    else {
      body = '<div class="ed-wrap"><nav class="ed-tabs" aria-label="หมวดข้อมูล">' + SECTIONS.map(function (x) {
          return '<button type="button" class="ed-tab' + (x.id === tab ? ' on' : '') + '" data-tab="' + x.id + '"><span aria-hidden="true">' + x.icon + '</span>' + esc(x.label) + '</button>';
        }).join('') + '</nav><div class="ed-pane"><h3 class="ed-pane-h">' + s.icon + ' ' + esc(s.label) + '</h3>' +
        (s.kind === 'groups' ? renderGroups(s) : s.kind === 'list' ? renderList(s) : renderAuto()) + '</div></div>' +
        '<div class="ed-bar' + (dirty ? ' dirty' : '') + '"><span>' + (dirty ? '● มีการแก้ไขที่ยังไม่เผยแพร่' : '✓ ข้อมูลตรงกับหน้าเว็บ') + '</span>' +
        '<a class="btn ghost" href="./" target="_blank" rel="noopener">ดูหน้าเว็บ ↗</a>' +
        (dirty ? '<button class="btn ghost" type="button" data-edreload>ยกเลิกการแก้ไข</button>' : '') +
        '<button class="btn" type="button" id="edSave"' + (dirty ? '' : ' disabled') + '>💾 บันทึกและเผยแพร่</button></div>';
    }
    root.innerHTML = '<section class="adm-sec ed-sec' + (isOpen ? ' open' : '') + '">' + head + '<div class="adm-body">' + body + '</div></section>';
  }

  // ---------- events ----------
  function markDirty() {
    if (!dirty) { dirty = true; var bar = $('.ed-bar', root); if (bar) { render(); refocus(); } }
  }
  var lastFocus = null;
  function refocus() {
    if (!lastFocus) return;
    var el = root.querySelector('[data-p="' + lastFocus.p + '"]' + (lastFocus.lang ? '[data-lang="' + lastFocus.lang + '"]' : '')) ||
      root.querySelector('[data-bi="' + lastFocus.p + '"][data-lang="' + lastFocus.lang + '"]');
    if (el) { el.focus(); if (el.setSelectionRange && lastFocus.pos != null) try { el.setSelectionRange(lastFocus.pos, lastFocus.pos); } catch (e) {} }
  }

  function bind() {
    root.addEventListener('input', function (e) {
      var el = e.target;
      if (el.dataset.p) {
        var v = el.type === 'checkbox' ? el.checked : el.value;
        if (el.dataset.num) v = el.value === '' ? '' : Number(el.value);
        set(draft, el.dataset.p, v);
        lastFocus = { p: el.dataset.p, pos: el.selectionStart };
      } else if (el.dataset.bi) {
        var p = el.dataset.bi, cur = get(draft, p), o = cur && typeof cur === 'object' ? Object.assign({}, cur) : { th: cur || '', en: cur || '' };
        o[el.dataset.lang] = el.value;
        set(draft, p, o.th === o.en ? o.th : (o.th && o.en ? { th: o.th, en: o.en } : (o.th ? { th: o.th } : (o.en ? { en: o.en } : ''))));
        lastFocus = { p: p, lang: el.dataset.lang, pos: el.selectionStart };
      } else return;
      markDirty();
    });
    root.addEventListener('change', function (e) {
      var el = e.target;
      if (el.dataset.up && el.files && el.files[0]) return upload(el.dataset.up, el.files[0], !!el.dataset.img);
      if (el.dataset.hide != null) {
        var w = works[+el.dataset.hide], key = w.doi || w.title;
        var list = (draft.hide_works || []).filter(function (h) { return normT(h) !== normT(key); });
        if (!el.checked) list.push(key);
        draft.hide_works = list; dirty = true; render();
      }
    });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button,[data-edtoggle]');
      if (!b) return;
      var d = b.dataset;
      if (b.hasAttribute('data-edtoggle')) { isOpen = !isOpen; render(); return; }
      if (d.act === 'token') { A.setToken(); return; }
      if (b.hasAttribute('data-edreload')) {
        if (dirty && !confirm('ทิ้งการแก้ไขที่ยังไม่เผยแพร่?')) return;
        load(); return;
      }
      if (b.id === 'edSave') { save(); return; }
      if (d.tab) { tab = d.tab; render(); return; }
      if (d.open) { var q = d.open.split(':'); openIdx[q[0]] = openIdx[q[0]] === +q[1] ? -1 : +q[1]; render(); return; }
      if (d.add) {
        var s = sec(d.add), list = get(draft, s.path) || [];
        var item = typeof s.blank === 'function' ? s.blank() : JSON.parse(JSON.stringify(s.blank || {}));
        if (s.newOnTop) list.unshift(item); else list.push(item);
        set(draft, s.path, list); openIdx[s.id] = s.newOnTop ? 0 : list.length - 1; dirty = true; render(); return;
      }
      if (d.move) {
        var m = d.move.split(':'), sm = sec(m[0]), arr = get(draft, sm.path), i = +m[1], j = i + (+m[2]);
        if (j < 0 || j >= arr.length) return;
        var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        if (openIdx[sm.id] === i) openIdx[sm.id] = j;
        dirty = true; render(); return;
      }
      if (d.rm) {
        var r = d.rm.split(':'), sr = sec(r[0]), ar = get(draft, sr.path), it = ar[+r[1]], sum = sr.sum(it || {});
        if (!confirm('ลบรายการ "' + (sum[1] || '') + '" ?')) return;
        ar.splice(+r[1], 1); openIdx[sr.id] = -1; dirty = true; render(); return;
      }
      if (d.enrich) {
        var w = works[+d.enrich];
        draft.publications = draft.publications || [];
        draft.publications.unshift({ year: w.year, type: w.kind || 'journal', title: w.broken_title ? '' : w.title, authors: w.authors, venue: w.venue, doi: w.doi, role: w.role });
        tab = 'publications'; openIdx.publications = 0; dirty = true; render(); return;
      }
    });
    window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  }

  window.KHEditor = {
    mount: function (el, api) {
      A = api; root = el; bind(); load();
    },
    refresh: function () { load(); },
    reset: function () { draft = null; dirty = false; sha = null; root = null; }
  };
})();
