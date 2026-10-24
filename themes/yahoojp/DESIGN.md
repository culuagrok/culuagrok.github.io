# Yahoo! JAPAN theme (`yahoojp`)

The default theme. It is a dense Japanese web-portal look modeled on the
yahoo.co.jp home page. It uses text and CSS only. There are no Yahoo logos,
images or icon assets, and the wordmark is the site's own name set in a
heavy serif.

## 1. Overview and inspiration

- **Feel:** information-dense, utilitarian, white page, small type. Many
  boxed modules sit side by side in a fixed-width three-column grid.
- **Reference values** (measured from yahoo.co.jp in Oct 2026):
  - 990px page width; columns 170 / ~500 / 300.
  - Body text 14px.
  - Link color `#1d3994`.
  - Module border `#9eb4db`, module header `#e6ecfe`, search panel `#f1f5ff`.
  - Search button `#4070ff`.
  - Red wordmark.
- **Signature elements:**
  - Thin utility bar at the top.
  - Centered red wordmark with service shortcuts on both sides.
  - Pale blue search panel with a solid blue button.
  - News-style tabs.
  - Dotted topic lists with small "NEW" badges.

## 2. Color tokens

Defined in the Tailwind v4 `@theme` block in `themes/yahoojp/theme.css`.
Because `yahoojp` is the default theme, these are the `:root` values that
every other theme overrides (see section 10).

| Variable | Hex | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Page and module background, selected tab |
| `--color-fg` | `#000000` | Body text, bullets, selected tab text |
| `--color-muted` | `#666666` | Meta lines, timestamps, company names |
| `--color-link` | `#1d3994` | All links, inactive tabs |
| `--color-visited` | `#5b2a8c` | Visited job links |
| `--color-accent` | `#ff0033` | Wordmark, page-title bar, active nav marker, deadlines, "Rất hợp" tag |
| `--color-bd` | `#9eb4db` | Module borders, tab row border, selected tab sides |
| `--color-bd2` | `#cedaf3` | Search panel border, table header cells, date strips |
| `--color-line` | `#e5e5e5` | Row separators, utility bar hairline, table cells |
| `--color-panel` | `#f1f5ff` | Search panel, tab row, left column, table header, row hover |
| `--color-panel2` | `#e6ecfe` | Module header strips |
| `--color-btn` / `--color-btn-fg` | `#4070ff` / `#ffffff` | Search button, input focus ring |
| `--color-input-bd` | `#999999` | Search input border, neutral tag border |
| `--color-new` / `--color-new-fg` | `#f5a700` / `#000000` | "NEW" badge |
| `--color-warn-bg` / `--color-warn-bd` | `#fff5f6` / `#ffb3c1` | Safety-warning box |

The picker tokens are part of the same `@theme` block: `--color-picker-bg #fff`, `--color-picker-fg #111`,
`--color-picker-bd #d5d9e0`, `--color-picker-act #eef3ff`, `--color-picker-acc #ff0033`.

## 3. Typography

```css
font-family: Arial, "Helvetica Neue", "Segoe UI", "Noto Sans", Roboto,
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "MS PGothic", sans-serif;
```

Latin and Vietnamese-capable fonts come first, so Vietnamese diacritics
render in one font. The Japanese gothic fonts are fallbacks that give the
same feel for CJK text.

| Role | Size | Weight | Line-height |
|---|---|---|---|
| Body, topic list items, job titles | 14px | 400 | 1.5 (21px in lists) |
| Module header (`.yj-box > h3`) | 13px | 700 | 18px |
| Left nav items, module body | 13px | 400 | 1.5 |
| Tabs, meta lines, tables, utility bar | 12px | 400 (700 when selected) | 1.45 |
| Timestamps, company in topics | 11px | 400 | — |
| "NEW" badge | 9px | 700 | 13px |
| Page title (`h1` in center) | 16px | 700 | 1.3 |
| Wordmark | 44px Georgia/Times serif, 900, `letter-spacing:-1px`, `scaleY(1.08)` | | 1 |
| Wordmark subline | 14px serif, 700, `letter-spacing:5px` | | 1 |

## 4. Spacing and layout grid

- Page: `.yj-page { width: 990px; margin: 0 auto }`.
- Columns: `.yj-cols { display:grid; grid-template-columns: 170px minmax(0,1fr) 300px; gap: 10px }`.
  - Index and new-jobs pages: three columns (left nav, center, right widgets).
  - Main-jobs page: two columns, `170px 1fr`.
  - Side-jobs page: one full-width column, up to 1240px, with the left nav
    collapsed into a strip, so the 8-column table fits without scrolling.
- Module spacing: 10px between modules. Header padding `5px 8px`, body
  padding `6px 8px`.
- Breakpoints:
  - `≤1010px`: fluid width with 8px gutters, one column, left nav becomes a
    wrapping strip on top.
  - `≤700px`: service shortcuts hidden, wordmark 34px, ticker items stacked.

## 5. Components

