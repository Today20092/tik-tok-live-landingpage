# Quran passages in articles

Use `.mdx` for articles with reusable components. Plain `.md` articles still work. The existing frontmatter and public URLs stay the same.

Import the verse component below the frontmatter, then insert it wherever the passage belongs:

```mdx
import QuranVerse from '@/components/QuranVerse.astro';

<QuranVerse verse="61:2" />
```

The component uses checked text from `src/data/quran-verses.json`. It renders Arabic with `lang="ar"`, `dir="rtl"`, and the self-hosted Amiri Quran font. The English translation and reference stay left-to-right. It generates a link to the exact verse on Quran.com and prints the translator's name.

Amiri Quran is the selected font for all passages. Quotations render as static HTML with no comparison controls, browser JavaScript, or runtime API requests.

Before using another verse, add its exact Arabic text, translation, translator, and check date to that JSON file. Use a `surah:ayah` key, such as `61:2`. Verify the reference and both texts against Quran.com, retain the Arabic diacritics, and check the selected translator. Observe the translation's reuse terms. Do not compose or paraphrase text in the quotation fields. An unknown key fails the build instead of displaying an empty passage.

Use one component per ayah. For inline links in prose, use `https://quran.com/16/125` for one verse or `https://quran.com/61/2-3` for a range within a surah. Keep commentary outside the quotation.

The article's English layout stays left-to-right. shadcn's Direction provider is appropriate if we later add interactive controls in Arabic. It does not supply Quran text or a Quran font.

Run `pnpm check`, `pnpm lint`, `pnpm build`, and `pnpm test:quran`. Inspect a narrow mobile preview for Arabic shaping, diacritics, line spacing, and overflow before publishing new passages.

References: [Astro MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/), [shadcn Direction](https://ui.shadcn.com/docs/components/radix/direction), [Amiri Quran](https://fontsource.org/fonts/amiri-quran), [Quran 61:2](https://quran.com/61/2), [Quran 61:3](https://quran.com/61/3).
