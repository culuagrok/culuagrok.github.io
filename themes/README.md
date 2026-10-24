# Themes

The job board ships four themes. You switch between them with the
`Ctrl+K` / `Cmd+K` picker or the "Giao diện" button. The choice is saved in
`localStorage["jb-theme"]`.

| id | Label in picker | Layout | Source file | Design doc |
|---|---|---|---|---|
| `yahoojp` (default) | Yahoo! JAPAN | portal | `themes/yahoojp/theme.css` (`@theme` tokens) | [yahoojp/DESIGN.md](yahoojp/DESIGN.md) |
| `classic` | Cổ điển (giao diện cũ) | original page CSS | inline `<style id="theme-classic">` in each page | [classic/DESIGN.md](classic/DESIGN.md) |
| `dark` | Tối | portal | `themes/dark/theme.css` | [dark/DESIGN.md](dark/DESIGN.md) |
| `steam` | Steam | portal | `themes/steam/theme.css` | [steam/DESIGN.md](steam/DESIGN.md) |

## How it fits together

The portal themes are built with **Tailwind CSS v4** (CSS-first config, no
`tailwind.config.js`, no Play CDN). The pages link one compiled, committed
file, so GitHub Pages serves it without a build step.

```
src/tailwind.css            build entry: Tailwind theme + utilities layers, imports, @source, @custom-variant
themes/yahoojp/theme.css    @theme block = shared token contract with the default (Yahoo! JAPAN) values
src/portal.css              shared portal layout, page restyling, picker modal (uses var(--color-*) tokens)
themes/dark/theme.css       html[data-theme="dark"] token overrides
themes/steam/theme.css      html[data-theme="steam"] token overrides + nested component overrides
assets/tailwind.css         compiled, minified output linked by every page (do not edit by hand)
theme.js                    theme registry, Ctrl/Cmd+K picker, header search, widgets
<head> inline script        reads localStorage["jb-theme"] and sets the theme before first paint
```

1. The inline `<head>` script sets `<html data-theme="<id>">` (default
   `yahoojp`). For every theme except `classic` it also sets
   `data-layout="portal"` and turns off the page's original stylesheet
   (`#theme-classic` gets `media="not all"`).
2. `@theme` in `themes/yahoojp/theme.css` declares the tokens. Tailwind emits
   them on `:root` and makes them available as utilities (`bg-panel`,
   `text-link`, `font-portal`, ...).
3. `src/portal.css` styles the portal layout using only those variables.
   Every rule is scoped to `[data-layout="portal"]` or a `.yj-*` / `.tp-*`
   class. The class names are the ones the pages and the scripts emit
   (`viec-moi.html` renders `new-jobs.json` rows as `.j`, `.m`, `.r`, `.dl`,
   `.e`; `theme.js` renders `.yj-topics li`, `.yj-new`, `.tp-*`), so the
   daily job update needs no CSS rebuild.
4. Each other theme overrides the same variables under
   `html[data-theme="<name>"]`. A theme can stop there (`dark`) or add nested
   overrides in the same block (`steam`).
5. `src/tailwind.css` defines a variant per theme with `@custom-variant`
   (`yahoojp:`, `classic:`, `dark:`, `steam:`, plus `portal:`), for markup that
   uses utilities.
6. `theme.js` holds the `THEMES` list used by the picker (id, label,
   description, swatch colors). `apply(id)` flips the same attributes at
   runtime and saves the choice.

### Why there is no Preflight and no `@layer` around the components

- Tailwind's Preflight reset is not imported, because the `classic` theme is
  the original inline CSS and depends on browser default styles.
- The component rules in `src/portal.css` and the theme files are plain,
  unlayered CSS. The classic inline `<style>` is unlayered too, and
  unlayered CSS beats any `@layer`, so keeping the components unlayered
  keeps the original cascade. Tailwind utilities live in
  `@layer utilities`, so a utility class does not override a component rule
  of the same element; use utilities on new markup or with `!`
  (`bg-panel!`).

## Build

Requires Node.js 20 or later.

```sh
npm install          # installs tailwindcss and @tailwindcss/cli (pinned)
npm run build:css    # src/tailwind.css -> assets/tailwind.css (minified)
npm run watch:css    # rebuild on change while editing
```

Commit `assets/tailwind.css` together with the source change. Without npm,
the standalone CLI works the same way:
`./tailwindcss -i src/tailwind.css -o assets/tailwind.css --minify`
(binary from https://github.com/tailwindlabs/tailwindcss/releases).

## Shared token contract (portal themes)

| Variable | Utility examples | Meaning |
|---|---|---|
| `--color-bg` | `bg-bg` | Page and module background |
| `--color-fg` | `text-fg` | Body text |
| `--color-muted` | `text-muted` | Secondary text: meta lines, timestamps |
| `--color-link`, `--color-visited` | `text-link`, `visited:text-visited` | Link colors |
| `--color-accent` | `text-accent`, `border-l-accent` | Brand accent: wordmark, page-title bar, active nav marker (was `--red`) |
| `--color-bd` | `border-bd` | Module borders, tab borders |
| `--color-bd2` | `border-bd2` | Light borders: search panel, table header cells |
| `--color-line` | `border-line` | Hairlines between rows |
| `--color-panel`, `--color-panel2` | `bg-panel`, `bg-panel2` | Tinted surfaces: search bar, tab rows, module headers |
| `--color-btn`, `--color-btn-fg` | `bg-btn text-btn-fg` | Primary button |
| `--color-input-bd` | `border-input-bd` | Text input border |
| `--color-new`, `--color-new-fg` | `bg-new text-new-fg` | "NEW" badge |
| `--color-warn-bg`, `--color-warn-bd` | `bg-warn-bg border-warn-bd` | Safety-warning box |
| `--color-picker-bg`, `-fg`, `-muted`, `-bd`, `-act`, `-acc`, `--shadow-picker` | `bg-picker-bg`, `shadow-picker` | Theme picker modal (all themes, `classic` included) |
| `--font-portal`, `--font-wordmark`, `--font-picker`, `--font-kbd` | `font-portal`, ... | Font stacks |
| `--container-portal`, `--container-portal-wide` | `w-portal`, `max-w-portal-wide` | 990px page, 1240px side-jobs page |

## Adding a theme

1. Copy `themes/dark/theme.css` to `themes/<id>/theme.css`. Rename the
   selector to `html[data-theme="<id>"]` and change the values.
2. Add `@import "../themes/<id>/theme.css";` to `src/tailwind.css` after
   `./portal.css`, and a
   `@custom-variant <id> (&:where([data-theme="<id>"], [data-theme="<id>"] *));`
   line.
3. Run `npm run build:css` and commit `assets/tailwind.css`.
4. Add `<id>` to the regex in each page's inline `<head>` script.
5. Add an entry to `THEMES` in `theme.js`.
6. Write `themes/<id>/DESIGN.md` using the same sections as the existing ones.
