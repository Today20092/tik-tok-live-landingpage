# Table of contents research

Researched 11 September 2026. Scope: Markdown articles and the private podcast preview. No site implementation changes are included in this report.

## Recommendation

Keep an **On this page** list of ordinary links near the start of longer pages. For Markdown articles, generate its entries from Astro's existing heading metadata at build time. For the hand-authored podcast preview, the current explicit section links are a reasonable implementation. Reuse the same presentation when both page types need it.

This is a project recommendation, not a universal layout rule. A single vertical list would make the podcast's reading order clearer than its current two-column arrangement. Keep the small icons the owner requested, but let the text and spacing communicate navigation. The episode outline remains separate: it describes discussion topics, while the table of contents links to page sections.

## Documented facts

- Astro's `render(entry)` returns `Content` and `headings`. Heading records contain `depth`, `slug`, and `text`. Markdown headings receive generated IDs, so the returned slug can become the fragment in a normal link. Use those supplied slugs instead of implementing a second slugging algorithm. [Astro content reference](https://docs.astro.build/en/reference/modules/astro-content/#render), [heading metadata](https://docs.astro.build/en/reference/content-loader-reference/#headings), [heading IDs](https://docs.astro.build/en/guides/markdown-content/#heading-ids)
- W3C describes a table of contents as links to a document's sections and subsections. It normally includes major sections. Its verification procedure checks that entry names and order match the document, and that links reach the correct sections. G64 is an informative technique, not a requirement to put a table of contents on every page. [W3C G64](https://www.w3.org/WAI/WCAG22/Techniques/general/G64)
- A native `nav` identifies page navigation. Distinct navigation groups should have distinct accessible labels. W3C demonstrates `nav aria-labelledby` with a visible heading and a list of links. [W3C navigation landmarks](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)
- Heading levels communicate the document structure and support assistive navigation. Keep subsections nested by heading rank. [W3C headings tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- Native `details` and `summary` provide a disclosure widget if collapsing a longer contents list becomes useful. [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- Typeset provides typography styling. Its documented role does not replace heading extraction or navigation markup. [shadcn Typeset](https://ui.shadcn.com/docs/typeset)

## Implementation choices

These tradeoffs are engineering judgments for this repository.

| Approach | Fit here | Tradeoff |
| --- | --- | --- |
| Astro build-time headings | Best for Markdown articles | Links follow authored headings without maintaining a second list. |
| Explicit anchors and labels | Good for the five fixed podcast sections | Keep labels and IDs synchronized when editing sections. |
| Browser-side heading scanning or a TOC library | Unnecessary now | Adds client code for information available during rendering. Reconsider for content inserted dynamically after page load. |

The parent's repository inspection found that article rendering currently uses only `Content`, the welcome post has no headings, and the podcast maintains five explicit sections. Do not add a contents box to that short welcome post merely for consistency.

## Placement and checks

Design recommendation: place the list after the title and introduction, before the long body. Keep it inline and visible on mobile. Start with major `h2` sections; include nested `h3` links only where useful. Every heading can have a permalink without every heading appearing in the top list. A sticky desktop sidebar or mobile disclosure can wait until real episodes justify it.

Before shipping, check every fragment target, entry order, keyboard focus, mobile wrapping, and both themes. Keep existing fragment IDs stable. Use descriptive accessible names for icon-only heading permalinks. If a fixed header hides destinations, allow space with CSS `scroll-margin-top`. [MDN scroll-margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-top)