### Utility bar and masthead
```css
.yj-util{display:flex;justify-content:space-between;font-size:12px;line-height:20px;border-bottom:1px solid var(--color-line)}
.yj-logo-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:12px 0 14px}
.yj-svc a{display:flex;flex-direction:column;align-items:center;font-size:11px}   /* emoji 26px above label */
.yj-word{color:var(--color-accent)} .yj-word b{font:900 44px/1 Georgia,"Times New Roman",serif;letter-spacing:-1px}
```

### Search bar
```css
.yj-search{background:var(--color-panel);border:1px solid var(--color-bd2);padding:8px 0 12px}
.yj-sin{width:560px;margin:0 auto}
.yj-sbox input{height:34px;border:1px solid var(--color-input-bd);border-radius:0;font-size:16px}
.yj-sbox button{width:112px;height:34px;border:0;background:var(--color-btn);color:var(--color-btn-fg);font-size:15px}
```
The small links above the input (`.yj-stabs`) are 12px. The current page is
bold and uses `--color-fg`.

### Tabs (news-topics style)
```css
.yj-tabs{display:flex;background:var(--color-panel);border-bottom:1px solid var(--color-bd)}
.yj-tabs button{height:35px;padding:0 14px;font-size:12px;color:var(--color-link);background:transparent;border:0}
.yj-tabs .on{background:var(--color-bg);color:var(--color-fg);font-weight:700;
             border-left:1px solid var(--color-bd);border-right:1px solid var(--color-bd);margin-bottom:-1px;height:36px}
```
The selected tab merges into the module body because its 1px overlap covers
the row border.

### Boxes / modules
```css
.yj-box{border:1px solid var(--color-bd);background:var(--color-bg);margin:0 0 10px}
.yj-box>h3{padding:5px 8px;font-size:13px;font-weight:700;background:var(--color-panel2);border-bottom:1px solid var(--color-bd)}
```
The left column boxes use `--color-panel` as the body color. The warning box swaps
in `--color-warn-bg` / `--color-warn-bd` and a red header.

### Topic lists
```css
.yj-topics li{position:relative;display:flex;align-items:baseline;padding:2px 0 2px 11px;white-space:nowrap}
.yj-topics li::before{content:"";position:absolute;left:2px;top:11px;width:4px;height:4px;background:var(--color-fg);border-radius:50%}
.yj-topics li>a{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}   /* title ellipsizes */
.yj-topics li>.yj-new{flex:none}                                                    /* badge never clipped */
.yj-topics li>small{flex:0 1000 auto;min-width:0;overflow:hidden;text-overflow:ellipsis} /* shrinks first */
```

### Badges
```css
.yj-new{padding:0 3px;font-size:9px;line-height:13px;font-weight:700;color:var(--color-new-fg);background:var(--color-new);border-radius:2px}
.tag{padding:0 5px;border-radius:2px;font-size:11px;line-height:16px;font-weight:700}
.tag.a{background:var(--color-accent);color:#fff}   .tag.b{background:var(--color-link);color:var(--color-bg)}
.tag.c{background:var(--color-bg);color:var(--color-muted);border:1px solid var(--color-input-bd)}
```

### Buttons
- Primary: the search button (`--color-btn`, square corners).
- Secondary: `.yj-btn` with a 1px `--color-bd` border, `--color-panel` fill, link-colored
  text and 2px radius.

### Tables
```css
table{border-collapse:collapse;font-size:12px}
th{background:var(--color-panel);font-weight:700;padding:4px 6px;border:1px solid var(--color-bd2)}
td{padding:4px 6px;border:1px solid var(--color-line);vertical-align:top}
tr:hover td{background:var(--color-panel)}
```

### Picker modal
This is the shared `.tp-*` component from `src/portal.css`:
- A 520px white sheet with a 10px radius, opening 12vh from the top over a
  `rgba(0,0,0,.35)` backdrop.
- A search input, then rows with a 4-color swatch, label and description.
- The current theme has a red left border and "✓ Đang dùng". The
  keyboard-active row is tinted `--color-picker-act`.

## 6. Interaction states

| Element | Hover | Focus | Active / selected |
|---|---|---|---|
| Links | underline | browser default ring | — |
| Search input | — | border and 1px inset ring in `--color-btn` | — |
| Search button | `filter: brightness(1.08)` | default ring | — |
| Tabs | underline (link) | default ring | white tab, bold, black text |
| Left nav | underline | default ring | white row, bold, 3px red left bar |
| Home category rows | `--color-panel` background, title underline | — | — |
| Table rows | `--color-panel` background | — | — |
| Picker rows | `--color-picker-act` background | via ↑/↓ | red left border = current theme |

## 7. Accessibility

Contrast ratios (WCAG 2.x):

| Pair | Ratio | Result |
|---|---|---|
| `#000` on `#fff` | 21.0 | AAA |
| link `#1d3994` on `#fff` | 10.2 | AAA |
| link on `--color-panel2` `#e6ecfe` | 8.6 | AAA |
| muted `#666` on `#fff` | 5.7 | AA |
| white on button `#4070ff` | 4.2 | AA large / UI only |
| `#ff0033` on white (and white on red tag) | 4.0 | AA large only; keep for accents and bold labels |
| NEW badge `#000` on `#f5a700` | 10.4 | AAA |

