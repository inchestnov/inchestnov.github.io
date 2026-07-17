# CLAUDE.md

## 1. Project overview

A single-page CV/resume site. Pure static HTML/CSS/JS, no backend, no build
step, no npm. Open `index.html` directly in a browser (`file://...`) and it
works fully — language switching (RU/EN), responsive layout, all included.
The site has a single dark visual theme; there is no theme switching.

Do not introduce a bundler, framework, package manager, or dev server. Any
change must keep working when the file is double-clicked and opened straight
from disk.

## 2. File structure

```
resume/
├── index.html            Page skeleton only: empty containers with fixed
│                          IDs (e.g. #hero-name, #skills-grid). No hardcoded
│                          copy — all visible text is injected by main.js.
├── css/
│   └── styles.css        All styling. Colors are CSS custom properties
│                          defined once on :root (single dark palette; no
│                          theme switching). Component rules never hardcode
│                          colors — they only reference the variables.
├── js/
│   ├── icons.js           `iconMarkup` — a map of inline SVG strings used for
│   │                       skill and contact icons. Brand icons are copied
│   │                       verbatim from the matching file in assets/icons/
│   │                       (see below); email is hand-authored (not a brand
│   │                       mark). No CDN icon fonts/sprites are used, so
│   │                       icons render identically offline via file://.
│   ├── content_ru.js       `contentRu` — Russian copy (default language).
│   ├── content_en.js       `contentEn` — English copy.
│   └── main.js             App logic: language switching, localStorage
│                            persistence, and the render*() functions that
│                            populate index.html from the active content
│                            object.
├── assets/
│   ├── avatar-placeholder.svg   Placeholder avatar (silhouette).
│   └── icons/              Saved copies of the official brand SVGs (java,
│                            spring, go, kafka, postgresql, kubernetes,
│                            telegram, linkedin, github) as downloaded from
│                            Simple Icons (simpleicons.org, CC0). Kept here
│                            as the source-of-truth reference copy; the
│                            actual on-page markup lives inline in
│                            `js/icons.js` (see below) since <img> tags can't
│                            be recolored via CSS `currentColor`.
├── requirements.md         Original project brief (reference only).
└── CLAUDE.md               This file.
```

## 3. Naming conventions

- CSS classes: kebab-case, BEM-ish but flat (`skill-card`, `timeline-item`,
  `contact-link`) — descriptive, no abbreviations.
- CSS custom properties: `--color-*`, `--shadow-*` prefixes grouped by role
  (e.g. `--color-accent-primary`, `--color-text-secondary`).
- JS variables/functions: camelCase, verb-first for functions
  (`applyLanguage`, `renderSkills`).
- File names: lowercase, hyphen/underscore as shown above; content files use
  the `content_<lang>.js` pattern so a new locale is a predictable filename.

## 4. Localization system (i18n)

- `js/content_ru.js` and `js/content_en.js` each declare a single global
  constant (`contentRu`, `contentEn`) with an identical shape:
  `meta`, `hero`, `languageSwitcher`, `about`, `skills`,
  `experience`, `education`, `roadmap`, `footer`. `about` is a short
  `{ text }` bio (kept to two sentences) rendered in the hero section, below
  the name/role.
- They are loaded as plain `<script src="...">` tags (not `fetch()`), because
  `fetch()` of local JSON is blocked by the browser's CORS policy under
  `file://`. Any new locale must follow this same pattern — never switch this
  to JSON + fetch.
- `js/main.js` holds `activeLanguageCode` / `activeContent` and a
  `renderContent(content)` function that pushes every field from the content
  object into the DOM. It never reads text from HTML.
- **To add a new text string:** add the key to both `content_ru.js` and
  `content_en.js` in the same nested location, then reference it from the
  relevant `render*()` function in `main.js`.
- **To add a new language (e.g. German):** create `js/content_de.js`
  exporting `const contentDe = { ... }` with the same shape, include it via
  `<script src="js/content_de.js">` in `index.html` (after the other content
  scripts, before `main.js`), add a case for `'de'` in
  `getContentForLanguage()`, and add a corresponding button to
  `#language-switcher` in `index.html` (plus its click listener in
  `initializeEventListeners()`).
- Selected language persists in `localStorage` under
  `resumeSelectedLanguage`; Russian is the default when nothing is stored.

## 5. Color palette

