# Nord (light) theme (`nord`)

Nord's "Snow Storm" light ambiance with Frost blues, like the daisyUI
`nord` theme: a cool gray-blue page, white modules, quiet Polar Night text
and an arctic-blue wordmark.

**Source and license:** official Nord palette (nord0–nord15) from https://www.nordtheme.com
(https://github.com/nordtheme/nord, about 6.9k GitHub stars), MIT License,
Copyright (c) 2016 Sven Greb. The light variant follows the built-in
`nord` theme of daisyUI (MIT), the most downloaded Tailwind component
library (about 4M npm downloads per month).

## 1. Overview and inspiration

- **Feel:** calm, cold and clean; low saturation.
- **Palette roles:** Snow Storm nord6 `#eceff4` page, nord5 `#e5e9f0`
  panels, nord4 `#d8dee9` borders and header strips, Polar Night nord0
  `#2e3440` text and nord3 `#4c566a` meta, Frost nord10 `#5e81ac` accent
  and nord9 `#81a1c1` button, Aurora nord13 `#ebcb8b` NEW badge, nord11
  `#bf616a` warning border.

## 2. Color tokens

Defined in `themes/nord/theme.css` as overrides of the shared Tailwind
`@theme` tokens, scoped to `html[data-theme="nord"]`. Three text colors are darker shades of Nord colors (same hue and
chroma in OKLCH, lower lightness) because the originals are below 4.5:1
on Snow Storm: link (nord10 → `#40628b`), visited (nord15 → `#84607e`) and
warning text (nord11 → `#9e4852`).

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#eceff4` | Page and module background, selected tab |
| `--color-fg` | `#2e3440` | Body text, bullets |
| `--color-muted` | `#4c566a` | Meta lines, timestamps, company names |
| `--color-link` | `#40628b` | Links (nord10 darkened, see note) |
| `--color-visited` | `#84607e` | Visited links (nord15 darkened) |
| `--color-accent` | `#5e81ac` | Wordmark, page-title bar, active nav marker (nord10) |
| `--color-accent-fg` | `#2e3440` | Text on accent fills (nord0) |
| `--color-bd` | `#d8dee9` | Module borders, tab borders |
| `--color-bd2` | `#d8dee9` | Search panel border, table header cells |
| `--color-line` | `#d8dee9` | Row separators |
| `--color-panel` | `#e5e9f0` | Search panel, tab row, left column, row hover |
| `--color-panel2` | `#d8dee9` | Module header strips |
| `--color-btn` | `#81a1c1` | Search button (nord9) |
| `--color-btn-fg` | `#2e3440` | Search button text (nord0) |
| `--color-input-bd` | `#4c566a` | Search input border |
| `--color-new` | `#ebcb8b` | "NEW" badge (nord13) |
| `--color-new-fg` | `#2e3440` | "NEW" badge text |
| `--color-warn-bg` | `#f1e4e7` | Warning tint (nord11 over nord6, derived) |
| `--color-warn-bd` | `#bf616a` | Warning border (nord11) |
| `--color-picker-bg` | `#eceff4` | Picker sheet |
| `--color-picker-fg` | `#2e3440` | Picker text |
| `--color-picker-muted` | `#4c566a` | Picker descriptions |
| `--color-picker-bd` | `#d8dee9` | Picker borders |
| `--color-picker-act` | `#e5e9f0` | Picker keyboard-active row |
| `--color-picker-acc` | `#40628b` | Picker current-theme marker (darkened nord10) |

Theme-only custom properties (not `@theme` tokens):

| Variable | Value |
|---|---|
| `--nord9` | `#81a1c1` |
| `--nord11-text` | `#9e4852` |

`color-scheme: light` is set, so native controls match.

## 3. Typography

```css
font-family: "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

Sizes as `yahoojp`. The wordmark is the same sans at 44px / 800,
`letter-spacing:-1px`, in nord10; the subline is nord3 with
`letter-spacing:6px`. No web fonts are loaded.

## 4. Spacing and layout grid

Same grid as `yahoojp` ([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)):
- 990px page; columns 170 / 1fr / 300 with a 10px gap (two columns on the
  main-jobs page, one full-width column up to 1240px on the side-jobs page).
- One column at `≤1010px`; compact masthead at `≤700px`.

Modules are white on the nord6 page; the left column uses nord5.
Corners: 8px modules (daisyUI `--radius-box: 0.5rem`), 4px fields, buttons
and badges (`--radius-field: 0.25rem`).

## 5. Components

The portal components (masthead, search bar, tabs, boxes, topic lists,
badges, tables, picker) come from `src/portal.css` and are recolored by
the tokens above. This theme adds these overrides, all nested under
`html[data-theme="nord"]`:

- **Modules:** white body, nord4 border and header strip.
- **Search:** white input, nord3 border, nord10 focus ring; nord9 button
  with nord0 text.
- **Tags:** "Rất hợp" and group numbers use nord9 with nord0 text (nord10
  with white text would be 4.0:1); "Hợp" uses the darkened link blue.
- **"Mới" chip, warnings, deadlines, home footer note:** darkened link
  blue or darkened nord11 instead of nord10 / nord11.

## 6. Interaction states

| Element | Hover | Focus | Selected |
|---|---|---|---|
| Links | underline | default ring | visited = darkened nord15 |
| Search input | — | nord10 border + inset ring | — |
| Search button | brightness 1.08 | default ring | — |
| Picker rows | nord5 | via ↑/↓ | darkened nord10 left border |

## 7. Accessibility

Measured with WCAG 2.x relative luminance (`culori` `wcagContrast`), and
checked on every text run of the four pages in headless Chrome.

| Pair | Colors | Ratio | Level |
|---|---|---|---|
| Body text | `#2e3440` on `#eceff4` | 10.8 | AAA |
| Meta text | `#4c566a` on `#eceff4` | 6.4 | AA |
| Meta text on panels | `#4c566a` on `#e5e9f0` | 6.1 | AA |
| Links | `#40628b` on `#eceff4` | 5.5 | AA |
| Links in module headers | `#40628b` on `#d8dee9` | 4.7 | AA |
| Visited links | `#84607e` on `#eceff4` | 4.6 | AA |
| Accent (wordmark, bars) | `#5e81ac` on `#eceff4` | 3.5 | AA large / UI only |
| NEW badge | `#2e3440` on `#ebcb8b` | 8.0 | AAA |
| Search button | `#2e3440` on `#81a1c1` | 4.6 | AA |
| Tag "Hợp" (`.tag.b`) | `#eceff4` on `#40628b` | 5.5 | AA |
| Picker description, active row | `#4c566a` on `#e5e9f0` | 6.1 | AA |
| Warning text | `#9e4852` on `#f1e4e7` | 4.8 | AA |
| Tag "Rất hợp" | `#2e3440` on `#81a1c1` | 4.6 | AA |

Exceptions: nord10 `#5e81ac` is used only for large text (the 44px
wordmark, 3.5:1, AA large) and non-text marks (title bar, nav marker).
Links, visited links and warning text use the darker shades listed in
section 2. The decorative "|" separators use nord4 (1.2:1).

## 8. Do / Don't

**Do**
- Keep Frost blues for interaction and Aurora colors for status.
- Use white modules on Snow Storm for separation.

**Don't**
- Don't use nord8–nord10 for small text on Snow Storm.
- Don't add saturated colors outside the palette.

## 9. How to apply

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/nord/theme.css` after the shared layout).
2. Set `<html data-theme="nord" data-layout="portal">`, or pick
   "Nord" in the `Ctrl+K` / `Cmd+K` picker. The choice is saved in
   `localStorage["jb-theme"]`.
3. Use the same markup as `yahoojp`.

## 10. Tailwind v4 tokens and utilities

On this site the theme overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` at runtime:

```css
html[data-theme="nord"] {
  /* Shared tokens */
  --color-bg: #eceff4;
  --color-fg: #2e3440;
  --color-muted: #4c566a;
  --color-link: #40628b;
  --color-visited: #84607e;
  --color-accent: #5e81ac;
  --color-accent-fg: #2e3440;
  --color-bd: #d8dee9;
  --color-bd2: #d8dee9;
  --color-line: #d8dee9;
  --color-panel: #e5e9f0;
  --color-panel2: #d8dee9;
  --color-btn: #81a1c1;
  --color-btn-fg: #2e3440;
  --color-input-bd: #4c566a;
  --color-new: #ebcb8b;
  --color-new-fg: #2e3440;
  --color-warn-bg: #f1e4e7;
  --color-warn-bd: #bf616a;
  --color-picker-bg: #eceff4;
  --color-picker-fg: #2e3440;
  --color-picker-muted: #4c566a;
  --color-picker-bd: #d8dee9;
  --color-picker-act: #e5e9f0;
  --color-picker-acc: #40628b;
  --shadow-picker: 0 12px 40px rgba(46,52,64,.25);
  --font-portal: "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-wordmark: "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif;
  /* Nord colors not mapped to a shared token */
  --nord9: #81a1c1;
  --nord11-text: #9e4852;
  color-scheme: light;
  /* ...component overrides... */
}
```

Utilities such as `bg-panel`, `text-link` or `border-bd` compile to
`var(--color-*)`, so they follow this block. `src/tailwind.css` also
defines the variant

```css
@custom-variant nord (&:where([data-theme="nord"], [data-theme="nord"] *));
```

so `class="text-link nord:font-semibold"` only applies in this theme.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file:

```css
@import "tailwindcss";
@theme {
  --color-nord0: #2e3440;
  --color-nord3: #4c566a;
  --color-nord4: #d8dee9;
  --color-nord5: #e5e9f0;
  --color-nord6: #eceff4;
  --color-nord8: #88c0d0;
  --color-nord9: #81a1c1;
  --color-nord10: #5e81ac;
  --color-nord11: #bf616a;
  --color-nord13: #ebcb8b;
  --color-nord14: #a3be8c;
  --color-nord15: #b48ead;
  /* AA-safe text shades used on this site */
  --color-nord-link: #40628b;
  --color-nord-danger: #9e4852;
}
```

2. Every `--color-*` token becomes `bg-*`, `text-*`, `border-*`, `ring-*`, ...
   utilities and every `--font-*` token a `font-*` utility, e.g.
   `<body class="bg-nord6 text-nord0">` or
   `<button class="rounded bg-nord9 px-3 text-nord0">`.
3. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
4. To keep it switchable next to other themes, put the values under
   `[data-theme="nord"] { ... }` instead (as this site does) and keep a
   default palette in `@theme`.
5. With daisyUI 5, `@plugin "daisyui" { themes: nord --default; }` gives
   the matching component theme.

