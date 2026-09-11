# Hadith quotations in articles

Use the hadith component in an `.mdx` article:

```mdx
import HadithQuote from '@/components/HadithQuote.astro';

<HadithQuote hadith="muslim-55a" />
```

For an English-only quotation, add `showArabic={false}`. Preview both versions at `/articles/hadith-template/` with `pnpm dev`. This draft is excluded from the production build.

Store each checked quotation once in `src/data/hadith.json`. Use a stable key and record these fields:

| Field | Content |
| --- | --- |
| `reference` | Collection and exact reference, including suffixes such as `Sahih Muslim 55a`. |
| `url` | Direct HTTPS source link, normally a specific Sunnah.com narration. Preserve its actual URL rather than generating one from a display label. |
| `narrator` | Optional narrator as identified by the source. |
| `arabic` | Optional exact Arabic text with its diacritics. |
| `translation` | Exact English text from the cited source. |
| `translationSource` | Named translator when known, otherwise the provider, such as `Sunnah.com`. |
| `excerpt` | `true` when either quoted text omits part of the source narration; otherwise `false`. |
| `grade` | Optional object with `text`, `attributedTo`, and an HTTPS `url` for the grading source. Record the exact classification, such as Sahih, Hasan, or Daif, with an English explanation where helpful. Preserve combined or disputed gradings and their attribution. Do not infer a grade from a URL or title. |
| `checkedOn` | Date the text and reference were checked, in `YYYY-MM-DD` format. |

Keep the Arabic and English excerpts aligned. Preserve the wording, observe reuse terms, and place paraphrases or commentary outside the quotation. A story about a later scholar is not automatically a hadith of the Prophet ﷺ.

The quotation comes first. A footer contains one primary reference link and the visible authenticity status. Narrator, translation attribution, and the linked grading source sit inside a native "Source details" disclosure. Missing grading data displays "Authenticity not yet verified", which describes our verification status and does not classify the hadith as weak. The Muslim samples record their inclusion in Imam Muslim's Sahih collection, with a link to Sunnah.com's description of that collection. They do not claim Sunnah.com displays a separate grading on each narration page.

The longer English-only preview uses an independently prepared English rendering of the Arabic of Sahih Muslim 2699a, explicitly identified in the draft and its translation attribution. It is not presented as Sunnah.com's published English translation. Review this rendering before using it in a published article; prefer a named, checked translation with suitable reuse terms for publication.

The template uses static HTML, optional RTL Arabic in Amiri Quran, a separate English translation, a narrator line, and a source link. It labels excerpts and links readers to the full narration. No browser JavaScript or runtime request is needed.

Run `pnpm check`, `pnpm lint`, and `pnpm build`. With `pnpm dev` running, run `pnpm test:hadith` to check both preview variants. Inspect long Arabic passages on mobile before publishing.

The initial excerpt was checked against [Sahih Muslim 55a on Sunnah.com](https://sunnah.com/muslim:55a) on September 11, 2026.
