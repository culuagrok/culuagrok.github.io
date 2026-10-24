# shadcn/ui (Zinc) theme (`shadcn`)

A clean, monochrome look built from the official shadcn/ui "Zinc" theme:
white cards with hairline borders, a soft `shadow-xs`, `0.625rem` corners
and a near-black primary color. It keeps the portal layout.

**Source and license:** color values are the light "zinc" CSS variables published by
shadcn/ui (https://ui.shadcn.com/themes, registry
`https://ui.shadcn.com/r/styles/new-york-v4/theme-zinc.json`), MIT License,
Copyright (c) 2023 shadcn. The warning-text red and two darker grays are
Tailwind CSS default palette values (red-50/200/700, zinc-600; MIT,
Copyright (c) Tailwind Labs, Inc.). shadcn/ui is the most-starred Tailwind
component project on GitHub (about 126k stars, Oct 2026).

## 1. Overview and inspiration

- **Feel:** neutral, calm and modern; color is used only for warnings and
  the NEW badge.
- **Signature elements:** white cards with `oklch(0.92 0.004 286.32)`
  borders and a 1px shadow, near-black primary buttons, a black pill for the
  "Mới" chip, the destructive red for NEW badges.
- Unlike shadcn/ui itself, the dense three-column portal layout is kept.

## 2. Color tokens

