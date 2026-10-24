# Catppuccin Mocha theme (`catppuccin`)

Catppuccin's darkest flavor, Mocha, on the portal layout: soft pastel
accents on a deep blue-violet base, with a darker "crust" page behind the
modules and generous 12px corners.

**Source and license:** official Mocha palette from `@catppuccin/palette` 1.8.0
(https://catppuccin.com/palette, https://github.com/catppuccin/catppuccin,
about 19.9k GitHub stars), MIT License, Copyright (c) 2021 Catppuccin.
Catppuccin also publishes an official Tailwind plugin
(`@catppuccin/tailwindcss`).

## 1. Overview and inspiration

- **Feel:** cozy, low-glare dark mode with pastel color.
- **Palette roles:** Crust `#11111b` page, Mantle `#181825` side panels,
  Base `#1e1e2e` modules, Surface0/1 for strips and borders, Text
  `#cdd6f4`, Subtext0 `#a6adc8`, Mauve `#cba6f7` accent, Blue `#89b4fa`
  links and button, Lavender `#b4befe` visited, Green `#a6e3a1` NEW, Red
  `#f38ba8` warnings, Peach `#fab387` deadlines, Pink `#f5c2e7` subline.
- This follows the Catppuccin style guide: Mauve as the main accent, Blue
  for links, Red for errors, Peach for warnings-of-time.

## 2. Color tokens

Defined in `themes/catppuccin/theme.css` as overrides of the shared Tailwind
`@theme` tokens, scoped to `html[data-theme="catppuccin"]`. All hex values are taken unchanged from the Mocha flavor.

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#1e1e2e` | Page and module background, selected tab |
| `--color-fg` | `#cdd6f4` | Body text, bullets |
| `--color-muted` | `#a6adc8` | Meta lines, timestamps, company names |
| `--color-link` | `#89b4fa` | Links, inactive tabs |
| `--color-visited` | `#b4befe` | Visited job links |
| `--color-accent` | `#cba6f7` | Wordmark, page-title bar, active nav marker, "Rất hợp" tag |
| `--color-accent-fg` | `#11111b` | Text on accent fills (tag, group number) |
| `--color-bd` | `#45475a` | Module borders (Surface1) |
| `--color-bd2` | `#313244` | Light borders (Surface0) |
| `--color-line` | `#313244` | Row separators (Surface0) |
| `--color-panel` | `#181825` | Search panel, left column (Mantle) |
| `--color-panel2` | `#313244` | Module header strips (Surface0) |
| `--color-btn` | `#89b4fa` | Search button |
| `--color-btn-fg` | `#11111b` | Search button text |
| `--color-input-bd` | `#6c7086` | Input border (Overlay0) |
| `--color-new` | `#a6e3a1` | "NEW" badge |
| `--color-new-fg` | `#11111b` | "NEW" badge text |
| `--color-warn-bg` | `#2f2333` | Warning tint (Red over Base, derived) |
| `--color-warn-bd` | `#f38ba8` | Safety-warning box border |
| `--color-picker-bg` | `#1e1e2e` | Picker sheet |
| `--color-picker-fg` | `#cdd6f4` | Picker text |
| `--color-picker-muted` | `#a6adc8` | Picker descriptions |
| `--color-picker-bd` | `#45475a` | Picker borders |
| `--color-picker-act` | `#313244` | Picker keyboard-active row |
| `--color-picker-acc` | `#cba6f7` | Picker current-theme marker |

Theme-only custom properties (not `@theme` tokens):

| Variable | Value |
|---|---|
| `--ctp-red` | `#f38ba8` |
| `--ctp-peach` | `#fab387` |
| `--ctp-pink` | `#f5c2e7` |
| `--ctp-lavender` | `#b4befe` |
| `--ctp-crust` | `#11111b` |

`color-scheme: dark` is set, so native controls match.

## 3. Typography

Shared portal font stack and sizes (as `yahoojp`). The wordmark keeps the
serif stack at 44px / 800, `letter-spacing:0`, no vertical stretch, in
Mauve; the subline is Pink.

## 4. Spacing and layout grid

Same grid as `yahoojp` ([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)):
- 990px page; columns 170 / 1fr / 300 with a 10px gap (two columns on the
  main-jobs page, one full-width column up to 1240px on the side-jobs page).
- One column at `≤1010px`; compact masthead at `≤700px`.

The page background is Crust; modules are Base; the left column is
Mantle. Corners: 12px modules, 8px fields and buttons, 6px badges.

## 5. Components

The portal components (masthead, search bar, tabs, boxes, topic lists,
badges, tables, picker) come from `src/portal.css` and are recolored by
the tokens above. This theme adds these overrides, all nested under
`html[data-theme="catppuccin"]`:

- **Page:** `body` is Crust `#11111b`; boxes, cards and new-jobs `main`
  are Base.
- **Search:** Blue button with Crust text, Lavender on hover; Mauve focus
  ring on the input.
- **Active nav item:** Mauve left marker.
- **Warnings** in Red, **deadlines** in Peach.

## 6. Interaction states

| Element | Hover | Focus | Selected |
|---|---|---|---|
| Links (Blue) | underline | default ring | visited = Lavender |
| Search input | — | Mauve border + inset ring | — |
| Search button | Lavender | default ring | — |
| Picker rows | Surface0 | via ↑/↓ | Mauve left border |

## 7. Accessibility

Measured with WCAG 2.x relative luminance (`culori` `wcagContrast`), and
checked on every text run of the four pages in headless Chrome.

