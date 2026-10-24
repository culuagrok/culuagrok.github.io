# Dark theme (`dark`, "Tối")

The Yahoo! JAPAN portal layout recolored for low-light reading. It uses
exactly the same structure and components as `yahoojp`
([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)). Only the tokens change.

## 1. Overview and inspiration

- Neutral near-black page (`#16181d`) with slate-blue panels, soft
  periwinkle links and a pink-red accent.
- It is meant for evening use. Contrast stays high, but nothing is pure
  white on pure black.
- It has no component overrides. If a component looks wrong here, fix the
  token or the shared rule in `themes.css`.

## 2. Color tokens

Defined in `themes/dark/theme.css` on `html[data-theme="dark"]`:

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#16181d` | Page, modules, selected tab |
| `--fg` | `#e4e6eb` | Body text, bullets |
| `--muted` | `#9aa0a8` | Meta, timestamps |
| `--link` | `#8fb0ff` | Links, inactive tabs |
| `--visited` | `#c3a6ff` | Visited job links |
| `--red` | `#ff4d6a` | Wordmark, title bar, active nav, deadlines, top tag |
| `--bd` | `#3b465c` | Module borders |
| `--bd2` | `#2d3546` | Search panel border, table header cells |
| `--line` | `#2a2f3a` | Row separators |
| `--panel` | `#1d2330` | Search panel, tab row, left column, row hover |
| `--panel2` | `#232b3b` | Module header strips |
| `--btn` / `--btn-fg` | `#3a63e0` / `#ffffff` | Search button |
| `--input-bd` | `#4a5468` | Input border |
| `--new` / `--new-fg` | `#d99400` / `#000000` | NEW badge |
| `--warn-bg` / `--warn-bd` | `#2a1a1e` / `#6b2a36` | Warning box |
| `--tp-bg` `--tp-fg` `--tp-muted` `--tp-bd` `--tp-act` `--tp-acc` | `#1f232b` `#e4e6eb` `#9aa0a8` `#353b47` `#2a3246` `#ff4d6a` | Picker |

`color-scheme: dark` is set, so native controls (checkboxes, scrollbars)
are dark too.

## 3. Typography

Same as `yahoojp`: Arial / Helvetica Neue / Segoe UI / Noto Sans first, then
Hiragino and Meiryo. Body 14px, modules 13px, tabs and meta 12px.

## 4. Spacing and layout grid

Same as `yahoojp`:
- 990px page; columns 170 / 1fr / 300 with a 10px gap.
- One column at `≤1010px`; compact masthead at `≤700px`.

## 5. Components

The `yahoojp` components are inherited as-is: masthead, search bar, tabs,
boxes, topic lists, badges, tables and picker. Notable results of the token
swap:
- Selected tabs use `--bg` (`#16181d`), so they look "cut out" of the slate
  tab row.
- The "Hợp" tag (`.tag.b`) is light link-blue with dark text, because it uses
  `background:var(--link); color:var(--bg)`.
- The picker sheet is `#1f232b`, its active row is `#2a3246`, and the current
  theme has a pink-red marker.

## 6. Interaction states

Same as `yahoojp`. Hover surfaces use `--panel` (`#1d2330`); link hover is
an underline.

## 7. Accessibility

| Pair | Ratio |
|---|---|
| `#e4e6eb` on `#16181d` | 14.2 (AAA) |
| link `#8fb0ff` on `#16181d` | 8.3 (AAA) |
| link on `--panel2` | 6.6 (AA) |
| muted `#9aa0a8` on `#16181d` | 6.7 (AA) |
| accent `#ff4d6a` on `#16181d` | 5.5 (AA) |
| white on `#3a63e0` | 5.2 (AA) |
| NEW `#000` on `#d99400` | ≈8 (AAA) |

## 8. Do / Don't

**Do**
- Keep surfaces within a narrow luminance band (`#16181d` → `#232b3b`).
- Use borders rather than shadows to separate modules.

**Don't**
- Don't use pure `#000` backgrounds or pure `#fff` body text.
- Don't add theme-specific rules unless a token cannot express the change.

## 9. How to apply

1. Load `themes.css` and `themes/dark/theme.css`.
2. Set `<html data-theme="dark" data-layout="portal">`.
3. Use the same markup as `yahoojp`.

To make another color variant, copy this file's token block under a new
`html[data-theme="<id>"]` selector.
