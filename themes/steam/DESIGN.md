# Steam theme (`steam`)

A dark navy storefront look inspired by the Steam store
(store.steampowered.com), applied to the portal layout. It uses text and CSS
only. There are no Valve or Steam logos, images or fonts, and the wordmark is
the site's own name in upper-case sans.

## 1. Overview and inspiration

- **Feel:** a game-store catalogue. Content sits on a deep blue-gray page
  that glows lighter (`#2a475e`) at the top.
- **Chrome:**
  - A full-width near-black global bar (`#171a21`) with upper-case menu links.
  - A blue gradient store nav with the search box on the right.
- **Content:** "capsule" rows, meaning dark translucent strips 2px apart that
  turn light-blue on hover with dark text. Section headings are small,
  upper-case and letter-spaced.
- **Commerce cues:** the green "buy" / discount colors (`#5c7e10`, `#a4d007`,
  `#beee11`) are reused for the NEW badges and the best "Rất hợp" rating.
- **Implementation:** the same markup as the other portal themes. Tokens and
  overrides live in `themes/steam/theme.css`, and every rule is scoped to
  `html[data-theme="steam"]`.

## 2. Color tokens

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#1b2838` | Page background, sticky filter bar |
| `--color-fg` | `#c7d5e0` | Body text |
| `--color-muted` | `#8f98a0` | Meta, inactive tabs, table headers, footer |
| `--color-link` | `#66c0f4` | Links, accent (Steam blue) |
| `--color-visited` | `#a7c4dc` | Visited job links |
| `--color-accent` | `#66c0f4` | Re-pointed to the blue accent (active nav bar, `h3` bars) |
| `--color-bd` | `#2a475e` | Section heading underline, tab row line |
| `--color-bd2` | `#233c51` | Secondary borders |
| `--color-line` | `rgba(255,255,255,.06)` | Table row hairlines |
| `--color-panel` / `--color-panel2` | `#16202d` / `#213245` | Tinted surfaces, selected tab gradient end |
| `--color-btn` | `#1a9fff` | Fallback button color |
| `--color-input-bd` | `#316282` | Search field fill |
| `--color-new` / `--color-new-fg` | `#4c6b22` / `#beee11` | NEW badge (discount-tag style) |
| `--color-warn-bg` / `--color-warn-bd` | `#2b1d22` / `#6e2f3a` | Warning box |
| `--st-top` | `#171a21` | Global bar, logo row, footer |
| `--st-nav` | `linear-gradient(90deg, rgba(62,103,150,.92) 11%, rgba(58,120,177,.8) 25%, #0f216e 100%)` | Store nav / search bar |
| `--st-row` | `rgba(0,0,0,.2)` | Capsule rows, boxes, panels |
| `--st-hover` / `--st-hover-fg` / `--st-hover-muted` | `linear-gradient(90deg,#c6e6f8 5%,#95bcd3 95%)` / `#10161b` / `#384959` | Hovered capsule row and its text |
| `--st-green` / `--st-green-fg` | `linear-gradient(90deg,#75b022 5%,#588a1b 95%)` / `#d2efa9` | "Buy" style: "Rất hợp" tag, group number, "Mới" chip |
| `--st-lime` / `--st-lime2` | `#a4d007` / `#beee11` | Bright green text on green |
| `--st-blue` | `linear-gradient(90deg,#47bfff 5%,#1a44c2 60%)` | Primary button (search, hover of `.yj-btn`) |
| `--color-picker-*` | bg `#1f2a38`, fg `#c7d5e0`, bd `#2a475e`, act `#2a475e`, acc `#66c0f4` | Picker; active row uses `--st-hover` |
| `--font-portal` / `--font-wordmark` | `"Motiva Sans", Arial, Helvetica, ...` | Body and wordmark font (see Typography) |

## 3. Typography

```css
font-family: "Motiva Sans", Arial, Helvetica, "Segoe UI", "Noto Sans", Roboto, sans-serif;
```

