# Site search

Pagefind runs after Astro during `pnpm build`. Its index and browser components are served from `dist/pagefind/` on the existing static hosting. No search server, account, or API key is required.

Open `/search/` with `pnpm preview` after building. The search page supports word/phrase searches, excerpts, heading links, content-type filters, and shareable `?q=` URLs. `pnpm dev` shows a notice because it does not build or serve the published index.

Only content marked `data-pagefind-body` is indexed. Currently that means the canonical home hub and published article pages. Drafts, preview pages, alternate hub layouts, article listings, and search itself are excluded. Navigation, footers, and article teasers are omitted from indexed bodies. Published article changes enter search on the next build/deployment.

When real podcast pages are added, render their reviewed transcripts as static HTML, mark the published content with `data-pagefind-body` and `data-pagefind-filter="Type:Podcasts"`, and give chapter headings stable IDs. Pagefind links to heading matches; precise playback timestamps require the future player/transcript integration. Audio and external linked pages are not automatically transcribed or indexed.

Run `pnpm check`, `pnpm lint`, `pnpm build`, `pnpm test:search`, and `node scripts/check-mobile-hub.mjs`. The search check reads Pagefind's generated fragments to verify actual content and exclusions. After upgrading Pagefind, also verify a query, content-type filter, empty result, and result link in the browser.

References: [Pagefind component UI](https://pagefind.app/docs/search-ui/), [index scope](https://pagefind.app/docs/indexing/), [heading results](https://pagefind.app/docs/sub-results/).
