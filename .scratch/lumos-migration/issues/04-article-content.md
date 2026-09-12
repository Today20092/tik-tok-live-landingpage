# 04: Migrate article discovery and reading content

**What to build:** Readers can open an article from the article list and read its headings, links, images, and quotations with consistent typography and spacing.

**Blocked by:** 2.

**Status:** resolved

## Verification

Article pages use Lumos Section/Heading, and article lists use the same Heading primitive. Quran and hadith now share Arabic typography. Build, quotation text/direction/attribution checks, article extras, and shared-navigation checks pass. No quotation data changed. Mobile typography is included in final browser verification.

- [x] Preserve article ordering, routes, draft exclusion, related articles, heading anchors, and search-index annotations.
- [x] Use shared list/card variants and a single article typography treatment, including supported rich content.
- [x] Preserve checked Quran and hadith text, attribution, source links, validation behavior, Arabic language/direction, and quotation semantics.
- [x] Verify a long article and representative quotation content in both themes, on mobile, and with enlarged text.
- [x] Existing Quran/hadith checks and relevant article checks pass, along with check, lint, and build.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
