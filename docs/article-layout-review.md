# Article spacing review

Reviewed all six article routes, including drafts, on September 12, 2026.

Global Lumos text trimming compressed the article title, description, byline,
paragraphs, and quotation text. Article pages now use full line boxes. The
header uses a consistent one-rem gap, and footer headings no longer inherit
large top margins. Tables allow text to wrap at narrow widths and enlarged
text sizes.

The review covered the title area, contents disclosure, paragraphs, section
headings and link icons, lists, images, captions, Quran and hadith blocks,
resources, and related articles. Quotation wording and attribution are unchanged.

Subjective spacing score: 6/10 before, 9/10 after. A 10/10 would require reader
feedback on the rhythm of the longest articles; no remaining overlap or overflow
was found in the tested layouts.

Validation: `pnpm check`, `pnpm lint`, and `pnpm build` passed. The existing Zod
deprecation hint remains. `scripts/check-article-layout.mjs` checks all six
articles at 320, 390, 768, and 1280 pixels in both themes at 100% and 200% text.
The heading-icon check also passed. Screenshots in `.scratch/` record the title,
prose, quotation, and footer review.
