# Desktop article layout analysis

Implemented on `codex/article-desktop-layout`. Open the [production preview](http://127.0.0.1:4173/articles/preparing-for-marriage/#help-people-protect-themselves) in a wide desktop window to see both rails. The [development reference](http://127.0.0.1:4321/articles/article-layout-preview/) includes subsections, long headings, and repeated citations.

The full layout needs 78rem of container space, approximately a 1312px viewport at the default text size. At smaller desktop widths it retains the left contents rail; narrower screens use the contents disclosure and native endnotes.

I recommend this layout for individual articles. Keep the reading column at a comfortable width and use the extra desktop space for navigation and sources. Our articles already have a contents list and reading progress, so this is an extension of the current page.

## What the reference does

I inspected the [IFP article](https://ifp.org/preparing-for-launch/) in a desktop browser, clicked a contents link, and scrolled to a citation. I also compared your two screenshots.

- The left contents rail stays visible beneath the site header. Major sections remain visible; the active section becomes bold and reveals its smaller, indented subsections. Your screenshots show those subsections disappearing when the reader moves to another section.
- A blue vertical track connects the section markers. Its filled portion shows position through the contents. This combines navigation and progress in one place. I verified the visual behavior, not its exact progress calculation.
- The central column contains the article in a restrained reading width, with serif body text and more compact navigation text.
- The right margin contains numbered notes near their corresponding citations. I observed a note beside its citation without clicking it. That note was shortened and had a plus control. This is a margin-note presentation, rather than merely a list at the end.

The useful feature is that a reader can check their location or a source without leaving the paragraph. The generous separation keeps the supporting columns subordinate to the article.

## Proposed layout for our articles

These are starting dimensions to test, not measurements copied from IFP.

| Left rail | Reading column | Right rail |
| --- | --- | --- |
| 220–240 px | Approximately 640–720 px | 240–280 px |
| Sticky contents and vertical progress | Title, prose, quotations, images | Numbered source notes |

Allow roughly 32 px between columns. Enable the full layout only when those widths fit, likely around 1280–1360 px. Preserve our warm background, green accents, typography tokens, and dark theme.

The title and article metadata align with the reading column. Following the desktop preview feedback, the contents rail starts beside the breadcrumb and header, then sticks near the viewport top. Margin notes remain aligned with citations in the body. Keep Quran and hadith quotation components in the main column with their existing attributions.

### Contents and progress

Show level-two headings and reveal level-three headings under the active section. Use ordinary anchor links so navigation still works without JavaScript. Highlight the current location with weight and `aria-current`, as well as green color. Never hide a subsection that currently contains keyboard focus.

Use a thin green progress track beside the contents. Reuse the existing article progress calculation for the fill; use heading positions separately for the active section marker. Label it as approximate reading position, since scrolling cannot establish how much someone has read.

On wide desktop, the vertical rail can replace the visible horizontal bar. Keep the horizontal bar where the left rail is absent. Avoid two competing progress indicators.

### Margin notes

Continue writing native Markdown footnotes. Derive the desktop presentation from those same definitions, preserving numbering, source links, and return links. Authors should not maintain a second set of notes.

Position each note near its first citation and push subsequent notes downward when necessary to prevent overlap. Repeated citations should reach the same note and retain their individual return targets. Recalculate positioning after fonts, images, note expansion, or viewport changes affect layout.

I would show full notes initially. If long notes dominate real articles, add an explicit, keyboard-accessible expansion control. Avoid hover-only access. The placement and collision handling are the most involved part of this work.

Keep the native endnotes as the fallback for mobile, printing, and JavaScript failure. An enhanced desktop presentation must avoid duplicate IDs, duplicate search results, and confusing duplicate screen-reader content.

### Smaller screens and zoom

- Medium desktop: contents plus article, with notes at the end.
- Narrow screens or enlarged text: one reading column, the existing collapsible “On this page” control, and native endnotes.
- Short articles: omit an unnecessary contents rail. Articles without footnotes need no notes rail.

## What we can reuse

The current source confirms the following:

- `src/pages/articles/[...id].astro` already receives headings from article rendering, selects level-two headings, and builds a collapsible contents list. Extend this page for the article-only grid and heading hierarchy.
- `src/components/ArticleReadingTools.astro` already calculates progress, updates accessible percentage values, and handles back-to-top behavior. Extend it rather than create another scroll tracker.
- `src/styles/lumos/articles.css` owns article layout rules. The current article has a constrained maximum width; widen the outer layout while keeping the prose constrained.
- `src/components/ArticleExtras.astro` supplies heading link controls and the image viewer. Preserve those interactions.
- `docs/writing-articles.md` specifies native footnotes with numbering and return links. Document the desktop presentation there when implemented.

Use native CSS layout and a small article script. No new UI library or React island is needed for this proposal. Confirm current Astro documentation before changing rendering APIs.

## Implementation and review

First implement the article grid, sticky contents, and existing progress reuse. Then add footnote positioning against a long, citation-heavy article. Scope the change to individual article pages; the homepage and article listing keep their current layouts.

Verify both themes, keyboard navigation, 200% zoom, narrow widths, long headings, repeated citations, dense notes, image loading, and direct heading/footnote URLs. Check printing and JavaScript-disabled fallback. Run the existing check, lint, build, and article/layout browser checks after implementation.

## Implementation verification

Completed September 14, 2026. The proposal above records the design rationale. Application changes are implemented locally on the branch, without deployment.

- `pnpm check`, `pnpm lint`, and `pnpm build` pass. Astro reports one existing Zod URL deprecation hint in `src/content.config.ts`.
- `scripts/check-article-reader.mjs` passes for navigation targets, active sections, progress, keyboard subsection focus, repeated footnote return links, dense notes, direct footnote URLs, malformed fragments, both themes, resizing, enlarged text, printing, and JavaScript-disabled fallback.
- `scripts/check-article-layout.mjs` passes for all eight development articles at 320, 390, 768, 1280, and 1440px, in both themes and at 100% and 200% text size.
- `scripts/check-site-layout.mjs` passes for all 12 built routes. `scripts/check-lumos.mjs`, `scripts/check-mobile-hub.mjs`, and `scripts/check-article-extras.mjs` also pass.
- Visually inspected the three-column layout in light and dark themes and the mobile fallback. Confirmed margin placement, active section, and progress in the built production preview.
- The demonstration article is a draft and is excluded from the production build.

### Standards review

No remaining actionable findings. The component documentation and development reference were updated, and malformed incoming URL fragments are handled. Source review and browser checks cover accessibility basics; a screen reader was not manually tested.

### Spec review

No remaining findings. The implementation covers article-only rails, native footnotes, responsive fallback, and reuse of reading progress. The requested work was completed in this chat without a separate ticket.