Defined in `themes/shadcn/theme.css` as overrides of the shared Tailwind
`@theme` tokens, scoped to `html[data-theme="shadcn"]`. Values are kept in the original OKLCH notation; the hex in
parentheses is the sRGB equivalent.

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `oklch(1 0 0)` (#ffffff) | Page and module background, selected tab |
| `--color-fg` | `oklch(0.141 0.005 285.823)` (#09090b) | Body text, bullets |
| `--color-muted` | `oklch(0.552 0.016 285.938)` (#71717b) | Meta lines, timestamps, company names |
| `--color-link` | `oklch(0.21 0.006 285.885)` (#18181b) | Links, inactive tabs |
| `--color-visited` | `oklch(0.442 0.017 285.786)` (#52525c) | Visited job links |
| `--color-accent` | `oklch(0.21 0.006 285.885)` (#18181b) | Wordmark, page-title bar, active nav marker, "Rất hợp" tag (shadcn `--primary`) |
| `--color-accent-fg` | `oklch(0.985 0 0)` (#fafafa) | Text on accent fills (tag, group number) |
| `--color-bd` | `oklch(0.92 0.004 286.32)` (#e4e4e7) | Card borders (shadcn `--border`) |
| `--color-bd2` | `oklch(0.92 0.004 286.32)` (#e4e4e7) | Search panel border, table header cells |
| `--color-line` | `oklch(0.92 0.004 286.32)` (#e4e4e7) | Row separators (shadcn `--border`) |
| `--color-panel` | `oklch(0.985 0 0)` (#fafafa) | Search panel, tab row, left column, row hover (shadcn `--sidebar`) |
| `--color-panel2` | `oklch(0.967 0.001 286.375)` (#f4f4f5) | Tab row, header hover (shadcn `--secondary` / `--muted`) |
| `--color-btn` | `oklch(0.21 0.006 285.885)` (#18181b) | Search button |
| `--color-btn-fg` | `oklch(0.985 0 0)` (#fafafa) | Search button text |
| `--color-input-bd` | `oklch(0.92 0.004 286.32)` (#e4e4e7) | Input border (shadcn `--input`) |
| `--color-new` | `oklch(0.577 0.245 27.325)` (#e7000b) | "NEW" badge (shadcn `--destructive`) |
| `--color-new-fg` | `oklch(0.985 0 0)` (#fafafa) | "NEW" badge text |
| `--color-warn-bg` | `oklch(0.971 0.013 17.38)` (#fef2f2) | Safety-warning box tint |
| `--color-warn-bd` | `oklch(0.885 0.062 18.334)` (#ffc9c9) | Safety-warning box border |
| `--color-picker-bg` | `oklch(1 0 0)` (#ffffff) | Picker sheet |
| `--color-picker-fg` | `oklch(0.141 0.005 285.823)` (#09090b) | Picker text |
| `--color-picker-muted` | `oklch(0.442 0.017 285.786)` (#52525c) | Picker descriptions (zinc-600 for AA on the active row) |
| `--color-picker-bd` | `oklch(0.92 0.004 286.32)` (#e4e4e7) | Picker borders |
| `--color-picker-act` | `oklch(0.967 0.001 286.375)` (#f4f4f5) | Picker keyboard-active row |
| `--color-picker-acc` | `oklch(0.21 0.006 285.885)` (#18181b) | Picker current-theme marker |

Theme-only custom properties (not `@theme` tokens):

| Variable | Value |
|---|---|
| `--sc-radius` | `0.625rem` |
| `--sc-destructive-text` | `oklch(0.505 0.213 27.518)` |
| `--sc-zinc-600` | `oklch(0.442 0.017 285.786)` |
| `--sc-shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / .05)` |

`color-scheme: light` is set, so native controls match.

## 3. Typography

```css
font-family: "Geist", "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

Geist is the shadcn/ui default font. The site does not load web fonts, so
visitors without Geist or Inter get the system UI font. Sizes are those of
`yahoojp` (body 14px, modules 13px, meta 12px). Titles in topic lists and
job cards use weight 500; module headers 600. The wordmark is 44px, weight
800, `letter-spacing:-0.04em`, no vertical stretch; the subline is 500 with
`letter-spacing:0.3em` in `--color-muted`.

## 4. Spacing and layout grid

Same grid as `yahoojp` ([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)):
- 990px page; columns 170 / 1fr / 300 with a 10px gap (two columns on the
  main-jobs page, one full-width column up to 1240px on the side-jobs page).
- One column at `≤1010px`; compact masthead at `≤700px`.

Radii follow shadcn/ui: `--radius: 0.625rem` for cards, `--radius - 2px`
(8px) for inputs and buttons, `--radius - 4px` (6px) for badges and tags.
The search field and button are 36px high (`h-9`).

## 5. Components

The portal components (masthead, search bar, tabs, boxes, topic lists,
badges, tables, picker) come from `src/portal.css` and are recolored by
the tokens above. This theme adds these overrides, all nested under
`html[data-theme="shadcn"]`:

- **Cards** (`.yj-box`, `.card`, `.picks`, `.grp`, home `.g`, new-jobs
  `main`): white, 1px border, `0.625rem` radius, `0 1px 2px rgb(0 0 0/.05)`
  shadow; headers have no fill, weight 600.
- **Search:** input with `--input` border and a 3px `--ring` focus ring;
  primary button `#18181b` with `#fafafa` text, 90% opacity on hover.
- **Secondary button** (`.yj-btn`): white "outline" button with shadow-xs,
  `--secondary` background on hover.
- **"Mới" chip** in the utility bar: black pill with white text.
- **Warnings and deadlines:** red-700 text (`--sc-destructive-text`) on the
  red-50 tint; neutral tag `.tag.d` uses zinc-600 text.

## 6. Interaction states

| Element | Hover | Focus | Selected |
|---|---|---|---|
| Links | underline | default ring | — |
| Search input | — | ring-color border + 3px ring at 50% | — |
| Primary button | 90% primary | default ring | — |
| Outline button | `--secondary` fill | default ring | — |
| Tabs | — | default ring | white tab, bold |
| Picker rows | `--accent` fill | via ↑/↓ | black left border |

## 7. Accessibility

Measured with WCAG 2.x relative luminance (`culori` `wcagContrast`), and
checked on every text run of the four pages in headless Chrome.

| Pair | Colors | Ratio | Level |
|---|---|---|---|
| Body text | `#09090b` on `#ffffff` | 19.9 | AAA |
| Meta text | `#71717b` on `#ffffff` | 4.8 | AA |
| Meta text on panels | `#71717b` on `#fafafa` | 4.6 | AA |
| Links | `#18181b` on `#ffffff` | 17.7 | AAA |
| Links in module headers | `#18181b` on `#f4f4f5` | 16.1 | AAA |
| Visited links | `#52525c` on `#ffffff` | 7.7 | AAA |
| Accent (wordmark, bars) | `#18181b` on `#ffffff` | 17.7 | AAA |
| NEW badge | `#fafafa` on `#e7000b` | 4.7 | AA |
| Search button | `#fafafa` on `#18181b` | 17.0 | AAA |
| Tag "Hợp" (`.tag.b`) | `#ffffff` on `#18181b` | 17.7 | AAA |
| Picker description, active row | `#52525c` on `#f4f4f5` | 7.0 | AAA |
| Warning text (`--sc-destructive-text`) | `#c10007` on `#fef2f2` | 6.0 | AA |
| NEW badge on its row | `#fafafa` on `#e7000b` | 4.7 | AA |

Exceptions: the decorative "|" separators in the utility bar use the
border color (1.3:1), as in every other theme. The official
`--destructive` (`#e7000b`) gives only 4.5:1 on the red-50 tint, so warning
text uses red-700 instead.

## 8. Do / Don't

**Do**
- Keep color for status only (destructive red, NEW).
- Use hairline borders plus `shadow-xs`, not heavy shadows.

**Don't**
- Don't tint module headers; shadcn cards have plain headers.
- Don't use `--destructive` for small text on the red tint (contrast).

## 9. How to apply

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/shadcn/theme.css` after the shared layout).
2. Set `<html data-theme="shadcn" data-layout="portal">`, or pick
   "shadcn/ui" in the `Ctrl+K` / `Cmd+K` picker. The choice is saved in
   `localStorage["jb-theme"]`.
3. Use the same markup as `yahoojp`.

## 10. Tailwind v4 tokens and utilities

On this site the theme overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` at runtime:

```css
html[data-theme="shadcn"] {
  /* Shared tokens */
  --color-bg: oklch(1 0 0);
  --color-fg: oklch(0.141 0.005 285.823);
  --color-muted: oklch(0.552 0.016 285.938);
  --color-link: oklch(0.21 0.006 285.885);
  --color-visited: oklch(0.442 0.017 285.786);
  --color-accent: oklch(0.21 0.006 285.885);
  --color-accent-fg: oklch(0.985 0 0);
  --color-bd: oklch(0.92 0.004 286.32);
  --color-bd2: oklch(0.92 0.004 286.32);
  --color-line: oklch(0.92 0.004 286.32);
  --color-panel: oklch(0.985 0 0);
  --color-panel2: oklch(0.967 0.001 286.375);
  --color-btn: oklch(0.21 0.006 285.885);
  --color-btn-fg: oklch(0.985 0 0);
  --color-input-bd: oklch(0.92 0.004 286.32);
  --color-new: oklch(0.577 0.245 27.325);
  --color-new-fg: oklch(0.985 0 0);
  --color-warn-bg: oklch(0.971 0.013 17.38);
  --color-warn-bd: oklch(0.885 0.062 18.334);
  --color-picker-bg: oklch(1 0 0);
  --color-picker-fg: oklch(0.141 0.005 285.823);
  --color-picker-muted: oklch(0.442 0.017 285.786);
  --color-picker-bd: oklch(0.92 0.004 286.32);
  --color-picker-act: oklch(0.967 0.001 286.375);
  --color-picker-acc: oklch(0.21 0.006 285.885);
  --shadow-picker: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
  --font-portal: "Geist", "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-wordmark: "Geist", "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif;
  /* shadcn/ui --radius: 0.625rem; --radius-md = --radius - 2px */
  --sc-radius: 0.625rem;
  /* Tailwind red-700 / zinc-600: AA-safe text on the red-50 warning tint
     (shadcn --destructive is used for the NEW badge) */
  --sc-destructive-text: oklch(0.505 0.213 27.518);
  --sc-zinc-600: oklch(0.442 0.017 285.786);
  --sc-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / .05);
  color-scheme: light;
  /* ...component overrides... */
}
```

Utilities such as `bg-panel`, `text-link` or `border-bd` compile to
`var(--color-*)`, so they follow this block. `src/tailwind.css` also
defines the variant

```css
@custom-variant shadcn (&:where([data-theme="shadcn"], [data-theme="shadcn"] *));
```

so `class="rounded-lg shadcn:shadow-xs"` only applies in this theme.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file:

```css
@import "tailwindcss";
@theme {
  --color-bg: oklch(1 0 0);
  --color-fg: oklch(0.141 0.005 285.823);
  --color-muted: oklch(0.552 0.016 285.938);
  --color-primary: oklch(0.21 0.006 285.885);
  --color-primary-fg: oklch(0.985 0 0);
  --color-secondary: oklch(0.967 0.001 286.375);
  --color-border: oklch(0.92 0.004 286.32);
  --color-ring: oklch(0.705 0.015 286.067);
  --color-destructive: oklch(0.577 0.245 27.325);
  --radius-card: 0.625rem;
  --font-sans: "Geist", "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

2. Every `--color-*` token becomes `bg-*`, `text-*`, `border-*`, `ring-*`, ...
   utilities and every `--font-*` token a `font-*` utility, e.g.
   `<div class="rounded-card border border-border bg-bg shadow-xs">` or
   `<button class="h-9 rounded-md bg-primary px-4 text-primary-fg">`.
3. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
4. To keep it switchable next to other themes, put the values under
   `[data-theme="shadcn"] { ... }` instead (as this site does) and keep a
   default palette in `@theme`.
5. For the full shadcn/ui setup (components, dark mode), use
   `npx shadcn@latest init`, which writes the same variables.