| Pair | Colors | Ratio | Level |
|---|---|---|---|
| Body text | `#cdd6f4` on `#1e1e2e` | 11.3 | AAA |
| Meta text | `#a6adc8` on `#1e1e2e` | 7.4 | AAA |
| Meta text on panels | `#a6adc8` on `#181825` | 7.9 | AAA |
| Links | `#89b4fa` on `#1e1e2e` | 7.8 | AAA |
| Links in module headers | `#89b4fa` on `#313244` | 6.0 | AA |
| Visited links | `#b4befe` on `#1e1e2e` | 9.2 | AAA |
| Accent (wordmark, bars) | `#cba6f7` on `#1e1e2e` | 8.1 | AAA |
| NEW badge | `#11111b` on `#a6e3a1` | 12.6 | AAA |
| Search button | `#11111b` on `#89b4fa` | 8.9 | AAA |
| Tag "Hợp" (`.tag.b`) | `#1e1e2e` on `#89b4fa` | 7.8 | AAA |
| Picker description, active row | `#a6adc8` on `#313244` | 5.6 | AA |
| Warning text | `#f38ba8` on `#2f2333` | 6.4 | AA |
| Deadline | `#fab387` on `#1e1e2e` | 9.3 | AAA |

Exception: the decorative "|" separators use Surface0 (1.5:1). All text
pairs meet AA without changing any Catppuccin value.

## 8. Do / Don't

**Do**
- Use Mauve sparingly as the single accent; Blue for links.
- Layer Crust < Mantle < Base < Surface for depth instead of shadows.

**Don't**
- Don't mix colors from other flavors (Latte, Frappé, Macchiato).
- Don't use Overlay colors for body text.

## 9. How to apply

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/catppuccin/theme.css` after the shared layout).
2. Set `<html data-theme="catppuccin" data-layout="portal">`, or pick
   "Catppuccin Mocha" in the `Ctrl+K` / `Cmd+K` picker. The choice is saved in
   `localStorage["jb-theme"]`.
3. Use the same markup as `yahoojp`.

## 10. Tailwind v4 tokens and utilities

On this site the theme overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` at runtime:

```css
html[data-theme="catppuccin"] {
  /* Shared tokens */
  --color-bg: #1e1e2e;
  --color-fg: #cdd6f4;
  --color-muted: #a6adc8;
  --color-link: #89b4fa;
  --color-visited: #b4befe;
  --color-accent: #cba6f7;
  --color-accent-fg: #11111b;
  --color-bd: #45475a;
  --color-bd2: #313244;
  --color-line: #313244;
  --color-panel: #181825;
  --color-panel2: #313244;
  --color-btn: #89b4fa;
  --color-btn-fg: #11111b;
  --color-input-bd: #6c7086;
  --color-new: #a6e3a1;
  --color-new-fg: #11111b;
  --color-warn-bg: #2f2333;
  --color-warn-bd: #f38ba8;
  --color-picker-bg: #1e1e2e;
  --color-picker-fg: #cdd6f4;
  --color-picker-muted: #a6adc8;
  --color-picker-bd: #45475a;
  --color-picker-act: #313244;
  --color-picker-acc: #cba6f7;
  --shadow-picker: 0 12px 40px rgba(17,17,27,.6);
  /* Mocha colors not mapped to a shared token */
  --ctp-red: #f38ba8;
  --ctp-peach: #fab387;
  --ctp-pink: #f5c2e7;
  --ctp-lavender: #b4befe;
  --ctp-crust: #11111b;
  color-scheme: dark;
  /* ...component overrides... */
}
```

Utilities such as `bg-panel`, `text-link` or `border-bd` compile to
`var(--color-*)`, so they follow this block. `src/tailwind.css` also
defines the variant

```css
@custom-variant catppuccin (&:where([data-theme="catppuccin"], [data-theme="catppuccin"] *));
```

so `class="bg-panel catppuccin:rounded-xl"` only applies in this theme.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file:

```css
@import "tailwindcss";
@theme {
  --color-ctp-crust: #11111b;
  --color-ctp-mantle: #181825;
  --color-ctp-base: #1e1e2e;
  --color-ctp-surface0: #313244;
  --color-ctp-surface1: #45475a;
  --color-ctp-overlay0: #6c7086;
  --color-ctp-subtext0: #a6adc8;
  --color-ctp-text: #cdd6f4;
  --color-ctp-mauve: #cba6f7;
  --color-ctp-blue: #89b4fa;
  --color-ctp-lavender: #b4befe;
  --color-ctp-green: #a6e3a1;
  --color-ctp-red: #f38ba8;
  --color-ctp-peach: #fab387;
  --color-ctp-pink: #f5c2e7;
}
```

2. Every `--color-*` token becomes `bg-*`, `text-*`, `border-*`, `ring-*`, ...
   utilities and every `--font-*` token a `font-*` utility, e.g.
   `<div class="rounded-xl bg-ctp-base text-ctp-text">` or
   `<a class="text-ctp-blue visited:text-ctp-lavender">`.
3. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
4. To keep it switchable next to other themes, put the values under
   `[data-theme="catppuccin"] { ... }` instead (as this site does) and keep a
   default palette in `@theme`.
5. Or use the official plugin: `npm i -D @catppuccin/tailwindcss` and
   `@import "@catppuccin/tailwindcss/mocha.css";` (see its README), which
   provides `bg-ctp-base`, `text-ctp-mauve`, ... for every flavor.

