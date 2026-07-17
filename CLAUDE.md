# CLAUDE.md

## 1. Project overview

A single-page CV/resume site. Pure static HTML/CSS/JS, no backend, no build
step, no npm. Open `index.html` directly in a browser (`file://...`) and it
works fully — language switching (RU/EN), theme switching (dark/light),
responsive layout, all included.

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
│   └── styles.css        All styling. Theming via CSS custom properties
│                          defined on :root/[data-theme="dark"] and
│                          overridden in [data-theme="light"].
├── js/
│   ├── icons.js           `iconMarkup` — a map of inline SVG strings used for
│   │                       skill/contact icons and the sun/moon theme
│   │                       toggle. Brand icons are copied verbatim from the
│   │                       matching file in assets/icons/ (see below);
│   │                       email/sun/moon are hand-authored (not brand
│   │                       marks). No CDN icon fonts/sprites are used, so
│   │                       icons render identically offline via file://.
│   ├── content_ru.js       `contentRu` — Russian copy (default language).
│   ├── content_en.js       `contentEn` — English copy.
│   └── main.js             App logic: language/theme switching, localStorage
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

- CSS classes: kebab-case, BEM-ish but flat (`skill-card`, `timeline-marker`,
  `contact-link`) — descriptive, no abbreviations.
- CSS custom properties: `--color-*`, `--shadow-*` prefixes grouped by role
  (e.g. `--color-accent-primary`, `--color-text-secondary`).
- JS variables/functions: camelCase, verb-first for functions
  (`applyLanguage`, `renderSkills`, `toggleTheme`).
- File names: lowercase, hyphen/underscore as shown above; content files use
  the `content_<lang>.js` pattern so a new locale is a predictable filename.

## 4. Localization system (i18n)

- `js/content_ru.js` and `js/content_en.js` each declare a single global
  constant (`contentRu`, `contentEn`) with an identical shape:
  `meta`, `hero`, `themeToggle`, `languageSwitcher`, `about`, `skills`,
  `experience`, `education`, `languages`, `footer`. `about` is a short
  `{ text }` bio (kept to two sentences) rendered in the sidebar between the
  name/role and the contact list.
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

## 5. Theme system (light/dark)

- All colors are CSS custom properties defined twice in `css/styles.css`:
  once under `:root, [data-theme="dark"]` (the default palette) and once
  under `[data-theme="light"]` (same variable names, different values).
  Component rules never hardcode colors — they only reference the variables.
- The active theme is the `data-theme` attribute on `<html>`, toggled by
  `applyTheme()` / `toggleTheme()` in `main.js`, and persisted in
  `localStorage` under `resumeSelectedTheme`. Dark is the default.
- **To change a color:** edit the variable value in the matching
  `[data-theme="..."]` block; do not add new hardcoded colors in component
  rules.
- **To add a new themed value:** declare the variable in both blocks in
  `styles.css`, then use `var(--the-new-variable)` wherever needed.

## 6. Page section layout

`index.html` is a two-panel layout below a slim top bar:

- `.page-topbar` — full-width bar holding only the language switcher and
  theme toggle (`#language-switcher`, `#theme-toggle-button`).
- `.page-layout` — a CSS grid (`aside.sidebar` + `main.main-content`,
  `300px 1fr`, stacks to a single column under 900px, sidebar becomes
  `position: static` on mobile instead of sticky).
  - **Sidebar** (`#sidebar`): avatar, name, role, a short two-sentence About
    blurb (`#about-text`, plain paragraph, no heading), contact list, then
    two `.sidebar-section` blocks in order — Key Skills (`#skills-title` +
    `#skills-grid`) and Languages (`#languages-title` + `#languages-list`).
  - **Main content** (`.main-content`), top to bottom: Education
    (`#education-title` + `#education-timeline`), then Experience
    (`#experience-title` + `#experience-timeline`). Both use the
    `.experience-timeline` / `.timeline-item` / `.timeline-marker` /
    `.timeline-content` classes so they render in the exact same vertical
    timeline style — Education is just a timeline with a single entry (see
    §7).
