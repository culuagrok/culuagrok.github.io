(() => {
  const pairs = [...document.querySelectorAll('[data-bilingual] .bi-pair')];
  if (!pairs.length) return;
  const root = document.documentElement;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'bi-toggle';
  let mode = 'bilingual';
  try { if (localStorage.getItem('blog-lang-mode') === 'vi') mode = 'vi'; } catch (_) {}
  function render() {
    root.dataset.blogLang = mode;
    root.classList.add('bi-ready');
    button.textContent = mode === 'vi' ? 'Toàn bộ tiếng Việt' : 'Song ngữ · EN + hover VI';
    button.setAttribute('aria-label', mode === 'vi' ? 'Đang đọc toàn bộ tiếng Việt. Chuyển sang song ngữ' : 'Đang đọc song ngữ. Chuyển sang toàn bộ tiếng Việt');
    button.setAttribute('aria-pressed', String(mode === 'vi'));
    pairs.forEach(pair => { pair.tabIndex = mode === 'vi' ? -1 : 0; });
  }
  pairs.forEach(pair => {
    pair.addEventListener('click', event => {
      if (mode === 'vi' || event.target.closest('a,button,input,select,textarea')) return;
      // Touch clicks toggle; do not focus the wrapper and accidentally pin focus-within.
      if (matchMedia('(hover: none)').matches) {
        pair.classList.toggle('is-open');
        if (document.activeElement === pair) pair.blur();
      }
    });
    pair.addEventListener('keydown', event => {
      if (event.target !== pair) return;
      if (event.key === 'Escape') { pair.classList.remove('is-open'); pair.blur(); }
    });
  });
  button.addEventListener('click', () => {
    mode = mode === 'vi' ? 'bilingual' : 'vi';
    pairs.forEach(pair => pair.classList.remove('is-open'));
    render();
    try { localStorage.setItem('blog-lang-mode', mode); } catch (_) {}
  });
  document.body.append(button);
  render();
})();
