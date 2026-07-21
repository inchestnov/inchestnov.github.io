# CLAUDE.md

## 1. Project overview

A single-page CV/resume site, built as a Vite + React + TypeScript SPA. The
site has a single dark visual theme; there is no theme switching.

This project used to be pure static HTML/CSS/JS with zero build step,
openable directly via `file://`. It was migrated to React + TS to take
advantage of the component model, hooks, and typed data, then the build was
adjusted so the *editing* workflow requires Node/npm while the *shipped*
artifact keeps the original "just open the file" property:

```
npm install
npm run dev        # local dev server (Vite, ES modules + HMR) — for editing
npm run build       # typecheck + production build into dist/ — see below
npm run preview     # serve the dist/ build over http, as a sanity check
npm run typecheck   # tsc --noEmit only
```

**`npm run build` produces `dist/index.html`, openable directly via
`file://` (double-click it, no server needed).** This works because
`vite.config.ts` branches on the Vite command: `npm run dev` uses Vite's
normal ES-module dev server (`<script type="module">`, required for HMR),
but `npm run build` switches to Vite's **library mode** (`build.lib`,
`formats: ['iife']`) instead of its normal app-build mode. This bundles the
whole app — React, ReactDOM, Framer Motion, all components — into a single
self-contained classic script (`dist/resume-app.js`, no `import`/`export`,
wrapped in an IIFE) plus one CSS file (`dist/resume-app.css`). A classic
`<script src="...">` is not subject to the `file://` module-loading block
that `<script type="module">` hits in Chromium — that block is specifically
about the `type="module"` mechanism, not about ES2015+ syntax, so an IIFE
bundle using modern JS works fine under `file://` even though a
module-based bundle doesn't.

Because `build.lib` mode doesn't process `index.html` as an entry point
(that's an app-build-only feature), `scripts/write-static-html.mjs` runs
after `vite build` (see the `build` script above) and writes
`dist/index.html` by hand — plain `<link rel="stylesheet">` +
`<script src="...">` tags, no `type="module"`. If you change the Google
Fonts `<link>` tags or any other `<head>` markup in the root `index.html`
(the dev entry), mirror the change in `scripts/write-static-html.mjs` too —
they're two separate files by necessity (dev needs a module entry, the
shipped build needs a classic one) and don't stay in sync automatically.

One real bug worth remembering if this build config is ever touched again:
library-mode iife builds do **not** get Vite's usual automatic
`process.env.NODE_ENV` replacement the way normal app builds do. Without
the explicit `define: { 'process.env.NODE_ENV': JSON.stringify('production') }`
in the `build` command branch of `vite.config.ts`, React and Framer
Motion's internal dev/prod dual code paths both stay in the bundle
(neither branch of `process.env.NODE_ENV === 'production' ? prod : dev` can
be dead-code-eliminated), roughly doubling bundle size — and since
`process` isn't a real global in the browser, the unresolved runtime check
would throw immediately on load. This was caught by inspecting the built
bundle for a lingering `process.env.NODE_ENV` token and verifying the fix
with a headless-Chrome DOM dump of the `file://`-opened build.

Do not introduce a second bundler or framework on top of this stack. Do not
add a backend — this stays a client-only SPA (no server/API calls; content
is bundled at build time, not fetched at runtime).

## 2. File structure

