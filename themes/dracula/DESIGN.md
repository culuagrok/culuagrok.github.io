# Dracula theme (`dracula`)

The Dracula color scheme on the portal layout: a purple-gray night
background, pink accent, cyan links, purple buttons and green NEW badges.
The wordmark is set in a monospace font as a nod to its code-editor roots.

**Source and license:** official Dracula palette from the Dracula specification
(https://draculatheme.com/spec, https://github.com/dracula/dracula-theme,
about 23.6k GitHub stars), MIT License, Copyright (c) 2016 Dracula Theme.
`#21222c` and `#343746` are the darker / lighter background shades used by
the official Dracula for Visual Studio Code theme. The same scheme ships as
the built-in `dracula` theme of daisyUI (MIT).

## 1. Overview and inspiration

- **Feel:** high-contrast dark, playful neon accents on a desaturated
  purple-gray.
- **Palette roles:** Background `#282a36`, Current Line `#44475a`,
  Foreground `#f8f8f2`, Comment `#6272a4`, Cyan `#8be9fd`, Green `#50fa7b`,
  Orange `#ffb86c`, Pink `#ff79c6`, Purple `#bd93f9`, Red `#ff5555`, Yellow
  `#f1fa8c`.
- **Signature elements:** pink monospace wordmark with purple subline,
  purple bullets, purple search button, green NEW badges, orange deadlines.

## 2. Color tokens

Defined in `themes/dracula/theme.css` as overrides of the shared Tailwind
`@theme` tokens, scoped to `html[data-theme="dracula"]`. Hex values are the Dracula spec values, except where noted.

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#282a36` | Page and module background, selected tab |
| `--color-fg` | `#f8f8f2` | Body text, bullets |
| `--color-muted` | `#98a4c2` | Meta text. Dracula "Comment" `#6272a4` is only 3.0:1, so this is Comment mixed 38% toward Foreground (oklab) |
| `--color-link` | `#8be9fd` | Links, inactive tabs |
| `--color-visited` | `#bd93f9` | Visited job links |
| `--color-accent` | `#ff79c6` | Wordmark, page-title bar, active nav marker, "Rất hợp" tag |
| `--color-accent-fg` | `#282a36` | Text on accent fills (tag, group number) |
| `--color-bd` | `#44475a` | Module borders, tab borders |
| `--color-bd2` | `#44475a` | Search panel border, table header cells |
| `--color-line` | `#343746` | Row separators |
| `--color-panel` | `#21222c` | Search panel, left column (VS Code theme "BG darker") |
| `--color-panel2` | `#343746` | Module header strips (VS Code theme "BG lighter") |
| `--color-btn` | `#bd93f9` | Search button |
| `--color-btn-fg` | `#282a36` | Search button text |
| `--color-input-bd` | `#6272a4` | Input border (Dracula Comment) |
| `--color-new` | `#50fa7b` | "NEW" badge |
| `--color-new-fg` | `#282a36` | "NEW" badge text |
| `--color-warn-bg` | `#30262f` | Warning tint (Red blended into Background, keeps Red text at 4.6:1) |
| `--color-warn-bd` | `#ff5555` | Safety-warning box border |
| `--color-picker-bg` | `#282a36` | Picker sheet |
| `--color-picker-fg` | `#f8f8f2` | Picker text |
| `--color-picker-muted` | `#98a4c2` | Picker descriptions |
| `--color-picker-bd` | `#44475a` | Picker borders |
| `--color-picker-act` | `#343746` | Picker active row ("BG lighter") |
| `--color-picker-acc` | `#ff79c6` | Picker current-theme marker |

Theme-only custom properties (not `@theme` tokens):

| Variable | Value |
|---|---|
| `--dr-orange` | `#ffb86c` |
| `--dr-purple` | `#bd93f9` |
| `--dr-red` | `#ff5555` |

`color-scheme: dark` is set, so native controls match.

## 3. Typography

Body font is the shared portal stack (Arial / Helvetica Neue / Segoe UI /
Noto Sans ...), sizes as `yahoojp`. The wordmark uses
`"Fira Code", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace`
at 44px / 700 with `letter-spacing:-2px` and no vertical stretch; the
subline uses the same monospace in Purple with `letter-spacing:4px`.

## 4. Spacing and layout grid

Same grid as `yahoojp` ([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)):
- 990px page; columns 170 / 1fr / 300 with a 10px gap (two columns on the
  main-jobs page, one full-width column up to 1240px on the side-jobs page).
- One column at `≤1010px`; compact masthead at `≤700px`.

Corners: 8px on modules, 6px on fields and buttons, 4px on badges and
tags.

## 5. Components

The portal components (masthead, search bar, tabs, boxes, topic lists,
badges, tables, picker) come from `src/portal.css` and are recolored by
the tokens above. This theme adds these overrides, all nested under
`html[data-theme="dracula"]`:

- **Bullets** in topic lists, job cards and home rows are Purple.
- **Search:** Purple button with Background-colored text; Pink on hover.
  Input focus is a Purple 1px ring.
- **Secondary button** (`.yj-btn`): Cyan text; Pink fill on hover.
- **Tags:** "Rất hợp" Pink on Background text, "Hợp" Purple, NEW Green.
- **Warnings** in Red `#ff5555`, **deadlines** in Orange `#ffb86c`.

## 6. Interaction states