Motiva Sans is used only if the visitor already has it installed; it is not
shipped. Arial, Helvetica and Noto Sans all cover Vietnamese.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Wordmark | 30px | 700 | upper-case, `letter-spacing:2px`, `#dcdedf` |
| Wordmark subline | 12px | 400 | `letter-spacing:3px`, `--color-link` |
| Global menu links | 14px | 500 | upper-case, `letter-spacing:.5px` |
| Store nav links | 13px | 400 | `#e5e5e5` |
| Section / module headings | 12px | 400 | upper-case, `letter-spacing:.06em`, white |
| Page title | 20px | 400 | white |
| Capsule titles, body | 14px | 400 | white titles, `--color-fg` body |
| Meta, table cells | 12px | 400 | `--color-muted` |
| Table headers | 11px | 400 | upper-case, `letter-spacing:.04em` |
| Badges | 10px | 400 | |

## 4. Spacing and layout grid

- Inherits the portal grid: 990px page; columns 170 / 1fr / 300 with a 10px
  gap. The side-jobs page is a single full-width column.
- **Full-bleed bars:** the utility bar, logo row and footer stay inside the
  990px container. Their background is extended to the window edges with:
  ```css
  background:var(--st-top);box-shadow:0 0 0 100vmax var(--st-top);clip-path:inset(0 -100vmax);
  ```
- **Spacing:** the store nav has 18px above it. Capsule rows are 2px apart
  with `6px 10px` padding.
- **≤700px:** the logo row centers, the store nav stacks (links scroll
  sideways, then the search field), and the menu links are hidden.

## 5. Components

### Global bar and logo row
```css
.yj-logo-row{display:flex;align-items:center;gap:6px;padding:16px 0 18px}
.yj-word{order:-1}                 /* wordmark moves to the left */
.yj-svc a{flex-direction:row;font-size:14px;text-transform:uppercase;color:#dcdedf;border-bottom:3px solid transparent}
.yj-svc a span{display:none}       /* hide emoji icons */
.yj-svc a:hover{color:#fff;border-bottom-color:var(--color-link)}
```

### Store nav and search
```css
.yj-search{background:var(--st-nav);border:0;box-shadow:0 0 3px rgba(0,0,0,.4)}
.yj-stabs a{padding:0 14px;line-height:35px;color:#e5e5e5}
.yj-stabs a.on,.yj-stabs a:hover{background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,.06));color:#fff}
.yj-sbox{background:#316282;border-radius:3px;padding:2px}
.yj-sbox input{background:transparent;border:0;color:#fff}  .yj-sbox input::placeholder{color:#0e1c25;font-style:italic}
.yj-sbox button{background:var(--st-blue);border-radius:3px}
```

### Tabs
```css
.yj-tabs button{background:rgba(0,0,0,.25);color:var(--color-muted);height:33px;border:0}
.yj-tabs .on{background:linear-gradient(180deg,#2a475e,#213245);color:#fff}
```
These rules also apply to the new-jobs `.tabs` and the side-jobs `.bar`
filter buttons.

### Boxes and section headings
```css
.yj-box{background:var(--st-row);border:0}
.yj-box>h3{background:transparent;color:#fff;border-bottom:1px solid var(--color-bd);
           text-transform:uppercase;letter-spacing:.06em;font-size:12px;font-weight:400}
```
The left-column boxes are transparent with muted headings, like Steam's
store gutter.

### Capsule rows (lists, job cards, home categories)
```css
li,.j,a.c{background:var(--st-row);margin:0 0 2px;padding:6px 10px}
li:hover,.j:hover,a.c:hover{background:var(--st-hover)}   /* text turns #10161b, meta #384959 */
```
The dotted bullets from the base theme are removed.

### Badges and buttons
```css
.yj-new{background:#4c6b22;color:#beee11;border-radius:2px;font-size:10px;padding:0 4px}
.tag.a{background:var(--st-green);color:#d2efa9}           /* "Rất hợp" = buy button */
.tag.b,.pt{background:rgba(103,193,245,.2);color:#66c0f4}  /* Steam "tag" chip */
.tag.c{background:rgba(0,0,0,.3);color:var(--color-muted)}
.yj-btn{background:rgba(103,193,245,.2);color:#66c0f4;border:0;border-radius:2px}
.yj-btn:hover{background:var(--st-blue);color:#fff}
```

