# Site structure

How this site applies the [Astro site structure research](astro-site-structure-research.md). The hierarchy is page → layout → section → component.

## Folders

| Path | Holds |
| --- | --- |
| `src/pages/` | Routes: metadata, route data, layout and section order |
| `src/layouts/` | `HubPage`: `<html>`, head, structured data, header, share block, footer |
| `src/components/layout/` | Parts of the page frame: header, footer, theme control, sharing, link previews |
| `src/components/sections/` | Page bands. `HubSection` is the homepage band wrapper and relies on `home.css`; `PrintItem` is one printable inside the printables page |
| `src/components/article/` | Article-only components |
| `src/components/quotes/` | Quran and hadith quotations and their preview |
| `src/components/ui/` | Generic components, and components used by more than one kind of place |
| `src/components/lumos/` | Pinned Lumos primitives; treat them as `ui` |
| `src/components/start/` | Content and figures for `/start` |
| `src/content/`, `src/data/`, `src/lib/` | Collection entries, quotation data, plain TypeScript |
| `src/styles/` | Global CSS. `home.css` holds styles shared by homepage sections |

## Import direction

| From | May import |
| --- | --- |
| `pages` | anything below |
| `layouts` | `layout`, `ui`, `lumos`, `lib`, `styles` (never `sections`) |
| `layout` | `ui`, `lumos`, `data`, `lib`, `assets` |
| `sections` | own folder, `article`, `quotes`, `ui`, `lumos`, `data`, `lib`, `assets` |
| `article`, `quotes`, `start` | own folder, `ui`, `lumos`, `data`, `lib`, `assets` |
| `ui`, `lumos` | each other, `lib`, `assets` |
| `lib` | `data`; never a component or page |

Nothing imports from `pages/`. MDX in `content/` may import components. Use `@/` across folders in new code (a few older files still use `../`) and `./` for siblings.

In a page, import the layout before any styled component, so `global.css` declares the cascade layer order first.

## When to extract

- A section is a band you would move or delete as one unit. Create it even for one use.
- Share a component on the third real use, or sooner when behavior or accessibility must stay identical.
- Keep markup in place if a shared component would need props for that one case.
- Section styles stay scoped in the section. A style that several sections share goes in one global file such as `home.css`; scoped styles do not reach a child component's markup.
- Create a folder only when it has something to hold. No `index.ts` barrels.

## Current deviations from the research

- One layout and no `BaseLayout` or `SeoHead`; the development-only `lumos-preview` page writes its own `<html>`.
- No `features/`. Site settings and social links stay in the components that use them.
- `ui/SupportCard` reads the `links` collection itself, so its callers pass no data.
- `quotes/QuoteStylePreview` imports `layout/ThemeControl` for the preview page.
- `404`, `printables`, `search`, `start`, `kofi-preview`, `podcast-preview` and the article routes exceed 80 lines or hold their own styles and scripts. Split one when you next change it substantially.
- `src/lib/` uses `kebab-case` file names.
- `ui/ResourceCard` covers link cards. The "Other Quran editions" summary in `ReadingResources` and the CSS examples on `lumos-preview` keep their own markup.
- The homepage "Articles" band writes its own wrapper: its heading shares a row with a link, so `HubSection` does not fit.
