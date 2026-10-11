/* ไฟล์นี้สร้างหน้าเว็บจาก content.yml — ปกติไม่ต้องแก้ไฟล์นี้ */
(function () {
  'use strict';

  var UI = {
    nav_dash: { th: 'แดชบอร์ด', en: 'Dashboard' },
    nav_admin: { th: 'Admin', en: 'Admin' },
    dash: { th: 'แดชบอร์ดผลงานวิชาการ', en: 'Research Dashboard' },
    kpi_works: { th: 'ผลงานในฐานข้อมูล', en: 'Indexed works' },
    kpi_cites: { th: 'การอ้างอิง', en: 'Citations' },
    kpi_h: { th: 'h-index', en: 'h-index' },
    kpi_scopus: { th: 'ผลงานใน Scopus', en: 'Scopus documents' },
    kpi_ieee: { th: 'ผลงานใน IEEE', en: 'IEEE papers' },
    kpi_projects: { th: 'โครงการวิจัย', en: 'Research projects' },
    chart_works: { th: 'ผลงานตีพิมพ์รายปี', en: 'Publications per year' },
    chart_cites: { th: 'การอ้างอิงรายปี', en: 'Citations per year' },
    unit_works: { th: 'ผลงาน', en: 'works' },
    unit_cites: { th: 'ครั้ง', en: 'citations' },
    as_table: { th: 'ดูเป็นตาราง', en: 'View as table' },
    year: { th: 'ปี', en: 'Year' },
    sources: { th: 'แหล่งข้อมูล', en: 'Data sources' },
    service: { th: 'บริการวิชาการ', en: 'Academic service' },
    kmutnb_db: { th: 'ฐานข้อมูลงานวิจัย มจพ.', en: 'KMUTNB Research DB' },
    as_of: { th: 'ข้อมูล ณ', en: 'as of' },
    output_mix: { th: 'ประเภทผลงาน', en: 'Output mix' },
    top_venues: { th: 'แหล่งตีพิมพ์หลัก', en: 'Top venues' },
    st_live: { th: 'เชื่อมต่ออัตโนมัติ', en: 'Auto-synced' },
    st_manual: { th: 'กรอกข้อมูลเอง', en: 'Entered manually' },
    st_off: { th: 'ยังไม่เชื่อมต่อ', en: 'Not connected' },
    open_profile: { th: 'เปิดโปรไฟล์', en: 'Open profile' },
    all_works: { th: 'ผลงานทั้งหมดที่พบในฐานข้อมูล', en: 'All works found in databases' },
    cited_n: { th: 'อ้างอิง', en: 'cited' },
    synced: { th: 'ข้อมูลอัปเดตล่าสุด', en: 'Data last updated' },
    pubs_auto: { th: 'รายการนี้อัปเดตอัตโนมัติทุกวันจาก OpenAlex / ORCID', en: 'This list updates automatically every day from OpenAlex / ORCID' },
    from_content: { th: 'นับจากข้อมูลในเว็บ', en: 'from site content' },
    nav_about: { th: 'ประวัติ', en: 'About' },
    nav_expertise: { th: 'ความเชี่ยวชาญ', en: 'Expertise' },
    nav_teaching: { th: 'งานสอน', en: 'Teaching' },
    nav_pubs: { th: 'ผลงานตีพิมพ์', en: 'Publications' },
    nav_projects: { th: 'โครงการวิจัย', en: 'Projects' },
    nav_awards: { th: 'รางวัล', en: 'Awards' },
    nav_contact: { th: 'ติดต่อ', en: 'Contact' },
    btn_cv: { th: 'ดาวน์โหลด CV (PDF)', en: 'Download CV (PDF)' },
    btn_present: { th: 'โหมดนำเสนอ', en: 'Presentation mode' },
    btn_share: { th: 'แชร์ / QR Code', en: 'Share / QR code' },
    stat_pubs: { th: 'ผลงานตีพิมพ์', en: 'Publications' },
    stat_scopus: { th: 'บทความใน Scopus', en: 'Scopus articles' },
    stat_projects: { th: 'โครงการวิจัย', en: 'Research projects' },
    stat_awards: { th: 'รางวัล', en: 'Awards' },
    about: { th: 'ประวัติโดยย่อ', en: 'About' },
    education: { th: 'การศึกษา', en: 'Education' },
    expertise: { th: 'ความเชี่ยวชาญ', en: 'Areas of Expertise' },
    teaching: { th: 'งานสอน', en: 'Teaching' },
    courses: { th: 'รายวิชาที่สอน', en: 'Courses' },
    materials: { th: 'เอกสารประกอบการสอน', en: 'Teaching materials' },
    open_doc: { th: 'เปิดเอกสาร', en: 'Open' },
    pubs: { th: 'ผลงานตีพิมพ์', en: 'Publications' },
    all: { th: 'ทั้งหมด', en: 'All' },
    journal: { th: 'บทความวารสาร', en: 'Journal articles' },
    conference: { th: 'การประชุมวิชาการ', en: 'Conference papers' },
    copy_cite: { th: 'คัดลอกอ้างอิง', en: 'Copy citation' },
    copied: { th: 'คัดลอกแล้ว', en: 'Copied' },
    role_first: { th: 'ผู้แต่งหลัก', en: 'First author' },
    role_corresponding: { th: 'ผู้ประพันธ์บรรณกิจ', en: 'Corresponding author' },
    role_co: { th: 'ผู้ร่วมแต่ง', en: 'Co-author' },
    projects: { th: 'โครงการวิจัยและบริการวิชาการ', en: 'Research & Academic Service Projects' },
    plead: { th: 'หัวหน้าโครงการ', en: 'Principal investigator' },
    pco: { th: 'ผู้ร่วมวิจัย', en: 'Co-researcher' },
    team: { th: 'คณะผู้วิจัย', en: 'Team' },
    ethics: { th: 'ผ่านการรับรองจริยธรรมการวิจัยในมนุษย์', en: 'Human research ethics approved' },
    awards: { th: 'รางวัลและเกียรติประวัติ', en: 'Awards & Honors' },
    contact: { th: 'ติดต่อ', en: 'Contact' },
    email: { th: 'อีเมล', en: 'Email' },
    phone: { th: 'โทรศัพท์', en: 'Phone' },
    office: { th: 'สถานที่ทำงาน', en: 'Office' },
    updated: { th: 'ข้อมูล ณ วันที่', en: 'Last updated' },
    edit: { th: 'แก้ไขข้อมูล', en: 'Edit content' },
    share_title: { th: 'แชร์เว็บไซต์นี้', en: 'Share this page' },
    copy_link: { th: 'คัดลอกลิงก์', en: 'Copy link' },
    save_qr: { th: 'บันทึก QR', en: 'Save QR' },
    close: { th: 'ปิด', en: 'Close' },
    share_hint: { th: 'ส่งลิงก์ #cv เพื่อเปิดหน้า CV โดยตรง หรือ #present เพื่อเปิดโหมดนำเสนอ', en: 'Add #cv to open the CV directly, or #present for presentation mode.' },
    cv_print: { th: 'พิมพ์ / บันทึกเป็น PDF', en: 'Print / Save as PDF' },
    cv_back: { th: 'กลับหน้าเว็บ', en: 'Back to site' },
    cv_title: { th: 'ประวัติและผลงานทางวิชาการ', en: 'Curriculum Vitae' },
    cv_position: { th: 'ตำแหน่งและสังกัด', en: 'Position & Affiliation' },
    cv_links: { th: 'ฐานข้อมูลนักวิจัย', en: 'Researcher profiles' },
    cv_online: { th: 'ฉบับออนไลน์ล่าสุด', en: 'Latest online version' },
    deck_hi: { th: 'สวัสดีค่ะ', en: 'Hello!' },
    deck_about: { th: 'รู้จักครู', en: 'About me' },
    deck_research: { th: 'ผลงานวิจัยเด่น', en: 'Selected research' },
    deck_numbers: { th: 'ผลงานโดยสรุป', en: 'At a glance' },
    deck_contact: { th: 'ติดต่อครู', en: 'Get in touch' },
    deck_hint: { th: '← → เปลี่ยนสไลด์ · F เต็มจอ · Esc ออก', en: '← → navigate · F fullscreen · Esc exit' },
    yaml_error: { th: 'ไฟล์ content.yml มีรูปแบบไม่ถูกต้อง — ตรวจย่อหน้า / เครื่องหมาย : ใกล้บรรทัดที่ระบุ', en: 'content.yml has a formatting error near the line below.' },
    load_error: { th: 'โหลด content.yml ไม่ได้ (ถ้าเปิดไฟล์จากเครื่องโดยตรง ให้เปิดผ่าน GitHub Pages หรือ local server)', en: 'Could not load content.yml.' }
  };

  var D = null;
  var M = null; // data/metrics.json (แดชบอร์ด)
  var K = null; // data/kmutnb.json (ระบบฐานข้อมูลงานวิจัย มจพ.)
  var lang = 'th';
  var pubFilter = 'all';
  var deckIndex = 0;

  // ---------- helpers ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // ข้อความที่เป็น {th, en} หรือข้อความธรรมดา
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v)) {
      var o = lang === 'th' ? 'en' : 'th';
      return v[lang] != null && v[lang] !== '' ? String(v[lang]) : (v[o] != null ? String(v[o]) : '');
    }
    return String(v);
  }
  function L(key) { return t(UI[key]); }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function paras(text) {
    return t(text).trim().split(/\n\s*\n/).map(function (p) {
      return '<p>' + esc(p.replace(/\s*\n\s*/g, ' ')) + '</p>';
    }).join('');
  }
  function boldNames(s) {
    var out = esc(s);
    arr(D.profile && D.profile.highlight_names).forEach(function (n) {
      if (!n) return;
      var re = new RegExp('(' + esc(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:,\\s*[A-Z]\\.)*)', 'g');
      out = out.replace(re, '<strong>$1</strong>');
    });
    return out;
  }
  function doiUrl(d) { return d ? (/^https?:/.test(d) ? d : 'https://doi.org/' + d) : ''; }
  // ไทยเขียนติดกัน (ผศ.ดร.ขนิษฐา) อังกฤษเว้นวรรค (Asst. Prof. Dr. Kanitta)
  function withPrefix(prefix) { var x = t(prefix); return x && lang === 'en' ? x + ' ' : x; }
  function fullName() { return withPrefix(D.profile.prefix_short) + t(D.profile.name); }
  function siteUrl() {
    var u = D.site && D.site.url;
    return u ? u : location.href.split('#')[0];
  }
  function editUrl() {
    var m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (!m) return '';
    var parts = location.pathname.split('/').filter(Boolean);
    var repo = parts.length && !/\.html?$/.test(parts[0]) ? parts[0] : m[1] + '.github.io';
    return 'https://github.com/' + m[1] + '/' + repo + '/edit/main/content.yml';
  }
  function latestDate() {
    var a = (D.site && D.site.updated) || '', b = (M && M.updated) ? M.updated.slice(0, 10) : '';
    return b > a ? b : a;
  }
  // ---------- แปลชื่อคน / ชื่อเรื่องภาษาไทย เมื่อแสดงเป็นภาษาอังกฤษ ----------
  var TH_RE = /[\u0e00-\u0e7f]/;
  var TRC = null;
  function trMap() {
    if (TRC && TRC.d === D) return TRC.m;
    var m = {};
    arr(D.translations).forEach(function (x) { if (x && x.th && x.en) m[String(x.th).trim()] = String(x.en).trim(); });
    TRC = { d: D, m: m };
    return m;
  }
  function trText(x) {
    if (lang !== 'en' || !x || !TH_RE.test(x)) return x;
    return trMap()[String(x).trim()] || x;
  }
  var TITLE_PRE = [['ศ.ดร.', 'Prof. Dr.'], ['รศ.ดร.', 'Assoc. Prof. Dr.'], ['ผศ.ดร.', 'Asst. Prof. Dr.'], ['อ.ดร.', 'Dr.'], ['ดร.', 'Dr.'],
    ['ศ.', 'Prof.'], ['รศ.', 'Assoc. Prof.'], ['ผศ.', 'Asst. Prof.'], ['อ.', '']];
  // รายชื่อคั่นด้วย , — keepTitles: แสดงตำแหน่งวิชาการ (ใช้กับคณะผู้วิจัย) / ไม่แสดง (ใช้กับรายชื่อผู้แต่ง)
  function trNames(x, keepTitles) {
    if (lang !== 'en' || !x || !TH_RE.test(x)) return x;
    return String(x).split(',').map(function (part) {
      var n = part.trim(), pre = '';
      TITLE_PRE.some(function (tp) { if (n.indexOf(tp[0]) === 0) { pre = tp[1]; n = n.slice(tp[0].length).trim(); return true; } return false; });
      var en = trMap()[n] || n;
      return (keepTitles && pre ? pre + ' ' : '') + en;
    }).join(', ');
  }
  function pubTitle(p) {
    if (lang === 'en' && TH_RE.test(p.title || '')) {
      var e = trMap()[String(p.title).trim()];
      if (e) return e + ' (in Thai)';
    }
    return p.title;
  }
  function projTitle(p) {
    var ti = p.title;
    if (ti && typeof ti === 'object') return lang === 'en' ? (ti.en || trText(ti.th) || '') : (ti.th || ti.en || '');
    return trText(ti);
  }
  var TH_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  function thaiDate(x) {
    if (lang !== 'en' || !x) return x;
    var m = String(x).match(/(\d{1,2})\s+(\S+)\s+(25\d\d)/);
    var mi = m ? TH_MONTHS.indexOf(m[2]) : -1;
    return mi < 0 ? x : new Date(+m[3] - 543, mi, +m[1]).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function cite(p) {
    var s = (p.authors ? trNames(p.authors) + ' ' : '') + '(' + p.year + '). ' + pubTitle(p) + '.';
    if (p.venue) s += ' ' + p.venue + (p.volume ? ', ' + p.volume : '') + (p.pages ? ', ' + p.pages : '') + '.';
    if (p.doi) s += ' ' + doiUrl(p.doi);
    return s;
  }
  // รวมผลงาน: ที่กรอกเองใน content.yml + ที่ดึงอัตโนมัติจากฐานข้อมูล (ไม่ซ้ำกัน)
  function normT(x) { return String(x || '').toLowerCase().replace(/[^a-z0-9\u0e00-\u0e7f]/g, '').slice(0, 60); }
  function niceTitle(x) {
    x = String(x || '');
    return !TH_RE.test(x) && /[A-Z]{4}/.test(x) && x === x.toUpperCase() ? x.charAt(0) + x.slice(1).toLowerCase() : x;
  }
  var pubCache = null;
  function allPubs() {
    if (pubCache) return pubCache;
    var list = arr(D.publications).map(function (p) { return Object.assign({}, p); });
    var byDoi = {}, byT = {};
    list.forEach(function (p) { if (p.doi) byDoi[String(p.doi).toLowerCase()] = p; byT[normT(p.title)] = p; });
    var hide = arr(D.hide_works).map(function (h) { return normT(h); });
    arr(src('openalex').works).forEach(function (w) {
      var m = (w.doi && byDoi[String(w.doi).toLowerCase()]) || byT[normT(w.title)];
      if (m) { m.cited = w.cited; if (!m.doi && w.doi) m.doi = w.doi; if (!m.venue && w.venue) m.venue = w.venue; return; }
      if (w.broken_title || !w.title) return;
      if (hide.indexOf(normT(w.doi)) > -1 || hide.indexOf(normT(w.title)) > -1) return;
      list.push({ year: w.year, type: w.kind || 'journal', title: niceTitle(w.title), authors: w.authors, venue: w.venue,
        doi: w.doi, url: w.doi ? '' : w.url, role: w.role, cited: w.cited, ieee: w.ieee, auto: true });
    });
    var seen = {};
    list.forEach(function (p) { seen[normT(p.title)] = 1; });
    arr(K && K.publications).forEach(function (k) {
      var key = normT(k.title);
      if (!k.title || seen[key] || hide.indexOf(key) > -1) return;
      seen[key] = 1;
      list.push({ year: k.year, type: k.type, title: niceTitle(k.title), authors: k.authors, src: 'kmutnb', auto: true });
    });
    pubCache = list;
    return list;
  }
  // โครงการวิจัย: ที่กรอกใน content.yml + ที่มีในระบบ มจพ. แต่ยังไม่ได้กรอก
  function titleKeys(t) { return t && typeof t === 'object' ? [normT(t.th), normT(t.en)] : [normT(t)]; }
  function allProjects() {
    var list = arr(D.projects).slice(), seen = {};
    list.forEach(function (p) { titleKeys(p.title).forEach(function (k) { if (k) seen[k] = 1; }); });
    arr(K && K.projects).forEach(function (k) {
      if (!k.title || seen[normT(k.title)]) return;
      seen[normT(k.title)] = 1;
      list.push({ year: k.year, title: /[\u0e00-\u0e7f]/.test(k.title) ? { th: k.title } : { en: k.title }, funder: k.funder,
        team: k.team, role: k.role, kind: k.kind === 'service' ? 'service' : undefined, src: 'kmutnb' });
    });
    return list;
  }
  function allAwards() {
    var list = arr(D.awards).slice();
    var txt = list.map(function (a) { return titleKeys(a.detail).concat(titleKeys(a.title)).join('|'); }).join(' ');
    arr(K && K.awards).forEach(function (k) {
      if (txt.indexOf(normT(k.work).slice(0, 30)) > -1 || txt.indexOf(normT(k.title).slice(0, 20)) > -1) return;
      list.push({ year: k.year, title: k.title, detail: k.work + (k.place ? ' — ' + k.place : '') });
    });
    return list;
  }
  function sortedPubs() {
    return allPubs().slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
  }
  function src(name) { return (M && M.sources && M.sources[name]) || {}; }
  function stats() {
    var pubs = allPubs(), oa = src('openalex');
    if (oa.ok) return [
      { n: oa.works_count, k: 'kpi_works' },
      { n: oa.citations, k: 'kpi_cites' },
      { n: allProjects().length, k: 'stat_projects' },
      { n: allAwards().length, k: 'stat_awards' }
    ];
    return [
      { n: pubs.length, k: 'stat_pubs' },
      { n: pubs.filter(function (p) { return /scopus/i.test(p.index || ''); }).length, k: 'stat_scopus' },
      { n: allProjects().length, k: 'stat_projects' },
      { n: allAwards().length, k: 'stat_awards' }
    ];
  }
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }
  function copy(text) {
    var done = function () { toast(L('copied')); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove();
    }
  }
  function badge(text, cls) { return text ? '<span class="badge ' + (cls || '') + '">' + esc(text) + '</span>' : ''; }

  // ---------- main page ----------
  var SECTIONS = [
    ['dashboard', 'nav_dash'], ['about', 'nav_about'], ['expertise', 'nav_expertise'], ['teaching', 'nav_teaching'],
    ['publications', 'nav_pubs'], ['projects', 'nav_projects'], ['awards', 'nav_awards'], ['contact', 'nav_contact']
  ];

  function renderNav() {
    $('#nav').innerHTML = SECTIONS.map(function (s) {
      return '<a href="#' + s[0] + '">' + esc(L(s[1])) + '</a>';
    }).join('') + '<a class="nav-admin" href="admin.html">🔒 ' + esc(L('nav_admin')) + '</a>';
    $('[data-bind="brand"]').textContent = fullName();
  }

  function renderHero() {
    var p = D.profile;
    return '<section class="hero"><span class="slash" aria-hidden="true"></span><div class="wrap hero-in">' +
      '<div class="hero-text">' +
        (p.nickname ? '<p class="eyebrow">' + esc(t(p.nickname)) + '</p>' : '') +
        '<h1><span class="prefix">' + esc(t(p.prefix)) + '</span>' + esc(t(p.name)) + '</h1>' +
        '<p class="alt-name">' + esc(lang === 'th' ? [p.prefix.en, p.name.en].filter(Boolean).join(' ') : (p.prefix.th || '') + (p.name.th || '')) + '</p>' +
        '<p class="affil">' + esc(t(p.position)) + '<br>' + esc(t(p.faculty)) + ' ' + esc(t(p.university)) + '</p>' +
        '<p class="tagline">' + esc(t(p.tagline)) + '</p>' +
        '<div class="actions">' +
          '<a class="btn" href="#cv">' + esc(L('btn_cv')) + '</a>' +
          '<a class="btn ghost" href="#present">' + esc(L('btn_present')) + '</a>' +
          '<button class="btn ghost" type="button" data-action="share">' + esc(L('btn_share')) + '</button>' +
        '</div>' +
      '</div>' +
      '<figure class="hero-photo"><span class="fx-ticks" aria-hidden="true"></span><span class="fx-ring" aria-hidden="true"></span><span class="fx-ring fx-r2" aria-hidden="true"></span><span class="fx-orbit" aria-hidden="true"></span><span class="fx-orbit fx-o2" aria-hidden="true"></span><img src="' + esc(p.photo_cutout || p.photo) + '" alt="' + esc(fullName()) + '" width="646" height="644"></figure>' +
    '</div></section>';
  }

  var KANJI = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  function head(id, key, num) {
    return '<header class="sec-head"><span class="sec-num" aria-hidden="true"><b>' + (KANJI[+num] || '') + '</b><i>' + num + '</i></span><h2>' + esc(L(key)) + '</h2></header>';
  }

  function renderAbout() {
    return '<section id="about" class="sec"><div class="wrap">' + head('about', 'about', '02') +
      '<div class="about-grid"><div class="prose">' + paras(D.about) + '</div>' +
      '<div><h3 class="h3">' + esc(L('education')) + '</h3><ol class="timeline">' +
      arr(D.education).map(function (e) {
        return '<li><span class="tl-year">' + esc(t(e.year)) + '</span><div><strong>' + esc(t(e.degree)) + '</strong> ' +
          esc(t(e.field)) + '<br><span class="muted">' + esc(t(e.school)) + '</span></div></li>';
      }).join('') + '</ol></div></div></div></section>';
  }

  function renderExpertise() {
    return '<section id="expertise" class="sec alt"><div class="wrap">' + head('expertise', 'expertise', '03') +
      '<div class="cards">' + arr(D.expertise).map(function (x) {
        return '<article class="card"><div class="card-icon" aria-hidden="true">' + esc(x.icon || '•') + '</div><h3>' +
          esc(t(x.title)) + '</h3><p>' + esc(t(x.desc)) + '</p></article>';
      }).join('') + '</div></div></section>';
  }

  function renderTeaching() {
    var T = D.teaching || {};
    return '<section id="teaching" class="sec"><div class="wrap">' + head('teaching', 'teaching', '04') +
      '<div class="teach-grid"><div><h3 class="h3">' + esc(L('courses')) + '</h3><ul class="course-list">' +
      arr(T.courses).map(function (c) {
        return '<li><span class="code">' + esc(c.code) + '</span><div><strong>' + esc(t(c.name)) + '</strong>' +
          (c.level ? '<span class="muted"> · ' + esc(t(c.level)) + '</span>' : '') + '</div></li>';
      }).join('') + '</ul></div>' +
      '<div><h3 class="h3">' + esc(L('materials')) + '</h3>' + arr(T.materials).map(function (m) {
        return '<article class="material">' + (m.cover ? '<img src="' + esc(m.cover) + '" alt="" loading="lazy">' : '') +
          '<div><h4>' + esc(t(m.title)) + '</h4><p class="muted">' + esc(t(m.desc)) + '</p>' +
          (m.url ? '<a class="link" href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(L('open_doc')) + ' →</a>' : '') +
          '</div></article>';
      }).join('') + '</div></div></div></section>';
  }

  function pubItem(p, i) {
    var role = p.role ? L('role_' + p.role) : '';
    return '<li class="pub" data-type="' + esc(p.type || '') + '">' +
      '<span class="pub-year">' + esc(p.year) + '</span><div class="pub-body">' +
      '<h3 class="pub-title">' + esc(pubTitle(p)) + '</h3>' +
      (p.authors ? '<p class="pub-authors">' + boldNames(trNames(p.authors)) + '</p>' : '') +
      (p.venue ? '<p class="pub-venue"><em>' + esc(p.venue) + '</em>' + (p.volume ? ', ' + esc(p.volume) : '') + (p.pages ? ', ' + esc(p.pages) : '') + '</p>' : '') +
      '<div class="pub-meta">' + badge(p.index, /scopus/i.test(p.index || '') ? 'b-scopus' : 'b-tci') + badge(role, 'b-role') +
        (p.award ? badge('🏆 ' + p.award, 'b-award') : '') +
        (p.ieee ? badge('IEEE', 'b-tci') : '') +
        (p.cited ? badge(L('cited_n') + ' ' + p.cited, 'b-cite') : '') +
        (p.doi ? '<a class="link" href="' + esc(doiUrl(p.doi)) + '" target="_blank" rel="noopener">DOI</a>' : '') +
        (p.url ? '<a class="link" href="' + esc(p.url) + '" target="_blank" rel="noopener">PDF</a>' : '') +
        '<button class="link" type="button" data-cite="' + i + '">' + esc(L('copy_cite')) + '</button>' +
      '</div></div></li>';
  }

  function renderPubs() {
    var pubs = sortedPubs();
    var types = [['all', 'all'], ['journal', 'journal'], ['conference', 'conference']];
    return '<section id="publications" class="sec alt"><div class="wrap">' + head('publications', 'pubs', '05') +
      '<div class="filters" role="tablist">' + types.map(function (ty) {
        var n = ty[0] === 'all' ? pubs.length : pubs.filter(function (p) { return p.type === ty[0]; }).length;
        return '<button type="button" role="tab" class="filter' + (pubFilter === ty[0] ? ' on' : '') + '" data-filter="' + ty[0] + '" aria-selected="' + (pubFilter === ty[0]) + '">' +
          esc(L(ty[1])) + ' <span>' + n + '</span></button>';
      }).join('') + '</div>' +
      (src('openalex').ok ? '<p class="auto-note"><span class="live-dot" aria-hidden="true"></span>' + esc(L('pubs_auto')) + '</p>' : '') +
      '<ol class="pubs">' + pubs.map(pubItem).join('') + '</ol>' +
      linksRow() + '</div></section>';
  }

  function linksRow() {
    var ls = arr(D.links);
    if (!ls.length) return '';
    return '<div class="ext-links">' + ls.map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener"><strong>' + esc(l.label) + '</strong>' +
        (l.note ? '<span>' + esc(t(l.note)) + '</span>' : '') + '</a>';
    }).join('') + '</div>';
  }

  function renderProjects() {
    var ps = allProjects().slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    return '<section id="projects" class="sec"><div class="wrap">' + head('projects', 'projects', '06') +
      '<ol class="projects">' + ps.map(function (p) {
        var th = p.title && p.title.th, en = p.title && p.title.en;
        var main = projTitle(p), sub = lang === 'th' && th && en ? en : '';
        return '<li class="project"><span class="pub-year">' + esc(p.year) + '</span><div>' +
          '<h3>' + esc(main) + '</h3>' + (sub ? '<p class="muted small">' + esc(sub) + '</p>' : '') +
          '<p class="proj-meta">' + esc(trText(t(p.funder))) + '</p>' +
          (p.team ? '<p class="proj-team"><span class="muted">' + esc(L('team')) + ':</span> ' + boldNames(trNames(p.team, true)) + '</p>' : '') +
          '<div class="pub-meta">' + badge(p.role === 'lead' ? L('plead') : L('pco'), p.role === 'lead' ? 'b-lead' : 'b-role') +
          (p.kind === 'service' ? badge(L('service'), 'b-tci') : '') +
          (p.ethics ? badge('✓ ' + L('ethics') + ' · ' + p.ethics, 'b-ethics') : '') + '</div>' +
          '</div></li>';
      }).join('') + '</ol></div></section>';
  }

  function renderAwards() {
    return '<section id="awards" class="sec alt"><div class="wrap">' + head('awards', 'awards', '07') +
      '<div class="awards">' + allAwards().map(function (a) {
        return '<article class="award"><div class="award-mark" aria-hidden="true">🏆</div><div><span class="award-year">' + esc(a.year) +
          '</span><h3>' + esc(t(a.title)) + '</h3><p>' + esc(t(a.detail)) + '</p></div></article>';
      }).join('') + '</div></div></section>';
  }

  function renderContact() {
    var c = D.contact || {};
    var edit = editUrl();
    return '<section id="contact" class="sec"><div class="wrap">' + head('contact', 'contact', '08') +
      '<div class="contact-grid">' +
        (c.email ? '<a class="contact" href="mailto:' + esc(c.email) + '"><span>' + esc(L('email')) + '</span><strong>' + esc(c.email) + '</strong></a>' : '') +
        (c.phone ? '<a class="contact" href="tel:' + esc(String(c.phone).replace(/[^\d+]/g, '')) + '"><span>' + esc(L('phone')) + '</span><strong>' + esc(c.phone) + '</strong></a>' : '') +
        (c.office ? '<div class="contact"><span>' + esc(L('office')) + '</span><strong>' + esc(t(c.office)) + '</strong></div>' : '') +
      '</div>' + linksRow() + '</div></section>' +
      '<footer class="footer"><div class="wrap footer-in"><span>© ' + new Date().getFullYear() + ' ' + esc(fullName()) + '</span>' +
      '<span>' + esc(L('updated')) + ' ' + esc(latestDate()) +
      (edit ? ' · <a href="' + esc(edit) + '" target="_blank" rel="noopener">' + esc(L('edit')) + '</a>' : '') + '</span></div></footer>';
  }


  // ---------- dashboard ----------
  function fmtDate(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return iso.slice(0, 10); }
  }
  function yearRows() {
    var rows = arr(src('openalex').by_year);
    if (!rows.length) {
      var m = {};
      arr(D.publications).forEach(function (p) { if (p.year) m[p.year] = (m[p.year] || 0) + 1; });
      rows = Object.keys(m).map(function (y) { return { year: +y, works: m[y], citations: null }; });
    }
    if (!rows.length) return [];
    var ys = rows.map(function (r) { return r.year; });
    var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), out = [];
    for (var y = lo; y <= hi; y++) {
      var r = rows.filter(function (x) { return x.year === y; })[0];
      out.push({ year: y, works: r ? r.works : 0, citations: r ? r.citations : 0 });
    }
    return out;
  }
  // กราฟแท่งชุดเดียว (สีเดียว) แกนเดียว พร้อม tooltip
  function barChart(rows, key, cls, unitKey) {
    var W = 560, H = 230, ml = 38, mr = 8, mt = 24, mb = 32;
    var max = Math.max.apply(null, rows.map(function (r) { return r[key] || 0; }).concat([1]));
    var step = max <= 5 ? 1 : max <= 10 ? 2 : max <= 25 ? 5 : Math.ceil(max / 5 / 5) * 5;
    var top = Math.ceil(max / step) * step;
    var iw = W - ml - mr, ih = H - mt - mb, bw = iw / rows.length, gap = Math.max(2, bw * 0.28);
    var y = function (v) { return mt + ih - (v / top) * ih; };
    var g = '';
    for (var v = 0; v <= top; v += step) {
      g += '<line class="ch-grid" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>' +
        '<text class="ch-axis" x="' + (ml - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
    }
    var maxIdx = -1, best = -1;
    rows.forEach(function (r, i) { if ((r[key] || 0) >= best && r[key]) { best = r[key]; maxIdx = i; } });
    var bars = rows.map(function (r, i) {
      var val = r[key] || 0, x = ml + i * bw + gap / 2, w = bw - gap, yy = y(val), h = mt + ih - yy;
      var rad = Math.min(4, w / 2, h);
      var path = h > 0 ? 'M' + x + ',' + (mt + ih) + 'V' + (yy + rad) + 'Q' + x + ',' + yy + ' ' + (x + rad) + ',' + yy +
        'H' + (x + w - rad) + 'Q' + (x + w) + ',' + yy + ' ' + (x + w) + ',' + (yy + rad) + 'V' + (mt + ih) + 'Z' : '';
      var tip = r.year + ' · ' + val + ' ' + L(unitKey);
      return '<g class="ch-bar" tabindex="0" data-tip="' + esc(tip) + '"><title>' + esc(tip) + '</title>' +
        '<rect class="ch-hit" x="' + (ml + i * bw) + '" y="' + mt + '" width="' + bw + '" height="' + ih + '"/>' +
        (path ? '<path class="' + cls + ' grow-y" style="--d:' + (i * 70) + 'ms" d="' + path + '"/>' : '') +
        (i === maxIdx || (i === rows.length - 1 && val) ? '<text class="ch-val" x="' + (x + w / 2) + '" y="' + (yy - 6) + '" text-anchor="middle">' + val + '</text>' : '') +
        '<text class="ch-axis" x="' + (x + w / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + r.year + '</text></g>';
    }).join('');
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(L(key === 'works' ? 'chart_works' : 'chart_cites')) + '">' +
      g + '<line class="ch-base" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + (mt + ih) + '" y2="' + (mt + ih) + '"/>' + bars + '</svg>';
  }

  function hud(code, title, body, cls) {
    return '<div class="hud ' + (cls || '') + '"><div class="hud-head"><span class="hud-code">' + esc(code) + '</span><span class="hud-title">' + esc(title) + '</span></div>' + body + '</div>';
  }
  function countEl(n, cls) {
    var num = typeof n === 'number' ? n : parseFloat(n);
    return isNaN(num) ? '<span class="' + (cls || '') + '">' + esc(n) + '</span>' : '<span class="count ' + (cls || '') + '" data-to="' + num + '">' + num + '</span>';
  }
  // เส้นแนวโน้ม (การอ้างอิงรายปี) — เส้นเดียว สีเดียว
  function sparkline(rows, key) {
    var W = 420, H = 96, pad = 8, n = rows.length;
    if (n < 2) return '';
    var max = Math.max.apply(null, rows.map(function (r) { return r[key] || 0; }).concat([1]));
    var pts = rows.map(function (r, i) { return [pad + i * (W - 2 * pad) / (n - 1), H - pad - (r[key] || 0) / max * (H - 2 * pad - 14)]; });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('');
    var area = line + 'L' + pts[n - 1][0] + ',' + (H - pad) + 'L' + pts[0][0] + ',' + (H - pad) + 'Z';
    var mi = 0; rows.forEach(function (r, i) { if ((r[key] || 0) > (rows[mi][key] || 0)) mi = i; });
    return '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
      '<defs><linearGradient id="spk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".45"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>' +
      '<path class="spark-area" d="' + area + '" fill="url(#spk)"/><path class="spark-line" d="' + line + '" pathLength="1"/>' +
      '<circle class="spark-dot" cx="' + pts[mi][0] + '" cy="' + pts[mi][1] + '" r="4.5"/></svg>' +
      '<div class="spark-axis"><span>' + rows[0].year + '</span><span>' + rows[mi].year + ' · ' + (rows[mi][key] || 0) + '</span><span>' + rows[n - 1].year + '</span></div>';
  }
  // โดนัท 2 ส่วน พร้อมป้ายกำกับตรงตัว
  function donut(parts, total) {
    var R = 54, C = 2 * Math.PI * R, off = 0, gap = total > 0 ? 3 : 0;
    var arcs = parts.map(function (p) {
      var len = total ? p.n / total * C : 0, seg = Math.max(0, len - gap);
      var el = '<circle class="dn-seg ' + p.cls + '" r="' + R + '" cx="70" cy="70" stroke-dasharray="' + seg.toFixed(2) + ' ' + (C - seg).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '"><title>' + esc(p.label + ' · ' + p.n) + '</title></circle>';
      off += len; return el;
    }).join('');
    return '<div class="donut-wrap"><svg class="donut" viewBox="0 0 140 140" role="img" aria-label="' + esc(parts.map(function (p) { return p.label + ' ' + p.n; }).join(', ')) + '">' +
      '<circle class="dn-track" r="' + R + '" cx="70" cy="70"/><g transform="rotate(-90 70 70)">' + arcs + '</g>' +
      '<text x="70" y="68" text-anchor="middle" class="dn-total">' + total + '</text><text x="70" y="88" text-anchor="middle" class="dn-cap">' + esc(L('unit_works')) + '</text></svg>' +
      '<ul class="dn-legend">' + parts.map(function (p) {
        return '<li><i class="' + p.cls + '"></i><span>' + esc(p.label) + '</span><b>' + p.n + '</b><em>' + (total ? Math.round(p.n / total * 100) : 0) + '%</em></li>';
      }).join('') + '</ul></div>';
  }
  function hbars(items) {
    var max = Math.max.apply(null, items.map(function (x) { return x.n; }).concat([1]));
    return '<ol class="hbars">' + items.map(function (x, i) {
      return '<li><span class="hb-label" title="' + esc(x.label) + '">' + esc(x.label) + '</span><span class="hb-track"><span class="hb-fill grow-x" style="--w:' + (x.n / max * 100).toFixed(1) + '%;--d:' + (i * 80) + 'ms"></span></span><b>' + x.n + '</b></li>';
    }).join('') + '</ol>';
  }

  function renderDashboard() {
    var oa = src('openalex'), sc = src('scopus'), gs = src('scholar'), ie = src('ieee');
    var man = (D.manual_metrics && D.manual_metrics.google_scholar) || {};
    var ids = D.ids || {};
    var pubs = arr(D.publications);
    var works = arr(oa.works).filter(function (w) { return !w.broken_title; });
    var scopusFromContent = pubs.filter(function (p) { return /scopus/i.test(p.index || ''); }).length;
    var rows = yearRows();
    var hasCites = rows.some(function (r) { return r.citations; });

    // ประเภทผลงาน
    var nJ, nC;
    if (works.length) {
      nJ = works.filter(function (w) { return w.type === 'article'; }).length;
      nC = works.filter(function (w) { return /conference|proceedings/.test(w.type); }).length;
    } else {
      nJ = pubs.filter(function (p) { return p.type === 'journal'; }).length;
      nC = pubs.length - nJ;
    }
    var nOther = (works.length || pubs.length) - nJ - nC;
    var parts = [{ label: L('journal'), n: nJ, cls: 'c-pink' }, { label: L('conference'), n: nC + Math.max(0, nOther), cls: 'c-cyan' }];

    // แหล่งตีพิมพ์ที่ตีพิมพ์บ่อย
    var vm = {};
    (works.length ? works : pubs).forEach(function (w) { var v = w.venue; if (v) vm[v] = (vm[v] || 0) + 1; });
    var venues = Object.keys(vm).map(function (k) { return { label: k, n: vm[k] }; })
      .sort(function (a, b) { return b.n - a.n || a.label.localeCompare(b.label); }).slice(0, 6);

    var dash = '—';
    var tiles = [
      { k: 'kpi_works', n: oa.ok ? oa.works_count : pubs.length, s: oa.ok ? 'OPENALEX' : 'SITE', g: '文', c: 'k-cyan' },
      { k: 'kpi_scopus', n: sc.ok ? sc.documents : scopusFromContent, s: sc.ok ? 'SCOPUS API' : 'SITE', g: '◆', c: 'k-pink' },
      { k: 'kpi_ieee', n: ie.ok ? ie.works_count : dash, s: 'DOI 10.1109', g: '⚡', c: 'k-yellow' },
      { k: 'kpi_projects', n: allProjects().length, s: K ? 'KMUTNB DB' : 'SITE', g: '研', c: 'k-cyan' }
    ];
    var gsHas = gs.ok || (man.citations !== '' && man.citations != null);
    var srcCards = [
      { name: 'Scopus', st: sc.ok ? 'live' : 'off', url: sc.url || (ids.scopus ? 'https://www.scopus.com/authid/detail.uri?authorId=' + ids.scopus : ''),
        line: sc.ok ? sc.documents + ' docs · ' + sc.citations + ' cit · h ' + sc.h_index : (ids.scopus ? 'ID ' + ids.scopus : '') },
      { name: 'Google Scholar', st: gs.ok ? 'live' : (gsHas ? 'manual' : 'off'), url: gs.url || (ids.google_scholar ? 'https://scholar.google.com/citations?user=' + ids.google_scholar : ''),
        line: gs.ok ? gs.citations + ' cit · h ' + gs.h_index : (gsHas ? man.citations + ' cit' + (man.h_index ? ' · h ' + man.h_index : '') : '') },
      { name: 'IEEE Xplore', st: ie.ok ? 'live' : 'off', url: ie.url, line: ie.ok ? ie.works_count + ' ' + L('unit_works') : '' },
      { name: 'OpenAlex', st: oa.ok ? 'live' : 'off', url: oa.url, line: oa.ok ? oa.works_count + ' ' + L('unit_works') + ' · ' + oa.citations + ' cit' : '' },
      { name: L('kmutnb_db'), st: K ? 'manual' : 'off', url: 'https://research.kmutnb.ac.th/researcher/',
        line: K ? arr(K.projects).length + ' ' + L('kpi_projects').toLowerCase() + ' · ' + arr(K.publications).length + ' ' + L('unit_works') + (K.printed ? ' · ' + L('as_of') + ' ' + thaiDate(K.printed) : '') : '' },
      { name: 'ORCID', st: ids.orcid ? 'live' : 'off', url: ids.orcid ? 'https://orcid.org/' + ids.orcid : '', line: ids.orcid || '' }
    ];
    var stLabel = { live: 'st_live', manual: 'st_manual', off: 'st_off' };

    var hero = hud('SYS.01', L('kpi_cites'),
      '<div class="cite-hero"><div class="cite-big">' + countEl(oa.ok ? oa.citations : dash, 'big-num') + '</div>' +
      '<div class="cite-side"><div class="ring" style="--p:' + Math.min(100, (oa.h_index || 0) * 10) + '"><span>' + countEl(oa.ok ? oa.h_index : dash) + '</span><small>h-index</small></div>' +
      '<div class="mini"><span>i10</span><b>' + esc(oa.ok ? oa.i10_index : dash) + '</b></div></div></div>' +
      (hasCites ? '<div class="spark-wrap">' + sparkline(rows, 'citations') + '</div>' : ''), 'hud-hero');

    var grid = '<div class="tile-grid">' + tiles.map(function (k, i) {
      return '<div class="tile ' + k.c + '" style="--d:' + (i * 90) + 'ms"><span class="tile-glyph" aria-hidden="true">' + k.g + '</span>' +
        '<span class="tile-label">' + esc(L(k.k)) + '</span>' + countEl(k.n, 'tile-num') + '<span class="tile-src">' + esc(k.s) + '</span></div>';
    }).join('') + '</div>';

    return '<section id="dashboard" class="sec dash"><div class="wrap">' + head('dashboard', 'dash', '01') +
      '<div class="dash-bar"><span class="dash-sync"><span class="live-dot" aria-hidden="true"></span>' + esc(M && M.updated ? L('synced') + ' ' + fmtDate(M.updated) : L('from_content')) + '</span>' +
        '<span class="dash-id">ORCID ' + esc(ids.orcid || '—') + '</span></div>' +
      '<div class="dash-grid">' +
        '<div class="dg-hero">' + hero + '</div>' +
        '<div class="dg-tiles">' + grid + '</div>' +
        (rows.length ? '<div class="dg-bars">' + hud('SYS.02', L('chart_works'), barChart(rows, 'works', 'bar-cyan', 'unit_works')) + '</div>' : '') +
        '<div class="dg-donut">' + hud('SYS.03', L('output_mix'), donut(parts, parts[0].n + parts[1].n)) + '</div>' +
        (venues.length ? '<div class="dg-venues">' + hud('SYS.04', L('top_venues'), hbars(venues)) + '</div>' : '') +
        '<div class="dg-src">' + hud('SYS.05', L('sources'), '<ul class="src-list">' + srcCards.map(function (c) {
          var inner = '<span class="src-dot st-' + c.st + '" aria-hidden="true"></span><span class="src-name">' + esc(c.name) + '</span>' +
            '<span class="src-st st-' + c.st + '">' + esc(L(stLabel[c.st])) + '</span>' + (c.line ? '<span class="src-line">' + esc(c.line) + '</span>' : '');
          return '<li>' + (c.url ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + inner + '<span class="src-go" aria-hidden="true">↗</span></a>' : '<div>' + inner + '</div>') + '</li>';
        }).join('') + '</ul>') + '</div>' +
      '</div>' +
      (rows.length ? '<details class="ch-table"><summary>' + esc(L('as_table')) + '</summary><table><thead><tr><th>' + esc(L('year')) + '</th><th>' + esc(L('chart_works')) + '</th>' +
        (hasCites ? '<th>' + esc(L('chart_cites')) + '</th>' : '') + '</tr></thead><tbody>' + rows.map(function (r) {
          return '<tr><td>' + r.year + '</td><td>' + r.works + '</td>' + (hasCites ? '<td>' + r.citations + '</td>' : '') + '</tr>';
        }).join('') + '</tbody></table></details>' : '') +
      (works.length ? '<details class="all-works"><summary>' + esc(L('all_works')) + ' (' + works.length + ')</summary><ol>' + works.map(function (w) {
        return '<li><span class="pub-year">' + esc(w.year) + '</span><div><a href="' + esc(w.doi ? doiUrl(w.doi) : (oa.url || '#')) + '" target="_blank" rel="noopener">' + esc(w.title) + '</a>' +
          '<span class="muted small">' + esc(w.venue) + '</span><div class="pub-meta">' + (w.ieee ? badge('IEEE', 'b-tci') : '') +
          badge(w.type, '') + (w.cited ? badge(L('cited_n') + ' ' + w.cited, 'b-scopus') : '') + '</div></div></li>';
      }).join('') + '</ol></details>' : '') +
      '</div></section>';
  }

  // แอนิเมชันเมื่อเลื่อนมาถึงแดชบอร์ด: ตัวเลขนับขึ้น แท่งกราฟโตขึ้น
  function animateDash() {
    var root = $('#dashboard');
    if (!root) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { root.classList.add('in'); return; }
    root.classList.add('pre');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.disconnect();
        root.classList.add('in');
        root.querySelectorAll('.count').forEach(function (el) {
          var to = +el.dataset.to, t0 = performance.now(), dur = 1200;
          (function tick(now) {
            var k = Math.min(1, (now - t0) / dur), v = to * (1 - Math.pow(1 - k, 3));
            el.textContent = to % 1 ? v.toFixed(1) : Math.round(v);
            if (k < 1) requestAnimationFrame(tick);
          })(t0);
        });
      });
    }, { threshold: 0.15 });
    io.observe(root);
  }

  function renderMain() {
    $('#app').innerHTML = renderHero() + renderDashboard() + renderAbout() + renderExpertise() + renderTeaching() +
      renderPubs() + renderProjects() + renderAwards() + renderContact();
    $('#app').removeAttribute('aria-busy');
    applyFilter();
    animateDash();
  }

  function applyFilter() {
    document.querySelectorAll('.pub').forEach(function (li) {
      li.hidden = pubFilter !== 'all' && li.dataset.type !== pubFilter;
    });
  }

  // ---------- CV ----------
  function renderCV() {
    var p = D.profile, c = D.contact || {};
    var pubs = sortedPubs();
    var groups = [['journal', pubs.filter(function (x) { return x.type === 'journal'; })],
                  ['conference', pubs.filter(function (x) { return x.type !== 'journal'; })]];
    var n = 0;
    var projects = allProjects().slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    $('#cv').innerHTML =
      '<div class="cv-bar no-print"><a class="btn ghost" href="#top">← ' + esc(L('cv_back')) + '</a>' +
        '<button class="chip" type="button" data-action="lang">' + (lang === 'th' ? 'English' : 'ภาษาไทย') + '</button>' +
        '<button class="btn" type="button" data-action="print">' + esc(L('cv_print')) + '</button></div>' +
      '<article class="cv-page">' +
        '<header class="cv-head">' +
          '<img src="' + esc(p.photo) + '" alt="">' +
          '<div><p class="cv-kicker">' + esc(L('cv_title')) + '</p><h1>' + esc(withPrefix(p.prefix) + t(p.name)) + '</h1>' +
          '<p>' + esc(t(p.position)) + '<br>' + esc(t(p.faculty)) + ' ' + esc(t(p.university)) + '</p>' +
          '<p class="cv-contact">' + (c.email ? esc(L('email')) + ': ' + esc(c.email) : '') + (c.phone ? ' · ' + esc(L('phone')) + ': ' + esc(c.phone) : '') + '</p></div>' +
        '</header>' +
        '<section><h2>' + esc(L('education')) + '</h2><table class="cv-table">' + arr(D.education).map(function (e) {
          return '<tr><td>' + esc(t(e.year)) + '</td><td><strong>' + esc(t(e.degree)) + '</strong> ' + esc(t(e.field)) + ', ' + esc(t(e.school)) + '</td></tr>';
        }).join('') + '</table></section>' +
        '<section><h2>' + esc(L('expertise')) + '</h2><ul>' + arr(D.expertise).map(function (x) {
          return '<li><strong>' + esc(t(x.title)) + '</strong> — ' + esc(t(x.desc)) + '</li>';
        }).join('') + '</ul></section>' +
        '<section><h2>' + esc(L('pubs')) + '</h2>' + groups.map(function (g) {
          if (!g[1].length) return '';
          return '<h3>' + esc(L(g[0])) + '</h3><ol class="cv-refs">' + g[1].map(function (x) {
            n++;
            var extra = [x.index, x.role ? L('role_' + x.role) : '', x.award].filter(Boolean).join(' · ');
            return '<li value="' + n + '">' + boldNames(trNames(x.authors || '')) + ' (' + esc(x.year) + '). ' + esc(pubTitle(x)) + '. ' +
              (x.venue ? '<em>' + esc(x.venue) + '</em>' + (x.volume ? ', ' + esc(x.volume) : '') + (x.pages ? ', ' + esc(x.pages) : '') + '. ' : '') +
              (x.doi ? esc(doiUrl(x.doi)) : '') + (extra ? ' <span class="cv-tag">[' + esc(extra) + ']</span>' : '') + '</li>';
          }).join('') + '</ol>';
        }).join('') + '</section>' +
        '<section><h2>' + esc(L('projects')) + '</h2><ol class="cv-refs">' + projects.map(function (x) {
          return '<li>' + esc(projTitle(x)) + ' (' + esc(x.year) + '). ' + esc(trText(t(x.funder))) + '. ' +
            '<span class="cv-tag">[' + esc(x.role === 'lead' ? L('plead') : L('pco')) + (x.ethics ? ' · ' + esc(x.ethics) : '') + ']</span></li>';
        }).join('') + '</ol></section>' +
        (allAwards().length ? '<section><h2>' + esc(L('awards')) + '</h2><table class="cv-table">' + allAwards().map(function (a) {
          return '<tr><td>' + esc(a.year) + '</td><td><strong>' + esc(t(a.title)) + '</strong> — ' + esc(t(a.detail)) + '</td></tr>';
        }).join('') + '</table></section>' : '') +
        '<section><h2>' + esc(L('teaching')) + '</h2><ul>' + arr(D.teaching && D.teaching.courses).map(function (x) {
          return '<li>' + esc(x.code) + ' ' + esc(t(x.name)) + (x.level ? ' (' + esc(t(x.level)) + ')' : '') + '</li>';
        }).join('') + arr(D.teaching && D.teaching.materials).map(function (m) {
          return '<li>' + esc(L('materials')) + ': ' + esc(t(m.title)) + '</li>';
        }).join('') + '</ul></section>' +
        (arr(D.links).length ? '<section><h2>' + esc(L('cv_links')) + '</h2><ul>' + arr(D.links).map(function (l) {
          return '<li>' + esc(l.label) + (l.note ? ' (' + esc(t(l.note)) + ')' : '') + ': ' + esc(l.url) + '</li>';
        }).join('') + '</ul></section>' : '') +
        '<footer class="cv-foot">' + esc(L('updated')) + ' ' + esc(latestDate()) + ' · ' + esc(L('cv_online')) + ': ' + esc(siteUrl()) + '</footer>' +
      '</article>';
  }

  // ---------- presentation ----------
  function slides() {
    var p = D.profile, c = D.contact || {};
    var feat = sortedPubs().filter(function (x) { return x.featured; }).slice(0, 5);
    var list = [];
    list.push('<div class="s-title"><img src="' + esc(p.photo_cutout || p.photo) + '" alt=""><div><p class="s-kicker">' + esc(L('deck_hi')) + '</p>' +
      '<h1>' + esc(t(p.nickname) || t(p.name)) + '</h1><h2>' + esc(withPrefix(p.prefix) + t(p.name)) + '</h2>' +
      '<p>' + esc(t(p.position)) + '<br>' + esc(t(p.faculty)) + ' ' + esc(t(p.university)) + '</p></div></div>');
    list.push('<h2 class="s-h">' + esc(L('deck_about')) + '</h2><div class="s-two"><div class="s-prose">' + paras(D.about) + '</div><ol class="s-edu">' +
      arr(D.education).map(function (e) {
        return '<li><b>' + esc(t(e.degree)) + '</b>' + esc(t(e.field)) + '<span>' + esc(t(e.school)) + ' · ' + esc(t(e.year)) + '</span></li>';
      }).join('') + '</ol></div>');
    list.push('<h2 class="s-h">' + esc(L('expertise')) + '</h2><div class="s-cards">' + arr(D.expertise).map(function (x) {
      return '<div><span class="s-icon">' + esc(x.icon || '') + '</span><h3>' + esc(t(x.title)) + '</h3><p>' + esc(t(x.desc)) + '</p></div>';
    }).join('') + '</div>');
    if (D.teaching) {
      var m = arr(D.teaching.materials)[0];
      list.push('<h2 class="s-h">' + esc(L('teaching')) + '</h2><div class="s-two"><ul class="s-courses">' +
        arr(D.teaching.courses).map(function (x) {
          return '<li><span>' + esc(x.code) + '</span>' + esc(t(x.name)) + '</li>';
        }).join('') + '</ul>' + (m && m.cover ? '<figure class="s-cover"><img src="' + esc(m.cover) + '" alt=""><figcaption>' + esc(t(m.title)) + '</figcaption></figure>' : '') + '</div>');
    }
    if (feat.length) list.push('<h2 class="s-h">' + esc(L('deck_research')) + '</h2><ol class="s-pubs">' + feat.map(function (x) {
      return '<li><span>' + esc(x.year) + '</span><div><b>' + esc(pubTitle(x)) + '</b><em>' + esc(x.venue || '') + '</em>' +
        '<div class="pub-meta">' + badge(x.index, /scopus/i.test(x.index || '') ? 'b-scopus' : 'b-tci') + badge(x.role ? L('role_' + x.role) : '', 'b-role') + '</div></div></li>';
    }).join('') + '</ol>');
    list.push('<h2 class="s-h">' + esc(L('deck_numbers')) + '</h2><div class="s-stats">' + stats().map(function (s) {
      return '<div><b>' + s.n + '</b><span>' + esc(L(s.k)) + '</span></div>';
    }).join('') + '</div>' + (allAwards().length ? '<ul class="s-awards">' + allAwards().map(function (a) {
      return '<li>🏆 <b>' + esc(t(a.title)) + '</b> ' + esc(a.year) + ' — ' + esc(t(a.detail)) + '</li>';
    }).join('') + '</ul>' : ''));
    list.push('<div class="s-end"><div><h2 class="s-h">' + esc(L('deck_contact')) + '</h2>' +
      '<p class="s-closing">' + esc(t(D.present && D.present.closing)) + '</p>' +
      (c.email ? '<p class="s-mail">✉ ' + esc(c.email) + '</p>' : '') + '<p class="muted">' + esc(t(c.office)) + '</p></div>' +
      '<div class="s-qr" id="deckQr"></div></div>');
    return list;
  }

  function renderDeck() {
    var list = slides();
    deckIndex = Math.max(0, Math.min(deckIndex, list.length - 1));
    $('#deckStage').innerHTML = list.map(function (s, i) {
      return '<section class="slide' + (i === deckIndex ? ' on' : '') + '" aria-hidden="' + (i !== deckIndex) + '">' + s + '</section>';
    }).join('') + '<p class="deck-hint">' + esc(L('deck_hint')) + '</p>';
    $('#deckCount').textContent = (deckIndex + 1) + ' / ' + list.length;
    makeQR($('#deckQr'), 220);
  }
  function go(d) {
    var s = document.querySelectorAll('.slide');
    if (!s.length) return;
    deckIndex = Math.max(0, Math.min(s.length - 1, deckIndex + d));
    s.forEach(function (el, i) { el.classList.toggle('on', i === deckIndex); el.setAttribute('aria-hidden', i !== deckIndex); });
    $('#deckCount').textContent = (deckIndex + 1) + ' / ' + s.length;
  }

  // ---------- QR / share ----------
  function makeQR(el, size) {
    if (!el) return;
    el.innerHTML = '';
    if (window.QRCode) new QRCode(el, { text: siteUrl(), width: size, height: size, colorDark: '#1b1030', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
  }
  function openShare() {
    var url = siteUrl();
    if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      navigator.share({ title: fullName(), url: url }).catch(function () {});
      return;
    }
    $('#shareUrl').value = url;
    makeQR($('#qr'), 200);
    $('#share').showModal();
  }

  // ---------- routing / modes ----------
  function route() {
    var h = location.hash.replace('#', '');
    var cv = h === 'cv', deck = h === 'present';
    $('#cv').hidden = !cv;
    $('#deck').hidden = !deck;
    document.body.classList.toggle('mode-cv', cv);
    document.body.classList.toggle('mode-deck', deck);
    if (cv) window.scrollTo(0, 0);
    // นับการเปิดหน้า CV / โหมดนำเสนอ แยกจากหน้าหลัก
    if ((cv || deck) && route.seen && window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: location.pathname + '#' + h, title: cv ? 'CV' : 'Presentation' });
    }
    route.seen = true;
    if (deck) { deckIndex = 0; renderDeck(); }
    if (!deck && document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    $('#langBtn').textContent = lang === 'th' ? 'EN' : 'TH';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = L(el.dataset.i18n); });
    document.title = fullName() + ' · ' + (lang === 'th' ? (D.profile.name.en || '') : (D.profile.name.th || ''));
  }

  function renderAll() {
    applyI18n();
    renderNav();
    renderMain();
    renderCV();
    if (!$('#deck').hidden) renderDeck();
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    renderAll();
  }

  function bind() {
    $('#langBtn').addEventListener('click', function () { setLang(lang === 'th' ? 'en' : 'th'); });
    $('#themeBtn').addEventListener('click', function () {
      var root = document.documentElement;
      var cur = root.dataset.theme || 'dark';
      root.dataset.theme = cur === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    });
    $('#menuBtn').addEventListener('click', function () { $('#nav').classList.toggle('open'); });
    $('#nav').addEventListener('click', function () { $('#nav').classList.remove('open'); });

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter],[data-cite],[data-action]');
      if (!b) return;
      if (b.dataset.filter) {
        pubFilter = b.dataset.filter;
        document.querySelectorAll('.filter').forEach(function (f) {
          var on = f.dataset.filter === pubFilter; f.classList.toggle('on', on); f.setAttribute('aria-selected', on);
        });
        applyFilter();
      } else if (b.dataset.cite != null) {
        copy(cite(sortedPubs()[+b.dataset.cite]));
      } else if (b.dataset.action === 'share') openShare();
      else if (b.dataset.action === 'print') window.print();
      else if (b.dataset.action === 'lang') setLang(lang === 'th' ? 'en' : 'th');
    });

    $('#copyBtn').addEventListener('click', function () { copy($('#shareUrl').value); });
    $('#qrDl').addEventListener('click', function () {
      var c = $('#qr canvas'); if (!c) return;
      var a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'qr-kanitta-hinon.png'; a.click();
    });

    // deck controls
    $('#deckPrev').addEventListener('click', function () { go(-1); });
    $('#deckNext').addEventListener('click', function () { go(1); });
    $('#deckClose').addEventListener('click', function () { location.hash = 'top'; });
    $('#deckFull').addEventListener('click', toggleFull);
    $('#deckStage').addEventListener('click', function (e) {
      if (e.target.closest('a,button')) return;
      go(e.clientX > window.innerWidth / 3 ? 1 : -1);
    });
    var sx = null;
    $('#deckStage').addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    $('#deckStage').addEventListener('touchend', function (e) {
      if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if ($('#deck').hidden) return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].indexOf(e.key) > -1) { e.preventDefault(); go(1); }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].indexOf(e.key) > -1) { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { deckIndex = 0; go(0); }
      else if (e.key === 'f' || e.key === 'F') toggleFull();
      else if (e.key === 'Escape' && !document.fullscreenElement) location.hash = 'top';
    });
    window.addEventListener('hashchange', route);
    // tooltip ของกราฟ
    var tipEl = document.createElement('div'); tipEl.className = 'ch-tip'; tipEl.hidden = true; document.body.appendChild(tipEl);
    function showTip(g, x, y) { tipEl.textContent = g.dataset.tip; tipEl.hidden = false; tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px'; }
    document.addEventListener('mousemove', function (e) {
      var g = e.target.closest && e.target.closest('.ch-bar');
      if (g) showTip(g, e.clientX, e.clientY); else tipEl.hidden = true;
    });
    document.addEventListener('focusin', function (e) {
      var g = e.target.closest && e.target.closest('.ch-bar');
      if (g) { var r = g.getBoundingClientRect(); showTip(g, r.left + r.width / 2, r.top); } else tipEl.hidden = true;
    });
  }
  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
    else if ($('#deck').requestFullscreen) $('#deck').requestFullscreen().catch(function () {});
  }

  function showError(msg, detail) {
    var el = $('#error');
    el.hidden = false;
    el.innerHTML = '<strong>' + esc(msg) + '</strong>' + (detail ? '<pre>' + esc(detail) + '</pre>' : '');
    $('#app').innerHTML = '';
  }

  // ---------- start ----------
  var kmutnbReq = fetch('data/kmutnb.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  var metricsReq = fetch('data/metrics.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  fetch('content.yml', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(function (txt) { return Promise.all([metricsReq, kmutnbReq]).then(function (r) { M = r[0]; K = r[1]; return txt; }); })
    .then(function (txt) {
      try { D = jsyaml.load(txt) || {}; }
      catch (err) { showError(t(UI.yaml_error), err.message); throw null; }
      D.profile = D.profile || {}; D.profile.name = D.profile.name || {}; D.profile.prefix = D.profile.prefix || {};
      var saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
      var q = new URLSearchParams(location.search).get('lang');
      lang = q || saved || (D.site && D.site.default_lang) || 'th';
      bind();
      renderAll();
      route();
      if (location.hash && !/^#(cv|present|top)$/.test(location.hash)) {
        var tgt = document.getElementById(location.hash.slice(1)); if (tgt) tgt.scrollIntoView();
      }
    })
    .catch(function (err) { if (err) showError(t(UI.load_error), String(err.message || err)); });
})();