```
resume/
├── index.html               Vite DEV entry point only (used by `npm run
│                              dev`): empty #root + the Google Fonts <link>
│                              tags + a module script pointing at
│                              src/main.tsx. Not what ships — see §1 and
│                              scripts/write-static-html.mjs below for the
│                              actual dist/index.html the build produces.
├── vite.config.ts            Branches on the Vite command (see §1):
│                              `serve` (npm run dev) gets the normal
│                              ES-module dev server; `build` (npm run build)
│                              switches to library mode (iife format) to
│                              produce a classic-script, file://-openable
│                              bundle instead.
├── scripts/
│   └── write-static-html.mjs  Hand-writes dist/index.html after `vite
│                              build` (library mode doesn't process HTML
│                              entries) — plain <link>/<script> tags, no
│                              type="module". Run automatically as part of
│                              `npm run build`.
├── tsconfig.json              Strict TS config (see §4a).
├── tsconfig.node.json          Node-side config for vite.config.ts itself.
├── package.json / package-lock.json
├── assets/
│   └── icons/                Saved copies of the official brand SVGs (java,
│                               spring, spring-boot, go, python, maven,
│                               gradle, git, vim, claude-code, docker,
│                               kubernetes, gitlab, linux, kafka, postgresql,
│                               telegram, linkedin, github) as downloaded
│                               from Simple Icons (simpleicons.org, CC0).
│                               Reference-only, source-of-truth copies — NOT
│                               part of the Vite build (not imported from
│                               src/); the actual on-page markup lives inline
│                               in src/icons/iconMarkup.ts (see §9).
├── requirements.md            Original project brief (historical reference
│                               only — describes the pre-migration static
│                               site; superseded by this file where they
│                               conflict).
├── CLAUDE.md                  This file.
└── src/
    ├── main.tsx                Mounts <App /> into #root, imports styles/styles.css.
    ├── App.tsx                 Top-level layout: wraps everything in
    │                            LanguageProvider, renders the sections in
    │                            page order (see §6).
    ├── vite-env.d.ts            `/// <reference types="vite/client" />`.
    ├── types.ts                 ResumeContent + sub-interfaces — the single
    │                            typed shape both content.ru.ts/content.en.ts
    │                            must satisfy.
    ├── styles/
    │   └── styles.css           All styling, unchanged in substance from the
    │                            pre-migration stylesheet — same CSS custom
    │                            properties on :root (single dark palette),
    │                            same class names, same responsive
    │                            breakpoints. Imported once from main.tsx.
    ├── content/
    │   ├── content.ru.ts        `export const contentRu: ResumeContent`.
    │   └── content.en.ts        `export const contentEn: ResumeContent`.
    ├── icons/
    │   └── iconMarkup.ts        `iconMarkup` — a typed Record of inline SVG
    │                            markup strings (see §9). `IconId` is
    │                            `keyof typeof iconMarkup`.
    ├── assets/
    │   └── avatar-placeholder.svg   Placeholder avatar, imported as a module
    │                            (`import avatarPlaceholder from '...'`) so
    │                            Vite hashes/bundles it like any other asset.
    ├── context/
    │   └── LanguageContext.tsx   `LanguageProvider` — owns the active
    │                            language, localStorage persistence, and the
    │                            derived `content` object (see §4).
    ├── hooks/
    │   └── useLanguage.ts        Thin `useContext(LanguageContext)` wrapper
    │                            used by every component that needs `content`.
    └── components/
        ├── Icon.tsx              Shared memoized icon renderer (see §9).
        ├── TopBar/
        │   ├── TopBar.tsx
        │   ├── ContactList.tsx    Reused by both the topbar and the footer.
        │   └── LanguageSwitcher.tsx  RU/EN buttons + the sliding active pill.
        ├── HeroSection.tsx
        ├── SkillsSection.tsx
        ├── ExperienceSection/
        │   ├── ExperienceSection.tsx
        │   └── TimelineItem.tsx
        ├── RoadmapSection/
        │   ├── RoadmapSection.tsx
        │   └── RoadmapNode.tsx
        └── SiteFooter.tsx
```

## 3. Naming conventions

- CSS classes: kebab-case, BEM-ish but flat (`skill-card`, `timeline-item`,
  `contact-link`) — descriptive, no abbreviations. Unchanged by the React
  migration; components render the same class names the old static markup
  used, so `styles.css` needed no rewrite.
- CSS custom properties: `--color-*`, `--shadow-*` prefixes grouped by role
  (e.g. `--color-accent-primary`, `--color-text-secondary`).
- React components: PascalCase, one component per file, file name matches
  the exported component (`HeroSection.tsx` exports `HeroSection`).
- Hooks: camelCase, `use`-prefixed (`useLanguage`).
- TS variables/functions: camelCase, verb-first for functions that do
  something (`getContentForLanguage`, `setLanguage`).
- File names: lowercase-with-dots for non-component modules, matching their
  export (`content.ru.ts`, `iconMarkup.ts`); PascalCase for component files.

## 4. Localization & language state (i18n)

- `src/content/content.ru.ts` and `content.en.ts` each export a single typed
  constant (`contentRu`, `contentEn`) satisfying the `ResumeContent`
  interface from `src/types.ts`: `meta`, `hero`, `languageSwitcher`, `about`,
  `skills`, `experience`, `education`, `roadmap`, `footer`. `about` is a
  short `{ text }` bio rendered in the hero section, below the name/role.
- They're loaded as plain ES module imports (`import { contentRu } from
  './content/content.ru'`) — the old "must be `<script src>` tags, never
  `fetch()`, because of `file://` CORS" constraint no longer applies, since
  Vite bundles everything into the JS bundle at build time. There is still
  no `fetch()` of content at runtime; it's just resolved by the bundler
  instead of the browser.
