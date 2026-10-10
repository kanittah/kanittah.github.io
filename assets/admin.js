/* หน้า Admin ส่วนตัว — ข้อมูลเข้ารหัส AES-256-GCM ด้วยกุญแจที่สร้างจากรหัส 8 หลัก (PBKDF2-SHA256)
   - บันทึกในเครื่อง (localStorage) ทุกครั้งที่แก้ไข
   - ถ้าตั้งค่า GitHub token ไว้ จะซิงก์ไฟล์ data/vault.json (ที่เข้ารหัสแล้ว) ขึ้น GitHub ให้ใช้ได้ทุกเครื่อง
   - token เก็บเฉพาะในเครื่องนี้ (เข้ารหัสด้วยรหัสเดียวกัน) ไม่ถูกอัปโหลด */
(function () {
  'use strict';

  var ITER = 600000;
  var VAULT_PATH = 'data/vault.json';
  var LS_VAULT = 'kh_vault', LS_TOKEN = 'kh_gh', LS_FAIL = 'kh_fail';
  var IDLE_MS = 15 * 60 * 1000;

  var key = null, salt = null;     // อยู่ในหน่วยความจำเท่านั้น
  var data = null;                 // ข้อมูลที่ถอดรหัสแล้ว
  var token = '', remoteSha = null;
  var mode = 'unlock', firstPin = '';
  var idleTimer = null, syncTimer = null;

  var enc = new TextEncoder(), dec = new TextDecoder();
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toast(msg) {
    var el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('show'); }, 2000);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function uid() { return Math.random().toString(36).slice(2, 10); }

  // ---------- crypto ----------
  function b64(buf) {
    var bytes = new Uint8Array(buf), s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }
  function unb64(str) { var bin = atob(str), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  async function deriveKey(pin, saltBytes, iter) {
    var base = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: saltBytes, iterations: iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function encryptWith(k, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(JSON.stringify(obj)));
    return { iv: b64(iv), ct: b64(ct) };
  }
  async function decryptWith(k, rec) {
    var pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(rec.iv) }, k, unb64(rec.ct));
    return JSON.parse(dec.decode(pt));
  }
  async function sealVault() {
    var box = await encryptWith(key, data);
    return { v: 1, updated: new Date().toISOString(), kdf: 'PBKDF2-SHA256', iter: ITER, salt: b64(salt), iv: box.iv, ct: box.ct };
  }

  // ---------- GitHub sync ----------
  function repo() {
    var s = data && data.settings && data.settings.repo;
    if (s) return s;
    var m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (m) {
      var parts = location.pathname.split('/').filter(Boolean);
      var r = parts.length && !/\.html?$/.test(parts[0]) ? parts[0] : m[1] + '.github.io';
      return m[1] + '/' + r;
    }
    return 'kanittah/kanittah.github.io';
  }
  function gh(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign({ Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' }, opts.headers || {});
    return fetch('https://api.github.com/repos/' + repo() + path, opts);
  }
  async function fetchRemote() {
    try {
      if (token) {
        var r = await gh('/contents/' + VAULT_PATH + '?t=' + Date.now());
        if (r.status === 404) { remoteSha = null; return null; }
        if (!r.ok) throw new Error(r.status);
        var j = await r.json(); remoteSha = j.sha;
        return JSON.parse(atob(j.content.replace(/\n/g, '')));
      }
      var res = await fetch(VAULT_PATH + '?t=' + Date.now(), { cache: 'no-store' });
      return res.ok ? await res.json() : null;
    } catch (e) { return null; }
  }
  async function pushRemote(vault) {
    if (!token) return;
    setSync('sync', 'กำลังซิงก์…');
    try {
      if (remoteSha === null) await fetchRemote();
      var body = { message: 'admin: update private vault', content: btoa(JSON.stringify(vault, null, 1)) };
      if (remoteSha) body.sha = remoteSha;
      var r = await gh('/contents/' + VAULT_PATH, { method: 'PUT', body: JSON.stringify(body) });
      if (r.status === 409 || r.status === 422) { remoteSha = null; await fetchRemote(); body.sha = remoteSha; r = await gh('/contents/' + VAULT_PATH, { method: 'PUT', body: JSON.stringify(body) }); }
      if (!r.ok) throw new Error('GitHub ' + r.status);
      remoteSha = (await r.json()).content.sha;
      setSync('ok', 'ซิงก์แล้ว ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      setSync('err', 'ซิงก์ไม่สำเร็จ');
      toast('ซิงก์ GitHub ไม่สำเร็จ: ' + e.message);
    }
  }
  function setSync(cls, text) {
    var el = $('#syncState'); el.hidden = false; el.className = 'sync-state s-' + cls; el.textContent = text;
  }

  // ---------- save ----------
  async function save() {
    var vault = await sealVault();
    lsSet(LS_VAULT, JSON.stringify(vault));
    if (token) { clearTimeout(syncTimer); syncTimer = setTimeout(function () { pushRemote(vault); }, 1200); }
    else setSync('local', 'บันทึกในเครื่องนี้แล้ว');
  }

  // ---------- lock screen ----------
  function localVault() { try { return JSON.parse(lsGet(LS_VAULT) || 'null'); } catch (e) { return null; } }
  var candidate = null;

  async function showLock() {
    key = null; data = null; token = '';
    $('#panel').hidden = true; $('#panel').innerHTML = '';
    $('#lockBtn').hidden = true; $('#syncState').hidden = true;
    $('#lock').hidden = false;
    $('#pin').value = ''; paintPin(); $('#pinMsg').textContent = '';
    var local = localVault(), remote = await fetchRemote();
    candidate = [local, remote].filter(Boolean).sort(function (a, b) { return (b.updated || '').localeCompare(a.updated || ''); })[0] || null;
    mode = candidate ? 'unlock' : 'setup1';
    $('#lockTitle').textContent = candidate ? 'ใส่รหัส 8 หลัก' : 'ตั้งรหัส 8 หลัก';
    $('#lockHint').textContent = candidate ? 'พื้นที่ส่วนตัวของครูกิ๊ก' : 'ครั้งแรก — ตั้งรหัสตัวเลข 8 หลักสำหรับเข้าหน้านี้ (จำไว้ให้ดี ลืมแล้วกู้ข้อมูลไม่ได้)';
    setTimeout(function () { $('#pin').focus(); }, 50);
  }
  function paintPin() {
    var n = $('#pin').value.length;
    document.querySelectorAll('.pin-cells i').forEach(function (c, i) { c.classList.toggle('on', i < n); c.classList.toggle('cur', i === n); });
  }
  function lockedFor() {
    var f = JSON.parse(lsGet(LS_FAIL) || '{"n":0,"t":0}');
    return f.n >= 5 ? Math.max(0, f.t + 30000 * Math.pow(2, f.n - 5) - Date.now()) : 0;
  }
  function fail() {
    var f = JSON.parse(lsGet(LS_FAIL) || '{"n":0,"t":0}'); f.n++; f.t = Date.now(); lsSet(LS_FAIL, JSON.stringify(f));
  }

  async function onPin(pin) {
    var msg = $('#pinMsg');
    var wait = lockedFor();
    if (wait) { msg.textContent = 'ใส่ผิดหลายครั้ง กรุณารอ ' + Math.ceil(wait / 1000) + ' วินาที'; $('#pin').value = ''; paintPin(); return; }
    $('#pin').disabled = true; msg.textContent = mode === 'unlock' ? 'กำลังปลดล็อก…' : '';
    try {
      if (mode === 'setup1') {
        firstPin = pin; mode = 'setup2';
        $('#lockTitle').textContent = 'ยืนยันรหัสอีกครั้ง'; msg.textContent = '';
      } else if (mode === 'setup2') {
        if (pin !== firstPin) { mode = 'setup1'; $('#lockTitle').textContent = 'ตั้งรหัส 8 หลัก'; msg.textContent = 'รหัสไม่ตรงกัน ลองใหม่'; }
        else {
          salt = crypto.getRandomValues(new Uint8Array(16));
          key = await deriveKey(pin, salt, ITER);
          data = { bookmarks: [], notes: [], settings: {} };
          await save(); openPanel();
        }
        firstPin = '';
      } else {
        salt = unb64(candidate.salt);
        var k = await deriveKey(pin, salt, candidate.iter || ITER);
        try { data = await decryptWith(k, candidate); }
        catch (e) { fail(); msg.textContent = 'รหัสไม่ถูกต้อง'; return; }
        key = k; lsDel(LS_FAIL);
        data.bookmarks = data.bookmarks || []; data.notes = data.notes || []; data.settings = data.settings || {};
        lsSet(LS_VAULT, JSON.stringify(candidate));
        var tk = lsGet(LS_TOKEN);
        if (tk) { try { token = await decryptWith(key, JSON.parse(tk)); } catch (e) { token = ''; } }
        openPanel();
      }
    } finally {
      $('#pin').disabled = false; $('#pin').value = ''; paintPin();
      if (!$('#lock').hidden) $('#pin').focus();
    }
  }

  // ---------- panel ----------
  var open = { bm: true, notes: true, links: true, settings: false };
  var query = '';

  function openPanel() {
    $('#lock').hidden = true; $('#panel').hidden = false; $('#lockBtn').hidden = false;
    if (token) setSync('ok', 'เชื่อม GitHub แล้ว'); else setSync('local', 'เก็บในเครื่องนี้');
    render(); bumpIdle();
  }

  function siteBase() { return location.href.replace(/admin\.html.*$/, ''); }

  function section(id, num, kanji, title, count, body, extra) {
    return '<section class="adm-sec' + (open[id] ? ' open' : '') + '" data-sec="' + id + '">' +
      '<button class="adm-head" type="button" data-toggle="' + id + '"><span class="adm-num">' + num + '</span>' +
      '<span class="adm-kanji" aria-hidden="true">' + kanji + '</span><span class="adm-title">' + title + (count != null ? ' <b>(' + count + ')</b>' : '') + '</span>' +
      '<span class="adm-caret" aria-hidden="true">▾</span></button>' +
      (extra || '') + '<div class="adm-body">' + body + '</div></section>';
  }

  function render() {
    var base = siteBase();
    var bms = data.bookmarks.filter(function (b) {
      return !query || (b.title + ' ' + b.url).toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    var links = [
      ['🌐', 'เว็บไซต์ (English)', base],
      ['🇹🇭', 'เว็บไซต์ (ภาษาไทย)', base + '?lang=th'],
      ['📄', 'CV ภาษาอังกฤษ', base + '?lang=en#cv'],
      ['📄', 'CV ภาษาไทย', base + '?lang=th#cv'],
      ['🎬', 'โหมดนำเสนอ (แนะนำตัวนักศึกษา)', base + '?lang=th#present']
    ];
    var html = '<div class="adm-hello"><h1>สวัสดีค่ะ ครูกิ๊ก</h1><p class="muted">พื้นที่ส่วนตัวของครู — ข้อมูลในหน้านี้เข้ารหัสด้วยรหัส 8 หลักของครู</p></div>' +
      section('links', '01', '一', 'ลิงก์ด่วน · QUICK LINKS', null,
        '<div class="ql-grid">' + links.map(function (l) {
          return '<div class="ql"><span class="ql-ic">' + l[0] + '</span><div><strong>' + esc(l[1]) + '</strong><a href="' + esc(l[2]) + '" target="_blank" rel="noopener">' + esc(l[2]) + '</a></div>' +
            '<button class="icon-btn" type="button" data-copy="' + esc(l[2]) + '" title="คัดลอกลิงก์">⧉</button></div>';
        }).join('') + '</div>' +
        '<div class="ql-row"><a class="btn ghost" href="https://github.com/' + esc(repo()) + '/edit/main/content.yml" target="_blank" rel="noopener">✎ แก้ข้อมูลเว็บ (content.yml)</a>' +
        '<a class="btn ghost" href="https://github.com/' + esc(repo()) + '/actions/workflows/metrics.yml" target="_blank" rel="noopener">↻ อัปเดตแดชบอร์ดตอนนี้</a>' +
        '<button class="btn ghost" type="button" data-act="qr">▦ QR Code เว็บไซต์</button></div><div id="qrBox" class="qr-box" hidden></div>') +
      section('bm', '02', '二', 'เว็บโปรด · MY SYSTEMS', data.bookmarks.length,
        '<div class="bm-tools"><input class="adm-search" id="bmSearch" type="search" placeholder="ค้นหาเว็บโปรด…" value="' + esc(query) + '">' +
        '<button class="btn" type="button" data-act="addBm">+ เพิ่มเว็บโปรด</button></div>' +
        (bms.length ? '<div class="bm-grid">' + bms.map(function (b) {
          return '<div class="bm" data-id="' + b.id + '"><a class="bm-main" href="' + esc(b.url) + '" target="_blank" rel="noopener">' +
            '<strong><span class="bm-ic">' + esc(b.icon || '🚀') + '</span> ' + esc(b.title) + '</strong><span class="bm-url">' + esc(b.url) + '</span></a>' +
            '<button class="bm-btn" type="button" data-edit="' + b.id + '" title="แก้ไข" aria-label="แก้ไข ' + esc(b.title) + '">✎</button>' +
            '<button class="bm-btn" type="button" data-del="' + b.id + '" title="ลบ" aria-label="ลบ ' + esc(b.title) + '">✕</button></div>';
        }).join('') + '</div>' : '<p class="muted empty">' + (query ? 'ไม่พบเว็บที่ค้นหา' : 'ยังไม่มีเว็บโปรด — กด "+ เพิ่มเว็บโปรด"') + '</p>')) +
      section('notes', '03', '三', 'บันทึกส่วนตัว · NOTES', data.notes.length,
        '<div class="bm-tools"><button class="btn" type="button" data-act="addNote">+ เพิ่มบันทึก</button></div>' +
        (data.notes.length ? '<div class="note-grid">' + data.notes.map(function (n) {
          return '<article class="note"><header><strong>' + esc(n.title || 'ไม่มีหัวข้อ') + '</strong>' +
            '<span><button class="bm-btn" type="button" data-nedit="' + n.id + '" aria-label="แก้ไขบันทึก">✎</button>' +
            '<button class="bm-btn" type="button" data-ndel="' + n.id + '" aria-label="ลบบันทึก">✕</button></span></header>' +
            '<p>' + esc(n.body).replace(/\n/g, '<br>') + '</p><time>' + esc(new Date(n.updated).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })) + '</time></article>';
        }).join('') + '</div>' : '<p class="muted empty">ยังไม่มีบันทึก</p>') +
        '<p class="adm-warn">⚠ อย่าเก็บรหัสผ่านของระบบอื่นไว้ที่นี่ — ใช้ตัวจัดการรหัสผ่าน (เช่น iCloud Keychain, Google Password Manager) แทน</p>') +
      section('settings', '04', '四', 'ตั้งค่า · SETTINGS', null,
        '<div class="set-grid">' +
          '<div class="set"><h3>ซิงก์ข้ามเครื่องผ่าน GitHub</h3><p class="muted">ใส่ Fine-grained token ที่ให้สิทธิ์ <b>Contents: Read and write</b> เฉพาะ repo <code>' + esc(repo()) + '</code> — token เก็บเฉพาะเครื่องนี้และเข้ารหัสไว้</p>' +
            '<p class="set-state">' + (token ? '● เชื่อมแล้ว' : '○ ยังไม่เชื่อม (เก็บข้อมูลเฉพาะเครื่องนี้)') + '</p>' +
            '<div class="ql-row"><button class="btn" type="button" data-act="token">' + (token ? 'เปลี่ยน token' : 'ใส่ token') + '</button>' +
            (token ? '<button class="btn ghost" type="button" data-act="syncNow">↻ ซิงก์ตอนนี้</button><button class="btn ghost" type="button" data-act="untoken">ลบ token จากเครื่องนี้</button>' : '') +
            '<a class="btn ghost" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">สร้าง token ↗</a></div></div>' +
          '<div class="set"><h3>รหัส 8 หลัก</h3><p class="muted">ล็อกอัตโนมัติเมื่อไม่ใช้งาน 15 นาที</p><div class="ql-row"><button class="btn ghost" type="button" data-act="pin">เปลี่ยนรหัส</button></div></div>' +
          '<div class="set"><h3>สำรองข้อมูล</h3><p class="muted">ไฟล์สำรองถูกเข้ารหัส เปิดได้ด้วยรหัส 8 หลักเท่านั้น</p><div class="ql-row">' +
            '<button class="btn ghost" type="button" data-act="export">⬇ ดาวน์โหลดไฟล์สำรอง</button>' +
            '<label class="btn ghost">⬆ นำเข้าเว็บโปรด (JSON)<input type="file" id="importFile" accept="application/json,.json" hidden></label></div></div>' +
        '</div>');
    $('#panel').innerHTML = html;
  }

  // ---------- edit dialog ----------
  function ask(title, fields) {
    return new Promise(function (resolve) {
      var dlg = $('#editDlg');
      $('#editTitle').textContent = title;
      $('#editFields').innerHTML = fields.map(function (f) {
        var input = f.type === 'textarea'
          ? '<textarea name="' + f.name + '" rows="7"' + (f.required ? ' required' : '') + '>' + esc(f.value || '') + '</textarea>'
          : '<input name="' + f.name + '" type="' + (f.type || 'text') + '" value="' + esc(f.value || '') + '"' + (f.required ? ' required' : '') +
            (f.pattern ? ' pattern="' + f.pattern + '"' : '') + (f.max ? ' maxlength="' + f.max + '"' : '') + ' placeholder="' + esc(f.ph || '') + '" autocomplete="off">';
        return '<label><span>' + esc(f.label) + '</span>' + input + '</label>';
      }).join('');
      dlg.onclose = function () {
        if (dlg.returnValue !== 'save') return resolve(null);
        var out = {}; fields.forEach(function (f) { out[f.name] = dlg.querySelector('[name="' + f.name + '"]').value.trim(); });
        resolve(out);
      };
      dlg.returnValue = '';
      dlg.showModal();
      var first = dlg.querySelector('input,textarea'); if (first) first.focus();
    });
  }
  function normUrl(u) { return /^[a-z]+:\/\//i.test(u) ? u : 'https://' + u; }

  async function editBookmark(id) {
    var b = id ? data.bookmarks.filter(function (x) { return x.id === id; })[0] : {};
    var r = await ask(id ? 'แก้ไขเว็บโปรด' : 'เพิ่มเว็บโปรด', [
      { name: 'icon', label: 'ไอคอน (อีโมจิ)', value: b.icon || '🚀', max: 4 },
      { name: 'title', label: 'ชื่อ', value: b.title, required: true, ph: 'เช่น ระบบเจริญปัญญา' },
      { name: 'url', label: 'ลิงก์', value: b.url, required: true, ph: 'https://…' }
    ]);
    if (!r) return;
    r.url = normUrl(r.url);
    if (id) Object.assign(b, r); else data.bookmarks.push(Object.assign({ id: uid() }, r));
    await save(); render(); toast('บันทึกแล้ว');
  }
  async function editNote(id) {
    var n = id ? data.notes.filter(function (x) { return x.id === id; })[0] : {};
    var r = await ask(id ? 'แก้ไขบันทึก' : 'บันทึกใหม่', [
      { name: 'title', label: 'หัวข้อ', value: n.title },
      { name: 'body', label: 'ข้อความ', value: n.body, type: 'textarea', required: true }
    ]);
    if (!r) return;
    r.updated = new Date().toISOString();
    if (id) Object.assign(n, r); else data.notes.unshift(Object.assign({ id: uid() }, r));
    await save(); render(); toast('บันทึกแล้ว');
  }

  async function setToken() {
    var r = await ask('GitHub token', [{ name: 'token', label: 'Fine-grained personal access token', type: 'password', required: true, ph: 'github_pat_…' }]);
    if (!r) return;
    token = r.token;
    var test = await gh('');
    if (!test.ok) { token = ''; toast('token ใช้ไม่ได้กับ repo ' + repo() + ' (' + test.status + ')'); return; }
    lsSet(LS_TOKEN, JSON.stringify(await encryptWith(key, token)));
    remoteSha = null;
    var vault = await sealVault(); lsSet(LS_VAULT, JSON.stringify(vault)); await pushRemote(vault);
    render(); toast('เชื่อม GitHub สำเร็จ');
  }

  async function changePin() {
    var r = await ask('เปลี่ยนรหัส 8 หลัก', [
      { name: 'a', label: 'รหัสใหม่ (ตัวเลข 8 หลัก)', type: 'password', required: true, pattern: '[0-9]{8}', max: 8 },
      { name: 'b', label: 'ยืนยันรหัสใหม่', type: 'password', required: true, pattern: '[0-9]{8}', max: 8 }
    ]);
    if (!r) return;
    if (r.a !== r.b) { toast('รหัสไม่ตรงกัน'); return; }
    salt = crypto.getRandomValues(new Uint8Array(16));
    key = await deriveKey(r.a, salt, ITER);
    if (token) lsSet(LS_TOKEN, JSON.stringify(await encryptWith(key, token)));
    await save(); toast('เปลี่ยนรหัสแล้ว' + (token ? ' — เครื่องอื่นใช้รหัสใหม่ได้หลังซิงก์' : ''));
  }

  // ---------- events ----------
  function bumpIdle() { clearTimeout(idleTimer); if (key) idleTimer = setTimeout(function () { toast('ล็อกอัตโนมัติ'); showLock(); }, IDLE_MS); }

  function bind() {
    $('#pin').addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 8); paintPin();
      if (this.value.length === 8) onPin(this.value);
    });
    $('#pinForm').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#lockBtn').addEventListener('click', showLock);
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, bumpIdle, { passive: true }); });

    $('#panel').addEventListener('input', function (e) {
      if (e.target.id === 'bmSearch') {
        query = e.target.value; render();
        var s = $('#bmSearch'); s.focus(); s.setSelectionRange(s.value.length, s.value.length);
      }
    });
    $('#panel').addEventListener('change', async function (e) {
      if (e.target.id !== 'importFile' || !e.target.files[0]) return;
      try {
        var j = JSON.parse(await e.target.files[0].text());
        var list = Array.isArray(j) ? j : (j.bookmarks || j.systems || []);
        var n = 0;
        list.forEach(function (x) {
          var url = x.url || x.link || x.href, title = x.title || x.name;
          if (url && title) { data.bookmarks.push({ id: uid(), icon: x.icon || '🚀', title: String(title), url: normUrl(String(url)) }); n++; }
        });
        await save(); render(); toast('นำเข้า ' + n + ' รายการ');
      } catch (err) { toast('ไฟล์ไม่ถูกต้อง'); }
    });
    $('#panel').addEventListener('click', async function (e) {
      var t = e.target.closest('[data-toggle],[data-act],[data-edit],[data-del],[data-nedit],[data-ndel],[data-copy]');
      if (!t) return;
      var d = t.dataset;
      if (d.toggle) { open[d.toggle] = !open[d.toggle]; t.parentNode.classList.toggle('open'); return; }
      if (d.copy) { try { await navigator.clipboard.writeText(d.copy); toast('คัดลอกลิงก์แล้ว'); } catch (err) { prompt('คัดลอกลิงก์', d.copy); } return; }
      if (d.edit) return editBookmark(d.edit);
      if (d.nedit) return editNote(d.nedit);
      if (d.del) {
        var b = data.bookmarks.filter(function (x) { return x.id === d.del; })[0];
        if (b && confirm('ลบ "' + b.title + '" ?')) { data.bookmarks = data.bookmarks.filter(function (x) { return x !== b; }); await save(); render(); }
        return;
      }
      if (d.ndel) {
        if (confirm('ลบบันทึกนี้?')) { data.notes = data.notes.filter(function (x) { return x.id !== d.ndel; }); await save(); render(); }
        return;
      }
      switch (d.act) {
        case 'addBm': return editBookmark(null);
        case 'addNote': return editNote(null);
        case 'token': return setToken();
        case 'untoken': token = ''; lsDel(LS_TOKEN); render(); setSync('local', 'เก็บในเครื่องนี้'); return toast('ลบ token แล้ว');
        case 'syncNow': return pushRemote(await sealVault());
        case 'pin': return changePin();
        case 'export': {
          var v = await sealVault();
          var a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([JSON.stringify(v, null, 1)], { type: 'application/json' }));
          a.download = 'admin-backup-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
          return;
        }
        case 'qr': {
          var box = $('#qrBox'); box.hidden = !box.hidden;
          if (!box.hidden && !box.firstChild && window.QRCode) new QRCode(box, { text: siteBase(), width: 200, height: 200, colorDark: '#0d0b17', colorLight: '#ffffff' });
          return;
        }
      }
    });
  }

  if (!window.isSecureContext || !crypto.subtle) {
    document.querySelector('main').innerHTML = '<p class="error">หน้านี้ต้องเปิดผ่าน https (GitHub Pages) หรือ localhost เท่านั้น</p>';
    return;
  }
  bind();
  showLock();
})();
