# Classic theme (`classic`, "Cổ điển")

This is the site's original look, kept unchanged as a selectable theme. It
is a modern card UI: a blue-to-green gradient hero, white rounded cards with
soft shadows, and Segoe UI / Roboto type.

## 1. Overview and inspiration

- **Feel:** clean dashboard / landing page with generous padding, rounded
  corners, colored top or left accents per category, and pill tags.
- **Where it lives:** each page's own inline `<style id="theme-classic">`.
  `classic` is the only theme that does not use the portal layout. When it is
  active, `<html>` has no `data-layout` attribute, the original stylesheet
  stays enabled, and `themes.css` hides every `.yj` element. The `.yj-cols` /
  `.yj-center` wrappers become `display: contents`, so the original layout is
  untouched.
- **Signature elements:**
  - The 135° `#0f3d75 → #15803d` gradient.
  - Cards that lift on hover.
  - The category accent colors: navy for main jobs, orange for side jobs,
    green for new jobs.

## 2. Color tokens

The page CSS uses literal hex values. Only `viec-lam-phu.html` declares
variables. For reuse, map them to the names below:

| Suggested variable | Hex | Usage |
|---|---|---|
| `--c-navy` | `#0f3d75` | Gradient start, headings, table header, selected tab, "main jobs" accent |
| `--c-green` | `#15803d` | Gradient end, "new jobs" accent, left border of job cards |
| `--c-orange` | `#ea580c` | "Side jobs" accent |
| `--c-bg` | `#f1f5f9` / `#f4f6fb` | Page background (new-jobs / main-jobs) |
| `--c-card` | `#ffffff` | Cards |
| `--c-text` | `#1e293b` | Body text |
| `--c-muted` | `#64748b` / `#475569` | Subtitles, meta lines |
| `--c-border` | `#cbd5e1` / `#e2e8f0` | Inputs, heading underline, table rows |
| `--c-link` | `#1d4ed8` | Links in tables |
| `--c-deadline` | `#c2410c` | Deadline text |
| `--c-gold` | `#fde68a` | Links on the gradient header |
| Tag A (Rất hợp) | `#dcfce7` / `#166534` | Pill background / text |
| Tag B (Hợp) | `#dbeafe` / `#1e40af` | |
| Tag C (Khá) | `#fef9c3` / `#854d0e` | |
| Tag D | `#fee2e2` / `#991b1b` | |
| Side-jobs page vars | `--g:#1f7a4d; --g2:#e8f5ee; --o:#e07b16; --o2:#fff3e6; --t:#1d2a24; --m:#5f6f66; --bd:#dbe6df` | Green / orange variant used on `viec-lam-phu.html` |

## 3. Typography

```css
font-family: "Segoe UI", Roboto, Arial, sans-serif;
```

| Role | Size | Weight |
|---|---|---|
| Hero title (home) | 34px | 700 |
| Page title | 28px (side jobs), default `h1` elsewhere | 700 |
| Card title (home) | 22px | 700 |
| Section heading | 18–20px | 700 |
| Job title link (new jobs) | 16px | 700 |
| Body / table | 14–15px | 400 |
| Meta, tags | 12–13px | 400 / 600 |

Line-height is the browser default, or 1.45 on the side-jobs page.

## 4. Spacing and layout

- **Home:** full-height gradient body with a centered 860px block, and a
  `repeat(auto-fit, minmax(280px, 1fr))` grid with a 20px gap.
- **New jobs:** 900px main column with 20px padding.
- **Main jobs:** 1100px wrapper with 24px padding.
- **Side jobs:** 1360px wrapper.
- **Cards:** 12–16px radius, 14–24px padding, 10–20px vertical rhythm.
- **Responsive:** there are no explicit breakpoints. The layout relies on
  fluid widths and the auto-fit grid.

## 5. Components

```css
/* Home category card */
a.c{display:block;background:#fff;color:#1e293b;border-radius:16px;padding:24px;
    box-shadow:0 10px 30px #0004;transition:transform .15s;border-top:6px solid #0f3d75}
a.c:hover{transform:translateY(-4px)}

/* Gradient header */
header{background:linear-gradient(135deg,#0f3d75,#15803d);color:#fff;padding:24px}

/* Job card (new jobs) */
.j{background:#fff;border-radius:12px;padding:14px 16px;margin:10px 0;
   box-shadow:0 2px 8px #0001;border-left:5px solid #15803d}

/* Segmented tabs */
.tabs{display:flex;gap:8px}
.tabs button{flex:1;padding:10px;border:0;border-radius:10px;background:#e2e8f0;font-weight:600;color:#334155}
.tabs button.on{background:#0f3d75;color:#fff}

/* Pill tag */
.tag{padding:2px 8px;border-radius:99px;font-size:12px;font-weight:600}

/* Table */
th{background:#0f3d75;color:#fff;text-align:left;padding:8px}
td{padding:8px;border-bottom:1px solid #e2e8f0;vertical-align:top}

/* Side-jobs filter bar (sticky, pill buttons) */
.bar{position:sticky;top:0;background:#fff;border:1px solid var(--bd);border-radius:10px;padding:10px 12px}
.bar button{border:1px solid var(--bd);border-radius:16px;padding:5px 12px}
.bar button.on{background:var(--g);color:#fff}
```

- **Picker:** uses the shared `.tp-*` defaults (white sheet, red current
  marker).
- **Floating button:** because the portal header is hidden, `theme.js` adds
  a floating `.tp-fab` "🎨 Giao diện (Ctrl+K)" button in the bottom-right
  corner. It is visible only in this theme.

## 6. Interaction states

- Home cards rise 4px on hover.
- Links underline on hover.
- Selected tab or filter: solid navy (or green on the side-jobs page) with
  white text.
- Inputs use the browser's default focus ring.

## 7. Accessibility

| Pair | Ratio |
|---|---|
| `#1e293b` on `#f1f5f9` | 13.4 (AAA) |
| white on `#0f3d75` | 10.8 (AAA) |
| link `#1d4ed8` on white | 6.7 (AA) |
| muted `#64748b` on white | 4.8 (AA) |
| tag A `#166534` on `#dcfce7` | 6.5 (AA) |

White text on the lighter green end of the gradient (`#15803d`) is about 5:1,
which is fine for the large header text.

## 8. Do / Don't

**Do**
- Keep the rounded cards and soft shadows.
- Use one accent color per category.

**Don't**
- Don't mix in portal elements (`.yj-*`); they are hidden here on purpose.
- Don't put small gray text on the gradient.

## 9. How to apply

1. The original CSS stays inline in each page as
   `<style id="theme-classic">`.
2. To select the theme, set `<html data-theme="classic">` without
   `data-layout`, and keep that style element enabled (`media="all"`).
   `theme.js` `apply('classic')` does this.
3. To reuse it elsewhere, copy the snippets above. Replace the literal hex
   values with the suggested variables if you want a token-based version.
