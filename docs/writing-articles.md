# Writing articles

Create a Markdown file in `src/content/articles/`. Its filename becomes the URL: `my-topic.md` becomes `/articles/my-topic/`. Nested folders are supported.

```yaml
---
title: Your article title
description: A short summary for the list and search results.
date: 2026-09-11
category: Understanding
draft: true
---
```

Write ordinary Markdown below the frontmatter. Start body headings at `##`; the page already renders the title as `h1`. Categories are free text, so you can use Articles, Understanding, Reading notes, or another label.

Run `pnpm dev` and open `/articles/my-topic/` to preview a draft. Draft pages have `noindex` metadata, are not listed publicly, and are excluded entirely from `pnpm build`. Omitted `draft` defaults to true. Set it to false to include the article in the production build, `/articles/`, and the newest-articles section on the main page. Publishing to hosting still requires your normal deployment workflow.

For an optional cover, put an image in `public/images/` and add:

```yaml
cover:
  src: images/my-topic.jpg
  alt: Describe the relevant image content.
```

Use paths relative to `public/`, with no leading slash. Keep images wide, ideally 16:9. For body images, use relative paths that resolve from the article URL, or full production URLs.

## Reusable article components and references

For a recommended YouTube video, import `ArticleVideo` from `@/components/ArticleVideo.astro` and use `<ArticleVideo videoId="2GxlL5-0m_g" title="Wealth Inequality in America (Updated 2026)" channel="politizane" />`. It reuses the site's thumbnail/play-button styling and links to YouTube without loading a player. Keep the recommendation in the author's prose and cite substantive claims in footnotes.

Use `.mdx` when an article needs components. Import them from `@/components/`; keep ordinary paragraphs and headings in Markdown. This inventory is the entry point for `voice-to-blog` and other article editing workflows. Update it when adding a component or changing how authors use one; component implementations and linked guides remain authoritative for props and validation.

| Content                                        | Component              | Usage guide                                                                                                                                            |
| ---------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Displayed Quran passage                        | `QuranVerse.astro`     | [Quran passages](quran-in-articles.md): verified data, Abdel Haleem translation, attribution and excerpt labels.                                       |
| Displayed hadith                               | `HadithQuote.astro`    | [Hadith quotations](hadith-in-articles.md): verified narration, grading and source details.                                                            |
| Clearly separated personal reflection          | `Reflection.astro`     | Put the author's reflection in its default slot; do not present it as scripture.                                                                       |
| Recommended book with an Amazon affiliate link | `AmazonBookCard.astro` | Supply the author's link, title, author and a unique page-local `id`. The component includes the adjacent disclosure and shared resource-card styling. |

```mdx
import QuranVerse from '@/components/QuranVerse.astro';
import HadithQuote from '@/components/HadithQuote.astro';
import Reflection from '@/components/Reflection.astro';
import AmazonBookCard from '@/components/AmazonBookCard.astro';

<QuranVerse verse="28:24" />
<HadithQuote hadith="bukhari-5066" showArabic={false} />
<Reflection>
  <p>My personal reflection goes here.</p>
</Reflection>
<AmazonBookCard
  id="marriage-book"
  title="Men Are from Mars, Women Are from Venus"
  author="John Gray"
  href="https://amzn.to/4yvf9wN"
/>
```

Choose displayed quotations where the exact text helps the reader; keep paraphrases and personal interpretations in prose with source links. Use native Markdown footnotes (`[^source-name]`) beside claims that need supporting references. Put their definitions after a final `## References` heading, using descriptive source links and any necessary qualification. For example:

```md
A sourced claim.[^source-name]

## References

[^source-name]: [Source title](https://example.com/source), with the relevant passage identified.
```

The renderer supplies footnote numbering and return links. Keep these native links: return targets highlight their containing paragraph and return controls have mobile touch targets. Verify both directions, including repeated citations, in the rendered article. Avoid duplicate lists of the same references. A displayed quotation's component attribution can stand alone; add a footnote when the surrounding claim needs further support.

Keep card disclosure text inside its component, outside prose styling with `data-not-typeset`. This prevents MDX-generated nested paragraphs and inconsistent spacing. Reuse the card without adding sales language or unverified price claims.

## Typography and UI

Article pages and cards show an estimated reading time at 200 words per minute, including stored Quran and hadith quotations. Article headings get copy-link controls, and unlinked images open in a shadcn image viewer. Images already inside links keep their destinations.

The `recommendations` map in `src/pages/articles/[...id].astro` selects the current articles' “Read next” links. New articles default to other published articles in the same category, then newest first. Drafts are excluded.

The official [shadcn Typeset](https://ui.shadcn.com/docs/typeset) stylesheet is vendored in `src/styles/typeset.css`, fetched from `https://ui.shadcn.com/typeset.css`. The `typeset-article` preset in `global.css` controls body size, line height, and spacing. Astro renders Markdown inside `typeset typeset-article`; no client-side Markdown renderer is needed.

shadcn is configured in `components.json` with Tabler icons, local UI components, and Pocket's green theme tokens. The Button component is installed and used by the article navigation. Add more components when needed:

```sh
pnpm dlx shadcn@latest add @shadcn/dialog
```

Import Tabler icons from `@tabler/icons-react`. Static React components can render directly in Astro; use Astro hydration only for components requiring browser interaction.

Validate with `pnpm check`, `pnpm lint`, `pnpm build`, and `node scripts/check-mobile-hub.mjs`.
