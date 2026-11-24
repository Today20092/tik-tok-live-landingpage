# A standard structure for Astro sites

Researched 2026-11-24 from the Astro docs and the source of ten public repositories (links pinned to the commit read). The standard below is a judgement made from that evidence. Neither Astro nor any single source prescribes it.

## Recommendation

Astro [reserves only `src/pages/`](https://docs.astro.build/en/basics/project-structure/); `components`, `layouts` and `styles` are conventions, and [`src/content.config.ts`](https://docs.astro.build/en/guides/content-collections/) is where collections are defined. I found no official guide to organizing a large Astro project. The examined repositories [do not agree with each other](#comparison), so pick one layout and keep it.

### Folder tree

Create a folder only when it has something to hold.

```text
src/
  pages/                  URLs only
  layouts/                BaseLayout.astro, ArticleLayout.astro
  components/
    layout/               Header, Footer, SeoHead
    sections/             one page band each: Hero, Faq, LatestPosts
    <topic>/              optional: blog/, product/
    ui/                   Button, Card, Icon, ExternalLink
  features/<name>/        optional: UI + client state + tests (cart/, search/)
  content/<collection>/   Markdown, MDX, JSON, YAML entries
  data/                   typed settings: site.ts, navigation.ts
  lib/                    plain TypeScript: queries, formatting, URLs
  styles/                 tokens.css, global.css, prose.css
  assets/                 images and icons that Astro processes
  content.config.ts
public/                   files copied unchanged (robots.txt, favicon)
```

### Import direction

| From | May import |
| --- | --- |
| `pages` | anything below |
| `layouts` | `layouts`, `components/layout`, `ui`, `data`, `lib`, `styles` |
| `components/layout` | `features`, `ui`, `data`, `lib` |
| `components/sections` | `features`, `<topic>`, `ui`, `data`, `lib` |
| `features/x` | its own folder, `<topic>`, `ui`, `data`, `lib` (never another feature) |
| `components/<topic>` | same topic, `ui`, `data`, `lib` |
| `components/ui` | `ui`, `lib`, `assets` |
| `lib`, `data` | each other; never a `.astro` file or a page |

- Nothing imports from `pages/`. If two files need the same logic, move it to `lib/`. [Astro docs](https://github.com/withastro/docs/blob/87c37b1566/src/util/getOgImageUrl.ts) and [Biome](https://github.com/biomejs/website/blob/1f77ed1fc1/src/utils/getOgImageUrl.ts) both break this.
- Exception: MDX in `content/` may import components.
- One-way flow and no feature-to-feature imports come from [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md); "import only from layers below" also from [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview).
- Check for the first rule (no output is a pass): `grep -rnE "from ['\"](@/|~/|(\.\./)+|\./)pages/" src/components src/layouts src/lib src/data src/features` (skips folders you lack with a harmless warning; a pattern for static imports only).

### Page files

A page does only this: define the route (`getStaticPaths`), load route data, pick a layout, pass title/description/structured data, and list sections in order. No client scripts, no reusable markup, at most page-level spacing CSS. Aim for under about 80 lines (my threshold). [astro.build's homepage](https://github.com/withastro/astro.build/blob/5ba3fc8d87/src/pages/index.astro) is the model: one layout and a list of named sections.

Exception: a one-off text page (privacy, about) may hold its own prose. Astro says [not to create a collection](https://docs.astro.build/en/guides/content-collections/#when-not-to-create-a-collection) for a few distinct pages.

### Layouts

- `BaseLayout.astro` is the only file with `<html>`. It owns `<head>`, global CSS, header, footer and a `<slot />`.
- Add a second layout only when a *kind* of page shares a frame (article, docs). It [wraps BaseLayout](https://docs.astro.build/en/basics/layouts/#nesting-layouts).
- Import the layout before other imports in a page, so global CSS has [lowest precedence](https://docs.astro.build/en/guides/styling/#cascading-order).

### When something becomes a thing

| Create | When |
| --- | --- |
| Section | A full-width band you would move or delete as one unit. Make it even if used once; the name is the point. |
| Shared component | The third real use ([rule of three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))), or earlier if it holds behaviour or accessibility logic that must stay identical. Two similar copies are fine: [wrong abstractions cost more than duplication](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction), and see [AHA](https://kentcdodds.com/blog/aha-programming). |
| Own folder | Three or more files that change together (component, script, subparts, test). [Colocate them](https://kentcdodds.com/blog/colocation). No `index.ts` barrel files ([why](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)). |
| `<topic>/` folder | Three or more components know about the same content type. |
| `features/<name>/` | It has client state or business logic as well as UI. |
| Section subfolders by page | `sections/` passes about 8 files or two names collide. |

Keep sections in `components/sections/`, so `pages/` stays a clean route map. Astro also supports [`_`-prefixed colocation](https://docs.astro.build/en/guides/routing/#excluding-pages) (`pages/blog/_components/`), used by [astro.build](https://github.com/withastro/astro.build/tree/5ba3fc8d87/src/pages/_components) and [AstroPaper](https://github.com/satnaing/astro-paper/tree/217c4e3362/src/pages/posts). It is a sound alternative; do not mix the two. The cost of the central folder: deleting a page does not delete its sections.

### Where data lives

| Kind | Place |
| --- | --- |
| Prose written repeatedly (posts, docs) | `content/<collection>/`, with a schema |
| Repeated same-shape records (links, FAQs, projects) | JSON/YAML collection in `content/`, with a schema ([when to](https://docs.astro.build/en/guides/content-collections/#when-to-create-a-collection)) |
| Site name, URLs, navigation, social profiles | `data/*.ts` |
| Copy used by one section | in that section's markup |
| Multilingual copy | typed tables, one per locale, as in [ScrewFast](https://github.com/mearashadowfax/ScrewFast/blob/b17aca41b1/CONTEXT.md) |

Pages load data that depends on the URL. A section that always shows the same data may load it itself. `ui` components take props and slots only.

### Names, styles, islands

- `PascalCase.astro` / `.tsx` for components, `Layout` suffix for layouts, `camelCase.ts` for modules, `kebab-case` for folders and routes. Name sections by content, never `Features2`. One alias, `@/*` to `src/*` ([how](https://docs.astro.build/en/guides/imports/#aliases)); `./` for siblings.
- CSS custom properties in `tokens.css`; global CSS imported once by BaseLayout; everything else [scoped](https://docs.astro.build/en/guides/styling/#scoped-styles). To let a parent style a child, [pass `class` and `...rest`](https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component). With Tailwind, tokens go in the theme and the layering is unchanged.
- Default to `.astro` and a small `<script>`. Add a framework component only for real interactivity, keep it beside its owner, and set `client:*` where it is used ([islands](https://docs.astro.build/en/concepts/islands/)). [Server islands](https://docs.astro.build/en/guides/server-islands/) need an adapter.
- Local images go in `src/` so Astro can [optimize them](https://docs.astro.build/en/guides/images/#where-to-store-images).

### What changes per site type

The tree, import table and page rules stay the same.

| Site type | Add | Usually skip |
| --- | --- | --- |
| Landing page / link hub | one `links` collection | `features/`, topic folders, extra layouts |
| Blog / content | `content/blog`, `ArticleLayout`, `components/blog`, route-per-collection | `features/` unless search has state |
| Docs | [Starlight](https://starlight.astro.build/guides/project-structure/): `content/docs`; overrides in `components/starlight/`; do not rebuild its layouts | most of `layouts/`, `sections/` |
| Marketing | more sections, FAQ/pricing collections; copy tables if multilingual | a section "framework" with dozens of props |
| Small shop | `features/cart`, `features/product`, `lib/` API client with a mock, `actions/` | - |
| Portfolio | `content/projects` | hard-coded project cards in pages |

## Comparison

Stars and last commit were read from the GitHub API on 2026-11-24. "Astro" is the major version in `package.json`. "Home" is approximate lines.

| Repository (commit) | License | Stars / last commit | Astro | Home | Structure in brief |
| --- | --- | --- | --- | --- | --- |
| [withastro/docs](https://github.com/withastro/docs/tree/87c37b1566/src) | MIT | 1.7k / 2026-11-24 | 7 | redirect | Starlight; 27 flat components plus topic folders |
| [withastro/starlight](https://github.com/withastro/starlight/tree/80f3055178) | MIT | 9.6k / 2026-11-24 | 7 | [~167 MDX](https://github.com/withastro/starlight/blob/80f3055178/docs/src/content/docs/index.mdx) | package split by public and internal parts |
| [withastro/astro.build](https://github.com/withastro/astro.build/tree/5ba3fc8d87/src) | none found | 511 / 2026-11-24 | 7 | ~29 | route-private `_components` plus 41 flat shared |
| [withastro/storefront](https://github.com/withastro/storefront/tree/ae5d3c383e/src) | MIT | 831 / 2024-10-21 | 4 | ~21 | `features/` + `components/ui` + `lib` |
| [satnaing/astro-paper](https://github.com/satnaing/astro-paper/tree/217c4e3362/src) | MIT | 5.2k / 2026-11-21 | 7 | ~139 | flat components, route-private `_components` |
| [arthelokyo/astrowind](https://github.com/arthelokyo/astrowind/tree/14e1a691f8/src) | MIT | 6.2k / 2026-09-12 | 7 | ~560 | `ui` / `widgets` / `common` / `blog` |
| [mearashadowfax/ScrewFast](https://github.com/mearashadowfax/ScrewFast/tree/b17aca41b1/src) | MIT | 1.4k / [2026-11-22](https://github.com/mearashadowfax/ScrewFast/commit/b17aca41b1) | 7 | ~6 + ~120 view | `pages` > `views` > `sections` > `ui` |
| [manuelernestog/astrofy](https://github.com/manuelernestog/astrofy/tree/9398dea0f2/src) | MIT | 1.5k / 2024-01-08 | 4 | ~79 | flat; content typed into pages |
| Also: [cactus](https://github.com/chrismwilliams/astro-theme-cactus/tree/a6f7485cf8/src) | MIT | 1.8k / 2026-11-01 | 7 | ~85 | small topic folders |
| Also: [biomejs/website](https://github.com/biomejs/website/tree/1f77ed1fc1/src) | MIT | 98 / 2026-11-24 | 7 | MDX | Starlight plus a separate `playground/` |

## Notes per site

**Astro docs.** Copy: Starlight overrides isolated in [`components/starlight/`](https://github.com/withastro/docs/tree/87c37b1566/src/components/starlight); navigation and UI strings per locale under [`content/`](https://github.com/withastro/docs/tree/87c37b1566/src/content). Skip: [mixed folder casing](https://github.com/withastro/docs/tree/87c37b1566/src/components) (`Landing`, `NavGrid`, `tabs`, `tutorial`) and the util-imports-page case above. Has [CONTRIBUTING.md](https://github.com/withastro/docs/blob/87c37b1566/CONTRIBUTING.md).

**Starlight.** A library, so copy the idea, not the tree: public [`user-components/`](https://github.com/withastro/starlight/tree/80f3055178/packages/starlight/src/user-components), internal `components/`, separate `routes/` and `schemas/`, and explicit [package exports](https://github.com/withastro/starlight/blob/80f3055178/packages/starlight/package.json). CSS uses [ordered cascade layers](https://github.com/withastro/starlight/blob/80f3055178/packages/starlight/src/style/layers.css). Its own [docs site components](https://github.com/withastro/starlight/tree/80f3055178/docs/src/components) are kebab-case, unlike the package. [CONTRIBUTING.md](https://github.com/withastro/starlight/blob/80f3055178/CONTRIBUTING.md) explains the code.

**astro.build.** Copy: short pages, landing sections named by content in [`_components/landing-page/`](https://github.com/withastro/astro.build/tree/5ba3fc8d87/src/pages/_components/landing-page), collections with [one config](https://github.com/withastro/astro.build/blob/5ba3fc8d87/src/content.config.ts). Skip: the large flat [`components/`](https://github.com/withastro/astro.build/tree/5ba3fc8d87/src/components) and data split between `content/` and `data/`. No license file was found, so read it but do not copy its code.

**Storefront.** Copy: the clearest shop shape, [documented in the README](https://github.com/withastro/storefront/blob/ae5d3c383e/README.md): `features/{cart,collection,product}`, `components/ui`, `actions`, and a mock API client. Skip: it is on Astro 4 and quiet since 2024. Its features import each other ([cart to product](https://github.com/withastro/storefront/blob/ae5d3c383e/src/features/cart/CartItem.tsx), [product to cart](https://github.com/withastro/storefront/blob/ae5d3c383e/src/features/product/ProductPrice.tsx)), so the rule needs enforcing even in good code.

**AstroPaper.** Copy: [route-private components](https://github.com/satnaing/astro-paper/tree/217c4e3362/src/pages/posts), pure helpers in `utils/`, and a [`custom/`](https://github.com/satnaing/astro-paper/blob/217c4e3362/.github/CONTRIBUTING.md) folder the theme promises not to change, a good pattern for any reused template. Skip: the [post page](https://github.com/satnaing/astro-paper/blob/217c4e3362/src/pages/posts/%5B...slug%5D/index.astro) is ~661 lines, of which about 475 are one inline script.

**AstroWind.** Copy: three clear tiers ([`ui` primitives, `widgets` page sections, `common`](https://github.com/arthelokyo/astrowind/blob/14e1a691f8/AGENTS.md)) and a [recipe for adding a section](https://github.com/arthelokyo/astrowind/blob/14e1a691f8/.agents/skills/add-component.md). Skip: the [homepage](https://github.com/arthelokyo/astrowind/blob/14e1a691f8/src/pages/index.astro) is ~560 lines because copy is passed as props, and numbered names such as `Features2`. That suits a configurable template more than one site.

**ScrewFast.** Copy: a [glossary](https://github.com/mearashadowfax/ScrewFast/blob/b17aca41b1/CONTEXT.md), an [AI guide](https://github.com/mearashadowfax/ScrewFast/blob/b17aca41b1/AI_GUIDE.md), and for two languages, [one-line routes](https://github.com/mearashadowfax/ScrewFast/blob/b17aca41b1/src/pages/fr/index.astro) rendering a shared [view](https://github.com/mearashadowfax/ScrewFast/blob/b17aca41b1/src/views/HomeView.astro). Skip the `views/` layer on single-language sites. Also skip deep `ui/` subfolders, `navbar&footer`, many aliases and `data_files`.

**Astrofy (instructive).** Most components sit in [one folder](https://github.com/manuelernestog/astrofy/tree/9398dea0f2/src/components), and the [homepage](https://github.com/manuelernestog/astrofy/blob/9398dea0f2/src/pages/index.astro) hard-codes the intro and project cards even though collections exist for blog and store. Easy to start, but every content edit is a markup edit.

**Cactus and Biome.** Cactus keeps entries in a [root `content/` folder](https://github.com/chrismwilliams/astro-theme-cactus/blob/a6f7485cf8/src/content.config.ts), and its `src/data/` holds [query code](https://github.com/chrismwilliams/astro-theme-cactus/blob/a6f7485cf8/src/data/post.ts), while AstroWind's [`data/`](https://github.com/arthelokyo/astrowind/tree/14e1a691f8/src/data/post) holds posts. Biome isolates its app-like [`playground/`](https://github.com/biomejs/website/tree/1f77ed1fc1/src/playground) and puts machine output in [`components/generated/`](https://github.com/biomejs/website/tree/1f77ed1fc1/src/components/generated) (one file is ~5,800 lines). Both are worth copying: a feature folder, and generated files kept apart.

## Framework-independent conventions

| Convention | What the source says | Drawback for a small static site | Verdict |
| --- | --- | --- | --- |
| [Atomic design](https://atomicdesign.bradfrost.com/chapter-2/) | atoms, molecules, organisms, templates, pages; "a mental model", not a linear process | atom/molecule boundaries invite debate (my view) | use the hierarchy, not the names |
| [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview) | layers, slices, segments; meant for applications; switch only if the current structure causes trouble | many folders for few files | borrow the import rule |
| [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) | feature folders, one-way imports, no barrels | written for React apps | features only where there is logic |
| [Layering vs domain folders](https://martinfowler.com/bliki/PresentationDomainDataLayering.html) | technical layers at the top are fine while small; split by domain as they grow | - | supports starting by kind, adding topics later |
| [Colocation](https://kentcdodds.com/blog/colocation) | place code close to where it is relevant | shared code can hide in one route | folder per multi-file component |
| [Rule of three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)) / [AHA](https://kentcdodds.com/blog/aha-programming) | delay abstraction | copies can drift | apply to components, not sections |
| [Design tokens](https://www.designtokens.org/TR/2025.10/format/) | a JSON interchange format (Community Group final report, 2025.10) | JSON needs a conversion step | CSS custom properties until tools must share tokens |

## Checklist: refactor without changing how a site looks

Why care is needed:

- Moving markup to a child drops the parent's [scoped styles](https://docs.astro.build/en/guides/styling/#scoped-styles) from it.
- Astro 7 defaults to [JSX-style whitespace removal](https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-whitespace-handling-compresshtml-jsx): re-wrapping inline elements can delete a visible space. Add `{" "}`.
- Moving a file changes its `data-astro-cid-*` value. In a local test with `@astrojs/compiler-rs` 0.5.3, the scope hash changed with the path and stayed the same after content edits.
- CSS [order follows imports](https://docs.astro.build/en/guides/styling/#cascading-order), and an imported component brings its imported CSS even if unused.
- [Processed scripts](https://docs.astro.build/en/guides/client-side-scripts/#script-processing) are bundled and deduplicated; `is:inline` ones are repeated per use.

Steps:

- [ ] Start from a clean commit. Record Node and package manager versions. Run checks and a production build.
- [ ] Copy `dist/` outside the repo as the baseline. Build twice and compare, to learn what differs by itself (dates, generated images).
- [ ] Take baseline screenshots of every page type from the production preview: phone, tablet and desktop widths; light and dark; menus and dialogs open; keyboard focus; hover. Use [`toHaveScreenshot`](https://playwright.dev/docs/test-snapshots) or equivalent, on the same machine and browser for both runs.
- [ ] Change in small commits: move files first, then split, then rename. Do not change styling or copy in the same commit.
- [ ] After each step, compare the list of files in `dist/` (same routes and public files).
- [ ] Compare normalized HTML. Save the script outside the repo, run it on both builds, then `git diff --no-index before-norm after-norm`:

```js
// node norm.mjs <dist> <new-output-dir>
import {cpSync,readdirSync,readFileSync,writeFileSync} from 'node:fs';
const [from,to]=process.argv.slice(2);
cpSync(from,to,{recursive:true});
for (const f of readdirSync(to,{recursive:true}).filter(f=>f.endsWith('.html'))) {
  writeFileSync(`${to}/${f}`, readFileSync(`${to}/${f}`,'utf8')
    .replace(/data-astro-cid-[a-z0-9]+/g,'data-astro-cid')
    .replace(/(\/_astro\/[^"' )]+?)\.[\w-]{8}(_\w+)?\.(\w+)/g,'$1.HASH.$3')
    .replace(/\buid="[^"]*"/g,'uid=""')
    .replace(/></g,'>\n<'));   // splits lines for readable diffs
}
```

- [ ] Explain every remaining difference. This hides *which* scope an element has and ignores CSS, so a clean HTML diff does not prove the page looks the same. Inline `<style>` and `<script>` differences need reading.
- [ ] Re-run screenshots. For any diff, compare computed styles of the element.
- [ ] Click through islands, menus, forms and theme switching with the console open. Re-run type check, lint, tests, link check and the import check.

## Sources and limits

- Astro: [project structure](https://docs.astro.build/en/basics/project-structure/), [components](https://docs.astro.build/en/basics/astro-components/), [layouts](https://docs.astro.build/en/basics/layouts/), [pages](https://docs.astro.build/en/basics/astro-pages/), [routing](https://docs.astro.build/en/guides/routing/), [content collections](https://docs.astro.build/en/guides/content-collections/), [styling](https://docs.astro.build/en/guides/styling/), [imports](https://docs.astro.build/en/guides/imports/), [islands](https://docs.astro.build/en/concepts/islands/), [Starlight structure](https://starlight.astro.build/guides/project-structure/).
- Repository and convention sources are linked where used.

Not verified or limited:

- No repository was installed, built or viewed. Findings come from file trees and selected files, not a review of every file.
- "Well-regarded" rests on official ownership or stars. I did not confirm which commit each live site currently serves.
- I found no maintained link-hub example to examine; the landing/link-hub advice is inferred from the others.
- Import observations come from a pattern search of static imports and can miss cases.
- Thresholds (80-line pages, 8 sections, 3 files per folder), the folder tree, the import table and the per-type table are my recommendations.
- The normalizer was tested only on a small synthetic sample. Check its patterns against real build output. The import check pattern was run on cloned repositories and found the two upward imports above (their folders are named `util` and `utils`, so add those if a site uses them).
- Atomic design drawbacks are my assessment, not a quoted source. The rule of three is cited through Wikipedia, not Fowler's book.
