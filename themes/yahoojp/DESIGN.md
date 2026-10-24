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

Defined in `themes/yahoojp/theme.css` on `html[data-theme="yahoojp"]`.

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#ffffff` | Page and module background, selected tab |
| `--fg` | `#000000` | Body text, bullets, selected tab text |
| `--muted` | `#666666` | Meta lines, timestamps, company names |
| `--link` | `#1d3994` | All links, inactive tabs |
| `--visited` | `#5b2a8c` | Visited job links |
| `--red` | `#ff0033` | Wordmark, page-title bar, active nav marker, deadlines, "Rất hợp" tag |
| `--bd` | `#9eb4db` | Module borders, tab row border, selected tab sides |
| `--bd2` | `#cedaf3` | Search panel border, table header cells, date strips |
| `--line` | `#e5e5e5` | Row separators, utility bar hairline, table cells |
| `--panel` | `#f1f5ff` | Search panel, tab row, left column, table header, row hover |
| `--panel2` | `#e6ecfe` | Module header strips |
| `--btn` / `--btn-fg` | `#4070ff` / `#ffffff` | Search button, input focus ring |
| `--input-bd` | `#999999` | Search input border, neutral tag border |
| `--new` / `--new-fg` | `#f5a700` / `#000000` | "NEW" badge |
| `--warn-bg` / `--warn-bd` | `#fff5f6` / `#ffb3c1` | Safety-warning box |

The picker uses the base defaults: `--tp-bg #fff`, `--tp-fg #111`,
`--tp-bd #d5d9e0`, `--tp-act #eef3ff`, `--tp-acc #ff0033`.

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
.yj-util{display:flex;justify-content:space-between;font-size:12px;line-height:20px;border-bottom:1px solid var(--line)}
.yj-logo-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:12px 0 14px}
.yj-svc a{display:flex;flex-direction:column;align-items:center;font-size:11px}   /* emoji 26px above label */
.yj-word{color:var(--red)} .yj-word b{font:900 44px/1 Georgia,"Times New Roman",serif;letter-spacing:-1px}
```

### Search bar
```css
.yj-search{background:var(--panel);border:1px solid var(--bd2);padding:8px 0 12px}
.yj-sin{width:560px;margin:0 auto}
.yj-sbox input{height:34px;border:1px solid var(--input-bd);border-radius:0;font-size:16px}
.yj-sbox button{width:112px;height:34px;border:0;background:var(--btn);color:var(--btn-fg);font-size:15px}
```
The small links above the input (`.yj-stabs`) are 12px. The current page is
bold and uses `--fg`.

### Tabs (news-topics style)
```css
.yj-tabs{display:flex;background:var(--panel);border-bottom:1px solid var(--bd)}
.yj-tabs button{height:35px;padding:0 14px;font-size:12px;color:var(--link);background:transparent;border:0}
.yj-tabs .on{background:var(--bg);color:var(--fg);font-weight:700;
             border-left:1px solid var(--bd);border-right:1px solid var(--bd);margin-bottom:-1px;height:36px}
```
The selected tab merges into the module body because its 1px overlap covers
the row border.

### Boxes / modules
```css
.yj-box{border:1px solid var(--bd);background:var(--bg);margin:0 0 10px}
.yj-box>h3{padding:5px 8px;font-size:13px;font-weight:700;background:var(--panel2);border-bottom:1px solid var(--bd)}
```
The left column boxes use `--panel` as the body color. The warning box swaps
in `--warn-bg` / `--warn-bd` and a red header.

### Topic lists
```css
.yj-topics li{position:relative;display:flex;align-items:baseline;padding:2px 0 2px 11px;white-space:nowrap}
.yj-topics li::before{content:"";position:absolute;left:2px;top:11px;width:4px;height:4px;background:var(--fg);border-radius:50%}
.yj-topics li>a{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}   /* title ellipsizes */
.yj-topics li>.yj-new{flex:none}                                                    /* badge never clipped */
.yj-topics li>small{flex:0 1000 auto;min-width:0;overflow:hidden;text-overflow:ellipsis} /* shrinks first */
```

### Badges
```css
.yj-new{padding:0 3px;font-size:9px;line-height:13px;font-weight:700;color:var(--new-fg);background:var(--new);border-radius:2px}
.tag{padding:0 5px;border-radius:2px;font-size:11px;line-height:16px;font-weight:700}
.tag.a{background:var(--red);color:#fff}   .tag.b{background:var(--link);color:var(--bg)}
.tag.c{background:var(--bg);color:var(--muted);border:1px solid var(--input-bd)}
```

### Buttons
- Primary: the search button (`--btn`, square corners).
- Secondary: `.yj-btn` with a 1px `--bd` border, `--panel` fill, link-colored
  text and 2px radius.

### Tables
```css
table{border-collapse:collapse;font-size:12px}
th{background:var(--panel);font-weight:700;padding:4px 6px;border:1px solid var(--bd2)}
td{padding:4px 6px;border:1px solid var(--line);vertical-align:top}
tr:hover td{background:var(--panel)}
```

### Picker modal
This is the shared `.tp-*` component from `themes.css`:
- A 520px white sheet with a 10px radius, opening 12vh from the top over a
  `rgba(0,0,0,.35)` backdrop.
- A search input, then rows with a 4-color swatch, label and description.
- The current theme has a red left border and "✓ Đang dùng". The
  keyboard-active row is tinted `--tp-act`.

## 6. Interaction states

| Element | Hover | Focus | Active / selected |
|---|---|---|---|
| Links | underline | browser default ring | — |
| Search input | — | border and 1px inset ring in `--btn` | — |
| Search button | `filter: brightness(1.08)` | default ring | — |
| Tabs | underline (link) | default ring | white tab, bold, black text |
| Left nav | underline | default ring | white row, bold, 3px red left bar |
| Home category rows | `--panel` background, title underline | — | — |
| Table rows | `--panel` background | — | — |
| Picker rows | `--tp-act` background | via ↑/↓ | red left border = current theme |

## 7. Accessibility

Contrast ratios (WCAG 2.x):

| Pair | Ratio | Result |
|---|---|---|
| `#000` on `#fff` | 21.0 | AAA |
| link `#1d3994` on `#fff` | 10.2 | AAA |
| link on `--panel2` `#e6ecfe` | 8.6 | AAA |
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
- Use `--panel2` header strips for every module.
- Put lots of short lines in lists, and ellipsize long titles.
- Use red sparingly: brand, deadlines, the top-rated tag.

**Don't**
- Don't add shadows, rounded cards or gradients. They break the portal look.
- Don't use the Yahoo! logo, its icons or the "Yahoo" name as your brand.
  Restyle your own name in the same spirit.
- Don't raise the body size above 14px or use more than two font weights.

## 9. How to apply

1. Load `themes.css` (layout and components) and `themes/yahoojp/theme.css`
   (tokens).
2. Set `<html data-theme="yahoojp" data-layout="portal">`, ideally from an
   inline `<head>` script before first paint.
3. Use the markup classes `.yj-page`, `.yj-mast` (`.yj-util`,
   `.yj-logo-row`, `.yj-search`, `.yj-ticker`), `.yj-cols` (`.yj-left`,
   `.yj-center`, `.yj-right`), `.yj-box > h3 + .yj-bd`, `.yj-tabs`,
   `.yj-topics`, `.yj-new`, `.yj-foot`. See `index.html` for a complete
   example.
4. Elements with class `.yj` exist only in portal themes and are hidden when
   `data-layout` is absent.
