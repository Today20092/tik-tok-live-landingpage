# 02 Homepage sections and cleanup

Status: ready-for-agent
Blocked by: 01 Folder structure

## Change

- `src/pages/index.astro` reads as metadata plus an ordered list of sections. Add `sections/Welcome`, `Basics`, `LatestArticles`, `MoreLearning`, `PrintablesTeaser`; reuse `ReadingResources` and `SupportCard`. Remove `PocketHub` and its `welcome` switch.
- Add `ui/HubSection` (heading and content wrapper) where the homepage repeats that shape.
- Add `ui/ResourceCard` for the repeated resource-card markup. Use it where it fits with plain props and slots. Leave a use in place if fitting it would need special-case props, and record why.
- `HubPage` no longer falls back to homepage content.
- Delete the dev-only `books-preview` and `reading-preview` pages and what only they use: `BookShelf`, its assets, the unused reading layout variants and their CSS, `check-book-shelves.mjs`, and preview routes or links in other scripts and pages.
- Delete confirmed unused code: `Recommendation.tsx`, `ui/collapsible.tsx`, the `site` and `drawings` collections and their content. Remove a dependency only when nothing else imports it.
- Write `docs/site-structure.md`: this site's folder rules, import direction, when to extract, and any deviation from the research. Keep it under 60 lines and link it from `AGENTS.md`. Correct stale statements in `AGENTS.md` about what `index.astro` and `HubPage` own.

## Acceptance

- [ ] Nothing imports from `src/pages/`; layouts import no sections.
- [ ] Shared homepage styles have one source; none are silently lost to Astro style scoping.
- [ ] `pnpm check`, `pnpm lint`, `pnpm build`, `node scripts/check-mobile-hub.mjs` pass.
- [ ] Visual comparison against the baseline build: same screenshot list, zero differing pixels. HTML differences are each explained.
- [ ] Other `scripts/check-*.mjs` that cover touched code give the same result as on the baseline.

## Comments