| Element | Hover | Focus | Selected |
|---|---|---|---|
| Links (Cyan) | underline | default ring | visited = Purple |
| Search input | — | Purple border + inset ring | — |
| Search / secondary button | Pink fill, dark text | default ring | — |
| Tabs | — | default ring | Background-colored tab, bold |
| Picker rows | "BG lighter" fill | via ↑/↓ | Pink left border |

## 7. Accessibility

Measured with WCAG 2.x relative luminance (`culori` `wcagContrast`), and
checked on every text run of the four pages in headless Chrome.

| Pair | Colors | Ratio | Level |
|---|---|---|---|
| Body text | `#f8f8f2` on `#282a36` | 13.4 | AAA |
| Meta text | `#98a4c2` on `#282a36` | 5.7 | AA |
| Meta text on panels | `#98a4c2` on `#21222c` | 6.3 | AA |
| Links | `#8be9fd` on `#282a36` | 10.3 | AAA |
| Links in module headers | `#8be9fd` on `#343746` | 8.5 | AAA |
| Visited links | `#bd93f9` on `#282a36` | 5.9 | AA |
| Accent (wordmark, bars) | `#ff79c6` on `#282a36` | 6.0 | AA |
| NEW badge | `#282a36` on `#50fa7b` | 10.4 | AAA |
| Search button | `#282a36` on `#bd93f9` | 5.9 | AA |
| Tag "Hợp" (`.tag.b`) | `#282a36` on `#8be9fd` | 10.3 | AAA |
| Picker description, active row | `#98a4c2` on `#343746` | 4.7 | AA |
| Warning text | `#ff5555` on `#30262f` | 4.6 | AA |
| Deadline | `#ffb86c` on `#282a36` | 8.4 | AAA |

Exceptions: Dracula "Comment" `#6272a4` (3.0:1) is not used for text;
meta text uses the lightened `#98a4c2` instead. The decorative "|"
separators use Current Line `#44475a` (1.6:1).

## 8. Do / Don't

**Do**
- Use Pink for brand/accent, Cyan for links, Purple for actions.
- Keep Green for "new / positive" only.

**Don't**
- Don't set small text in Comment `#6272a4`.
- Don't put Yellow or Green text on light fills.

## 9. How to apply

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/dracula/theme.css` after the shared layout).
2. Set `<html data-theme="dracula" data-layout="portal">`, or pick
   "Dracula" in the `Ctrl+K` / `Cmd+K` picker. The choice is saved in
   `localStorage["jb-theme"]`.
3. Use the same markup as `yahoojp`.

## 10. Tailwind v4 tokens and utilities

On this site the theme overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` at runtime:

```css
html[data-theme="dracula"] {
  /* Shared tokens */
  --color-bg: #282a36;
  --color-fg: #f8f8f2;
  --color-muted: #98a4c2;
  --color-link: #8be9fd;
  --color-visited: #bd93f9;
  --color-accent: #ff79c6;
  --color-accent-fg: #282a36;
  --color-bd: #44475a;
  --color-bd2: #44475a;
  --color-line: #343746;
  --color-panel: #21222c;
  --color-panel2: #343746;
  --color-btn: #bd93f9;
  --color-btn-fg: #282a36;
  --color-input-bd: #6272a4;
  --color-new: #50fa7b;
  --color-new-fg: #282a36;
  --color-warn-bg: #30262f;
  --color-warn-bd: #ff5555;
  --color-picker-bg: #282a36;
  --color-picker-fg: #f8f8f2;
  --color-picker-muted: #98a4c2;
  --color-picker-bd: #44475a;
  --color-picker-act: #343746;
  --color-picker-acc: #ff79c6;
  --shadow-picker: 0 12px 40px rgba(0,0,0,.5);
  --font-wordmark: "Fira Code", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  /* Dracula spec colors not mapped to a shared token */
  --dr-orange: #ffb86c;
  --dr-purple: #bd93f9;
  --dr-red: #ff5555;
  color-scheme: dark;
  /* ...component overrides... */
}
```

Utilities such as `bg-panel`, `text-link` or `border-bd` compile to
`var(--color-*)`, so they follow this block. `src/tailwind.css` also
defines the variant

```css
@custom-variant dracula (&:where([data-theme="dracula"], [data-theme="dracula"] *));
```

so `class="text-link dracula:font-mono"` only applies in this theme.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file:

```css
@import "tailwindcss";
@theme {
  --color-dracula-bg: #282a36;
  --color-dracula-current: #44475a;
  --color-dracula-fg: #f8f8f2;
  --color-dracula-comment: #6272a4;
  --color-dracula-cyan: #8be9fd;
  --color-dracula-green: #50fa7b;
  --color-dracula-orange: #ffb86c;
  --color-dracula-pink: #ff79c6;
  --color-dracula-purple: #bd93f9;
  --color-dracula-red: #ff5555;
  --color-dracula-yellow: #f1fa8c;
  --font-code: "Fira Code", "JetBrains Mono", ui-monospace, monospace;
}
```

2. Every `--color-*` token becomes `bg-*`, `text-*`, `border-*`, `ring-*`, ...
   utilities and every `--font-*` token a `font-*` utility, e.g.
   `<a class="text-dracula-cyan hover:underline">` or
   `<span class="rounded bg-dracula-green px-1 text-dracula-bg">NEW</span>`.
3. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
4. To keep it switchable next to other themes, put the values under
   `[data-theme="dracula"] { ... }` instead (as this site does) and keep a
   default palette in `@theme`.
5. With daisyUI 5, `@plugin "daisyui" { themes: dracula --default; }` gives
   the same scheme for daisyUI components.