- Body text is at least 12px. Do not use 9–11px for anything except badges
  and timestamps.
- Tabs are real `<button>`s and the picker is keyboard-operable
  (`role="dialog"`, `listbox` / `option`, `aria-activedescendant`).

## 8. Do / Don't

**Do**
- Keep everything inside the 990px grid, with square corners and 1px borders.
- Use `--color-panel2` header strips for every module.
- Put lots of short lines in lists, and ellipsize long titles.
- Use red sparingly: brand, deadlines, the top-rated tag.

**Don't**
- Don't add shadows, rounded cards or gradients. They break the portal look.
- Don't use the Yahoo! logo, its icons or the "Yahoo" name as your brand.
  Restyle your own name in the same spirit.
- Don't raise the body size above 14px or use more than two font weights.

## 9. How to apply

1. Link the compiled stylesheet `assets/tailwind.css`. It contains the
   tokens, the portal layout and components (`src/portal.css`) and all theme
   overrides. Rebuild it with `npm run build:css` after editing any source
   CSS.
2. Set `<html data-theme="yahoojp" data-layout="portal">`, ideally from an
   inline `<head>` script before first paint.
3. Use the markup classes `.yj-page`, `.yj-mast` (`.yj-util`,
   `.yj-logo-row`, `.yj-search`, `.yj-ticker`), `.yj-cols` (`.yj-left`,
   `.yj-center`, `.yj-right`), `.yj-box > h3 + .yj-bd`, `.yj-tabs`,
   `.yj-topics`, `.yj-new`, `.yj-foot`. See `index.html` for a complete
   example.
4. Elements with class `.yj` exist only in portal themes and are hidden when
   `data-layout` is absent.

## 10. Tailwind v4 tokens and utilities

The site is built with Tailwind CSS v4 (CSS-first config, no
`tailwind.config.js`). This is the token block from
`themes/yahoojp/theme.css`:

```css
@theme {
  /* Palette */
  --color-bg: #fff;
  --color-fg: #000;
  --color-muted: #666;
  --color-link: #1d3994;
  --color-visited: #5b2a8c;
  --color-accent: #ff0033;
  --color-bd: #9eb4db;
  --color-bd2: #cedaf3;
  --color-line: #e5e5e5;
  --color-panel: #f1f5ff;
  --color-panel2: #e6ecfe;
  --color-btn: #4070ff;
  --color-btn-fg: #fff;
  --color-input-bd: #999;
  --color-new: #f5a700;
  --color-new-fg: #000;
  --color-warn-bg: #fff5f6;
  --color-warn-bd: #ffb3c1;

  /* Theme picker modal */
  --color-picker-bg: #fff;
  --color-picker-fg: #111;
  --color-picker-muted: #666;
  --color-picker-bd: #d5d9e0;
  --color-picker-act: #eef3ff;
  --color-picker-acc: #ff0033;
  --shadow-picker: 0 12px 40px rgba(0,0,0,.25);

  /* Fonts */
  --font-portal: Arial, "Helvetica Neue", "Segoe UI", "Noto Sans", Roboto, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "MS PGothic", sans-serif;
  --font-wordmark: Georgia, "Times New Roman", "Noto Serif", serif;
  --font-picker: Arial, "Helvetica Neue", "Segoe UI", "Noto Sans", Roboto, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  --font-kbd: ui-monospace, Menlo, Consolas, monospace;

  /* Layout widths */
  --container-portal: 990px;
  --container-portal-wide: 1240px;
}
```

Tailwind emits these variables on `:root` and generates utilities from
them when the markup uses them:

| Token | Example utilities |
|---|---|
| `--color-link`, `--color-accent`, `--color-muted`, ... | `text-link`, `text-accent`, `text-muted`, `bg-panel2`, `border-bd`, `border-b-line` |
| `--color-new` / `--color-new-fg` | `bg-new text-new-fg` (the NEW badge) |
| `--font-portal`, `--font-wordmark` | `font-portal`, `font-wordmark` |
| `--container-portal` | `w-portal`, `max-w-portal` |
| `--shadow-picker` | `shadow-picker` |

Other themes switch the look by overriding the same variables under
`html[data-theme="<id>"]`, so the same utilities and component rules
recolor automatically. `src/tailwind.css` also defines one variant per
theme with `@custom-variant`, for example
`<b class="text-accent steam:uppercase">`.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file with `@import "tailwindcss";`.
2. Paste the `@theme` block above into it. Every `--color-*` token becomes
   `bg-*`, `text-*`, `border-*`, `ring-*`, ... utilities, and every `--font-*`
   token a `font-*` utility.
3. Write markup with the utilities, or copy the component rules from
   `src/portal.css` and keep the `var(--color-*)` references.
4. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
5. For a Yahoo! JAPAN look with a switchable dark mode, keep this block as
   the default and add `html[data-theme="dark"] { --color-bg: ...; }`
   overrides (see `../dark/DESIGN.md`).
