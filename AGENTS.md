# Agent Instructions

## Project Context

This is an Astro static landing page for Ayoub's live Quran reading sessions.
Its purpose is to give viewers a simple, trustworthy link hub for:

- Reading Quran translations online
- Ordering free English copies where eligible
- Finding the physical edition used during live sessions
- Continuing with learning resources and video playlists
- Reaching Ayoub through public social profiles

The site is deployed as a GitHub Pages project site at:

`https://today20092.github.io/tik-tok-live-landingpage/`

Astro is configured with:

- `site: 'https://today20092.github.io'`
- `base: '/tik-tok-live-landingpage/'`

Because of that base path, public assets referenced in code should use `import.meta.env.BASE_URL` or absolute production URLs when appropriate. Avoid root-relative asset paths like `/favicon.svg` inside Astro pages because they break under the GitHub Pages base path.

## Tech Stack

- Astro 6 static site
- React components for interactive pieces
- Tailwind CSS v4 for styling
- Lucide React icons
- Astro content collections for JSON/Markdown-backed content

Common commands:

- `npm run dev`
- `npm run check`
- `npm run lint`
- `npm run build`
- `npm run preview`

## Key Files

- `src/pages/index.astro` is the main landing page and owns page metadata, structured data, section layout, hero content, social links, footer, and site-info copy.
- `src/content/links/links.json` is the main list of cards/links shown on the page.
- `src/content.config.ts` defines Astro content collections and validates link content.
- `src/components/LinkCard.tsx` renders each link card, including badges, icons, YouTube thumbnails, and card variants.
- `src/components/ThemeToggle.tsx` controls light/dark mode.
- `src/styles/global.css` should stay small and global: theme tokens, body/background rules, decorative background effects, SVG-specific styling, and reduced-motion behavior.
- `public/robots.txt` and `public/sitemap.xml` support crawlability for audits.
- `astro.config.mjs` defines the GitHub Pages `site` and `base`.

## Content Guidance

The audience includes seekers, new Muslims, non-Muslims requesting free translations, and people coming from live streams. Keep copy clear, direct, and accurate.

When a link is free only for non-Muslims or limited by country/order quantity, say that plainly in the card text. Do not overpromise eligibility.

Do not invent contact details. Use the existing public social profiles unless the owner provides another contact method.

## Styling

This site is Tailwind-first.

- Use Tailwind utility classes for layout, spacing, sizing, typography, borders, radius, shadows, transitions, responsive behavior, and component states.
- Prefer Tailwind's spacing and sizing scale before arbitrary values.
- Keep custom CSS limited to site-wide design tokens, body/background rules, complex decorative effects, SVG-specific styling, and cases that are clearly less readable in utilities.
- Do not reintroduce broad semantic component CSS classes for normal UI components when Tailwind utilities can express the styling directly.
- When modifying existing UI, preserve the Tailwind-first direction and remove obsolete CSS selectors as components are migrated.
- Maintain the current quiet, compact landing-page feel. This is not a marketing splash page; it is a practical link hub.

## SEO And Audit Notes

The site has been audited with `squirrel`/squirrelscan. Keep these in mind:

- Preserve canonical and social metadata in `src/pages/index.astro`.
- Preserve JSON-LD structured data unless replacing it with a more accurate equivalent.
- Keep `robots.txt` and `sitemap.xml` available under the GitHub Pages base path.
- GitHub Pages does not support arbitrary response headers, so CSP and X-Frame-Options warnings may remain hosting-level limitations.
- The site intentionally stays a single-page landing page. About, contact, and privacy information are compact sections rather than separate pages unless the owner asks otherwise.

