# Themes

The job board ships four themes. You switch between them with the
`Ctrl+K` / `Cmd+K` picker or the "Giao diện" button. The choice is saved in
`localStorage["jb-theme"]`.

| id | Label in picker | Layout | Files | Design doc |
|---|---|---|---|---|
| `yahoojp` (default) | Yahoo! JAPAN | portal | `themes/yahoojp/theme.css` | [yahoojp/DESIGN.md](yahoojp/DESIGN.md) |
| `classic` | Cổ điển (giao diện cũ) | original page CSS | inline `<style id="theme-classic">` in each page | [classic/DESIGN.md](classic/DESIGN.md) |
| `dark` | Tối | portal | `themes/dark/theme.css` | [dark/DESIGN.md](dark/DESIGN.md) |
| `steam` | Steam | portal | `themes/steam/theme.css` | [steam/DESIGN.md](steam/DESIGN.md) |

## How it fits together

```
themes.css                  shared base: portal layout, page restyling, picker modal
themes/<name>/theme.css     palette tokens (+ overrides for themes that need them)
theme.js                    theme registry, Ctrl/Cmd+K picker, header search, widgets
<head> inline script        reads localStorage and sets the theme before first paint
```

1. The inline `<head>` script sets `<html data-theme="<id>">`. For every theme
   except `classic` it also sets `data-layout="portal"` and turns off the
   page's original stylesheet (`#theme-classic` gets `media="not all"`).
2. `themes.css` styles the portal layout using only CSS variables. Every rule
   is scoped to `[data-layout="portal"]` or a `.yj-*` class.
3. Each `themes/<name>/theme.css` defines the variables under
   `html[data-theme="<name>"]`. A theme can stop there (`dark`) or add
   overrides scoped to the same selector (`steam`).
4. `theme.js` holds the `THEMES` list used by the picker (id, label,
   description, swatch colors). `apply(id)` flips the same attributes at
   runtime and saves the choice.

## Shared token contract (portal themes)

| Variable | Meaning |
|---|---|
| `--bg` | Page and module background |
| `--fg` | Body text |
| `--muted` | Secondary text: meta lines, timestamps |
| `--link`, `--visited` | Link colors |
| `--red` | Brand accent: wordmark, page-title bar, active nav marker |
| `--bd` | Module borders, tab borders |
| `--bd2` | Light borders: search panel, table header cells |
| `--line` | Hairlines between rows |
| `--panel`, `--panel2` | Tinted surfaces: search bar, tab rows, module headers |
| `--btn`, `--btn-fg` | Primary button |
| `--input-bd` | Text input border |
| `--new`, `--new-fg` | "NEW" badge |
| `--warn-bg`, `--warn-bd` | Safety-warning box |
| `--tp-bg`, `--tp-fg`, `--tp-muted`, `--tp-bd`, `--tp-act`, `--tp-acc`, `--tp-shadow` | Theme picker modal (all themes, `classic` included) |

## Adding a theme

1. Copy `themes/dark/theme.css` to `themes/<id>/theme.css`. Rename the
   selector to `html[data-theme="<id>"]` and change the values.
2. Add `<link rel="stylesheet" href="themes/<id>/theme.css">` after
   `themes.css` in all four pages.
3. Add `<id>` to the regex in each page's inline `<head>` script.
4. Add an entry to `THEMES` in `theme.js`.
5. Write `themes/<id>/DESIGN.md` using the same sections as the existing ones.
