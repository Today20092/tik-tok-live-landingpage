# Agent Instructions

## Project Context

This is an Astro static landing page for Ayoub's live Quran reading sessions.
Its purpose is to give viewers a simple, trustworthy link hub for:

- Reading Quran translations online
- Ordering free English copies where eligible
- Finding the physical edition used during live sessions
- Continuing with learning resources and video playlists
- Reaching Ayoub through public social profiles

The site is deployed from GitHub to Cloudflare Pages static hosting and uses the custom domain:

`https://islam.ayoubabed.xyz`

Astro is configured with:

- `site: 'https://islam.ayoubabed.xyz'`

Public assets referenced in code should use `import.meta.env.BASE_URL` or absolute production URLs when appropriate. Avoid root-relative asset paths like `/favicon.svg` inside Astro pages unless they are intentionally served from the site root.

## Runtime and verification

- Astro 7 static site, React 19 islands, Lumos for Astro (pinned native CSS), Lucide React, and Astro Content Layer collections.
- Use the pinned pnpm version. Run `pnpm dev`, `pnpm check`, `pnpm lint`, `pnpm build`, and `pnpm preview`; do not create an npm lockfile.
- Before changing Astro configuration, integrations, content APIs, or framework behavior, consult the current official Astro documentation. Astro's docs MCP is the preferred source when available; generated changes still need review and a passing build.
- For content schemas, import `z` from `astro/zod` and collection utilities from `astro:content`/`astro/loaders`. This keeps schemas aligned with Astro's bundled Zod version.
- Keep pages server-rendered by default. Use React only for an interactive island and choose the narrowest appropriate `client:*` directive.

## Key Files

- `src/pages/index.astro` is the main landing page and owns page metadata, structured data, section layout, hero content, social links, footer, and site-info copy.
- `src/content/links/links.json` is the main list of cards/links shown on the page.
- `src/content.config.ts` defines Content Layer collections and validates link content.
- `src/components/PocketHub.astro` and `LearningVideos.astro` compose resource cards and learning content.
- `src/components/ThemeControl.astro` controls light/dark mode.
- `src/styles/global.css` imports the Lumos foundation and component styles; shared tokens and patterns live in `src/styles/lumos/`. Keep article prose in `src/styles/typeset.css`.
- `public/robots.txt` and `public/sitemap.xml` support crawlability for audits.
- `astro.config.mjs` defines the production site URL, Vite plugins, and integrations.

## Content Guidance

The audience includes seekers, new Muslims, non-Muslims requesting free translations, and people coming from live streams. Keep copy clear, direct, and accurate.

When a link is free only for non-Muslims or limited by country/order quantity, say that plainly in the card text. Do not overpromise eligibility.

Do not invent contact details. Use the existing public social profiles unless the owner provides another contact method.

### Quran and hadith in articles

- Link all reader-facing Quran references to the exact verse or range on Quran.com, including inline citations, footnotes, reference lists, and quotation components. Keep the English translator's attribution separate from the link destination.

- Before creating or formatting a website article, read [Writing articles](docs/writing-articles.md) for the reusable component inventory and footnote conventions. Update that inventory in the same change whenever an article component is added or its usage changes.

- Default every English Quran translation to **The Qur'an by M. A. S. Abdel Haleem**, including quotation blocks and translation-based paraphrases. Use another translation only when Ayoub explicitly selects it. If the default cannot be used, explain the constraint rather than silently substituting another translator. Hadith translations follow their own cited sources.
- When creating or editing an article that quotes or discusses Quran verses, read [Quran passages in articles](docs/quran-in-articles.md). Use `QuranVerse` in `.mdx` for displayed verses.
- When creating or editing an article that quotes or discusses hadith, read [Hadith quotations in articles](docs/hadith-in-articles.md). Use `HadithQuote` in `.mdx` for displayed narrations.
- Keep paraphrases and personal reflections in prose with inline source links. Select quotation blocks where the exact passage helps the reader follow the article.
- Before delivery, verify each displayed quotation against its source, preserve the required attribution, and complete the relevant guide's checks and mobile preview.

## Styling

Before styling pages or components, changing shared styles, or upgrading Lumos, read [the shared design system](docs/lumos-design-system.md). This project uses a pinned adaptation of Lumos for Astro; follow its local structure and documented overrides when upstream examples differ.

- Reuse Lumos components and shared site patterns before adding new presentation code.
- Use the shared tokens for color, spacing, typography, reading widths, corners, and controls. Add a named variant when a treatment repeats.
- Keep component CSS in the components layer. Keep one source of truth for shared styles and show supported variants on the development reference page.
- Verify changes on all consuming pages in both themes, at narrow widths, with enlarged text, and with keyboard focus.
- Preserve the quiet, compact resource-hub feel and existing content behavior.

## SEO And Audit Notes

The site has been audited with `squirrel`/squirrelscan. Keep these in mind:

- Preserve canonical and social metadata in `src/pages/index.astro`.
- Preserve JSON-LD structured data unless replacing it with a more accurate equivalent.
- Keep `robots.txt` and `sitemap.xml` available at the site root.
- Cloudflare Pages static hosting should use `pnpm build` with `dist` as the build output directory. Do not add a Worker deploy command such as `npx wrangler versions upload` for this static site.
- CSP and X-Frame-Options warnings may remain hosting-level limitations unless configured in Cloudflare.
- The site intentionally stays a single-page landing page. About, contact, and privacy information are compact sections rather than separate pages unless the owner asks otherwise.

## Agent skills

### Issue tracker

Track issues and specs as local Markdown under `.scratch/`. Before creating, reading, or updating tickets, read `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five triage roles. Before assigning triage status, read `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout. Before exploring domain concepts or proposing architectural changes, read `docs/agents/domain.md`.
