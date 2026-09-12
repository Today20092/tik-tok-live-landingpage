# Lumos migration experiment

The migration is isolated on `experiment/lumos-migration`. The comparison baseline is `master` at `0f0d75daed117c00492bd129c77da07e7d071233`. Nothing has been merged or published.

## Compare locally

- [Lumos experiment](http://127.0.0.1:4321/): production build, including working search.
- [Master baseline](http://127.0.0.1:4323/): separate worktree and production build.
- [Shared design reference](http://127.0.0.1:4322/lumos-preview/): development-only components, themed examples, and image viewer.

Compare the homepage, `/articles/80000-hours/`, `/search/?q=Islam`, `/journal/`, and `/focus/` on the two production previews. The experimental header includes a theme toggle. Local preview servers must remain running.

## What changed

Lumos for Astro 0.0.3 is pinned to upstream commit `1a8e1777ff072a3faeaebddcadb6ff80c6951c38`. Its foundation, utilities, Section, Heading, and slot helper are vendored with the MIT license. Tailwind's compiler, Vite integration, class-merging dependency, formatting plugin, and obsolete shadcn generator configuration are removed. Existing React/Radix interactions, TanStack charts, Pagefind, content collections, and static hosting remain.

Shared tokens now control the site's colors, fonts, spacing, reading widths, corners, and controls. Cards and controls have reusable native CSS patterns. Article pages and discovery use Lumos primitives; existing layouts use named component styles. The old utility groups were converted to native declarations, then unused rules and compiler scaffolding were removed. The derived styles retain Tailwind's MIT attribution.

`AGENTS.md` and `CLAUDE.md` point to [one design convention](lumos-design-system.md). Future agents should reuse shared patterns and run the consistency check instead of inventing a page-specific treatment.

## Visible differences

- The compact hub, destinations, copy, photos, and reading flow remain. Shared cards have consistent corners and spacing; titles and controls may wrap differently from master.
- Sharing and article controls use the same control variants. The not-found page now uses the shared shell.
- Theme selection persists across navigation. Journal and the other alternate layouts follow the selected palette; Focus deliberately retains light text over its dark hero image. Ko-fi preview samples retain their brand colors.
- Navigation wraps when text is enlarged, fixing an overflow found during the 200% text check. Arabic quotation typography remains Amiri Quran with its own size and line-height treatment.

## Verification

`pnpm check`, `pnpm lint`, and `pnpm build` pass. Astro reports one existing Zod deprecation hint, with no errors or warnings. The production output contains 11 pages and Pagefind indexes the same four published pages and 1,277 words as the baseline. Draft articles, the podcast preview, and the Lumos reference are excluded from the normal production build.

The existing checks cover article reading progress, expanding content, reduced motion, related articles, sharing success/cancellation/fallback, chart data and bundle limits, Quran/hadith text and attribution, resource eligibility and destinations, navigation, search indexing, metadata, favicons, and the table of contents. Stale search-count and contents assertions were updated for the existing fourth indexed page and the distinction between article headings and the surrounding related-article footer.

`scripts/check-lumos.mjs` checks nine built routes at 320, 390, and 1,280 pixels in both themes. It compares actual shared-shell styles, checks overflow and control targets, and deliberately injects a page-local font override to prove drift is detected. It also exercises theme persistence, skip navigation, keyboard image zoom, Escape and focus return, article contents, back-to-top, 200% text, Arabic direction/font, and propagation of one corner token to both themed reference cards.

`scripts/check-search-ui.mjs` checks query restoration, typing, clear/focus, filters, empty results, and dropdown bounds at 320, 390, 640, and 1,280 pixels in both themes. Neither browser check adds a test framework to the project: set `PLAYWRIGHT_MODULE` to an existing Playwright installation if it is not locally resolvable.

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:4321'
$env:TEST_DEV_URL = 'http://127.0.0.1:4322'
node scripts/check-lumos.mjs
node scripts/check-search-ui.mjs
node scripts/check-toc.mjs $env:TEST_DEV_URL
```

Comparison screenshots are stored locally under `.scratch/lumos-migration/evidence/` and excluded from Git. They cover the baseline home/article/search and the migrated home, articles, search, alternate layouts, and Ko-fi preview at mobile/desktop widths in both themes.

## Benefit and cost

The useful change is a shared, explicit design vocabulary plus a check that catches page drift. Lumos itself cannot prevent an agent from bypassing those conventions. This experiment establishes that vocabulary while keeping the existing site architecture.

| Built site CSS | Master | Experiment |
| --- | ---: | ---: |
| Minified bytes | 120,667 | 138,714 |
| Gzip bytes | 19,983 | 21,358 |

These are the emitted `_astro/*.css` assets, excluding fonts, images, and Pagefind's separately shipped stylesheet. Gzip CSS increases by 1,375 bytes (about 6.9%). No loading-speed improvement is claimed. The interactive chart island is 153,470 minified bytes / 52,277 gzip bytes, excluding React.

The tradeoff is maintaining vendored beta framework files and native component CSS. Upstream updates need review rather than automatic acceptance. The current Chromium checks and visual review are not a full browser or accessibility certification. Try a few normal edits with different agents before deciding whether this convention improves consistency enough to merge.

The eight implementation tickets are in [the local ticket directory](../.scratch/lumos-migration/issues/). Unrelated local article drafts are preserved.
