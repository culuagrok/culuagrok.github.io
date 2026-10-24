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
  token or the shared rule in `src/portal.css`.

## 2. Color tokens

Defined in `themes/dark/theme.css` as overrides of the Tailwind `@theme`
tokens, scoped to `html[data-theme="dark"]`:

| Variable | Hex | Usage |
|---|---|---|
| `--color-bg` | `#16181d` | Page, modules, selected tab |
| `--color-fg` | `#e4e6eb` | Body text, bullets |
| `--color-muted` | `#9aa0a8` | Meta, timestamps |
| `--color-link` | `#8fb0ff` | Links, inactive tabs |
| `--color-visited` | `#c3a6ff` | Visited job links |
| `--color-accent` | `#ff4d6a` | Wordmark, title bar, active nav, deadlines, top tag |
| `--color-bd` | `#3b465c` | Module borders |
| `--color-bd2` | `#2d3546` | Search panel border, table header cells |
| `--color-line` | `#2a2f3a` | Row separators |
| `--color-panel` | `#1d2330` | Search panel, tab row, left column, row hover |
| `--color-panel2` | `#232b3b` | Module header strips |
| `--color-btn` / `--color-btn-fg` | `#3a63e0` / `#ffffff` | Search button |
| `--color-input-bd` | `#4a5468` | Input border |
| `--color-new` / `--color-new-fg` | `#d99400` / `#000000` | NEW badge |
| `--color-warn-bg` / `--color-warn-bd` | `#2a1a1e` / `#6b2a36` | Warning box |
| `--color-picker-bg` `--color-picker-fg` `--color-picker-muted` `--color-picker-bd` `--color-picker-act` `--color-picker-acc` | `#1f232b` `#e4e6eb` `#9aa0a8` `#353b47` `#2a3246` `#ff4d6a` | Picker |

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
- Selected tabs use `--color-bg` (`#16181d`), so they look "cut out" of the slate
  tab row.
- The "Hợp" tag (`.tag.b`) is light link-blue with dark text, because it uses
  `background:var(--color-link); color:var(--color-bg)`.
- The picker sheet is `#1f232b`, its active row is `#2a3246`, and the current
  theme has a pink-red marker.

## 6. Interaction states

Same as `yahoojp`. Hover surfaces use `--color-panel` (`#1d2330`); link hover is
an underline.

## 7. Accessibility

| Pair | Ratio |
|---|---|
| `#e4e6eb` on `#16181d` | 14.2 (AAA) |
| link `#8fb0ff` on `#16181d` | 8.3 (AAA) |
| link on `--color-panel2` | 6.6 (AA) |
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

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/dark/theme.css` after the shared layout).
2. Set `<html data-theme="dark" data-layout="portal">`.
3. Use the same markup as `yahoojp`.

To make another color variant, copy this file's token block under a new
`html[data-theme="<id>"]` selector.

## 10. Tailwind v4 tokens and utilities

`dark` defines no new tokens. It overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` (section 10 there) at runtime:

```css
html[data-theme="dark"] {
  --color-bg: #16181d;
  --color-fg: #e4e6eb;
  --color-muted: #9aa0a8;
  --color-link: #8fb0ff;
  --color-visited: #c3a6ff;
  --color-accent: #ff4d6a;
  --color-bd: #3b465c;
  --color-bd2: #2d3546;
  --color-line: #2a2f3a;
  --color-panel: #1d2330;
  --color-panel2: #232b3b;
  --color-btn: #3a63e0;
  --color-btn-fg: #fff;
  --color-input-bd: #4a5468;
  --color-new: #d99400;
  --color-new-fg: #000;
  --color-warn-bg: #2a1a1e;
  --color-warn-bd: #6b2a36;

  --color-picker-bg: #1f232b;
  --color-picker-fg: #e4e6eb;
  --color-picker-muted: #9aa0a8;
  --color-picker-bd: #353b47;
  --color-picker-act: #2a3246;
  --color-picker-acc: #ff4d6a;

  color-scheme: dark;
}
```

Because utilities such as `bg-panel` or `text-link` compile to
`var(--color-panel)` / `var(--color-link)`, they follow this block
automatically. `src/tailwind.css` replaces Tailwind's built-in `dark:`
variant (which follows `prefers-color-scheme`) with the picker attribute:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

So `class="bg-panel dark:bg-panel2"` reacts to the theme picker, not to the
OS setting.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file with `@import "tailwindcss";`.
2. Paste the `@theme` block from `../yahoojp/DESIGN.md` (light defaults)
   and the block above (dark overrides) into it. Every `--color-*` token becomes
   `bg-*`, `text-*`, `border-*`, `ring-*`, ... utilities, and every `--font-*`
   token a `font-*` utility.
3. Write markup with the utilities, or copy the component rules from
   `src/portal.css` and keep the `var(--color-*)` references.
4. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
5. To follow the OS setting instead of an attribute, wrap the overrides in
   `@media (prefers-color-scheme: dark) { :root { ... } }`, or paste the
   values straight into `@theme` for a dark-only site.
