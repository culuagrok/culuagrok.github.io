/**
 * Shared blog mindmap loader (Pele).
 * Usage in a post (after the mindmap <pre>):
 *   <script type="module" src="../../blogs/assets/mindmap.js"></script>
 * Or from blogs/<slug>/index.html:
 *   <script type="module" src="../assets/mindmap.js"></script>
 *
 * Put Mermaid mindmap syntax in:
 *   <pre class="mermaid">mindmap ...</pre>
 * or <pre class="mindmap"> / <div class="mindmap"><pre class="mermaid">...
 *
 * Pele (https://pele.run, npm `pele`) renders Mermaid syntax to SVG and
 * themes via --pele-* CSS variables mapped to the site theme tokens.
 */
const PELE_CDN = 'https://cdn.jsdelivr.net/npm/pele@1/dist/pele.js';
const MERMAID_FALLBACK_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const DARK_THEMES = new Set(['dark', 'steam', 'dracula', 'catppuccin']);

function currentTheme() {
  try {
    const fromDom = document.documentElement.getAttribute('data-theme');
    if (fromDom) return fromDom;
    return localStorage.getItem('jb-theme') || 'yahoojp';
  } catch (_) {
    return 'yahoojp';
  }
}

function isDarkTheme(name) {
  return DARK_THEMES.has(name);
}

function applyPeleThemeVars(root) {
  // Map Pele tokens to job-board CSS variables so Ctrl+K theme changes apply.
  root.style.setProperty('--pele-bg', 'var(--color-bg, #ffffff)');
  root.style.setProperty('--pele-fg', 'var(--color-fg, #0f172a)');
  root.style.setProperty('--pele-muted', 'var(--color-muted, #64748b)');
  root.style.setProperty('--pele-line', 'var(--color-fg, #0f172a)');
  root.style.setProperty('--pele-surface', 'var(--color-panel, #f1f5ff)');
  root.style.setProperty('--pele-surface-alt', 'var(--color-panel2, #e6ecfe)');
  root.style.setProperty('--pele-border', 'var(--color-bd2, #cedaf3)');
  root.style.setProperty('--pele-accent', 'var(--color-link, #2563eb)');
  root.style.setProperty('--pele-font', 'inherit');
  root.style.setProperty('--pele-error', 'var(--color-accent, #f03)');
  root.dataset.peleTone = isDarkTheme(currentTheme()) ? 'dark' : 'light';
}

function collectBlocks() {
  const seen = new Set();
  const out = [];
  document.querySelectorAll('pre.mermaid, pre.mindmap, .blog-mindmap pre.mermaid, .mindmap pre.mermaid').forEach((el) => {
    if (seen.has(el) || el.dataset.mindmapRendered === '1') return;
    seen.add(el);
    out.push(el);
  });
  return out;
}

function wrapScroll(el) {
  if (el.parentElement && el.parentElement.classList.contains('blog-mindmap-scroll')) {
    return el.parentElement;
  }
  const wrap = document.createElement('div');
  wrap.className = 'blog-mindmap-scroll pele';
  el.parentNode.insertBefore(wrap, el);
  wrap.appendChild(el);
  return wrap;
}

async function renderWithPele(blocks) {
  const { mount, render, supports } = await import(PELE_CDN);
  const results = [];
  for (const el of blocks) {
    const source = (el.textContent || '').trim();
    if (!source) continue;
    const host = wrapScroll(el);
    applyPeleThemeVars(host);
    try {
      if (typeof supports === 'function' && !supports(source)) {
        throw new Error('pele-unsupported-diagram');
      }
      // Prefer mount for responsive layout; keep source on a data attr for re-theme.
      host.dataset.mindmapSource = source;
      el.style.display = 'none';
      const target = document.createElement('div');
      target.className = 'pele blog-mindmap-svg';
      host.appendChild(target);
      applyPeleThemeVars(target);
      if (typeof mount === 'function') {
        const width = Math.max(host.clientWidth || 0, host.parentElement?.clientWidth || 0, 640);
        const mounted = mount(target, source, {
          zoom: false,
          maxWidth: width,
          autoDirection: false,
          fontSize: 15,
          padding: 12,
          onError(err) {
            console.warn('[mindmap] Pele mount error', err);
          },
        });
        if (mounted && mounted.error) {
          throw mounted.error;
        }
        // Confirm an SVG landed
        if (!target.querySelector('svg')) {
          // Some Pele builds return svg via render instead
          const { svg } = render(source);
          target.innerHTML = svg;
        }
      } else {
        const { svg } = render(source);
        target.innerHTML = svg;
      }
      if (!target.querySelector('svg')) {
        throw new Error('pele-no-svg');
      }
      el.dataset.mindmapRendered = '1';
      results.push({ el, ok: true, engine: 'pele' });
    } catch (err) {
      results.push({ el, ok: false, engine: 'pele', error: err });
      throw Object.assign(err instanceof Error ? err : new Error(String(err)), { __peleFailedBlocks: results });
    }
  }
  return results;
}

async function renderWithMermaidFallback(blocks) {
  const mermaid = (await import(MERMAID_FALLBACK_CDN)).default;
  const theme = isDarkTheme(currentTheme()) ? 'dark' : 'neutral';
  mermaid.initialize({ startOnLoad: false, theme, securityLevel: 'strict' });
  const results = [];
  for (const el of blocks) {
    const source = (el.textContent || '').trim();
    if (!source) continue;
    const host = wrapScroll(el);
    applyPeleThemeVars(host);
    try {
      const id = 'mm-' + Math.random().toString(36).slice(2);
      const { svg } = await mermaid.render(id, source);
      el.style.display = 'none';
      let target = host.querySelector('.blog-mindmap-svg');
      if (!target) {
        target = document.createElement('div');
        target.className = 'blog-mindmap-svg';
        host.appendChild(target);
      }
      target.innerHTML = svg;
      el.dataset.mindmapRendered = '1';
      el.dataset.mindmapEngine = 'mermaid-fallback';
      results.push({ el, ok: true, engine: 'mermaid-fallback' });
    } catch (err) {
      results.push({ el, ok: false, engine: 'mermaid-fallback', error: err });
      console.error('[mindmap] Mermaid fallback failed', err);
    }
  }
  return results;
}

function observeTheme() {
  const refresh = () => {
    document.querySelectorAll('.blog-mindmap-scroll.pele, .blog-mindmap-svg.pele, .pele').forEach(applyPeleThemeVars);
  };
  const mo = new MutationObserver(refresh);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('storage', (e) => {
    if (e.key === 'jb-theme') refresh();
  });
}

async function boot() {
  observeTheme();
  const blocks = collectBlocks();
  if (!blocks.length) return;
  try {
    await renderWithPele(blocks);
  } catch (err) {
    console.warn('[mindmap] Pele failed; falling back to Mermaid.js', err);
    const pending = collectBlocks();
    await renderWithMermaidFallback(pending.length ? pending : blocks);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
