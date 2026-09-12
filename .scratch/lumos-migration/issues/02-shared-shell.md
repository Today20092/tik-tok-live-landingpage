# 02: Use one shared page shell across the site

**What to build:** Visitors see the same header, footer, navigation, content boundaries, and theme controls while moving between the hub, articles, search, and not-found page.

**Blocked by:** 1.

**Status:** resolved

## Verification

Shared header, footer, skip link, and sharing styles migrated. Added a shared native theme control and early theme restoration. Check, lint, build, shared-navigation checks, and all sharing success/failure paths pass. The not-found page now consumes the same shell; final route coverage rechecks it after integration.

- [x] Migrate the shared shell and its controls using the approved foundation; page bodies can remain on the temporary old styling boundary.
- [x] Theme persistence, initial theme rendering, keyboard navigation, skip navigation, and mobile navigation keep working.
- [x] Preserve each route's canonical metadata, structured data, social metadata, and indexing rules.
- [x] Demonstrate consistent shell states on the hub, an article, search, and the not-found page in both themes.
- [x] Relevant existing checks and check, lint, and build pass.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
