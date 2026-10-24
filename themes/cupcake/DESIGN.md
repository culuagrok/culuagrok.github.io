# Cupcake (daisyUI) theme (`cupcake`)

daisyUI's signature pastel light theme: a warm off-white page, white
rounded modules with 2px borders, pink header strips, a teal pill search
button and a deep-pink wordmark.

**Source and license:** color values from the built-in `cupcake` theme of daisyUI 5.7
(`daisyui/theme/cupcake.css`, https://daisyui.com/docs/themes/), MIT
License, Copyright (c) 2020 Pouya Saadeghi. daisyUI is the most popular
Tailwind CSS component library (about 42.7k GitHub stars and about 4M npm
downloads per month, Oct 2026); cupcake is one of its best-known built-in
themes and is featured on its theme pages.

## 1. Overview and inspiration

- **Feel:** friendly, soft and bright; rounded everything.
- **daisyUI roles used:** base-100/200/300 surfaces, base-content text,
  primary (teal) and primary-content, secondary (pink) and
  secondary-content (deep pink), accent (peach) and accent-content, error.
- **Signature elements:** pink module headers, 2rem pill fields,
  pill badges and tags, 2px borders (daisyUI `--border: 2px`).

## 2. Color tokens

Defined in `themes/cupcake/theme.css` as overrides of the shared Tailwind
`@theme` tokens, scoped to `html[data-theme="cupcake"]`. Values keep daisyUI's OKLCH notation. Values that daisyUI produces
with opacity (for example `base-content` at 60–70% for muted text) are
written as solid OKLCH colors with the same hue: `muted`, `input-bd`,
`btn-fg` (primary-content darkened for AA on the teal button), `new-fg`
(accent-content darkened), `warn-bg` and `--cc-error-text`.

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `oklch(97.788% 0.004 56.375)` (#faf7f5) | Page and module background, selected tab |
| `--color-fg` | `oklch(23.574% 0.066 313.189)` (#291334) | Body text, bullets |
| `--color-muted` | `oklch(45% 0.04 313.189)` (#5d4f65) | Meta lines, timestamps, company names |
| `--color-link` | `oklch(43% 0.078 188.216)` (#005d58) | Links (primary-content) |
| `--color-visited` | `oklch(29% 0.066 243.157)` (#042e49) | Visited links (info-content) |
| `--color-accent` | `oklch(45% 0.187 3.815)` (#a0004a) | Wordmark, page-title bar, active nav marker, "Rất hợp" tag (secondary-content) |
| `--color-accent-fg` | `oklch(97.788% 0.004 56.375)` (#faf7f5) | Text on accent fills (base-100) |
| `--color-bd` | `oklch(91.586% 0.006 53.44)` (#e7e2df) | Module borders (base-300) |
| `--color-bd2` | `oklch(91.586% 0.006 53.44)` (#e7e2df) | Search panel border, table header cells |
| `--color-line` | `oklch(91.586% 0.006 53.44)` (#e7e2df) | Row separators |
| `--color-panel` | `oklch(93.982% 0.007 61.449)` (#efeae6) | Search panel, left column (base-200) |
| `--color-panel2` | `oklch(89% 0.061 343.231)` (#f9cbe5) | Module header strips (secondary) |
| `--color-btn` | `oklch(85% 0.138 181.071)` (#44ebd3) | Search button (primary) |
| `--color-btn-fg` | `oklch(30% 0.06 188.216)` (#003733) | Search button text |
| `--color-input-bd` | `oklch(75% 0.02 313.189)` (#b2aab7) | Search input border |
| `--color-new` | `oklch(90% 0.076 70.697)` (#ffd6a7) | "NEW" badge (accent) |
| `--color-new-fg` | `oklch(40% 0.14 37.304)` (#821f00) | "NEW" badge text |
| `--color-warn-bg` | `oklch(96% 0.02 16.439)` (#ffeded) | Safety-warning box tint |
| `--color-warn-bd` | `oklch(64% 0.246 16.439)` (#fe1c55) | Warning border (error) |
| `--color-picker-bg` | `oklch(97.788% 0.004 56.375)` (#faf7f5) | Picker sheet |
| `--color-picker-fg` | `oklch(23.574% 0.066 313.189)` (#291334) | Picker text |
| `--color-picker-muted` | `oklch(45% 0.04 313.189)` (#5d4f65) | Picker descriptions |
| `--color-picker-bd` | `oklch(91.586% 0.006 53.44)` (#e7e2df) | Picker borders |
| `--color-picker-act` | `oklch(93.982% 0.007 61.449)` (#efeae6) | Picker keyboard-active row |
| `--color-picker-acc` | `oklch(45% 0.187 3.815)` (#a0004a) | Picker current-theme marker |

Theme-only custom properties (not `@theme` tokens):

| Variable | Value |
|---|---|
| `--cc-radius-box` | `1rem` |
| `--cc-radius-field` | `2rem` |
| `--cc-primary` | `oklch(85% 0.138 181.071)` |
| `--cc-secondary` | `oklch(89% 0.061 343.231)` |
| `--cc-error-text` | `oklch(50% 0.2 16.439)` |

`color-scheme: light` is set, so native controls match.

## 3. Typography

```css
font-family: "Nunito", "Quicksand", ui-rounded, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

Rounded sans fonts first (used when installed; no web fonts are loaded).
Sizes as `yahoojp`. The wordmark is 44px / 900, no vertical stretch, in
deep pink; the subline is teal with `letter-spacing:5px`.

## 4. Spacing and layout grid

Same grid as `yahoojp` ([../yahoojp/DESIGN.md](../yahoojp/DESIGN.md)):
- 990px page; columns 170 / 1fr / 300 with a 10px gap (two columns on the
  main-jobs page, one full-width column up to 1240px on the side-jobs page).
- One column at `≤1010px`; compact masthead at `≤700px`.

Radii follow daisyUI cupcake: `--radius-box: 1rem` for modules,
`--radius-field: 2rem` for the search field, buttons and `.yj-btn`, full
pills for badges and tags. Module borders are 2px.

## 5. Components

The portal components (masthead, search bar, tabs, boxes, topic lists,
badges, tables, picker) come from `src/portal.css` and are recolored by
the tokens above. This theme adds these overrides, all nested under
`html[data-theme="cupcake"]`:

- **Modules:** white body, 2px base-300 border, pink (secondary) header
  strip with a 2px bottom border; the left column uses base-200.
- **Search:** white pill input with a 2px border (teal on focus), teal
  pill button with dark-teal bold text.
- **Secondary button** (`.yj-btn`): pink pill with deep-pink bold text;
  teal on hover.
- **Badges and tags:** full pills; NEW is peach with dark orange text.
- **Warnings** use a darker error red for text.

## 6. Interaction states

| Element | Hover | Focus | Selected |
|---|---|---|---|
| Links (teal) | underline | default ring | visited = dark blue |
| Search input | — | teal 2px border | — |
| Search button | brightness 1.08 | default ring | — |
| `.yj-btn` | teal fill | default ring | — |
| Picker rows | base-200 | via ↑/↓ | deep-pink left border |

## 7. Accessibility

Measured with WCAG 2.x relative luminance (`culori` `wcagContrast`), and
checked on every text run of the four pages in headless Chrome.

| Pair | Colors | Ratio | Level |
|---|---|---|---|
| Body text | `#291334` on `#faf7f5` | 15.9 | AAA |
| Meta text | `#5d4f65` on `#faf7f5` | 7.1 | AAA |
| Meta text on panels | `#5d4f65` on `#efeae6` | 6.3 | AA |
| Links | `#005d58` on `#faf7f5` | 7.3 | AAA |
| Links in module headers | `#005d58` on `#f9cbe5` | 5.5 | AA |
| Visited links | `#042e49` on `#faf7f5` | 13.2 | AAA |
| Accent (wordmark, bars) | `#a0004a` on `#faf7f5` | 7.8 | AAA |
| NEW badge | `#821f00` on `#ffd6a7` | 7.2 | AAA |
| Search button | `#003733` on `#44ebd3` | 8.9 | AAA |
| Tag "Hợp" (`.tag.b`) | `#faf7f5` on `#005d58` | 7.3 | AAA |
| Picker description, active row | `#5d4f65` on `#efeae6` | 6.3 | AA |
| Links on pink header strip | `#005d58` on `#f9cbe5` | 5.5 | AA |
| `.yj-btn` text | `#a0004a` on `#f9cbe5` | 5.7 | AA |

Exceptions: the decorative "|" separators use base-300 (1.2:1). daisyUI's
own `primary-content` on `primary` (`#005d58` on `#44ebd3`) is 5.2:1; the
search button uses a darker shade of primary-content (8.9:1) for extra
margin on the 15px label.

## 8. Do / Don't

**Do**
- Round everything; use pills for fields, badges and tags.
- Use pink for headers, teal for actions, deep pink for brand.

**Don't**
- Don't put white text on the teal or pink fills (too light).
- Don't use square corners or 1px hairlines for modules.

## 9. How to apply

1. Link the compiled `assets/tailwind.css` (built from `src/tailwind.css`,
   which imports `themes/cupcake/theme.css` after the shared layout).
2. Set `<html data-theme="cupcake" data-layout="portal">`, or pick
   "Cupcake (daisyUI)" in the `Ctrl+K` / `Cmd+K` picker. The choice is saved in
   `localStorage["jb-theme"]`.
3. Use the same markup as `yahoojp`.

## 10. Tailwind v4 tokens and utilities

On this site the theme overrides the shared `@theme` tokens from
`themes/yahoojp/theme.css` at runtime:

```css
html[data-theme="cupcake"] {
  /* Shared tokens */
  --color-bg: oklch(97.788% 0.004 56.375);
  --color-fg: oklch(23.574% 0.066 313.189);
  --color-muted: oklch(45% 0.04 313.189);
  --color-link: oklch(43% 0.078 188.216);
  --color-visited: oklch(29% 0.066 243.157);
  --color-accent: oklch(45% 0.187 3.815);
  --color-accent-fg: oklch(97.788% 0.004 56.375);
  --color-bd: oklch(91.586% 0.006 53.44);
  --color-bd2: oklch(91.586% 0.006 53.44);
  --color-line: oklch(91.586% 0.006 53.44);
  --color-panel: oklch(93.982% 0.007 61.449);
  --color-panel2: oklch(89% 0.061 343.231);
  --color-btn: oklch(85% 0.138 181.071);
  --color-btn-fg: oklch(30% 0.06 188.216);
  --color-input-bd: oklch(75% 0.02 313.189);
  --color-new: oklch(90% 0.076 70.697);
  --color-new-fg: oklch(40% 0.14 37.304);
  --color-warn-bg: oklch(96% 0.02 16.439);
  --color-warn-bd: oklch(64% 0.246 16.439);
  --color-picker-bg: oklch(97.788% 0.004 56.375);
  --color-picker-fg: oklch(23.574% 0.066 313.189);
  --color-picker-muted: oklch(45% 0.04 313.189);
  --color-picker-bd: oklch(91.586% 0.006 53.44);
  --color-picker-act: oklch(93.982% 0.007 61.449);
  --color-picker-acc: oklch(45% 0.187 3.815);
  --shadow-picker: 0 12px 40px rgba(41,19,52,.2);
  --font-portal: "Nunito", "Quicksand", ui-rounded, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-wordmark: "Nunito", "Quicksand", ui-rounded, "Segoe UI", Roboto, Arial, sans-serif;
  /* daisyUI cupcake: --radius-box 1rem, --radius-field 2rem, --border 2px */
  --cc-radius-box: 1rem;
  --cc-radius-field: 2rem;
  --cc-primary: oklch(85% 0.138 181.071);
  --cc-secondary: oklch(89% 0.061 343.231);
  --cc-error-text: oklch(50% 0.2 16.439);
  color-scheme: light;
  /* ...component overrides... */
}
```

Utilities such as `bg-panel`, `text-link` or `border-bd` compile to
`var(--color-*)`, so they follow this block. `src/tailwind.css` also
defines the variant

```css
@custom-variant cupcake (&:where([data-theme="cupcake"], [data-theme="cupcake"] *));
```

so `class="rounded-full cupcake:border-2"` only applies in this theme.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file:

```css
@import "tailwindcss";
@theme {
  --color-base-100: oklch(97.788% 0.004 56.375);
  --color-base-200: oklch(93.982% 0.007 61.449);
  --color-base-300: oklch(91.586% 0.006 53.44);
  --color-base-content: oklch(23.574% 0.066 313.189);
  --color-primary: oklch(85% 0.138 181.071);
  --color-primary-content: oklch(43% 0.078 188.216);
  --color-secondary: oklch(89% 0.061 343.231);
  --color-secondary-content: oklch(45% 0.187 3.815);
  --color-accent: oklch(90% 0.076 70.697);
  --color-accent-content: oklch(47% 0.157 37.304);
  --color-error: oklch(64% 0.246 16.439);
  --radius-box: 1rem;
  --radius-field: 2rem;
}
```

2. Every `--color-*` token becomes `bg-*`, `text-*`, `border-*`, `ring-*`, ...
   utilities and every `--font-*` token a `font-*` utility, e.g.
   `<div class="rounded-box border-2 border-base-300 bg-base-100">` or
   `<button class="rounded-field bg-primary px-4 text-primary-content">`.
3. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
4. To keep it switchable next to other themes, put the values under
   `[data-theme="cupcake"] { ... }` instead (as this site does) and keep a
   default palette in `@theme`.
5. Or install daisyUI 5 (`npm i -D daisyui`) and add
   `@plugin "daisyui" { themes: cupcake --default; }`; the variables above
   are exactly what daisyUI defines for cupcake.