### Tables
```css
th{background:rgba(0,0,0,.3);color:var(--color-muted);text-transform:uppercase;font-size:11px;border:0}
td{border:0;border-top:1px solid var(--color-line)}
tr:hover td{background:rgba(102,192,244,.08)}
```

### Picker modal
- The sheet has a 3px radius and a `#2a3f5a → #1f2a38` vertical gradient.
- The active row gets the capsule hover gradient with dark text.
- The current theme is marked with a `#66c0f4` border and check.

## 6. Interaction states

| Element | Hover | Focus | Active / selected |
|---|---|---|---|
| Links | turn white (no underline) | default ring | — |
| Menu links | white, 3px blue underline | default ring | — |
| Store nav links | translucent white gradient | — | same gradient (current page) |
| Search field | — | 1px `--color-link` ring around the field | — |
| Capsule rows | light-blue gradient, dark text | — | — |
| Tabs | white text | default ring | `#2a475e → #213245` gradient, white |
| Secondary button | blue gradient, white | default ring | — |

## 7. Accessibility

| Pair | Ratio |
|---|---|
| `#c7d5e0` on `#1b2838` | 10.0 (AAA) |
| white titles on `#1b2838` | 14.9 (AAA) |
| link `#66c0f4` on `#1b2838` | 7.4 (AAA) |
| muted `#8f98a0` on `#1b2838` | 5.1 (AA) |
| hover text `#10161b` on `#95bcd3` | 9.0 (AAA) |
| NEW `#beee11` on `#4c6b22` | 4.5 (AA) |
| `#d2efa9` on `#588a1b` (darkest end of the buy gradient) | 3.3 (AA large / bold UI only) |
| store nav text `#e5e5e5` on its lightest stop (`#3a78b1`) | 3.7 (AA large); it rises to 14+ toward `#0f216e` |

Keep green-on-green and nav text to short labels. Don't use them for
paragraphs.

## 8. Do / Don't

**Do**
- Use upper-case, letter-spaced, small headings.
- Separate items with 2px gaps rather than borders.
- Reserve green for "buy" / positive emphasis and blue for interaction.
- Keep the page background as the radial `#2a475e → #1b2838` glow.

**Don't**
- Don't use the Steam logo, Valve imagery or the "STEAM" word as your brand.
- Don't use the light-blue hover gradient as a static background.
- Don't use rounded cards above 3px or heavy drop shadows on content.

## 9. How to apply

1. Link the compiled `assets/tailwind.css`. In `src/tailwind.css`,
   `themes/steam/theme.css` is imported after `src/portal.css`. The order
   matters, because steam overrides base rules at equal or higher
   specificity.
2. Set `<html data-theme="steam" data-layout="portal">`.
3. Use the portal markup (`.yj-mast`, `.yj-cols`, `.yj-box`, `.yj-tabs`,
   `.yj-topics`, `.yj-new`).
4. `themes/steam/theme.css` nests every override under
   `html[data-theme="steam"] { ... }`. Tailwind flattens the nesting at build
   time, so `.yj-box { ... }` inside the block compiles to
   `html[data-theme=steam] .yj-box`.

## 10. Tailwind v4 tokens and utilities

On this site steam overrides the shared `@theme` tokens (defined in
`themes/yahoojp/theme.css`) under its attribute selector:

