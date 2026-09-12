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