- All colors are CSS custom properties declared once under `:root` in
  `css/styles.css` (a single dark palette — the site has no theme switching).
  Component rules never hardcode colors — they only reference the variables.
- **To change a color:** edit the variable value in the `:root` block.
- **To add a new value:** declare the variable in `:root`, then use
  `var(--the-new-variable)` wherever needed.

## 6. Page section layout

`index.html` is a single vertical stack of full-width sections (no sidebar —
everything is one column), below a slim, sticky top bar. None of these
sections have a visible heading or a divider line between them — accessible
names are set as `aria-label` on the section element via JS instead of a
visible `<h2>`, and there is no `border-top`/`border-bottom` between
sections (the sticky top bar is the one exception — it keeps its
`border-bottom` since it's persistent nav chrome, not a content section):

- `.page-topbar` — full-width bar (`position: sticky; top: 0`, stays visible
  while scrolling) holding the contact list (`#contact-list`, icon-only) and
  the language switcher (`#language-switcher`).
- `.hero-section` (`#hero-section`) — full-width section directly below the
  top bar, above Skills. `.hero-inner` is a flex row, centered as a group
  (`justify-content: center`): avatar (`.hero-avatar-wrapper` +
  `#hero-avatar-image`) on the left, `.hero-details` on the right holding
  name (`#hero-name`), role (`#hero-role`), and the short About blurb
  (`#about-text`, plain paragraph). Stacks to a centered column below 600px
  (`.hero-inner { flex-direction: column }`).
- `.skills-banner` (`#skills-section`) — full-width section below the hero,
  above main content. `content.skills.title` is applied as an `aria-label`
  on the section (no visible heading); holds `#skills-grid`, rendered as
  borderless icon + name pairs (icon left, name vertically centered to its
  right; no card background/border), grouped into explicit centered rows.
  `content.skills` has a `rows` field — an array of arrays of `{ id, name }`
  items, e.g. `rows: [[{id:'go',...}, {id:'java',...}], [{id:'postgresql',...}, ...]]`
  — each inner array becomes one `.skills-row` (flexbox, wraps and
  centers its own items independently of other rows).
  `renderSkills(skillRows)` in `main.js` loops rows then items; **to
  change which skills appear on which row**, edit the `rows` arrays in
  both `content_ru.js` and `content_en.js` (keep them in sync). The first
  row is styled larger (`.skills-row:first-child`) to feature its skills.
- `.main-content` (`main.main-content-inner` centered at max-width 1120px)
  — a single `.experience-section` (`#experience-section`, `aria-label` from
  `content.experience.title`) holding one merged `#experience-timeline`
  list: Experience jobs first (most-recent-first), followed by the single
  Education entry as one more `.timeline-item` appended to the *same* list
  — there is no separate Education section or heading (see §7).
- `.roadmap-section` (`#roadmap-section`, `aria-label` from
  `content.roadmap.title`) — full-width tech-stack diagram below main
  content, above the footer (see §8).
- `.site-footer` — full-width, below `.roadmap-section`.

The underlying content objects, IDs, and render functions in `main.js`
(`renderSkills`, `renderTimeline`, `renderRoadmap`) are independent of this
placement — moving a block between sections is purely an
`index.html`/`styles.css` change; no `main.js` change is required as long as
the element IDs are preserved.

## 7. Experience timeline data structure

The experience section is a **zigzag timeline**: a single connecting line
down the vertical center (`.experience-timeline::before`, `left: 50%`), a
marker dot centered on that line per entry (`.timeline-marker`, also
`left: 50%`), and `.timeline-content` cards alternating sides —
`:nth-child(odd)` cards sit in the left half (`margin-right: calc(50% + 24px)`),
`:nth-child(even)` cards sit in the right half (`margin-left: calc(50% + 24px)`).
Below 900px this collapses to the classic single-column layout: the line
and markers move to a fixed `left: 5px`, and every card (odd or even) gets
`margin-left: 32px` instead of alternating — the zigzag only reads correctly
with room on both sides of a center line, which narrow viewports don't have.

Defined per-language inside `content_ru.js` / `content_en.js` under
`experience.jobs`, an array ordered **most-recent-first** (top of the list =
current/latest job — also the first/leftmost card in the zigzag):

```js
{
  company: 'Company Name',
  role: 'Job title',
  period: 'Start — End (or "Present")',
  points: ['Bullet 1', 'Bullet 2', ...]
}
```

`renderTimeline(jobs, education)` in `main.js` iterates `jobs` and builds one
`<li class="timeline-item">` per entry (a `.timeline-marker` dot plus a
`.timeline-content` card holding the period, company, role and bullet
points) into `#experience-timeline`. **To add a new job:** insert a new
object at the *top* of the `jobs` array in *both* `content_ru.js` and
`content_en.js` (keep both files in sync) — no HTML or CSS changes are
required (the new item just inherits whichever side its new odd/even
position lands on).

Education (`content_ru.js`/`content_en.js` under `education`) reuses this
same visual language deliberately: `{ period, institution, degree,
description }` maps to the timeline's `{ period, company, role, points }`
shape (`institution` → heading, `degree` → subheading, `description` →
wrapped as a single `<li>` inside `.timeline-points`). `renderTimeline()`
appends it as one *more* `.timeline-item` onto the end of the same
`#experience-timeline` list (after all jobs) — there is no separate
Education section, heading, or list; it's the last entry of the combined
timeline, so it renders identical to an Experience card and simply reads as
the oldest/foundational entry. If education ever needs multiple entries,
give it a `jobs`-style array and loop over it the same way jobs are looped.

## 8. Roadmap (tech-stack diagram)

`.roadmap-section` renders a flat, icon-free "roadmap style" diagram of
technologies grouped into categories — a horizontal row of category columns
on desktop, joined by a connecting line across each column's marker dot
(`.roadmap::before` + `.roadmap-group-marker`), with each column's items
shown as boxes (`.roadmap-node`) connected by their own vertical line
(`.roadmap-nodes::before`). Below 900px it drops to 2 columns and below
600px to 1, and the horizontal top connector is hidden at both those
breakpoints since it only reads correctly as a single row.

Defined per-language inside `content_ru.js` / `content_en.js` under
`roadmap.groups`, an array of `{ name, items }` where `items` is a flat
array of plain label strings (no icon ids — this diagram is intentionally
text-only, unlike the Skills banner):

```js
{
  name: 'Category name',
  items: ['Tech A', 'Tech B', ...]
}
```

`renderRoadmap()` in `main.js` builds one `.roadmap-group` per entry (marker
dot + title + `.roadmap-nodes` list of `.roadmap-node` boxes). **To add or
change a category/technology:** edit the `groups` array in *both*
`content_ru.js` and `content_en.js` (keep both files and the category
order in sync) — no HTML or CSS changes are required.

## 9. Icon assets

- Brand icons (java, spring, go, kafka, postgresql, kubernetes, telegram,
  linkedin, github) are official marks from Simple Icons (CC0), saved as
  individual files in `assets/icons/*.svg` and copied inline into
  `iconMarkup` in `js/icons.js`.
- The `<path>` data must match `assets/icons/*.svg` exactly — always copy the
  saved file's contents rather than retyping it, so the glyph stays pixel
  accurate to the source. Each is wrapped as
  `<svg viewBox="0 0 24 24" fill="currentColor" ...>` (no `fill` attribute on
  the `<path>` itself) so the icon inherits the surrounding text color and
  recolors correctly via CSS (e.g. on hover).
- **To update or add a brand icon:** download the official SVG (e.g. from
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`), save
  it as `assets/icons/<name>.svg`, then copy its `<path>` markup into the
  matching `iconMarkup` entry in `js/icons.js`, keeping the
  `fill="currentColor"` wrapper. Do not reference the file at runtime via
  `<img>`/`<use>` — external SVG references don't reliably recolor and can
  be blocked under `file://`.
- `email` is not a brand mark — it stays a hand-authored stroke icon and is
  not tied to any file in `assets/icons/`.

## 10. Constraints

- No build tools, no bundlers, no npm/yarn dependencies, no dev server.
- No `fetch()` of local files (breaks under `file://` due to CORS) — all data
  is loaded via `<script>` tags declaring global `const` objects.
- Everything must keep working by simply opening `index.html` from disk.
- Fonts are loaded from Google Fonts via CDN `<link>` tags; this is the only
  network dependency and is allowed to fail gracefully (falls back to system
  sans-serif) when offline.
- All icons (skills, contacts) are inline SVG strings defined in
  `js/icons.js` — do not switch these to an external icon font/CDN sprite,
  since that would make the icons dependent on network access.
