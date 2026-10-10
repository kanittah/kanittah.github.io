/* ไฟล์นี้สร้างหน้าเว็บจาก content.yml — ปกติไม่ต้องแก้ไฟล์นี้ */
(function () {
  'use strict';

  var UI = {
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
    deck_about: { th: 'รู้จักอาจารย์', en: 'About me' },
    deck_research: { th: 'ผลงานวิจัยเด่น', en: 'Selected research' },
    deck_numbers: { th: 'ผลงานโดยสรุป', en: 'At a glance' },
    deck_contact: { th: 'ติดต่ออาจารย์', en: 'Get in touch' },
    deck_hint: { th: '← → เปลี่ยนสไลด์ · F เต็มจอ · Esc ออก', en: '← → navigate · F fullscreen · Esc exit' },
    yaml_error: { th: 'ไฟล์ content.yml มีรูปแบบไม่ถูกต้อง — ตรวจย่อหน้า / เครื่องหมาย : ใกล้บรรทัดที่ระบุ', en: 'content.yml has a formatting error near the line below.' },
    load_error: { th: 'โหลด content.yml ไม่ได้ (ถ้าเปิดไฟล์จากเครื่องโดยตรง ให้เปิดผ่าน GitHub Pages หรือ local server)', en: 'Could not load content.yml.' }
  };

  var D = null;
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
  function cite(p) {
    var s = (p.authors ? p.authors + ' ' : '') + '(' + p.year + '). ' + p.title + '.';
    if (p.venue) s += ' ' + p.venue + (p.volume ? ', ' + p.volume : '') + (p.pages ? ', ' + p.pages : '') + '.';
    if (p.doi) s += ' ' + doiUrl(p.doi);
    return s;
  }
  function sortedPubs() {
    return arr(D.publications).slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
  }
  function stats() {
    var pubs = arr(D.publications);
    return [
      { n: pubs.length, k: 'stat_pubs' },
      { n: pubs.filter(function (p) { return /scopus/i.test(p.index || ''); }).length, k: 'stat_scopus' },
      { n: arr(D.projects).length, k: 'stat_projects' },
      { n: arr(D.awards).length, k: 'stat_awards' }
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
    ['about', 'nav_about'], ['expertise', 'nav_expertise'], ['teaching', 'nav_teaching'],
    ['publications', 'nav_pubs'], ['projects', 'nav_projects'], ['awards', 'nav_awards'], ['contact', 'nav_contact']
  ];

  function renderNav() {
    $('#nav').innerHTML = SECTIONS.map(function (s) {
      return '<a href="#' + s[0] + '">' + esc(L(s[1])) + '</a>';
    }).join('');
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
      '<figure class="hero-photo"><img src="' + esc(p.photo_cutout || p.photo) + '" alt="' + esc(fullName()) + '" width="646" height="644"></figure>' +
    '</div>' +
    '<div class="wrap"><dl class="stats">' + stats().map(function (s) {
      return '<div><dt>' + esc(L(s.k)) + '</dt><dd>' + s.n + '</dd></div>';
    }).join('') + '</dl></div></section>';
  }

  var KANJI = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  function head(id, key, num) {
    return '<header class="sec-head"><span class="sec-num" aria-hidden="true"><b>' + (KANJI[+num] || '') + '</b><i>' + num + '</i></span><h2>' + esc(L(key)) + '</h2></header>';
  }

  function renderAbout() {
    return '<section id="about" class="sec"><div class="wrap">' + head('about', 'about', '01') +
      '<div class="about-grid"><div class="prose">' + paras(D.about) + '</div>' +
      '<div><h3 class="h3">' + esc(L('education')) + '</h3><ol class="timeline">' +
      arr(D.education).map(function (e) {
        return '<li><span class="tl-year">' + esc(t(e.year)) + '</span><div><strong>' + esc(t(e.degree)) + '</strong> ' +
          esc(t(e.field)) + '<br><span class="muted">' + esc(t(e.school)) + '</span></div></li>';
      }).join('') + '</ol></div></div></div></section>';
  }

  function renderExpertise() {
    return '<section id="expertise" class="sec alt"><div class="wrap">' + head('expertise', 'expertise', '02') +
      '<div class="cards">' + arr(D.expertise).map(function (x) {
        return '<article class="card"><div class="card-icon" aria-hidden="true">' + esc(x.icon || '•') + '</div><h3>' +
          esc(t(x.title)) + '</h3><p>' + esc(t(x.desc)) + '</p></article>';
      }).join('') + '</div></div></section>';
  }

  function renderTeaching() {
    var T = D.teaching || {};
    return '<section id="teaching" class="sec"><div class="wrap">' + head('teaching', 'teaching', '03') +
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
      '<h3 class="pub-title">' + esc(p.title) + '</h3>' +
      (p.authors ? '<p class="pub-authors">' + boldNames(p.authors) + '</p>' : '') +
      (p.venue ? '<p class="pub-venue"><em>' + esc(p.venue) + '</em>' + (p.volume ? ', ' + esc(p.volume) : '') + (p.pages ? ', ' + esc(p.pages) : '') + '</p>' : '') +
      '<div class="pub-meta">' + badge(p.index, /scopus/i.test(p.index || '') ? 'b-scopus' : 'b-tci') + badge(role, 'b-role') +
        (p.award ? badge('🏆 ' + p.award, 'b-award') : '') +
        (p.doi ? '<a class="link" href="' + esc(doiUrl(p.doi)) + '" target="_blank" rel="noopener">DOI</a>' : '') +
        (p.url ? '<a class="link" href="' + esc(p.url) + '" target="_blank" rel="noopener">PDF</a>' : '') +
        '<button class="link" type="button" data-cite="' + i + '">' + esc(L('copy_cite')) + '</button>' +
      '</div></div></li>';
  }

  function renderPubs() {
    var pubs = sortedPubs();
    var types = [['all', 'all'], ['journal', 'journal'], ['conference', 'conference']];
    return '<section id="publications" class="sec alt"><div class="wrap">' + head('publications', 'pubs', '04') +
      '<div class="filters" role="tablist">' + types.map(function (ty) {
        var n = ty[0] === 'all' ? pubs.length : pubs.filter(function (p) { return p.type === ty[0]; }).length;
        return '<button type="button" role="tab" class="filter' + (pubFilter === ty[0] ? ' on' : '') + '" data-filter="' + ty[0] + '" aria-selected="' + (pubFilter === ty[0]) + '">' +
          esc(L(ty[1])) + ' <span>' + n + '</span></button>';
      }).join('') + '</div>' +
      '<ol class="pubs">' + pubs.map(pubItem).join('') + '</ol>' +
      linksRow() + '</div></section>';
  }

  function linksRow() {
    var ls = arr(D.links);
    if (!ls.length) return '';
    return '<div class="ext-links">' + ls.map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener"><strong>' + esc(l.label) + '</strong>' +
        (l.note ? '<span>' + esc(l.note) + '</span>' : '') + '</a>';
    }).join('') + '</div>';
  }

  function renderProjects() {
    var ps = arr(D.projects).slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    return '<section id="projects" class="sec"><div class="wrap">' + head('projects', 'projects', '05') +
      '<ol class="projects">' + ps.map(function (p) {
        var th = p.title && p.title.th, en = p.title && p.title.en;
        var main = t(p.title), sub = lang === 'th' && th && en ? en : (lang === 'en' && th && en ? th : '');
        return '<li class="project"><span class="pub-year">' + esc(p.year) + '</span><div>' +
          '<h3>' + esc(main) + '</h3>' + (sub ? '<p class="muted small">' + esc(sub) + '</p>' : '') +
          '<p class="proj-meta">' + esc(t(p.funder)) + '</p>' +
          (p.team ? '<p class="proj-team"><span class="muted">' + esc(L('team')) + ':</span> ' + boldNames(p.team) + '</p>' : '') +
          '<div class="pub-meta">' + badge(p.role === 'lead' ? L('plead') : L('pco'), p.role === 'lead' ? 'b-lead' : 'b-role') +
          (p.ethics ? badge('✓ ' + L('ethics') + ' · ' + p.ethics, 'b-ethics') : '') + '</div>' +
          '</div></li>';
      }).join('') + '</ol></div></section>';
  }

  function renderAwards() {
    return '<section id="awards" class="sec alt"><div class="wrap">' + head('awards', 'awards', '06') +
      '<div class="awards">' + arr(D.awards).map(function (a) {
        return '<article class="award"><div class="award-mark" aria-hidden="true">🏆</div><div><span class="award-year">' + esc(a.year) +
          '</span><h3>' + esc(t(a.title)) + '</h3><p>' + esc(t(a.detail)) + '</p></div></article>';
      }).join('') + '</div></div></section>';
  }

  function renderContact() {
    var c = D.contact || {};
    var edit = editUrl();
    return '<section id="contact" class="sec"><div class="wrap">' + head('contact', 'contact', '07') +
      '<div class="contact-grid">' +
        (c.email ? '<a class="contact" href="mailto:' + esc(c.email) + '"><span>' + esc(L('email')) + '</span><strong>' + esc(c.email) + '</strong></a>' : '') +
        (c.phone ? '<a class="contact" href="tel:' + esc(String(c.phone).replace(/[^\d+]/g, '')) + '"><span>' + esc(L('phone')) + '</span><strong>' + esc(c.phone) + '</strong></a>' : '') +
        (c.office ? '<div class="contact"><span>' + esc(L('office')) + '</span><strong>' + esc(t(c.office)) + '</strong></div>' : '') +
      '</div>' + linksRow() + '</div></section>' +
      '<footer class="footer"><div class="wrap footer-in"><span>© ' + new Date().getFullYear() + ' ' + esc(fullName()) + '</span>' +
      '<span>' + esc(L('updated')) + ' ' + esc(D.site && D.site.updated || '') +
      (edit ? ' · <a href="' + esc(edit) + '" target="_blank" rel="noopener">' + esc(L('edit')) + '</a>' : '') + '</span></div></footer>';
  }

  function renderMain() {
    $('#app').innerHTML = renderHero() + renderAbout() + renderExpertise() + renderTeaching() +
      renderPubs() + renderProjects() + renderAwards() + renderContact();
    $('#app').removeAttribute('aria-busy');
    applyFilter();
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
    var projects = arr(D.projects).slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
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
            return '<li value="' + n + '">' + boldNames(x.authors || '') + ' (' + esc(x.year) + '). ' + esc(x.title) + '. ' +
              (x.venue ? '<em>' + esc(x.venue) + '</em>' + (x.volume ? ', ' + esc(x.volume) : '') + (x.pages ? ', ' + esc(x.pages) : '') + '. ' : '') +
              (x.doi ? esc(doiUrl(x.doi)) : '') + (extra ? ' <span class="cv-tag">[' + esc(extra) + ']</span>' : '') + '</li>';
          }).join('') + '</ol>';
        }).join('') + '</section>' +
        '<section><h2>' + esc(L('projects')) + '</h2><ol class="cv-refs">' + projects.map(function (x) {
          return '<li>' + esc(t(x.title)) + ' (' + esc(x.year) + '). ' + esc(t(x.funder)) + '. ' +
            '<span class="cv-tag">[' + esc(x.role === 'lead' ? L('plead') : L('pco')) + (x.ethics ? ' · ' + esc(x.ethics) : '') + ']</span></li>';
        }).join('') + '</ol></section>' +
        (arr(D.awards).length ? '<section><h2>' + esc(L('awards')) + '</h2><table class="cv-table">' + arr(D.awards).map(function (a) {
          return '<tr><td>' + esc(a.year) + '</td><td><strong>' + esc(t(a.title)) + '</strong> — ' + esc(t(a.detail)) + '</td></tr>';
        }).join('') + '</table></section>' : '') +
        '<section><h2>' + esc(L('teaching')) + '</h2><ul>' + arr(D.teaching && D.teaching.courses).map(function (x) {
          return '<li>' + esc(x.code) + ' ' + esc(t(x.name)) + (x.level ? ' (' + esc(t(x.level)) + ')' : '') + '</li>';
        }).join('') + arr(D.teaching && D.teaching.materials).map(function (m) {
          return '<li>' + esc(L('materials')) + ': ' + esc(t(m.title)) + '</li>';
        }).join('') + '</ul></section>' +
        (arr(D.links).length ? '<section><h2>' + esc(L('cv_links')) + '</h2><ul>' + arr(D.links).map(function (l) {
          return '<li>' + esc(l.label) + (l.note ? ' (' + esc(l.note) + ')' : '') + ': ' + esc(l.url) + '</li>';
        }).join('') + '</ul></section>' : '') +
        '<footer class="cv-foot">' + esc(L('updated')) + ' ' + esc(D.site && D.site.updated || '') + ' · ' + esc(L('cv_online')) + ': ' + esc(siteUrl()) + '</footer>' +
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
      return '<li><span>' + esc(x.year) + '</span><div><b>' + esc(x.title) + '</b><em>' + esc(x.venue || '') + '</em>' +
        '<div class="pub-meta">' + badge(x.index, /scopus/i.test(x.index || '') ? 'b-scopus' : 'b-tci') + badge(x.role ? L('role_' + x.role) : '', 'b-role') + '</div></div></li>';
    }).join('') + '</ol>');
    list.push('<h2 class="s-h">' + esc(L('deck_numbers')) + '</h2><div class="s-stats">' + stats().map(function (s) {
      return '<div><b>' + s.n + '</b><span>' + esc(L(s.k)) + '</span></div>';
    }).join('') + '</div>' + (arr(D.awards).length ? '<ul class="s-awards">' + arr(D.awards).map(function (a) {
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
  fetch('content.yml', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
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
