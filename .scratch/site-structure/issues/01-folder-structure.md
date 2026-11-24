# 01 Folder structure

Status: ready-for-agent
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

- [ ] No stale path remains in `src/`, `scripts/`, `AGENTS.md`, `CLAUDE.md`, `README.md` or the docs that authors follow (`writing-articles`, `quran-in-articles`, `hadith-in-articles`, `lumos-design-system`, `site-search`). Dated research notes stay as written.
- [ ] `pnpm check`, `pnpm lint`, `pnpm build` pass.
- [ ] Scripts that read component source paths still pass.

## Comments
