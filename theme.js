/* Theme system: theme registry, Ctrl/Cmd+K theme picker and the small
   widgets used by the portal layout (search box, date, latest jobs). */
(function () {
  'use strict';
  var KEY = 'jb-theme';
  var DEFAULT = 'yahoojp';
  var THEMES = [
    { id: 'yahoojp', name: 'Yahoo! JAPAN', desc: 'Mặc định · nền trắng, chữ đỏ, bố cục cổng thông tin 3 cột', sw: ['#ffffff', '#ff0033', '#1d3994', '#e6ecfe'] },
    { id: 'classic', name: 'Cổ điển (giao diện cũ)', desc: 'Giao diện ban đầu: nền gradient xanh, thẻ bo góc', sw: ['#0f3d75', '#15803d', '#f1f5f9', '#ea580c'] },
    { id: 'dark', name: 'Tối', desc: 'Bố cục Yahoo! JAPAN trên nền tối, dịu mắt ban đêm', sw: ['#16181d', '#ff4d6a', '#8fb0ff', '#232b3b'] },
    { id: 'steam', name: 'Steam', desc: 'Kiểu cửa hàng Steam · nền xanh navy, hàng thẻ, nhãn xanh lá', sw: ['#171a21', '#1b2838', '#66c0f4', '#a4d007'] },
    { id: 'shadcn', name: 'shadcn/ui', desc: 'Tối giản trắng–đen kiểu shadcn/ui (Zinc), thẻ bo góc, bóng nhẹ', sw: ['#ffffff', '#18181b', '#f4f4f5', '#e7000b'] },
    { id: 'dracula', name: 'Dracula', desc: 'Nền tối tím xám, chữ hồng, xanh cyan và tím (Dracula)', sw: ['#282a36', '#ff79c6', '#8be9fd', '#bd93f9'] },
    { id: 'catppuccin', name: 'Catppuccin Mocha', desc: 'Nền tối dịu, màu pastel tím mauve và xanh (Catppuccin)', sw: ['#1e1e2e', '#cba6f7', '#89b4fa', '#a6e3a1'] },
    { id: 'nord', name: 'Nord', desc: 'Sáng, xám xanh băng giá Bắc Âu (Nord Snow Storm + Frost)', sw: ['#eceff4', '#2e3440', '#5e81ac', '#88c0d0'] },
    { id: 'cupcake', name: 'Cupcake (daisyUI)', desc: 'Sáng, pastel hồng và xanh ngọc, bo tròn (daisyUI cupcake)', sw: ['#faf7f5', '#a0004a', '#44ebd3', '#f9cbe5'] }
  ];
  var root = document.documentElement;
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function find(id) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i]; return null; }
  function current() { return find(root.getAttribute('data-theme')) ? root.getAttribute('data-theme') : DEFAULT; }

  function apply(id) {
    var t = find(id) || find(DEFAULT);
    root.setAttribute('data-theme', t.id);
    if (t.id === 'classic') root.removeAttribute('data-layout'); else root.setAttribute('data-layout', 'portal');
    var s = document.getElementById('theme-classic');
    if (s) s.media = t.id === 'classic' ? 'all' : 'not all';
    try { localStorage.setItem(KEY, t.id); } catch (e) { /* storage may be blocked */ }
    updateLabels();
  }

  function updateLabels() {
    var t = find(current());
    $$('[data-theme-name]').forEach(function (el) { el.textContent = t.name; });
    $$('[data-kbd]').forEach(function (el) { el.textContent = isMac ? '⌘K' : 'Ctrl+K'; });
  }

  /* ---------- Picker ---------- */
  var ov, inp, list, items = [], active = 0, lastFocus = null;

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd'); }
  function isOpen() { return !!ov && !ov.hidden; }

  function build() {
    ov = document.createElement('div');
    ov.className = 'tp-ov';
    ov.hidden = true;
    ov.innerHTML =
      '<div class="tp-box" role="dialog" aria-modal="true" aria-label="Chọn giao diện">' +
      '<div class="tp-head"><span aria-hidden="true">🎨</span>' +
      '<input class="tp-q" type="text" placeholder="Tìm giao diện…" aria-label="Tìm giao diện" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="tp-list">' +
      '<kbd>Esc</kbd></div>' +
      '<ul class="tp-list" id="tp-list" role="listbox" aria-label="Danh sách giao diện"></ul>' +
      '<div class="tp-foot"><span><kbd>↑</kbd><kbd>↓</kbd>chọn</span><span><kbd>Enter</kbd>áp dụng</span><span><kbd>Esc</kbd>đóng</span><span><kbd data-kbd>Ctrl+K</kbd>mở/đóng</span></div>' +
      '</div>';
    document.body.appendChild(ov);
    inp = $('.tp-q', ov);
    list = $('.tp-list', ov);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
    inp.addEventListener('input', function () { active = 0; renderList(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!items.length) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        renderList();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[active]) choose(items[active].id);
      } else if (e.key === 'Tab') {
        e.preventDefault();
      }
    });
    list.addEventListener('mousemove', function (e) {
      var li = e.target.closest('li[data-id]');
      if (!li) return;
      var i = +li.getAttribute('data-i');
      if (i !== active) { active = i; renderList(); }
    });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('li[data-id]');
      if (li) choose(li.getAttribute('data-id'));
    });
    updateLabels();
  }

  function renderList() {
    var q = norm(inp.value.trim()), cur = current();
    items = THEMES.filter(function (t) { return !q || norm(t.name + ' ' + t.desc + ' ' + t.id).indexOf(q) >= 0; });
    if (active >= items.length) active = Math.max(0, items.length - 1);
    if (!items.length) {
      list.innerHTML = '<li class="tp-empty">Không có giao diện phù hợp</li>';
      inp.removeAttribute('aria-activedescendant');
      return;
    }
    list.innerHTML = items.map(function (t, i) {
      return '<li role="option" id="tp-o-' + t.id + '" data-id="' + t.id + '" data-i="' + i + '" aria-selected="' + (i === active) + '" class="' +
        (i === active ? 'act ' : '') + (t.id === cur ? 'cur' : '') + '">' +
        '<span class="tp-sw" aria-hidden="true">' + t.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>' +
        '<span class="tp-tx"><b>' + esc(t.name) + '</b><small>' + esc(t.desc) + '</small></span>' +
        (t.id === cur ? '<span class="tp-cur">✓ Đang dùng</span>' : '') + '</li>';
    }).join('');
    inp.setAttribute('aria-activedescendant', 'tp-o-' + items[active].id);
    var a = $('li.act', list);
    if (a && a.scrollIntoView) a.scrollIntoView({ block: 'nearest' });
  }

  function open() {
    if (!ov) build();
    lastFocus = document.activeElement;
    inp.value = '';
    active = 0;
    THEMES.forEach(function (t, i) { if (t.id === current()) active = i; });
    renderList();
    ov.hidden = false;
    inp.focus();
  }

  function close() {
    if (!isOpen()) return;
    ov.hidden = true;
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
  }

  function choose(id) { apply(id); close(); }

  document.addEventListener('keydown', function (e) {
    var k = e.key && e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (k === 'k' || e.code === 'KeyK')) {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen()) close(); else open();
    } else if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      close();
    }
  }, true);

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-open]');
    if (b) { e.preventDefault(); open(); }
  });

  /* Floating button, visible in the classic theme (portal themes have it in the header). */
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'tp-fab';
  fab.setAttribute('data-theme-open', '');
  fab.innerHTML = '🎨 Giao diện (<span data-kbd>Ctrl+K</span>)';
  document.body.appendChild(fab);

  /* ---------- Portal widgets ---------- */
  var days = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  var now = new Date();
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  $$('[data-today]').forEach(function (el) {
    el.textContent = days[now.getDay()] + ', ' + pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear();
  });

  // Header search: filters the new-jobs list in place, otherwise opens it with ?q=.
  var form = $('.yj-search form'), sq = form && $('input', form), pageQ = document.getElementById('q');
  var initial = '';
  try { initial = new URLSearchParams(location.search).get('q') || ''; } catch (e) { /* old browser */ }
  if (sq) {
    if (pageQ) {
      if (initial) { pageQ.value = initial; pageQ.dispatchEvent(new Event('input')); }
      sq.value = pageQ.value;
      sq.addEventListener('input', function () { pageQ.value = sq.value; pageQ.dispatchEvent(new Event('input')); });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = sq.value.trim();
      if (pageQ) { pageQ.value = v; pageQ.dispatchEvent(new Event('input')); return; }
      location.href = 'viec-moi.html' + (v ? '?q=' + encodeURIComponent(v) : '');
    });
  }

  // Latest-jobs topics box on the home page.
  var latest = document.getElementById('yj-latest');
  if (latest) {
    var lt = 'chinh', jobs = [];
    var cat = function (j) { return j.cat === 'phu' ? 'phu' : 'chinh'; };
    var draw = function () {
      $$('.yj-tabs button', latest).forEach(function (b) {
        var on = b.getAttribute('data-t') === lt;
        b.classList.toggle('on', on);
        b.setAttribute('aria-selected', on);
      });
      var rows = jobs.filter(function (j) { return cat(j) === lt; });
      var top = rows.length ? rows[0].added : '';
      var ul = $('.yj-topics', latest), stamp = $('.yj-stamp', latest);
      stamp.textContent = top ? 'Cập nhật ' + top.split('-').reverse().join('/') + ' · ' + rows.length + ' tin' : '';
      ul.innerHTML = rows.slice(0, 9).map(function (j) {
        return '<li><a href="' + esc(j.url) + '" target="_blank" rel="noopener">' + esc(j.title) + '</a>' +
          (j.added === top ? '<span class="yj-new">NEW</span>' : '') + '<small>' + esc(j.company) + '</small></li>';
      }).join('') || '<li>Chưa có việc mới.</li>';
      $('.yj-more a', latest).href = 'viec-moi.html' + (lt === 'phu' ? '#phu' : '');
    };
    $$('.yj-tabs button', latest).forEach(function (b) {
      b.addEventListener('click', function () { lt = b.getAttribute('data-t'); draw(); });
    });
    fetch('new-jobs.json?' + Date.now()).then(function (r) { return r.json(); }).then(function (d) {
      jobs = d.slice().sort(function (a, b) { return a.added < b.added ? 1 : a.added > b.added ? -1 : 0; });
      draw();
    }).catch(function () { $('.yj-topics', latest).innerHTML = '<li>Không tải được dữ liệu.</li>'; });
  }

  updateLabels();
  window.siteTheme = { list: THEMES, apply: apply, open: open, close: close, current: current };
})();
