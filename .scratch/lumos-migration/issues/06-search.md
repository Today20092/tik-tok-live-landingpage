# 06: Migrate the complete search experience

**What to build:** Visitors can submit a query, filter results, and open a result through a search interface that matches the rest of the site.

**Blocked by:** 2.

**Status:** resolved

- [x] Retain Pagefind generation, resource/article indexing, draft exclusions, and working result destinations.
- [x] Style the search input, filters, results, loading, empty, and error states with shared tokens and controls.
- [x] Verify keyboard navigation, narrow widths, and both themes against the built search index.
- [x] Existing search checks and check, lint, and build pass.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
