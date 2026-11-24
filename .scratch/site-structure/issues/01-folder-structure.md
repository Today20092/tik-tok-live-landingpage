# 01 Folder structure

Status: resolved
Blocked by: none

## Change

Move files only (plus import, script and doc path updates). Use `git mv`.

| Folder under `src/components/` | Contents |
| --- | --- |
| `layout/` | SiteHeader, SiteFooter, ThemeControl, SharePage, LinkPreviews |
| `sections/` | ReadingResources, PrintItem (ticket 02 adds the homepage sections) |
| `article/` | ArticleContents, ArticleExtras, ArticleLink, ArticleList, ArticleMarginNotes, ArticleReadingTools, ArticleVideo, Reflection, AmazonBookCard, IncomeWellbeingCharts |
| `quotes/` | QuranVerse, HadithQuote, QuoteStylePreview |
| `ui/` | existing primitives, plus SupportCard, LearningVideos, ArticleImageViewer, SearchInput (used in more than one kind of place, or generic) |
| `lumos/`, `start/` | unchanged |

If the real import graph shows a better home for a file, use it and record why.

## Acceptance

- [x] No stale path remains in `src/`, `scripts/`, `AGENTS.md`, `CLAUDE.md`, `README.md` or the docs that authors follow (`writing-articles`, `quran-in-articles`, `hadith-in-articles`, `lumos-design-system`, `site-search`). Dated research notes stay as written.
- [x] `pnpm check`, `pnpm lint`, `pnpm build` pass.
- [x] Scripts that read component source paths still pass.

## Comments

Resolved 2026-11-24.

- Moves follow the table. One extra move: `PamphletFigure.astro` went to `start/` (not listed; `StartContent.mdx` is its only importer). `PocketHub`, `BookShelf` and `Recommendation` stay put until ticket 02 deletes them.
- `pnpm check` (0 errors, 0 warnings, 1 hint), `pnpm lint` and `pnpm build` exit 0.
- Against the baseline build: 165 files before and after (one shared Vite chunk is now named `utils` instead of `jsx-runtime`), 0 of the normalized HTML pages changed, no CSS rule changed.
- `check-income-bundle` and `check-sharing` pass. `check-article-reading` fails with `SyntaxError: Unexpected token '!'` on the new tree and on the baseline commit c65161f alike (it evaluates TypeScript as JavaScript).
- A grep for flat `components/<Name>` paths in `src/`, `scripts/` and the listed docs leaves only the files ticket 02 deletes. `README.md` listed components that no longer exist; that line now names the folders.