- `.site-footer` — full-width, below `.page-layout`.

The underlying content objects, IDs, and render functions in `main.js`
(`renderSkills`, `renderExperience`, `renderEducation`, `renderLanguages`) are
independent of this placement — moving a block between sidebar and main
content is purely an `index.html`/`styles.css` change; no `main.js` change is
required as long as the element IDs are preserved.

## 7. Experience timeline data structure

The experience section is a vertical timeline (a connecting line down the
left edge, with a marker dot + card per entry). Defined per-language inside
`content_ru.js` / `content_en.js` under `experience.jobs`, an array ordered
**most-recent-first** (top of the list = current/latest job):

```js
{
  company: 'Company Name',
  role: 'Job title',
  period: 'Start — End (or "Present")',
  points: ['Bullet 1', 'Bullet 2', ...]
}
```

`renderExperience()` in `main.js` iterates this array and builds one
`<li class="timeline-item">` per entry (a `.timeline-marker` dot plus a
`.timeline-content` card holding the period, company, role and bullet
points). **To add a new job:** insert a new object at the *top* of the
`jobs` array in *both* `content_ru.js` and `content_en.js` (keep both files
in sync) — no HTML or CSS changes are required.

Education (`content_ru.js`/`content_en.js` under `education`) reuses this
same visual language deliberately: `{ title, period, institution, degree,
description }` maps to the timeline's `{ period, company, role, points }`
shape (`institution` → heading, `degree` → subheading, `description` →
wrapped as a single `<li>` inside `.timeline-points`). `renderEducation()`
in `main.js` renders it into `#education-timeline` as a one-entry
`.experience-timeline` list, so it looks identical to an Experience card. If
education ever needs multiple entries, give it a `jobs`-style array and loop
over it the same way `renderExperience()` does.

## 8. Icon assets

- Brand icons (java, spring, go, kafka, postgresql, kubernetes, telegram,
  linkedin, github) are official marks from Simple Icons (CC0), saved as
  individual files in `assets/icons/*.svg` and copied inline into
  `iconMarkup` in `js/icons.js`.
- The `<path>` data must match `assets/icons/*.svg` exactly — always copy the
  saved file's contents rather than retyping it, so the glyph stays pixel
  accurate to the source. Each is wrapped as
  `<svg viewBox="0 0 24 24" fill="currentColor" ...>` (no `fill` attribute on
  the `<path>` itself) so the icon inherits the surrounding text color and
  themes/recolors correctly via CSS.
- **To update or add a brand icon:** download the official SVG (e.g. from
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`), save
  it as `assets/icons/<name>.svg`, then copy its `<path>` markup into the
  matching `iconMarkup` entry in `js/icons.js`, keeping the
  `fill="currentColor"` wrapper. Do not reference the file at runtime via
  `<img>`/`<use>` — external SVG references don't reliably recolor and can
  be blocked under `file://`.
- `email`, `sun`, and `moon` are not brand marks — they stay hand-authored
  stroke icons and are not tied to any file in `assets/icons/`.

## 9. Constraints

- No build tools, no bundlers, no npm/yarn dependencies, no dev server.
- No `fetch()` of local files (breaks under `file://` due to CORS) — all data
  is loaded via `<script>` tags declaring global `const` objects.
- Everything must keep working by simply opening `index.html` from disk.
- Fonts are loaded from Google Fonts via CDN `<link>` tags; this is the only
  network dependency and is allowed to fail gracefully (falls back to system
  sans-serif) when offline.
- All icons (skills, contacts, theme toggle) are inline SVG strings defined
  in `js/icons.js` — do not switch these to an external icon font/CDN sprite,
  since that would make the icons dependent on network access.