```css
html[data-theme="steam"] {
  /* Shared tokens */
  --color-bg: #1b2838;
  --color-fg: #c7d5e0;
  --color-muted: #8f98a0;
  --color-link: #66c0f4;
  --color-visited: #a7c4dc;
  --color-accent: #66c0f4;
  --color-bd: #2a475e;
  --color-bd2: #233c51;
  --color-line: rgba(255,255,255,.06);
  --color-panel: #16202d;
  --color-panel2: #213245;
  --color-btn: #1a9fff;
  --color-btn-fg: #fff;
  --color-input-bd: #316282;
  --color-new: #4c6b22;
  --color-new-fg: #beee11;
  --color-warn-bg: #2b1d22;
  --color-warn-bd: #6e2f3a;
  --color-picker-bg: #1f2a38;
  --color-picker-fg: #c7d5e0;
  --color-picker-muted: #8f98a0;
  --color-picker-bd: #2a475e;
  --color-picker-act: #2a475e;
  --color-picker-acc: #66c0f4;
  --shadow-picker: 0 0 24px rgba(0,0,0,.7);
  --font-portal: "Motiva Sans", Arial, Helvetica, "Segoe UI", "Noto Sans", Roboto, sans-serif;
  --font-wordmark: "Motiva Sans", Arial, Helvetica, sans-serif;
  /* Steam-only tokens: gradients and extra colors */
  --st-top: #171a21;
  --st-nav: linear-gradient(90deg,rgba(62,103,150,.92) 11%,rgba(58,120,177,.8) 25%,#0f216e 100%);
  --st-row: rgba(0,0,0,.2);
  --st-hover: linear-gradient(90deg,#c6e6f8 5%,#95bcd3 95%);
  --st-hover-fg: #10161b;
  --st-hover-muted: #384959;
  --st-green: linear-gradient(90deg,#75b022 5%,#588a1b 95%);
  --st-green-fg: #d2efa9;
  --st-lime: #a4d007;
  --st-lime2: #beee11;
  --st-blue: linear-gradient(90deg,#47bfff 5%,#1a44c2 60%);
  --st-white: #fff;
  color-scheme: dark;
}
```

The `--st-*` values are plain custom properties, not `@theme` tokens: most
are gradients, which have no Tailwind theme namespace. Use them with
arbitrary-value utilities, e.g. `bg-(image:--st-nav)` or `bg-(--st-row)`.
The theme variant is defined in `src/tailwind.css`:

```css
@custom-variant steam (&:where([data-theme="steam"], [data-theme="steam"] *));
```

so `class="text-link steam:uppercase steam:tracking-wider"` only changes in
this theme.

### Standalone `@theme` for a Steam-only site

```css
@import "tailwindcss";
@theme {
  --color-bg: #1b2838;
  --color-fg: #c7d5e0;
  --color-muted: #8f98a0;
  --color-link: #66c0f4;
  --color-visited: #a7c4dc;
  --color-accent: #66c0f4;
  --color-bd: #2a475e;
  --color-bd2: #233c51;
  --color-line: rgba(255,255,255,.06);
  --color-panel: #16202d;
  --color-panel2: #213245;
  --color-btn: #1a9fff;
  --color-btn-fg: #fff;
  --color-input-bd: #316282;
  --color-new: #4c6b22;
  --color-new-fg: #beee11;
  --color-st-top: #171a21;
  --color-st-row: rgba(0,0,0,.2);
  --color-st-hover-fg: #10161b;
  --color-st-hover-muted: #384959;
  --color-st-green-fg: #d2efa9;
  --color-st-lime: #a4d007;
  --color-st-lime2: #beee11;
  --font-steam: "Motiva Sans", Arial, Helvetica, "Segoe UI", "Noto Sans", Roboto, sans-serif;
}
:root {
  --st-nav: linear-gradient(90deg,rgba(62,103,150,.92) 11%,rgba(58,120,177,.8) 25%,#0f216e 100%);
  --st-hover: linear-gradient(90deg,#c6e6f8 5%,#95bcd3 95%);
  --st-green: linear-gradient(90deg,#75b022 5%,#588a1b 95%);
  --st-blue: linear-gradient(90deg,#47bfff 5%,#1a44c2 60%);
}
```

With it, a capsule row is
`<li class="bg-st-row hover:bg-(image:--st-hover) hover:text-st-hover-fg px-2.5 py-1.5 mb-0.5">`
and a buy button is `<a class="bg-(image:--st-green) text-st-green-fg rounded-xs px-3">`.

### Reuse in another Tailwind v4 project

1. Install Tailwind v4 (`npm i -D tailwindcss @tailwindcss/cli`) and create
   an entry CSS file.
2. Paste the standalone block above into it (it already has the import). Every `--color-*` token becomes
   `bg-*`, `text-*`, `border-*`, `ring-*`, ... utilities, and every `--font-*`
   token a `font-*` utility.
3. Write markup with the utilities, or copy the component rules from
   `src/portal.css` and keep the `var(--color-*)` references.
4. Build with `npx @tailwindcss/cli -i input.css -o output.css --minify`.
