# 02 Homepage sections and cleanup

Status: resolved
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

- [x] Nothing imports from `src/pages/`; layouts import no sections.
- [x] Shared homepage styles have one source; none are silently lost to Astro style scoping.
- [x] `pnpm check`, `pnpm lint`, `pnpm build`, `node scripts/check-mobile-hub.mjs` pass.
- [x] Visual comparison against the baseline build: same screenshot list, zero differing pixels. HTML differences are each explained.
- [x] Other `scripts/check-*.mjs` that cover touched code give the same result as on the baseline.

## Comments

Resolved 2026-11-24. Baseline is the production build of c65161f.

Changes

- `index.astro` is metadata plus the section list. The `.pocket-hub` wrapper, `#read` and `#support` divs stay there. Shared styles are in `src/styles/home.css`; section-only styles are scoped in their section.
- `ResourceCard` renders the Basics card, two ReadingResources cards, `ArticleLink` and `AmazonBookCard`. Left in place: the "Other Quran editions" `summary` (not a link) and the `lumos-preview` CSS examples (arrow outside the content span).
- `HubSection` renders Basics, More learning and Printables. Articles keeps its own wrapper (heading row with a link, extra id and Pagefind attribute). `#read` is a plain div.
- Deleted the two preview routes, `BookShelf`, six images only it used, `books-preview/README.md`, `check-book-shelves.mjs`, the `minimal` reading layout and the `layout` prop (the `reading-resources--split` class stays), `Recommendation.tsx` and its three CSS rules, `ui/collapsible.tsx`, and the `site` and `drawings` collections. No dependency removed: `radix-ui` is still used by `ui/button.tsx`. Public files are untouched.
- Dead PocketHub rules not carried over (no matching element): `.pocket-hub_copies`, `.pocket-hub_nav`, `.live-help > h2`. The two `margin-block: 0` overrides on `.live-help` are folded into its base rule.
- Removed the dead preview link and the sentence about layout variants from `lumos-preview`; removed preview routes from `check-live-books.mjs`.
- Kept: `clear-quran-generated.png` and `quran-project-generated.png` (already unused before, not `BookShelf`'s), and the unused `support` slot in `ReadingResources`.

Evidence

- `pnpm check` (0 errors, 0 warnings, 1 hint), `pnpm lint`, `pnpm build` and `check-mobile-hub` exit 0.
- No import from `pages/`; no `sections/` import in `layouts/`.
- `visual.mjs compare base-a after`: 228 screenshots, 0 differ (`base-a` vs `base-b`: 0 differ, so no noise). Exit 1 because all 19 HTML files differ:
  - All pages: `HubPage` no longer imports homepage CSS, so the `HubPage.css` link is gone, the remaining layout CSS is inlined, and ReadingResources styles ship only where used.
  - Homepage only: elements now rendered by `index.astro` or a child component lose `data-astro-cid`; shared selectors are the `home.css` ones; three card anchors write `href` before `class`; the apostrophe in "why Islam isn't" is written `&#39;`.
- 19 routes before and after; 165 files become 158 (six deleted images, one CSS file). Public files unchanged. Pagefind fragments: 14 pages, identical.
- Computed styles of every body element on `/`, `/articles/about-me/`, `/articles/preparing-for-marriage/`, `/printables/` and `/404.html` at 320 light, 390 dark 200% and 1280 dark, at rest and with details and popovers open and hover, focus and active forced: 10,098 comparisons, 0 differ.
- Check scripts, same output on baseline and new code. Pass: article-extras, article-headings, article-spacing, audit, favicons, income-bundle, income-charts, link-previews, marriage-preview, mobile-hub, palettes, postcard-flip, quran, search, sharing, site-layout; on the dev server also article-layout, article-links, hadith. Fail on both: article-reading, article-reader (preview server), hub-ux, learning-videos, live-books, lumos, phone-opening, search-ui, sink-links, toc, unified-site; article-layout, article-links and hadith on the preview server. Those that stop early leave their later assertions unrun.
- Differences seen, dev server only: on the baseline the homepage header sits at x=0 while other pages sit at x=20 (390px), which fails `article-reader`'s header check. The new code is x=20 everywhere, as production already was; `index.astro` now imports the layout first. On the new code `article-reader` gets past that check and stops where the dev toolbar covers a button; the baseline never reaches that step. `search-ui` got one step further in one run on the new code and failed identically in two reruns.