- `src/context/LanguageContext.tsx`'s `LanguageProvider` owns all language
  state: `language` (a lazy `useState` initializer reads
  `localStorage['resumeSelectedLanguage']` synchronously, defaulting to
  `'ru'`), `setLanguage` (persists to the same localStorage key), and the
  derived `content` object (`contentRu`/`contentEn` picked by `language`).
  The provider `value` is `useMemo`'d over `[language, setLanguage,
  content]` — every component that reads `content` goes through
  `useLanguage()`, so this memoization avoids re-rendering the whole tree on
  unrelated state changes. Two `useEffect`s sync `<html lang>` and
  `document.title` (DOM state outside React's own tree).
- **To add a new text string:** add the key to both `content.ru.ts` and
  `content.en.ts` in the same nested location (and to the `ResumeContent`
  interface in `types.ts` if it's a new field), then read it via
  `useLanguage().content` in the relevant component.
- **To add a new language (e.g. German):** create `src/content/content.de.ts`
  exporting `contentDe: ResumeContent`, extend the `Language` union in
  `types.ts` to `'ru' | 'en' | 'de'`, add a branch to
  `getContentForLanguage()` in `LanguageContext.tsx`, and add a third
  `<LanguageButton>` in `LanguageSwitcher.tsx`.

## 4a. TypeScript configuration

`tsconfig.json` is strict (`strict: true`, plus `noUnusedLocals`,
`noUnusedParameters`, `noUncheckedIndexedAccess`). `noUncheckedIndexedAccess`
matters concretely for icon lookups (`iconMarkup[id]` types as `string |
undefined`), which is exactly why `Icon.tsx` and `RoadmapNode.tsx` both
handle the "no matching icon" case explicitly rather than assuming a hit.
`jsx: "react-jsx"` (the automatic runtime) — no `import React` needed per
file. `moduleResolution: "Bundler"` matches Vite's own resolution. Run
`npm run typecheck` (`tsc --noEmit`) any time — it's also the first step of
`npm run build`, so a type error blocks the build.

## 5. Color palette

- All colors are CSS custom properties declared once under `:root` in
  `src/styles/styles.css` (a single dark palette — the site has no theme
  switching). Component rules never hardcode colors — they only reference
  the variables. Unchanged by the React migration.
- **To change a color:** edit the variable value in the `:root` block.
- **To add a new value:** declare the variable in `:root`, then use
  `var(--the-new-variable)` wherever needed.

## 6. Page section layout

`App.tsx` renders a single vertical stack of full-width sections (no sidebar
— everything is one column), below a slim, sticky top bar — the same
layout as before the migration, now expressed as JSX components instead of
DOM containers populated by `render*()` functions. None of these sections
have a visible heading or a divider line between them — accessible names
are set as `aria-label` directly in each section component's JSX instead of
a visible `<h2>`, and there is no `border-top`/`border-bottom` between
sections (the sticky top bar is the one exception — it keeps its
`border-bottom` since it's persistent nav chrome, not a content section):

- `<TopBar />` (`.page-topbar`, `position: sticky; top: 0`) — holds
  `<ContactList>` (icon-only, `.contact-list`) and `<LanguageSwitcher />`.
- `<HeroSection />` (`.hero-section`) — directly below the top bar, above
  Skills. `.hero-inner` is a flex row, centered as a group: avatar
  (`.hero-avatar-wrapper`) on the left, `.hero-details` on the right holding
  name (`<h1>`), role, and the About blurb. Stacks to a centered column
  below 600px.
- `<SkillsSection />` (`.skills-banner`) — below the hero, above main
  content. `content.skills.title` is applied as the section's `aria-label`;
  renders `content.skills.rows` (an array of arrays of `{ id, name }`) as
  one `.skills-row` per inner array — each row wraps/centers its own items
  independently. **To change which skills appear on which row:** edit the
  `rows` arrays in both `content.ru.ts` and `content.en.ts` (keep them in
  sync). The first row is styled larger (`.skills-row:first-child`).
- `<main className="main-content">` (`.main-content-inner`, centered at
  max-width 1120px) wraps a single `<ExperienceSection />` (`aria-label`
  from `content.experience.title`) holding one merged
  `.experience-timeline` list: Experience jobs first (most-recent-first),
  followed by the single Education entry as one more `<TimelineItem>`
  appended to the *same* list — there is no separate Education section or
  heading (see §7). This `<main>` wrapper lives in `App.tsx`, not inside
  `ExperienceSection.tsx`.
- `<RoadmapSection />` (`aria-label` from `content.roadmap.title`) —
  full-width tech-stack diagram below main content, above the footer (see
  §8).
- `<SiteFooter />` — below `<RoadmapSection />`.

Moving a section is a pure `App.tsx` change (reorder the JSX) — no
component internals need to change as long as each section still reads
`content` via `useLanguage()`.

## 7. Experience timeline data structure

The experience section is a **zigzag timeline**: a single connecting line
down the vertical center (`.experience-timeline::before`, `left: 50%`), a
marker dot centered on that line per entry (`.timeline-marker`, also
`left: 50%`), and `.timeline-content` cards alternating sides —
`:nth-child(odd)` cards sit in the left half (`margin-right: calc(50% + 24px)`),
`:nth-child(even)` cards sit in the right half (`margin-left: calc(50% + 24px)`).
Below 900px this collapses to the classic single-column layout: the line
and markers move to a fixed `left: 5px`, and every card (odd or even) gets
`margin-left: 32px` instead of alternating. This is 100% unchanged CSS —
purely `nth-child`/`@media`, no JS/React involvement, so it keeps working
regardless of how many `<TimelineItem>`s render.

Defined per-language inside `content.ru.ts` / `content.en.ts` under
`experience.jobs`, typed as `ExperienceJob[]` in `types.ts`, ordered
**most-recent-first**:

```ts
{
  company: 'Company Name',
  role: 'Job title',
  period: 'Start — End (or "Present")',
  points: ['Bullet 1', 'Bullet 2', ...],
  icon: 'icon-id'
}
```

`ExperienceSection.tsx` maps `jobs` to one `<TimelineItem>` each, then
appends one more `<TimelineItem>` built from `content.education` (`{ period,
institution, degree, description, icon }` maps to `TimelineItem`'s `{ period,
company, role, points, icon }` props — `institution` → heading, `degree` →
subheading, `description` (a `string[]`, one sentence per bullet) → `points`
directly). **To add a new job:** insert a new object at the *top* of the
`jobs` array in *both* `content.ru.ts` and `content.en.ts` — no component or
CSS changes required.

`icon` is a plain `string` id looked up in `iconMarkup` (like
`RoadmapItem.id`/`SkillItem.id` — see §8/§9), rendered by `TimelineItem` via
the shared `<Icon>` component inside `.timeline-heading` (a flex row placed
above the company name, `.timeline-icon` sized 22×22px, colored via
`var(--color-accent-primary)` — same pattern as `.roadmap-node-icon`).
Companies without a real logo yet use the hand-authored
`'company-placeholder'` generic briefcase icon (see §9); swap in a real
brand/company icon id once one exists for that entry.

`TimelineItem` is a plain (non-memoized) component — its props change on
every language switch by definition, so `React.memo` would provide no
benefit there (see §10a). It does use Framer Motion for a fade/slide-in
`whileInView` reveal and a `whileHover` lift on the card — both animate only
`opacity`/`transform` on the `<motion.li>`/`<motion.div>` wrapper elements
themselves, never on `.timeline-marker` or `.experience-timeline::before`
(which keep their own CSS `transform: translateX(-50%)` centering
untouched — see §10b for why that separation matters).

## 8. Roadmap (tech-stack diagram)

`<RoadmapSection />` renders a "roadmap style" diagram of technologies
grouped into categories — a horizontal row of category columns on desktop,
joined by a connecting line across each column's marker dot
(`.roadmap::before` + `.roadmap-group-marker`), with each column's items
shown as icon+name boxes (`.roadmap-node`) connected by their own vertical
line (`.roadmap-nodes::before`). Below 900px it drops to 2 columns and below
600px to 1 — unchanged pure-CSS behavior, same as §7.

Defined per-language inside `content.ru.ts` / `content.en.ts` under
`roadmap.groups`, typed as `RoadmapGroup[]` in `types.ts`:

```ts
{
  name: 'Category name',
  items: [{ id: 'tech-a', name: 'Tech A' }, { id: 'tech-b', name: 'Tech B' }, ...]
}
```

`RoadmapSection.tsx` renders one `.roadmap-group` per entry (marker dot +
title + a `<RoadmapNode>` per item). `RoadmapNode` checks `id in iconMarkup`
and renders name-only (no icon span at all) if there's no match — the same
"safety net for future additions" behavior as before, now enforced by
`noUncheckedIndexedAccess` in the type system rather than a runtime-only
convention. **To add or change a category/technology:** edit the `groups`
array in *both* `content.ru.ts` and `content.en.ts`, and add a matching
entry to `iconMarkup` in `src/icons/iconMarkup.ts` if a brand icon is
available (see §9) — `RoadmapItem.id`/`SkillItem.id` stay plain `string` in
`types.ts` (not the closed `IconId` union) specifically so this fallback
case keeps type-checking.

## 9. Icon assets

- Brand icons (java, spring, spring-boot, python, maven, gradle, git,
  vim, claude-code, docker, kubernetes, gitlab, linux, kafka, postgresql,
  telegram, linkedin, github) are official marks from Simple Icons (CC0),
  saved as individual files in `assets/icons/*.svg` and copied inline,
  byte-for-byte, into `iconMarkup` in `src/icons/iconMarkup.ts`. This
  migration ported every entry verbatim (verified with a diff script against
  the pre-migration `js/icons.js`) — no path data was retyped by hand.
- `go` is sourced from Wikimedia Commons's copy of the official Go wordmark
  ("Go Logo Blue",
  `upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg`), not
  Simple Icons. Simple Icons' own "go" entry was used originally (like
  every other brand icon here), but its `0 0 24 24` viewBox has the
  wordmark's ink occupying only the middle third vertically, leaving large
  built-in blank margins above and below baked into the coordinate space
  itself — at the same icon-box size as the other, genuinely square brand
  icons, it rendered visibly smaller. Cropping that viewBox down to the
  wordmark's own bounding box was tried first and worked, but the source
  was swapped out entirely instead, since this official artwork's own
  viewBox (`0 0 205.4 76.7`) is already cropped tightly to the design with
  no extra margin, needing no adjustment. `assets/icons/go.svg` is the
  untouched reference copy (original brand blue `#00ACD7`); `iconMarkup.go`
  recolors it to `fill="currentColor"` like every other icon, same as the
  Simple Icons entries, just from a different upstream source.
- `activemq` is the one exception to the Simple Icons rule: Apache ActiveMQ
  has no entry there (checked both "ActiveMQ" and "Apache Artemis" — neither
  exists; only the generic, non-product-specific Apache Software Foundation
  feather logo does, which was deliberately *not* used since it isn't
  ActiveMQ-specific). Instead `iconMarkup.activemq` holds the official
  ActiveMQ "flower" symbol, cropped out of the full logo (the original also
  carries an "Apache ACTIVE MQ" wordmark, removed since it would duplicate
  the adjacent `.roadmap-node-name` label), with a portrait `viewBox` rather
  than square, so it letterboxes inside the (square) `.roadmap-node-icon`
  box instead of filling it edge-to-edge. Its five petals **do** use
  `fill="currentColor"` (recolored to the site's blue accent, like every
  other icon), but the white connector dots/lines stay literal `#fff` —
  coloring everything the same blue would make the whole glyph collapse
  into an indistinct blob. `assets/icons/activemq.svg` is the one case
  where the reference copy **intentionally does not match**
  `iconMarkup.activemq` exactly: it keeps the original five official brand
  colors on the petals (the true source-of-truth for what the logo actually
  looks like), while the inline version carries the site-specific blue
  recolor. If ActiveMQ is ever dropped from the roadmap, remove both files
  together.
- The markup data must match `assets/icons/*.svg` exactly — always copy the
  saved file's contents rather than retyping it. Each is wrapped as
  `<svg viewBox="0 0 24 24" fill="currentColor" ...>` (no `fill` attribute on
  the `<path>` itself) so the icon inherits the surrounding text color and
  recolors correctly via CSS (e.g. on hover). `activemq` is the one
  deliberate exception where inline fill colors diverge from the reference
  file (see above).
- **`Icon.tsx`** renders `iconMarkup[id]` via `dangerouslySetInnerHTML` —
  deliberate, not an oversight: the markup is 100% static, defined in our
  own source file, never influenced by user/network input, which is the
  textbook safe case for it. Parsing each icon into real JSX (e.g. via a
  build-time SVGR transform) was considered and rejected: it would risk
  mangling the intentionally-exact multi-part `activemq` markup
  (`<use>`/`<defs>`/mixed `currentColor`+literal-`#fff` fills) for no safety
  benefit. `Icon` returns `null` if `id` has no matching key (the
  `RoadmapNode` name-only fallback from §8), and is wrapped in `React.memo`
  — a `React.memo` case that's real, not a checkbox: `id` is a plain string
  prop, so unrelated re-renders of a parent card (e.g. a hover animation on
  a sibling) skip re-parsing the SVG string.
- **To update or add a brand icon:** download the official SVG (e.g. from
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`), save
  it as `assets/icons/<name>.svg`, then copy its `<path>` markup into the
  matching `iconMarkup` entry in `src/icons/iconMarkup.ts`, keeping the
  `fill="currentColor"` wrapper.
- `email` is not a brand mark — it stays a hand-authored stroke icon and is
  not tied to any file in `assets/icons/`.
- `company-placeholder` is likewise hand-authored (a generic briefcase
  outline, same `fill="none" stroke="currentColor"` style as `email`), used
  as the `icon` for any experience-timeline entry (§7) that doesn't have a
  real company logo yet. Not tied to any file in `assets/icons/`.
- Two of the four real per-company/institution logos below (`ozon-bank`,
  `samara-university`) are plate-free: no background shape, just the
  mark's own linework/letterforms recolored to `fill="currentColor"`
  (site accent blue), and each `viewBox` cropped tight to that content's
  own bounding box rather than the source artwork's full canvas (which
  reserved space for a plate and/or a wordmark that this site drops — see
  each entry for specifics). `moex` keeps its plate/block (see its own
  entry below), with a `fill="var(--color-surface)"` knockout treatment on
  the letters so they read as a cutout in the blue block rather than a
  literal white wordmark — this same knockout treatment was tried for
  `ozon-bank` too at one point and dropped there in favor of the simpler
  plate-free look, so the two logos aren't perfectly consistent with each
  other; that's a deliberate per-icon call, not an oversight. `haulmont`
  also keeps its solid disc background (see its own entry below for why,
  and for the several plate-free/multi-color variants that were tried and
  rejected along the way) — both its disc and its node/network pattern
  recolor to the same `fill="currentColor"`, and the thin gap between them
  (an intentional gap in the original artwork, not a rendering accident)
  is what reads as the mark's dark line-drawing detail. If any of this is
  ever revisited, the reference `.svg` files in `assets/icons/` still have
  the original plates/discs to work from.
- `ozon-bank` is a real per-company logo but, like `activemq`, not from
  Simple Icons — sourced from logo-teka.com instead (checked Simple Icons
  first; no entry there). The official mark is a solid brand-blue square
  badge with a white "OZON BANK" wordmark; `assets/icons/ozon-bank.svg` is
  the untouched reference copy of that original two-tone version.
  `iconMarkup['ozon-bank']` drops the background square entirely and
  recolors just the wordmark to `currentColor`.
- `moex` is also sourced from logo-teka.com (checked Simple Icons first; no
  entry there). The official mark is a red rounded-corner block with "MOEX"
  cut out in white inside it, plus a smaller "MOSCOW EXCHANGE" wordmark to
  its right; `assets/icons/moex.svg` is the untouched two-part original.
  `iconMarkup.moex` keeps the block plus the "MOEX" letters but drops the
  secondary wordmark (it would just duplicate the adjacent
  `.timeline-company` text). The block recolors to `fill="currentColor"`
  (site accent blue) like every other icon, while the letters use
  `fill="var(--color-surface)"` (not white, not `currentColor`) so they
  read as a cutout knocked out to the dark `.timeline-content` card
  background rather than a literal white wordmark or an invisible
  same-color-as-the-block fill. Its `viewBox` is cropped to the block's
  own bounding box (`0 0 562 345.8445435`) rather than the source's full
  `0 0 1000 345.8445435` canvas, which reserved empty width for the
  dropped wordmark. A plate-free, letters-only version (`viewBox="39 165
  497 147"`, just the letters recolored to `currentColor`, no block at
  all) was tried and replaced with this one on request.
- `samara-university` is sourced from ssau.ru directly (the university's own
  site, not Simple Icons) — its "white horizontal Russian logo" export is a
  full lockup: a spiral emblem mark followed by the complete "Самарский
  университет..." wordmark, all in white; `assets/icons/samara-university.svg`
  is the untouched original (`viewBox 0 0 293 40`). `iconMarkup['samara-university']`
  keeps only the spiral emblem (3 paths) and drops the wordmark portion —
  same duplicate-text reasoning as the `moex`/`ozon-bank` wordmarks, since
  `EducationEntry.institution` (§7) already renders the university's name as
  heading text next to the icon. `viewBox` is cropped to the emblem's own
  bounding box (`0 0 29 40`) rather than the source's full 293-wide canvas,
  which reserved width for the dropped wordmark.
- `haulmont` is sourced from haulmont.ru's own footer logo, which is an SVG
  sprite reference (`<svg><use href="/_nuxt/<hash>.svg#i-logo">`) rather
  than an inline icon or a Simple Icons entry — the sprite sheet was
  downloaded and the `#i-logo` symbol extracted. The full symbol
  (`viewBox 0 0 152 32`) is a circular emblem followed by the complete
  "HAULMONT" wordmark, all in white; `assets/icons/haulmont.svg` is that
  full lockup reassembled from the symbol, untouched. The wordmark is
  dropped, usual duplicate-text reasoning. The emblem keeps the original
  two-path structure: a node/network pattern path, plus a solid disc path
  with that same pattern knocked out of it as a hole via
  `fill-rule="evenodd"` (the network only reads as distinct shapes because
  of that thin gap, not color contrast). Both paths recolor to
  `fill="currentColor"` (site accent blue), same as every other icon in
  this file — the thin gap between the disc's hole and the pattern reads
  as dark "engraved" lines (the dark `.timeline-content` card background
  showing through that gap), which is what gives the mark its
  line-drawing look, not any separate stroke or second color. A
  plate-free treatment (dropping the disc to a thin ring outline, or to
  nothing at all), a red node/connector overlay on the blue disc, an
  all-green fill with the nodes punched out as transparent holes, and a
  `fill="none" stroke="currentColor"` bare-outline version were all tried
  and rejected along the way — this original recolored-as-is version is
  what stuck.

## 10. React architecture notes

### 10a. Memoization — applied deliberately, not as a checklist

| Optimization | Applied? | Why |
|---|---|---|
| `useMemo` on the `LanguageContext` provider value | Yes | Real, high-value: avoids re-rendering every consumer (nearly every component) on unrelated state changes. |
| `useCallback` on `setLanguage` | Yes | Required for `React.memo` on the language buttons to have any effect — a stable callback reference is what makes that memo meaningful. |
| `React.memo` on the language switcher buttons | Yes | Cheap, composes with the callback above. |
| `React.memo` on `Icon` | Yes | Mild but real: skips re-parsing static SVG markup when a sibling's hover animation re-renders the parent. |
| `React.memo` on `TimelineItem` / `RoadmapNode` / skill cards | **No, intentionally** | Their props change on every language switch by definition — memoizing them would compare props that are guaranteed to differ, i.e. dead weight, not a real optimization. |
| `useMemo` on icon lookups | **No** | Plain object property access (`iconMarkup[id]`) is not a computation; there's nothing to memoize. |
| `useMemo` on the footer copyright year substitution | Yes, minor | Cheap and harmless; avoids a string allocation per render. Marginal, not a big win. |
| `React.lazy` / `Suspense` for `RoadmapSection` | **No, intentionally** | It's unconditionally rendered on first paint (not conditionally shown later), so code-splitting it adds a network round-trip with zero deferred-work benefit — and dynamic `import()` chunk loading is unreliable/blocked under `file://` in Chromium, which would work against portability for no upside. |
| Explicit `width`/`height` on the avatar `<img>` | Yes | Real CLS (layout shift) prevention. |
| `loading="lazy"` on the avatar `<img>` | **No** | It's above-the-fold and renders immediately; lazy-loading it could only delay first paint, not help it. |

If you're about to add a new `React.memo`/`useMemo`/`useCallback`, ask
whether the memoized value's inputs are actually stable across the renders
you're trying to skip — if they're not, the memoization is a no-op at best.

### 10b. Framer Motion usage

Animations (`whileInView` fade/slide-in reveals, `whileHover` lifts, the
sliding "active pill" behind the language switcher via a shared `layoutId`)
are scoped strictly to `opacity` and `transform` (`x`/`y`/`scale`) on
wrapper elements — never on `.timeline-marker`, `.roadmap-group-marker`, or
the `::before` connector lines, all of which carry their own static CSS
`transform: translateX(-50%)` for centering. Framer Motion sets `transform`
via inline style, which would silently clobber that CSS rule if applied to
the same element. All responsive breakpoint logic (§7, §8) stays pure CSS
`@media`/`nth-child` — no JS-driven layout was introduced by the animation
work. Every animated component calls Framer Motion's built-in
`useReducedMotion()` and skips its motion props entirely when it returns
`true`.

## 11. Constraints

- No backend, no runtime `fetch()` of content — all copy is bundled at
  build time via ES module imports.
- Editing requires Node/npm (`npm run dev` for local development), but the
  shipped artifact does not: `npm run build` produces a `dist/index.html`
  that reopens the original "just open the file" property via a classic
  (non-module) IIFE bundle — see §1 for the full mechanism and why a plain
  `npm run build` from `dist/` (the app-mode default) wouldn't have worked.
- Fonts are loaded from Google Fonts via CDN `<link>` tags in `index.html`;
  this is the only network dependency and is allowed to fail gracefully
  (falls back to system sans-serif) when offline.
- All icons (skills, contacts, roadmap) are inline SVG strings defined in
  `src/icons/iconMarkup.ts` — do not switch these to an external icon
  font/CDN sprite/`<img>` reference, since that would make the icons
  dependent on network access and unable to recolor via `currentColor`.
- Single dark theme only — no light/dark toggle. This was explicitly kept
  out of scope during the React migration (not requested, and the project's
  visual identity is one deliberate dark palette).

## 12. Deployment

This repo is `inchestnov.github.io` — a GitHub Pages user site, published at
the repo root with no build step of its own. Since the React migration, the
repo's `master` branch holds *source* (`src/`, `index.html` as the Vite dev
entry, etc.), not the servable static site, so a GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds and deploys it automatically:

- Triggers on every push to `master` (and manually via
  `workflow_dispatch`).
- Runs `npm ci && npm run build` (the same classic-script build described
  in §1), then force-pushes the contents of `dist/` to a separate
  **`gh-pages` branch** (via `peaceiris/actions-gh-pages`) — deliberately
  *not* master's own root, and *not* the `actions/upload-pages-artifact` +
  `actions/deploy-pages` artifact mechanism (an earlier version of this
  workflow used that; both are valid GitHub Pages deployment methods, this
  repo now uses the branch-based one). Committing the build output onto
  `master` itself was considered and rejected: it would overwrite the root
  `index.html` that `npm run dev` depends on (breaking local development
  after every pull), and a bot commit back onto `master` risks re-triggering
  this same `on: push: branches: [master]` workflow in a loop. `gh-pages` is
  a completely separate branch with no relationship to `master`'s `src/`
  layout, so neither problem applies.
- **One manual one-time step this workflow depends on:** under Settings →
  Pages on GitHub, the repo's Pages source must be set to "Deploy from a
  branch" → branch `gh-pages` → `/ (root)`. This can't be done from
  git/CLI without a `gh`/API call — if the live site isn't updating after a
  push, check that setting first (and that the `gh-pages` branch exists,
  which it will after the workflow's first successful run).
